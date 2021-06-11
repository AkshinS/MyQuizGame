class Quiz {
  constructor() {
  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play() {
    question.hide();

    background("Yellow");

    textAlign(CENTER);
    fill("black");
    textFont("Georgia")
    textSize(35);
    text("Result of the Quiz", 400, 40);
    text("-------------------------", 400, 60);

    Contestant.getPlayerInfo();

    if (allContestants !== undefined) {
      var displayAnswers = 250;
      strokeWeight(0.8);
      stroke("lime");
      fill("blue");
      textFont("Georgia");
      textSize(21);
      text("*NOTE: The contestant highlighted in green color has answered the question correctly!", 420, 240);


      for (var plr in allContestants) {
        var correctAnswer = "2";
        if (correctAnswer === allContestants[plr].answer) {
          strokeWeight(1);
          stroke("Green")
          fill("Green");
        } else {
          stroke("Red");
          fill("Red");
        }

        displayAnswers += 32;
        textAlign(CENTER);
        textFont("Verdana")
        textSize(22);
        text(allContestants[plr].name + ":" + allContestants[plr].answer, 400, displayAnswers);
      }
    }
  }
}