import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import Post from 'src/posts/post.entity';
import PublicFile from '../files/publicFile.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];

  @Column({ nullable: true })
  @Exclude()
  public refreshToken?: string;

  @JoinColumn()
  @Transform(({ value }) => {
    if (value) return value;
  })
  @OneToOne(() => PublicFile, {
    eager: true,
  })
  public avatar?: PublicFile;
}

export default User;
