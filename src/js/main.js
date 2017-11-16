(function () {
    'use strict';
    window.app = {};

    document.addEventListener("DOMContentLoaded", function () {
        window.app.fillSelectDefaulOptions(document.querySelector("#dps select"), window.__DPS__);
        window.app.fillStep1();
        window.app.fillStep2();
        window.app.fillStep4();

        for (var n = 0; n <= window.__iloscstopiniePok__; n++) {
            window.app.odp.rod[n] = 0;
            window.app.odp.licznik[n] = 0;
        }
    });
})();
