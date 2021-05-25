import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import Post from './post.entity';
import UpdatePostDto from './dto/updatePost.dto';
import { PostNotFoundException } from './exception/postNotFound.exception';
import Tag from './tag.entity';
import User from 'src/users/user.entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async getAllPosts() {
    // const tag = await this.tagsRepository.create({ name: 'Java' });
    // await this.tagsRepository.save(tag);
    // return tag;

    // const newPost = {
    //   title: 'See on uus post',
    //   content: 'Hai!!',
    //   tags: [{ id: 2 }],
    // };

    // const post = await this.postsRepository.create(newPost);
    // return await this.postsRepository.save(post);

    return await this.postsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
