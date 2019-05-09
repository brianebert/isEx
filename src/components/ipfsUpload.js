const CID = require('cids');
const sjcl = require("sjcl");
const Stellar = require('stellar-sdk');

//import {Page} from '../common/Page.js'
//import {Section} from '../common/Section.js'
import {Div} from '../common/Div.js';
import {frp} from '../common/frp.js';

import {xhrp} from '../common/xhrp.js';
import {Keypair} from '../../node_modules/stellar-base/src/keypair.js';

import {authPopup} from './authPopup.js';

import {accessAccount} from './accessAccountDiv.js';

//const StellarSecret = "SDIVHNPZIMGVTGVULBF6V2K4EIUMEHWGDULUQNTWI22WXUPROJ6RI2UE"; //PLACEHOLDER
const XLM_per_USD = 10;
const COST_BASIS = 0.00000003/30;
const PRICE_DIGITS = 2;
const destAccount = "GDLLWRJCV3TGRRB4CVBCH34IQJO52JYBCKEMWSRLMA7SE4PK22QKKDXW";

class Uploader extends Div {
  constructor(html){
    super(html);
    Stellar.Network.usePublicNetwork();
  }
  // Show user the files to selected
  get inputChange(){
      return function(){
        var total = 0;
        document.getElementById("pinPriceItems").style.display="none";
        let table = document.getElementById("fileTable");
        if(table.style.display !== "block"){
          table.style.display="block";
          document.getElementById("ipfsSubmit").style.display="block";
          document.getElementById("ipfsSubmit").addEventListener("click", this.upload);
        }
        for(let i = table.children.length - 1; i > 0; i--){
          table.removeChild(table.children[i]);
        }
        let encryptAll = true;
        document.querySelector(".ipfsInstruct").textContent =  'The following will be uploaded to ipfs upon "Submit":';
        Array.prototype.forEach.call(document.querySelector(".input").files, function(file, index){
          console.log("Selected: " + file.webkitRelativePath || file.name)
          total += file.size;
          let newRow = document.createElement('tr');
          newRow.appendChild(document.createElement('td'));
          newRow.appendChild(document.createElement('td'));
          newRow.appendChild(document.createElement('td'));
          newRow.appendChild(document.createElement('td'));
          newRow.children[0].style.cssText = "text-align:right";
          newRow.children[0].textContent = file.size;
          newRow.children[1].textContent = file.webkitRelativePath || file.name;
          newRow.children[2].style.cssText = "text-align:center";
          //newRow.children[2].innerHTML = `<input type="checkbox" class="fileOptions fileRow-${index}" onclick="${this.checkboxChange()}"/>`;
          newRow.children[2].innerHTML = `<input type="checkbox" class="fileCheckbox row${index}"/>`;
          newRow.children[3].style.cssText = "text-align:center";
          //newRow.children[3].innerHTML = `<input type="checkbox" class="fileOptions fileRow-${index}" onclick="${this.checkboxChange()}"/>`;
          newRow.children[3].innerHTML = `<input type="checkbox" class="fileCheckbox row${index}"/>`;
          table.appendChild(newRow);
          if(file.name === 'index.html')
            encryptAll = false;
        });
        if(encryptAll)
          for(let i = 1; i < table.children.length; i++){
            table.children[i].children[2].firstChild.checked = true;
            table.children[i].children[3].firstChild.checked = true;
          }
        document.querySelectorAll(".fileCheckbox").forEach(function(box){
          box.addEventListener("click", this.checkboxChange);
          //console.log("added listener to checkbox");
        }.bind(this));


        let newRow = document.createElement('tr');
        newRow.appendChild(document.createElement('td'));
        newRow.appendChild(document.createElement('td'));
        newRow.appendChild(document.createElement('td'));
        newRow.appendChild(document.createElement('td'));
        newRow.children[0].style.cssText = "text-align:right";
        newRow.children[0].textContent = total;
        newRow.children[1].innerHTML = `<b>Total</b>`;
        newRow.children[2].style.cssText = "text-align:center";
        newRow.children[2].innerHTML = `<input type="checkbox" disabled/>`;
        newRow.children[3].style.cssText = "text-align:center";
        newRow.children[3].innerHTML = `<input type="checkbox"/>`;      
        table.appendChild(newRow);
        document.querySelector(".upStart").textContent =  document.querySelector(".upProgress").textContent =  " ";

     /*   document.querySelectorAll(".fileOptions").forEach(function(el){
          console.log("adding change handler to checkbox:");
          console.log(el);
          el.addEventListener("click", this.checkboxChange);
        });*/

    }.bind(this)
  }


