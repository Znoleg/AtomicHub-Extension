const buyDivClasses = "DropCard block-card mb-3 h-100";
const labelClasses = "text-break";
const firstBtnClasses = "btn btn-primary btn-block";
const secondBtnClasses = "mt-4 btn btn-primary btn-block btn-lg";
var buyButtons = [];

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

async function buy(id) {
    buyButtons[id].click();
    
    await new Promise(r => setTimeout(r, 100));
    
    let button2 = await TryGetButtonRecursive(secondBtnClasses, 25);
    button2.click();
}

function getBuyInfo() {
    let labelsList = [];
    let cards = document.getElementsByClassName(buyDivClasses);
    for (let i = 0; i < cards.length; i++) {
        labelsList.push(cards[i].getElementsByClassName(labelClasses)[0].textContent);
        buyButtons.push(cards[i].getElementsByClassName(firstBtnClasses)[0]);
    }
    return labelsList;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let reqStr = request[0];
    if (reqStr == "init") {
        let labelsList = getBuyInfo();
        sendResponse({type: "drops", labels: labelsList});
    }
    else if (reqStr == "buy") {
        buy(request[1]);
    }
})