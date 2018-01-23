class MenuButton extends Phaser.Button {
    constructor(CB, CBCtx, iconName, alignUnder){
        let bIconIndex = 0;
        switch(iconName){
            case "fs":
                bIconIndex = 3;
                break;
            case "research":
                bIconIndex = 9;
                break;
            case "stats":
                bIconIndex = 12;
                break;
            case "ecoActions":
                bIconIndex = 15;
                break;
            case "world":
                bIconIndex = 6;
                break;
            default:
                bIconIndex = 6;
        }
        super(game, 0, 0, "buttons", CB, CBCtx, bIconIndex, bIconIndex+1, bIconIndex+2, bIconIndex);
        this.scale.setTo(2);
        if(alignUnder == "TOPMOST"){
            this.alignIn(game.world, Phaser.TOP_RIGHT, -globals.UI.buttonOffset, -globals.UI.buttonOffset);
        }else{
            this.alignTo(alignUnder, Phaser.BOTTOM_CENTER, 0, globals.UI.buttonOffset);
        }

        game.add.existing(this);
        

        this.redDot = game.add.sprite(0, 0, "redDotAnim", 1);
        this.redDot.scale.setTo(2);
        this.redDot.alignIn(this, Phaser.TOP_RIGHT, -2, -2);
        this.redDotAnim = this.redDot.animations.add("blink", null, 2, true);
    }

    toggleBlink() {
        if (this.redDotAnim.isPlaying) {
            this.redDotAnim.stop();
            this.redDotAnim.frame = 1;
        } else {
            this.redDotAnim.play();
        }
    }
}