  get upload(){
    const context = this;
      return function(){
      const xhr = new XMLHttpRequest();
      const status = xhr.upload;
      var formD = new FormData;

      // Make sure file list populated and promt user if not
      if(!document.querySelector(".input").files.length){  // No files selected yet
        document.querySelector(".ipfsInstruct").textContent =  'Please select files to upload.';
        return;
      }


      // Use File Upload events to show status to user
      status.onloadstart = function (e) {
        console.log("Upload started: " +e);  //  Move message to browser???  In own line above progress
        document.querySelector(".upStart").textContent =  'IPFS upload has started';
      }
      status.onprogress = function (e) {
        if(e.lengthComputable){
          //console.log("Sent " + e.loaded + " of " + e.total + " bytes.");  //  Move message to browser
          document.querySelector(".upProgress").textContent =  "HTTP sent " + e.loaded + " of " + e.total + " bytes in packet.";
        } else {
          console.log("Progress unavailable.");  //  Move message to browser
        }
      }
      status.onabort = function (e) {
        console.log("Upload aborted: " + e);  //  Move message to browser???
      }
      status.onerror = function (e) {
        console.log("Upload error: " + e);  //  Move message to browser???
      } 
      status.onload = function (e) {
        console.log("Upload load: " + e);  //  Move message to browser???
      } 
      status.ontimeout = function (e) {
        console.log("Upload timeout: " + e);  //  Move message to browser???
      }
      status.onloadend = function (e) {
        console.log("Upload end: " + e);  //  Move message to browser???
      }


      // Add files to FormData object with path if in directory
      let promises = [];
      let filenames = [];
      let fileList = document.querySelector(".input").files;
      let uiList = document.getElementById("fileTable").children;  // Offset by table header
      let ckd = document.getElementById("fileTable").lastChild.lastChild.firstChild.checked;
      for(let i = 0; i < fileList.length; i++){
        if(uiList[i+1].children[2].firstChild.checked){
          ckd = true;
          promises.push(frp(fileList[i]));
          filenames.push(uiList[i+1].children[1].textContent);
          // encrypt file and attach Blob to FormData
          console.log(`special handling for ${uiList[i+1].children[1].textContent} because box checked`);
        } else {
          formD.append("files", fileList[i], uiList[i+1].children[1].textContent);
          console.log(`appended file ${uiList[i+1].children[1].textContent}`);
        }
      }
      let kp = accessAccount.keypair;
      if(ckd){
        if(!kp || !kp.canSign()){
          document.querySelector(".upStart").textContent = "You need to sign into an account to encrypt or sign";
          document.querySelector(".upProgress").textContent = `Please sign into ${document.getElementById("accountList").value} and try  again`;
          return
        }
      }


      // The upload finished successfully
      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
          if(xhr.status === 201) {
          console.log(xhr.responseText);  //  Move message to browser
          var cid = new CID(xhr.responseText);
          let cidStr = cid.toBaseEncodedString();
          let promise;  // put variable in scope of then chain
          if(document.getElementById("fileTable").lastChild.lastChild.firstChild.checked){
            //let kp = Keypair.fromSecret(StellarSecret);
            let sig = {"signer": kp.publicKey(), "signature" : kp.sign(cid.buffer).toString('base64')};
            console.log(`Signed with Keypair for: ${kp.publicKey()}`);
            let blob = new Blob([JSON.stringify(sig)], {"type": "text/plain"});
            let fd = new FormData;
            fd.append("files", blob, `${cidStr}.sig`);
            promise = xhrp({"verb": "post", "url": "https://motia.com/api/ipfs/upload", "body": fd})
          } else {
            promise = Promise.resolve();
          }
          promise.then(function(result){
            console.log(`Past signature upload and result is: ${result}`);
            if(result)
              return xhrp({"url": `https://motia.com/api/ipfs/object/patch/add-link?arg=${cidStr}&arg=${cidStr}.sig&arg=${result}`})
            else
              return Promise.resolve();
          })
          .then(function(result){
            console.log(`Signature linking to ${cidStr} is ${result}`);
            if(result)
              return xhrp({"verb": "post", "url": `https://motia.com/api/ipfs/pin/add?arg=${JSON.parse(result).Hash}`})
                      .then((pinResponse) => xhrp({"url": `https://motia.com/api/ipfs/object/stat?arg=${JSON.parse(pinResponse).Pins[0]}`}))
            else
              //return xhrp({"url": `https://motia.com/api/ipfs/object/stat?arg=${cidStr}`})
              return xhrp({"verb": "post", "url": `https://motia.com/api/ipfs/pin/add?arg=${cidStr}`})
                      .then((pinResponse) => xhrp({"url": `https://motia.com/api/ipfs/object/stat?arg=${JSON.parse(pinResponse).Pins[0]}`}))
          })
          //context.cidSize(cid.toBaseEncodedString())
          .then(function(data){
            let d = JSON.parse(data);
            const size = d.CumulativeSize;
            document.querySelector(".upStart").textContent = '';
            //document.querySelector(".upStart").innerHTML = `Success: <a href="https://${location.host}/ipfs/${cidStr}">${cidStr}</a>`;
            document.querySelector(".upStart").innerHTML =  `Success: <a href="https://${location.host}/ipfs/${d.Hash}">${d.Hash}</a>`+
                                          ` is address of your${cidStr === d.Hash ?'': `<i> signed</i>`} upload.`;
            document.querySelector(".upStart").children[0].style.color = cidStr === d.Hash ?"blue": "green";
            document.querySelector(".upProgress").textContent = '';
            document.querySelector(".upProgress").innerHTML = `Name your upload address below, or select the number of days to pin your files.  Maximum is 30.`;
            document.getElementById("val").value = d.Hash;
            document.getElementById("uploadSize").textContent = size.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            document.getElementById("uploadSize").style.cssText = "text-align:right";
            let days = document.getElementById("daysSelected").value;
            console.log(`Upload complete and pin days in ui selector are: ${days}`);
            if(!isNaN(days)){
              let price = (size * COST_BASIS * days * XLM_per_USD).toFixed(PRICE_DIGITS);
              if(price === "0.00") price = "0.01";
              document.getElementById("pinCost").textContent = price;
              document.querySelector(".upProgress").innerHTML = `<input type="Submit" value="Pin" id="pinSubmit"/>`+
               `<label for="pinSubmit">\t<strong> XLM ${price}</strong> pins your upload for <b>${days}</b> days</label>.`;
              document.getElementById("pinSubmit").addEventListener("click", context.pinIt);
              document.getElementById("pinSubmit").focus();
            }
            document.getElementById("pinPriceItems").style.display="block";
            if(isNaN(days))
              document.getElementById("key").focus();      
          })
          .catch(function(err){
            document.querySelector(".upProgress").textContent = "IPFS Call error: " + err;
            console.log("ipfs call error:");
            console.log(err);
          });
          } else {
            console.log("Please try upload again");  //  Move message to browser
            document.querySelector(".upProgress").textContent = "Please try upload again";
          }
        }
      };      

