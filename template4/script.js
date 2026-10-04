/* ==============================
   CODE RAIN
================================ */

const canvas = document.getElementById("codeRain");
const ctx = canvas.getContext("2d");

let width;
let height;

const fontSize = 16;
let columns;
let drops;

const characters =
    "ILOVEYOU♥♡0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    columns = Math.floor(width / fontSize);

    drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -50;
    }
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function drawRain() {

    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {

        const character =
            characters[
                Math.floor(
                    Math.random() * characters.length
                )
            ];

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle =
            Math.random() > 0.75
                ? "#ff4d94"
                : "#ff0066";

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff0066";

        ctx.fillText(character, x, y);

        ctx.shadowBlur = 0;

        if (
            y > height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i] += 0.45;
    }

    requestAnimationFrame(drawRain);
}

drawRain();


/* ==============================
   HEART PARTICLE SYSTEM
================================ */

const heartCanvas =
    document.getElementById("heartCanvas");

const heartCtx =
    heartCanvas.getContext("2d");

let heartParticles = [];

let heartWidth;
let heartHeight;

function resizeHeartCanvas() {

    heartWidth =
        heartCanvas.width =
        window.innerWidth;

    heartHeight =
        heartCanvas.height =
        window.innerHeight;
}

resizeHeartCanvas();

window.addEventListener(
    "resize",
    resizeHeartCanvas
);


/* Heart mathematical shape */

function heartFunction(t) {

    const x =
        16 *
        Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x,
        y
    };
}


/* Create particles */

function createHeartParticles() {

    heartParticles = [];

    const particleCount = 450;

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const t =
            Math.random() *
            Math.PI *
            2;

        const heart =
            heartFunction(t);

        const scale =
            Math.min(
                heartWidth,
                heartHeight
            ) * 0.018;

        const targetX =
            heartWidth / 2 +
            heart.x * scale;

        const targetY =
            heartHeight / 2 -
            heart.y * scale;


        /* Random starting position */

        const startX =
            Math.random() *
            heartWidth;

        const startY =
            Math.random() *
            heartHeight;


        heartParticles.push({

            x: startX,

            y: startY,

            targetX: targetX,

            targetY: targetY,

            size:
                Math.random() *
                2.5 +
                0.7,

            speed:
                Math.random() *
                0.025 +
                0.01,

            glow:
                Math.random() *
                15 +
                10

        });
    }
}

createHeartParticles();


/* ==============================
   DRAW HEART PARTICLES
================================ */

let heartStartTime =
    performance.now();


function drawHeartParticles(time) {

    heartCtx.clearRect(
        0,
        0,
        heartWidth,
        heartHeight
    );


    /*
       First 3 seconds:
       particles travel to heart
    */

    const elapsed =
        (time - heartStartTime) / 1000;


    for (
        const particle
        of heartParticles
    ) {

        if (elapsed < 3) {

            const progress =
                Math.min(
                    elapsed / 3,
                    1
                );

            /*
               Smooth movement
            */

            const ease =
                progress *
                progress *
                (3 - 2 * progress);


            particle.x =
                particle.x +
                (
                    particle.targetX -
                    particle.x
                ) * ease * 0.035;

            particle.y =
                particle.y +
                (
                    particle.targetY -
                    particle.y
                ) * ease * 0.035;

        } else {

            /*
               Keep particle
               on heart shape
            */

            particle.x =
                particle.x +
                (
                    particle.targetX -
                    particle.x
                ) * 0.04;

            particle.y =
                particle.y +
                (
                    particle.targetY -
                    particle.y
                ) * 0.04;
        }


        heartCtx.beginPath();

        heartCtx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );


        heartCtx.fillStyle =
            "#ff277d";


        heartCtx.shadowBlur =
            particle.glow;

        heartCtx.shadowColor =
            "#ff0066";


        heartCtx.fill();
    }


    requestAnimationFrame(
        drawHeartParticles
    );
}


requestAnimationFrame(
    drawHeartParticles
);


/* ==============================
   HEART GLOW
================================ */

setTimeout(() => {

    const heartContainer =
        document.querySelector(
            ".heart-container"
        );

    if (heartContainer) {
        heartContainer.style.display =
            "none";
    }

}, 3500);
/* ==============================
   MESSAGE SCREEN TRANSITION
================================ */

const messageScreen =
    document.getElementById(
        "messageScreen"
    );

const nextButton =
    document.getElementById(
        "nextButton"
    );


/*
   Show message screen
   after heart formation
*/

setTimeout(() => {

    messageScreen.classList.add(
        "show"
    );

}, 6500);


/*
   Continue button
*/

/* ==============================
   MAIN PAGE TRANSITION
================================ */

const mainPage =
    document.getElementById(
        "mainPage"
    );


