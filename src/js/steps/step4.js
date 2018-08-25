(function () {
    'use strict';
    //console.log("dupa", );
    window.app.fillStep4 = function () {
        var addFamilyMemberBtn = document.querySelector(".addFamilyMemberBtn");
        addFamilyMemberBtn.addEventListener("click", addFamilyMember);
        window.app.buttonNextStep("#step4 .nextStep", "#step4", ".result", downloadDataToStep4);
        var iFamyli = 0;
        var elementOptions = window.__data__.kinshipDegree;

        function addFamilyMember() {
            // step 4
            var tr = document.createElement("tr");
            tr.classList.add("czlonekRodziny");
            tr.id = ("czlonekRodziny" + window.app.odp.family.quantity);
            tr.innerHTML = "<td><select></select></td>";
            tr.innerHTML += "<td><input class='osGosDom' type='number' step='1' value='1'></td>";
            tr.innerHTML += "<td><input class='dochGosDom' type='number' step='0,01' value='2000'></td>";
            tr.innerHTML += "<td><button class='removeFamilyMemberBtn' >usuń</button></td>";
            var select = tr.querySelector("select");
            if (iFamyli != 0) {
                elementOptions = window.__data__.kinshipDegree.filter(function checkAdult(age) {
                    return age.mustBeUnique == false;
                })
            }
            iFamyli++;
            window.app.fillSelectDefaulOptions(select, elementOptions);
            // wynik
            var wynikTr = document.createElement("tr");
            wynikTr.classList.add("WynikCzłonekRodziny");
            wynikTr.id = ("WynikCzłonekRodziny" + window.app.odp.family.quantity);
            wynikTr.innerHTML = "<td class='wynikRodzaj'>-</td>";
            wynikTr.innerHTML += "<td class='wynikOsGosDom'>-</td>";
            wynikTr.innerHTML += "<td class='wynikDochGosDom'>-</td>";
            wynikTr.innerHTML += "<td class='wynikOdplatnosc'>-</td>";
            // usuwanie
            var table = document.querySelector("#step4 table");
            var wynikTabele = document.querySelector(".result table");

            var removeFamilyMemberBtn = tr.querySelector(".removeFamilyMemberBtn");
            removeFamilyMemberBtn.addEventListener("click", function () {
                table.removeChild(tr);
                wynikTabele.removeChild(wynikTr);
                buttonRemove();
            }, false);

            //dodawanie do  html
            document.querySelector("#step4 table").appendChild(tr);
            document.querySelector(".result table").appendChild(wynikTr);
            window.app.odp.family.quantity = window.app.odp.family.quantity + 1;

            function buttonRemove() {
                var removeElement = null;
                iFamyli--;
                if (iFamyli === 0) {
                    elementOptions = window.__data__.kinshipDegree
                }
                var m = window.app.odp.family.quantity - 1;
                for (var i = 0; i < m; i++) {
                    var wiersz = document.querySelector("#czlonekRodziny" + i);
                    if (wiersz === null) {
                        removeElement = i;
                    }
                }
                if (removeElement !== null) {
                    for (i = removeElement; i < m; i++) {
                        var j = i + 1;
                        document.getElementById('czlonekRodziny' + j).id = "czlonekRodziny" + i;
                        document.getElementById('WynikCzłonekRodziny' + j).id = "WynikCzłonekRodziny" + i;
                    }
                }
                window.app.odp.family.quantity = window.app.odp.family.quantity - 1;
            }
        }

        function downloadDataToStep4() {
            var aw = 0;
            for (var i = window.app.odp.family.quantity - 1; i >= 0; i-- && aw++) { //pobieranie danych ze wszyskich pul
                window.app.odp.family.kinship[aw] = document.querySelector("#czlonekRodziny" + aw + " select").value;
                window.app.odp.family.size[aw] = document.querySelector("#czlonekRodziny" + aw + " .osGosDom").value;
                window.app.odp.cost.family[aw] = document.querySelector("#czlonekRodziny" + aw + " .dochGosDom").value;
                displayDataFromStep4(aw);
                calculationPayment(aw);
            }


            worriesPayment();
            degreeKinshipPay();
            exchangeName()

            function displayDataFromStep4(n) {
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOsGosDom").innerHTML = window.app.odp.family.size[n];
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikDochGosDom").innerHTML = window.app.odp.cost.family[n];
            }

            function calculationPayment(n) {
                var ileR = window.app.odp.family.size[n];
                var od = window.app.odp.cost.family[n];

                if (ileR === "1") {
                    od = od - window.__data__.incomeCriterion.alone;
                    if (od <= 0) {
                        od = 0;
                    }
                } else {
                    od = (od / ileR - window.__data__.incomeCriterion.family) * i;
                    if (od <= 0) {
                        od = 0;

                    }
                }
                od = Math.round(od * 100) / 100;
                window.app.odp.cost.family[n] = od;
            }

            function worriesPayment() {
                var lic = window.app.odp.family.quantity - 1;
                for (var n = 0; n <= lic; n++) {
                    var a = window.app.odp.family.kinship[n];
                    window.app.odp.family.sameKinshipDegree[a] = window.app.odp.family.sameKinshipDegree[a] + 1;
                    window.app.odp.cost.kinshipDegree[a] = window.app.odp.cost.kinshipDegree[a] + window.app.odp.cost.family[n];
                }
            }

            function degreeKinshipPay() {
                var o = window.app.odp.cost.municipality;
                var n = 0; //poziom pokrewieństwa +1 na którym się zakańcza 
                var suma = 0;
                for (var mw = 0; mw <= window.__data__.numberKinshipDegrees; mw++) {
                    suma = suma + window.app.odp.cost.kinshipDegree[mw];
                }
                if (suma > 0) {
                    var full = null;
                    var partial = null;
                    var ma;
                    for (ma = 0; ma <= window.__data__.numberKinshipDegrees; ma++) {

                        o = o - window.app.odp.cost.kinshipDegree[ma];
                        if (o > 0) {
                            full = ma;
                        }
                        if (o < 0) {
                            partial = ma;
                            ma = window.__data__.numberKinshipDegrees;
                        }

                    }
                    console.log("dupa1", full, partial);
                    if (full !== null) {
                        sendFullPayment(full);
                    }
                    if (partial !== null) {
                        sendPatilPayment(partial);
                        for (var j = partial; j < window.__data__.numberKinshipDegrees;) {
                            j = j + 1;
                            for (var i = 0; window.app.odp.family.quantity > i; i++) {
                                if (parseInt(window.app.odp.family.kinship[i]) === j) {
                                    window.app.odp.cost.family[i] = 0;
                                }
                            }
                        }
                    }

                    displayDataCalculation();
                    window.app.displayDataFromStep2();
                } else {
                    for (var e = window.app.odp.family.quantity; n <= e; n++) {

                        document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOdplatnosc").innerHTML = "0";

                        window.app.displayDataFromStep2();
                    }

                } // koniec rodzina nic nie płaci

                function displayDataCalculation() {
                    var aw = 0;
                    for (var i = window.app.odp.family.quantity - 1; i >= 0; i-- && aw++) {
                        document.querySelector("#WynikCzłonekRodziny" + aw + " .wynikOdplatnosc").innerHTML = window.app.odp.cost.family[aw];

                    }

                }

                function sendFullPayment(mm) {
                    for (var i = 0; mm >= i; i++) { // do każdego do jakiegoś poziomu 
                        for (var j = 0; window.app.odp.family.quantity > j; j++) {
                            if (parseInt(window.app.odp.family.kinship[j]) === i) {
                                window.app.odp.cost.municipality = window.app.odp.cost.municipality - window.app.odp.cost.family[j];
                            }
                        }
                    }
                }

                function sendPatilPayment(m) {
                    var j = 0;
                    for (var i = 0; window.app.odp.family.quantity > i; i++) {
                        if (parseInt(window.app.odp.family.kinship[i]) === m) {
                            j = j + 1;
                        }
                    }


                    for (i = 0; window.app.odp.family.quantity > i; i++) {
                        var average = window.app.odp.cost.municipality / j;
                        if (parseInt(window.app.odp.family.kinship[i]) === m) {
                            if (window.app.odp.cost.family[i] < average) { //jeśli window.app.odpłatnośc rodziny jest mniejsza niż średnia 
                                window.app.odp.cost.municipality = window.app.odp.cost.municipality - window.app.odp.cost.family[i]; // odejmij odejmij od rodzaju rodziny
                                window.app.odp.family.kinship[i] = null;
                                j = j - 1;
                            }
                        }
                    }
                    var average2 = window.app.odp.cost.municipality / j;
                    for (i = 0; window.app.odp.family.quantity > i; i++) {
                        if (parseInt(window.app.odp.family.kinship[i]) === m) {
                            average2 = Math.round(average2 * 100) / 100;
                            window.app.odp.cost.family[i] = average2;
                            window.app.odp.cost.municipality = window.app.odp.cost.municipality - window.app.odp.cost.family[i];
                            if (window.app.odp.cost.municipality <= 0) {
                                window.app.odp.cost.municipality = 0;
                            }
                        }
                    }
                }
            }

            function exchangeName() {
                for (var i = 0; i < window.app.odp.family.quantity; i++) {
                    for (var j = 0; j <= window.__data__.numberKinshipDegrees; j++) {
                        var a = document.querySelector("#czlonekRodziny" + i + " select").value;
                        if (parseInt(a) === j) {
                            document.querySelector("#WynikCzłonekRodziny" + i + " .wynikRodzaj").innerHTML = window.__data__.kinshipDegree[j].name;
                        }
                    }
                }
            }
        }
    }

})();