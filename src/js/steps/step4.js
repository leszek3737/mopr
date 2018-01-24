(function () {
    'use strict';
    window.app.fillStep4 = function () {
        var addFamilyMemberBtn = document.querySelector(".addFamilyMemberBtn");
        addFamilyMemberBtn.addEventListener("click", addFamilyMember);
        window.app.buttonNextStep("#step4 .nextStep", "#step4", ".result", downloadDataToStep4);
        //funkcji dodaje pola członków rodziny w kroku 4 jak wynikach końcowych; pozwala także na usniecie dadanych pól. Funkcji na początku utwarza element typu tr w tabelce w kroku 4 nadaje clase i id oraz tworzy odpowiednie pola w nim. Potem pobiera elament select oraz uruchamia na nim funkcjie fillSelectDefaulOptions. Potem utwarza element typu tr w tabelce w wyniku nadaje clase i id oraz tworzy odpowiednie pola w nim. Potem funkcjia dodaje nasłuch na przycisku removeFamilyMemberBtn który uruchamia funksje która usuwa z tabeli nie potrzbane rekordy oraz uruchamia funkcjie buttonRemove
        function addFamilyMember() {
            var tr = document.createElement("tr");
            tr.classList.add("czlonekRodziny");
            tr.id = ("czlonekRodziny" + window.app.odp.licz);
            tr.innerHTML = "<td><select></select></td>";
            tr.innerHTML += "<td><input class='osGosDom' type='number' step='1' value='1'></td>";
            tr.innerHTML += "<td><input class='dochGosDom' type='number' step='0,01' value='2000'></td>";
            tr.innerHTML += "<td><button class='removeFamilyMemberBtn' >usuń</button></td>";
            var select = tr.querySelector("select");
            window.app.fillSelectDefaulOptions(select, window.__data__.kinshipDegree);
            // wynik
            var wynikTr = document.createElement("tr");
            wynikTr.classList.add("WynikCzłonekRodziny");
            wynikTr.id = ("WynikCzłonekRodziny" + window.app.odp.licz);
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
            window.app.odp.licz = window.app.odp.licz + 1;
            // funkcjia wykrywa który elelment został usunięty i zamiania numeracjie pozostałych
            function buttonRemove() {
                var removeElement = null;
                var m = window.app.odp.licz - 1;
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
                window.app.odp.licz = window.app.odp.licz - 1;
            }
        }

        //funkcjia pobiera dane z pól w kroku 4  oraz uruchamia finkcjie: worriesPayment, degreeKinshipPay, exchangeName
        function downloadDataToStep4() {
            var aw = 0;
            for (var i = window.app.odp.licz - 1; i >= 0; i-- && aw++) { //pobieranie danych ze wszyskich pul
                window.app.odp.rodzi[aw] = document.querySelector("#czlonekRodziny" + aw + " select").value;
                window.app.odp.iloscRo[aw] = document.querySelector("#czlonekRodziny" + aw + " .osGosDom").value;
                window.app.odp.odplRo[aw] = document.querySelector("#czlonekRodziny" + aw + " .dochGosDom").value;
                displayDataFromStep4(aw);
                calculationPayment(aw);
            }
            worriesPayment();
            degreeKinshipPay();
            exchangeName()

            //funkcjia pobrane dane z pól w kroku 4 wyświetla w wynikacha w tabelce
            function displayDataFromStep4(n) {
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOsGosDom").innerHTML = window.app.odp.iloscRo[n];
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikDochGosDom").innerHTML = window.app.odp.odplRo[n];
            }

            //funkcjia oblicza odpłatność rodzi w zależności ile soób znajduje się w gospodarstwie domowym 
            function calculationPayment(n) {
                var ileR = window.app.odp.iloscRo[n];
                var od = window.app.odp.odplRo[n];

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
                window.app.odp.odplRo[n] = od;
            }

            //funkcjia sumuje odpłatność danego stopina pokrewieństwa 
            function worriesPayment() {
                var lic = window.app.odp.licz - 1;
                for (var n = 0; n <= lic; n++) {
                    var a = window.app.odp.rodzi[n];
                    window.app.odp.licznik[a] = window.app.odp.licznik[a] + 1;
                    window.app.odp.rod[a] = window.app.odp.rod[a] + window.app.odp.odplRo[n];
                }
            }


            function degreeKinshipPay() {
                var o = window.app.odp.cost.gminy;
                var n = 0; //poziom pokrewieństwa +1 na którym się zakańcza 
                var suma = 0;
                for (var mw = 0; mw <= window.__data__.numberKinshipDegrees; mw++) {
                    suma = suma + window.app.odp.rod[mw];
                }
                if (suma > 0) {
                    var full = null;
                    var partial = null;
                    var ma;
                    for (ma = 0; ma <= window.__data__.numberKinshipDegrees; ma++) {

                        o = o - window.app.odp.rod[ma];
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
                            for (var i = 0; window.app.odp.licz > i; i++) {
                                if (parseInt(window.app.odp.rodzi[i]) === j) {
                                    window.app.odp.odplRo[i] = 0;
                                }
                            }
                        }
                    }

                    displayDataCalculation();
                    window.app.displayDataFromStep2();
                } else {
                    for (var e = window.app.odp.licz; n <= e; n++) {

                        document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOdplatnosc").innerHTML = "0";

                        window.app.displayDataFromStep2();
                    }

                } // koniec rodzina nic nie płaci

                function displayDataCalculation() {
                    var aw = 0;
                    for (var i = window.app.odp.licz - 1; i >= 0; i-- && aw++) {
                        document.querySelector("#WynikCzłonekRodziny" + aw + " .wynikOdplatnosc").innerHTML = window.app.odp.odplRo[aw];

                    }

                }

                function sendFullPayment(mm) {
                    for (var i = 0; mm >= i; i++) { // do każdego do jakiegoś poziomu 
                        for (var j = 0; window.app.odp.licz > j; j++) {
                            if (parseInt(window.app.odp.rodzi[j]) === i) {
                                window.app.odp.cost.gminy = window.app.odp.cost.gminy - window.app.odp.odplRo[j];
                            }
                        }
                    }
                }

                function sendPatilPayment(m) {
                    var j = 0;
                    for (var i = 0; window.app.odp.licz > i; i++) {
                        if (parseInt(window.app.odp.rodzi[i]) === m) {
                            j = j + 1;
                        }
                    }


                    for (i = 0; window.app.odp.licz > i; i++) {
                        var average = window.app.odp.cost.gminy / j;
                        if (parseInt(window.app.odp.rodzi[i]) === m) {
                            if (window.app.odp.odplRo[i] < average) { //jeśli window.app.odpłatnośc rodziny jest mniejsza niż średnia 
                                window.app.odp.cost.gminy = window.app.odp.cost.gminy - window.app.odp.odplRo[i]; // odejmij odejmij od rodzaju rodziny
                                window.app.odp.rodzi[i] = null;
                                j = j - 1;
                            }
                        }
                    }
                    var average2 = window.app.odp.cost.gminy / j;
                    for (i = 0; window.app.odp.licz > i; i++) {
                        if (parseInt(window.app.odp.rodzi[i]) === m) {
                            average2 = Math.round(average2 * 100) / 100;
                            window.app.odp.odplRo[i] = average2;
                            window.app.odp.cost.gminy = window.app.odp.cost.gminy - window.app.odp.odplRo[i];
                            if (window.app.odp.cost.gminy <= 0) {
                                window.app.odp.cost.gminy = 0;
                            }
                        }
                    }
                }
            }

            //funkcjia wprowadza odpowiednie nazwy stopnia pokrewieństwa w tabalce w wynikach  
            function exchangeName() {
                for (var i = 0; i < window.app.odp.licz; i++) {
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
