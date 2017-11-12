(function () {
    'use strict';
   
    window.app.fillStep3 = function () {
        if (window.app.odp.gminy === 0) {
            window.app.buttonNextStep("#krok3 .nextStep", "#krok3", ".wynik",  window.app.displayDataFromStep2);
            window.app.invisibility("#tableWynik");
            var rodzTym = document.querySelector("#hasFamily");
            rodzTym.innerHTML = "<h3>Mieszkaniec osiągną maxymalną odpłatność naciśnij dalej żeby zobaczyć wynik<h3>";

            document.querySelector("#krok3").appendChild(rodzTym);

        } else {
            radioInput("#hasFamily label input");
        }

        function radioInput(radioClass) {
            var radio = document.querySelectorAll(radioClass);
            radio.forEach(function (element) {
                element.onchange = changeEventHandler;
            });


            function changeEventHandler(event) {
                window.app.valueRadio = event.target.value;
                if (window.app.valueRadio === "1") {
                    window.app.buttonNextStep("#krok3 .nextStep", "#krok3", "#krok4", null);
                } else {
                    window.app.buttonNextStep("#krok3 .nextStep", "#krok3", ".wynik",  window.app.displayDataFromStep2);
                    window.app.invisibility("#tableWynik");
                }
            }
        }
    }
 
})();
