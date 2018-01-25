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

    window.app.buttonNextStep = function (button, begin, target, functionIn) { // button -adres buttonu,  begin - adres obecnego pozipomu, target = adres przyszłego, functionIn - funkcjia zawarta
        var step = document.querySelector(button);
        step.addEventListener("click", function () {
            window.app.invisibility(begin);
            document.querySelector(target).classList.toggle("view");
            if (functionIn) {
                functionIn();
            }
        }, false);
    }


    window.app.invisibility = function (target) { // przenieść do step3
        var targetStep = document.querySelector(target);
        targetStep.className = "nonW";
    }

    window.app.odp = {
        cost: {
            dps: 0,
            inhabitant: 0,
            gminy: 0,
            // odpłatność dansej rodziny 
            family: [],
            //odpłatnośc na wszyskich poziomach (pobrane odpRo)
            kinshipDegree: [],
        },
        family: {
            quantity: 0,
            // rodzaj rodziny pobrany z pola
            kinship: [],
            // ilość osób w danej rodzinie
            size: [],
            // ilość rodzin w poszczegulnych grupach 
            sameKinshipDegree: [],
        },
    };
})();