nextButton.addEventListener(
    "click",
    () => {

        /* Hide message */

        messageScreen.classList.remove(
            "show"
        );


        /*
           Small delay before
           opening main page
        */

        setTimeout(() => {

            mainPage.classList.add(
                "show"
            );

        }, 700);

    }
);
/* ==============================
   MUSIC PLAYER
================================ */

const musicCard =
    document.getElementById("musicCard");

const musicPlayer =
    document.getElementById("musicPlayer");

const audioPlayer =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playButton");

const musicDisc =
    document.getElementById("musicDisc");

const songStatus =
    document.getElementById("songStatus");


/* Hide music player initially */

musicPlayer.style.display = "none";


/* Open music player */

musicCard.addEventListener(
    "click",
    () => {

        musicPlayer.style.display =
            "block";

        musicPlayer.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* Play / Pause */

playButton.addEventListener(
    "click",
    () => {

        if (audioPlayer.paused) {

            audioPlayer.play();

            playButton.textContent =
                "⏸ Pause";

            songStatus.textContent =
                "Playing our song ❤️";

            musicDisc.classList.add(
                "playing"
            );

        } else {

            audioPlayer.pause();

            playButton.textContent =
                "▶ Play";

            songStatus.textContent =
                "Paused";

            musicDisc.classList.remove(
                "playing"
            );
        }

    }
);


/* When song finishes */

audioPlayer.addEventListener(
    "ended",
    () => {

        playButton.textContent =
            "▶ Play";

        songStatus.textContent =
            "Tap play to start";

        musicDisc.classList.remove(
            "playing"
        );

    }
);
/* ==============================
   PHOTO GALLERY
================================ */

const galleryCard =
    document.getElementById(
        "galleryCard"
    );

const gallerySection =
    document.getElementById(
        "gallerySection"
    );


gallerySection.style.display =
    "none";


galleryCard.addEventListener(
    "click",
    () => {

        gallerySection.style.display =
            "block";

        gallerySection.scrollIntoView({
            behavior: "smooth"
        });

    }
);
/* ==============================
   FULLSCREEN PHOTO VIEWER
================================ */

const photoViewer =
    document.getElementById(
        "photoViewer"
    );

const viewerImage =
    document.getElementById(
        "viewerImage"
    );

const viewerClose =
    document.getElementById(
        "viewerClose"
    );

const viewerPrev =
    document.getElementById(
        "viewerPrev"
    );

const viewerNext =
    document.getElementById(
        "viewerNext"
    );

const viewerCounter =
    document.getElementById(
        "viewerCounter"
    );


/* Get all gallery images */

const galleryImages =
    document.querySelectorAll(
        ".photo-card img"
    );


let currentPhoto = 0;


/* Open photo */

galleryImages.forEach(
    (image, index) => {

        image.addEventListener(
            "click",
            () => {

                currentPhoto = index;

                showPhoto();

                photoViewer.classList.add(
                    "show"
                );

            }
        );

    }
);


/* Show current photo */

function showPhoto() {

    viewerImage.src =
        galleryImages[
            currentPhoto
        ].src;

    viewerCounter.textContent =
        `${currentPhoto + 1} / ${galleryImages.length}`;
}


/* Previous */

viewerPrev.addEventListener(
    "click",
    () => {

        currentPhoto--;

        if (
            currentPhoto < 0
        ) {

            currentPhoto =
                galleryImages.length - 1;

        }

        showPhoto();

    }
);


/* Next */

viewerNext.addEventListener(
    "click",
    () => {

        currentPhoto++;

        if (
            currentPhoto >=
            galleryImages.length
        ) {

            currentPhoto = 0;

        }

        showPhoto();

    }
);


/* Close */

viewerClose.addEventListener(
    "click",
    () => {

        photoViewer.classList.remove(
            "show"
        );

    }
);


/* Close by clicking background */

photoViewer.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            photoViewer
        ) {

            photoViewer.classList.remove(
                "show"
            );

        }

    }
);


/* Keyboard controls */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !photoViewer.classList.contains(
                "show"
            )
        ) {
            return;
        }


        if (
            event.key === "ArrowRight"
        ) {

            viewerNext.click();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            viewerPrev.click();

        }


        if (
            event.key === "Escape"
        ) {

            viewerClose.click();

        }

    }
);
/* ==============================
   VIDEO GALLERY
================================ */

const videoCard =
    document.getElementById(
        "videoCard"
    );

const videoSection =
    document.getElementById(
        "videoSection"
    );


videoSection.style.display =
    "none";


