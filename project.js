// Not used!!!!!!!!!!!!! Only used as a reference :-)
let job = {
    uuid: '',
    suggestion: '',
    normalized_job_title: '',
    parent_uuid: '',
}

// Created a function to get job objects
const createJobs = async function (info) {
    let ApiUrl = `http://api.dataatwork.org/v1/jobs/${info.parent_uuid}`;

    // Pulling data from the ApiUrl
    let data = '';
    // The process of pulling ApiUrl includes creating a fetch to grab the Api information and receiving
    // the data by using JSon to translate it.
    try {
        const response = await fetch(ApiUrl);
        data = await response.json();
    }

    catch (error) {

    }

    // variable called x. Grabbing the ID jobInfo from HTML
    const x = document.getElementById('jobInfo');

    // Inserting HTML tag into div ID               //template literals- string that allows you to embed expressions: 
    x.innerHTML = x.innerHTML + `<p id=${info.parent_uuid}>${info.normalized_job_title}</p><p>${data.description}</p>`;

}

let getApiUrl = function () {
    // pulling information from HTML when you input a search value
    // under into the ID, "mySearch"
    const searchValue = document.getElementById("mySearch").value;
    // In order to get the API URL, we need to have a URL. 
    // I used temperate literals so I could grab the search value called "mySearch"
    // from my HTML and make any modifications into it. The variable apiUrl is the fetch request url that includes the search Value.
    let apiUrl = `http://api.dataatwork.org/v1/jobs/autocomplete?contains=${searchValue}`;
    return apiUrl;
}

// This starts the process of running the API.
const GetFromUrl = async function () {
    // Declaring the variable to test if it works
    const apiUrl = getApiUrl();
    try {
        // receive a response after we grab information from the apiUrl.
        const response = await fetch(apiUrl);
        // receive data from the results of our input after it translates to JSon.
        const data = await response.json();
        // Outputs results from the API
        console.log(data);
        // When typing in a value that doesn't exist, the catch block does not receive it because of how
        // this API was made.
        // Created an array if input is in the data from the API URL. The array then lists all
        // jobs from the API.
        if (Array.isArray(data)) {
            // When searching for a different job title without refreshing the page, create
            // a new variable to reset HTML input. jobInfo acts as a container
            const resetHtml = document.getElementById('jobInfo');
            // Input a different job to pull up
            resetHtml.innerHTML = '';
            // If the job is there, it will create a list of all the available job positions
            for (let i = 0; i < data.length; i++) {
                createJobs(data[i]);

            }

            // If you search a value that is not in the API, there will be a return value of "Not found"
            // as a result of an error.
        } else {
            let error = document.getElementById('jobInfo');
            error.innerHTML = "<h1>Not Found</h1>";
        }


    } catch (err) {
        console.log(err);
    }
}

