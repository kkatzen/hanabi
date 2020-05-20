import CardManager from '@/CardManager'
import { GameState, createBlankGame } from '../../../src/GameState';

describe('Gameplay', () => {

  let handOfCards = function(a,b,c,d) {
    return [cardInfo(a, 1), cardInfo(b,2), cardInfo(c, 3), cardInfo(d, 4)];
  };

  let cardInfo = function(id, backgroundId) {
    return {id: id, backgroundId: backgroundId};
  }

  it('intantiate a new random game with 3', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.dealCardsAndStartGame();

    expect(Object.keys(manager.gameState.playerHands).length).toEqual(3);
    expect(manager.gameState.playerHands["bob"].length).toEqual(5);
    expect(manager.gameState.deck.length).toEqual(50 - 3*5);
  })

  it('intantiate a new random game with 4', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("deck");
    manager.dealCardsAndStartGame();

    expect(Object.keys(manager.gameState.playerHands).length).toEqual(4);
    expect(manager.gameState.playerHands["bob"].length).toEqual(4);
    expect(manager.gameState.deck.length).toEqual(50 - 4*4);
  })

  it('intantiate a new random game with 5', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("deck");
    manager.addPlayer("evan");
    manager.dealCardsAndStartGame();

    expect(Object.keys(manager.gameState.playerHands).length).toEqual(5);
    expect(manager.gameState.playerHands["bob"].length).toEqual(4);
    expect(manager.gameState.deck.length).toEqual(50 - 4*5);
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
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
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
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("bob",handOfCards("r1a","b","c","d"));
    manager._forceSetProgress({});
    manager._forceSetDeck([]);

    manager.discardAndDraw("bob", 0);

    expect(manager.gameState.playerHands["bob"]).toEqual([
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), 
    ]);
    expect(manager.gameState.progress).toEqual({});
    expect(manager.gameState.deck).toEqual([]);
    expect(manager.gameState.discards).toEqual(['r1a']);
  })

  it('intantiate with specific cardmap', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("bob",handOfCards("r1a","b","c","d"));
    manager._forceSetProgress({});
    manager._forceSetDeck(['r1b','r2b']);

    expect(manager.gameState.playerHands['bob']).toEqual(handOfCards("r1a","b","c","d"));
    expect(manager.gameState.deck).toEqual(['r1b','r2b']);
  })

  it('valid card play with 4', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("bob",handOfCards("r2a","b","c","d"));
    manager._forceSetProgress({'r': 1});
    manager._forceSetDeck(['g1b','y2a']);
    manager._forceSetRemainingHints(5);

    expect(manager.playCard("bob",0)).toEqual(true);

    expect(manager.gameState.playerHands['bob']).toEqual([
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), cardInfo("y2a",5), 
    ]);
    expect(manager.gameState.progress).toEqual({'r': 2});
    expect(manager.gameState.deck).toEqual(['g1b']);
    expect(manager.gameState.discards).toEqual([]);
    expect(manager.gameState.remainingHints).toEqual(5);
  })

  it('valid card play with 3 players and its a five', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("bob",[cardInfo("r5a",1), cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), cardInfo("e",5)]);
    manager._forceSetProgress({'r': 4});
    manager._forceSetDeck(['g1b','y2a']);
    manager._forceSetRemainingHints(5);
    
    expect(manager.playCard("bob",0)).toEqual(true);

    expect(manager.gameState.playerHands['bob']).toEqual([
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), cardInfo("e",5), cardInfo("y2a",6), 
    ]);
    expect(manager.gameState.progress).toEqual({'r': 5});
    expect(manager.gameState.deck).toEqual(['g1b']);
    expect(manager.gameState.discards).toEqual([]);
    expect(manager.gameState.remainingHints).toEqual(6);
  })

  it('invalid card play', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("bob", handOfCards("r5a","b","c","d"));
    manager._forceSetProgress({'r': 0});
    manager._forceSetDeck(['g1b','y2a']);

    expect(manager.playCard("bob",0)).toEqual(false);

    expect(manager.gameState.playerHands['bob']).toEqual([
      cardInfo("b",2), cardInfo("c",3), cardInfo("d",4), cardInfo("y2a",5), 
    ]);
    expect(manager.gameState.progress).toEqual({'r': 0});
    expect(manager.gameState.deck).toEqual(['g1b']);
    expect(manager.gameState.discards).toEqual(['r5a']);
    expect(manager.gameState.misplays).toEqual(1);
  })

  it('gives a number hint', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("alice",handOfCards("r5a","r2b","y3a","b2a"));
    manager._forceSetActivePlayer("bob");

    expect(manager.giveHint("alice","2"));

    expect(manager.gameState.activePlayer).toEqual("cobb");
    expect(manager.gameState.remainingHints).toEqual(7);

    let hintedRedTwo = cardInfo("r2b", 2);
    hintedRedTwo["numberHinted"] = true;
    let hintedBlueTwo = cardInfo("b2a", 4);
    hintedBlueTwo["numberHinted"] = true;

    expect(manager.gameState.playerHands['alice']).toEqual([
      cardInfo("r5a",1), hintedRedTwo, cardInfo("y3a",3), hintedBlueTwo, 
    ]);
  })

  it('gives a color hint', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("alice");
    manager.addPlayer("bob");
    manager.addPlayer("cobb");
    manager.addPlayer("dinosaur");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHand("alice",handOfCards("r5a","r2b","y3a","b2a"));
    manager._forceSetActivePlayer("bob");

    expect(manager.giveHint("alice","r"));

    expect(manager.gameState.activePlayer).toEqual("cobb");
    expect(manager.gameState.remainingHints).toEqual(7);

    let hintedRedTwo = cardInfo("r2b", 2);
    hintedRedTwo["colorHinted"] = true;
    let hintedRedFive = cardInfo("r5a", 1);
    hintedRedFive["colorHinted"] = true;

    expect(manager.gameState.playerHands['alice']).toEqual([
      hintedRedFive, hintedRedTwo, cardInfo("y3a",3), cardInfo("b2a",4), 
    ]);
  })
})
