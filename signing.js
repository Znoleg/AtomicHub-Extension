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
        button.click();
    }
}

window.addEventListener('load', async function() {
    await TryGetButtonRecursive("button button-secondary button-large text-1-5rem text-bold mx-1");
});