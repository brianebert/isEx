import {xhrp} from './xhrp.js';  //  Wraps XMLHTTPRequest in a promise


/***************************
 *
 *  Params: No
 *  Returns: A promise that resolves to a "ticker" object
 *
 *  ticker = { eth_mxn: last,
 *             btc_mxn: last,
 *             time: timestamp
 *           }
 *
 */

export function ticker(){
	let ticker = {};
	let promises = [];
	let bitsoBooks = ['eth_mxn', 'btc_mxn'];
	for(let book of bitsoBooks){
		let url = "https://api.bitso.com/v3/ticker?book=" + book;
		promises.push(xhrp({"url":url}));
	}

	return
	Promise.all(promises).then(function(dataArray){
		console.log("Promise.all() returned dataArray:");
		conso;e.log(dataArray);
		for(let data of dataArray){
			ticker[data.payload.book] = data.payload.ask;
		}
		ticker[time] = data.payload.created_at;
		return ticker
	})
	.catch(function(err){
		throw new Error("Screwup getting ticker prices");
	})
}


