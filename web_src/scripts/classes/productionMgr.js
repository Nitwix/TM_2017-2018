class ProductionMgr{
    constructor(){
        this._totPower = 0;
        this._CO2Production = 0;

        this._totCO2Produced = 0; //CO2 émi au total dans l'atmosphère (CO2Production + grayCO2)

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
        this._CO2Production = CO2Production;

        globals.moneyMgr.totVal += this.mondioProduction;
        this._totCO2Produced += CO2Production;

        this._updateCam();
    }

    _updateCam(){
        let CO2Limit = 1e4; //if above this value, you loose the game; to add in the globals
        game.camera.fade(0x000000, 1, true, this._totCO2Produced / CO2Limit);
        // console.log(game.camera);
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

    get CO2Production(){
        return this._CO2Production;
    }

    get totCO2Produced(){
        return this._totCO2Produced;
    }

    set totCO2Produced(v){
        this._totCO2Produced = v;
    }

    set energyToMondio(r){
        this._energyToMondio = r;
    }

    get energyToMondio(){
        return this._energyToMondio;
    }
}
