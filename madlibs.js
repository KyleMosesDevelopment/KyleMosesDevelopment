/* Assignment - 9 – COSC 2328 – Professor McCurry
   Implemented by Kyle Moses */

// Story Constants
const firstStory = `Breaking news! The all American Football player "noun" was drafted to the "noun". 
This player is known for "verb", and other players often describe their play as "adjective". 
At the age of "number", this player engages in "verb" outside of the football field. `;

const firstStoryInputVals = ["Name", "City/Team", "Verb (ending with ing)", "Adjective", "Age Number", "Verb (ending with ing)" ];

const secondStory = `You, "noun" are the Lord of the Rings. You crafted a ring of "noun" in  
the "adjective" volcano. The ring grants you extraordinary "noun", and you use it to "verb" your enemies.
You will "verb" the orc armies that threaten the city of "noun". `;

const secondStoryInputVals = ["Name", "Power", "Adjective", "Super Human Ability", "Verb", "Verb", "Place"];

const thirdStory = `Captain, we have just landed on the planet "noun". Our scans suggest we "verb" the nearby 
"noun" in order to discover more about the planet.  The "noun" here are "adjective", which will make it difficult
to use our "noun".  Lets claim this planet for "noun". `;

const thirdStoryInputVals = ["Planet Name", "Verb", "Thing on Planet", "Strange Thing on Planet", "Adjective", "Item from Earth", "Group of People"];

var currentStory = firstStory;

// Runs when user clicks make madlib button
// Check which option is selected and starts this function 
function startMadLib () {
    // removes all children in myDiv
    var div = document.getElementById('myDiv');
        while(div.firstChild)
            div.removeChild(div.firstChild);

    // Determines which story is selected 
    // sets current story
    if (document.getElementById("nflStory").selected) {
        currentStory = firstStory;
    }
    else if (document.getElementById("ringStory").selected) {
        currentStory = secondStory;
    }
    else {
        currentStory = thirdStory;
    }
    createMadLib();
}

// Runs after startMadLib function selects story
// creates form and with preset values
function createMadLib () {
    // variable array to store input value const
    var inputValues;
    if (currentStory == firstStory) {
        inputValues = firstStoryInputVals;
    } 
    else if (currentStory == secondStory) {
        inputValues = secondStoryInputVals;
    }
    else {
        inputValues = thirdStoryInputVals;
    }

    // setting up form
    var div = document.getElementById('myDiv');
    var form = document.createElement("form");
    form.setAttribute("id", "myform")
    div.appendChild(form);

    // create input tag and set value + name + br and append to form
    for (i = 0; i < inputValues.length; i++) {
        var input = document.createElement("input");
        var mybreak = document.createElement("br");
        input.setAttribute("type", "text");
        input.setAttribute("value", inputValues[i]);
        input.setAttribute("name", "array[]");
        form.appendChild(input);
        form.appendChild(mybreak);
    }

    // creates button and adds event listener 
    var butn = document.createElement("button");
    butn.innerHTML = "Add Words!";
    div.appendChild(butn);
    butn.addEventListener("click", fillMadLib);

    // grabs the empty h4 and puts the selected story in to it
    var unfilledMadLib = document.createElement("h4");
    unfilledMadLib.setAttribute("id", "madlib-para");
    unfilledMadLib.innerHTML = currentStory;
    div.appendChild(unfilledMadLib);

}

// Run when add words is clicked
// Replaces the unfilled text with the users input
function fillMadLib() {
    var str = currentStory;
    // looking for all occurances of "noun" or "verb"...
    var patt = /"noun"|"verb"|"adjective"|"number"/g ;
    var res = '';
    // split the current story by white space into array
    var wordArray = str.split(' ');
    
    var index = 0;
    // Regex for seeing if there is a period/comma after word
    var periodPatt = /[\.]{1}/;
    var commaPatt = /[\,]{1}/;
    
    // get all inputs into array by name="array[]" 
    var inputs = document.getElementsByName('array[]');

    // loops through every word
    for(j = 0; j < wordArray.length; j++) {
        // if word array matches any of the words in patt
        // get inputs[index] and place it into result str
        if(patt.test(wordArray[j])) {
            // if has period at the end of word
            if(periodPatt.test(wordArray[j])) {
                res += inputs[index].value + '. '
            }
            // if it has comma at end of word
            else if (commaPatt.test(wordArray[j])) {
                res += inputs[index].value + ', '
            }
            else{
                res += inputs[index].value + ' '
            }
            index++;
        }
        // specific word not found in regex patt
        else {
            res += wordArray[j] + ' ';
        }
        
    }
    // change madlib para to res
    var filledMadLib = document.getElementById("madlib-para");
    filledMadLib.innerHTML = res;
}
