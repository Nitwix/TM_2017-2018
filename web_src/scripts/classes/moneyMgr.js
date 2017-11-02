class MoneyMgr{
    constructor(initVal){
        this._totVal = initVal;

        //voir moneyDisplay.js
        this.totMoneyDisplay = new MoneyDisplay(this._totVal, 32, "green", true, game.world, Phaser.TOP_LEFT, -10, -10);
    }

    //TODO: afficher tjs le même nombre de chiffres


    set totVal(v){
        this._totVal = v;
        this.totMoneyDisplay.updateVal(v);
    }

    get totVal(){
        return this._totVal;
    }





}
