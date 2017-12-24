class TimeMgr{
    //toutes les valeurs sont données en ms
    constructor(yearDuration, callbacks){
        this._CONSTANTS = {
            msYearDuration: 32000,
            secYearDuration: 32,

            maxTimeScale: 8,
            minTimeScale: 1/8
        };

        this._yearDuration = yearDuration;
        this._timer = game.time.create();

        this._callbacks = callbacks; //array de callbacks
        this._YUCallbacks = [];

        this._year = 1799;
        this._lastYUSec = -1;

        this._timeScale = 1;
    }

    get _delay(){
        let delay = this._yearDuration / (2*this._CONSTANTS.secYearDuration);
        return delay; //donc le delay de base est de 500ms (pour un yearDuration de 32s)
    }

    startUpdate(){
        let delay = this._delay;
        this._timerLoop = this._timer.loop(delay, () => {
            for(let c of this._callbacks){
                c();
            }

            let curSec = Math.floor(this._timer.seconds);

            //BUG: la yearUpdate s'effectue au maximum une fois par seconde
            if(Math.floor(this._timer.seconds) % (this._yearDuration/1000) === 0 && this._lastYUSec != curSec){
                this._yearUpdate();
                this._lastYUSec = curSec;
                console.log("yearUpdate called");
            }
        }, this);
        this._timer.start();

        this._startYearDisplay();
    }

    _yearUpdate(){
        for(let c of this._YUCallbacks){
            c();
        }

        this._year++;
        this._updateYearDisplay();
    }

    _startYearDisplay(){
        this._yearDisplayGroup = game.add.group();

        let box = game.make.image(0,0,"smallDisplayBox");
        box.scale.setTo(2);
        box.alignIn(game.world, Phaser.TOP_CENTER, 0, -6);
        this._yearDisplayGroup.add(box);

        this._yearText = game.make.bitmapText(0,0,"pixel_font",this._year, 32);
        this._yearText.alignIn(box, Phaser.CENTER, 0, -6);
        this._yearDisplayGroup.add(this._yearText);

        //TODO: afficher un text qui fadein et fadeout avec l'échelle de temps chaque fois qu'on clique sur un des boutons
        //TODO: limiter l'échelle de temps à un range de [1/4, 4]
        let slowDown = game.make.button(0,0,"speed", () => {
            if(this._timeScale > this._CONSTANTS.minTimeScale){
                this.yearDuration *= 2;
                this._timeScale /= 2;
            }
            this._showTimeScale();
        }, this,0,0,0,0);
        slowDown.alignIn(box, Phaser.LEFT_CENTER, -6);
        this._yearDisplayGroup.add(slowDown);

        let speedUp = game.make.button(0, 0, "speed", () => {
            if(this._timeScale < this._CONSTANTS.maxTimeScale){
                this.yearDuration /= 2;
                this._timeScale *= 2;
            }
            this._showTimeScale();

        }, this, 1, 1, 1, 1);
        speedUp.alignIn(box, Phaser.RIGHT_CENTER, -6);
        this._yearDisplayGroup.add(speedUp);
    }

    _showTimeScale(){
        let scaleText = game.add.bitmapText(0,0,"pixel_font", `x${this._timeScale}`, 64);
        scaleText.alpha = 0;
        scaleText.alignIn(game.world, Phaser.CENTER, 0, -16);

        let textTween = game.add.tween(scaleText);
        textTween.to({alpha:1}, 500, Phaser.Easing.Bounce.lnOut, true, 0, 0, true);
    }

    _updateYearDisplay(){
        this._yearText.text = this._year;
    }

    //NOTE: ne fonctionne pas lorsque le cb fait appel à this
    addCallback(callback){
        this._callbacks.push(callback);
    }

    //ajoute un callback pour la methode 'yearUpdate'
    addYUCallback(callback){
        this._YUCallbacks.push(callback);
    }

    get yearDuration(){
        return this._yearDuration;
    }
    //Works! :)
    set yearDuration(d){
        this._yearDuration = d;
        this._timerLoop.delay = this._delay;
        console.log(d);
    }
}
