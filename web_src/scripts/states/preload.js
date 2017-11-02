var preloadState = {};

preloadState.preload = function(){

	//racourcis de chemins de fichiers
	let sprites = "assets/sprites/";

	//chargement de l'écran de chargement
	game.load.image("earthLogo",`${sprites}preload/earth.png`);
	game.load.bitmapFont('pixel_font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

	//chargement du menu principal
	game.load.image("earthMap",`${sprites}earthMap/earthMap.png`);
	game.load.image("bureau",`${sprites}bureau/bureau.png`);

	//chargement de l'UI
	game.load.spritesheet("buttons", `${sprites}UI/buttons/buttons.png`, 32, 32);
    game.load.spritesheet("wide_buttons", `${sprites}UI/buttons/wide_buttons.png`, 64, 32);
    game.load.spritesheet("resources", `${sprites}UI/sites/resources.png`, 32, 32);
    game.load.spritesheet("smallDBox", `${sprites}UI/smallDialog/box.png`, 128, 64); //fond de la boîte permettant de déverouiller ou d'améliorer qqch
    game.load.spritesheet("closeButton", `${sprites}UI/buttons/close.png`, 16, 16);
    game.load.spritesheet("pos_neg", `${sprites}UI/buttons/pos_neg.png`, 48, 16);
	game.load.spritesheet("mondioLogo", `${sprites}UI/mondio/icon.png`, 32, 16);
	game.load.image("mondioBox", `${sprites}UI/mondio/displayBox.png`);

    //chargement des dialogues
    game.load.image("dialogBox", `${sprites}dialogs/dialogBox.png`);
    game.load.spritesheet("nextButton", `${sprites}dialogs/nextButton.png`, 16, 16);
    //TODO: charger l'animation de Conseil

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
		game.state.start("game");
	}
};
