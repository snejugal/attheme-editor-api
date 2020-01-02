import Attheme from "attheme-js";
import isNode = require("detect-node");

type Fetcher = <T>(data: unknown) => Promise<T>;

let makeRequest: Fetcher;

/**
 * Creates a link that opens a theme in .attheme editor based on themeId.
 * @param themeId The ID of the theme to open in .attheme editor.
 * @returns A URL to be opened in the browser.
 */
const createOpenInEditorLink = (themeId: string) =>
  `https://attheme-editor.snejugal.ru/?themeId=${themeId}`;

/**
 * Upload theme to .attheme editor database.
 * @param options.name The theme's name.
 * @param options.theme The theme to upload.
 * @returns The themeId returned by API.
 */
const uploadTheme = async ({
  name,
  theme
}: {
  name: string;
  theme: Attheme;
}) => {
  let content = theme.toString();

  if (isNode) {
    content = Buffer.from(content, `binary`).toString(`base64`);
  } else {
    content = btoa(content);
  }

  const { themeId } = await makeRequest<{ themeId: string }>({
    requestType: `uploadTheme`,
    name,
    content
  });

  return themeId;
};

/**
 * Downloads the theme.
 * @param themeId The theme's ID.
 * @returns An object with name and parsed theme returned by the API.
 */
const downloadTheme = async (themeId: string) => {
  const { name, content } = await makeRequest<{
    name: string;
    content: string;
  }>({
    requestType: `downloadTheme`,
    themeId
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
    theme
  };
};

export default (fetcher: Fetcher) => {
  makeRequest = fetcher;

  return {
    createOpenInEditorLink,
    uploadTheme,
    downloadTheme
  };
};

export const API_URL = `https://attheme-editor.snejugal.ru/api/`;
