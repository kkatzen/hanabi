class GamePlay {
    constructor(numPlayers, startingHandSize) {
        this.cardMap = {
            players: [],
            played: {'r':0, 'y':0, 'b':0, 'g':0},
            deck: [],
        };

        let unshuffledDeck = [];
        for (let color of ["r","b","g","y"]){
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
            console.log(hand);
            this.cardMap.players.push(hand);
        }
        this.cardMap.deck = shuffledDeck;
        console.log(this.cardMap);
    }

    discardAndDraw(playerIndex, cardIndex) {
        this.cardMap.players[playerIndex].splice(cardIndex, 1);
        if (this.cardMap.deck.length > 0) {
            this.cardMap.players[playerIndex].push(this.cardMap.deck.pop());
        }
    }

    playCard(playerIndex, cardIndex) {
        console.log("playCard", playerIndex, cardIndex);
        const color = this.cardMap.players[playerIndex][cardIndex].substr(0,1);
        const num = this.cardMap.players[playerIndex][cardIndex].substr(1,1);
        if (this.cardMap.played[color] + 1 == num) {
            this.cardMap.played[color]++;
            this.discardAndDraw(playerIndex, cardIndex);
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

    _forceNewCardMap(cardMap) {
        this.cardMap = cardMap;
    }
}

//module.exports = GamePlay;
export default GamePlay;