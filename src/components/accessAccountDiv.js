//const Stellar = require('stellar-sdk');
import {Keypair} from '../../node_modules/stellar-base/src/keypair.js';
import {StrKey} from '../../node_modules/stellar-base/src/strkey.js';

import {Div} from '../common/Div.js';
import {xhrp} from '../common/xhrp.js';
import {LocalNode} from '../common/ipfs.js';

var sjcl = require("sjcl");

const _template = function(){
    let checked = this.importSecretChecked ? ` checked` : ``;
    return `
      <h2>keyhole</h2>
      <div class="innerBox section">
        <label for="password">Password:</label>
        <input type="text" class="wide" name="password" id="password" autocomplete="off" tabindex="1"/>
        <input type="submit" value="Enter" name="passwordReady" id="passwordReady" autocomplete="off" tabindex="3"/>
        <p class="explanation" id="passwordExplanation"/>
      </div>
      <div class="innerBox section">
        <input type="checkbox" name="importSecret" id="importSecret" autocomplete="off"${checked}/>
        <label for="importSecret">Import a Stellar account key.</label>
        <p class="explanation output" id="importInfo"></p>
        <div class="output">
          Key source: <br/>
          <input type="radio" name="keySource" value="useMine" id="keyMine" autocomplete="off"/>
          <label for="keyMine">Use my existing key</label>
          <input type="radio" name="keySource" value="createNew" id="keyNew" autocomplete="off"/>
          <label for="keyNew">Create a new Keypair for me</label>
          <input type="text" class="wide" name="stellarSecret" id="stellarSecret" autocomplete="off" tabindex="2"/>
        </div>
      </div>
      `
  }.bind({"importSecretChecked":false});

//  THIS CODE IS SAVED HERE FOR LATER>
const _template_balances = `<div class="innerBox section">
                              <label for="balances">Balances:</label>
                              <table class="output table" id="balances"></table>
                            </div>`
                            ;
//  WITH THIS COMPANION JAVASCRIPT:  document.getElementById("balances").innerHTML = this.accountBalances;                            
//  DO NOT DELETE UNLESS BALANCES ARE DISPLAYED SOMEWHERE


const _templateStuffSaved = ` <div class="innerBox section">
                                <label for="AccountId">Account Id:</label>
                                <p class="output .base64" id="AccountId">The public key of a Stellar account registered here</p>
                              </div>
                              <div class="innerBox section">
                                <label for="AccountName">Account Name:</label>
                                <p class="output .friendly" id="AccountName">You can register a human friendly name for the public key above</p>
                              </div>`;
//  WITH THIS COMPANIPN JAVASCRIPT:
/*    try{
      document.getElementById("AccountName").textContent = this.accountName;
      document.getElementById("AccountId").textContent = this.accountId; 
    } catch(err){
      console.log("stellar account not yet read from blockchain");
    }*/                              

const CWA = "GCG4ZZG2KZGUXHMLCTGRNXSBREHIY6JUIX7PR7LCLA7TZAYSWZQARIAJ";  //  This will go away once integrated

class AccessAccount extends Div {
	constructor(template){
		super(template);
    this.importSecretChecked = false;
    this.newSecret = null;
    this.keypair = null;
	}

  onSubmit(e){
    if(this.importSecretChecked){
      if(StrKey.isValidEd25519SecretSeed(this.newSecret)){
        document.getElementById("passwordExplanation").textContent = `Registering your new credential, thank you.`;
        let kp = Keypair.fromSecret(this.newSecret);
        this.accountKey = {"account": kp.publicKey(), "password": document.getElementById("password").value, "secret": kp.secret()};
        document.getElementById("importSecret").checked = false;
        this.importSecretChange();
      }
    } else {  // not importing new secret key
      document.getElementById("passwordExplanation").textContent = `Thank you.  Looking for secret key for account&password credential.`
      this.accountKey()  //  Decrypt Stellar Key
      .then(function(privateKey){
        if(StrKey.isValidEd25519SecretSeed(privateKey)){

          console.log(`and see private key ${privateKey} in onSubmit`);

          this.keypair = Keypair.fromSecret(privateKey);

          this.account = this.publicKey;  //  Read Account Data
          document.getElementById("passwordExplanation").textContent = `Thank you!  Secret key for ${this.publicKey} found.`;
          document.getElementById("password").value = '';
          document.getElementById("password").placeholder = "Success";
        }
        else{
          console.log(`value of privateKey is ${privateKey}`);
          document.getElementById("password").value = '';
          document.getElementById("password").placeholder = `enter password for ${document.getElementById("accountList").value}`;
          document.getElementById("passwordExplanation").textContent = `sorry, but the key recovered is invalid.  please try another credential.`;
          window.setTimeout(function (){
            document.getElementById("password").focus();
          }, 0); 
        }
      }.bind(this))
      .catch(function(err){
        console.log("error finding account key");
        console.log(err);
        document.getElementById("passwordExplanation").textContent = `sorry, unable to recover a secret key with your password.`;
      });
    }
  }

