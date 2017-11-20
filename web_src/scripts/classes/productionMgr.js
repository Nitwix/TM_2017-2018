class ProductionMgr{
    constructor(){
        this._energyProduction = 0;
        this._energyToMondio = 1;
    }

    update(){
        // console.log(this.mondioProduction)
        // debugger;
        globals.moneyMgr.totVal += this.mondioProduction;
    }

    get mondioProduction(){
        // console.log(this._energyProduction , this._energyToMondio)
        return this._energyProduction * this._energyToMondio;
    }

    set energyProduction(e){
        this._energyProduction = parseInt(e);
    }

    get energyProduction(){
        return this._energyProduction;
    }

    set energyToMondio(r){
        this._energyToMondio = r;
    }

    get energyToMondio(){
        return this._energyToMondio;
    }
}
