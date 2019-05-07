
const canSet = {
	"tag": true,
	"class":true,
	"id": true
}

export class Element {
	constructor(opts){
		//let attrStr = ``;
		for(let attribute in opts){
			if(canSet[attribute]){
				//attrStr += ` ${attribute}="${opts[attribute]}" `;
				this[attribute] = opts[attribute];
			} else if(attribute === 'children' && typeof opts[attribute] === 'array') {
				this.children = opts[attribute];
			}
		}
		if(typeof this.children !== 'array')
			this.children = [];
		if(!this.tag)
			throw new Error("HTML element requires <tag>");
		else{
			//let el = document.createElement(null);
			if(typeof opts.html === 'function'){
				this.html = opts.html//`<${this.tag} ${attrStr}>${opts.html()}</${this.tag}`;
			} else {
				this.html = function(){return `<h2>html must be function returning value of this element</h2>`};
			} 
		}
	}

	set tag(t){
		this._tag = t;
	}
	get tag(){
		return this._tag
	}

	set class(c){
		this._class = c;
	}
	get class(){

		return this._class

	}

	set id(i){
		this._id = i;
	}
	get id(){
		return this._id
	}

	get attrStr(){
		let str = ``;
		if(this.class)
			str += ` class="${this.class}"`;
		if(this.id)
			str += ` id="${this.id}"`;

		return str
	}

	set html(h){
		this._html = h;
	}
	get html(){
		return `<${this.tag}${this.attrStr}>${this.innerHTML}</${this.tag}>`;
	}
	get innerHTML(){
		let html = this._html();
		for(let element of this.children){
			html += element.html;
		}
		return html
	}

	reRender(){  //This function when iexists node in dom already
		let el = document.getElementById(this.id);
		if(el)
			el.innerHTML = this.innerHTML;
		else
			console.log(`Tried to write element ${this.id} when node didn't exist`);
	}		
}