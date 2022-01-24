chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ hide: true }, function () {
        console.log("Hide image is on");
    });
});

