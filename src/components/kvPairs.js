const Stellar = require('stellar-sdk');
const CID = require('cids');

const genAccount = "GDLLWRJCV3TGRRB4CVBCH34IQJO52JYBCKEMWSRLMA7SE4PK22QKKDXW";

//import {Page} from '../common/Page.js';
//import {Section} from '../common/Section.js';
import {Div} from '../common/Div.js';

import {xhrp} from '../common/xhrp.js';
import {verify} from '../common/verify.js';
//import {Keypair} from '../../node_modules/stellar-base/src/keypair.js';
import {StrKey} from '../../node_modules/stellar-base/src/strkey.js';

import {accessAccount} from './accessAccountDiv.js';


class KVPairList extends Div {
  constructor(html){
    super(html);
  }

  get onLoad(){
    document.querySelector(".key").addEventListener("input", this.kvPairChange);
    document.querySelector(".val").addEventListener("input", this.kvPairChange);
    document.querySelector(".submitKV").addEventListener("click", this.kvPairSubmit);

    document.getElementById("accountList").addEventListener("change", this.accountChange);

    this.kvPairListInit();   

  }

  get accountChange(){
    return function(){
      console.log(`kvPairs.js changed account to ${document.getElementById("accountList").value}`);
      this.kvPairListInit();
      accessAccount.keypair = null;
    }.bind(this);
  }

  kvPairListInit(){
    document.getElementById("setKVPairStatus").textContent = '';
    let account = document.getElementById("accountList").value;
    let table = document.getElementById("kvTable");
    document.getElementById("kvPairListExplanation").textContent = '';
    for(let i = table.children.length - 1; i > 0; i--){
      table.removeChild(table.children[i]);
    }
    xhrp({"url": `https://horizon.stellar.org/accounts/${account}`})
    .then(function(account){
      let acc = JSON.parse(account)
      let data = acc.data;
      console.log("got account data and pairs are:");
      console.log(data);
      for(let key in data){
        let val = Buffer.from(data[key], 'base64').toString();
        let newRow = document.createElement('tr');
        newRow.appendChild(document.createElement('td'));
        newRow.appendChild(document.createElement('td'));
        newRow.appendChild(document.createElement('td'));
        newRow.children[0].style.cssText = "text-align:right";
        newRow.children[0].textContent = key;
        newRow.children[1].innerHTML = `<b> : </b>`;
        try{  // Process any value that is an ipfs cid
          let cid = new CID(val);
          if(CID.isCID(cid)){
            newRow.children[2].innerHTML = `<a href="https://${location.host}/ipfs/${val}">${val}</a>`;
            newRow.children[2].firstChild.style.color = "gold"
            console.log(`Wrote new link to cid: ${val} and verify's promise is:`);
            let pv = verify(val)
            .then(function(result){
              console.log(`verify(${val}) result is: ${JSON.stringify(result)}`);
              if(result[0].signs)
                newRow.children[2].firstChild.style.color = "green";
              else
                newRow.children[2].firstChild.style.color = "blue";
            })
            .catch(function(err){
              console.log(`error verifying link to address ${cid.toString()}:`);
              console.log(err);
              let myErr = JSON.parse(err.message);
              if(myErr.type === "NOT FOUND")
                newRow.children[2].firstChild.style.color = "DeepPink";
              else if(myErr.type === "BAD SIG")
                newRow.children[2].firstChild.style.color = "purple";
            });
            console.log(pv);        
          }
        } catch(err){
          newRow.children[2].textContent = val;
        }
        table.appendChild(newRow);
        try{  // check whether to add row to account menu
          if(StrKey.decodeEd25519PublicKey(val).length === 32){ // This is a Stellar public key
            let newAccount = true;
            let selector = document.getElementById("accountList");
            for(let child of selector.children){
              if(child.textContent === key)
                newAccount = false;
            }
            if(newAccount){
              let opt = document.createElement('option');
              opt.value = val;
              opt.textContent = key;
              selector.appendChild(opt);
            }
          } else
            console.log("decoded non-stellar ed25519 public key");
        } catch(err){

        }

      }
      document.getElementById("kvTable").style.display = "block"
      this.eventSource = acc.id;
    }.bind(this))
    .catch(function(err){
      console.log("error populating kv list:");
      console.log(err);
      if(err.status === 404){
        document.getElementById("kvTable").style.display = "none"
        document.getElementById("kvPairListExplanation").textContent = `fund Stellar account ${document.getElementById("accountList").value} to post data on it.`;
      } else {
        document.getElementById("kvPairListExplanation").textContent = "unforseen error, see console.";
      }
    })
  }

