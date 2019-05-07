import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const ipfsIntro = new Page([new Section([new Div(`
	<p>
		IPFS is a file management system that addresses files by their content, and provides a bunch of
		other nice stuff, such as copying content from one ipfs node to another using torrents.  It runs on
		top if internet protocol, like the world wide web does, but when someone requests conent that is
		nearby, ipfs serves that content directly between its repositories, instead of via a centralized
		data store.  This results in some very nice properties and rather listing things here I think are
		seductive about ipfs, you may enjoy readuing more ir watching a video, as I have, directly from
		some of the people at ipfs.
	</p>
	<p>
		You are welcome to play around with ipfs in your browser here, where you can upload files,
		making them available at any ipfs gateway.  I don't "pin" the files when I load them into
		my ipfs repositoty.  Unless they are pinned some how, the files will eventually be garbage
		collected.  You can pin your files here, or try using your hash with another pinning service, or
		try reading your files from enough places that they stay around simply because of how much
		you ask for them.  It's pretty easy to pin them here however if you want to do that.
	</p>
`)], "ipfs intro")]);

export {ipfsIntro};