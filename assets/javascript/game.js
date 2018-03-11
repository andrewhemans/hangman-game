console.log("it's alive!")

// Create a library of names for characters in Star Trek

  var characters = ['Kirk', 'Spock', 'Picard', 'Riker', 'Kira', 'Dax', 'Sisqo', 'Janeway', 'Chakotay', 'Data', 'LaForge', 'Surak', 'Kahn', 'Archer', 'Gowron', 'Worf'];

  // Creating variables to hold the number of wins, losses, and ties. They start at 0.
  var wins = 0;
  var losses = [];


// When user presses "start game" coputer chooses random name from library.
// computer chooses a name
var computerGuess = characters[Math.floor(Math.random() * characters.length)];

computerGuess = computerGuess.toLowerCase();

// convert computerGuess to an array
var nameArr = computerGuess.split('');

// count number of letters in name
charInName = [];

// Display blank spaces with underscores for each letter in name.

for (var i = 0; i < nameArr.length; i++) {
  charInName.push("_");
}




// when a user presses a key check to see if that letter is in the names
    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

      // Determines which key was pressed.
      var userGuess = event.key;

        // run this code if a key input matches
        if (computerGuess.indexOf(userGuess) >= 0) {
          wins++;

          // if a letter matches replace that blank space with the letters
          charInName[computerGuess.indexOf(userGuess)] = userGuess;
          console.log(charInName);
        }

        else if (computerGuess.indexOf(userGuess) === -1) {

          // if guessed letter does not match any letter in the name then logged that letter as a failed guessed
          losses.push(userGuess);
          console.log(losses);
        } else {

        }

        // if user guesses the name in less than 13 guesses show winning message and display image of characters
        if (charInName.join('') === computerGuess) {
          console.log("you Win!");
        }

        // user can have 13 wrong guesses before they lose the game.
        else if (losses.length === 9) {
          console.log('you lose');

        }


        // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
        var html =
          "<p>You chose: " + userGuess + "</p>" +
          "<p>The computer chose: " + computerGuess + "</p>" +
          "<p>" + charInName.join(" ") + "</p>" +
          "<p>wins: " + wins + "</p>" +
          "<p>losses: " + losses.join(', ') + "</p>";

        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = html;

      };


// if user loses game then show losing message, image of character and show the name.
