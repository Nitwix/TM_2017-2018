class ProductionMgr{
    constructor(){
        this._totPower = 0;
        this._energyToMondio = .3;
    }

    update(){
        let totPower = 0;
        for(let s of globals.sites.instances){
            totPower += (s.fac.power != undefined) ? s.fac.power : 0;
        }
        this.totPower = totPower;
        globals.moneyMgr.totVal += this.mondioProduction;
    }

    get mondioProduction(){
        return this._totPower * this._energyToMondio;
    }

    set totPower(e){
        this._totPower = parseInt(e);
    }

    get totPower(){
        return this._totPower;
    }

    set energyToMondio(r){
        this._energyToMondio = r;
    }

    get energyToMondio(){
        return this._energyToMondio;
    }
}
