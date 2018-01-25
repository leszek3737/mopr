(function () {
    'use strict';
    window.app.fillStep2 = function () {
        window.app.buttonNextStep("#step2 .nextStep", "#step2", "#step3", downloadDataToStep2);

        function downloadDataToStep2() {
            var wyborDps = document.querySelector("#dps select").value;
            var dpsTym = window.__data__.dps[wyborDps];
            var mieszTym = document.getElementById("incomeMieszkanca").value;
            window.app.odp.cost.dps = dpsTym.cost;
            window.app.odp.cost.inhabitant = Math.round(0.7 * mieszTym * 100) / 100;
            if (window.app.odp.cost.inhabitant >= window.app.odp.cost.dps) {
                window.app.odp.cost.inhabitant = window.app.odp.cost.dps;
            }
            window.app.odp.cost.municipality = window.app.odp.cost.dps - window.app.odp.cost.inhabitant;
            window.app.fillStep3();
        }
    }
    window.app.displayDataFromStep2 = function () {
        document.getElementById('costDps').innerHTML = window.app.odp.cost.dps;
        document.getElementById('costMieszkaniec').innerHTML = window.app.odp.cost.inhabitant;
        document.getElementById('costGmina').innerHTML = window.app.odp.cost.municipality;
    }
})();
