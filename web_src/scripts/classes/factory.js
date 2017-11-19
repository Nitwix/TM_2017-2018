//principalement utilisé dans la classe Site mais aussi pour passer la data à Newspaper depuis data/factories.js
class Factory{
    constructor(type, level, title, energyProduction, constructionPrice, destrCoeff, CO2Production, grayCO2, upgradeCoeff, addDescr){
        this._type = type;
        this._level = level;

        //seront mis à 'undefined' si ils ne sont pas fournis
        this._title = title;
        this._energyProduction = energyProduction;
        this._constructionPrice = constructionPrice;
        this._destructionPrice = constructionPrice * destrCoeff;
        this._CO2Production = CO2Production;
        this._grayCO2 = grayCO2;
        this._upgradeCoeff = upgradeCoeff;
        this._addDescr = addDescr; //ajout à la description de base
    }

    //pour avoir une copie parfaite de l'objet actuel (utilisé dans newspaper.js)
    copy(){
        return (new Factory(this._type, this._level, this._title, this._energyProduction, this._constructionPrice, this._destructionPrice / this._constructionPrice, this._CO2Production, this._grayCO2, this._upgradeCoeff, this._addDescr));
    }

    get type(){
        return this._type;
    }

    get level(){
        return this._level;
    }

    set level(l){
        this._level = l;
    }

    set type(t){
        this._type = t;
    }

    get descr(){
        return `Cette usine produira ${this._energyProduction.toReadableStr()} Watts. ${this._addDescr}`;
    }

    get upgradePrice(){
        return this._constructionPrice ** this._upgradeCoeff;
    }

    get dataObj(){
        let obj = {
            factoryType: this._type,
            title: this._title,
            descr: this.descr,
            constructionPrice: this._constructionPrice,
            fac: this //reference à cet instance de Factory
        };
        return obj;
    }

    get iconIndex(){
        let maxLvl = globals.factories.maxLevel;
        switch(this.type){
            case "notUsed":
                return this.level; //0: locked, 1: not used
            case "coalPlant":
                return maxLvl + this.level;
            case "fuelPlant":
                return 2*maxLvl + this.level;
            case "gasPlant":
                return 3*maxLvl + this.level;
            case "dam":
                return 4*maxLvl + this.level;
            case "fissionPlant":
                return 5*maxLvl + this.level;
            case "windTurbines":
                return 6*maxLvl + this.level;
            case "solarPanels":
                return 7*maxLvl + this.level;
            default:
            console.warn("factory not found in classes/factory.js");
        }
    }

    get canUpgrade(){
        if((this.level + 1) % globals.factories.maxLevel == 0){
            return false;
        }else{
            return true;
        }
    }

    upgrade(){
        this.level++;
    }
}
