const { getDistance } = require('geolib');

const myPostion = {
  name: '서현역',
  latitude: 37.384931,
  longitude: 127.12324899999999
};

const nearStations = [
  {
    name: '판교역',
    latitude: 37.38,
    longitude: 127.11
  },
  {
    name: '수내역',
    latitude: 37.378435,
    longitude: 127.11421599999994
  },
  {
    name: '죽전역',
    latitude: 37.324575,
    longitude: 127.10738500000002
  },
  {
    name: '삼환하이펙스',
    latitude: 37.4012921,
    longitude: 127.11047269999995
  }
];

nearStations.forEach(near => {
  console.log(`${near.name}은 내 위치로부터 ${getDistance(near, myPostion)} 미터 거리에 있습니다.`);
});
