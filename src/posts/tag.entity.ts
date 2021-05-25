import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
class Tag {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;
}

export default Tag;
