import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
		<p>
			Welcome to my non-corner of a new interweb.  I hope you have fun here, stay a while in this
			new space, and help figure out how we should connect with each other here.  What are the 
			politics in an untrammeleed region?
		</p>
		<p>
			Do we share our information?  Do we conduct commerce?  Who are we?
		</p>
		<p>
			I have some tools here for you to explore a distrubuted file system, ipfs.  You can use the
			gateway at https://motia.com/ipfs, or find files through ipfs.io.  That includes this
			site, which is available at any ipfs gateway.
		</p>
		<p>
			The reason sites or other content can be served out of multiple domains, is that all of the
			files in ipfs are addressed by content, rather than by location.  That's what makes this my
			non-corner of the web.  IPFS files are found by readiung the hash code of its content.  The
			number looks different, but it's even harder for humans than an ip address.
		</p>
		<p>
			IPFS also has a name service, ipns, but people seemed to struggle with it and it was something
			else to learn.  I'm familiar with the blockchain run by Stellar, so I use a feature which allows
			users to attach key:value pairs to a Stellar account.  You can pair an ipfs address to a human
			readable name that way, as well as a lot of other stuff.
		</p>
		<p>
			Among other things users can do with a Stellar account is to use its private key to sign
			documents.  Signiung things is one way of saying who we are.  We can find anonymity on line,
			but we can also forge identity, with or without external authority.  We can free ourselves to
			choose the authorities we accept and we can create those authorities.
		</p>
		<p>
			This introduction began with an invitation.  "A lot of other stuff" is mostly stuff I won't
			think of on my own.  I hope you'll start defining some of that "other stuff," with what you do
			"here."  Have fun.
		</p>
	`)], "welcome")]);

export {welcome};
