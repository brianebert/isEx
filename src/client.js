import {welcome} from './components/welcome.js';
import {whyStellar} from './components/whyStellar.js';
import {whyIPFS} from './components/whyIPFS.js';
import {mashedUp} from './components/mashedUp.js';
import {rePirates} from './components/rePirates.js';
//import {TestTwo} from './components/TestTwo.js';
//import {uploader} from './components/ipfsUpload.js'
//import {kvPairList} from './components/kvPairs.js';
//import {stellarAccount} from './components/stellarAccountSection.js';
import {NavBar} from './common/nav.js';

import {LocalNode} from './common/ipfs.js';


const site_cfg = {
  "/": welcome,
  "/whyStellar": whyStellar,
  "/whyIPFS": whyIPFS,
  "/mashedUp": mashedUp,
  "/rePirates": rePirates
  /*,
  "/NestTwo": TestTwo,
  "/ipfsUpload": uploader,
  "/kvPairs": kvPairList,
  "/StellarAccount": stellarAccount*/
}

const navBar = NavBar(site_cfg);
console.log(navBar);


for(var route in site_cfg){
  var sections = site_cfg[route].sections;
  sections.push(navBar);
  if(sections.length === 3){
    let section = sections[1];
    sections[1] = sections[2];
    sections[2] = section;
  }
  site_cfg[route].sections = sections;
}

console.log(site_cfg);

//  Load html and hook up javascript
document.body.innerHTML = site_cfg["/"].html;
site_cfg["/"].onLoad();