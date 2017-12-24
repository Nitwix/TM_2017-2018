class ProductionMgr{
    constructor(){
        this._energyProduction = 0;
        this._energyToMondio = .3;
    }

    update(){
        let totProd = 0;
        for(let s of globals.sites.instances){
            totProd += (s.fac.energyProduction != undefined) ? s.fac.energyProduction : 0;
        }
        this.energyProduction = totProd;
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
