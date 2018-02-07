class ProductionMgr{
    constructor(){
        this._totPower = 0;
        this._CO2Production = 0;

        this._totCO2 = 0; //CO2 émi au total dans l'atmosphère (CO2Production + grayCO2 - CO2Absorbed)

        this._energyToMondio = 1.2;

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
        this._totCO2 += CO2Production;

        if(!globals.gameEnded){
            if(this._totCO2 >= globals.CO2Limit){
                //BUG: la camera fait un flash vers alpha=0 avant de fader vers alpha=1
                gameEls.fadeCam(2000, 1, () => {
                    globals.gameWon = false;
                    game.state.start("gameEnd");
                });
                globals.gameEnded = true;
            }else{
                const fadeScale = 3 / 5;
                gameEls.fadeCam(10, fadeScale * (this._totCO2 / globals.CO2Limit));
            }
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

    get totCO2(){
        return this._totCO2;
    }

    set totCO2(v){
        this._totCO2 = v;
    }

    set energyToMondio(r){
        this._energyToMondio = r;
    }

    get energyToMondio(){
        return this._energyToMondio;
    }

    get globalWarming(){
        return (this._totCO2 / globals.CO2Limit)*globals.globalWarmingLimit;
    }
}
