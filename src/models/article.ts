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

    @Column({ type: 'datetime', name: 'publishedOn' })
    publishedOn?: Date | null;

    @ManyToOne(() => Image, { eager: true })
    @JoinColumn({ name: 'mainImageId' })
    mainImage?: Image | null;
}

export default Article
