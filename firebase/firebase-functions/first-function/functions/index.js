const functions = require('firebase-functions');

exports.firstFunction = functions.region('asia-northeast1').https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }
  res.json({
    success: true
  });
});

exports.secondFunction = functions.region('asia-northeast1').https.onRequest((req, res) => {
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }
  res.json({
    success: true
  });
});
