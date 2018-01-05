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
	game.load.spritesheet("buttons", `${sprites}buttons/buttons.png`, 32, 32);
    game.load.spritesheet("wide_buttons", `${sprites}buttons/wide_buttons.png`, 64, 32);
	game.load.spritesheet("speed", `${sprites}buttons/speed.png`, 14, 11);

	//chargement des usines
	game.load.spritesheet("factories", `${sprites}factories/factories.png`, 32, 32);
	game.load.spritesheet("smokeAnim", `${sprites}factories/smokeAnim.png`, 32, 32);
	game.load.spritesheet("waterAnim", `${sprites}factories/waterAnim.png`, 28, 8);
	game.load.spritesheet("whiteSmokeAnim", `${sprites}factories/whiteSmokeAnim.png`, 32, 32);
	game.load.spritesheet("windAnim", `${sprites}factories/windAnim.png`, 32, 24);
	game.load.spritesheet("sunAnim", `${sprites}factories/sunAnim.png`, 32, 24);
	game.load.spritesheet("fusionAnim", `${sprites}factories/fusionAnim.png`, 32, 32);
	game.load.spritesheet("explosionAnim", `${sprites}factories/explosionAnim.png`, 48, 48);

	//chargement des éléments utilisés dans SmallDialog
    game.load.spritesheet("smallDBox", `${sprites}smallDialog/box.png`, 128, 64); //fond de la boîte permettant de déverouiller ou d'améliorer qqch
    game.load.spritesheet("closeButton", `${sprites}buttons/close.png`, 16, 16);
    game.load.spritesheet("pos_neg", `${sprites}buttons/pos_neg.png`, 48, 16);

	//chargement des mondios
	game.load.spritesheet("mondioLogo", `${sprites}mondio/icon.png`, 32, 16);
	game.load.image("smallDisplayBox", `${sprites}mondio/displayBox.png`);

	//chargement des éléments de Newspaper
	game.load.spritesheet("newspaper", `${sprites}newspaper/newspaper.png`, 150, 100)

    //chargement des dialogues
    game.load.image("dialogBox", `${sprites}dialogs/dialogBox.png`);
    game.load.spritesheet("arrows", `${sprites}buttons/arrows.png`, 16, 16);
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
