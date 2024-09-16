import Abstract from './abstract.js'

class Article extends Abstract {
    id: number;
    title: string;
    text: string;
    main_image_id: number | null;
    mainImage: { filename: string };
    intro: string;
    published: boolean;
    publishedOn: Date | null;

    constructor(data: Partial<Article> = {}) {
        super();
        this.id = data.id ?? 0;
        this.title = data.title ?? '';
        this.text = data.text ?? '';
        this.main_image_id = data.main_image_id ?? null;
        this.mainImage = data.mainImage ?? { filename: '' };
        this.intro = data.intro ?? '';
        this.published = data.published ?? false;
        this.publishedOn = data.publishedOn ?? new Date();
        Object.assign(this, data);
    }
}

export default Article
