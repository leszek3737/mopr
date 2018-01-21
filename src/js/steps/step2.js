(function () {
    'use strict';
    window.app.fillStep2 = function () {
        window.app.buttonNextStep("#step2 .nextStep", "#step2", "#step3", downloadDataToStep2);

        function downloadDataToStep2() {
            var wyborDps = document.querySelector("#dps select").value;
            var dpsTym = window.__data__.dps[wyborDps];
            var mieszTym = document.getElementById("incomeMieszkanca").value;
            window.app.odp.costDps = dpsTym.koszt;
            window.app.odp.mieszkaDps = Math.round(0.7 * mieszTym * 100) / 100;
            if (window.app.odp.mieszkaDps >= window.app.odp.costDps) {
                window.app.odp.mieszkaDps = window.app.odp.costDps;
            }
            window.app.odp.gminy = window.app.odp.costDps - window.app.odp.mieszkaDps;
            window.app.fillStep3();
        }
    }
    window.app.displayDataFromStep2 = function () {
        document.getElementById('costDps').innerHTML = window.app.odp.costDps;
        document.getElementById('costMieszkaniec').innerHTML = window.app.odp.mieszkaDps;
        document.getElementById('costGmina').innerHTML = window.app.odp.gminy;
    }
})();
