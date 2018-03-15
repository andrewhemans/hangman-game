console.log("it's alive!")

// Create a library of names for characters in Star Trek

var characters = ['Kirk', 'Spock', 'Picard', 'Riker', 'Kira', 'Jadzia', 'Sisko', 'Janeway', 'Chakotay', 'Data', 'LaForge', 'Sarek', 'Khan', 'Archer', 'Martok', 'Worf'];

var wrong = [];



function changeNav() {
  var parent = document.getElementById("nav-list");
  var child = document.getElementById("start-game");
  parent.removeChild(child);

  var newItem = document.createElement("li");
  var newLine = document.createTextNode("play again");
  newItem.appendChild(newLine);

  var newNav = document.getElementById("nav-list");
  newNav.insertBefore(newItem, newNav.childNodes[2]);

  newItem.setAttribute("onclick", "playAgain()");
  newItem.setAttribute("id", "play-now");
}

function logWrong() {
  // logs wrong guesses
  var wrongGuess =
    "<p>" + wrong.slice(0, 9).join(', ') + "</p>";

  document.querySelector("#wrong-guess").innerHTML = wrongGuess;
}

function resetScores() {
  location.reload();
}
// click start game to begin game
function startGame() {

  changeNav();

  // resets everything except the score
  document.getElementById("play-now").onclick = function() {
    playAgain()
  };

  document.getElementById("give-up").onclick = function() {
    giveUp()
  };

  var wins = 0;

  var losses = 0;

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

  // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
  var html =
    "<p>" + charInName.join(" ") + "</p>";

  document.querySelector("#game").innerHTML = html;


  // hide intro text
  document.getElementById("begin").style.display = "none";
  document.getElementById("main-game").style.display = "block";

  // checks if image exists
  var getCharImage = document.getElementById("char-image");
  var checkImage = document.getElementById("blank").contains(getCharImage);

  // testing adding new element
  function showImage() {
    if (document.getElementById("char-image")) {
      // console.log('image already exists');
    } else {
      var targetDiv = document.getElementById("blank");
      var newDiv = document.createElement("div");
      // newDiv.textContent = "A pleasure to meet you!";

      var image = document.createElement("IMG");
      image.setAttribute("src", "assets/images/" + computerGuess + ".png");
      image.setAttribute("id", "char-image");

      targetDiv.appendChild(image);
      targetDiv.appendChild(newDiv);
      newDiv.setAttribute("class", "image");
    }

  }

  //clear name and generate a new onkeyup
  function clearName() {
    // clears name
    var parent = document.getElementById("game");
    var child = document.getElementById("name");
    parent.removeChild(child);

    // computer chooses a name
    computerGuess = characters[Math.floor(Math.random() * characters.length)];

    computerGuess = computerGuess.toLowerCase();

    // convert computerGuess to an array
    nameArr = computerGuess.split('');

    // count number of letters in name
    charInName = [];

    // Display blank spaces with underscores for each letter in name.

    for (var i = 0; i < nameArr.length; i++) {
      charInName.push("_");
    }

    // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
    html =
      "<p>" + charInName.join(" ") + "</p>";

    document.querySelector("#game").innerHTML = html;

  }

  function playAgain() {
    // clears image
    var parent = document.getElementById("blank");
    var child = document.getElementById("char-image");
    parent.removeChild(child);

    // clears wrong guesses
    wrong.length = 0;
    clearName();
    logWrong();
  }

  function scoreWin() {
    if (wins === 1) {
      // logs the wins
      var winsText = document.createElement("P");
      var winsNumber = document.createTextNode(wins);
      winsText.appendChild(winsNumber);
      winsText.setAttribute("class", "score-number");
      winsText.setAttribute("id", "wins-number");

      document.getElementById("score").appendChild(winsText);

      var winsLabel = document.createElement("P");
      var winsLabelText = document.createTextNode("wins");
      winsLabel.appendChild(winsLabelText);
      winsLabel.setAttribute("class", "score-text");

      document.getElementById("score").appendChild(winsLabel);
    } else if (wins >= 2) {
      document.getElementById("wins-number").innerHTML = wins;
    }
  }

  function scoreLoss() {
    if (losses === 1) {
      // logs the losses
      var lossText = document.createElement("P");
      var lossNumber = document.createTextNode(losses);
      lossText.appendChild(lossNumber);
      lossText.setAttribute("class", "score-number");
      lossText.setAttribute("id", "loss-number");

      document.getElementById("score").appendChild(lossText);

      var lossLabel = document.createElement("P");
      var lossLabelText = document.createTextNode("Losses");
      lossLabel.appendChild(lossLabelText);
      lossLabel.setAttribute("class", "score-text");

      document.getElementById("score").appendChild(lossLabel);
    } else if (losses >= 2) {
      document.getElementById("loss-number").innerHTML = losses;
    }
  }

  function showName() {
    document.getElementById("name").innerHTML = computerGuess;
  }



  function giveUp() {
    showImage();
    losses++;
    scoreLoss();
    showName();
  }

  var userGuess;
  // var keepTyping = true;


  // when a user presses a key check to see if that letter is in the names
  // This function is run whenever the user presses a key.
  document.onkeyup = function(event) {


    // console.log(indices);

    if (document.getElementById("char-image")) {
      console.log('typing stopped');
    } else {

      // Determines which key was pressed.
      userGuess = event.key;

      var keepTyping = true;

      // for names with multiple instances of same letter
      var str = computerGuess;
      var indices = [];
      for (var j = 0; j < str.length; j++) {
        if (str[j] === userGuess) indices.push(j);
      }

      // run this code if a key input matches
      if (computerGuess.indexOf(userGuess) >= 0) {
        // if a letter matches replace that blank space with the letters
        if (indices.length === 1) {
          charInName[indices[0]] = userGuess;
        } else if (indices.length === 2) {
          charInName[indices[0]] = userGuess;
          charInName[indices[1]] = userGuess;
        }

      } else if (computerGuess.indexOf(userGuess) === -1) {

        if (wrong.indexOf(userGuess) > -1) {
          // do nothing
          console.log('double letter!');
        } else {
          // if guessed letter does not match any letter in the name then logged that letter as a failed guessed
          wrong.push(userGuess);
          // console.log(wrong);
        }

      }

      // Set the inner HTML contents of the #game div to our html string
      var html =
        "<p id='name'>" + charInName.join(" ") + "</p>";

      document.querySelector("#game").innerHTML = html;

      function showName() {
        document.getElementById("name").innerHTML = computerGuess;
      };

      logWrong();

    }



    if (document.getElementById("char-image")) {

    } else {
      // if user guesses the name in less than 13 guesses show winning message and display image of characters
      if (charInName.join('') === computerGuess) {
        wins++;
        showImage();
        scoreWin();
        // define userGuess as global or wrap these in another if statement.
      }

      // user can have 13 wrong guesses before they lose the game.
      else if (wrong.length === 9) {
        // console.log('you lose');
        losses++;
        showImage();
        scoreLoss();
        showName();
        keepTyping = false;
      }
    }

  };

}
