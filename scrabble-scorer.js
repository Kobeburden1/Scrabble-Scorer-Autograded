// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");

   let word= input.question("Enter a word! ")

   return word
};




let simpleScorer = function(word) {
  let score= 0;
  word = word.toLowerCase();
  for(let i = 0; i < word.length; i++){
    score = score + 1
  }
  return score
};

let vowelBonusScorer = function(word) {
  const vowels = ["A", "E", "I", "O", "U"];
  let score = 0;
  word = word.toUpperCase()
  for (let i = 0; i < word.length; i++){
    score += vowels.includes(word[i]) ? 3 : 1; 
  }
  return score
};

let scrabbleScorer = function(word){
  let newPointStructure= transform(oldPointStructure)

  return word 
    .toUpperCase()
    .split("")
    .map(letter => newPointStructure[letter.toLowerCase()])
    .reduce((a,b) => a + b)
};

const scoringAlgorithms = [
  {
    name: "simpleScoring",
    description: "Each letter is worth 1 point",
    scorerFunction: simpleScorer  
  },
  {
    name: "Vowel Bonus",
    description: "Vowels are worth 3 points while the others are worth 1 point",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "Uses the traditional scoring method ",
    scorerFunction: scrabbleScorer
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use? \n");
  for (let i = 0; i < scoringAlgorithms.length; i++){
    console.log(`${i} - ${scoringAlgorithms[i].description}`)
  }
  let algorithmSelection = input.question("Please enter 0, 1, or 2: ")
  console.log(`Scoring algorithm ${algorithmSelection}, has been selected`)

  return scoringAlgorithms[algorithmSelection]
}

  

 
function transform(oldPointStructure) {
  let newPointStructure = {};
  for(let pointValue in oldPointStructure){
    let newLetterArray = oldPointStructure[pointValue];
    for(let i = 0; i < newLetterArray.length; i++){
      newPointStructure[newLetterArray[i].toLowerCase()]= Number(pointValue)
    }
  }return newPointStructure
};

let newPointStructure= transform(oldPointStructure);

function runProgram() {
 word=  initialPrompt();
   let scorerSelected = scorerPrompt()
   score = scorerSelected.scorerFunction(word, newPointStructure)
   console.log(`Score for '${word}': ${score}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
