/* =========================================================
   SIMPLE 8 PAGE ALBUM
   ========================================================= */

const cover = document.getElementById("cover");
const pages = document.querySelectorAll(".memory-page");

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const counter = document.getElementById("counter");
const hint = document.getElementById("hint");

const music = document.getElementById("albumMusic");


let currentPage = 0;
let isMoving = false;


/* ---------------------------------------------------------
   UPDATE SCREEN
--------------------------------------------------------- */

function updateAlbum() {

    pages.forEach((page, index) => {

        page.classList.remove("active");

        if (index === currentPage - 1) {
            page.classList.add("active");
        }

    });


    if (currentPage === 0) {

        cover.classList.remove("hide");

        counter.textContent = "COVER";

        hint.textContent =
            "Tap the cover to begin";

        prevButton.disabled = true;

    } else {

        cover.classList.add("hide");

        counter.textContent =
            currentPage + " / " + pages.length;

        hint.textContent =
            "Swipe • Click • Use arrows";

        prevButton.disabled = false;

    }


    nextButton.disabled =
        currentPage >= pages.length;

}


/* ---------------------------------------------------------
   MUSIC
--------------------------------------------------------- */

function startMusic() {

    if (!music) return;

    music.volume = 0.45;

    music.play().catch(() => {
        console.log(
            "Music will start after user interaction."
        );
    });

}


/* ---------------------------------------------------------
   NEXT
--------------------------------------------------------- */

function nextPage() {

    if (isMoving) return;

    if (currentPage >= pages.length) return;

    isMoving = true;

    currentPage++;

    startMusic();

    updateAlbum();

    setTimeout(() => {
        isMoving = false;
    }, 650);

}


/* ---------------------------------------------------------
   PREVIOUS
--------------------------------------------------------- */

function previousPage() {

    if (isMoving) return;

    if (currentPage <= 0) return;

    isMoving = true;

    currentPage--;

    updateAlbum();

    if (currentPage === 0 && music) {
        music.pause();
        music.currentTime = 0;
    }

    setTimeout(() => {
        isMoving = false;
    }, 650);

}


/* ---------------------------------------------------------
   COVER CLICK
--------------------------------------------------------- */

cover.addEventListener(
    "click",
    nextPage
);


/* ---------------------------------------------------------
   BUTTONS
--------------------------------------------------------- */

nextButton.addEventListener(
    "click",
    nextPage
);

prevButton.addEventListener(
    "click",
    previousPage
);


/* ---------------------------------------------------------
   KEYBOARD
--------------------------------------------------------- */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
        ) {
            nextPage();
        }


        if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            previousPage();
        }

    }
);


/* ---------------------------------------------------------
   MOBILE SWIPE
--------------------------------------------------------- */

let startX = 0;
let endX = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        if (
            event.touches.length !== 1
        ) {
            return;
        }

        startX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function(event) {

        if (
            event.changedTouches.length !== 1
        ) {
            return;
        }

        endX =
            event.changedTouches[0].clientX;


        const distance =
            endX - startX;


        if (
            Math.abs(distance) < 60
        ) {
            return;
        }


        if (distance < 0) {

            nextPage();

        } else {

            previousPage();

        }

    },
    {
        passive: true
    }
);


/* ---------------------------------------------------------
   IMPORTANT:
   NO MOUSE WHEEL EVENT
   This keeps normal page scrolling working.
--------------------------------------------------------- */


/* ---------------------------------------------------------
   START
--------------------------------------------------------- */

updateAlbum();

console.log(
    "Our Story album loaded successfully."
);