      console.log(`have collected ${promises.length} FileReader promises`);
      Promise.all(promises)
              .then(function(results){
                for(let i in results){

                  var buf = Buffer.alloc(results[i].byteLength);
                  var view = new Uint8Array(results[i]);
                  for (var j = 0; j < buf.length; j++) {
                      buf[j] = view[j];
                  }
                  // Sign the original content
                  //let kp = Keypair.fromSecret(StellarSecret);
                  let sig = {"signer": kp.publicKey(), "signature" : kp.sign(buf).toString('base64')};
                  console.log(`Signed ${filenames[i]}.sig with Keypair for; ${kp.publicKey()}`);
                  let blob = new Blob([JSON.stringify(sig)], {"type": "text/plain"});
                  formD.append("files", blob, `${filenames[i]}.preImageSig`);
                  // Encrypt the content
                  let ct = sjcl.encrypt(kp.secret(), buf.toString('base64'));
                  formD.append("files", new Blob([ct], {"type":"text/plain"}), `${filenames[i]}.ct`);
                  console.log(`appended file ${filenames[i]}`)


                }
                xhr.open('POST', "https://motia.com/api/ipfs/upload");
                xhr.send(formD);
                console.log(`sent FormData to server`);
              })
              .catch(function(err){
                console.log(`Error processing files checked for encryption/signing:`);
                console.log(err);
              });        
    }
  }

  get checkboxChange(){
    return function(e){
      //console.log(`saw checkbox change event:`);
      //console.log(e);
      let classes = e.target.classList;
      let row = null;
      e.target.classList.forEach(function(c){
        //console.log(`target class ${c}`);
        row = c.match(/row*/);
        if(row){
          //console.log(`found row class ${c}`);
          document.querySelectorAll(`.${c}`).forEach(function(box){
            //console.log(`found class ${c} at element:`);
            //console.log(box);
            if(box !== e.target)
              box.checked = e.target.checked;
          });
        row = null;
        }
      });
    }
  }

  cidSize(key){
    return new Promise(function(resolve, reject){
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
          if(xhr.status === 200) {
          console.log(xhr.response);  //  Move message to browser
          resolve(xhr.response);
          } else {
            console.log("Please try findung object size again");  //  Move message to browser
            reject("Server error: " + xhr.status);
          }
        }
      };
      xhr.open('GET', "https://motia.com/api/ipfs/object/stat?arg=" + key);
      xhr.send('');
    })
  }

  get price(){
      let days = document.getElementById("daysSelected").value;
      let size = document.getElementById("uploadSize").textContent.replace(/,/g, '');
      let price = (parseFloat(size) * COST_BASIS * days * XLM_per_USD).toFixed(PRICE_DIGITS);
      if(price === "0.00") price = "0.01";
      console.log(`computed price as: ${price} and is type ${typeof price}`);
      return price
  }

  get pinIt(){
    return function(){
      console.log(`click on "pin" button detected.`);
      let credentials;
      let workingDate;
      let popup = authPopup();
      popup.result()
      .then(function(obj){
        console.log(`popup promise resolved to ${JSON.stringify(obj)}`);
        
        credentials = obj;
        if(credentials.hasOwnProperty("password") && credentials.hasOwnProperty("account")){ // Got a credential
          popup.message = "thank you, we're checking the credentials you entered";   
          return accessAccount.accountKey(credentials)
        }else {
          popup.closeWindow();
          return Promise.reject(new Error(`{"type": "CANCEL", comment": "user canceled sign transaction"}`));
        }
      })
      .then(function(key){
        console.log(`accessAccount.accountKey(obj) returned ${key}`);
        if(key){
          popup.message = `found secret key for account ${credentials.account}`;
          credentials["key"] = key;
          let price = this.price;
          let stellarServer = new Stellar.Server('https://horizon.stellar.org');
          return  stellarServer.loadAccount(credentials.account)
                                .then(function(sourceAccount) {
                                  var transaction = new Stellar.TransactionBuilder(sourceAccount)
                                    .addOperation(Stellar.Operation.payment({"destination": destAccount,
                                                                                "asset": Stellar.Asset.native(),
                                                                                "amount": price}))
                                    .build();
                                  transaction.sign(Stellar.Keypair.fromSecret(key));
                                  console.log(`sumitting transaction for account ${credentials.account} signed by ${key}`);
                                  return stellarServer.submitTransaction(transaction);
                                })
                                .then(function(result){
                                  console.log(`payment sent to: ${destAccount} with result ${result}`);
                                  console.log(result);
                                  return result
                                })
                                .catch(function(err){
                                  console.log("Error submitting payment to Stellar:");
                                  console.log(err);
                                })
        }else{
          return Promise.reject(new Error(`{"type": "BAD CRED", "credentials": "${credentials.account}", "comment": "no secret key found for password"}`));
        }
      }.bind(this))
      .then(function(result){
        document.querySelector(".upProgress").innerHTML = `<strong>Thank you! your upload has been pinned with Stelllar ` + 
                                                          `transaction hash <code>${result.hash}</code>.</strong>`;
        console.log(`pin transaction result is: ${result.hash}`);
        workingDate = new Date();
        const receipt = {"Stellar transaction hash": `${result.hash}`,                       
                          "paid": `${document.getElementById("pinCost").textContent}`,
                          "to pin ipfs cid": `${document.querySelector(".upStart").getElementsByTagName("a")[0].text}`,
                          "for this many days": `${document.getElementById("daysSelected").value}`,
                          "at": `${workingDate.toGMTString()}`};
        console.log(`pin receipt is: ${JSON.stringify(receipt)}`);
        console.log(receipt);
        let blob = new Blob([JSON.stringify(receipt)], {"type": "text/plain"});
        let formD = new FormData;
        formD.append("files", blob, `${workingDate}.rcpt`);   
        return xhrp({"verb": "post", "url": "https://motia.com/api/ipfs/upload", "body": formD})     
      })
      .then(function(address){
        popup.closeWindow();
        console.log(`receipt uploaded to ${address}`);
        let stellarServer = new Stellar.Server('https://horizon.stellar.org');
        return  stellarServer.loadAccount(credentials.account)
                              .then(function(sourceAccount) {
                                var transaction = new Stellar.TransactionBuilder(sourceAccount)
                                  .addOperation(Stellar.Operation.manageData({"name": `${workingDate.valueOf().toString()}.rcpt`,
                                                                              "value": address}))
                                  .build();
                                transaction.sign(Stellar.Keypair.fromSecret(credentials.key));
                                console.log(`sumitting manageData account ${credentials.account} signed by ${credentials.key} with name=${workingDate}.rcpt and value=${address}`);
                                return stellarServer.submitTransaction(transaction);
                              })
                              /*.then(function(result){
                                console.log(`data set on account: ${kp.publicKey()} with result ${result}`);
                                console.log(result);
                                return result
                              })*/
                              .catch(function(err){
                                console.log("Error setting data to Stellar:");
                                console.log(err);
                                throw new Error(`{"type": "STELLAR ERROR", "error": "${JSON.stringify(err)}", "comment": "look in extras"}`)
                              })       

      })
      .then(function(result){
        console.log("Posted data pair for receipt and result is:");
        console.log(result);
      })
      .catch(function(err){
        console.log("uploader.pinIt() caugth error:");
        console.log(err);
        try{
          let m = JSON.parse(err.message);
          if(m.hasOwnProperty("type")){
            if(m.type === 'BAD CRED'){
              popup.closeWindow();
              let savedHTML = document.querySelector(".upProgress").innerHTML;
              document.querySelector(".upProgress").innerHTML = `<strong>Bad credentials submitted.  Please start over.</strong>`;
              setTimeout(function(){
                document.querySelector(".upProgress").innerHTML = savedHTML;
                document.querySelector(".upProgress").firstChild.focus();
                document.getElementById("pinSubmit").addEventListener("click", this.pinIt);
                console.log("fuck");
              }, 2000);
            }
          }
        } catch{
          console.log("some error responding to my own error message");
        }
      }.bind(this));
    }.bind(this)
  }

  get onLoad(){
    console.log("in uploader onLoad()");
    document.querySelector(".ipfsInstruct").textContent =  'No files have been selected';
    document.querySelector(".input").addEventListener("change", this.inputChange);
    let daysDefault = document.createElement("option");
    daysDefault.textContent='#';
    daysDefault.selected = true;
    document.getElementById("daysSelected").appendChild(daysDefault);
    for(let days  of [1,2,5,10,30]){
      let option = document.createElement("option");
      option.textContent = days;
      document.getElementById("daysSelected").appendChild(option);
    }
    document.getElementById("uploadList").style.display = "inline-block";
    document.getElementById("pinPrice").style.cssText = "vertical-align:top;display:inline-block;float:right;";
    document.getElementById("daysSelected").addEventListener("change", function(e){
      let days = document.getElementById("daysSelected").value;
      //let cost = document.getElementById("dayCost").textContent;
      let size = document.getElementById("uploadSize").textContent.replace(/,/g, '');
      //console.log(`Offering to pin ${size} bytes for ${days} days`);
      let price = this.price;//(parseFloat(size) * COST_BASIS * days * XLM_per_USD).toFixed(PRICE_DIGITS);
      if(price === "0.00") price = "0.01";
      document.getElementById("pinCost").textContent = price;
      document.querySelector(".upProgress").innerHTML = `<input type="Submit" value="Pin" id="pinSubmit"/>`+
       `<label for="pinSubmit">\t<strong> XLM ${price}</strong> pins your upload for <b>${days}</b> days</label>.`;
      document.getElementById("pinSubmit").addEventListener("click", this.pinIt);
      document.querySelector(".upProgress").firstChild.focus();
    }.bind(this));
  }

}

