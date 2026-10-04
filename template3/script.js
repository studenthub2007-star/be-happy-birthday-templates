/* =================================
   TEMPLATE 3 INTRO
================================= */
window.addEventListener("load", () => {

    const intro =
        document.getElementById("heartIntro");

    const mainPage =
        document.getElementById("mainPage");


    /*
    =====================================
    0 - 10 sec
    Heart is drawn

    10 - 12 sec
    Heart glow + pulse

    12 - 15 sec
    Cinematic hold

    15 sec
    Transition to webpage
    =====================================
    */


    // Heart drawing completed

    setTimeout(() => {

        intro.classList.add("finished");

    }, 10000);


    // Start cinematic exit

    setTimeout(() => {

        intro.classList.add("exit");

    }, 13500);


    // Reveal webpage

    setTimeout(() => {

        intro.style.display = "none";

        mainPage.classList.add("show");

    }, 15300);

});


/* =================================
   BUTTON
================================= */

function openMessage() {
    startMusic();

    const mainPage =
        document.getElementById("mainPage");

    const loveWebsite =
        document.getElementById("loveWebsite");


    // Hide welcome page

    mainPage.style.opacity = "0";

    mainPage.style.transform =
        "scale(0.95)";


    setTimeout(() => {

        mainPage.style.display = "none";

        loveWebsite.style.display = "block";


        // ENABLE PAGE SCROLLING

        document.documentElement.style.overflowY = "auto";

        document.body.style.overflowY = "auto";

        document.documentElement.style.overflowX = "hidden";

        document.body.style.overflowX = "hidden";


        // Start from top

        window.scrollTo(0, 0);

    }, 1000);

}
/* =================================
   PHOTO VIEWER
================================= */

function openPhoto(imagePath) {

    const viewer =
        document.getElementById("photoViewer");

    const viewerImage =
        document.getElementById("viewerImage");


    viewerImage.src = imagePath;

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closePhoto() {

    const viewer =
        document.getElementById("photoViewer");

    viewer.classList.remove("active");

    // Restore page scrolling

    document.body.style.overflowY = "auto";

    document.documentElement.style.overflowY = "auto";
}


/* =================================
   CLOSE WITH ESCAPE
================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closePhoto();

        }

    }
);


/* =================================
   CLICK OUTSIDE PHOTO
================================= */

document
    .getElementById("photoViewer")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closePhoto();

            }

        }
    );
    /* =================================
   SMOOTH SCROLL
================================= */

function scrollToMessage() {

    const messageSection =
        document.getElementById("messageSection");

    messageSection.scrollIntoView({
        behavior: "smooth"
    });
}


/* =================================
   SCROLL TO MEMORIES
================================= */

function scrollToMemories() {

    const memorySection =
        document.querySelector(".memory-section");

    memorySection.scrollIntoView({
        behavior: "smooth"
    });
}
/* =================================
   ENVELOPE OPEN
================================= */

function openEnvelope() {

    const envelopeArea =
        document.getElementById(
            "envelopeArea"
        );

    const continueButton =
        document.getElementById(
            "messageContinue"
        );


    // Prevent clicking again

    if (
        envelopeArea.classList.contains("open")
    ) {
        return;
    }


    // Open envelope

    envelopeArea.classList.add("open");


    // Show continue button

    setTimeout(() => {

        continueButton.classList.add("show");

    }, 1400);

}
/* =================================
   SCROLL TO FINAL SECTION
================================= */

function scrollToFinal() {

    const finalSection =
        document.querySelector(".final-section");

    finalSection.scrollIntoView({
        behavior: "smooth"
    });

}
/* =================================
   BACKGROUND MUSIC
================================= */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const musicIcon =
    document.getElementById(
        "musicIcon"
    );


let musicPlaying = false;


/* =================================
   START MUSIC
================================= */

function startMusic() {

    if (!backgroundMusic) {
        return;
    }


    backgroundMusic.volume = 0.45;


    backgroundMusic
        .play()
        .then(() => {

            musicPlaying = true;

            updateMusicButton();

        })
        .catch(() => {

            console.log(
                "Music waiting for user interaction."
            );

        });

}


/* =================================
   TOGGLE MUSIC
================================= */

function toggleMusic() {

    if (!backgroundMusic) {
        return;
    }


    if (backgroundMusic.paused) {

        backgroundMusic
            .play()
            .then(() => {

                musicPlaying = true;

                updateMusicButton();

            });

    } else {

        backgroundMusic.pause();

        musicPlaying = false;

        updateMusicButton();

    }

}


/* =================================
   UPDATE BUTTON
================================= */

function updateMusicButton() {

    if (musicPlaying) {

        musicIcon.textContent = "🎵";

        musicButton.classList.add(
            "playing"
        );

    } else {

        musicIcon.textContent = "🔇";

        musicButton.classList.remove(
            "playing"
        );

    }

}