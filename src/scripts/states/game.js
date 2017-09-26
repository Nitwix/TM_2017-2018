var gameState = {};

gameState.create = function(){
    setupBureau();
    setupUI();
};

gameState.render = function(){
    game.debug.inputInfo(10,10);
}