videoCard.addEventListener(
    "click",
    () => {

        videoSection.style.display =
            "block";

        videoSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);
/* ==============================
   LOVE MESSAGE
================================ */

const messageCard =
    document.getElementById(
        "messageCard"
    );

const loveSection =
    document.getElementById(
        "loveSection"
    );

const typingMessage =
    document.getElementById(
        "typingMessage"
    );


loveSection.style.display =
    "none";


messageCard.addEventListener(
    "click",
    () => {

        loveSection.style.display =
            "block";

        loveSection.scrollIntoView({
            behavior: "smooth"
        });

        startTyping();

    }
);


/* ==============================
   TYPING ANIMATION
================================ */

const loveText =
`You make my world brighter
with your smile.

Every moment with you
becomes a beautiful memory.

I am grateful for every
moment we share together.

You will always have
a special place in my heart. ❤️`;


let typingIndex = 0;

let typingStarted = false;


function startTyping() {

    if (typingStarted) {
        return;
    }

    typingStarted = true;

    typingIndex = 0;

    typingMessage.textContent = "";

    typeMessage();
}


function typeMessage() {

    if (
        typingIndex <
        loveText.length
    ) {

        typingMessage.textContent +=
            loveText.charAt(
                typingIndex
            );

        typingIndex++;

        setTimeout(
            typeMessage,
            45
        );

    }

}
/* ==============================
   LOVE EFFECTS SYSTEM
================================ */

const effectsLayer =
    document.getElementById(
        "effectsLayer"
    );


/* ==============================
   FLOATING HEARTS
================================ */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent =
        Math.random() > .5
            ? "♥"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.setProperty(
        "--size",
        Math.random() * 25 + 15 + "px"
    );


    heart.style.setProperty(
        "--duration",
        Math.random() * 5 + 6 + "s"
    );


    heart.style.setProperty(
        "--move",
        Math.random() * 150 - 75 + "px"
    );


    heart.style.setProperty(
        "--opacity",
        Math.random() * .5 + .4
    );


    effectsLayer.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


/* Create hearts continuously */

setInterval(
    createHeart,
    1000
);


/* ==============================
   FALLING PETALS
================================ */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.className =
        "falling-petal";


    petal.style.left =
        Math.random() * 100 + "%";


    petal.style.setProperty(
        "--petal-width",
        Math.random() * 10 + 8 + "px"
    );


    petal.style.setProperty(
        "--petal-height",
        Math.random() * 15 + 12 + "px"
    );


    petal.style.setProperty(
        "--duration",
        Math.random() * 5 + 5 + "s"
    );


    petal.style.setProperty(
        "--move",
        Math.random() * 160 - 80 + "px"
    );


    petal.style.setProperty(
        "--opacity",
        Math.random() * .5 + .3
    );


    effectsLayer.appendChild(
        petal
    );


    setTimeout(() => {

        petal.remove();

    }, 11000);

}


setInterval(
    createPetal,
    700
);


/* ==============================
   SPARKLES
================================ */

function createSparkle() {

    const sparkle =
        document.createElement("div");

    sparkle.className =
        "sparkle";


    sparkle.style.left =
        Math.random() * 100 + "%";


    sparkle.style.top =
        Math.random() * 100 + "%";


    sparkle.style.setProperty(
        "--sparkle-size",
        Math.random() * 5 + 2 + "px"
    );


    sparkle.style.setProperty(
        "--duration",
        Math.random() * 2 + 1 + "s"
    );


    effectsLayer.appendChild(
        sparkle
    );


    setTimeout(() => {

        sparkle.remove();

    }, 4000);

}


setInterval(
    createSparkle,
    350
);
/* ==============================
   CUSTOMIZATION SYSTEM
================================ */

const customizeButton =
    document.getElementById(
        "customizeButton"
    );

const customizer =
    document.getElementById(
        "customizer"
    );

const customizerClose =
    document.getElementById(
        "customizerClose"
    );

const applyCustomization =
    document.getElementById(
        "applyCustomization"
    );


const nameInput =
    document.getElementById(
        "nameInput"
    );

const messageInput =
    document.getElementById(
        "messageInput"
    );

const songNameInput =
    document.getElementById(
        "songNameInput"
    );


/* Open customizer */

customizeButton.addEventListener(
    "click",
    () => {

        customizer.classList.add(
            "show"
        );

    }
);


/* Close customizer */

customizerClose.addEventListener(
    "click",
    () => {

        customizer.classList.remove(
            "show"
        );

    }
);


/* Apply changes */

applyCustomization.addEventListener(
    "click",
    () => {

        const name =
            nameInput.value.trim();

        const message =
            messageInput.value.trim();

        const songName =
            songNameInput.value.trim();


        /* Update name */

        if (name !== "") {

            document.getElementById(
                "recipientName"
            ).textContent = name;

        }


        /* Update message */

        if (message !== "") {

            typingMessage.textContent =
                message;

        }


        /* Update song name */

        if (songName !== "") {

            document.querySelector(
                ".music-player h2"
            ).textContent =
                songName + " ❤️";

        }


        /* Close panel */

        customizer.classList.remove(
            "show"
        );

    }
);