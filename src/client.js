//import {welcome} from './components/welcome.js';
//import {ipfsIntro} from './components/ipfsintro.js';
//import {TestTwo} from './components/TestTwo.js';
//import {uploader} from './components/ipfsUpload.js'
//import {kvPairList} from './components/kvPairs.js';
import {stellarAccount} from './components/stellarAccountSection.js';
import {NavBar} from './common/nav.js';

import {LocalNode} from './common/ipfs.js';
/*
let localNode = new LocalNode("https://motia.com");
console.log(`localNode.ready is: ${localNode.ready}`);
console.log(localNode);
setTimeout(function(){
  console.log(`localNode.ready is: ${localNode.ready}`);
  if(localNode.ready){
    new LocalNode("https://motia.com").then(function(result){
      return result.loadCID("QmdnkskcpFjid39bzcQbtFKjpaduY9uZyx673DYxAjJJ4W")
    })
              .then(function(obj){
                console.log(`localNode hash is ${obj.hash}`);
                return obj.myFam()
              })
              .then(function(obj){
                console.log("fetched parents and their children:");
                console.log(obj.fam);
                console.log("siblings are");
                console.log(obj.siblings);
                console.log("and a sibling is:");
                console.log(obj.sibling({"Name": "tf1"}));
              })
              .catch(function(err){
                console.log("error getting families");
                console.log(err);
              });

let ln = new LocalNode("https://motia.com")
              .then((result) => result.loadCID("QmdnkskcpFjid39bzcQbtFKjpaduY9uZyx673DYxAjJJ4W"))
              .then(function(obj){
                console.log(`localNode hash is ${obj.hash}`);
                return obj.myFam()
              })
              .then(function(obj){
                console.log("fetched parents and their children:");
                console.log(obj.fam);
                console.log("siblings are");
                console.log(obj.siblings);
                console.log("and a sibling is:");
                console.log(obj.sibling({"Name": "tf1"}));
              })
              .catch(function(err){
                console.log("error getting families");
                console.log(err);
              });   */           
  //}
//}, 1000);
/*
while(!localNode.ready);

localNode.loadCID("QmURdeHegU9ia8HjDFM9ypvFcX75zHf92iewcSe1EoG2ku")
.then(function(cid){
  console.log("loaded CID:");
  console.log(cid);
})
.catch(function(err){
  console.log("error loading QmURdeHegU9ia8HjDFM9ypvFcX75zHf92iewcSe1EoG2ku:");
  console.log(err);
})
*/


const site_cfg = {
  "/": stellarAccount/*welcome,
  "/ipfsIntro": ipfsIntro,
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
document.getElementById("password").focus();