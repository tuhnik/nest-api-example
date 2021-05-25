import Tag from '../tag.entity';

export default class CreatePostDto {
  content: string;
  title: string;
  tags: Tag[];
}
