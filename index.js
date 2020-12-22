fetch('https://financialmodelingprep.com/api/v3/profile/AAPL\?apikey\=demo').then(body => body.json()).then(res => {
    const data = res[0];
    let html = "<ul> ";
    Object.keys(data).map(( key ) => {
        html += `<li key=${data[key]}>${key} | ${data[key]} </li>`
    });
    html += "</ul>";

    document.body.innerHTML = html;
});