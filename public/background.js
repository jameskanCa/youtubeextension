function runBackgroundScript() {
  //googleUserProfile();
  chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (
        details.url !== "https://www.youtube.com" &&
        details.url.includes("youtube") &&
        details.url.includes("watch")
      ) {
        chrome.tabs.sendMessage(details.tabId, {
          type: "updatedLink",
          currentURL: details.url,
          metadata: await requestVideoMetadata(details.url),
        });
        chrome.tabs.sendMessage(details.tabId, {
          type: "removeNoteButton",
          visible: false,
        });
        chrome.identity.getProfileUserInfo((user) => {
          chrome.tabs.sendMessage(details.tabId, {
            type: "userProfile",
            userId: user.id,
          });
        });
      } else {
        chrome.tabs.sendMessage(details.tabId, {
          type: "noModal",
        });
      }
    });
  });
}
runBackgroundScript();

function googleUserProfile() {
  chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.identity.getProfileUserInfo((user) => {
      chrome.storage.sync.get(["userEmail"], function(result) {
        if (result.userEmail == null) {
          chrome.storage.sync.set({ userEmail: result.userEmail }, function() {
            alert("Data saved");
          });
        }
      });
      chrome.storage.sync.get(["userId"], function(result) {
        if (result.userId == null) {
          chrome.storage.sync.set({ userId: user.userId }, function() {
            alert("Data saved");
          });
        }
      });
    });
  });
}

let extractVideoId = function(url) {
  let video_id = url.split("v=")[1];
  if (video_id.indexOf("&") !== null && video_id.indexOf("&") != -1) {
    return video_id.substring(0, video_id.indexOf("&"));
  }
  storeCurrentVideoId(video_id);
  return video_id;
};

function storeCurrentVideoId(video_id) {
  window.localStorage.setItem("youtubeURLVideoId", video_id);
}

let requestVideoMetadata = async function(url) {
  const youtubeApiKey = `&key=-E`;
  const youtubeApiBaseLink =
    "https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=";
  const requestLink = youtubeApiBaseLink + extractVideoId(url) + youtubeApiKey;
  const result = await httpGetAsync(requestLink);
  return result.items[0];
};

let httpGetAsync = function(requestLink) {
  return fetch(requestLink).then(function(response) {
    return response.json();
  });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getCaption") {
    requestVideoCaption(request.languageType).then((xmlResult) => {
      sendResponse({ xmlResult: xmlResult });
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getLanguageOptions") {
    requestVideoLanguageOption().then((xmlResult) => {
      sendResponse({ xmlResult: xmlResult.toString() });
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "setValue") {
    window.localStorage.setItem(request.key, request.value);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getValue") {
    let response = localStorage.getItem(request.key);
    sendResponse({ currentId: response.toString() });
    return true;
  }
});
