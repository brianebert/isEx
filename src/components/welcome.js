import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
    <div>
      <img src="./me.jpg" style="float:left;width:240px;height:250px;border-radius:20%;margin-left:10%;margin-right:5%;margin-bottom:5%;">
      <p class="storyTelling" style="margin-top:5%">
        Hi, I'm Brian.  You're reading this page out of the distributed web, courtesy of <a href="http://ipfs.io" target="_blank"><b>ipfs</b></a>.  They can tell you
        about themselves better than I can; please browse their site.  This 
        <a href="http://longnow.org/seminars/02018/aug/06/long-term-info-structure/" target="_blank">video</a> of Juan Benet at 
        The Long Now Foundation says a lot about "why?"  Why affects everyone and non-technical people enjoy the video, so please share.
      </p>
      <p class="storyTelling">
      	Files added to ipfs are stored in a repository on the node that receives the data.  When the file is added, the contents are hashed, 
      	a mathematical process 
      	that yields a unique result for any input.  That hash is used as the files' address.  If another node 
      	requests a file, it will store a copy in its repository.  Locality of interest in data promises efficiency and torrent based data 
      	transport offers high performance.  Further reading on playing with <strong>ipfs</strong> on these pages is available from 
        <a href="/ipfsHere" class="menuItem">ipfsHere</a>.
      </p>
      <p class="storyTelling">
      	Since any ipfs node can see your data, any ipfs node can serve your web site, or any other data you add, as long as the node knows your site's 
      	address.  Guessing takes a lot of work in a space of 10<sup>78</sup> addresses.  You have to tell someone the address of your files 
      	in order for them to request a copy and serve it.  Ipfs has a lot of parts that help, including name service <strong>ipns</strong> amd a pub/sub 
      	network, but when I picked up ipfs I already knew how to use <a href="https://stellar.org" target="_blank"><strong>stellar</strong></a>.
      </p>
      <p class="storyTelling">
      	<em>The Stellar Development Foundation</em> provides a blockchain that settles transactions within seconds.  It uses a voting consensus 
      	protocol that has been proven by a repubable security expert.  Stellar applies its consensus protocol to transactions in assets issued 
      	on the stellar blockchain, eliminating user code entirely when debiting and crediting accounts.  They've abstracted public/private key pairs into an 
      	object that can sign transactions or documents, as well as encrypt your data to keep it private.  Stellar accounts provide space to write key:value pairs, 
      	or short phrases of information 
      	with some restrictions on their content.  In lieu of learning about several different parts of ipfs, I mashed them together, using 
      	<strong>stellar</strong> to indellibly write the location of documents added to <strong>ipfs</strong>, and to give human friendly 
      	names to ipfs files and stellar accounts.
      </p>
      <p class="storyTelling">
      	The mashup <a href="/demoDoc" class="menuItem">demoDoc</a> may or may not aid navigation of the 
      	<a href="/demo" class="menuItem">demo</a>.  I hope you enjoy playing with it.
      </p>
    </div>
	`)], "mitou")]);

export {welcome};
