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
        switch(this.type){
            case "notUsed":
                return this.level; //0: locked, 1: not used
            case "coalCentral":
                return globals.factories.maxLevel + this.level;
            case "fuelCentral":
                return 2*globals.factories.maxLevel + this.level;
            case "gasCentral":
                return 3*globals.factories.maxLevel + this.level;
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
