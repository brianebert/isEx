import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const mashedUp = new Page([new Section([new Div(`
	<p class="storyTelling">
		The demo page shows distributed document storage with indelible anti-tampering, with 
		consensus verified voting whether or not to write data’s hash into a blockchain.  Document 
		encryption and signing are provided.  Encrypting a file automatically uploads a signature 
		of the plaintext.  A form of peer to peer messaging with new anti-spam can be played 
		with.  Keys are stored encrypted in IPFS, accessible by password.
	</p>
	<p class="storyTelling">
		This is not a wallet<sup style="font-size:16px">1</sup>.  You can’t send Stellar payments from here, or see your 
		balance or any of that.  Things you upload can be seen in a browser from any IPFS gateway.  If 
		you encrypt them, you can use the Stanford Javascript Crypto Library (SJCL) demo to decrypt 
		and verify the result.
	</p>
	<p class="storyTelling">
		I took shortcuts in places and probably took some I don’t remember and made mistakes I’m 
		unaware.  I used the SJCL at its most basic: encrypt and decrypt with all the defaults.  The 
		key you store here could be encrypted harder and perhaps someday will be.  For now, storing 
		it where it can be recovered via any IPFS gateway is the point.  Although a keypair is 
		necessary to encrypt and sign, upload encryption is done with the key’s password, to make it 
		easier to read decrypted text in the SJCL demo.
	</p>
	<p class="storyTelling">
		Wnile Stellar key pairs can be produced with a button, 
		Stellar accounts need to be funded into existence.  If you’re already familiar with Stellar, 
		use a petty cash account here.  You’ll need 0.5 XLM, the Stellar Lumen, minimum balance for for 
		each Data Entry in your account.  They remain your lumens, but they have to be there.  I’ll pin f
		iles for up to a month, normally at a small fraction of a lumen.  You can explore ideas here with 
		USD$1 in your account.  If you need to someone to fund an account for you, please send mail to 
		accounts@motia.com.
  </p>
  <p class="storyTelling">
	  Thanks for reading.  Enjoy the <strong>DEMO</strong>.
	</p>
	<p class="storyTelling" style="font-size:16px">
		<sup>1</sup>  I also have a peer to peer wallet with an sms interface available.
	</p>
`)], "mashed Up")]);

export {mashedUp};