import Abstract from "./abstract.js"

class Image extends Abstract {
    id: number;
    filename: string;
    path: string;

    constructor(data: Partial<Image> = {}) {
        super();
        this.id = data.id ?? 0;
        this.filename = data.filename ?? '';
        this.path = data.path ?? '';
        Object.assign(this, data);
    }
}

export default Image
