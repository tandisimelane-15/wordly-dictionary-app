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
    //get the word the user typed
    const word = wordInput.value.trim();
    //check if user input is empty
    if (word === "") {
        errorMessage.textContent = "Please enter a word!"
        return;
    }
});
