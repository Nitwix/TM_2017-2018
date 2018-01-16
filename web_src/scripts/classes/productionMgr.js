class ProductionMgr{
    constructor(){
        this._totPower = 0;
        this._CO2Production = 0;

        this._totCO2Produced = 0; //CO2 émi au total dans l'atmosphère (CO2Production + grayCO2)

        this._energyToMondio = .3;

        this.gameEnded = false;
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

        if(!this.gameEnded){
            if(this._totCO2Produced >= globals.CO2Limit){
                //BUG: la camera fait un flash vers alpha=0 avant de fader vers alpha=1
                this._fadeCam(2000, 1, () => {
                    globals.gameWon = false;
                    game.state.start("gameEnd");
                });
                this.gameEnded = true;
            }else{
                const fadeScale = 4 / 5;
                this._fadeCam(10, fadeScale * (this._totCO2Produced / globals.CO2Limit));
            }
        }
    }

    _fadeCam(duration, alpha, onCompleteCB){
        game.camera.fade(0x000000, duration, true, alpha);
        // console.log(game.camera);
        if(onCompleteCB){
            game.camera.onFadeComplete.addOnce(onCompleteCB, this);
            // debugger;
        }
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
