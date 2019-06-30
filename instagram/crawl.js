const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

axios
  .get('https://www.instagram.com/kakaohairshop_official/')
  .then(response => {
    const body = response.data;
    const dom = new JSDOM(body);
    const document = dom.window.document;
    const targetScript = document.querySelector('body > script:nth-child(6)');
    const serializedData = targetScript.innerHTML
      .replace('window._sharedData = ', '')
      .replace(/;$/gi, '');

    let data;
    try {
      data = JSON.parse(serializedData);
    } catch (e) {
      console.log(e);
    }

    const timelineMedia = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media;
    console.log(timelineMedia)

  })
  .catch(console.error);
