(function () {
    'use strict';
    window.app.fillSelectDefaulOptions = function (container, list) {
        list.forEach(function (obj) {
            var option = document.createElement("option");
            option.id = obj.id;
            option.value = obj.id;
            option.innerHTML = obj.name;
            container.appendChild(option);
        });
    }
    //funkcjia nasłuchujeprzycisk przycisk button, w momęcie kliknięcia wykonuje funkcjie invisibility na begin, potem dodaje clase view(która wyświetla blok) do elemtu o selsektorze  target, potem wykonuje finkcjie zawartą - functionIn
    window.app.buttonNextStep = function (button, begin, target, functionIn) {
        var step = document.querySelector(button);
        step.addEventListener("click", function () {
            window.app.invisibility(begin);
            document.querySelector(target).classList.toggle("view");
            if (functionIn) {
                functionIn();
            }
        }, false);
    }

    //funkcjia ukrywa element prprzez podmienie klasy na nonW
    window.app.invisibility = function (target) { // przenieść do step3
        var targetStep = document.querySelector(target);
        targetStep.className = "nonW";
    }

    window.app.odp = {
        cost: {
            dps: 0,
            mieszkaniec: 0,
            gminy: 0,
        },
        licz: 0,
        // rodzaj rodziny pobrany z pola
        rodzi: [],
        // odpłatność dansej rodziny
        odplRo: [],
        // ilość osób w danej rodzinie
        iloscRo: [],
        //odpłatnośc na wszyskich poziomach (pobrane odpRo)
        rod: [],
        // ilość rodzin w poszczegulnych grupach 
        licznik: [],
    };
})();
