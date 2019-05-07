import {Keypair} from '../../node_modules/stellar-base/src/keypair.js';
import {Div} from '../common/Div.js';
import {xhrp} from '../common/xhrp.js';

const tickerURL = "https://poloniex.com/public?command=returnTicker";
const tickerInterval = 60000  // milliseconds


const _template = function(){  //  MUST SET ID ATTRIBUTE IN ARGUMENT TO CONSRUCTOR TO RENDER TEMPLATE LITERALS
  //let nKP = this.newKpChecked;
  return `
      <h2>Need to import or create a  Stellar account?</h2>
      <div class="innerBox section">
        <input type="checkbox" name="importSecret" id="importSecret" autocomplete="off"${this.iSC}/>
        <label for="importSecret">Import a Stellar account key.</label>
        <p class="explanation output" id="importInfo">Password protect a key and save here</p>
      </div>
      <div class="section">
        Key source: <br/>
        <input type="radio" name="keySource" value="useMine" id="keyMine" autocomplete="off"/>
        <label for="key192">Use my existing key</label>
        <input type="radio" name="keySource" value="createNew" id="keyNew" autocomplete="off"/>
        <label for="key256">Create a new Keypair for me</label>
        <p class="explanation" id="keySourceInfo">
          Use exisiting Stellar account keys or create new?
        </p>
      </div>
    `       
}.bind({"iSC":``});

const keyInputTemplate = function(){
  return `
    <div class="innerBox section">
      <label for="stellarSecret">Enter the secret key for the Stellar account you want to use</label>
      <input type="password" class="wide" name="stellarSecret" id="stellarSecret" autocomplete="off" tabindex="1"/><br/>
      <p class="explanation">
        After entering your secret key here, enter a password above to encrypt and save your key
      </p>
    </div> 
      `
}

const newKeyTemplate = function(newId, newSecret){
  return `
    <div class="innerBox section">
      <p class="output">
        Your new account id is: ${newId}
      </p>
      <p class="output">
        Your new secret key is: ${newSecret}
      </p>
    </div>   
    `
}

class AccountFunding extends Div {
  constructor(template){
    super(template);
    this.importSecretChecked = false;
  }

  get _ticker(){
    let result = {"tickRequest": Date.now()};
    return xhrp({"url": tickerURL})
            .then(function(data){
              result["tickResult"] = Date.now();
              let tick = JSON.parse(data);
              let pairs = ['USDC_BTC', 'BTC_ETH'];

              for(let pair of pairs)
                result[pair] = tick[pair].last;
              
              return Promise.resolve(result)
            })
  }

  set tick(t){
    this._tick = t;
  }
  get tick(){
    return this._tick
  }

  get limits(){
    let usd_btc = parseFloat(this.tick.USDC_BTC), 
        btc_eth = parseFloat(this.tick.BTC_ETH);

    const limits = {"ethMin": Math.round(10000/(usd_btc*btc_eth))/1000,
                    "ethMax": Math.round(50000/(usd_btc*btc_eth))/1000,
                    "btcMin": Math.round(10000/usd_btc)/1000,
                    "btcMax": Math.round(50000/usd_btc)/1000,
                    "ethAccount": "dummy eth account",
                    "btcAccount": "dummy btc account"
                  };

    return limits
  }

  get _timeOut(){
    let context = this;
    return function(e){
      if(context.timers.hasOwnProperty('ticker')){
        window.clearTimeout(context.timers['ticker'].id);
      }
      //context.timers = {"ticker": {"delay": tickerInterval, "ontimeout": context._timeOut}};
      context._ticker
      .then(function(data){
        context.tick = data;  
        context.html = _template.bind(context);
        context.reRender();
      })
      .catch(function(err){
        console.log("ticker error:" + JSON.stringify(err));
        console.log(err);
      })       
    }
  }

  get importSecretChange(){
    const context = this;
    return function(){
      console.log("importSecretChange called");
      if(document.getElementById("importSecret").checked){
        //context.removeNewKp();
        console.log("import secret was checked");
        context.importSecretChecked = true;
        document.getElementById("importInfo").textContent = `Please enter a password above, which will be used to encrypt your Stellar
                                                             secret key.`;
        document.getElementById("password").focus(); 
      } else {
        console.log("import secret was unchecked");
        context.importSecretChecked = false;
        document.getElementById("importInfo").textContent = '';
        document.getElementById("password").blur();
      }
    }
  }

  set importSecretChecked(checked){
    this._importSecretChecked = checked;
  }
  get importSecretChecked(){
    return this._importSecretChecked
  }
    get importSecretStr(){
    return this._importSecretChecked ?  ` checked` : ``
  }

  get newKpChange(){
    const context = this;
    return function(){
      console.log("newKpChange called");
      if(document.getElementById("keyMine").checked){
        console.log("useMine was checked");
        document.getElementById("keySourceInfo").textContent = `Finish creating a new Stellar account by fundung the new account id:`;
        //document.getElementById("password").focus(); 
      } else {
        console.log("new kp was unchecked");
        document.getElementById("newKpInfo").textContent = '';
      }
    }
  }


  onLoad(){
    console.log("In Instruction Box onLoad");
    //this._timeOut();
    document.getElementById("importSecret").addEventListener("change", this.importSecretChange);
    document.getElementById("keyNew").addEventListener("change", this.newKpChange);    
  }
}



const fundAccount = new AccountFunding({"html":_template,
                                        "class": "box col2",
                                        "id": "instructionBox"});

export {fundAccount};