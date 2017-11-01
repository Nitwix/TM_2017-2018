class MoneyMgr{
    constructor(initVal){
        this.val = initVal;
    }

    //TODO: afficher tjs le même nombre de chiffres
    prettyStr(){
        if(this.val < 1000){
            return this.val;
        }else if (this.val < 10**6) {
            return (this.val / 10**3).toFixed(1) + "K";
        }else if (this.val < 10**9) {
            return (this.val / 10**6).toFixed(1) + "M";
        }
    }

    mkGroup(x, y, txtSize){
        let group = game.make.group();
    }



}
