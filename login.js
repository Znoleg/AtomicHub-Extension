const email = "olezhka.210@gmail.com";
const password = "Nsytrtr21!";

window.addEventListener('load', function() {
    let inputs = document.getElementsByClassName("input-style-1 input-large full-width text-medium text-1-5rem px-2 mb-2");
    inputs[0].value = email;
    inputs[1].value = password;
    let loginButton = document.getElementsByClassName("button-primary full-width button-large text-1-5rem text-bold")[0];
    loginButton.disabled = false;
    loginButton.click();
});