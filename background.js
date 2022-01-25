chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ active: true }, function () {
        console.log("Ignotus is on");
    });
});

