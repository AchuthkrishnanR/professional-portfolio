const text = [
    "Aspiring Software Developer",
    "AI Enthusiast",
    "CSE Student",
    "Future Full Stack Developer"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {

    if(count === text.length) {
        count = 0;
    }

    currentText = text[count];

    letter = currentText.slice(0, ++index);

    document.getElementById("typing-text").textContent = letter;

    if(letter.length === currentText.length) {

        count++;
        index = 0;

        setTimeout(type, 1000);

    } else {

        setTimeout(type, 100);
    }
}

type();
/* SCROLL REVEAL ANIMATION */

ScrollReveal().reveal('.hero-content', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000
});

ScrollReveal().reveal('.about', {
    delay: 200,
    distance: '50px',
    origin: 'left',
    duration: 1000
});

ScrollReveal().reveal('.skills', {
    delay: 200,
    distance: '50px',
    origin: 'right',
    duration: 1000
});

ScrollReveal().reveal('.project-card', {
    delay: 200,
    interval: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000
});

ScrollReveal().reveal('.contact', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000
});