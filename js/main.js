(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function () {
        fillSelectDefaulOptions(document.querySelector("#dps select"), window.__DPS__);
        fillStep1();
        fillStep2();
        fillStep4();
        (function () {
            var ii = window.__iloscstopiniePok__;
            for (var n = 0; n <= ii; n++) {
                odp.rod[n] = 0;
                odp.licznik[n] = 0;
            }
        }())
    });


    function fillStep1() {
        buttonNextStep("#krok1 .nextStep", "#krok1", "#krok2", nul)

    }

    function fillStep2() {

        buttonNextStep("#krok2 .nextStep", "#krok2", "#krok3", downloadDataToStep2);
    }

    function fillStep3() {
        if (odp.gminy == 0) {
            buttonNextStep("#krok3 .nextStep", "#krok3", ".wynik", displayDataFromStep2);
            invisibility("#tableWynik");
            var rodzTym = document.querySelector("#hasFamily")
            rodzTym.innerHTML = "<h3>Mieszkaniec osiągną maxymalną odpłatność naciśnij dalej żeby zobaczyć wynik<h3>";

            document.querySelector("#krok3").appendChild(rodzTym);

        } else {
            radioInput("#hasFamily label input");
        }

    }

    function fillStep4() {
        var addFamilyMemberBtn = document.querySelector(".addFamilyMemberBtn")
        addFamilyMemberBtn.addEventListener("click", addFamilyMember);

        buttonNextStep("#krok4 .nextStep", "#krok4", ".wynik", downloadDataToStep4);

    }

    function addFamilyMember() {
        // Krok 4
        var tr = document.createElement("tr");
        tr.classList.add("czlonekRodziny");
        tr.id = ("czlonekRodziny" + odp.licz);
        tr.innerHTML = "<td><select></select></td>";
        tr.innerHTML += "<td><input class='osGosDom' type='number' step='1' value='1'></td>";
        tr.innerHTML += "<td><input class='dochGosDom' type='number' step='0,01' value='2000'></td>";
        tr.innerHTML += "<td><button class='removeFamilyMemberBtn' >usuń</button></td>";
        var select = tr.querySelector("select");
        fillSelectDefaulOptions(select, window.__stopiniePok__);
        // wynik
        var wynikTr = document.createElement("tr");
        wynikTr.classList.add("WynikCzłonekRodziny");
        wynikTr.id = ("WynikCzłonekRodziny" + odp.licz);
        wynikTr.innerHTML = "<td class='wynikRodzaj'>-</td>";
        wynikTr.innerHTML += "<td class='wynikOsGosDom'>-</td>";
        wynikTr.innerHTML += "<td class='wynikDochGosDom'>-</td>";
        wynikTr.innerHTML += "<td class='wynikOdplatnosc'>-</td>";
        // usuwanie
        var table = document.querySelector("#krok4 table");
        var wynikTabele = document.querySelector(".wynik table");

        var removeFamilyMemberBtn = tr.querySelector(".removeFamilyMemberBtn");
        removeFamilyMemberBtn.addEventListener("click", function () {
            table.removeChild(tr);
            wynikTabele.removeChild(wynikTr);
            buttonRemove()
        }, false)

        //dodawanie do  html
        document.querySelector("#krok4 table").appendChild(tr);
        document.querySelector(".wynik table").appendChild(wynikTr);
        odp.licz = odp.licz + 1;

        function buttonRemove() {
            var removeElement = null;
            var m = odp.licz - 1;
            for (var i = 0; i < m; i++) {
                var wiersz = document.querySelector("#czlonekRodziny" + i);

                if (wiersz == null) {
                    removeElement = i;
                }
            }
            if (removeElement != null) {
                for (var i = removeElement; i < m; i++) {
                    var j = i + 1;
                    document.getElementById('czlonekRodziny' + j).id = "czlonekRodziny" + i;
                    document.getElementById('WynikCzłonekRodziny' + j).id = "WynikCzłonekRodziny" + i;
                }
            }
            odp.licz = odp.licz - 1;
        }

    }



    function fillSelectDefaulOptions(container, list) {
        list.forEach(function (obj) {
            var option = document.createElement("option");
            option.id = obj.id;
            option.value = obj.id;
            option.innerHTML = obj.name;
            container.appendChild(option);
        });
    }

    function buttonNextStep(button, begin, target, functionIn) { // button -adres buttonu,  begin - adres obecnego pozipomu, target = adres przyszłego, functionIn - funkcjia zawarta
        var step = document.querySelector(button);
        step.addEventListener("click", function () {
            invisibility(begin);
            document.querySelector(target).classList.toggle("view");
            functionIn();
        }, false)

    }

    var valueRadio = 0;

    function radioInput(radioClass) {  
        var radio = document.querySelectorAll(radioClass);     
        radio.forEach(function (element) {    
            element.onchange = changeEventHandler;  
        });    


        function changeEventHandler(event) { 
            valueRadio = event.target.value;
            if (valueRadio == 1) {
                buttonNextStep("#krok3 .nextStep", "#krok3", "#krok4", nul)
            } else {
                buttonNextStep("#krok3 .nextStep", "#krok3", ".wynik", displayDataFromStep2);
                invisibility("#tableWynik");
            }
        }
    }

    function invisibility(target) {
        var targetStep = document.querySelector(target);
        targetStep.className = "nonW";
    }


    // pobieranie danych i oblicznia
    var odp = {
        costDps: 0,
        mieszkaDps: 0,
        gminy: 0,
        licz: 0,
        rodzi: [], // rodzaj rodziny pobrany z pola
        odplRo: [], // odpłatność dansej rodziny 
        iloscRo: [], // ilość osób w danej rodzinie
        rod: [], //odpłatnośc na wszyskich poziomach (pobrane odpRo)
        licznik: [], // ilość rodzin w poszczegulnych grupach 
    }

    function downloadDataToStep2() {
        var wyborDps = document.querySelector("#dps select").value;
        var dpsTym = window.__DPS__[wyborDps];
        odp.costDps = dpsTym.koszt;
        var mieszTym = document.getElementById("dochMiesz").value;
        odp.mieszkaDps = Math.round(0.7 * mieszTym * 100) / 100;
        if (odp.mieszkaDps >= odp.costDps) {
            odp.mieszkaDps = odp.costDps;
        }
        odp.gminy = odp.costDps - odp.mieszkaDps;
        fillStep3();
    }

    function downloadDataToStep4() {
        var aw = 0;
        for (var i = odp.licz - 1; i >= 0; i-- & aw++) {
            odp.rodzi[aw] = document.querySelector("#czlonekRodziny" + aw + " select").value;
            odp.iloscRo[aw] = document.querySelector("#czlonekRodziny" + aw + " .osGosDom").value;
            odp.odplRo[aw] = document.querySelector("#czlonekRodziny" + aw + " .dochGosDom").value;
            displayDataFromStep4(aw);
            calculationPayment(aw);

        }
        worriesPayment();
        degreeKinshipPay()
    }

    function calculationPayment(n) {
        var ileR = odp.iloscRo[n];
        var od = odp.odplRo[n];
        if (ileR == 1) {
            od = od - window.__kryteriumDoch__.samotnie;
            if (od <= 0) {
                od = 0
            }
        } else {
            od = (od / i - window.__kryteriumDoch__.rodzina) * i;
            if (od <= 0) {
                od = 0
            }
        }
        od = Math.round(od * 100) / 100;
        odp.odplRo[n] = od;
    }

    function worriesPayment() {
        var lic = odp.licz - 1;
        for (var n = 0; n <= lic; n++) {
            var a = odp.rodzi[n];
            odp.licznik[a] = odp.licznik[a] + 1;
            odp.rod[a] = odp.rod[a] + odp.odplRo[n];
        }

    }

    function degreeKinshipPay() {
        var o = odp.gminy;
        var n = 0; //poziom pokrewieństwa +1 na którym się zakańcza 
        var suma = 0;
        for (var m = 0; m <= window.__iloscstopiniePok__; m++) {
            suma = suma + odp.rod[m];

        }

        if (suma != 0) {
            var full = null;
            var partial = null;
            var m;
            for (m = 0; m <= window.__iloscstopiniePok__; m++) {
                o = o - odp.rod[m];
                if (o > 0) {
                    full = m;
                }
                if (o < 0) {
                    partial = m;
                    m = window.__iloscstopiniePok__;
                }

            }

            if (full != null) {
                sendFullPayment(full);
            }
            if (partial != null) {
                sendPatilPayment(partial);
                for (var j = partial; j < window.__iloscstopiniePok__;) {
                    j = j + 1;
                    for (var i = 0; odp.licz > i; i++) {
                        if (odp.rodzi[i] == j) {
                            odp.odplRo[i] = 0;
                        }
                    }
                }
            }






            displayDataCalculation();
            displayDataFromStep2()
        } else {
            for (var e = odp.licz; n <= e; n++) {
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOdplatnosc").innerHTML = 0;
                displayDataFromStep2();
            }

        } // koniec rodzina nic nie płaci

    }

    function sendFullPayment(m) {
        for (var i = 0; m >= i; i++) { // do każdego do jakiegoś poziomu 
            for (var j = 0; odp.licz > j; j++) {
                if (odp.rodzi[j] == i) {
                    odp.gminy = odp.gminy - odp.odplRo[j];
                }
            }
        }
    }

    function sendPatilPayment(m) {
        var j = 0;
        for (var i = 0; odp.licz > i; i++) {
            if (odp.rodzi[i] == m) {
                j = j + 1;
            }
        }


        for (var i = 0; odp.licz > i; i++) {
            var average = odp.gminy / j;
            if (odp.rodzi[i] == m) {
                if (odp.odplRo[i] < average) { //jeśli odpłatnośc rodziny jest mniejsza niż średnia 
                    odp.gminy = odp.gminy - odp.odplRo[i]; // odejmij odejmij od rodzaju rodziny
                    odp.rodzi[i] = null;
                    j = j - 1;
                }
            }
        }
        var average2 = odp.gminy / j;
        for (var i = 0; odp.licz > i; i++) {
            if (odp.rodzi[i] == m) {
                odp.odplRo[i] = average2;
                odp.gminy = odp.gminy - odp.odplRo[i];
            }
        }


    }


    function displayDataFromStep2() {
        document.getElementById('costDps').innerHTML = odp.costDps;
        document.getElementById('costMieszkaniec').innerHTML = odp.mieszkaDps;
        document.getElementById('costGmina').innerHTML = odp.gminy;
    }

    function displayDataFromStep4(n) {
        document.querySelector("#WynikCzłonekRodziny" + n + " .wynikRodzaj").innerHTML = odp.rodzi[n];
        document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOsGosDom").innerHTML = odp.iloscRo[n];
        document.querySelector("#WynikCzłonekRodziny" + n + " .wynikDochGosDom").innerHTML = odp.odplRo[n];
    }

    function displayDataCalculation() {
        var aw = 0;
        for (var i = odp.licz - 1; i >= 0; i-- && aw++) {
            document.querySelector("#WynikCzłonekRodziny" + aw + " .wynikOdplatnosc").innerHTML = odp.odplRo[aw];
        }

    }

    function nul() {

    }

})();
