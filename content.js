var tid;

function checkErrorPopup() {
    var errorButton = document.getElementsByClassName('btn btn-danger ml-auto mr-auto font-weight-bold bigger-medium-text mt-5')[0];
    if (errorButton != null) {
        errorButton.click();
        checkErrorPopup();
    }
    else {
        
    }
}

function TryGetSecondsButton() {
    document.getElementsByClassName('mt-4 btn btn-primary btn-block btn-lg')[0].click();
}

function TryGetFirstButton(time) {
    var buyButton = document.getElementsByClassName('btn btn-primary btn-block')[0];
    if (buyButton == null) {
        tid = setTimeout(TryGetFirstButton.bind(null, time), time);
    }
    else {
        clearTimeout(tid);
        tid = null;
        buyButton.click();
        TryGetSecondsButton();
    }
}

function TryGetButton(buttonClasses) {
    return document.getElementsByClassName(buttonClasses)[0];
}

function TryGetButtonRecursive(buttonClasses, timeInterval, flag) {
    let tid = null;
    let button = TryGetButton(buttonClasses);
    if (button == null) {
        tid = setTimeout(TryGetButtonRecursive.bind(null, buttonClasses, timeInverval, flag), timeInterval);
    }
    else {
        if (tid != null) {
            clearTimeout(tid);
            tid = null;
        }
        button.click();
    }
}

window.addEventListener('load', function() {
    const timeInterval = 500;
    tid = setTimeout(TryGetFirstButton.bind(null, timeInterval));
    
});