class ProductionMgr{
    constructor(){
        this._totPower = 0;
        this._totCO2Production = 0;

        this._energyToMondio = .3;
    }

    update(){
        let totPower = 0;
        let CO2Production = 0;
        for(let s of globals.sites.instances){
            totPower += s.fac.power || 0;
            CO2Production += s.fac.CO2Production || 0;
        }
        this._totPower = totPower;
        this._totCO2Production = CO2Production;
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

    get totCO2Production(){
        return this._totCO2Production;
    }

    set energyToMondio(r){
        this._energyToMondio = r;
    }

    get energyToMondio(){
        return this._energyToMondio;
    }
}
