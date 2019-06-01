import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
    <div>
      <img src="./me.jpg" style="float:left;width:240px;height:250px;border-radius:20%;margin-left:10%;margin-right:5%;margin-bottom:5%;">
      <p class="storyTelling" style="margin-top:5%">
				I was told lies in a red brick schoolhouse from the ironically simple merit of telling 
				the truth, to the diabolically fantastic Glomar Explorer.  Imagine, a bunch of grown 
				men, serious men, with brightly colored do-dads on their jackets: “what we’re going to 
				do, see, is we’re going to raise this sunken soviet submarine, and we’re going to run a 
				disinformation campaign, targeting our own schoolchildren, to create a cover story.”  How 
				many people had to agree this was a good idea in order to execute the plan?  While in 
				middle school I returned to the schoolhouse with friends who hurled glass jars filled with 
				paint.
			</p>
			<p class="storyTelling">
				I had already joined “the public,” accomplishing my political ends only by my selection of 
				others.  A thorough definition is part of “The Revolt of the Public…,” by Martin 
				Gurri.  Originally published in 2014, it was updated last year with a confirming final 
				chapter.  Where the original is strictly analytical, the new chapter predicts, among other 
				things, growing nihilism, whose predations already erupt fatally and frequently.  Gurri’s 
				hypothesis, that the explosion of information is delegitimizing authority, continues to 
				hold.  We’re not slowing our information production.  Gurri characterizes the public’s 
				response to authority’s loss of control over information by negation.
			</p>
			<p class="storyTelling">
				Nihilism is extreme negation.  It is dangerous and we, the public, will do better or we will 
				suffer.  I hope to start a conversation about tools demonstrated here: primitives for systems 
				of authenticated documentation, communication and transaction.  Means of trusting peers,  
				written in code.  “Here” is a space whose architecture may challenge the basis of the internet 
				economy.  The first instance of a trust network keeps accounts of ‘play” money.  Anyone can have 
				a copy of the ledger.  There is no central authority, and users can trust that all the copies 
				agree.   It appeared in 2008, just as the largest Ponzi scheme in history collapsed.  Government’s 
				response was to buy assets nobody wanted from those culpable for  creating them, diluting dollars 
				by 50% over 5 years to pay for it, then stand by while the culpable evicted millions.  Clearly 
				we can do better.  I’d like to talk to people about tools that may help. 
			</p>
    </div>
	`)], "mitao")]);

export {welcome};
