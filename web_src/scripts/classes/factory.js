class Factory{
    constructor(type, level){
        this._type = type;
        this._level = level;
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

    get iconIndex(){
        switch(this.type){
            case "notUsed":
                return this.level; //0: locked, 1: not used
            case "coalCentral":
                return globals.factories.maxLevel + this.level;
                //ajouter les autres types de resources ici
            case "oilCentral":
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
