const sjcl = require("sjcl");
//const Stellar = require('stellar-sdk');
import {Keypair} from '../../node_modules/stellar-base/src/keypair.js';
import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {accessAccount} from './accessAccountDiv.js';
import {kvPairList} from './kvPairs.js';
import {uploader} from './ipfsUpload.js';
//import {fundAccount} from './fundAccountDiv.js';

  //new AccountData(templateAccountData), SEPARATE THIS APPROPRIATELY AFTER ALL WORKING

class Demo extends Section {
	constructor(divs, title){
		super(divs, title);
	}

	onLoad(){
		document.getElementById("accountList").addEventListener("change", function(){
			accessAccount.account = document.getElementById("accountList").value;
			accessAccount.keypair = null;
		});
		super.onLoad();		
	}
}

const demo = new Demo([accessAccount, uploader, kvPairList], 'mitao');

const demoPage = new Page([demo]);

//export {demoPage};

document.body.innerHTML = demoPage.html;
demoPage.onLoad();