const _template = function(){
  return `
    <h2>add files to ipfs</h2>
    <div class="innerBox section">
      <fieldset>
        <legend>Select a file or directory to uplpoad to ipfs</legend>
        <input class="input" type="file" directory multiple webkitdirectory allowdirs/>
      </fieldset>
    </div>
    <p class="section ipfsInstruct"></p>
    <div class="innerBox section container">
      <div id="uploadList">
        <table id="fileTable" hidden>
          <tr><th>Bytes</th><th>Name</th><th>Encrypt</th><th>Sign</th></tr>
        </table>
        <input id="ipfsSubmit" type="Submit" hidden/>
      </div>
      <div id="pinPrice">
        <table id="pinPriceItems" hidden>
          <tr><th>Item</th><th>Cost</th></tr>
          <tr><td>upload size (bytes)</td><td id="uploadSize"></td></tr>
          
          <tr><td>days</td align="right"><td><select id="daysSelected"/></td></tr>
          <tr><td><b>total (XLM)</b></td><td id="pinCost"/></tr>
        </table>
      </div>
    </div>
    <div class="innerBox section">
      <p class="upStart"></p>
      <p class="upProgress"></p>
    </div>`
  };

const uploader = new Uploader({ "html": _template,
                                "class": "box",
                                "id": "uploader"});
// <tr><td>cost/byte/day (XLM$)</td><td id="dayCost"></td></tr>
export {uploader};
