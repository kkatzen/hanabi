import CardManager from '@/CardManager'
import { GameState, createBlankGame } from '../../../src/GameState';

describe('Gameplay', () => {

  let handOfCards = function(a,b,c,d) {
    return [cardInfo(a, 1), cardInfo(b,2), cardInfo(c, 3), cardInfo(d, 4)];
  };

  let cardInfo = function(id, backgroundId) {
    return {id: id, backgroundId: backgroundId};
  }

  it('intantiate a new random game', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    expect(Object.keys(manager.gameState.playerHands).length).toEqual(1);
    expect(manager.gameState.playerHands["bob"].length).toEqual(4);
    expect(manager.gameState.deck.length).toEqual(46);
  })

  it('iterates players', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.addPlayer("candy");
    manager.addPlayer("dog");
    
    manager.dealCardsAndStartGame();
    expect(manager.gameState.activePlayer).toEqual("bob");
    manager.nextPlayer();
    expect(manager.gameState.activePlayer).toEqual("candy");
    manager.nextPlayer();
    expect(manager.gameState.activePlayer).toEqual("dog");
    manager.nextPlayer();
    expect(manager.gameState.activePlayer).toEqual("bob");
  })

  it('discarding and draw a new card', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    let nextCardInDeck = manager.gameState.deck[manager.gameState.deck.length - 1];
    let previousDeckLength = manager.gameState.deck.length;

    manager.discardAndDraw("bob", 0);

    // I drew the new card
    const cardIds = manager.gameState.playerHands["bob"].map(i => i.id);
    expect(cardIds).toContain(nextCardInDeck);
  
    // Deck has one fewer card
    expect(manager.gameState.deck.length).toEqual(previousDeckLength - 1);
  })

  it('discarding when deck is empty', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({"bob":handOfCards("r1a","b","c","d")});
    manager._forceSetProgress({});
    manager._forceSetDeck([]);

    manager.discardAndDraw("bob", 0);

    expect(manager.gameState.playerHands).toEqual({"bob":[
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), 
    ]});
    expect(manager.gameState.progress).toEqual({});
    expect(manager.gameState.deck).toEqual([]);
    expect(manager.gameState.discards).toEqual(['r1a']);
  })

  it('intantiate with specific cardmap', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({"bob":handOfCards("r1a","b","c","d")});
    manager._forceSetProgress({});
    manager._forceSetDeck(['r1b','r2b']);

    expect(manager.gameState.playerHands['bob']).toEqual(handOfCards("r1a","b","c","d"));
    expect(manager.gameState.deck).toEqual(['r1b','r2b']);
  })

  it('valid card play', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({"bob":handOfCards("r2a","b","c","d")});
    manager._forceSetProgress({'r': 1});
    manager._forceSetDeck(['g1b','y2a']);
    
    expect(manager.playCard("bob",0)).toEqual(true);

    expect(manager.gameState.playerHands['bob']).toEqual([
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), cardInfo("y2a",5), 
    ]);
    expect(manager.gameState.progress).toEqual({'r': 2});
    expect(manager.gameState.deck).toEqual(['g1b']);
  })

  it('invalid card play', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({"bob":handOfCards("r5a","b","c","d")});
    manager._forceSetProgress({'r': 0});
    manager._forceSetDeck(['g1b','y2a']);

    expect(manager.playCard("bob",0)).toEqual(false);

    expect(manager.gameState.playerHands['bob']).toEqual([
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), cardInfo("y2a",5), 
    ]);
    expect(manager.gameState.progress).toEqual({'r': 0});
    expect(manager.gameState.deck).toEqual(['g1b']);
  })
})
