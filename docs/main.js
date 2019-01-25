// Script d'entree

// configuration de Phaser.Game
let config = {
    width: 800,
    height: 450, // w/h = 16/9 pour un rapport standard
    renderer: Phaser.CANVAS,
    parent: "phaser-canvas",
    antialias: false // pour que les pixel art ne soient pas floutes
};

let game = new Phaser.Game(config);

//ajout des states du jeu
game.state.add("boot", bootState);
game.state.add("preload", preloadState);
game.state.add("mainMenu", mainMenuState);
game.state.add("game", gameState);
game.state.add("gameEnd", gameEndState);

game.state.start("boot");
