
var cookieButton = document.querySelector(".cookie-confirm")
var cookieClose = document.querySelector(".cookie-close")

if (localStorage.getItem('cookieAccepted') === 'false') {
    document.querySelector(".popup").style.display = "block";
}
else if (localStorage.getItem('cookieAccepted') !== 'true'){
    localStorage.setItem('cookieAccepted', 'false');
}

cookieButton.addEventListener("click", () => {
    localStorage.setItem('cookieAccepted', 'true');
    document.querySelector(".popup").style.display = "none";
    alert('Cookies Accepted');

})


cookieClose.addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
    localStorage.setItem('cookieAccepted', 'false');
})


