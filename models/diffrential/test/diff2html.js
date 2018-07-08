require('diff2html')
const fs = require('fs')

const getOutDiff = () => {
    let strInput = "--- a/WHITESPACE +++ b/WHITESPACE @@ -1 +1 @@ --=[-Rocket-Ship> +          -=[-Rocket-Ship>"
    let outputHtml = Diff2Html.getPrettyHtml(strInput, {inputFormat: 'diff', showFiles: true, matching: 'lines'});
    console.log(outputHtml)
}
getOutDiff()

