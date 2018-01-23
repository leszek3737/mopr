(function () {
    'use strict';
    window.app.fillStep2 = function () {
        //funkcjia wywołuje wczytanie dalej natempnego kroku (window.app.buttonNextStep) z parametrami button, begin, target, functionIn
        window.app.buttonNextStep("#step2 .nextStep", "#step2", "#step3", downloadDataToStep2);
        // funkcjia pobiera value z pola wyboru z kroku 1,  przypisuje do  dpsTym obiekt z tablicy window.__data__.dps zgodny z pobranym value, potem z kroku 2 z pola incomeMieszkanca jest pobierana wartość do  zmiennej mieszTym, pobranie z obiektu dpsTym pola koszt  i przypisanie jej do window.app.odp.cost.dps, potem przelicza mieszTym (oblicza i zaokrągla 70% wartości) i przypisuje je do window.app.odp.cost.mieszkaniec, potem sprawdza czy  kosz dpa jest większy lub równy od odpłatności mieszkańca jeśli tak to przypisuje do kosztu mieszkańca  kosztu dps (window.app.odp.cost.mieszkaniec = window.app.odp.cost.dps), oblicznia oblicznie odpłatności gminy poprzez  odjęcie od kosztu dps dochodów mieszkańca mieszkańca, ruchamia funkcjie window.app.fillStep3
        function downloadDataToStep2() {
            var wyborDps = document.querySelector("#dps select").value;
            var dpsTym = window.__data__.dps[wyborDps];
            var mieszTym = document.getElementById("incomeMieszkanca").value;
            window.app.odp.cost.dps = dpsTym.koszt;
            window.app.odp.cost.mieszkaniec = Math.round(0.7 * mieszTym * 100) / 100;
            if (window.app.odp.cost.mieszkaniec >= window.app.odp.cost.dps) {
                window.app.odp.cost.mieszkaniec = window.app.odp.cost.dps;
            }
            window.app.odp.cost.gminy = window.app.odp.cost.dps - window.app.odp.cost.mieszkaniec;
            window.app.fillStep3();
        }
    }
    // funkcjia dodaje wyników końcowy do html. które mogą być rozszerzone po kroku 4; 
    window.app.displayDataFromStep2 = function () {
        document.getElementById('costDps').innerHTML = window.app.odp.cost.dps;
        document.getElementById('costMieszkaniec').innerHTML = window.app.odp.cost.mieszkaniec;
        document.getElementById('costGmina').innerHTML = window.app.odp.cost.gminy;
    }
})();
