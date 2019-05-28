import {Page} from '../common/Page.js';
import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

const rePirates = new Page([new Section([new Div(`
	<p class="storyTelling">
		In “The Republic of Pirates” Collin Woodard describes democracy with universal 
		suffrage.  Spoils of a raid were divided evenly among the participants, the man 
		elected captain getting two shares.  I like the inclusive simplicity.
	</p>
	<p class="storyTelling">
		Also, as you can see from this graph, there is a statistically significant 
		inverse relationship between the pirate population and global temperature.
	</p>
	<img src="./PiratesVsTemp.png" style="display:block;margin-left:auto;margin-right:auto;width:50%;margin-bottom:20px">	
	<p class="storyTelling">
		I'm trying to do positive things, like cultivating my inner Pirate.  If you missed my 
		demo, it's linked on the "mashedUp" page.  Yargh…
  </p>	
`)], "regarding Pirates")]);

export {rePirates};

//<img src="./PiratesVsTemp.png" style="float:center;width:570px;height:340px;margin-left:20%;margin-right:5%;margin-bottom:5%;">	