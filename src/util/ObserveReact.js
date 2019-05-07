export default class {
  constructor(classes){
    this.classes = classes;
    this.config = this._init(this);
    console.log("Created oR instance:");
    console.log(this.config);
  }

  set classes(classes){
    this._classes = classes;
  }

  get classes(){
    return this._classes
  }

  set observer(mutationObserver){
    this._observer = mutationObserver;
  }

  get observer(){
    return this._observer
  }

  set config(obj){
    this._config = obj;
  }

  get config(){
    return this._config
  }

  _init(context){  
    const config = { characterData: true , // Just grab it all for now
                     characterDataOldValue: false,
                     attributes: true,
                     childList: true,
                     subtree: true };

    var observerCfg = {"watching": []};
    context.observer = new MutationObserver(context.reactor(context));
    for(let rClass of this.classes){
      var classCfg = {"class": rClass, "nodeIds": []};
      document.querySelectorAll("." + rClass).forEach(function(node){
        context.observer.observe(node, config);
        classCfg.nodeIds.push(node.id);
      });
      observerCfg.watching.push(classCfg);
    }
    return observerCfg
  }

  reactor(context){
  // Callback function to execute when mutations are observed
    return function(mutationsList) {
      const rClasses = context.classes;
      var observing = true;
      for(var mutation of mutationsList) {
          console.log("mutation: " + mutation.type);
          console.log(mutation);
          if (mutation.type === 'childList') {
            console.log('childList changed ');
            for(let rClass of rClasses){
              console.log("Looking for rClass: " + rClass);
              if(mutation.target.classList.contains(rClass)){
                console.log("Found " + rClass + " in target node class list");
                document.querySelectorAll("." + rClass).forEach(function(node){
                  console.log("Found node id: " + node.id);
                  if(node.id !== mutation.target.id){
                    console.log("Disconnecting observer");   //  Have a DOM node with rClass and isn't target
                    if(observing){
                      context.observer.disconnect();
                      observing = false;
                    }
                    for(var removed of mutation.removedNodes){
                      // Now loop through child nodes
                      for(var child of node.childNodes){
                        if(removed.isEqualNode(child)){
                          console.log("Removing " + child.nodeName + " from dom node id " + node.id);
                          node.removeChild(child);
                        }
                      }
                    }
                    for(var added of mutation.addedNodes){
                      console.log("Adding " + added.nodeName + " node to node id " + node.id);
                      node.appendChild(added.cloneNode(true));
                    }
                  }
                });
            }
          }
        }  // ends "if mutation type is childList" clause
      }
      if(!observing){
        context.config = context._init(context);  // Shnould be about to reconnect one node here
        console.log("Reinitialized observer");
        console.log(context.config);
      }        
    }
  }
}