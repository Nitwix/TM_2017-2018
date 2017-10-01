class Dialog{

	/*
		texts : array of strings: chaque string est une 'phase' du dialogue qui nécessite que le joueur fasse qqch
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

		var offset = -15;

		

	    //affiches les textes des dialogues
	    this._bmpText = game.add.bitmapText(0,0,"pixel_font", "", 26);
	    this._bmpText.alignIn(this._dialBox, Phaser.TOP_LEFT, offset, offset);
	    this._bmpText.maxWidth = this._dialBox.width + 3*offset;
	    this._bmpText.tint = 0xedddae; //couleur du texte

	    this._displayTexts(this._texts, 0);

	    //TODO : transition entre les textes et corriger le fait que le texte dépasse
	}

	//texts as array
	_displayTexts(texts, index){

		var text = texts[index].split(" ");
		var wordCount = 0;

		this._bmpText.text = "";

		this._timer = game.time.create();

		this._timer.repeat(250, text.length, function(){
			this._bmpText.text += text[wordCount] + " ";

			//console.log(this._bmpText.textWidth);
			if(this._bmpText.text.length > 210){
				this._waitForNext();
				this._timer.pause();
			}

    		//console.log(this._bmpText.textHeight);
    		wordCount++;
	    },this);

		//quand tous les mots du string on été affichés, on passe au suivant dans l'array
	    this._timer.onComplete.add(function(){ 
	    	if(index + 1 < texts.length){
	    		this._displayTexts(texts, index + 1);
	    	}
	    }, this);

	    this._timer.start();
	}

	_waitForNext(){
		this._nextButton = game.add.button(0,0,"nextButton", function(){
			this._bmpText.text = "";
			this._timer.resume();
			this._nextButton.destroy();
		}, this, 0,1,2,0);
		this._nextButton.alignIn(this._dialBox, Phaser.BOTTOM_RIGHT, -15, -20);
		this._nextButton.scale.setTo(2);
	}
}