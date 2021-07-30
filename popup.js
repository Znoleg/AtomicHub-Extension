let labelSelect;
let buyButton;

function sendRequest(request, onComplete) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, request, onComplete);
    })
}

function constructLabelsList(res) {
    labelSelect = document.getElementById('labelSelect');
    let labels = res.labels;
    
    for (let i = 0; i < labels.length; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = labels[i];
        labelSelect.appendChild(opt);
    }
    buyButton.disabled = false;
}

window.addEventListener('load', function(){
    document.getElementById('InitButton').addEventListener('click', function() {
        let req = new Array("init", "0");
        sendRequest(req, constructLabelsList);
    })
    
    buyButton = document.getElementById('BuyButton');
    buyButton.addEventListener('click', function() {
        let req = new Array("buy", labelSelect.value);
        sendRequest(req, function(res) {
            
        });
    });
})