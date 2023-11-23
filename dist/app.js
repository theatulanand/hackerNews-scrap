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
const express_1 = __importDefault(require("express"));
const hackerNews_service_1 = __importDefault(require("./services/hackerNews-service"));
const db_connect_1 = __importDefault(require("./db/db-connect"));
const node_cron_1 = __importDefault(require("node-cron"));
const article_controller_1 = __importDefault(require("./controllers/article-controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.port || 4000;
// cron job which run everyday and scrap hacker news data 
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield hackerNews_service_1.default.scrapHackerNews();
    console.log("Scrapping completed");
}));
app.get('/sort-article', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortBy } = req.query;
    // Validate sortBy parameter
    const validSortByOptions = ['comments', 'points', 'postingDate'];
    if (!validSortByOptions.includes(sortBy)) {
        return res.status(400).send('Invalid sortBy parameter');
    }
    // Sort articles based on the sortBy parameter
    try {
        let sortedArticles;
        switch (sortBy) {
            case 'comments':
                sortedArticles = yield article_controller_1.default.sortByComments();
                break;
            case 'points':
                sortedArticles = yield article_controller_1.default.sortByPoints();
                break;
            case 'postingDate':
                sortedArticles = yield article_controller_1.default.sortByPostingDate();
                break;
            default:
                sortedArticles = yield article_controller_1.default.getAllArticle();
                break;
        }
        res.status(200).json(sortedArticles);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}));
(0, db_connect_1.default)();
app.listen(port, () => {
    console.log('App is running on port', port);
});
