(function () {
    'use strict';
    window.app.fillStep3 = function () {
        //jeżeli koszt gminy równy jest zoro to: pbierz element o selsktorze #hasFamily,wykonaj funksjie buttonNextStep z parametrami "#step3 .nextStep", "#step3", ".result", window.app.displayDataFromStep2, ukrycie teli z wynikami dla rodziny z kroku 4 w wynikach, wstawienie w rodzTym informacji dla usera o osiągnięciu maxymalne odpłatności
        //jeśli nie wywołaj funksjie radioInput dla #hasFamily label input
        if (!window.app.odp.cost.gminy) {
            var rodzTym = document.querySelector("#hasFamily");
            window.app.buttonNextStep("#step3 .nextStep", "#step3", ".result", window.app.displayDataFromStep2);
            window.app.invisibility("#tableResult");
            rodzTym.innerHTML = "<h3>Mieszkaniec osiągną maxymalną odpłatność naciśnij dalej żeby zobaczyć wynik<h3>";
            document.querySelector("#step3").appendChild(rodzTym);
        } else {
            radioInput("#hasFamily label input");
        }
        // funkcja pobiera buttony typu radio z selektorem przekazanym w funksji, potem nasługuje zmian w tych radio i jesli zmane nastąpi wczytać funkcjie changeEventHandler
        function radioInput(radioClass) {
            var radio = document.querySelectorAll(radioClass);
            radio.forEach(function (element) {
                element.addEventListener("change", changeEventHandler);
            });

            //funkcja sprawdza wartość value pezekazanaego obiektu i jeśli zaznaczine jest tak  wykonaj funksjie buttonNextStep z parametrami "#step3 .nextStep", "#step3", "#step4", null 
            // jeśli nie to  buttonNextStep z parametrami "#step3 .nextStep", "#step3", ".result", window.app.displayDataFromStep2 oraz ukrywa #tableResult
            function changeEventHandler(event) {
                if (this.value === "1") {
                    window.app.buttonNextStep("#step3 .nextStep", "#step3", "#step4", null);
                } else {
                    window.app.buttonNextStep("#step3 .nextStep", "#step3", ".result", window.app.displayDataFromStep2);
                    window.app.invisibility("#tableResult");
                }
            }
        }
    }
})();
