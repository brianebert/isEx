import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const ipfsHere = new Page([new Section([new Div(`
	<p class="storyTelling">
		IPFS is a file system that addresses files by their content, and provides a bunch of
		other nice stuff, such as copying content from one ipfs node to another using torrents.  It runs on
		top if internet protocol, like the world wide web does, but when someone requests conent that is
		nearby, ipfs serves that content directly between its repositories, instead of via a centralized
		data store.  This results in some very nice properties and rather listing things here I think are
		seductive about ipfs, you may enjoy readuing more ir watching a video, as I have, directly from
		some of the people at ipfs.
	</p>
	<p class="storyTelling">
		You are welcome to play around with ipfs in your browser here, where you can upload files,
		making them available at any ipfs gateway.  I don't "pin" the files when I load them into
		my ipfs repositoty.  Unless they are pinned some how, the files will eventually be garbage
		collected.  You can pin your files here, or try using your hash with another pinning service, or
		try reading your files from enough places that they stay around simply because of how much
		you ask for them.  It's pretty easy to pin them here however if you want to do that.
	</p>
  <p class="storyTelling">
  	Financial systems need to bind documents.  Mashing up ipfs and stellar let me play with doing so without servers, databases 
  	or thinking about where my data is.  The data I currently care about is written on "the wall" of a stellar account  There's 
  	actually a lot of overlap between stellar and ipfs, but used together both are more powerful.  Attaching an invoice to a transaction paying it, for 
  	example.  Since stellar accounts provide a rich configuration for signatures. and since posting data to a stellar account occurs in a transaction, 
  	stellar can count signators to a transaction representing a decision taken among signature holders, who may not all sign with the same weight.  That 
  	decision may relate to the self-authenticatiung document refered to in the transaction memo.
  </p>	
`)], "using ipfs here")]);

export {ipfsHere};