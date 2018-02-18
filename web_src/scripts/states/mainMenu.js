var mainMenuState = {
	btnCount: 0,
	fontTint: 0x342215
};

mainMenuState.create = function(){
	gameEls.setup.background();
	gameEls.setup.earthMap();
	gameEls.setup.fsBtn();

	addBtn(() => {
		globals.showTutorial = true;
		game.state.start("game");
	}, "Jouer", "Avec tutoriel");

	addBtn(() => {
		globals.showTutorial = false;
		game.state.start("game");
	}, "Jouer", "Sans tutoriel");

}

function addBtn(callback, pTxt, sTxt){
	let {btnCount, fontTint} = mainMenuState;

	let btn = game.add.button(0,0,"wide_buttons", function(){
		if(callback) callback();
	}, this, 0,1,2,1);
	btn.scale.setTo(globals.UI.smallButtonScale);
	btn.alignIn(game.world, Phaser.CENTER, 0, -40 + 80*btnCount);

	let primaryTxt = game.add.bitmapText(0,0,"pixel_font",pTxt, 50);
	primaryTxt.tint = fontTint;
	primaryTxt.alignIn(btn, Phaser.CENTER, 1, -20);

	let secondaryTxt = game.add.bitmapText(0,0,"pixel_font",sTxt, 30);
	secondaryTxt.tint = fontTint;
	secondaryTxt.alignIn(btn, Phaser.CENTER, 1, 10);
	mainMenuState.btnCount++;
}