  get importSecretChange(){
    const context = this;
    return function(){
      console.log("importSecretChange called");
      let password = document.getElementById("password");
      if(document.getElementById("importSecret").checked){
        //context.removeNewKp();
        console.log("import secret was checked");
        context.importSecretChecked = true;
        //document.getElementById("importInfo").textContent = `Please enter a password above, which will be used to encrypt your Stellar secret key.`;
        for(let node of document.getElementsByName("keySource").values()){
          console.log("enabling node id=" + node.id);
          node.addEventListener("change", context.keySourceChange);
          node.disabled = false
        }
        password.placeholder = "before entering a new oassword, ennter your new secret key below";
        password.type = 'password';
        password.disabled = true;
        password.blur();
        document.getElementById("passwordExplanation").textContent = 'Once your new secret key has been entered, come back and enter its password.'
      } else {
        console.log("import secret was unchecked");
        context.importSecretChecked = false;
        //document.getElementById("importInfo").textContent = 'Some palceholder to maintain space';
        document.getElementById("stellarSecret").value = "";
        document.getElementById("stellarSecret").disabled = true;
        document.getElementById("stellarSecret").removeEventListener('input', context.stellarSecretChange);
        for(let node of document.getElementsByName("keySource").values()){
          console.log("disabling node id=" + node.id);
          node.removeEventListener("change", context.keySourceChange);
          node.disabled = true;
          node.checked = false;
        }
        password.value = '';
        password.placeholder = `enter the password for account ${document.getElementById("accountList").value}`;
        password.type = 'password';
        password.disabled = false;
        password.focus();
        document.getElementById("passwordExplanation").textContent = `Retreiving your secret key will enable page features.`  
      }
    }
  }

  set importSecretChecked(ck){
    try{
      document.getElementById("importSecret").checked = ck;
      document.getElementById("password").focus();
    } catch(err){
      console.log("tried calling dom objects before written");
    }
    console.log(`writing importSecret state: ${ck}`);
    this._importSecretChecked = ck;
  }
  get importSecretChecked(){
    return this._importSecretChecked
  }
    get importSecretStr(){
    return this._importSecretChecked ?  ` checked` : ``
  }
  set newSecret(nS){
    console.log(`setting _newSecret: ${nS}`);
    this._newSecret = nS;
  }
  get newSecret(){
    if(StrKey.isValidEd25519SecretSeed(this._newSecret))
      return this._newSecret;
    return null;
  }

  selectedAccountName(){
    let el = document.getElementById("accountList");
    return el.options[el.selectedIndex].textContent
  }

  get keySourceChange(){
    let context = this;
    return function(e){
      console.log("newKpChange called");
      let stellarSecret = document.getElementById("stellarSecret");
      stellarSecret.value = '';
      if(document.getElementById("keyMine").checked){
        console.log("useMine was checked");
        let password = document.getElementById("password");
        password.placeholder = "before entering a new oassword, ennter your new secret key below";
        password.type = 'password';
        password.disabled = true;
        document.getElementById("passwordExplanation").textContent = 'Once your new secret key has been entered, come back and enter its password.'                
        stellarSecret.placeholder = "Enter your Stellar secret key here";
        stellarSecret.addEventListener("input", context.stellarSecretChange);
        stellarSecret.autocomplete = "on";
        stellarSecret.disabled = false;
        stellarSecret.focus();
        document.getElementById("password").disabled = true;
      } else if(document.getElementById("keyNew").checked){
        console.log("new kp was checked");
        stellarSecret.removeEventListener("input", context.stellarSecretChange);
        stellarSecret.autocomplete = "off";
        stellarSecret.disabled = true;
        let newKp = Keypair.random();
        let newSecret = newKp.secret();
        document.getElementById("stellarSecret").value = newSecret;
        context.newSecret = newSecret;
        console.log("DEBUG calling focus on pw input");
        document.getElementById("passwordExplanation").textContent = `You've entered the secret key for account ${newKp.publicKey()}`;
        document.getElementById("password").value = "";
        document.getElementById("password").placeholder = `enter a password for account ${newKp.publicKey()}`
        document.getElementById("password").disabled = false;
        document.getElementById("password").focus();
        //context.onKeyPress();
      }
    }
  }

