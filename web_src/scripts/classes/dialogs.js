class Dialog{

	/*
	texts : array of strings: chaque string est une 'phase' du dialogue qui nécessite que le joueur fasse qqch
	*/
	constructor(texts, speed){
		this._texts = texts;

		//groupe Phaser contenant les éléments du dialog
		this._group = game.add.group();

		this._speed = speed || 20;

		this.onComplete = new Phaser.Signal();
	}

	bringToTop(){
		game.world.bringToTop(this._group);
	}

	//démarre le dialogue
	start(){
		gameEls.dialog = this;

		//ajoute la boîte de dialogue sur l'écran
		let dialBox = game.make.image(0,0, "dialogBox");
		dialBox.scale.setTo(3);
		dialBox.alpha = 0.9;
		cornerObj(dialBox, 10, "se");

		this._group.add(dialBox);
		this._dialBox = dialBox;

		var offset = -15;

	    //affiches les textes des dialogues
	    let bmpText = game.make.bitmapText(0,0,"pixel_font", "", 26);
	    bmpText.alignIn(dialBox, Phaser.TOP_LEFT, offset, offset);
	    bmpText.maxWidth = dialBox.width + 3*offset;

		this._group.add(bmpText);
		this._bmpText = bmpText;
	    // bmpTex.tint = 0xedddae; //couleur du texte

	    this._displayTexts(this._texts, 0);
	}

	//arrête le dialogue et supprime la boîte de dialogue
	stop(){
		this._group.destroy();

		gameEls.dialog = undefined;

		this.onComplete.dispatch();
	}


	//texts as array
	_displayTexts(texts, index){
		var text = texts[index].split(" ");
		var wordCount = 0;

		this._bmpText.text = "";

		this._timer = game.time.create();

		this._timer.repeat(this._speed, text.length, function(){
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
				this._waitForNext(false, true, index);
	    		// this._displayTexts(texts, index + 1);
	    	}else{
	    		this._waitForNext(true); //c'est le dernier texte qui est affiché
	    	}
	    }, this);

	    this._timer.start();
	}

	_waitForNext(lastText, noMoreWords, index){
		//ajoute un bouton pour afficher la partie suivante du texte
		let nextButton = game.make.button(0,0,"arrows", function(){
			this._launchNext(lastText, noMoreWords, index);
		}, this, 0,1,2,0);

		nextButton.alignIn(this._dialBox, Phaser.BOTTOM_RIGHT, -15, -20);
		nextButton.scale.setTo(2);

		this._group.add(nextButton);
		this._nextButton = nextButton;
	}

	_launchNext(lastText, noMoreWords, index){
		this._bmpText.text = "";
		this._timer.resume();
		this._nextButton.destroy();

		if(noMoreWords){
			this._displayTexts(this._texts, index+1);
		}

		if(lastText){
			this.stop(); //si c'est le dernier texte qui est affiché, on stoppe le dialogue
		}
	}
}
