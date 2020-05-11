import CardManager from '@/GamePlay'

describe('Gameplay', () => {

  it('intantiate random game', () => {
    let myGame = new CardManager(3, 4);

    expect(myGame.playerHands.length).toEqual(3);
    expect(myGame.playerHands[0].length).toEqual(4);
    expect(myGame.cardMap.deck.length).toEqual(40 - 3*4);
  })

  it('discarding and draw a new card', () => {
    let myGame = new CardManager(3, 4);

    let nextCardInDeck = myGame.cardMap.deck[myGame.cardMap.deck.length - 1];
    let previousDeckLength = myGame.cardMap.deck.length;

    myGame.discardAndDraw(0, 0);

    // I drew the new card
    expect(myGame.playerHands[0].length).toEqual(4);
    expect(myGame.playerHands[0]).toContain(nextCardInDeck);
  
    // Deck has one fewer card
    expect(myGame.cardMap.deck.length).toEqual(previousDeckLength - 1);
  })

  // TOOD(kk): test palye dintiali state
  it('discarding when deck is empty', () => {
    let myGame = new CardManager(3, 4);
    myGame._forceNewCardMap({
      players: [['r1a','g2a']],
      played: {},
      deck: [],
    });

    myGame.discardAndDraw(0, 0);

    expect(myGame.cardMap).toEqual({
      players: [['g2a']],
      played: {},
      deck: [],
    });
  })

  it('intantiate with specific cardmap', () => {
    let myGame = new CardManager(1,2);

    myGame._forceNewCardMap({
      players: [['r1a'],['r2a']],
      played: {},
      deck: ['r1b','r2b'],
    });

    expect(myGame.playerHands.length).toEqual(2);
    expect(myGame.playerHands[0].length).toEqual(1);
    expect(myGame.cardMap.deck.length).toEqual(2);
  })

  it('valid card play', () => {
    let myGame = new CardManager(1,1);

    myGame._forceNewCardMap({
      players: [['r1a'],['r2a']],
      played: {'r': 1},
      deck: ['g1b','y2a'],
    });
    
    expect(myGame.playCard(1,0)).toEqual(true);

    expect(myGame.cardMap).toEqual({
      players: [['r1a'],['y2a']],
      played: {'r': 2},
      deck: ['g1b'],
    });
  })

  it('invalid card play', () => {
    let myGame = new CardManager(1,1);

    myGame._forceNewCardMap([/*hands*/['r5a'],['r2a']],
    /*deck*/ ['g1b','y2a']);
    
    expect(myGame.playCard(0,0)).toEqual(false);

    expect(myGame.cardMap).toEqual({
      players: [['r5a'],['r2a']],
      played: {'r': 1},
      deck: ['g1b','y2a'],
    });
  })
})
