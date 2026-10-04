const mainImage =
    document.getElementById("mainImage");

const message =
    document.getElementById("message");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const exploreSection =
    document.getElementById("exploreSection");

const exploreButton =
    document.getElementById("exploreButton");

const videosSection =
    document.getElementById("videosSection");

const backButton =
    document.getElementById("backButton");


// =====================================
// APOLOGY STAGES
// =====================================

const stages = [

    {
        image: "images/sorry.png",
        text: "Sorry Please forgive Me maaa🥺",
        no: "Nooo maaa"
    },

    {
        image: "images/2.png",
        text: "Plz Don't Do This maaa🥺",
        no: "NOOO maaaa"
    },

    {
        image: "images/NOOO.png",
        text: "NOOO 😭 maaaa",
        no: "I'm gonna cry maaa..."
    },

    {
        image: "images/crying.png",
        text: "I'm gonna cry  maaa😭",
        no: "Plz Don't Do This maaa"
    },

    {
        image: "images/please.png",
        text: "Please Forgive Me maaa 🥹",
        no: "Pleaseeee  maaaa 🥺"
    }

];


let stage = 0;


// =====================================
// SHOW STAGE
// =====================================

function showStage() {

    mainImage.src =
        stages[stage].image;

    message.textContent =
        stages[stage].text;

    yesButton.textContent =
        "Yes ♡";

    noButton.textContent =
        stages[stage].no;

}


// =====================================
// NO
// =====================================

noButton.addEventListener(
    "click",
    function () {

        stage++;

        if (stage >= stages.length) {
            stage = stages.length - 1;
        }

        showStage();

    }
);


// =====================================
// YES / ACCEPT
// =====================================

yesButton.addEventListener(
    "click",
    function () {

        mainImage.src =
            "images/happy.png";

        message.textContent =
            "Yayyy Thankyou so much maaa ❤️🌷!! :3";

        document.getElementById(
            "subMessage"
        ).textContent =
            "You made me really happy... ♡";

        yesButton.style.display =
            "none";

        noButton.style.display =
            "none";

        exploreSection.style.display =
            "block";

    }
);


// =====================================
// EXPLORE
// =====================================

exploreButton.addEventListener(
    "click",
    function () {

        document.querySelector(
            ".content"
        ).style.display = "none";

        videosSection.style.display =
            "block";

    }
);


// =====================================
// BACK
// =====================================

backButton.addEventListener(
    "click",
    function () {

        videosSection.style.display =
            "none";

        document.querySelector(
            ".content"
        ).style.display = "flex";

    }
);


// ==========================================
// REALISTIC PETAL + HEART FLOW
// ==========================================

const petalsContainer = document.getElementById("petals");

const particles = [
    "🌸",
    "🌷",
    "🌷",
    "❤️",
    "💕"
];

function createParticle() {

    const particle = document.createElement("div");

    particle.className = "real-particle";

    particle.textContent =
        particles[
            Math.floor(Math.random() * particles.length)
        ];

    // Random position
    particle.style.left =
        Math.random() * 100 + "vw";

    // Random size
    const size =
        Math.random() * 20 + 15;

    particle.style.fontSize =
        size + "px";

    // Different speeds
    const duration =
        Math.random() * 7 + 7;

    particle.style.animationDuration =
        duration + "s";

    // Random delay
    particle.style.animationDelay =
        Math.random() * 2 + "s";

    // Random opacity
    particle.style.opacity =
        Math.random() * 0.5 + 0.5;

    petalsContainer.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, (duration + 2) * 1000);
}


// Initial particles
for (let i = 0; i < 35; i++) {

    setTimeout(
        createParticle,
        i * 180
    );

}


// NONSTOP
setInterval(
    createParticle,
    300
);
// ==========================================
// INTRO → APOLOGY PAGE
// ==========================================

const introPage =
    document.getElementById("introPage");

const nextButton =
    document.getElementById("nextButton");


nextButton.addEventListener("click", function () {

    // Start music
    mySong.play().catch(function(error) {
        console.log("Music could not start:", error);
    });


    // Hide intro
    introPage.style.opacity = "0";

    introPage.style.transition =
        "opacity 0.7s ease";


    setTimeout(function () {

        introPage.style.display = "none";

    }, 700);

});
// ==========================================
// BACKGROUND MUSIC
// ==========================================

const mySong = document.getElementById("mySong");

mySong.volume = 0.7;


// Start music when NEXT is clicked
nextButton.addEventListener("click", async function () {

    try {

        await mySong.play();

        console.log("Music started");

    } catch (error) {

        console.log(
            "Music could not start:",
            error
        );

    }


    // Hide intro
    introPage.style.transition =
        "opacity 0.8s ease";

    introPage.style.opacity = "0";


    setTimeout(function () {

        introPage.style.display = "none";

    }, 800);

});


// =====================================
// START
// =====================================

showStage();