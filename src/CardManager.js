class CardManager {
    constructor(numPlayers, startingHandSize) {
        this.playerHands = [];
        this.deck = [];
        this.progress = {'r':0, 'y':0, 'b':0, 'g':0, 'p':0};
        this.discards = {'r':[], 'y':[], 'b':[], 'g':[], 'p':[]};

        let unshuffledDeck = [];
        for (let color of ["r","b","g","y","p"]){
            for (let id of ["1a","1b","1c","2a","2b","3a","3b","4a","4b","5a"]) {
                unshuffledDeck.push(color + id);
            }
        }
        let shuffledDeck = this._shuffle(unshuffledDeck);
        for (let i= 1; i <= numPlayers; i++) {
            let hand = [];
            while (hand.length < startingHandSize) {
                hand.push(shuffledDeck.pop());
            }
            this.playerHands.push(hand);
        }
        this.deck = shuffledDeck;
    }

    discardAndDraw(playerIndex, cardIndex) {
        let discarded = this.playerHands[playerIndex].splice(cardIndex, 1);
        if (this.deck.length > 0) {
            this.playerHands[playerIndex].push(this.deck.pop());
        }
    }

    playCard(playerIndex, cardIndex) {
        const color = this.playerHands[playerIndex][cardIndex].substr(0,1);
        const num = this.playerHands[playerIndex][cardIndex].substr(1,1);
        if (this.progress[color] + 1 == num) {
            this.progress[color]++;
            this.discardAndDraw(playerIndex, cardIndex);
            console.log("this.cardMap", this.cardMap);
            return true;
        }
        return false;
    }

    _shuffle(array) {
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

    _forceSetPlayerHands(playerHands) {
        this.playerHands = playerHands;
    }

    _forceSetDeck(deck) {
        this.deck = deck;
    }

    _forceSetProgress(progress) {
        this.progress = progress;
    }
}

//module.exports = CardManager;
export default CardManager;