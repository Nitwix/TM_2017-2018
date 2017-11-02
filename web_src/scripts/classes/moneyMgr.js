class MoneyMgr{
    constructor(initVal){
        this.val = initVal;
    }

    //TODO: afficher tjs le même nombre de chiffres
    get prettyStr(){
        if(this.val < 1000){
            return this.val;
        }else if (this.val < 10**6) {
            return (this.val / 10**5).toFixed(3) + "K";
        }else if (this.val < 10**9) {
            return (this.val / 10**6).toFixed(3) + "M";
        }
    }

    display(txtSize, mondioCol, objToAlignIn, alignPos, offX, offY){
        // valStr, size, mondioCol, objToAlignIn, alignPos, offX, offY
        let displayMoney = new DisplayMoney(this.prettyStr, txtSize, mondioCol, objToAlignIn, alignPos, offX, offY);
        return displayMoney;
    }



}
