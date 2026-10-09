(function () {
    "use strict";

    var menuButton = document.querySelector(".menu-button");
    var menu = document.querySelector(".site-menu");
    var menuLinks = document.querySelectorAll(".site-menu__link");

    if (!menuButton || !menu) {
        return;
    }


    /* =========================================
       ABRIR / CERRAR MENÚ
    ========================================= */

    menuButton.addEventListener("click", function () {

        var isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menu.classList.toggle("is-open", !isOpen);

    });


    /* =========================================
       CERRAR AL SELECCIONAR UNA OPCIÓN
    ========================================= */

    for (var i = 0; i < menuLinks.length; i++) {

        menuLinks[i].addEventListener("click", function () {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menu.classList.remove("is-open");

        });

    }

}());

/* =========================================
   NEWSLETTER — VALIDACIÓN
========================================= */

var newsletterForm = document.querySelector(
    ".newsletter-section__form"
);

var newsletterMessage = document.querySelector(
    ".newsletter-section__message"
);

if (newsletterForm && newsletterMessage) {

    newsletterForm.addEventListener("submit", function (event) {

        // Evita el envío si los campos no son válidos
        event.preventDefault();

        // Comprueba los campos y muestra los errores del navegador
        if (!newsletterForm.checkValidity()) {
            newsletterForm.reportValidity();
            return;
        }

        // Solo llegamos aquí si los datos son válidos
        newsletterMessage.classList.add("is-visible");

        newsletterForm.reset();

        // Oculta el mensaje después de 3 segundos
        setTimeout(function () {
            newsletterMessage.classList.remove("is-visible");
        }, 3000);

    });

}

/* =========================================
   ENTRADAS
========================================= */

var ticketPrices = {
    saturday: 42,
    sunday: 42,
    pass: 63
};

var ticketQuantities = {
    saturday: 0,
    sunday: 0,
    pass: 0
};

var quantityNumbers = {
    saturday: document.querySelector('[data-quantity="saturday"]'),
    sunday: document.querySelector('[data-quantity="sunday"]'),
    pass: document.querySelector('[data-quantity="pass"]')
};

var totalPrice = document.getElementById("totalPrice");
var comprarEntradas = document.getElementById("comprarEntradas");

var quantityButtons = document.querySelectorAll(
    ".tickets-section__quantity-button"
);


/* Actualizar cantidades y total */

function actualizarEntradas() {
    var total = 0;

    total += ticketQuantities.saturday * ticketPrices.saturday;
    total += ticketQuantities.sunday * ticketPrices.sunday;
    total += ticketQuantities.pass * ticketPrices.pass;

    if (quantityNumbers.saturday) {
        quantityNumbers.saturday.textContent = ticketQuantities.saturday;
    }

    if (quantityNumbers.sunday) {
        quantityNumbers.sunday.textContent = ticketQuantities.sunday;
    }

    if (quantityNumbers.pass) {
        quantityNumbers.pass.textContent = ticketQuantities.pass;
    }

    if (totalPrice) {
        totalPrice.textContent = total + "€";
    }

    if (comprarEntradas) {
        var hayEntradas = total > 0;

        comprarEntradas.disabled = !hayEntradas;

        comprarEntradas.classList.toggle(
            "tickets-section__buy--disabled",
            !hayEntradas
        );
    }
}


/* Botones + y − */

quantityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var ticket = this.getAttribute("data-ticket");
        var action = this.getAttribute("data-action");

        if (!Object.prototype.hasOwnProperty.call(ticketQuantities, ticket)) {
            return;
        }

        if (action === "increase") {
            ticketQuantities[ticket]++;
        }

        if (action === "decrease" && ticketQuantities[ticket] > 0) {
            ticketQuantities[ticket]--;
        }

        actualizarEntradas();
    });
});


/* =========================================
   MODAL DE COMPRA
========================================= */

var ticketModal = document.getElementById("ticketModal");
var ticketEmailForm = document.getElementById("ticketEmailForm");
var ticketEmail = document.getElementById("ticketEmail");

var closeModalButtons = document.querySelectorAll("[data-close-modal]");


/* Abrir modal al pulsar Comprar */

if (comprarEntradas && ticketModal) {
    comprarEntradas.addEventListener("click", function () {
        if (comprarEntradas.disabled) return;

        ticketModal.classList.add("is-open");
        ticketModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (ticketEmail) {
            ticketEmail.focus();
        }
    });
}


/* Cerrar modal */

function cerrarTicketModal() {
    if (!ticketModal) return;

    ticketModal.classList.remove("is-open");
    ticketModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

closeModalButtons.forEach(function (button) {
    button.addEventListener("click", cerrarTicketModal);
});


/* Cerrar con Escape */

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        ticketModal &&
        ticketModal.classList.contains("is-open")
    ) {
        cerrarTicketModal();
    }
});


/* Enviar entradas al correo y volver al inicio */

if (ticketEmailForm) {
    ticketEmailForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!ticketEmailForm.reportValidity()) return;

        window.location.href = "Index.html";
    });
}