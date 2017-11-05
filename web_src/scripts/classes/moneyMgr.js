class MoneyMgr{
    constructor(initVal){
        this._totVal = initVal;

        //voir moneyDisplay.js
        this.totMoneyDisplay = new MoneyDisplay(this._totVal, 32, "green", true, game.world, Phaser.TOP_LEFT, -5, -5);
    }

    set totVal(v){
        this._totVal = v;
        this.totMoneyDisplay.updateVal(v);
    }

    get totVal(){
        return this._totVal;
    }

    buy(price, boughtCallback){
        if(price <= this.totVal){
            this.totVal -= price;
            boughtCallback();
        }else if (!globals.dialogDisplayed){
            let NEMDialog = new Dialog(["Désolé monsieur, nos finances ne nous permettent pas cet achat."]);
            NEMDialog.start();
        }
        //debugger;
    }

}