  set eventSource(account){
    const context = this;
    if(typeof context._es === 'function')  // Close open event source
      context._es();
    var stellarServer = new Stellar.Server('https://horizon.stellar.org');
    var operations = stellarServer.operations().forAccount(account).order('desc').call()
    .then(function(data){
      console.log("data argument to .then for set eventSource is:");
      console.log(data);
      console.log("Found operations paging token: " + data.records[0].paging_token);
      context._es = stellarServer.operations().forAccount(account).cursor(data.records[0].paging_token)
                          .stream({'onmessage':function(e){
                                                console.log("eventsource onmessage function logging: ");
                                                console.log(e);
                                                if(e.type === "manage_data")
                                                  context.kvPairListInit();
                                              },
                                    'onerror': function(err){
                                                console.log("eventsource onerror function logging: " + err);
                                                console.log(err);
                                              }
                          });
      console.log(`set _es to: ${context._es}`);
    })
    .catch(function(err){
      console.log(`failed to set event source for account ${account} and got error;`);
      console.log(err);
    });
  }

  get eventSource(){
    return this._es;
  }

  get kvPairChange() {
    return function(){
      const key = document.querySelector(".key").value;
      const val = document.querySelector(".val").value;
      document.querySelector(".kvPair").textContent = key + ':' + val;
    }
  }

 /* get kvPairSubmit(){
    const context = this;
    return function(){
      const xhr = new XMLHttpRequest();

      const key = document.querySelector(".key").value;
      const val = document.querySelector(".val").value; 
      console.log("The key:value pair is " + key + ":" + val);

      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
          if(xhr.status === 200) {
          console.log(xhr.response);  //  Move message to browser
          context.kvPairListInit();
          } else {
            console.log("Please try writing key:value pair again");  //  Move message to browser
          }
        }
      };

      if(key.length){
        xhr.open('POST', "https://motia.com/api/stellar/setData?key=" + key + "&value=" + val);
        xhr.send('');
      }
    }
  }
}*/

get kvPairSubmit(){
  return function(){
    document.getElementById("setKVPairStatus").textContent = 'Thank you';
    if(accessAccount.keypair && accessAccount.keypair.canSign() && accessAccount.accountId === accessAccount.keypair.publicKey()){
      const key = document.querySelector(".key").value;
      const val = document.querySelector(".val").value; 
      console.log("The key:value pair is " + key + ":" + val);

      Stellar.Network.usePublicNetwork();
      const stellarServer = new Stellar.Server('https://horizon.stellar.org');

      return stellarServer.loadAccount(document.getElementById("accountList").value)
        .then(function(sourceAccount){
          document.getElementById("setKVPairStatus").textContent = 'submitting key:value pair to the blockchain';
          var opts = val.length?{name: key, value: val}:{name: key, value: null};
          console.log("Adding managed data operation with opts " + JSON.stringify(opts));
          var transaction = new Stellar.TransactionBuilder(sourceAccount)
            .addOperation(Stellar.Operation.manageData(opts))
            .build();
          console.log(`about to sign k:v add transaction to ${accessAccount.keypair.publicKey()} with ${accessAccount.keypair.secret()}`);
          transaction.sign(Stellar.Keypair.fromSecret(accessAccount.secretKey));
          return stellarServer.submitTransaction(transaction);
        })
        .then(function(result){
          console.log("Set data pair result:");
          console.log(result);
          document.getElementById("setKVPairStatus").textContent = 'key:value pair accepted, list below will update soon';
          return result
        })
        .catch(function(err){
          console.log('error adding managed data: ');
          console.log(err);
          document.getElementById("setKVPairStatus").textContent = "Sorry, there was a network error.  Please try again.";
        })
      } else {
        document.getElementById("setKVPairStatus").textContent = "You must have the secret key of a valid account, or its password, to set a key:value pair"
      }
    }
  }
}  //  Closes class

const _template = function(){
    return `
      <h2>view account</h2>
      <div class="innerBox section">
        <label for="key">input key of key:value pair</label>
        <input class="key" type="text" id="key" spellcheck=false/
                  placeholder="A string up to 64 bytes long">
        <br/>
          <label for="val">input value of key:value pair</label>
          <input class="val" type="text" id="val" spellcheck=false
                 placeholder="(Optional) 64 bytes.  Leaving value blank will clear the key from the list."
                 onkeypress="this.style.width = (this.value.length + 1) + '.8rem';"/>
        <br/>
        <p class="kvPair"></p>
        <input class="submitKV" type="Submit"/>
        <p class="explanation" id="setKVPairStatus"></p>
      </div>
      <div class="innerBox section">
        <p>Select an account to see its k:v entries</p>
        <select id="accountList">
          <option value="GDLLWRJCV3TGRRB4CVBCH34IQJO52JYBCKEMWSRLMA7SE4PK22QKKDXW">genesis account</option>
        </select>
        <p class="explanation" id="kvPairListExplanation"/>
        <table id="kvTable">
          <tr><th>Key</th><th></th><th>Value</th></tr>
        </table>
      </div>`
    };

const kvPairList = new KVPairList({ "html": _template,
                                    "class": "box",
                                    "id": "kvPairList"});


export {kvPairList};

