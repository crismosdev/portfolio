/********************************************************************************
 * File: nav.js
 * Purpose: Opens and closes the burger menu on smaller screens.
 ********************************************************************************/

/********************************************************************************
 * DOM References
 ********************************************************************************/
const menuToggle = document.getElementById("menu-toggle");
const siteHeader = document.querySelector(".site-header");

/********************************************************************************
 * State
 ********************************************************************************/
// Same breakpoint as the CSS media query so JS and CSS agree when the burger is in use.
const burgerMenuQuery = window.matchMedia("(max-width: 1150px)");

/********************************************************************************
 * Functions
 ********************************************************************************/

// Keeps the open class and the button label in sync.
function setMenuOpen(isOpen) {
    siteHeader.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

/********************************************************************************/
// Flips the menu when the burger button is clicked.
function toggleMenu() {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
}

/********************************************************************************/
// Closes the menu when the viewport grows past the burger breakpoint.
// Otherwise the header class can stay open after going back to desktop.
function closeMenuOnDesktop(event) {
    if (!event.matches) {
        setMenuOpen(false);
    }
}

/********************************************************************************
 * Event Handlers
 ********************************************************************************/
menuToggle.addEventListener("click", toggleMenu);

// Escape should get the user out of the menu without clicking the button again.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuOpen(false);
    }
});

// A click outside the header means the user is done with the menu.
document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
        setMenuOpen(false);
    }
});

burgerMenuQuery.addEventListener("change", closeMenuOnDesktop);
