class TimeMgr{
    //toutes les valeurs sont données en ms
    constructor(yearDuration, callbacks){
        this._CONSTANTS = {
            msYearDuration: 32000,
            secYearDuration: 32
        };

        this._yearDuration = 8000;//yearDuration;
        this._timer = game.time.create();

        this._callbacks = callbacks; //array de callbacks

        this._year = 1800;
    }

    startUpdate(){
        let delay = this._yearDuration / (2*this._CONSTANTS.msYearDuration);
        delay *= 1000; //donc le delay de base est de 500ms (pour un yearDuration de 32s)
        delay = Math.floor(delay);
        debugger;
        this._timer.loop(delay, () => {
            for(let c of this._callbacks){
                c();
            }

            if(Math.floor(this._timer.seconds) % (this._yearDuration*1000) === 0){
                this._yearUpdate();
                console.log("yearUpdate called");
            }
        }, this);
        this._timer.start();

        this._startYearDisplay();
    }

    _yearUpdate(){
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
    }

    _updateYearDisplay(){
        this._yearText.text = this._year;
    }

    //TODO: tester pour voir si ça fonctionne bien
    addCallback(callback){
        this._callbacks.push(callback);
    }

    //TODO
    set yearDuration(d){

    }
}
