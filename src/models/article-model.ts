import { Schema, Document, model } from 'mongoose';

interface Article extends Document {
    id: string;
    title: string;
    source: string;
    points: number;
    url: string;
    publishedOn: string;
    comments: number;
}

const articleSchema = new Schema<Article>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    source: { type: String, required: true },
    points: { type: Number, required: true },
    url: { type: String, required: true },
    publishedOn: { type: String, required: true },
    comments: { type: Number, required: true },
});

const ArticleModel = model<Article>('Article', articleSchema);

export { ArticleModel, Article };
