class TimeMgr{
    //toutes les valeurs sont données en ms
    constructor(yearDuration, callbacks){
        this._CONSTANTS = {
            msYearDuration: 32000,
            secYearDuration: 32,

            maxTimeScale: 32,
            minTimeScale: 1/4
        };

        this._yearDuration = yearDuration;
        this._timer = game.time.create();

        this._callbacks = callbacks; //array de callbacks
        this._YUCallbacks = [];

        this._year = globals.beginYear;
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
                // console.log("yearUpdate called");
            }
        }, this);
        this._timer.start();

        this._startYearDisplay();
    }

    _yearUpdate(){
        if(this._year >= globals.endYear && !globals.gameEnded){
            gameEls.fadeCam(2000, 1, () => {
                globals.gameWon = true;
                game.state.start("gameEnd");
            });
            globals.gameEnded = true;
        }

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

        let slowDown = game.make.button(0,0,"speed", () => {
            if(this._timeScale > this._CONSTANTS.minTimeScale){
                this.yearDuration *= 2;
                this._timeScale /= 2;
            }
            this._showTimeScale();
        }, this,0,0,0,0);
        slowDown.alignIn(box, Phaser.LEFT_CENTER, -6);
        //bouton de 14x11
        slowDown.hitArea = new Phaser.Rectangle(-14,-5,28,22); //à ajuster
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
        showTmpText("x"+this._timeScale, 64);
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
    }
}
