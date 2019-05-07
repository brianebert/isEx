import {navBar} from './nav.js';

console.log("Imported navBar");
console.log(navBar);

export class Page {
	constructor(sections){
		this.sections = sections;
	}

	set sections(sections){
		console.log("Setting Sections" + sections);
		if(Array.isArray(sections) && sections.length === 1 || sections.length === 2){
			this._sections = [];
			this._sections.push(sections[0]);
			this._sections.push(navBar);        //  Location of this line positions nav bar
			if(sections.length === 2)
				this._sections.push(sections[2]);
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

	onLoad(){
		//  Any Page specific instructions here:

		//  Then the Sections
		this.sections.forEach(function(section){
			section.onLoad();
		});
	}
}

export class Section {
	constructor(divs, heading){
		this.heading = heading;
		this.divs = divs;
	}

	get heading(){
		return this._heading;
	}

	set heading(value){
		if(typeof value === 'string'){
			this._heading = `<h2>` + value + `</h2>`;
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

export class Div {
	constructor(html){
		this.html = html;
	}

	get html(){
		return this._html;
	}

	set html(value){
		this._html = `<div>` + value + `</div>`;
	}
}