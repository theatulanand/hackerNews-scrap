"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function DbConnect() {
    const DB_URL = process.env.DB_URL || 'mongodb://0.0.0.0:27017/hackerNews';
    mongoose_1.default.connect(DB_URL);
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('DB connected...');
    });
}
exports.default = DbConnect;
