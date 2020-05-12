import CardManager from '@/CardManager'

describe('Gameplay', () => {

  it('intantiate random game', () => {
    let manager = new CardManager(3, 4);

    expect(manager.playerHands.length).toEqual(3);
    expect(manager.playerHands[0].length).toEqual(4);
    expect(manager.deck.length).toEqual(38);
  })

  it('discarding and draw a new card', () => {
    let manager = new CardManager(3, 4);

    let nextCardInDeck = manager.deck[manager.deck.length - 1];
    let previousDeckLength = manager.deck.length;

    manager.discardAndDraw(0, 0);

    // I drew the new card
    expect(manager.playerHands[0].length).toEqual(4);
    expect(manager.playerHands[0]).toContain(nextCardInDeck);
  
    // Deck has one fewer card
    expect(manager.deck.length).toEqual(previousDeckLength - 1);
  })

  // TOOD(kk): test palye dintiali state
  it('discarding when deck is empty', () => {
    let manager = new CardManager(3, 4);

    manager._forceSetPlayerHands([['r1a'],['g2a']]);
    manager._forceSetProgress({});
    manager._forceSetDeck([]);

    manager.discardAndDraw(0, 0);

    expect(manager.playerHands).toEqual([['g2a']]);
    expect(manager.progress).toEqual({});
    expect(manager.deck).toEqual([]);
  })

  it('intantiate with specific cardmap', () => {
    let manager = new CardManager(1,2);

    manager._forceSetPlayerHands([['r1a'],['r2a']]);
    manager._forceSetProgress({});
    manager._forceSetDeck(['r1b','r2b']);

    expect(manager.playerHands.length).toEqual(2);
    expect(manager.playerHands[0].length).toEqual(1);
    expect(manager.deck.length).toEqual(2);
  })

  it('valid card play', () => {
    let manager = new CardManager(1,1);

    manager._forceSetPlayerHands([['r1a'],['r2a']]);
    manager._forceSetProgress({'r': 1});
    manager._forceSetDeck(['g1b','y2a']);
    
    expect(manager.playCard(1,0)).toEqual(true);

    expect(manager.playerHands).toEqual([['r1a'],['y2a']]);
    expect(manager.progress).toEqual({'r': 2});
    expect(manager.deck).toEqual(['g1b']);
  })

  it('invalid card play', () => {
    let manager = new CardManager(1,1);

    manager._forceSetPlayerHands([['r5a'],['r2a']]);
    manager._forceSetProgress({'r': 1});
    manager._forceSetDeck(['g1b','y2a']);

    expect(manager.playCard(0,0)).toEqual(false);

    expect(manager.playerHands).toEqual([['r5a'],['r2a']]);
    expect(manager.progress).toEqual({'r': 1});
    expect(manager.deck).toEqual(['g1b','y2a']);
  })
})
