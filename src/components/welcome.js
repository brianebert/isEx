import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
    <div>
      <img src="./me.jpg" style="float:left;width:240px;height:250px;border-radius:20%;margin-left:10%;margin-right:5%;margin-bottom:5%;">
      <p class="storyTelling" style="margin-top:5%">
				Thank you for coming.  I’m Brian.  My goal here is <em>to end apportionment of political 
				representation on the basis of anything other than headcount</em>.  Where is here?  Good 
				question.  You’re probably reading a copy of this site from motia.com, but you can do 
				all the same things, store keys, verify credentials, and see pages change dynamically 
				reading the site from ipfs.io, or any other ipfs gateway server.  You think of reading 
				your web pages from a location, but these pages can be served from any location running 
				the Inter-Planetary File System, ipfs.
			</p>
			<p class="storyTelling">
				My political apportionment goal may take a while.  Between now and then I hope what 
				I do here will be useful for people wanting to communicate authentically, know 
				the provenance of news, automate organization, or reign sovereign over their 
				data.  If we’re going to use ipfs for useful things, we’d at least better be able to 
				encrypt our stuff since anyone can see it, from data in storage to personal messages 
				left for our friends.  (You can always run a private network, 
				but that’s not the ethos here.)  This site’s <em>demo</em> uses Stellar blockchain 
				account keys like those used in crypto wallets to do its document encryption and 
				signing.  Stellar accounts are also used for information storage, information pointer 
				storage, and dynamic variable storage.
			</p>
			<p class="storyTelling">
				Mashing the blockchain into document storage extends coverage of trust.  Specific ways 
				that is done and also ways that is not done are mentioned later.  What is covered by 
				blockchain trust, or consensus, will change, and methods of arriving at consensus will 
				change.  The important concept is how consensus systems can extended to cover 
				more than ledger pages of crypto accounts.  Stellar already does a lot, as you will see.  My demo 
				has no size limits on trust coverage.  
			</p>
			<p class="storyTelling">
				Abstracted trust appeared coincident with the 
				banking crisis in 2008.  Millions upon millions had their homes foreclosed while the US 
				diluted its money by 50% over five years, using the new cash to buy toxic assets for taxpayers 
				from culpable bankers.  What timing!  Easier to understand than a credit default swap.  Anyone 
				can copy the ledger.  All copies agree.  No investment of trust in humans.  What?  We won't 
				need to invest trust in bankers and the federal government?  Oh forget it then; back to 
				Facebook.
			</p>
    </div>
	`)], "mitao")]);

export {welcome};
