(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function () {
        fillSelectDefaulOptions(document.querySelector("#dps select"), window.__DPS__);
        fillStep1();
        fillStep2();
        fillStep4();
        fillStep3();
    });

    function fillStep1(){
        buttonNextStep("#krok1 .nextStep", "#krok1", "#krok2")
    }
    
    function fillStep2(){
        buttonNextStep("#krok2 .nextStep", "#krok2", "#krok3")
    }
        
    function fillStep3() {
        radioInput("#hasFamily label input");    
    }

    function fillStep4() {
        var addFamilyMemberBtn = document.querySelector(".addFamilyMemberBtn")
        addFamilyMemberBtn.addEventListener("click", addFamilyMember);
       
        buttonNextStep("#krok4 .nextStep", "#krok4", ".wynik"); 
        
    }

    function addFamilyMember() {
        // Krok 4
        var tr = document.createElement("tr");
        tr.classList.add("czlonekRodziny");
        tr.innerHTML = "<td><select></select></td>";
        tr.innerHTML += "<td><input id='ileOs0' type='number'></td>";
        tr.innerHTML += "<td><input id='przyG0' type='number'></td>";
        tr.innerHTML += "<td><button class='removeFamilyMemberBtn'>usuń</button></td>";
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
            wynikTabele.removeChild(wynikTr);
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

    function buttonNextStep(button, begin, target) { // button -adres buttonu,  begin - adres obecnego pozipomu, target = adres przyszłego
        var step = document.querySelector(button);
        step.addEventListener("click", function () {
            invisibility(begin);
            document.querySelector(target).classList.toggle("view")
            
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
                buttonNextStep("#krok3 .nextStep", "#krok3", "#krok4")
            } else {
                buttonNextStep("#krok3 .nextStep", "#krok3", ".wynik")
            } 
        }
    }

    function invisibility(target) {
        var targetStep = document.querySelector(target);
        targetStep.className = "nonW";
    }
})();
