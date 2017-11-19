class ProductionMgr{
    constructor(){
        this._energyProduction = 0;
        this._energyToMondio = 1;
    }

    update(){
        globals.moneyMgr.totVal += this._energyProduction * this._energyToMondio;
        console.log(globals.moneyMgr.totVal);
    }

    set energyProduction(e){
        this._energyProduction = parseInt(e);
    }

    set energyToMondio(r){
        this._energyToMondio = r;
    }
}
