//principalement utilisé dans la classe Site mais aussi pour passer la data à Newspaper depuis data/factories.js
class Factory{
    constructor(data){
        //type, level, title, power, constructionPrice, destrCoeff, CO2Production, grayCO2, upgradeCoeff, addDescr
        this._type = data.type || "notUsed";
        this._level = data.level || 0;

        //seront mis à 'undefined' si ils ne sont pas fournis
        this._title = data.title;
        this._power = data.power;
        this._constructionPrice = data.constructionPrice;
        this._destrCoeff = data.destrCoeff;
        this._CO2Production = data.CO2Production;
        this._grayCO2 = data.grayCO2;
        this._upgradeCoeff = data.upgradeCoeff;
        this._addDescr = data.addDescr; //ajout à la description de base

        this._destructionPrice = data.constructionPrice * data.destrCoeff;
        this._researchPrice = 2*data.constructionPrice;
    }

    //pour avoir une copie parfaite de l'objet actuel (utilisé dans newspaper.js)
    copy(){
        return (new Factory({
            type: this._type,
            level: this._level,
            title: this._title,
            power: this._power,
            constructionPrice: this._constructionPrice,
            destrCoeff: this._destrCoeff,
            CO2Production: this._CO2Production,
            grayCO2: this._grayCO2,
            upgradeCoeff: this._upgradeCoeff,
            addDescr: this._addDescr}));
    }

    set type(t){
        this._type = t;
    }

    get type(){
        return this._type;
    }

    get level(){
        return this._level;
    }

    get power(){
        return this._power;
    }

    set power(e){
        this._power = e;
    }

    get constructionPrice(){
        return this._constructionPrice;
    }

    get CO2Production(){
        return this._CO2Production;
    }

    get destructionPrice(){
        return this.upgradePrice*this._destrCoeff;
    }

    get researchPrice(){
        return this._researchPrice;
    }

    set level(l){
        this._level = l;
    }

    get descr(){
        return `Cette usine produira ${this._power.toReadableStr()} Watts. ${this._addDescr}`;
    }

    get upgradePrice(){
        let prc = (this._constructionPrice*(this._level+1)) ** this._upgradeCoeff;
        return prc;
    }

    get dataObj(){
        let obj = {
            spriteIndex: this.iconIndex,
            title: this._title,
            descr: this.descr,
            posTxt: "s.b.mod.",
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
            case "hydroPlant":
                return 4*maxLvl + this.level;
            case "fissionPlant":
                return 5*maxLvl + this.level;
            case "windTurbines":
                return 6*maxLvl + this.level;
            case "solarPanels":
                return 7*maxLvl + this.level;
            case "geothermalPlant":
                return 8*maxLvl + this.level;
            case "fusionPlant":
                return 9*maxLvl + this.level;
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

    get animData(){
        let data;
        switch(this._type){
            case "coalPlant":
                data = {
                    name: "smokeAnim",
                    offX: 14 - this._level*3,
                    offY: -26,
                    scale: new Phaser.Point(.48+this._level/6,1)
                };
                break;
            case "fuelPlant":
                data = {
                    name: "smokeAnim",
                    offX: 13,
                    offY: -16,
                    scale: new Phaser.Point(.32,.64)
                };
                break;
            case "gasPlant":
                let lvlCoeff = (this._level === 2) ? 1 : 0;
                data = {
                    name: "smokeAnim",
                    offX: 13,
                    offY: -16,
                    scale: new Phaser.Point(.32 + lvlCoeff*.16,.64)
                };
                break;
            case "hydroPlant":
                data = {
                    name: "waterAnim",
                    offX: 0,
                    offY: -10,
                    frameRate: 2,
                    alpha: .8
                };
                break;
            case "fissionPlant":
                data = {
                    name: "whiteSmokeAnim",
                    offX: 0,
                    offY: -19,
                    scale: new Phaser.Point(.48, .36),
                    frameRate: 3
                };
                break;
            case "windTurbines":
                data = {
                    name: "windAnim",
                    offY: -4,
                    offX: -6,
                    frameRate: 8,
                    alpha: .4
                };
                break;
            case "solarPanels":
                data = {
                    name: "sunAnim",
                    offY: -12,
                    offX: -4,
                    frameRate: 4,
                    alpha: .6
                };
                break;
            case "geothermalPlant":
                data = {
                    name: "whiteSmokeAnim",
                    offX: -3 + this._level*2,
                    offY: -18,
                    scale: new Phaser.Point(.14 + this._level*.4,.42),
                    frameRate: 5
                };
                break;
            case "fusionPlant":
                data = {
                    name: "fusionAnim",
                    offX: 0,
                    offY: 2,
                    scale: new Phaser.Point(.36,.36),
                    frameRate: 4
                };
                break;
            default:
                return undefined;
        }
        return data;
    }

    upgrade(){
        this.level++;

        this._power *= this._upgradeCoeff;
        this._CO2Production *= this._upgradeCoeff;

    }
}
