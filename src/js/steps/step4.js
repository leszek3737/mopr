(function () {
    'use strict';
//console.log("dupa", );
    window.app.fillStep4 = function () {
        var addFamilyMemberBtn = document.querySelector(".addFamilyMemberBtn");
        addFamilyMemberBtn.addEventListener("click", addFamilyMember);
        window.app.buttonNextStep("#krok4 .nextStep", "#krok4", ".wynik", downloadDataToStep4);

        function addFamilyMember() {
            // Krok 4
            var tr = document.createElement("tr");
            tr.classList.add("czlonekRodziny");
            tr.id = ("czlonekRodziny" + window.app.odp.licz);
            tr.innerHTML = "<td><select></select></td>";
            tr.innerHTML += "<td><input class='osGosDom' type='number' step='1' value='1'></td>";
            tr.innerHTML += "<td><input class='dochGosDom' type='number' step='0,01' value='2000'></td>";
            tr.innerHTML += "<td><button class='removeFamilyMemberBtn' >usuń</button></td>";
            var select = tr.querySelector("select");
            window.app.fillSelectDefaulOptions(select, window.__stopiniePok__);
            // wynik
            var wynikTr = document.createElement("tr");
            wynikTr.classList.add("WynikCzłonekRodziny");
            wynikTr.id = ("WynikCzłonekRodziny" + window.app.odp.licz);
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
                buttonRemove();
            }, false);

            //dodawanie do  html
            document.querySelector("#krok4 table").appendChild(tr);
            document.querySelector(".wynik table").appendChild(wynikTr);
            window.app.odp.licz = window.app.odp.licz + 1;

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

        function downloadDataToStep4() {
            var aw = 0;
            for (var i = window.app.odp.licz - 1; i >= 0; i-- && aw++) { //pobieranie danych ze wszyskich pul
                window.app.odp.rodzi[aw] = document.querySelector("#czlonekRodziny" + aw + " select").value;
                window.app.odp.iloscRo[aw] = document.querySelector("#czlonekRodziny" + aw + " .osGosDom").value;
                window.app.odp.odplRo[aw] = document.querySelector("#czlonekRodziny" + aw + " .dochGosDom").value;
                displayDataFromStep4(aw);
                calculationPayment(aw);
            }

            //            document.querySelectorAll(".czlonekRodziny").forEach(function (czlonekRodzElem, index) {
            //                window.app.odp.rodzi[index] = czlonekRodzElem.querySelector("select").value;
            //                window.app.odp.iloscRo[index] = czlonekRodzElem.querySelector(".osGosDom").value;
            //                window.app.odp.odplRo[index] = czlonekRodzElem.querySelector(".dochGosDom").value;
            //                displayDataFromStep4(index);
            //                calculationPayment(index);
            //            });

            worriesPayment();
            degreeKinshipPay();
            exchangeName()

            function displayDataFromStep4(n) {
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikOsGosDom").innerHTML = window.app.odp.iloscRo[n];
                document.querySelector("#WynikCzłonekRodziny" + n + " .wynikDochGosDom").innerHTML = window.app.odp.odplRo[n];
            }

            function calculationPayment(n) {
                var ileR = window.app.odp.iloscRo[n];
                var od = window.app.odp.odplRo[n];

                if (ileR === "1") {
                    od = od - window.__kryteriumDoch__.samotnie;
                    if (od <= 0) {
                        od = 0;
                    }
                } else {
                    od = (od / ileR - window.__kryteriumDoch__.rodzina) * i;
                    if (od <= 0) {
                        od = 0;

                    }
                }
                od = Math.round(od * 100) / 100;
                window.app.odp.odplRo[n] = od;
            }

            function worriesPayment() {
                var lic = window.app.odp.licz -1;
                for (var n = 0; n <= lic; n++) {
                    var a = window.app.odp.rodzi[n];
                    window.app.odp.licznik[a] = window.app.odp.licznik[a] + 1;
                    window.app.odp.rod[a] = window.app.odp.rod[a] + window.app.odp.odplRo[n];
                }                
            }

            function degreeKinshipPay() {
                var o = window.app.odp.gminy;
                var n = 0; //poziom pokrewieństwa +1 na którym się zakańcza 
                var suma = 0;
                for (var mw = 0; mw <= window.__iloscstopiniePok__; mw++) {
                    suma = suma + window.app.odp.rod[mw];
                }
                if (suma > 0) {
                    var full = null;
                    var partial = null;
                    var ma;
                    for (ma = 0; ma <= window.__iloscstopiniePok__; ma++) {
                        
                        o = o - window.app.odp.rod[ma];
                        if (o > 0) {
                            full = ma;
                        }
                        if (o < 0) {
                            partial = ma;
                            ma = window.__iloscstopiniePok__;
                        }
                      
                    }
                    console.log("dupa1", full, partial);
                    if (full !== null) {
                        sendFullPayment(full);
                    }
                    if (partial !== null) {
                        sendPatilPayment(partial);
                        for (var j = partial; j < window.__iloscstopiniePok__;) {
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
                                window.app.odp.gminy = window.app.odp.gminy - window.app.odp.odplRo[j];
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
                        var average = window.app.odp.gminy / j;
                        if (parseInt(window.app.odp.rodzi[i]) === m) {
                            if (window.app.odp.odplRo[i] < average) { //jeśli window.app.odpłatnośc rodziny jest mniejsza niż średnia 
                                window.app.odp.gminy = window.app.odp.gminy - window.app.odp.odplRo[i]; // odejmij odejmij od rodzaju rodziny
                                window.app.odp.rodzi[i] = null;
                                j = j - 1;
                            }
                        }
                    }
                    var average2 = window.app.odp.gminy / j;
                    for (i = 0; window.app.odp.licz > i; i++) {
                        if (parseInt(window.app.odp.rodzi[i]) === m) {
                            average2 = Math.round(average2 * 100) / 100;
                            window.app.odp.odplRo[i] = average2;
                            window.app.odp.gminy = window.app.odp.gminy - window.app.odp.odplRo[i];
                            if (window.app.odp.gminy <= 0){
                                window.app.odp.gminy = 0;
                            }
                        }
                    }
                }
            }

            function exchangeName() {
                for (var i = 0; i < window.app.odp.licz; i++) {
                    for (var j = 0; j <= window.__iloscstopiniePok__; j++) {
                        var a = document.querySelector("#czlonekRodziny" + i + " select").value;
                        if (parseInt(a) === j) {
                            document.querySelector("#WynikCzłonekRodziny" + i + " .wynikRodzaj").innerHTML = window.__stopiniePok__[j].name;
                        }
                    }
                }
            }
        }
    }

})();
