class Dialog{

	/*
		texts : array of strings
	*/
	constructor(texts){
		this._texts = texts;
	}

	start(){
		//ajoute la boîte de dialogue sur l'écran
		this._dialBox = game.add.image(0,0, "dialogBox");
	    this._dialBox.scale.setTo(3);
	    this._dialBox.alpha = 0.9;
	    cornerObj(this._dialBox, 10, "se");

	    //affiches les textes des dialogues
	    this._bmpText = game.add.bitmapText(0,0,"pixel_font", "", 26);
	    var offset = -15;
	    this._bmpText.alignIn(this._dialBox, Phaser.TOP_LEFT, offset, offset);
	    this._bmpText.maxWidth = this._dialBox.width + 2*offset;
	    this._bmpText.tint = 0xedddae; //couleur du texte

	    
    	var text = this._texts[textCount];
    	var letterCount = 0;
    	this._bmpText.text = "";
    	game.time.events.repeat(50, text.length -1, function(){
    		this._bmpText.text += text[letterCount];
    		letterCount++;
    	},this);
	    
	}
}