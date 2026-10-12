/* =====================================
   MADAM JII ❤️ — TEMPLATE 5
   Interactive Animations
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const birthdayPage = document.getElementById("birthdayPage");
    const openButton = document.getElementById("openButton");
    const surpriseButton = document.getElementById("surpriseButton");
    const surpriseMessage = document.getElementById("surpriseMessage");

    // Open the birthday surprise
    if (openButton && intro && birthdayPage) {

        openButton.addEventListener("click", () => {

            intro.classList.add("hide");
            birthdayPage.classList.add("show");

            createFloatingHearts();

        });

    }

    // Reveal the special birthday message
    if (surpriseButton && surpriseMessage) {

        surpriseButton.addEventListener("click", () => {

            surpriseMessage.classList.toggle("show");

            if (surpriseMessage.classList.contains("show")) {
                surpriseButton.textContent = "Your Special Message ❤️";
            } else {
                surpriseButton.textContent = "A Little Surprise For You 🎁";
            }

        });

    }

    // Create floating hearts
    function createFloatingHearts() {

        const heartSymbols = ["❤️", "💗", "💕", "💖", "💘"];

        setInterval(() => {

            const heart = document.createElement("div");

            heart.className = "floating-heart";

            heart.textContent =
                heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = (16 + Math.random() * 22) + "px";
            heart.style.animationDuration = (5 + Math.random() * 5) + "s";

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 11000);

        }, 650);

    }

});
// MADAM JII MUSIC PLAYER

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");

if (birthdayMusic && musicButton) {

    musicButton.addEventListener("click", async () => {

        if (birthdayMusic.paused) {

            try {
                await birthdayMusic.play();

                musicButton.textContent = "❚❚ Pause Our Song";
                musicStatus.textContent = "Playing just for you, Madam Jii ❤️";

            } catch (error) {

                musicStatus.textContent =
                    "Please add your birthday song to the music folder 🎵";

            }

        } else {

            birthdayMusic.pause();

            musicButton.textContent = "▶ Play Our Song";
            musicStatus.textContent = "Paused with love 💗";

        }

    });

}
// MADAM JII — OPEN THE BIRTHDAY LETTER

const envelope = document.getElementById("envelope");
const openLetterButton = document.getElementById("openLetterButton");

if (envelope && openLetterButton) {

    openLetterButton.addEventListener("click", () => {

        const isOpen = envelope.classList.toggle("open");

        if (isOpen) {
            openLetterButton.textContent = "Close Your Letter 💗";
        } else {
            openLetterButton.textContent = "Open Your Letter 💌";
        }

    });

}
// MADAM JII — CAKE CUTTING AND FIREWORKS

const cutCakeButton = document.getElementById("cutCakeButton");
const candleFlame = document.getElementById("candleFlame");
const cakeMessage = document.getElementById("cakeMessage");
const fireworksLayer = document.getElementById("fireworksLayer");

if (cutCakeButton && candleFlame && cakeMessage && fireworksLayer) {

    cutCakeButton.addEventListener("click", () => {

        candleFlame.classList.add("extinguished");

        cakeMessage.textContent =
            "Happy Birthday, Madam Jii! Make every wish count! ❤️🎉";

        cutCakeButton.textContent = "Celebration Time! 🎆";
        cutCakeButton.disabled = true;

        // Create several fireworks bursts
        for (let burst = 0; burst < 8; burst++) {

            setTimeout(() => {

                const centerX = 10 + Math.random() * 80;
                const centerY = 10 + Math.random() * 65;

                for (let particle = 0; particle < 18; particle++) {

                    const spark = document.createElement("span");
                    const angle = (Math.PI * 2 * particle) / 18;
                    const distance = 40 + Math.random() * 80;

                    spark.className = "firework";

                    spark.style.left = centerX + "%";
                    spark.style.top = centerY + "%";

                    spark.style.setProperty(
                        "--dx",
                        Math.cos(angle) * distance + "px"
                    );

                    spark.style.setProperty(
                        "--dy",
                        Math.sin(angle) * distance + "px"
                    );

                    spark.style.background =
                        ["#ff4f91", "#ffd166", "#ffffff", "#c77dff"][
                            Math.floor(Math.random() * 4)
                        ];

                    fireworksLayer.appendChild(spark);

                    setTimeout(() => spark.remove(), 1200);
                }

            }, burst * 350);

        }

    });

}