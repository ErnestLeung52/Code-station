## 📝 Code-Station

<!-- ![CodeStation Logo](/packages/local-client/public/logo192.png "logo") -->
<img src="/packages/local-client/public/logo192.png" width=50% height=50% align="center">
<img src="/packages/local-client/public/ui-screenshot.png" width=70% height=70% align="center">

### Brief

A lightweight, efficient, and interactive coding environment. You can write JavaScript, see it, execute it, write comprehensive documentation using markdown, and share it with others.

### Features

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cells
- You can show any React components, string, number, or anything else by calling the `show` function. This is a function built into the environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell

### Installation

All of your changes get saved to the file you opened Code-Station with. You can run `npx code-station serve test.js`, all of the text and code you write will be saved to the `test.js` file automatically.

`npx code-station serve <file name> -p <port number>`
ex. `npx code-station serve notebook.js -p 4000`
_<> optional_

### Development

- Do not use `npm` to install new packages, use `lerna add` to install the package to a specific directory
  `lerna add <package>[@version] [--dev] [--exact] [--peer] --scope=[directory]`
  ex. `lerna add react@18.2.0 --exact --scope=@code-station/local-client`

- Using ESBuild to bundle entire CLI. <br>
  `cd` to the `cli` directory and run
  `npm run prepublishOnly`

- Start up proxy server. <br>
  `cd` to the `cli` directory and run
  `node index.js serve`

- Publishing to NPM <br>
  Sign in to npm
  `npm login` <br>
  Run below code in root directory to publish to npm <br>
  _`cli` folder depends on `local-client`, you need to create an organization on npm to publish three packages"_
  `lerna publish --no-push`

- For any additional inquires, feel free to contact me on [LinkedIn](https://www.linkedin.com/in/ernestleung52/)

### Iteration Opportunities

1. More user-friendly output
2. Frontend improvement (fixed code editor height)
3. React syntax color highlighter

---

Thank you for using Code-Station! <br>
[Ernest Leung](https://www.linkedin.com/in/ernestleung52/)
