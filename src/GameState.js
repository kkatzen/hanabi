import firebase from 'firebase'

class GameState {
    constructor(playerHands, deck, progress, discards) {
        this.playerHands = playerHands; // {}
        this.deck = deck; // []
        this.progress = progress; // {'r':0, 'y':0, 'b':0, 'g':0, 'p':0}
        this.discards = discards; // []
    }
}



const createRandomGame = function(numPlayers, startingHandSize) {

    let _shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    let playerHands = {};
    let unshuffledDeck = [];
    for (let color of ["r","b","g","y","p"]){
        for (let id of ["1a","1b","1c","2a","2b","3a","3b","4a","4b","5a"]) {
            unshuffledDeck.push(color + id);
        }
    }
    let shuffledDeck = _shuffle(unshuffledDeck);
    for (let i= 1; i <= numPlayers; i++) {
        let hand = [];
        while (hand.length < startingHandSize) {
            hand.push(shuffledDeck.pop());
        }
        playerHands[i] = hand;
    }
    return new GameState(
        playerHands,
        shuffledDeck,
        /*progress=*/{'r':0, 'y':0, 'b':0, 'g':0, 'p':0},
        /*discards=*/[]);
}

const GameStateConverter = {
    toFirestore: function(gameState) {
        return {
            playerHands: gameState.playerHands,
            deck: gameState.deck,
            progress: gameState.progress,
            discards: gameState.discards,
        };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new GameState(
            data.playerHands,
            data.deck,
            data.progress,
            data.discards);
    }
};

export {GameState, GameStateConverter, createRandomGame};