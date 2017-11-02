class MoneyMgr{
    constructor(initVal){
        this._totVal = initVal;

        //voir moneyDisplay.js
        this.totMoneyDisplay = new MoneyDisplay(this.prettyStr(this._totVal), 32, "green", false, game.world, Phaser.TOP_LEFT, -10, -10);
    }

    //TODO: afficher tjs le même nombre de chiffres
    prettyStr(val){
        if(val < 10**4){
            return val;
        }else if (val < 10**5) {
            return (val / 10**3).toFixed(2) + "K";
        }else if (val < 10**6) {
            return (val / 10**3).toFixed(1) + "K";
        }else if (val < 10**7) {
            return (val / 10**6).toFixed(3) + "M";
        }else if (val < 10**8) {
            return (val / 10**6).toFixed(2) + "M";
        }else if (val < 10**9) {
            return (val / 10**6).toFixed(1) + "M";
        }
    }

    set totVal(v){
        this._totVal = v;
        this.totMoneyDisplay.updateStr(this.prettyStr(v));
    }

    get totVal(){
        return this._totVal;
    }





}
