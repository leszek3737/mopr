(function () {
    'use strict';
    window.app.fillStep1 = function () {
        //funkcjia wywołuje wczytanie dalej natempnego kroku (window.app.buttonNextStep) z parametrami button, begin, target, functionIn
        window.app.buttonNextStep("#step1 .nextStep", "#step1", "#step2", null);
    }
})();
