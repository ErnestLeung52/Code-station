"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    // [] not require by command
    .command('serve [filename]')
    .description('Open a file for editing')
    // <> required by commander
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'notebook.js', options) => {
    // cwd return where the user is typing the command from, dirname return the folder it in
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    // basename gives the file name
    const fileName = path_1.default.basename(filename);
    // Sending options info from CLI to local-api
    (0, local_api_1.serve)(parseInt(options.port), fileName, dir);
});
