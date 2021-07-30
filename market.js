const labelClasses = "huge2-text font-weight-bold text-break col-12";
const firstBtnClasses = "btn btn-primary btn-block";
const secondBtnClasses = "mt-4 btn btn-primary btn-block btn-lg";
var buyButton;

function TryGetButton(buttonClasses) {
    return document.getElementsByClassName(buttonClasses)[0];
}

async function TryGetButtonRecursive(buttonClasses, timeInterval) {
    let tid = null;
    
    let button = TryGetButton(buttonClasses);
    if (button == null) {
        tid = setTimeout(TryGetButtonRecursive.bind(null, buttonClasses, timeInterval), timeInterval);
    }
    else {
        if (tid != null) {
            clearTimeout(tid);
            tid = null;
        }
        return button;
    }
}

async function buy() {
    buyButton.click();
    
    await new Promise(r => setTimeout(r, 100));
    
    let button2 = await TryGetButtonRecursive(secondBtnClasses, 25);
    button2.click();
}

function getBuyInfo() {
    let labelsList = [];
    labelsList.push(document.getElementsByClassName(labelClasses)[0].textContent);
    buyButton = TryGetButton(firstBtnClasses);
    return labelsList;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request == "init") {
        let labelsList = getBuyInfo();
        sendResponse({type: "market", labels: labelsList});
    }
    else if (request == "buy") buy();
})