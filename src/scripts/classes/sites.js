class Site{
    constructor(x,y,resType, resLvl){
        this.pos = new Phaser.Point(x, y);
        this.res = new Resource(resType, resLvl); //voir utils/resources.js
    }

    //ajoute le site au game
    add(){
        let icon;
        switch(this.res.type){
            case "notUsed":
                icon = this.res.level; //0 : empty, 1: locked
                break;
            case "coal":
                icon = globals.sites.maxLevel + this.res.level;
                break;
                //ajouter les autres types de resources ici
            default:
                console.log("Resource not found in classes/sites.js");
        }
        icon--; //pour que les indices passe de "Human readable" à "Computer readable"
        this.button = game.add.button(this.pos.x,
                                      this.pos.y,
                                      "resources", 
                                      function(){
            console.log(this.res.type);
        },
                                      this,icon, icon, icon, icon);
        this.button.anchor.setTo(.5);
    }
    
    
    //détruis le bouton du site de production
    del(){
       this.button.destroy(); 
    }
}