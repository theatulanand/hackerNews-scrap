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
Object.defineProperty(exports, "__esModule", { value: true });
const article_model_1 = require("../models/article-model");
class ArticleService {
    createArticle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let createdData = article_model_1.ArticleModel.create(data);
                return createdData;
            }
            catch (error) {
                console.error("An error occurred:", error);
                throw error;
            }
        });
    }
    getArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ArticleData = yield article_model_1.ArticleModel.find({});
                return ArticleData;
            }
            catch (error) {
                console.log("Error while getting Article");
                throw error;
            }
        });
    }
    getArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ArticleData = yield article_model_1.ArticleModel.findOne({ id: id });
                return ArticleData;
            }
            catch (error) {
                console.log("Error while getting Article");
                throw error;
            }
        });
    }
}
exports.default = new ArticleService();
