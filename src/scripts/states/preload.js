var preloadState = {
	earth: {}, //logo de la terre
	chargement : {} //text bmp de chargement
};

preloadState.preload = function(){

	//racourcis de chemins de fichiers
	var sprites = "assets/sprites/";

	// pour l'écran de chargement
	game.load.image("earthLogo",`${sprites}preload/earth.png`);
	game.load.bitmapFont('pixel_font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

	//pour le menu principal
	game.load.image("earthMap",`${sprites}earthMap/earthMap.png`);
	game.load.image("bureau",`${sprites}bureau/bureau.png`);

	//pour l'UI
	game.load.spritesheet("buttons", `${sprites}UI/buttons/buttons.png`, 32, 32);
    game.load.spritesheet("wide_buttons", `${sprites}UI/buttons/wide_buttons.png`, 64, 32);

    //pour les dialogues
    game.load.image("dialogBox", `${sprites}dialogs/dialogBox.png`);
    game.load.spritesheet("nextButton", `${sprites}dialogs/nextButton.png`, 16, 16);

};

preloadState.create = function(){
	this.earth = game.add.image(0,0,"earthLogo");
	this.earth.anchor.setTo(0.5);
	this.earth.scale.setTo(3);
	let margin = 20;
	this.earth.x = game.width - this.earth.width/2 - margin;
	this.earth.y = game.height - this.earth.height/2 - margin;

	this.chargement = game.add.bitmapText(0,0,"pixel_font","Chargement...", 60); //x,y,font,text,size
	this.chargement.anchor.setTo(0.5);
	this.chargement.x = game.world.centerX;
	this.chargement.y = game.world.centerY;
};

preloadState.update = function(){
	this.earth.rotation += 0.01;

	if(game.load.hasLoaded){
		game.state.start("game");
	}
};