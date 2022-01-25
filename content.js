
const SYMBOL = "ensh'eass_aen_deithwen"

function textNodesUnder(el) {
    var n, a = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) a.push(n);
    return a;
}

function replace() {
    textNodesUnder(document.querySelector('body')).forEach(function (node) {
        const t = node.textContent;
        if (t.includes(SYMBOL)) {
            node.textContent = "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
        }
    });
}

let encryptComb = ["Control", "Alt", "q"];
let decryptComb = ["Control", "q"];

let keypressState = {
    "Control": false,
    "Alt": false,
    "q": false,
}

function checkIfMatchDecrypt() {
    let ret = decryptComb.reduce((acc, key) => acc && keypressState[key], true);
    console.log(ret);

    Object.keys(keypressState).forEach(key => {
        if (keypressState[key] == true
            && !decryptComb.includes(key)) {
            ret = false;
        }
    });
    return ret;
}

function checkIfMatchEncrypt() {
    let ret = encryptComb.reduce((acc, key) => acc && keypressState[key], true);
    console.log(ret);

    Object.keys(keypressState).forEach(key => {
        if (keypressState[key] == true
            && !encryptComb.includes(key)) {
            ret = false;
        }
    });
    return ret;
}

function checkIfMatchKey(key) {
    return key == "Alt" || key == "Control" || key == "q";
}

function encrypt(text, pass) {
    return CryptoJS.AES.encrypt(text, pass).toString();
}

function decrypt(text, pass) {
    return CryptoJS.AES.decrypt(text, pass).toString(CryptoJS.enc.Utf8);
}

function getDeepestChild(element) {
    if (element.lastChild) {
        return getDeepestChild(element.lastChild)
    } else {
        return element;
    }
}

function keyDownListener(e) {
    console.log("asdasdasd")
    if (!checkIfMatchKey(e.key)) return;
    keypressState[e.key] = true;
    // document.querySelector("#debug").textContent = JSON.stringify(keypressState);
    if (checkIfMatchDecrypt()) {
        console.log("came");
        textNodesUnder(document.querySelector('body')).forEach(node => {
            if (node.textContent.includes(SYMBOL)) {
                console.log(node.textContent, SYMBOL, node.textContent.replace(SYMBOL, ""), secret);
                console.log(decrypt(node.textContent, secret))
                node.textContent = decrypt(node.textContent.replace(SYMBOL, ""), secret);
            }
        })
    }

    if (checkIfMatchEncrypt()) {

        if (window.location.href.includes("facebook")) {
            var actEl = document.activeElement;

            /////// courtesy of https://stackoverflow.com/users/14773752/raandremsil  //////////////
            var dc = getDeepestChild(actEl);
            var elementToDispatchEventFrom = dc.parentElement;

            let sel = document.getSelection();
            selStart = sel.anchorOffset;
            selStartCopy = selStart;
            selEnd = sel.focusOffset;

            console.log(dc.textContent.slice(0, selStart) + dc.textContent.slice(selEnd));
            intendedValue = SYMBOL + encrypt(dc.textContent.slice(0, selStart) + dc.textContent.slice(selEnd), secret);
            dc.textContent = intendedValue;
            elementToDispatchEventFrom = elementToDispatchEventFrom.parentElement;
            //////////////////////////////////////////////////////////////////////////////////////////

            return;
        } else {
            const t = document.activeElement.value;
            document.activeElement.value = SYMBOL + encrypt(t, secret);
        }
    }

}

function keyUpListener(e) {
    if (!checkIfMatchKey(e.key)) return;

    keypressState[e.key] = false;
}

var addListeners = function () {
    document.addEventListener('keydown', keyDownListener);
    document.addEventListener('keyup', keyUpListener)
}

var removeListeners = function () {
    document.removeEventListener('keyup', keyUpListener);
    document.removeEventListener('keydown', keyDownListener);
}

//message listener for background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "set_secret") {
        secret = request.secret;
        console.log(secret);
    } else if (request.command === 'init') {
        addListeners();
    } else {
        removeListeners();
    }
    sendResponse({ result: "success" });
});

//on init perform based on chrome stroage value
window.onload = function () {
    chrome.storage.sync.get('active', function (data) {
        if (data.active) {
            addListeners();
        } else {
            removeListeners();
        }
    });

    chrome.storage.sync.get('secret', function (data) {
        secret = data.secret;
    });
}

