


let secretKeyElem = document.querySelector("#secret");

chrome.storage.sync.get('secret', function (data) {
  if(data.secret)
    secretKeyElem.value = data.secret;
});

secretKeyElem.onchange = function (element) {
  const secret = this.value;
  console.log(secret);

  chrome.storage.sync.set({ secret }, function () {
    console.log('The secret is' + secret);
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.storage.sync.set({ 'secret': secret }, function () {
      console.log('The secret is' + secret);
    });
    chrome.tabs.sendMessage(tabs[0].id, { command: "set_secret", secret }, function (response) {
      console.log(response.result);
    });
  });

}





var changeActive = document.querySelector('#changeActive');

chrome.storage.sync.get('active', function (data) {
  changeActive.checked = data.active;
});

changeActive.onchange = function (element) {
  let value = this.checked;

  chrome.storage.sync.set({ 'active': value }, function () {
    console.log('The value is' + value);
  });

  if (value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "init", active: value }, function (response) {
        console.log(response.result);
      });
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "remove", active: value }, function (response) {
        console.log(response.result);
      });
    });
  }

};

