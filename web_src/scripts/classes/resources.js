class Resource{
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
}