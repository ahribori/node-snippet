const Chance = require('chance');
const chance = new Chance();

let ra = 1500; // 플레이어 a의 초기 레이팅
let rb = 1500; // 플레이어 b의 초기 레이팅

function getKFactor() {
  return 36 // 체스 ELO에서는  24를 사용한다.
}

function getWinRate(ra, rb) {
  const gap = 1000; // 두 유저의 레이팅 차가 gap 만큼 날 때 승률이 10배가 된다.
  return 1 / (1 + 10 ** ((rb - ra) / gap));
}

function getChangesOfRating(gameResult, winRate) {
  let r;
  if (gameResult === 'win') {
    r = 1;
  } else if (gameResult === 'loose') {
    r = 0;
  } else if (gameResult === 'draw') {
    r = 0.5;
  } else {
    throw new Error('gameResult should be following values: "win", "loose", "draw"')
  }
  return getKFactor() * (r - winRate)
}

const ea = getWinRate(ra, rb); // 플레이어 A의 초기 승률
const eb = getWinRate(rb, ra); // 플레이어 B의 초기 승률


const a = { id: 1, rating: ra, winRate: ea, winCount: 0 }; // 플레이어 A
const b = { id: 2, rating: rb, winRate: eb, winCount: 0 }; // 플레이어 B

function game(a, b) {
  const gamers = [a, b];
  const winner = chance.weighted(gamers, [a.winRate, b.winRate]);
  // const winner = b;
  const looser = gamers.filter(gamer => {
    return gamer.id !== winner.id;
  })[0];

  const changesOfWinnerRating = getChangesOfRating('win', winner.winRate);
  const changesOfLooserRating = getChangesOfRating('loose', looser.winRate);
  const changedWinnerRating = winner.rating + changesOfWinnerRating;
  const changedLooserRating = looser.rating + changesOfLooserRating;
  a.rating = a.id === winner.id ? changedWinnerRating : changedLooserRating;
  b.rating = b.id === winner.id ? changedWinnerRating : changedLooserRating;
  a.winCount += a.id === winner.id ? 1 : 0;
  b.winCount += b.id === winner.id ? 1 : 0;
  a.winRate = getWinRate(a.rating, b.rating);
  b.winRate = getWinRate(b.rating, a.rating);

  console.log(
    `Winner: ${winner.id} ::`,
    `${Math.round(a.rating)}(${Math.round(changesOfWinnerRating)}, ${a.winRate.toFixed(2)})`,
    `${Math.round(b.rating)}(${Math.round(changesOfLooserRating)}, ${b.winRate.toFixed(2)})`
  );
}

for (let i = 10000; i > 0; i--) {
  game(a, b);
}
console.log(`Win Counts: a -> ${a.winCount}, b -> ${b.winCount}`);
