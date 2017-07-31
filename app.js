//Tell Codepen not to close loop during animation.
window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 60000;
let game = {};
let sequence = {};
let debug = {};
sequence.playerPattern = [];
sequence.pattern = [];

game.buttonAction = className => {
  $(className)
    .on("mousedown", function() {
      $(this).addClass("active");
      var sound = $(this).attr("data-sound");
      document.getElementById(sound).play();
      switch (className) {
        case ".start":
          game.start();
          break;
        case ".red-button":
          sequence.playerInput(".red-button");
          break;
        case ".yellow-button":
          sequence.playerInput(".yellow-button");
          break;
        case ".green-button":
          sequence.playerInput(".green-button");
          break;
        case ".blue-button":
          sequence.playerInput(".blue-button");
          break;
        case ".select":
          sequence.playSequence();
          break;
        case ".left-bumper":
          break;
        case ".right-bumper":
          break;
      }
    })
    .on("mouseup", function() {
      $(this).removeClass("active");
      debug.log();
    })
    .on("mouseleave", function() {
      $(this).removeClass("active");
    });
};

game.buttonClasses = [
  ".start",
  ".red-button",
  ".yellow-button",
  ".green-button",
  ".blue-button",
  ".select",
  ".left-bumper",
  ".right-bumper"
];

game.showPress = button => {
  $(button).addClass("active");
  setTimeout(function() {
    $(button).removeClass("active");
  }, game.state.buttonTime);
};

game.buttonHook = () => {
  console.log(game.buttonClasses.length);
  for (var i = 0; i < 8; i++) {
    game.buttonAction(game.buttonClasses[i]);
  }
};

game.state = {
  playerTurn: false,
  computerTurn: true,
  steps: 1,
  sequenceTime: 800,
  buttonTime: 100,
};

debug.state = game.state;

game.start = () => {
  if(game.state.computerTurn) {
    // Call sequence.generator with 1 for first pattern
    sequence.pattern = sequence.generator(game.state.steps);
    sequence.playSequence(sequence.pattern);
 
  // Check that sequence of player matches computer
  //if(sequence.pattern === )
  // Increment by one for sequence.generator call
  
  // Repeat until game.state.steps = 20
  game.state.playerTurn = true;
  //game.state.computerTurn = false;
  }
}

sequence.playSequence = async (sequenceArr) => {
    for (let i = 0; i < sequenceArr.length; i++) {
      await new Promise(resolve => setTimeout(resolve, game.state.sequenceTime));
      game.showPress(sequenceArr[i]);
      let sound = $(sequenceArr[i]).attr("data-sound");
      document.getElementById(sound).play();
    }
  };

sequence.playerInput = (className) => {
  if(game.state.playerTurn) {
    sequence.playerPattern.push(className);
    game.state.steps++;
    game.state.computerTurn = true;
    
  }
};

sequence.generator = (patternLength) => {
  let classList = ['.blue-button', '.red-button', '.yellow-button', '.green-button'];
  let pattern = [];
  for(i = 0; i < patternLength; i++) {
    pattern.push(classList[_.random(0, classList.length - 1)]);
  }
  debug.pattern = pattern;
  return pattern;
}

debug.log = () => {
  console.log(debug);
};

game.buttonHook();
