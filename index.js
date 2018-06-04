const apiUri = `https://snejugal.ru/attheme-editor/api/`;
const api = require(`./api`);

let request;

try {
  request = require(`request-promise`);
} catch (e) {
  // eslint-disable-next-line
  throw new Error(`For attheme-editor-api to work in Node.js, please install request and request-promise.`);
}

const makeRequest = (data) => new Promise((resolve, reject) => {
  const body = JSON.stringify(data);

  request({
    uri: apiUri,
    method: `post`,
    body,
  })
    .then((response) => {
      const parsedResponse = JSON.parse(response);

      resolve(parsedResponse);
    })
    .catch(reject);
});

module.exports = api(makeRequest);