  get stellarSecretChange(){
    let context = this;
    return function(e){
      let stellarSecret = document.getElementById("stellarSecret");
      let newSecret = stellarSecret.value;
      if(StrKey.isValidEd25519SecretSeed(newSecret)){
        stellarSecret.disabled = true;
        stellarSecret.removeEventListener("input", context.stellarSecretChange);
        stellarSecret.autocomplete = "off";
        stellarSecret.blur();        
        context.newSecret = newSecret;
        let newKp = Keypair.fromSecret(newSecret);
        document.getElementById("passwordExplanation").textContent = `You've entered the secret key for account ${newKp.publicKey()}`;
        document.getElementById("password").value = "";
        document.getElementById("password").placeholder = `enter a password for account ${newKp.publicKey()}`
        document.getElementById("password").disabled = false;
        document.getElementById("password").focus();
        console.log("DEBUG calling focus on pw input");

        //context.onKeyPress();
      }
    }
  }

  set keypair(kp){
    this._keypair = kp;
    try{
      document.getElementById("password").value = "";
      document.getElementById("password").placeholder = `enter password for ${this.selectedAccountName()}`;
      document.getElementById("passwordExplanation").textContent = "If you've already saved a secret key here, enter the password you used to encrypt it.";
      window.setTimeout(function (){
        document.getElementById("password").focus();
      }, 0);       
    } catch { 
      console.log("accountAccess initialized keypair to null.");
    }
    
  }
  get keypair(){
    return this._keypair
  }
  get publicKey(){
    return this.keypair.publicKey()
  }
  get secretKey(){
    return this.keypair.secret()
  }

/**********************
 *  functions named accountXxxx fetch, store, and parses account information for display
 */

  set account(publicKey){  //  Stores response of Stellar account endpoint
    const context = this;
    xhrp({"url": `https://horizon.stellar.org/accounts/${publicKey}`})
      .then(function(data){
        context._account = JSON.parse(data);
        context.accountDisplay();
      })
      .catch(function(err){
        err["usrMsg"] = "error reading account data";
        console.log(err);
      });
  }

  get account(){  // 
    return this._account;
  }

  get accountId(){
    return this.account.id;
  }

  get accountName(){
    if(this.account.data.hasOwnProperty(this.account.id))
      return Buffer.from(this.account.data[this.account.id], 'base64').toString()
    else {
      this.account.data.forEach(function(key){
        if(Buffer.from(this.account.data[key], 'base64').toString === this.account.id)
          return key
      });
      return `no name found for account ${this.account.id}`
    }
  }

  get accountBalances(){  // Formats table rows, one for each balance
    var balances = `<tr><th>Denomination</th><th>Balance</th><th>Issuer</th></tr>`;  //  Create header row
    this.account.balances.forEach(function(denomination){
      let balance = denomination.balance;
      if(denomination.asset_type === "native"){
        balances += `<tr><td>XLM</td><td>${balance}</td><td>Stellar Development Foundation<td></td></tr>`;
      } else {
        balances += `<tr><td>${denomination.asset_code}</td><td>${balance}</td><td>${denomination.asset_issuer}</td></tr>`;
      }
    });
    return balances
  }

