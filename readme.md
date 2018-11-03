# `attheme-editor-api`

A little package for handling .attheme editor API.

## Installing

```bash
npm i attheme-editor-api
```

## Using

```js
import * as atthemeEditorApi from "attheme-editor-api";

(async () => {
  const themeId = await atthemeEditorApi.uploadTheme({
    name: `Somewhere I Belong`,
    theme: `divider=#000000`,
  });

  const { name, theme } = await atthemeEditorApi.downloadTheme(themeId);

  console.log(name); // Somewhere I Belong
  console.log(theme); // Attheme { ... }
})();
```

```js
import Attheme from "attheme-js";
import * as atthemeEditorApi from "attheme-editor-api";

(async () => {
  const themeId = await atthemeEditorApi.uploadTheme({
    name: `Chasing The Sun`,
    theme: new Attheme(`checkbox=#ff0000`),
  });

  const link = atthemeEditorApi.createOpenInEditorLink(themeId);

  console.log(`Click the link to open the theme in the browser: ${link}`);
})();
```

`attheme-editor-api` requires `request-promise` (and `request` therefore) for running in Node.js. If you want to use `attheme-editor-api` in the browser, import `attheme-editor-api/browser` which uses `fetch` instead of `request-promise`.
