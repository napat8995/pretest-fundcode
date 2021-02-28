const express = require('express')
const app = express();
const fetch = require("node-fetch");
const args = process.argv.slice(2);
const cheerio = require('cheerio');
    fetch(
        "https://codequiz.azurewebsites.net", {
            headers: { 'Cookie': 'hasCookie=true' }
        }
    ).then(response => response.text())
    .then((data) => {
            const $ = cheerio.load(data);
            const selector = $("tr");
            const rows = Array.from(selector)
            rows.forEach(r =>{
                const row  = $(r);
                const rowText = row.text();
                const codeRex = new RegExp(args[0],'g');
                if(rowText.match(codeRex)){
                    const cols = Array.from(row.find('td'));
                    const value = $(cols[1]).text();
                    console.log(value)
                }
            })
    });
        
const  PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`running on port ${PORT}`));
