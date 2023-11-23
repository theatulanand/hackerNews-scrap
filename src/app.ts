import express, { Request, Response } from 'express';
import HackerNews from './services/hackerNews-service';
import DbConnect from './db/db-connect';
import cron from 'node-cron';
import ArticleData from './interfaces/article-interface';
import articleController from './controllers/article-controller';

const app = express();
app.use(express.json());
const port = process.env.port || 4000;

// cron job which run everyday and scrap hacker news data 
cron.schedule('0 0 * * *', async () => {
    await HackerNews.scrapHackerNews();
    console.log("Scrapping completed")
});


app.get('/sort-article', async (req: Request, res: Response) => {

    const { sortBy } = req.query;

    // Validate sortBy parameter
    const validSortByOptions = ['comments', 'points', 'postingDate'];
    if (!validSortByOptions.includes(sortBy as string)) {
        return res.status(400).send('Invalid sortBy parameter');
    }

    // Sort articles based on the sortBy parameter
    try {
        let sortedArticles: ArticleData[];
        switch (sortBy) {
            case 'comments':
                sortedArticles = await articleController.sortByComments()
                break;
            case 'points':
                sortedArticles = await articleController.sortByPoints()
                break;
            case 'postingDate':
                sortedArticles = await articleController.sortByPostingDate()
                break;
            default:
                sortedArticles = await articleController.getAllArticle()
                break;
        }
        res.status(200).json(sortedArticles);
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
    
});


DbConnect();

app.listen(port, () => {
    console.log('App is running on port', port);
});