(function () {
    'use strict';
    window.app = {};

    document.addEventListener("DOMContentLoaded", function () {
        window.app.fillSelectDefaulOptions(document.querySelector("#dps select"), window.__data__.dps);
        window.app.fillStep1();
        window.app.fillStep2();
        window.app.fillStep4();

        for (var n = 0; n <= window.__data__.numberKinshipDegrees; n++) {
            window.app.odp.rod[n] = 0;
            window.app.odp.licznik[n] = 0;
        }
    });
})();
