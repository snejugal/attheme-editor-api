const Attheme = require(`attheme-js`);
const isNode = require(`detect-node`);
const apiUri = `https://snejugal.ru/attheme-editor/api/`;

let request;

if (isNode) {
  try {
    request = require(`request-promise`);
  } catch (e) {
    // eslint-disable-next-line
    throw new Error(`For attheme-editor-api to work in Node.js, please install request and request-promise.`);
  }
}

const makeRequest = async (data) => {
  const body = JSON.stringify(data);

  if (isNode) {
    const response = await request({
      uri: apiUri,
      method: `post`,
      body,
    });

    const parsedResponse = JSON.parse(response);

    return parsedResponse;
  }

  const response = await fetch(apiUri, {
    method: `post`,
    body,
  });

  return response.json();
};

/**
 * Creates a link that opens a theme in .attheme editor based on themeId.
 * @param {string} themeId The ID of the theme to open in .attheme editor.
 * @returns {string} A URL to be opened in the browser.
 */
const createOpenInEditorLink = (themeId) => (
  `https://snejugal.ru/attheme-editor/?themeId=${themeId}`
);

/**
 * Upload theme to .attheme editor database.
 * @param {string} options.name The theme's name.
 * @param {string|object} options.theme The theme to upload. If it's a string,
 * then it's only encoded in base64, otherwise Attheme.asText(theme) is called
 * before encoding.
 * @returns {string} The themeId returned by API.
 */
const uploadTheme = async ({ name, theme }) => {
  let content;

  if (typeof theme === `string`) {
    content = theme;
  } else {
    content = Attheme.asText(theme);
  }

  if (isNode) {
    content = Buffer.from(content, `binary`).toString(`base64`);
  } else {
    content = btoa(content);
  }

  const { themeId } = await makeRequest({
    requestType: `uploadTheme`,
    name,
    content,
  });

  return themeId;
};

/**
 * Downloads the theme.
 * @param {string} themeId The theme's ID.
 * @returns {object} An object with name and parsed theme returned by the API.
 */
const downloadTheme = async (themeId) => {
  const { name, content } = await makeRequest({
    requestType: `downloadTheme`,
    themeId,
  });

  let decodedContent;

  if (isNode) {
    decodedContent = Buffer.from(content, `base64`).toString(`binary`);
  } else {
    decodedContent = atob(content);
  }

  const theme = new Attheme(decodedContent);

  return {
    name,
    theme,
  };
};

module.exports = {
  createOpenInEditorLink,
  uploadTheme,
  downloadTheme,
};