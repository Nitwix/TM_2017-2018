class EcoActionsMgr{
    constructor(){
        this.actionsData = {
            //même structure que ce que requiert newspaper.js
        };

        this.redDot = game.add.sprite(0,0,"redDotAnim", 1);
        this.redDot.scale.setTo(2);
        this.redDot.alignIn(gameEls.ecoActionsBtn, Phaser.TOP_RIGHT, -2, -2);
        this.redDotAnim = this.redDot.animations.add("blink", null, 2, true);
    }

    startNP(){

    }

    toggleRedDot(){
        if(this.redDotAnim.isPlaying){
            this.redDotAnim.stop();
            this.redDotAnim.frame = 1;
        }else{
            this.redDotAnim.play();
        }
    }
}
