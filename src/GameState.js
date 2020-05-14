import firebase from 'firebase'

class GameState {
    constructor(playerHands, deck, progress, discards) {
        this.activePlayer = null;
        this.playerHands = playerHands; // {}
        this.deck = deck; // []
        this.progress = progress; // {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}
        this.discards = discards; // []
        this.remainingHints = 8;
    }
}
const createBlankGame = function() {
    return new GameState(
        {}, //playerHands
        [], //deck
        {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}, //progress
        []); //discards
}
const GameStateConverter = {
    toFirestore: function(gameState) {
        return {
            activePlayer: gameState.activePlayer,
            playerHands: gameState.playerHands,
            deck: gameState.deck,
            progress: gameState.progress,
            discards: gameState.discards,
            remainingHints: gameState.remainingHints,
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
            data.remainingHints);
    }
};

export {GameState, GameStateConverter, createBlankGame};