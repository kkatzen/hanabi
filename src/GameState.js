import firebase from 'firebase'

class GameState {
    constructor(activePlayer, playerHands, deck, progress, discards, remainingHints) {
        this.activePlayer = activePlayer;
        this.playerHands = playerHands; // {}
        this.deck = deck; // []
        this.progress = progress; // {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}
        this.discards = discards; // []
        this.remainingHints = remainingHints;
    }
}
const createBlankGame = function() {
    return new GameState(
        null, // activePlayer
        {}, //playerHands
        [], //deck
        {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}, //progress
        [], //discards
        8 // remainingHints
        );
}
const GameStateConverter = {
    toFirestore: function(gameState) {
        let newGameState = {
            activePlayer: gameState.activePlayer,
            playerHands: gameState.playerHands,
            deck: gameState.deck,
            progress: gameState.progress,
            discards: gameState.discards,
            remainingHints: gameState.remainingHints,
        };
        console.log("toFirestore newGameState", newGameState)
        return newGameState;
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        let newGameState = new GameState(
            data.activePlayer,
            data.playerHands,
            data.deck,
            data.progress,
            data.discards,
            data.remainingHints);
        console.log("fromFirestore newGameState", newGameState)
        return newGameState;
    }
};

export {GameState, GameStateConverter, createBlankGame};