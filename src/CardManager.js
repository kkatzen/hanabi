import { GameState } from "./GameState";

class CardManager {
    constructor(gameState) {
        this.gameState = gameState;
    }

    discardAndDraw(playerIndex, cardIndex) {
        return this._discardAndDraw(playerIndex, cardIndex, true);
    }

    _discardAndDraw(playerIndex, cardIndex, actualDiscard) {
        let discarded = this.gameState.playerHands[playerIndex].splice(cardIndex, 1);
        console.log(discarded);
        if (actualDiscard) {
            this.gameState.discards.push(discarded[0]);
        }
        if (this.gameState.deck.length > 0) {
            this.gameState.playerHands[playerIndex].push(this.gameState.deck.pop());
        }
    }

    playCard(playerIndex, cardIndex) {
        const color = this.gameState.playerHands[playerIndex][cardIndex].substr(0,1);
        const num = this.gameState.playerHands[playerIndex][cardIndex].substr(1,1);
        if (this.gameState.progress[color] + 1 == num) {
            this.gameState.progress[color]++;
            this._discardAndDraw(playerIndex, cardIndex, false);
            return true;
        }
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
}

// toggle for testing vs dev. why? i'm lazy
//module.exports = CardManager;
export default CardManager;