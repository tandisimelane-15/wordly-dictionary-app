document.addEventListener("DOMContentLoaded", function() {
const form = document.querySelector("#search-form");
const wordInput = document.querySelector("#word");
const errorMessage = document.querySelector("#error-message");
const results = document.querySelector("#results");
const wordTitle = document.querySelector("#word-title");
const pronunciation = document.querySelector("#pronunciation");
const partOfSpeech = document.querySelector("#part-of-speech");
const definition = document.querySelector("#definition");
const example = document.querySelector("#example");
const synonyms = document.querySelector("#synonyms");

form.addEventListener("submit", function(e){
    e.preventDefault();
    //get the word the user typed
    const word = wordInput.value.trim();
    //check if user input is empty
    if (word === "") {
        errorMessage.textContent = "Please enter a word!"
        return;
    }

    //clear previous results and errors
    errorMessage.textContent = "";
    wordTitle.textContent = "";
    pronunciation.textContent = "";
    partOfSpeech.textContent = "";
    definition.textContent = "";
    example.textContent = "";
    synonyms.textContent = "";

    //fetch data from the API
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(function(response) {
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Word not found");
        }
        
    })
    .then(function(data){
        console.log("Data received: ", data);
        console.log("First item: ", data[0]);
        console.log("Word: ", data[0].word);
        //Display word title
        wordTitle.textContent = data[0].word;
        console.log("wordTitle element: ", wordTitle);
        //Display pronunciation if it exists
        if (data[0].phonetics[1] && data[0].phonetics[1].text){
            pronunciation.textContent = "Pronunciation: " + data[0].phonetics[1].text
        }else{
            pronunciation.textContent = "Pronunciation: not available"
        }

        //Display first meaning
        const firstMeaning = data[0].meanings[0];
        partOfSpeech.textContent = firstMeaning.partOfSpeech
        definition.textContent = firstMeaning.definitions[0].definition;

        //Display example if it exists
        if (firstMeaning.definitions[0].example){
            example.textContent = "Example: " + firstMeaning.definitions[0].example
        }else{
            example.textContent = "Example: not available"
        }
        
        //Display synonyms if they exist
        if (firstMeaning.synonyms.length>0){
            synonyms.textContent = firstMeaning.synonyms.join(", ");
        }else{
            synonyms.textContent = "No synonyms available"
        }

        //show results
        results.style.display = "block";
        console.log("Results display: ", results.style.display);
    })
    .catch(function(error){
    errorMessage.innerHTML = "Word not found. Please check your spelling or <a href='https://www.google.com/search?q=" + wordInput.value.trim() + "+definition' target='_blank'>try the web</a>.";    });
})
})