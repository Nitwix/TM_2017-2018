var preloadState = {};

preloadState.preload = function(){

	//racourcis de chemins de fichiers
	let sprites = "assets/sprites/";

	// pour l'écran de chargement
	game.load.image("earthLogo",`${sprites}preload/earth.png`);
	game.load.bitmapFont('pixel_font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

	//pour le menu principal
	game.load.image("earthMap",`${sprites}earthMap/earthMap.png`);
	game.load.image("bureau",`${sprites}bureau/bureau.png`);

	//pour l'UI
	game.load.spritesheet("buttons", `${sprites}UI/buttons/buttons.png`, 32, 32);
    game.load.spritesheet("wide_buttons", `${sprites}UI/buttons/wide_buttons.png`, 64, 32);
    game.load.spritesheet("resources", `${sprites}UI/sites/resources.png`, 32, 32);

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
    //on ne peut pas utiliser cornerObj(...) car l'anchor est au centre

	this.chargement = game.add.bitmapText(0,0,"pixel_font","Chargement...", 60); //x,y,font,text,size
    centerObj(this.chargement);
};

preloadState.update = function(){
	this.earth.rotation += 0.01;

	if(game.load.hasLoaded){
		game.state.start("mainMenu");
	}
};