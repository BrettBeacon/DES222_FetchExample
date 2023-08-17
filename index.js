// make variables for the html elements
const fetchButton = document.getElementById("fetchButton");
const urlTextBox = document.getElementById("urlTextBox");
const dataResultArea = document.getElementById("mainResults");
const resultsArea = document.getElementById("LocationResults");

// Make a GET api request
async function getRequest(someURL) {
    // clear out the data printout area of the html page
    dataResultArea.innerHTML = "";
    
    // Fetch a response from the REST API
    const response = await fetch(someURL);
    
    // extract the JSON payload from the response
    const result = await response.json();
    
    // Sometimes the payload is actually a string instead of an object. If so convert
    // it to an object
    let objResult = (typeof result == "object") ? result  : JSON.parse(result);
    
    // and either way, convert the object to a string to print out. 
    let strResult = JSON.stringify(objResult, undefined, 2);
    dataResultArea.innerHTML = `<pre><code>${strResult}</code></pre>`;
    
    // return the JSON object
    return objResult;
}

async function showResults(Latitude, Longitude) {

    resultsArea.innerHTML = "";

    const OpenMeteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${Latitude}&longitude=${Longitude}&current_weather=true`;

    console.log(OpenMeteoURL);

    const openMeteo = await fetch(OpenMeteoURL);

    const theResult = await openMeteo.json();

    let resultObj = (typeof theResult == "object") ? theResult : JSON.parse(theResult);

    let resultStr = JSON.stringify(resultObj, undefined, 2);
    resultsArea.innerHTML = `<pre><code>${resultStr}</code></pre>`;

    let wc = resultObj['weathercode'];
    if (wc == 1) {
        print("Rainy");
    }
}

// Make the GET request when the fetch button is clicked
fetchButton.addEventListener('click', async (event) => {
    // fetch whatever URL has been typed into textbox
    let url = urlTextBox.value;
    let data = await getRequest(url);
    // Do something else with 'data' if you want
});


// Also fetch the URL if it changes
urlTextBox.addEventListener('change', async (event) => {
    let url = urlTextBox.value;
    let data = await getRequest(url);
    // Do something else with 'data' if you want
});

GetButton.addEventListener('click', async (event) => {
    navigator.geolocation.getCurrentPosition((position) => {
        showResults(position.coords.latitude, position.coords.longitude);
    })
})