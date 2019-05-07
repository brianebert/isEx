
export function xhrp(opts){
  return new Promise(function(resolve, reject){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4){
        if(xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.responseText);
        } else {
          reject({"requestUrl":opts.url,
                  "status":xhr.status,
                  "statusText":xhr.statusText});
        }
      }
    };

    if(!opts.hasOwnProperty("verb") || opts.verb.toUpperCase() === "GET"){  // Only GETting at the moment
      xhr.open("GET", opts.url);
      if(opts.hasOwnProperty("stream") && opts.stream){
        xhr.setRequestHeader("Accept: text/event-stream");
      }
      //console.log("Sent request to " + opts.url);
      xhr.send();
    } else if(opts.verb.toUpperCase() === "POST"){
      xhr.open('POST', opts.url);
      if(opts.hasOwnProperty("body"))
        xhr.send(opts.body);
      else
        xhr.send({});
    }
  })
}
  