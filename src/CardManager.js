import { GameState } from "./GameState";

const MAX_HINTS = 8;

class CardManager {
    constructor(gameState) {
        // Make a deep copy of the objects so nothing gets weirdly out of sync.
        let copyPlayerHanders = {};
        for (let key of Object.keys(gameState.playerHands)) {
            copyPlayerHanders[key] = Array.from(gameState.playerHands[key]);
        }
        this.gameState = new GameState(
            gameState.activePlayer, // activePlayer
            copyPlayerHanders, //playerHands
            Array.from(gameState.deck), //deck
            Object.assign({}, gameState.progress), //progress
            Array.from(gameState.discards), //discards
            gameState.remainingHints, // remainingHints
            gameState.misplays, // misplays
            );
    }

    discardAndDraw(playerKey, cardIndex) {
        this._discardAndDraw(playerKey, cardIndex, true);
        if (this.gameState.remainingHints < MAX_HINTS){
            this.gameState.remainingHints++;
        }
        this.nextPlayer();
    }

    giveHint(playerKey, hint) {
        let numberHint = parseInt(hint);
        const substrIndex = isNaN(numberHint) ? 0 : 1;
        const hintType = isNaN(numberHint) ? "colorHinted" : "numberHinted";

        for(let cardInfo of this.gameState.playerHands[playerKey]) {
            if (cardInfo.id.substr(substrIndex,1) == hint) {
                cardInfo[hintType] = true;
            }
        }

        if (this.gameState.remainingHints > 0) {
            this.gameState.remainingHints--;
            this.nextPlayer();
            return true;
        } else {
            return false;
        }
    }

    dealCardsAndStartGame() {
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
        let unshuffledDeck = [];
        for (let color of ["r","b","g","y","p"]){
            for (let id of ["1a","1b","1c","2a","2b","3a","3b","4a","4b","5a"]) {
                unshuffledDeck.push(color + id);
            }
        }
        let shuffledDeck = _shuffle(unshuffledDeck);
        
        for (let playerName in this.gameState.playerHands) { 
            let hand = [];
            while (hand.length < /*startingHandSize=*/4) {
                let cardInfo = {
                    id: shuffledDeck.pop(),
                    backgroundId: hand.length + 1
                };
                hand.push(cardInfo);
            }
            this.gameState.playerHands[playerName] = hand;
        }
        this.gameState.deck = shuffledDeck;
        this.gameState.activePlayer = Object.keys(this.gameState.playerHands)[0];
    }

    nextPlayer() {
        let players = Object.keys(this.gameState.playerHands).sort();
        let currentIndex = players.findIndex((i) => {return this.gameState.activePlayer == i});
        let nextIndex = currentIndex + 1 == players.length ? 0 : currentIndex + 1;
        this.gameState.activePlayer = players[nextIndex];
    }

    addPlayer(name) {
        this.gameState.playerHands[name] = [];
    }

    _newCardBackgroundId(playerKey) {
        const cardInfos = this.gameState.playerHands[playerKey];
        const indices = cardInfos.map(ci => ci.backgroundId);
        let indexSum = 0;
        for (let index of indices) {
            indexSum += parseInt(index);
        }
        return 15 - indexSum;
    }

    _discardAndDraw(playerKey, cardIndex, actualDiscard) {
        const newCardBackgroundId = this._newCardBackgroundId(playerKey);
        let discarded = this.gameState.playerHands[playerKey].splice(cardIndex, 1);
        if(actualDiscard) {
            this.gameState.discards.push(discarded[0].id);
        }
        if (this.gameState.deck.length > 0) {
            let cardInfo = {
                id: this.gameState.deck.pop(),
                backgroundId: newCardBackgroundId
            };
            this.gameState.playerHands[playerKey].push(cardInfo);
        }
    }

    playCard(playerKey, cardIndex) {
        const color = this.gameState.playerHands[playerKey][cardIndex].id.substr(0,1);
        const num = this.gameState.playerHands[playerKey][cardIndex].id.substr(1,1);
        if (this.gameState.progress[color] + 1 == num) {
            this.gameState.progress[color]++;
            this._discardAndDraw(playerKey, cardIndex, false);
            this.nextPlayer();
            return true;
        }
        this.gameState.misplays++;
        if(this.gameState.misplays > 5) {
            alert("game over!!! honor code. please don't cheat ;)");
        }
        this._discardAndDraw(playerKey, cardIndex, true);
        this.nextPlayer();
        return false;
    }

    _forceSetPlayerHands(playerHands) {
        this.gameState.playerHands = playerHands;
    }

    _forceSetDeck(deck) {
        this.gameState.deck = deck;
    }

    _forceSetProgress(progress) {
        this.gameState.progress = progress;
    }

    _forceSetActivePlayer(activePlayer) {
       this.gameState.activePlayer = activePlayer;
    }
}

// toggle for testing vs dev. why? i'm lazy
module.exports = CardManager;
//export default CardManager;