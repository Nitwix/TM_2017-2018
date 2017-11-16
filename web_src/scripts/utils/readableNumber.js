Number.prototype.toReadableStr = function(){
    let val = this;
    let kilo = "k", Mega = "M", Giga = "G", Tera = "T";
    let decimals = 1;

    if(val < 10**4){
        return val;
    }else if(val < 1e6){
        decimals = (val < 1e5) ? 2 : 1;
        return (val / 1e3).toFixed(decimals) + kilo;

    }else if(val < 1e9){
        if(val < 1e8){
            decimals = (val < 1e7) ? 3 : 2;
        }
        return (val / 1e6).toFixed(decimals) + Mega;

    }else if (val < 1e12) {
        if(val < 1e11){
            decimals = (val < 1e10) ? 3 : 2;
        }
        return (val / 1e9).toFixed(decimals) + Giga;

    }else if (val < 1e15) {
        if(val < 1e14){
            decimals = (val < 1e13) ? 3 : 2;
        }
        return (val / 1e12).toFixed(decimals) + Tera;
        
    }
}
