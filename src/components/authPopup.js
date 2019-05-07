import {Div} from '../common/Div.js';

const _template = function(){
	return `
		<h2>sign transaction</h2>
	  <div class="innerBox section">
			<label for="password">Password for:</label><select id="accountList"/>
      <input type="password" class="wide" name="password" id="password" autocomplete="off" tabindex="1"/>
      <input type="submit" value="Enter" result="Enter" id="passwordReady" onclick="return CloseMySelf(this);" autocomplete="off" tabindex="3"/>
      <p class="explanation">
        Enter the password you used to save the secret key for.
      </p>
      <a href="#" result="cancel" onclick="return CloseMySelf(this);">Cancel Sign Transaction</a>
	  </div>
		`;
}

class Popup extends Div{
	constructor(args){
		super(args);
		let myp = new Promise(function(resolve, reject){
			let copies = document.getElementById("accountList").cloneNode(true);
			window.handlePopupResult = function(obj){
				//this.me.close();
				resolve(obj);
			};
			window.handlePopupError = reject;
			this.me = window.open("", "authorize", "width=1000,height=500,titlebar=no");
			this.me.document.write('');
			this.me.document.write(`<title>client Sign Transaction</title><link rel="stylesheet" type="text/css" href="example.css"/>` + this.html);
			this.me.document.getElementById("accountList").innerHTML = copies.innerHTML;
			this.me.document.write(`<script>${this.closePopup}</script>`);
			console.log("popped up window");
		}.bind(this));
		this.result = myp;
	}

	set me(m){
		this._me = m;
	}
	get me(){
		return this._me
	}
	set result(r){
		this._result = r;
	}
	get result(){
		return function(){
			return this._result
		}
	}

	closeWindow(){
		this.me.close();
	}

	get closePopup() {
		return function CloseMySelf(sender){
	    try {
	    	console.log("Entered CloseMySelf() and sender is:");
	    	console.log(sender);
	    	let choice = sender.getAttribute("result");
	    	console.log("closing self with result: " + choice);
	    	if(choice === 'Enter'){
	    		window.opener.handlePopupResult({"account": document.getElementById("accountList").value,
	    																			"password": document.getElementById("password").value});
	    		console.log(`returned ${document.getElementById("accountList").value} and ${document.getElementById("password").value} to parent`);
	    	}else if(choice === 'cancel'){
	    		window.opener.handlePopupResult({});
	    		console.log("returned empty object to parent");
	    	}else
	    		throw new Error(`Unecpected value of choice: ${choice} in CloseMySelf() in popup`);
	    }
	    catch (err) {
	    	console.log("error trying to return value from popup:");
	    	console.log(err);
	    	window.opener.handlePopupError(err);
	    }
	    //window.close();
		}
	}
}

function authPopup(){
	return  new Popup({ "html": _template,
	                    "class": "box popup",
	                    "id": "authPopup"});
}

export {authPopup};
