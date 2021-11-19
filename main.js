
document.addEventListener("DOMContentLoaded", function(event) {
    var convertButton = document.querySelector('.convButton');
    var inputField = document.querySelector('#input');
    var outputFiled = document.querySelector('#output');

    convertButton.addEventListener('click', function(){
        var inputFieldContent = inputField.value;
        var parsedLT = inputFieldContent.replace(/</g, "&lt;");
        var parsedGT = parsedLT.replace(/>/g, "&gt;");

        outputFiled.value = parsedGT;
    });

});