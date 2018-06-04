const apiUri = `https://snejugal.ru/attheme-editor/api/`;
const api = require(`./api`);

const makeRequest = (data) => new Promise((resolve, reject) => {
  const body = JSON.stringify(data);

  fetch(apiUri, {
    method: `post`,
    body,
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

module.exports = api(makeRequest);