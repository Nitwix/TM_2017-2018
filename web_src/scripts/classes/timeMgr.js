class TimeMgr{
    //toutes les valeurs sont données en ms
    constructor(yearDuration, callbacks){
        this._CONSTANTS = {
            baseYearDuration: 32000
        };

        this._yearDuration = yearDuration;
        this._timer = game.time.create();

        this._callbacks = callbacks; //array de callbacks
    }

    startUpdate(){
        let delay = this._yearDuration / (2*this._CONSTANTS.baseYearDuration);
        delay *= 1000; //donc le delay de base est de 500ms (pour un yearDuration de 32s)
        this._timer.loop(delay, () => {
            for(let c of this._callbacks){
                c();
            }
        }, this);
        this._timer.start();
    }

    //TODO: tester pour voir si ça fonctionne bien
    addCallback(callback){
        this._callbacks.push(callback);
    }

    //TODO
    set yearDuration(d){

    }
}
