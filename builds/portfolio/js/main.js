const navbarToggle = document.querySelector(".hamburger-icon");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar ul a");

navbarToggle.addEventListener("click", navbarToggleClick);

// if the navbar togle is clicked open it
function navbarToggleClick() {
    navbarToggle.classList.toggle("open-hamburger-icon");
    navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navLinkClick));

// if a navbar item is clicked close the navbar
function navLinkClick() {
    if (navbarMenu.classList.contains("open")) {
        navbarToggle.click();
    }
}