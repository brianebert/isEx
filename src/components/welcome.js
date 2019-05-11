import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
		<p>
			Hi, I'm Brian.  Out of concern for global warming I'm a pirate now.  I used to be a pig.  
			I'll keep all this personal stuff short.  I might add more later, so don't get too comfortable.
		</p>
		<p>
			You're reading this page out of <a href="http://ipfs.io" target="_blank">ipfs</a>.  They can tell you
			about themselves better than I can, amd I hope you'll browse their sites.  This page owes 
			a lot to their video, which influenced how and how often I question myself about what I do.  
			When you add a file to ipfs that data 
			is assigned a unique address derived from its content.  Any ipfs node can read the file added 
			by requesting the contents of the ipfs address.  Any change to the content and the address 
			changes.
		</p>
		<p>
			I only use a small portion of the of ipfs api.  One notable part of ipfs I don't use is the 
			name system, ipns.  I read early on that the ipns implementation was experiencing problems, and I 
			already knew how to post key/value pairs on the <a href="https://stellar.org" target="_blank">stellar</a> 
			blockchain.  Stellar closes blocks in seconds, so I used stellar data entires to
			relate human readable names with addresses of both ipfs content and stellar accounts.  
			My mashup creates an indelible record of immutable data, without restriction on size.  You can write 
			any file into ipfs and associate its unique address with something human friendly by writing 
			a phrase and its associated address into the stellar blockchain.
		</p>
		<p>
			You can load files into ipfs on my <a href="${document.location.href}/demo/" target="_blank">demo</a> page.  
			Once you load your files, they can be seen by anyone, anywhere.  That's a feature, but you might 
			want to keep your content private.  If so, you can encrypt them during upload, using the 
			Stanford Javascript Crypto Library <a href="${document.location.href}/sjclDemo" target="_blank">sjcl</a>.  The sjcl 
			demo page can be used to decrypt your uploaded files to verify their content.
		</p>
		<p>
			Stellar keypairs can sign any upload you make.  You can post any identity document you wish in the 
			associated account, linking that identity indelibly with the account's public key.  The stellar keypair 
			signs the plaintext of any file encrypted at upload.  Your signature can be affixed to any document youi
			upload and the signature related to whatever means you choose to identify yourself.
		</p>
		<p>
			
		</p>
	`)], "welcome")]);

export {welcome};
