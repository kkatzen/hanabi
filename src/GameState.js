import firebase from 'firebase'

class GameState {
    constructor(playerHands, deck, progress, discards) {
        this.activePlayer = null;
        this.playerHands = playerHands; // {}
        this.deck = deck; // []
        this.progress = progress; // {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}
        this.discards = discards; // []
        this.hints = 0;
    }
}
const createBlankGame = function() {
    return new GameState({}, [], {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}, [], 0);
}
const GameStateConverter = {
    toFirestore: function(gameState) {
        return {
            activePlayer: gameState.activePlayer,
            playerHands: gameState.playerHands,
            deck: gameState.deck,
            progress: gameState.progress,
            discards: gameState.discards,
            hints: gameState.hints,
        };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new GameState(
            data.activePlayer,
            data.playerHands,
            data.deck,
            data.progress,
            data.discards,
            data.hints);
    }
};

export {GameState, GameStateConverter, createBlankGame};