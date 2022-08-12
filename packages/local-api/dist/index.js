"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    // Solve the problem with try/catch in serve.ts by creating a new promise
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
