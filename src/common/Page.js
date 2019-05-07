export class Page {
	constructor(sections){
		this.sections = sections;
		this.iam = "page";
		console.log(this);
	}

set iam(str){
	this._iam = str;
}

get iam(){
	return this._iam
}

	set sections(sections){
		console.log("Setting Sections: " + sections);
		if(Array.isArray(sections)){
			this._sections = sections;
		} else {
			throw new Error('"sections" argument must be array of 1 or 2 sections.');
		}
	}

	get sections(){
		return this._sections;
	}

	get html(){
		let str = ``;
		this.sections.forEach(function(section){
			str += section.html;
		});
		return str;
	}

	get onLoad(){
		const context = this;
		return function(){	
			//  Any Page specific instructions here:

			//  Then the Sections
			context.sections.forEach(function(section){
				console.log("calling section onLoad() " + section);
				section.onLoad();
			});
		}
	}
}