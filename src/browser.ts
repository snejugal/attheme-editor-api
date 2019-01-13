import api, { API_URL } from "./api";

const makeRequest = async <T>(data: unknown) => {
  const body = JSON.stringify(data);

  const response = await fetch(API_URL, {
    method: `post`,
    body,
  });

  const json: T = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error((json as any as { error: string }).error);
};

export const {
  createOpenInEditorLink,
  uploadTheme,
  downloadTheme,
} = api(makeRequest);
