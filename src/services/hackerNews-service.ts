import axios from 'axios';
import { JSDOM } from 'jsdom';
import articleService from './article-service';

class HackerNews{
    async scrapHackerNews() {

        let isNextPage: boolean = true
        let pageNumber: number = 1;

        while (isNextPage) {
            try {
                const response = await axios.get(`https://news.ycombinator.com/?p=${pageNumber}`);
                const dom = new JSDOM(response.data);
                const { document } = dom.window;

                const links = dom.window.document.querySelectorAll('.titleline');

                // Extract href values from the anchor tags
                const articles = Array.from(links).map((element) => {
                    const anchorTag = element.querySelector('a');
                    return {
                        title: element.textContent?.split("(")[0].trim(),
                        url: anchorTag? anchorTag.getAttribute('href') : "",
                        source: element.textContent?.split("(")[1]?.slice(0, -1)
                    };
                });

                const points = Array.from(document.querySelectorAll('.score')).map((element) => Number(element.textContent?.split(" ")[0]));

                const publishedOn = Array.from(document.querySelectorAll('.age'));

                const subline = Array.from(document.querySelectorAll('.subline'));

                const id = Array.from(document.querySelectorAll('.athing'));


                for (let i = 0; i < articles.length; i++){
                    let anchors = subline[i]?.getElementsByTagName('a');
                    let comments = anchors ? anchors[anchors?.length - 1]?.textContent : "0"
                    let data = {
                        id: id[i].getAttribute('id') || "N/A",
                        title: articles[i].title || "N/A",
                        source: articles[i].source || "N/A",
                        points: points[i] || 0,
                        url: articles[i].url || "N/A",
                        publishedOn: publishedOn[i].getAttribute('title') || "N/A",
                        comments: Number(comments?.split("c")[0] || 0) || 0
                    }

                    let createdData = await articleService.createArticle(data)
                    console.log("Article created", createdData.id)
                }
                
                pageNumber = pageNumber + 1;

                // each page contains 30 articles, 
                if (articles.length < 30) {
                    isNextPage = false;
                }

            } catch (error) {
                isNextPage = false
                console.log(error);
                throw error
            }
        }

        
    }
}

export default new HackerNews();
