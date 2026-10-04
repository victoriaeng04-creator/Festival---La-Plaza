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