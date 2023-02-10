// Get references to the input field and submit button
const inputField = document.getElementById("input-field");
const submitButton = document.getElementById("submit-button");

// Add a click event listener to the submit button
submitButton.addEventListener("click", function () {
    // Get the input text
    const inputText = inputField.value;


    // 'https://api.openai.com/v1/engines/davinci/completions'

    // Make an API call to ChatGPT to get a response
    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            "prompt": inputText,
            "temperature": 0.5,
            "max_tokens": 20
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error("Error occured while fetching data.");
        }
    }).then(data => {
        if (data.choices) {
            // Display the response on the website
            const responseDisplay = document.getElementById("response-display");
            responseDisplay.innerHTML = data.choices[0].text;
            const answerBox = document.getElementById("answer-box");
            answerBox.value = data.choices[0].text;
        } else {
            // Handle the error if the 'choices' property is not found
            console.log("Error: The 'choices' property is not found in the response data. Please check the API documentation and verify that the response is in the expected format.");
        }
    }).catch(err => {
        console.log(err);
    });


});
