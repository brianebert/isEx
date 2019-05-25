import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const whyStellar = new Page([new Section([new Div(`
	<p class="storyTelling">
		Blockchain consensus falls into three basic categories: proof of work, proof of stake and 
		voting.  I’m not qualified to comment on the subtleties of consensus algorithms, but at a 
		superficial level, proof of work algorithms deliver the best abstraction of trust.  While 
		that appeals to me a lot, it is not resource friendly and blocks take a long time to 
		close.  I’m even less qualified to comment on proof of stake, but hasn’t anyone manipulated 
		the price of a commodity in order to corner a market?  Without ability to opine, I’ll wait 
		and see.
	</p>
	<p class="storyTelling">
		Which brings us to voting.  Voting is fast, Stellar consensus time is similar to 
		processing a credit card transaction. Stellar runs a consensus protocol that has been proven by a security 
		researcher, David Mazieres, who is qualified to comment on these things.  It is not so much 
		an abstraction of trust as a distribution of it.  Stellar’s version requires knowing the 
		identity of consensus partners.  It’s a trust hybrid.  While I’d prefer abstracting trust, 
		distributing it may be more palatable to those who hold it closely today.  A day may soon 
		arrive when useful work is proved by miners.
	</p>
	<p class="storyTelling">
		IPFS’s collateral project, Filecoin, mines using storage as work in its consensus 
		algorithm.  Consider the various resources used in computing and networking amenable to 
		packaging as work in coin consensus.  Computation, networking, value added products and 
		services like you see at aws.  All these might prove useful work to mine coins into existence.
	</p>
	<p class="storyTelling">
		Until then however we have paradigms of proof of work, like Bitcoin, soon to be proof of stake, 
		Ethereum, and voting, Stellar.  Almost as important as the consensus mechanism but not 
		as often discussed is the application of consensus.  When your latest favorite ERC-20 coin 
		changes hands, who does the debit/credit?  Is it the blockchain or is it the contract 
		running on it?  Stellar consensus looks at every payment.
	</p>
	<p class="storyTelling">
		Stellar permits issue of coins to recipients trust the coin:issuer pair.  Sending a coin 
		payment from the issuer to a trusting account creates the coin.  Sending it back to the 
		issuer destroys it.  Examples of how to issue coins from a pair of accounts to protect 
		issuers are shown on Stellar’s site.  Issuers can also demand to authorize any trusting 
		account, and optionally configure trust authorization revokable.  Stellar checks all of 
		these things before a relevant debit/credit transaction.
	</p>
	<p class="storyTelling">
		Stellar transactions can consist of many operations and execute atomically.  If one 
		operation fails the transaction is rolled back.  This feature is one component of smart 
		contracts on Stellar, which when combined by manipulation of dates and transaction 
		sequence rules, provide smart contract building blocks which execute verified by 
		the blockchain’s consensus.
	</p>
	<p class="storyTelling">
		Stellar’s consensus does not look at the key:value pairs added to accounts, but the 
		pairs are put there in a transaction, so the transaction needs to be signed.  Stellar 
		accounts can be configured with a large set of weighted keys from which elaborate decision 
		systems can be automated, particularly when associated with authenticated documentation 
		such as that pointed to by the data pair being added.
	</p>
	<p class="storyTelling">
		Stellar validation recently went down for a couple of hours.  Conclusions published claim t
		he outage proof that Stellar is centralized.  Intuitively it seems the larger one’s consensus 
		group, the less likely the loss of servers will halt activity.  Uptake of Stellar, and growth 
		of mutual trust among users may be needed to prevent this type of outage.  It may also be the 
		case that the quorum of trustworthy users required to object to consensus should be smaller 
		than the quorum required to agree.  Again, others are more qualified and I look forward to hearing 
		more from Stellar.
	</p>
	<p class="storyTelling">
		I hope you enjoy learning more about <a href="https://stellar.org" target="_blank">Stellar</a>.
  </p>	
`)], "why Stellar?")]);

export {whyStellar};