const CID = require('cids');

import {Section} from './Section.js';
import {Div} from './Div.js';

const _template = function(){
	return ``
};

class Navigator extends Div {
	constructor(routes){
		super({ "html": _template,
            "class": "box",
            "id": "navBar"});
		this.routes = routes;
	}

	set routes(routes){  // calls super()
		// Parse and verify ipfs/hash components of pathname
		var rootPathString = document.location.pathname;
		var rootPathComponents = rootPathString.split('/');
		const myCID = new CID(rootPathComponents[2])
		if(rootPathComponents[1] !== 'ipfs' || !CID.isCID(myCID))
		  throw new Error("Identity crisis: " + rootPathComponents[1] + " & " + CID.isCID(myCID));
		this.siteCID = myCID;

		//  Buitd router and nav bar html
		this._routes = {};
		var html = `<nav>`;		
		for(let route in routes){
			//let anchorLabel = this._routes[rootPathString + route.substring(1, route.length)] = routes[route];
			this._routes[rootPathString + route.substring(1, route.length)] = routes[route]; // create router entry
			//html += `<a href="` + route + `">${route === '/' ? "Home" : route}</a> | `; // create corresponding menu entry
			html += `<a href="` + route + `">${route === '/' ? "Home" : route.substring(1, route.length)}</a> | `; // create corresponding menu entry
		}
		html = html.substring(0, html.length -3) + `</nav>`;
		this.html = function(){return html};
		console.log(this.routes);
		console.log(html);
	}

	get routes(){
		return this._routes
	}

	set siteCID(CID){
		this._siteCID = CID.toBaseEncodedString();  //  Defaults to b58
	}

	get siteCID(){
		return this._siteCID
	}

	onLoad(){
		console.log("In navigator onLoad()");
		document.querySelector("nav").addEventListener("click", this.onNavClick);
		Array.prototype.forEach.call(document.querySelectorAll(".menuItem"), function(el){
			el.addEventListener("click", this.onNavClick);
		}.bind(this));
		
		window.onpopstate = this.onPopState;
	}

	get onNavClick(){
		const context = this;
		return function(event){
		  event.preventDefault();  // prevent navigating to file at location
		  console.log("Handling navigation event: ");
		  console.log(event);

		  //  reassemble the path name, including the site hash

		  const pathName = '/ipfs/' + context.siteCID + event.target.pathname;
		  console.log("pathName: " + pathName);
		  console.log(context);

		  //  manipulate history api
		  window.history.pushState(
		    {},
		    pathName,
		    window.location.origin + pathName
		  );
		  //  Load html and hook up javascript
		  document.body.innerHTML = context.routes[pathName].html;
		  context.routes[pathName].onLoad();
		}
	}

	get onPopState(){
		const context = this;
		return function(){
			//  Load html and hook up javascript
		  document.body.innerHTML = context.routes[window.location.pathname].html;
		  context.routes[window.location.pathname].onLoad();
		}
	}

}

const NavBar = function(routes){
	return new Section([new Navigator(routes)],'')
}

export {NavBar};


