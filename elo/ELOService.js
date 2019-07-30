const GameResult = {
  Win: 1,
  Loose: 0,
  Draw: 0.5
};

class ELOService {
  constructor() {
    //A와 B의 레이팅이 gap 만큼 차이나면 승률이 10배 차이가 된다.
    this.gap = 1000;
    // KFactor
    this.KFactor = 24;
  }

  /**
   * 내 레이탕과 상대방의 레이팅을 인장을 받아서 승률을 계산한다.
   */
  calculateWinRate(myRating, enemyRating) {
    return 1 / (1 + 10 ** ((enemyRating - myRating) / this.gap));
  }

  /**
   * 승부 결과와 상대방에 대한 나의 승률을 인자를 받아 레이팅의 변화량을 구한다.
   */
  calculateChangesOfRating(/* 게임결과 */ gameResult, /* 승률 */ winRate) {
    return this.KFactor * (gameResult - winRate);
  }
}

const eloService = new ELOService();

const winRate = eloService.calculateWinRate(1500, 2400);
const changesOfRating = eloService.calculateChangesOfRating(GameResult.Win, winRate);

console.log(winRate, changesOfRating);
