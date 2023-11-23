"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
const mongoose_1 = require("mongoose");
const articleSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    source: { type: String, required: true },
    points: { type: Number, required: true },
    url: { type: String, required: true },
    publishedOn: { type: String, required: true },
    comments: { type: Number, required: true },
});
const ArticleModel = (0, mongoose_1.model)('Article', articleSchema);
exports.ArticleModel = ArticleModel;
