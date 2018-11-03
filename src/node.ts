import api, { API_URL } from "./api";

let request: typeof import("request-promise");

try {
  request = require(`request-promise`);
} catch {
  throw new Error(`For attheme-editor-api to work in Node.js, please install request and request-promise.`);
}

const makeRequest = async <T>(data: unknown) => {
  const body = JSON.stringify(data);

  const response = await request({
    uri: API_URL,
    method: `post`,
    body,
  });

  const parsedResponse: T = JSON.parse(response);

  return parsedResponse;
};

export const {
  createOpenInEditorLink,
  uploadTheme,
  downloadTheme,
} = api(makeRequest);
