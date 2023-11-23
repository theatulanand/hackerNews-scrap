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
const article_service_1 = __importDefault(require("../services/article-service"));
class ArticleController {
    sortByComments() {
        return __awaiter(this, void 0, void 0, function* () {
            let articles = yield article_service_1.default.getArticle();
            return articles.sort((a, b) => a.comments - b.comments);
        });
    }
    sortByPoints() {
        return __awaiter(this, void 0, void 0, function* () {
            let articles = yield article_service_1.default.getArticle();
            return articles.sort((a, b) => a.points - b.points);
        });
    }
    sortByPostingDate() {
        return __awaiter(this, void 0, void 0, function* () {
            let articles = yield article_service_1.default.getArticle();
            return articles.sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime());
        });
    }
    getAllArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            let article = yield article_service_1.default.getArticle();
            return article;
        });
    }
}
exports.default = new ArticleController();
