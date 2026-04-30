document.addEventListener("DOMContentLoaded", function() {
const form = document.querySelector("#search-form");
const wordInput = document.querySelector("#word");
const errorMessage = document.querySelector("#error-message");
const results = document.querySelector("#results");
const wordTitle = document.querySelector("#word-title");
const pronunciation = document.querySelector("#pronunciation");
const audio = document.querySelector("#pronunciation-audio")
const meaningsContainer = document.querySelector("#meanings-container");


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
    meaningsContainer.innerHTML = "";
    results.style.display = "none";

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

        //Display word title
        wordTitle.textContent = data[0].word;

        //Display audio pronunciation if it exists
        const phoneticsWithAudio = data[0].phonetics.find(p => p.audio);
        if (phoneticsWithAudio) {
            audio.src = phoneticsWithAudio.audio
            audio.style.display = "block";
        }else{
            audio.style.display = "none";
        }

        //Display text pronunciation if it exists
        const phoneticsWithText = data[0].phonetics.find(p => p.text);
        if (phoneticsWithText){
            pronunciation.textContent = "Pronunciation: " + phoneticsWithText.text
        }else{
            pronunciation.textContent = "Pronunciation: not available"
        }



        //loop through all meanings
        data[0].meanings.forEach(function(meaning){
            const meaningBlock = document.createElement("div")
            meaningBlock.classList.add("meaning-block");

            // Get example
            const exampleText = meaning.definitions[0].example
                ? "Example: " + meaning.definitions[0].example
            : "Example: not available"

            //Get synonyms
            const synonymList = meaning.synonyms.length > 0
                ? meaning.synonyms
                : meaning.definitions[0].synonyms

            const synonymText = synonymList && synonymList.length > 0
                ? "Synonyms: " + synonymList.join(", ")
                : "No Synonyms available";

            meaningBlock.innerHTML = `
            <h3 class="part-of-speech">${meaning.partOfSpeech}</h3>
            <p class="definition">${meaning.definitions[0].definition}</p>
            <p class="example">${exampleText}</p>
            <p class="synonyms">${synonymText}</p>
            `;

            meaningsContainer.appendChild(meaningBlock);
        });
        

        //show results
        results.style.display = "block";
    })
    .catch(function(){
    errorMessage.innerHTML = "Word not found. Please check your spelling or <a href='https://www.google.com/search?q=" + wordInput.value.trim() + "+definition' target='_blank'>try the web</a>.";    });
});
});