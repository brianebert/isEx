import {Element} from './element.js';

import {Section} from './section.js';
import {Page} from './page.js';



class DivElTest extends Element {
	constructor(htmlp){
		super({
			"class": "box and topic",
			"id": "me",
			"tag": "div",
			"html": function(){
						return `hi there ${htmlp}`
					}
			});

		console.log(this);
	}
}

const divTest = new DivElTest("bob");

const stellarAccount = new Page([new Section([divTest], 'Testbg element.js')]);

const bound = function(){return `hi there ${this.name}`}.bind({"name":"bertha"});

divTest.html = bound;

divTest.reRender();

export {stellarAccount};