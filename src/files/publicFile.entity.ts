import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PublicFile {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Column()
  public url: string;

  @Exclude()
  @Column()
  public key: string;
}

export default PublicFile;
