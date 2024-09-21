import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Article from './article.js';

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fileName!: string;

    @Column()
    path!: string;

    @OneToMany(() => Article, article => article.mainImage)
    articles?: Article[];
}
