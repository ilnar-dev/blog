import "reflect-metadata";
import User from "./../models/user.js";
import Article from "./../models/article.js";
import dataSource from "./../config/datasourse.js";
await dataSource.initialize();

// const user = new User({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     password: "password",
//     salt: "salt"
// });

// await dataSource.manager.save(user);
const articleRepository = dataSource.getRepository(Article);

const articles = await articleRepository.find({ where: { published: true } });


console.log(articles);