export class Section {
	constructor(divs, heading){
		this.heading = heading;
		this.divs = divs;
		this.iam = "section";
	}

set iam(str){
	this._iam = str;
}

get iam(){
	return this._iam
}


	get heading(){
		return this._heading;
	}

	set heading(value){
		if(typeof value === 'string'){
			this._heading = `<h1>` + value + `</h1>`;
		} else {
			throw new Error('"heading" argument must be string');
		}
	}

	get divs(){
		return this._divs;
	}

	set divs(divs){
		if(Array.isArray(divs)){
			this._divs = divs;
		} else {
			throw new Error('"divs" argument must be array');
		}
	}

	get html() {
		let str = `<section>${this.heading}`;
		this.divs.forEach(function(div){
			str += div.html;
		});
		return str + `</section>`;
	}

	onLoad(){
		//  Any Section specific instructions here:

		//  Then the Divs
		this.divs.forEach(function(div){
			if(typeof div.onLoad === 'function'){
				div.onLoad();
			}
		});

	}
}