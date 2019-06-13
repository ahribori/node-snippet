const qrcode = require('qrcode');

qrcode.toDataURL('https://github.com/ahribori', (err, url) => {
  console.log(url);
});
