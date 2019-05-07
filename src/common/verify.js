const CID = require('cids');

import {xhrp} from './xhrp.js';

const StellarSecret = "SDIVHNPZIMGVTGVULBF6V2K4EIUMEHWGDULUQNTWI22WXUPROJ6RI2UE"; //PLACEHOLDER
import {Keypair} from '../../node_modules/stellar-base/src/keypair.js';

export function verify(address){
	let host = 'motia.com';

	return xhrp({"url": `https://${host}/api/ipfs/ls?arg=${address}`})
					.then(function(result){
						let res = JSON.parse(result);
						if(res.Objects[0].Hash !== address)
							throw new Error(`Expected directory listing of ${address}`)
						let sigs = [];
						let cont = [];
						let promises = [];
						for(let file of res.Objects[0].Links){
							//console.log(`looking at file: ${file.Name}`);
							if(file.Name.match(/\.sig$/))
								sigs.push(file);
							else
								cont.push(file);
						}
						if(sigs.length > 1){
							console.log(`found signature files: ${JSON.stringify(sigs)}`);
							sigs.forEach(function(sig){
								promises.push(verify(sig.Name.split('.')[0]))
							})
							return Promise.all(promises)
														.then(function(results){
															console.log("results of verify promises.all():");
															console.log(results);
														})
														.catch(function(err){
															console.log("error of verify promises.all():")
															console.log(err);
														})
						}
						else if(sigs.length){
							console.log(`last signature found at ${address}`);
							return xhrp({"url": `https://${host}/api/ipfs/cat?arg=${sigs[0].Hash}`})
											.then(function(result){
												console.log(`contents of ${sigs[0].Name} is ${result}.`);
												try{
													let res = JSON.parse(result)
													let adr = sigs[0].Name.split('.')[0];
													let cid = new CID(adr);
													let sig = Buffer.from(res.signature, 'base64');
													let kp = Keypair.fromPublicKey(res.signer);
													let verification = kp.verify(cid.buffer, sig);
													console.log(`the result of verification is: ${verification} for ${cid.toString()}`);
													return Promise.resolve([{"signature": sigs[0].Name, "signer": kp.publicKey(), "signs": verification ? cid.toString() : verification}])
												} catch {
													throw new Error(".sig file invalid contents");
												}
											})
											.catch(function(err){
												console.log(`Error reading contents of .sig file: ${sigs[0].Name}`)
												console.log(err);
												throw new Error(`{"type": "BAD SIG", "cid": "${sigs[0].Hash}", "comment": ".sig file format incorrect"}`);
											})
						} else {
							return Promise.resolve([{"signature": "none found", "signer": "NA", "signs": false}])
						}					
					})
					.catch(function(err){
						console.log(`Error locating contents at: ${address}:`);  //  RETURN NOTICE TO COLOR LINK YELLOW
						console.log(err);
						if(err.hasOwnProperty('message') && JSON.parse(err.message).hasOwnProperty('type')){
							throw err
						} else 
							throw new Error(`{"type": "NOT FOUND", "cid": "${address}", "comment": "not in repo"}`);
					})
}
