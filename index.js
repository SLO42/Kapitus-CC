
fetch('https://financialmodelingprep.com/api/v3/profile/AAPL\?apikey\=demo').then(body => body.json()).then(res => {
    const data = res[0];
    let html = "<ul> ";
    Object.keys(data).map(( key ) => {
        if (key === "changes"){
            if (data[key] > 0) {
                html += `<li style="color:green" key=${key}>${key} | ${data[key]} </li>`
            }
            else {
                html += `<li style="color:red" key=${key}>${key} | ${data[key]} </li>`
            }
        }
        else if (key === "price"){
            html += `<li key=${key}>${key} | $${data[key]} </li>`
        }
        else if (key === "website"){
            html += `<li key=${key}>${key} |<a href="${data[key]}" target="_blank"> ${data[key]} </a> </li>`
            
        }
        else html += `<li key=${key}>${key} | ${data[key]} </li>`
    });
    html += "</ul>";
    return document.body.innerHTML = html;
});
