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
                return globals.sites.maxLevel + this.level;
                //ajouter les autres types de resources ici
            case "textileFactory":
                return 2*globals.sites.maxLevel + this.level;
            default:
                console.warn("factory not found in classes/factory.js");
        }
    }
}
