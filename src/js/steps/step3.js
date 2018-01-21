(function () {
    'use strict';
    window.app.fillStep3 = function () {
        if (!window.app.odp.gminy) {
            var rodzTym = document.querySelector("#hasFamily");
            window.app.buttonNextStep("#step3 .nextStep", "#step3", ".wynik", window.app.displayDataFromStep2);
            window.app.invisibility("#tableWynik");
            rodzTym.innerHTML = "<h3>Mieszkaniec osiągną maxymalną odpłatność naciśnij dalej żeby zobaczyć wynik<h3>";
            document.querySelector("#step3").appendChild(rodzTym);
        } else {
            radioInput("#hasFamily label input");
        }

        function radioInput(radioClass) {
            var radio = document.querySelectorAll(radioClass);
            radio.forEach(function (element) {
                element.addEventListener("change", changeEventHandler);
            });

            function changeEventHandler(event) {
                if (this.value === "1") {
                    window.app.buttonNextStep("#step3 .nextStep", "#step3", "#step4", null);
                } else {
                    window.app.buttonNextStep("#step3 .nextStep", "#step3", ".wynik", window.app.displayDataFromStep2);
                    window.app.invisibility("#tableWynik");
                }
            }
        }
    }

})();
