$(document).ready(function() {
    // Show or hide the sticky footer button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('#scrollTopBtn').fadeIn(200);
        } else {
            $('#scrollTopBtn').fadeOut(200);
        }
    });

    // Animate the scroll to top
    $('#scrollTopBtn').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

    // Handle add-to-cart clicks to update form and scroll
    $('.add-to-cart').click(function(event) {
        event.preventDefault();

        var productId = $(this).data('product-id');
        $('#productSelection').val(productId);
        selectedProductImageUrl = $(this).closest('.product-item').find('img').attr('src');

        $('html, body').animate({
            scrollTop: $("#_form").offset().top
        }, 1000);
    });
});

// WhatsApp button functionality
document.getElementById('whatsappOrderBtn').addEventListener('click', function() {
    var phone = '+201095504278';
    var message = encodeURIComponent("Your custom message here");
    var whatsappUrl = `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappUrl, '_blank');
});

let showTimes = 5;
let count = 0;

// Toggle WhatsApp message visibility
function toggleMessageVisibility() {
    let message = document.getElementById('whatsappMessage');
    message.style.display = (message.style.display === 'none') ? 'block' : 'none';
    count++;

    if (count >= showTimes * 2) {
        clearInterval(toggleInterval);
        message.style.display === 'none';
    }
}

let toggleInterval = setInterval(toggleMessageVisibility, 1000);

document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icons = this.querySelector('.product-icons');
        icons.classList.add('show');
    });
    item.addEventListener('mouseleave', function() {
        const icons = this.querySelector('.product-icons');
        icons.classList.remove('show');
    });
});