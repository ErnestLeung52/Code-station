export const defaultText =
	'📝 Code-Station\n-\nA lightweight, efficient, and interactive coding environment. You can write JavaScript, see it, execute it, and write comprehensive documentation using markdown.\n\n- Click any text cell (including this one) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cells\n- You can show any React components, string, number, or anything else by calling the `show` function. This is a function built into the environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\n\nAll of your changes get saved to the file you opened Code-Station with. You can run `npx code-station serve test.js`, all of the text and code you write will be saved to the `test.js` file automatically.\n\nThank you for using Code-Station! \n\n-Ernest';

export const defaultCode1 =
	"import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <h3>Counter: {count}</h3>\n    </div>\n  );\n};\n\n// Display any variable or React Component by clling 'show\nshow(<Counter />);";

export const defaultCode2 =
	'const App = () => {\n  return (\n    <div>\n      <h3>Hello World</h3>\n      <i>Counter component will be rendered below...</i>\n      <hr/>\n      <Counter />\n    </div>\n  );\n};\n\nshow(<App />);';
