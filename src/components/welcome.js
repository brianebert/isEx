import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
    <div>
      <img src="./me.jpg" style="float:left;width:240px;height:250px;border-radius:20%;margin-left:10%;margin-right:5%;margin-bottom:5%;">
      <p class="storyTelling" style="margin-top:5%">
				Hi.  Welcome to my mashup of IPFS with Stellar.  Both can be browsed via the menu for background on their 
				technologies.  If you’re not already familiar with their sites, please take a look.  You can imagine 
				financial systems that function on behalf of end users who retain control of their data.  For starters.  
				I’m sure I’ll rave more subsequently, but first, why Stellar and IPFS?
			</p>
			<p class="storyTelling">
				Like a lot of 2008’s collateral damage, I became intrigued by Bitcoin.  I never liked the asset; it’s too 
				volatile.  The blockchain fascinated me.  Too bad about all that electricity. I tried to work out hedging 
				that left a narrow collar on Bitcoins.  Apparently I’m not good at that because I never did.  The cost of 
				mining kept my interest waning.
			</p>
			<p class="storyTelling">
				The World Affairs Council had a panel on alternative finance for the developing world, or something like 
				that.  Milling around before the start I met one of the panelists, Joyce, who had arrived with a guy named 
				Jed.  She spoke about applying consensus to transactions in arbitrary assets within seconds and without 
				proof of work.  She spoke of savings and useful financial products for people currently constrained to growing 
				their assets on four feet.  I started playing around with Stellar.  When I needed help the people were helpful 
				and nice.
			</p>
			<p class="storyTelling">
				My exposure to Stellar leads me to understand keeping distributed databases from partition is no simple 
				matter.  Plus, someone has to operate them.  IPFS can be simple 
				to work with.  It addresses data by its hash, so recording an IPFS address indelibly authenticates 
				documents.  Stellar provides a space for account holders to write key:value pairs large enough 
				for Stellar or IPFS addresses.  While IPFS documents are not “written into the blockchain” as I hear people 
				say often, authenticity can be recorded for a hash, signed legal work collateralizing a 
				new token, this website, pretty much whatever you can think of.  An intrinsic symbiosis between accounting 
				and document systems led me here.
			</p>
    </div>
	`)], "mitou")]);

export {welcome};
