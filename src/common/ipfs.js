const CID = require('cids');

import {xhrp} from './xhrp.js';

class LocalNode {
	constructor(url){
		this._ready = false;
		let rl = url + "/api/ipfs/id";
		console.log("Checking for local repo at: " + rl)
		return xhrp({"url": rl})
		.then(function(repo){
			console.log("local repo is");
			console.log(JSON.parse(repo));
			this._repo = JSON.parse(repo);
			this._host = url;
			this._ready = true;
			return this
		}.bind(this))
		.catch(function(err){
			console.log("error loading local repo");
			console.log(err);
			return null
		});
	}

	get repo(){
		return this._repo
	}
	get host(){
		return this._host
	}
	get ready(){
		return this._ready
	}

	loadCID(arg){
		return new Promise(function(resolve, reject){
			try{
				console.log("try creating new CID with arg:");
				console.log(arg);
				let id = new CID(arg);
				xhrp({"url": `${this.host}/api/ipfs/refs/local`})
					.then(function(result){
						let strs = result.split('\n');
						console.log("refs/local result: ");
						console.log(strs);
						let objs = []
						strs.forEach(function(str){
							if(str.length)
								objs.push(JSON.parse(str));
						});
						console.log(`looking for ${id.toBaseEncodedString()} in:`);
						console.log(objs);
						let target = id.toBaseEncodedString();
						for(let ref of objs){
							if(ref.Ref === target){
								console.log("found Ref: " + ref.Ref);
								this._cid = id;
								console.log("this.cid is: " + this.cid.toBaseEncodedString());
								//resolve(id);
								resolve(this);				
							}
						}
						reject(new Error(`${id.toBaseEncodedString()} is not in the local repo`));
					}.bind(this))
					.catch(function(err){
						console.log("error reading local refs to verify a hash: " + err);
						reject(new Error(err));
					});
			} catch(err){
				console.log("apparently no new CID from arg");
				if(!typeof arg === 'object' || !arg.hasOwnProperty("body"))
					reject(new Error("Cannot create ipfs node from constructor argument"));
				xhrp({"verb": "post", "url": `${this.host}/api/ipfs/upload`, "body": arg.body})
					.then(function(newId){
						this._cid = new CID(newId);
						//resolve(this._cid);
						resolve(this);
					}.bind(this))
					.catch(function(err){
						console.log("error uploading a pre-image to get its hash: " + err);
						reject(new Error(err));
					});
			}
		}.bind(this))
	}

	get cid(){
		return this._cid
	}
	get hash(){
		try{
			if(CID.isCID(this.cid))
				return this.cid.toBaseEncodedString()
		} catch {
			return "Hash not available yet"
		}
	}

	myFam(){
		return xhrp({"url": `${this.host}/api/ipfs/pin/ls`})
		.then(function(results){
			let pinned = JSON.parse(results);
      let promises = [];

      console.log("pinned ls is:");
      console.log(pinned);
      for(let key in pinned.Keys){
        if(pinned.Keys[key].Type === "recursive"){
          promises.push(xhrp({"url": `${this.host}/api/ipfs/ls?arg=${key}`})
          .then(function(lsResult){
            let kids = JSON.parse(lsResult).Objects[0].Links;
            let parent = {};

            let hash = this.hash;
            //console.log(`looking for ${hash} in ${key} with kids:`);
            //console.log(kids);
            kids.forEach(function(link){             
              if(link.Hash === hash){
                //console.log(`parent of ${hash} is ${key}`);
                parent[key] = kids;
              }
            });
            if(!parent[key]) 
            	return null
          	else
          		return parent
          }.bind(this))
          .catch(function(err){
            console.log("error getting directory listing for hash:" + this.hash);
            console.log(err);
          }.bind(this)));
        }
      }
      return Promise.all(promises)
                    .then(function(parents){
                      this._fam = parents.reduce(function(accumulator, currentVal){
                      	if(currentVal) accumulator.push(currentVal);
                      	return accumulator
                      }, []);
                      return this
                    }.bind(this))
                    .catch(function(err){
                      console.log("Error collecting keys");
                    })
    }.bind(this))
    .catch(function(err){
      console.log("failed to fetch pin list");
      console.log(err);
    })			
	}

	get fam(){
		return this._fam
	}

	get parents(){
		return this._fam.keys()
	}

	get siblings(){
		let acc = [];
		this.fam.forEach(function(f){
			f[Object.keys(f)[0]].forEach(function(o){
				acc.push(o);
			});
		});
		/*console.log("found siblings:");
		let bcc = Array.from(acc);
		console.log(bcc);*/

		for(let index = 0; index < acc.length; index++){
			for(var i = index + 1; i < acc.length; i++){
				if(acc[i].Hash === acc[index].Hash){
					//console.log(`removing ${acc[i].Hash} at i = ${i} of ${acc.length -1} while index = ${index}`);
					acc.splice(i, 1);
					i--;  // prevents skipping duplicate at last index
				}
			}
		}
		return acc
	}

	sibling(filter){
		let sibling = [];
		if(typeof filter === 'object'){
			let key = Object.keys(filter);
			if(key.length !== 1)   //  Will add multiple dimensions later when needed
				throw new Error("sibling() needs {key:value} argument")
			console.log(`looking for sibling ${JSON.stringify(filter)}`);
			this.siblings.forEach(function(sib){
				if(sib.hasOwnProperty(key)){
					if(filter[key] === sib[key])  // pushes ipfs link, an object with keys Name and Hash
						sibling.push(sib);
				}
			});
		} else {
			sibling = this.siblings;
		}
		if(sibling.length === 1)
			return sibling[0]
		else
			throw new Error(`Expected 1 sibling and filtered ${sibling.length}`)
	}


	static contents(hash){
		return xhrp({"url": `https://motia.com/api/ipfs/cat?arg=${hash}`})  //this is temporary while contents() is static
						.then(function(contents){
							console.log("ipfs node contents:" + contents + "\n");
							return contents
						})
						.catch(function(err){
							console.log("Error catting file:");
							console.log(err);
							return "error getting file contents"
						})
	}

}

class TestNode {
	constructor(){
		return new Promise(function(resolve, reject){
			setTimeOut(resolve(this), 500);
		})
	}

	done(){
		console.log("timer finished");
	}
}

export {TestNode};
export {LocalNode};