let selectedProductImageUrl = ""; // Global variable to store the selected product's image URL

const contactForm = document.querySelector(".php-email-form");
const fullNameInput = document.querySelector("#fullname");
const phoneInput = document.querySelector("#phone");
const addressInput = document.querySelector("#address");
const formMessageDiv = document.querySelector("#formMessage");

const getEmailMessage = ({ name, phone, address, imageUrl } = {}) => {
    const siteUrl = "http://pack389-gl.santediagno.com/"; // Replace with your actual site URL
    const fullImageUrl = siteUrl + imageUrl; // Assuming imageUrl is a relative path

    return `
        <p>You Have Received A New Message From Bionimaroc Measuring Devices:</p>
        <div style="background-color: #101010; color: #fbfbfb; padding: 12px">
            <p style="margin: 0;">Name: ${name}</p>
            <p style="margin: 12px 0;">Phone: ${phone}</p>
            <p style="margin: 12px 0;">Address: ${address}</p>
            <p style="margin: 12px 0;">Product Image: <a href="${fullImageUrl}">${fullImageUrl}</a></p>
            <p style="margin: 12px 0;">Visit our site for more: <a href="${siteUrl}">${siteUrl}</a></p>
        </div>
    `;
};


contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailMessage = getEmailMessage({
        name: fullNameInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        imageUrl: selectedProductImageUrl
    });

    fetch("https://sendmail-api-docs.vercel.app/api/send", {
        method: "POST",
        body: JSON.stringify({
            to: "majidsakr86@gmail.com",
            subject: "Message From Bionimaroc Measuring Devices (Leading)",
            message: emailMessage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        contactForm.reset();
        formMessageDiv.innerHTML = '<p style="color: green;">تم استلام طلبك بنجاح سنتواصل معك الان</p>';
        setTimeout(() => {
            formMessageDiv.innerHTML = '';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        formMessageDiv.innerHTML = '<p style="color: red;">عذرا حدث خطأ قم بالمحاوله مره اخرى بعد دقائق</p>';
        setTimeout(() => {
            formMessageDiv.innerHTML = '';
        }, 5000);
    });
});