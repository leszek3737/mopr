(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function () {
        fillSelectDefaulOptions(document.querySelector("#dps select"), window.__DPS__);
        fillStep4();
    });

    function fillStep4() {
        var addFamilyMemberBtn = document.querySelector(".addFamilyMemberBtn")
        addFamilyMemberBtn.addEventListener("click", addFamilyMember);

    }

    function addFamilyMember() {
        // Krok 4
        var tr = document.createElement("tr");
        tr.classList.add("czlonekRodziny");
        tr.innerHTML = "<td><select></select></td>";
        tr.innerHTML += "<td><input id='ileOs0' type='number'></td>";
        tr.innerHTML += "<td><input id='przyG0' type='number'></td>";
        tr.innerHTML += "<td><button class='removeFamilyMemberBtn'> tak</button></td>";
        var select = tr.querySelector("select");
        fillSelectDefaulOptions(select, window.__stopiniePok__);
        // wynik
        var wynikTr = document.createElement("tr");
        wynikTr.classList.add("WynikCzłonekRodziny");
        wynikTr.innerHTML = "<td>-</td>";
        wynikTr.innerHTML += "<td>-</td>";
        wynikTr.innerHTML += "<td>-</td>";
        wynikTr.innerHTML += "<td>-</td>";
        //usuwanie
        var table = document.querySelector("#krok4 table");
        var wynikTabele = document.querySelector(".wynik table");
        
        var removeFamilyMemberBtn = tr.querySelector(".removeFamilyMemberBtn");
        removeFamilyMemberBtn.addEventListener("click", function () {
            table.removeChild(tr);
            wynikTabele.removeChild(tr);
        }, false) 

        //dodawanie do  html
        document.querySelector("#krok4 table").appendChild(tr);
        document.querySelector(".wynik table").appendChild(wynikTr);

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
})();
