"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    .action((filename = 'notebook.js', options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // cwd return where the user is typing the command from, dirname return the folder it in
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        // basename gives the file name
        const fileName = path_1.default.basename(filename);
        // Sending options info from CLI to local-api
        yield (0, local_api_1.serve)(parseInt(options.port), fileName, dir);
        console.log(`Opened ${fileName}. Navigate to http://localhost:${options.port} to edit the file.`);
    }
    catch (error) {
        if (error.code === 'EADDRINUSE') {
            console.error('PORT is in use. Trying running on a different port.');
        }
        else {
            console.log('Here is the problem', error.message);
        }
        process.exit(1);
    }
}));