  set accountKey(credentials){
    let pw = credentials.password;
    let acc = credentials.account;
    let key = credentials.secret;
    //this._account = {"id":`${Keypair.fromSecret(key).publicKey()}`};
    return this.accountKey()
        .then(function(result){
          if(result){ // ADD TO THIS BLOCK TO FEEDBACK TO UI
            console.log(`set accountKey(key) is returning ${result} without creating new key/password node`);
            document.getElementById("passwordExplanation").textContent = `That credential was already registered, thank you.`;
            document.getElementById("password").value = "";
            document.getElementById("password").placeholder = `enter a password for account ${document.getElementById("accountList").value}`
            document.getElementById("password").disabled = false;
            document.getElementById("password").focus();
            return result
          } else {
              console.log("no key/password node found, so making one.");

              console.log("encrypt attempt with pw: " + pw + " for account " + acc);
              let bitArray = sjcl.hash.sha256.hash(pw + acc);  
 
              let digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
              console.log("The set key password + CWA hash is:" + digest_sha256);
              let pwBlob = new Blob([digest_sha256], {"type":"text/plain"});
              let formData = new FormData();
              formData.append("files", pwBlob, "/hashedPassword.txt");


              let ciphertext = sjcl.encrypt(pw, key);
              console.log("The encrypted key is:" + ciphertext);
              let ctBlob = new Blob([ciphertext], {"type":"text/plain"});
              formData.append("files", ctBlob, "/encryptedKey.txt");


              return new LocalNode("https://motia.com")
                  .then((result) => result.loadCID({"body": formData}))
                  .then(function(result){
                    console.log("credential upload returned:" + result.hash);
                    let url = `https://motia.com/api/ipfs/pin/add?arg=${result.hash}&recursive=true`;
                    return xhrp({"verb": "post", "url": url})
                  })
                  .then(function(pinResponse){
                    console.log("credentials pinned: \n" + pinResponse);
                    this.newSecret = document.getElementById("stellarSecret").value = null;

                    document.getElementById("passwordExplanation").textContent = `Your new credential has been registered, thank you.`;
                    document.getElementById("password").value = "";
                    document.getElementById("password").placeholder = `enter a password for account ${document.getElementById("accountList").value}`

                    document.getElementById("val").value = acc;
                    document.getElementById("key").value = '';
                    document.getElementById("key").placeholder = `Name your new keypair.`
                    document.getElementById("key").focus();

                    return key
                  }.bind(this))
                  .catch(function(err){
                    console.log("error storing password and secret key");
                    console.log(err);
                    return null
                  });
          }
        }.bind(this))
        .catch(function(err){
          console.log("error trying to write new key/password pair");
          console.log(err);
          return null
        })

  }

  get accountKey(){
    return function(obj){
      console.log(`fetching account key with arg=`);
      console.log(obj);
      let pw, acc;
      if(typeof obj === 'object' && obj.hasOwnProperty("password") && obj.hasOwnProperty("account")){
        pw = obj.password;
        console.log(`set pw to ${pw}`);
        acc = obj.account;
      } else {
        let el = document.getElementById("password");
        pw = el.value;
        console.log(`southern route set pw to ${pw}`);
        acc = document.getElementById("accountList").value;
      }
      //el.value = '';
      //el.placeholder = "use a strong password";
      console.log("decrypt attempt with pw: " + pw + " for account " + acc);
      let bitArray = sjcl.hash.sha256.hash(pw + acc);  
      let digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
      console.log("The password hash is:" + digest_sha256);
      let pwBlob = new Blob([digest_sha256], {"type":"text/plain"});
      let formData = new FormData();
      formData.append("files", pwBlob, "hashedPassword.txt");

      return new LocalNode("https://motia.com")
        .then((result) => result.loadCID({"body": formData}))
        .then((result) => result.myFam())
        .then(function(result){
          console.log("credential upload returned:" + result.hash + " with family");
          console.log(result.fam)
          return result.sibling({"Name":"encryptedKey.txt"})
        })
        .then(function(sibling){
          console.log("found encrupted secret key:");
          console.log(sibling);
          return LocalNode.contents(sibling.Hash)
        })
        .then(function(contents){
          let plaintext = sjcl.decrypt(pw, contents);
          console.log("found secret key: " + plaintext);
          return plaintext
        })
        .catch(function(err){
          console.log("error retrieving encrypted secret key:");
          console.log(err);
          return null
        });
    }
  }

  accountDisplay(){
    console.log(`called accountDisplay() for ${this.accountId}`);
  }

	onLoad(){
    console.log("In Stellar Account onLoad");
    document.getElementById("password").type = "password";
    document.getElementById("password").placeholder = `enter password for ${document.getElementById("accountList").value}`;
    document.getElementById("passwordExplanation").textContent = `Retreiving your secret key will enable page features.`
    document.getElementById("passwordReady").addEventListener("click", this.onSubmit.bind(this));
    document.getElementById("importSecret").addEventListener("change", this.importSecretChange);
    document.getElementById("stellarSecret").disabled = true;
    for(let node of document.getElementsByName("keySource")){
      node.disabled = true;
    } 
    console.log(`My id=${this.id}`);
    document.getElementById("password").focus();       
	}
}


const accessAccount = new AccessAccount({ "html": _template,
                                          "class": "box",
                                          "id": "accountAccess"});


export {accessAccount};