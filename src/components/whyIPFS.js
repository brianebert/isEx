import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const whyIPFS = new Page([new Section([new Div(`
	<p class="storyTelling">
		IPFS is part of an ambitious project touching many requirements of distributed storage, 
		from content addressing to crypto mining with constructive proof of work to pay for 
		the physical storage itself.  I touched as 
		little as I could to store files and inscribe their hash in a blockchain.  I didn’t 
		even use IPNS, the naming system.  IPFS has added a files api since the first time I 
		touched it.  I con’t use that either.  I write human readable text into a Stellar account 
		with its pair IPFS address.  The small part of IPFS I use is distributed storage 
		democratized.  Even people like me can enjoy this.
	</p>
	<p class="storyTelling">
		File systems are very basic.  Pretty much everything stored gets dumped into them.  Am 
		IPFS repository does that too, but under management of a daemon that forms a swarm with a 
		lot of other computers.  Files are addressed by their hash, making IPFS data immutable, 
		and requests for a file propagate among swarms of computers running the file 
		system.  Repositories with copies send file chunks in a torrent, promising delivery 
		performance.  The system also promises to take advantage of locality of interest, 
		minimizing hops to torrent over.
	</p>
	<p class="storyTelling">
		There are some complaints about IPFS performance, ironic for a file system that uses 
		torrents to move data.  When an IPFS node is asked for a file, it has no idea where the 
		file is.  The request propagates over the network until someone who has it responds.  You 
		can try this with my demo.  The link serves it out of motia.com, but you can use ipfs.io 
		to see it as well.  If you load a file and add its address to a Stellar account using one 
		host, then click the link to the file from the other browser, it should take some seconds 
		before the new addition loads.  Once an IPFS node serves a file it keeps a copy, and the 
		next access will not exhibit the initial delay.
	</p>
	<p class="storyTelling">
		Ensuring data availability and performance is not complicated.  Anyone serving data from 
		a database keeps replicas distributed.  Managing an IPFS service which proactively 
		distributes new data among a group of IPFS repositories is a similar size task to setting 
		up and maintaining database replicas.
	</p>
	<p class="storyTelling">
		Please read more about <a href="http://ipfs.io" target="_blank">IPFS</a>, and don't 
		miss <a href="http://longnow.org/seminars/02018/aug/06/long-term-info-structure/" 
		target="_blank">Juan Benet at The Long Now Foundatio</a>.
  </p>
`)], "why IPFS?")]);

export {whyIPFS};