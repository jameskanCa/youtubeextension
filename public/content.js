chrome.runtime.onMessage.addListener(request => {
  if (request.type === "updatedLink") {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div><dialog style="height:40%">
                <iframe id="headlineFetcher"style="height:100%"></iframe>
                <div style="position:absolute; top:0px; left:5px;">  
                    <button>x</button>
                </div>
                </dialog></div>`
    );
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    const iframe = document.getElementById("headlineFetcher");
    iframe.src = chrome.extension.getURL("index.html");
    iframe.frameBorder = 0;
    dialog.querySelector("button").addEventListener("click", () => {
      dialog.close();
    });
  }

  try {
    console.log(request.currentURL);
  } catch{
    console.log("current URL is null");
  }

});



document.body.insertAdjacentHTML(
  "beforeend",
  `<div><dialog style="height:40%">
                <iframe id="headlineFetcher"style="height:100%"></iframe>
                <div style="position:absolute; top:0px; left:5px;">  
                    <button>x</button>
                </div>
                </dialog></div>`
);
const dialog = document.querySelector("dialog");
dialog.showModal();
const iframe = document.getElementById("headlineFetcher");
iframe.src = chrome.extension.getURL("index.html");
iframe.frameBorder = 0;
dialog.querySelector("button").addEventListener("click", () => {
  dialog.close();
});
