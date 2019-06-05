import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';


const template = `
	<p class="storyTelling">
		The demo page shows distributed  storage of self-authenticted documents.  Encryption and 
		signing are provided.  Encrypting a file automatically uploads a signature 
		of the plaintext.  Peer to peer messaging with privacy and authentication can be played 
		with, as can voting systems.  Keys are stored encrypted in IPFS, accessible by 
		password<sup style="font-size:16px">1</sup>.
	</p>
	<p class="storyTelling">
		This is not a wallet<sup style="font-size:16px">2</sup>.  You can’t send Stellar payments from here, or see your 
		balance.  There are other tools for that.  Things you upload can be seen in a browser from any IPFS gateway.  If 
		you encrypt them, you can use the Stanford Javascript Crypto Library (SJCL) demo to decrypt 
		and verify the result.  You can sign an upload.  If an IPFS address is detected in an account's 
		data entries, a link is displayed.  If the link points to a directory with signatures, the signature 
		is verified<sup>3</sup>.  A link to a verified signature displays green, no signature blue, invalid signature 
		a dull pink, and a file not found a brighter pink.  I did this to visualize verification of data provenance 
		while retreiving it.  Many different signature chaining schemes can be explored.
	</p>
	<p class="storyTelling">
		I took shortcuts in places and probably took some I don’t remember and made surely mistakes I’m 
		unaware.  I used the SJCL at its most basic: encrypt and decrypt with all the defaults.  The 
		key you store here could be encrypted harder and perhaps someday will be.  Storing 
		it where it can be recovered via any IPFS gateway is the point.  Don't consider this a secure 
		site.  Although a keypair is 
		necessary to encrypt and sign, upload encryption is done with the key’s password, to make it 
		easier to decrypt text in the <a href="https://bitwiseshiftleft.github.io/sjcl/demo/" 
		target="_blank">SJCL demo</a>.
	</p>
	<p class="storyTelling">
		While Stellar key pairs can be produced with a button, 
		Stellar accounts need to be funded into existence.  If you’re already familiar with Stellar, 
		use a petty cash account here.  You’ll need 0.5 XLM, the Stellar Lumen, minimum balance for for 
		each Data Entry in your account.  They remain your lumens, but they have to be there.  I’ll pin f
		iles for up to a month, normally at a small fraction of a lumen.  You can explore ideas here with 
		USD$1 in your account.  If you need to someone to fund an account for you, please send mail to 
		<a href="mailto:brian@motia.com">brian@motia.com</a>.  The password for ECA0 (Example Client 
		Account 0) is "demopw".  Please try to leave it functioning.  (i.e. please don't take the lumens.)
  </p> 
  <p class="storyTelling">
	  Thanks for reading.  Enjoy the <a href="/demo.html" id="demoLink">demo</a>.
	</p>
	<p class="storyTelling" style="font-size:16px">
		<sup>1</sup>  I will describe how somewhere soon.
		<br/>
		<sup>2</sup>  I also have a peer to peer wallet with an sms interface available.
		<br/>
		<sup>3</sup>  Another subject deserving its own page.
	</p>`;


class MashedUp extends Div {
	constructor(html){
		super(html);
	}

	onLoad(){
		console.log("In mashedUp onLoad()");
		document.getElementById("demoLink").addEventListener("click", this.onNavClick);		
	}

	get onNavClick(){
		const context = this;
		return function(event){
		  event.preventDefault();  // prevent navigating to file at location
		  console.log("Handling demo routing: ");
		  console.log(event);

var rootPathString = document.location.pathname;
var rootPathComponents = rootPathString.split('/');
		  //  reassemble the path name, including the site hash

		  const pathName = '/ipfs/' + rootPathComponents[2] + event.target.pathname;
		  console.log("pathName: " + pathName);
		  console.log(context);
window.open(window.location.origin + pathName, "demo");
		}
	}

}



const mashedUp = new Page([new Section([new MashedUp(template)], "mashed Up")]);

export {mashedUp};