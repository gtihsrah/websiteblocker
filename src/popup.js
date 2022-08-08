


//document.getElementById("blockButton").value="11111";





document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let website = trimAddress(url);
        let websiteBlocked = isBlocked(website);
        if(websiteBlocked === true) {
            document.getElementById("blockButton").style.display="none";
            document.getElementById("unblockButton").innerText="Unblock " + website;
        }
        else {
            document.getElementById("unblockButton").style.display="none";
            document.getElementById("blockButton").innerText="Block " + website;
        }

        let blockButton = document.getElementById("blockButton");
        

       // blockButton.addEventListener('click', blockme(), false);


       blockButton.addEventListener('click', function() {
           blockme(website);
           }, false);
        
        // use `url` here inside the callback because it's asynchronous!
    });
  }, false);


  function blockme(website) {
    let value = "haahah";
    chrome.storage.sync.set({ website : value }, function() {
        alert(website + " blokced");
        if (chrome.runtime.error) {
          alert("Runtime error.");
        }
      });
  }

  function getAddress() {
    let website = chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let website = trimAddress(url);
        return website;
    });
    return website;
  }


  function isBlocked(website) {
    let urlBlocked = chrome.storage.sync.get(website, function(result)  {
        return result.key;
    });
    alert('is ' + website + ' blocked? - ' + urlBlocked);
    if(urlBlocked == null || urlBlocked == "undefined") {
        return false;
    }
    return urlBlocked;
  }


  function trimAddress(website) {
    let firstdot = website.indexOf(".");
    let afterfirstdot = website.substring(firstdot+1);
    let seconddot = afterfirstdot.indexOf(".");
    let result = afterfirstdot.substring(0, seconddot);
    return result;
  }


