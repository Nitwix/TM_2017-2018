class MoneyMgr{
    constructor(initVal){
        this._totVal = initVal;

        //voir moneyDisplay.js
        this.totMoneyDisplay = new MoneyDisplay(this._totVal, 32, "green", true, game.world, Phaser.TOP_LEFT, -5, -5);
    }

    set totVal(v){
        this._totVal = parseInt(v);
        this.totMoneyDisplay.updateVal(parseInt(v));
    }

    get totVal(){
        return this._totVal;
    }

    buy(price, boughtCallback){
        if(price <= this.totVal){
            this.totVal -= price;
            boughtCallback();
        }else{
            if(gameEls.dialog != undefined){
                gameEls.dialog.stop();
            }
            let NEMDialog = new Dialog(["Désolé monsieur, nos finances ne nous permettent pas cet achat."]);
            NEMDialog.start();
        }
        //debugger;
    }

}
