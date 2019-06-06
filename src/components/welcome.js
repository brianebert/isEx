import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const welcome = new Page([new Section([new Div(`
    <div>
      <img src="./me.jpg" style="float:left;width:240px;height:250px;border-radius:20%;margin-left:10%;margin-right:5%;margin-bottom:5%;">
      <p class="storyTelling" style="margin-top:5%">
				I was lied to about me in a red brick schoolhouse.  Ironic lies illistrating the virtue of truth 
				telling.  Elaborate lies obfuscating spy games.  Lies that change history, 
				while truths remain secreted.  We've been lied to until we chose an 
				obvious, habitual liar to lead us.
			</p>
			<p class="storyTelling">
				Martin Gurri developed an idea and published a book, "The Revolt of the Public.." et 
				cetera, in 2014.  Gurri re-published last year, with a victory lap chapter reviewing 
				intervening events.  His hypothesis still holds.  His conclusion: <em>negation</em> 
				unites politics worldwide.
			</p>
			<p class="storyTelling">
				Nihilism is extreme negation.  We exhibit nihilism fatally and frequently.  We 
				the public, we aren't normally the ones coming up with the solutions.  Logically 
				however I can't see we have a lot of choice.  If we're trusting authority less, 
				and negativism bubbles all around, regularly errupting in fatality, then waiting 
				for answers from someone else looks like a bad bet.  These pages are simply me not 
				doing nothing.  I demonstrate 
				some <em>tools</em> here: primitives for systems of authenticated 
				documentation, communication and transaction.  Means of trusting peers without 
				intermediaries who sell trust for various lucre.  “Here” is 
				a network whose architecture may challenge the basis of the internet 
				economy, and you're already using it.  "Here" will become what people who 
				arrive make of it.
			</p>			
    </div>
	`)], "mitao")]);

export {welcome};
