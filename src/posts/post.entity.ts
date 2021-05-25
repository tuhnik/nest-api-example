import { Exclude, Transform } from 'class-transformer';
import User from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Tag from './tag.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Transform(({ value }) => value.map((tag) => tag.name))
  @ManyToMany(() => Tag, (tag) => tag.name, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public tags: Tag[];

  @Transform(({ value }) => {
    if (value) return value;
  })
  @ManyToOne(() => User, (author) => author.posts, {
    eager: true,
  })
  public author: User;
}

export default Post;
