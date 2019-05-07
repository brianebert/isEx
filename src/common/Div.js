import {Element} from './element.js';

export class Div extends Element{
	constructor(html){
		if(typeof html === "string")
			super({"tag":"div",
							"html": function(){return html}
						});
		else if(typeof html === "object" && html.hasOwnProperty("html") && typeof html.html === "function"){
			html["tag"] = "div";
			super(html);
		}
		else
			throw new Error("You tried constructing a div without passing html or options for element constructor");
		this.timers = {};
	}

  set timers(details){  // details is timer object: {name:{delay:miliseconds, callback:function}}.  Empty object clears timers
  	if(Object.keys(details).length){
	    const name = Object.keys(details)[0];
	    details[name].id = window.setTimeout(details[name].ontimeout, details[name].delay);
	    this._timers[name] = details[name];
	  } else{
	  	for(timer in this._timers)
	  		window.clearTimer(timer.id);
	  	this._timers = {};
	  }

  }

  get timers(){
      return this._timers;
  }

}