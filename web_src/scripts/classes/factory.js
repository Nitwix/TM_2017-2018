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
}
