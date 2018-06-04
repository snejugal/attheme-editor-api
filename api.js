const Attheme = require(`attheme-js`);
const isNode = require(`detect-node`);

let makeRequest;

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
const uploadTheme = ({ name, theme }) => new Promise((resolve, reject) => {
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

  makeRequest({
    requestType: `uploadTheme`,
    name,
    content,
  })
    .then(({ themeId }) => resolve(themeId))
    .catch(reject);
});

/**
 * Downloads the theme.
 * @param {string} themeId The theme's ID.
 * @returns {object} An object with name and parsed theme returned by the API.
 */
const downloadTheme = (themeId) => new Promise((resolve, reject) => {
  makeRequest({
    requestType: `downloadTheme`,
    themeId,
  })
    .then(({ name, content }) => {
      let decodedContent;

      if (isNode) {
        decodedContent = Buffer.from(content, `base64`).toString(`binary`);
      } else {
        decodedContent = atob(content);
      }

      const theme = new Attheme(decodedContent);

      resolve({
        name,
        theme,
      });
    })
    .catch(reject);
});

module.exports = (fetcher) => {
  makeRequest = fetcher;

  return {
    createOpenInEditorLink,
    uploadTheme,
    downloadTheme,
  };
};