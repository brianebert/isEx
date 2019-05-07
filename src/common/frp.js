export function frp(file){
	return new Promise(function(resolve, reject){
		const fr = new FileReader();

		fr.onerror = function(e){
			fr.abort();
			console.log(`Error reading file: ${file}`);
			console.log(fr.error);
			reject(fr.error);
		};

		fr.onload = function(e){
			console.log(`read contents of ${file}`);
			resolve(e.target.result);
		};

		fr.readAsArrayBuffer(file);
	})
}