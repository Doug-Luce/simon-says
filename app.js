let game = {};
let sequence = {};
let debug = {};

game.buttonAction = className => {
  $(className)
    .on("mousedown", function() {
      $(this).addClass("active");
      var sound = $(this).attr("data-sound");
      document.getElementById(sound).play();
      switch (className) {
        case ".start":
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
  }, 600);
};

game.buttonHook = () => {
  console.log(game.buttonClasses.length);
  for (var i = 0; i < 8; i++) {
    game.buttonAction(game.buttonClasses[i]);
  }
};

game.start = () => {
  game.buttonHook();
}

sequence.playSequence = async () => {
    for (let i = 0; i < sequence.pattern.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      game.showPress(sequence.pattern[i]);
      let sound = $(sequence.pattern[i]).attr("data-sound");
      document.getElementById(sound).play();
    }
  };

sequence.playerInput = (className) => {
  sequence.playerPattern.push(className);
};

sequence.playerPattern = [];
sequence.pattern = [".red-button", ".blue-button", ".yellow-button"];

debug.log = () => {
  console.log(debug);
};

game.start();
