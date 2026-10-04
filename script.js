function viewTemplate(templateNumber) {

    if (templateNumber === 1) {

        alert("Template 01 selected ❤️");

    }

    if (templateNumber === 2) {

        alert("Template 02 selected ✨");

    }

}


function contactUs() {

    alert(
        "Thank you for your interest! ❤️\n\n" +
        "Contact details will be added soon."
    );

}
/* ================================
   BE HAPPY CONTACT FORM
================================ */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector(".form-submit");

        submitButton.disabled = true;
        submitButton.textContent = "Sending... ❤️";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                contactForm.style.display = "none";
                formSuccess.classList.add("show");

            } else {

                submitButton.disabled = false;
                submitButton.textContent = "Send Enquiry ❤️";

                alert("Something went wrong. Please try again.");

            }

        } catch (error) {

            submitButton.disabled = false;
            submitButton.textContent = "Send Enquiry ❤️";

            alert("Please check your internet connection and try again.");

        }

    });

}

function resetContactForm() {

    contactForm.reset();

    formSuccess.classList.remove("show");

    contactForm.style.display = "block";

    const submitButton = contactForm.querySelector(".form-submit");

    submitButton.disabled = false;
    submitButton.textContent = "Send Enquiry ❤️";
}
