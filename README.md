## 📝 Code-Station

Brief
A lightweight, efficient, and interactive coding environment. You can write JavaScript, see it, execute it, and write comprehensive documentation using markdown.

Thank you for using Code-Station!

- Ernest Leung
  ernestleung52@gmail.com
  https://www.linkedin.com/in/ernestleung52/

Feature

- Click any text cell (including this one) to edit it
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cells
- You can show any React components, string, number, or anything else by calling the `show` function. This is a function built into the environment. Call show multiple times to show multiple values
- Re-order or delete cells using the buttons on the top right
- Add new cells by hovering on the divider between each cell

Installation
All of your changes get saved to the file you opened Code-Station with. You can run `npx code-station serve test.js`, all of the text and code you write will be saved to the `test.js` file automatically.

npx code-station serve "file name" -p "port number"

Development
lerna add "package name" --scope="directory"
Start up Proxy server

CLI:
relink: lerna bootstrap
npm run prepublishOnly
Using ESBuild to bundle entire CLI

Publishing to NPM
npm login
lerna publish --no-push

Iteration Opportunities

1. More user-friendly output
2. Frontend improvement (fixed code editor height)
3. React syntax color highlighter
