import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Image from './image.js';

@Entity()
class Article {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    intro!: string;

    @Column()
    text!: string;

    @Column()
    published!: boolean;

    @Column({ name: 'publishedOn' })
    publishedOn?: Date;

    @ManyToOne(() => Image, { eager: true })
    @JoinColumn({ name: 'mainImageId' })
    mainImage?: Image;
}

export default Article
