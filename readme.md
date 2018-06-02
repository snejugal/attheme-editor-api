# attheme-editor-api
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
  console.log(theme); // Attheme { divider: {...} }
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

If `attheme-editor-api` is run in Node.js, it will need `request` and `request-promise` to be installed. If it's run in browser, it will use `fetch`, so include a `fetch` polyfill if needed. 