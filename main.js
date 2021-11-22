
document.addEventListener("DOMContentLoaded", function(event) {
    var convertButton = document.querySelector('.convButton');
    var inputField = document.querySelector('#input');
    var outputFiled = document.querySelector('#output');

    inputField.addEventListener('input', e => {
        mainConverter()
    });

    function mainConverter() {
        var stringTagStart = []
        
        var inputFieldContent = inputField.value;
        

        const regex = /<string name=".*".*?>/gm;
        
        let m;

        while ((m = regex.exec(inputFieldContent)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                stringTagStart.push(match); 
            });
        }

        stringTagStart.forEach((obje, index) => {
            var scriptOpenTag = `[trlOpenScript=${index}]`;
            var scriptCloseTag = `[trlCloseScript]`;
            inputFieldContent = inputFieldContent.replace(obje, scriptOpenTag);
            inputFieldContent = inputFieldContent.replace('</string>', scriptCloseTag)
        });

        // Parse HTML Chars
        var parsedLT = inputFieldContent.replace(/</g, "&lt;");
        var parsedGT = parsedLT.replace(/>/g, "&gt;");

        stringTagStart.forEach((obje, index) => {
            var scriptOpenTag = `[trlOpenScript=${index}]`;
            var scriptCloseTag = `[trlCloseScript]`;
            parsedGT = parsedGT.replace(scriptOpenTag, obje);
            parsedGT = parsedGT.replace(scriptCloseTag, '</string>')
        });

        outputFiled.value = parsedGT;
    }

});