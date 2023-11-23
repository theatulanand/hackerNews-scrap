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
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const article_service_1 = __importDefault(require("./article-service"));
class HackerNews {
    scrapHackerNews() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let isNextPage = true;
            let pageNumber = 1;
            while (isNextPage) {
                try {
                    const response = yield axios_1.default.get(`https://news.ycombinator.com/?p=${pageNumber}`);
                    const dom = new jsdom_1.JSDOM(response.data);
                    const { document } = dom.window;
                    const links = dom.window.document.querySelectorAll('.titleline');
                    // Extract href values from the anchor tags
                    const articles = Array.from(links).map((element) => {
                        var _a, _b, _c;
                        const anchorTag = element.querySelector('a');
                        return {
                            title: (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.split("(")[0].trim(),
                            url: anchorTag ? anchorTag.getAttribute('href') : "",
                            source: (_c = (_b = element.textContent) === null || _b === void 0 ? void 0 : _b.split("(")[1]) === null || _c === void 0 ? void 0 : _c.slice(0, -1)
                        };
                    });
                    const points = Array.from(document.querySelectorAll('.score')).map((element) => { var _a; return Number((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.split(" ")[0]); });
                    const publishedOn = Array.from(document.querySelectorAll('.age'));
                    const subline = Array.from(document.querySelectorAll('.subline'));
                    const id = Array.from(document.querySelectorAll('.athing'));
                    for (let i = 0; i < articles.length; i++) {
                        let anchors = (_a = subline[i]) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('a');
                        let comments = anchors ? (_b = anchors[(anchors === null || anchors === void 0 ? void 0 : anchors.length) - 1]) === null || _b === void 0 ? void 0 : _b.textContent : "0";
                        let data = {
                            id: id[i].getAttribute('id') || "N/A",
                            title: articles[i].title || "N/A",
                            source: articles[i].source || "N/A",
                            points: points[i] || 0,
                            url: articles[i].url || "N/A",
                            publishedOn: publishedOn[i].getAttribute('title') || "N/A",
                            comments: Number((comments === null || comments === void 0 ? void 0 : comments.split("c")[0]) || 0) || 0
                        };
                        let createdData = yield article_service_1.default.createArticle(data);
                        console.log("Article created", createdData.id);
                    }
                    pageNumber = pageNumber + 1;
                    // each page contains 30 articles, 
                    if (articles.length < 30) {
                        isNextPage = false;
                    }
                }
                catch (error) {
                    isNextPage = false;
                    console.log(error);
                    throw error;
                }
            }
        });
    }
}
exports.default = new HackerNews();
