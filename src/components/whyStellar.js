import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const whyStellar = new Page([new Section([new Div(`
	<p class="storyTelling">
		All those ledger copies are kept in agreement by offering competitive incentive to 
		write a page of accounts indelibly.  If someone wants to go back in time and make a 
		change they will need to do a computationally impossible amount of work to catch 
		up their illicit change to the current state of the ledger.  The system of 
		account agreement, <em>consensus</em>, and the record of accounts, the <em>blockchain</em>, have 
		been operating over ten years, with <em>mining</em> incentives available to those who 
		prove work done.  Bitcoin’s market cap today is over USD$150B.  The 
		fact a ten year old public system can store that much value demonstrates its 
		integrity.
	</p>
	<p class="storyTelling">
		Since the introduction of Bitcoin in 2008, on the order of 1000 different 
		blockchains have appeared.  Out of a wide variety, most of their consensus systems 
		fall into a mix of three categories, proof of work, proof of stake and voting.  Proof 
		of work algorithms can deliver a pure abstraction of trust, but Bitcoin spends an 
		intolerable amount of electricity to operate and confidence in outcome can take an 
		hour.  Ethereum is leaving its faster proof of work for proof of stake, another 
		general consensus category.  Stakeholders have manipulated markets before, so I guess 
		we’re going to see.
	</p>
	<p class="storyTelling">
		Which brings us to voting.  Consensus voting is fast, very similar to the time 
		it takes to process a credit card transaction. Stellar runs a version that has been 
		proven by a well known security researcher.  Stellar’s voting protocol requires 
		knowing the identity of consensus partners.  It is not so much an abstraction of 
		trust as a distribution of it.    Distributing trust may be more palatable to those 
		who hold it closely today than abstracting trust out of their hands. 
	</p>
	<p class="storyTelling">
		A day may soon arrive when useful work is proved by miners quickly.  Consensus 
		will evolve, including replacement of Bitcoin'so hash searches with useful 
		work.  Consider the various resources used in computing and 
		networking packaged as work proved.  Mining of coins 
		for all networked activities seems a reasonable goal.   Choice of consensus 
		type can change, as we see from Ethereum.  There is more to consider when choosing 
		a blockchain.
	</p>
	<p class="storyTelling">
		Even more important than type of consensus, is the manner it is applied by the 
		blockchain.  Coins issued on Stellar all have their debit/credit operations verified 
		by the blockchain’s consensus.  No code needs to be written nor audited to issue 
		and trade coins on Stellar.  They trade under consensus on a distributed 
		marketplace.  Complete charts of accounts can be built on Stellar, with consensus 
		verified rules regarding what assets can be held in which accounts.  Trading partners 
		can share books in elevated confidence of compliance.
	</p>
	<p class="storyTelling">
		Stellar transactions can include many operations which execute atomically.  If one 
		operation fails the transaction is rolled back.  This feature is one component of smart 
		contracts on Stellar, which when combined by manipulation of dates and transaction 
		sequence rules, provide smart contract building blocks which execute verified by 
		the blockchain’s consensus.
	</p>
	<p class="storyTelling">
		Stellar’s consensus does not look at the key:value data entries added to accounts, but the 
		pairs are put there in a transaction, so the transaction needs to be signed.  Stellar 
		accounts can be configured with a large set of weighted signatures from which flexible decision 
		systems can be automated, particularly when associated with documentation 
		pointed to by an IPFS address.
	</p>
	<p class="storyTelling">
		Stellar validation recently went down for a couple of hours.  Conclusions published claim 
		the outage proof Stellar is centralized.  Intuitively it seems the larger one’s consensus 
		group, the less likely the loss of a given number of servers will halt activity.  Uptake of Stellar, and growth 
		of mutual trust among users may be needed to prevent this type of outage.  It may also be the 
		case that the quorum of trustworthy users required to object to consensus should be smaller 
		than the quorum required to agree.  I look forward to hearing 
		more from Stellar, the experts in these matters.
	</p>
	<p class="storyTelling">
		I hope you enjoy learning more about <a href="https://stellar.org" target="_blank">Stellar</a>.
  </p>	
`)], "why Stellar?")]);

export {whyStellar};