class Tutorial{
    constructor(){
        this._texts = [
            [
                "Bien le bonjour, président(e)! Je me présente : Conseil. Je serai votre guide et conseiller durant toute la durée de votre mandat.",
                "Vous présiderez durant... eh bien, si tout se passe bien, 300 ans. Vous prendrez de nombreuses décisions durant votre carrière et certaines d'entre elles auront des conséquences dans un futur plus ou moins lointain. Réfléchissez donc sagement avant de prendre une décision.",
                "Pour commencer, vous pourriez investir une certaine somme dans la recherche d'un type de centrale électrique. Appuyez donc sur le bouton 'Recherche'."
            ]
        ];
        this._textIndex = 0;

        this._signal = new Phaser.Signal();
    }

    start(){
        this.setNextDialEvent();
        this.dispatchSignal();
    }

    setNextDialEvent(){
        this._signal.addOnce(() => {
            let dial = new Dialog(this._texts[this._textIndex]);
            dial.start();
            this._textIndex++;
        }, this);
    }

    dispatchSignal(){
        this._signal.dispatch();
    }
}