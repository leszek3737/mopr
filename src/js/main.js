(function () {
    'use strict';
    window.app = {};
    //Nasłuchiwanie kiedy cały DOM został wcztany jesli tak wykonaj 4 funkcjie fillSelectDefaulOptions która pozwoli wczytać jaki dps został wybrany oraz funkcjie kroków 1, 2, 4 potem 
    document.addEventListener("DOMContentLoaded", function () {
        window.app.fillSelectDefaulOptions(document.querySelector("#dps select"), window.__data__.dps);
        window.app.fillStep1();
        window.app.fillStep2();
        window.app.fillStep4();
        // kochana kaczuszko nie jestem do końca pewień do czego słyży ta pętla ale zeruje elemty dwóch tablic.
        for (var n = 0; n <= window.__data__.numberKinshipDegrees; n++) {
            window.app.odp.rod[n] = 0;
            window.app.odp.licznik[n] = 0;
        }
    });
})();
