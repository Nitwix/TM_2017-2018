// Script d'entrée

// configuration de Phaser.Game
var config = {
    width: 800,
    height: 450, // w/h = 1.777... pour une résolution standard
    renderer: Phaser.AUTO,
    antialias: false // pour que les pixel art ne soient pas floutés
    
};

var game = new Phaser.Game(config);