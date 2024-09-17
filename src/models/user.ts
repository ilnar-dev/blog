import Abstract from "./abstract.js"

class User extends Abstract {
    id: number;
    name: string;
    email: string;
    password: string;
    salt: string;

    constructor(data: Partial<User> = {}) {
        super();
        this.id = data.id ?? 0;
        this.name = data.name ?? '';
        this.email = data.email ?? '';
        this.password = data.password ?? '';
        this.salt = data.salt ?? '';
        Object.assign(this, data);
    }
}

export default User