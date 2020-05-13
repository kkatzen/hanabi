import CardManager from '@/CardManager'
import { GameState, createBlankGame } from '../../../src/GameState';

describe('Gameplay', () => {

  it('intantiate a new random game', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();
    console.log(manager);

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
    expect(manager.gameState.playerHands["bob"]).toContain(nextCardInDeck);
  
    // Deck has one fewer card
    expect(manager.gameState.deck.length).toEqual(previousDeckLength - 1);
  })

  // TOOD(kk): test palye dintiali state
  it('discarding when deck is empty', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({"bob":['r1a']});
    manager._forceSetProgress({});
    manager._forceSetDeck([]);

    manager.discardAndDraw("bob", 0);

    expect(manager.gameState.playerHands).toEqual({"bob":[]});
    expect(manager.gameState.progress).toEqual({});
    expect(manager.gameState.deck).toEqual([]);
    expect(manager.gameState.discards).toEqual(['r1a']);
  })

  it('intantiate with specific cardmap', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({1:['r1a'], 2:['r2a']});
    manager._forceSetProgress({});
    manager._forceSetDeck(['r1b','r2b']);

    expect(manager.gameState.playerHands).toEqual({1:['r1a'], 2:['r2a']});
    expect(manager.gameState.deck).toEqual(['r1b','r2b']);
  })

  it('valid card play', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({1:['r1a'], 2:['r2a']});
    manager._forceSetProgress({'r': 1});
    manager._forceSetDeck(['g1b','y2a']);
    
    expect(manager.playCard(2,0)).toEqual(true);

    expect(manager.gameState.playerHands).toEqual({1:['r1a'], 2:['y2a']});
    expect(manager.gameState.progress).toEqual({'r': 2});
    expect(manager.gameState.deck).toEqual(['g1b']);
  })

  it('invalid card play', () => {
    let manager = new CardManager(createBlankGame());
    manager.addPlayer("bob");
    manager.dealCardsAndStartGame();

    manager._forceSetPlayerHands({1:['r5a'], 2:['r2a']});
    manager._forceSetProgress({'r': 1});
    manager._forceSetDeck(['g1b','y2a']);

    expect(manager.playCard(1,0)).toEqual(false);

    expect(manager.gameState.playerHands).toEqual({1:['r5a'], 2:['r2a']});
    expect(manager.gameState.progress).toEqual({'r': 1});
    expect(manager.gameState.deck).toEqual(['g1b','y2a']);
  })
})
