import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    // const post: Post = {
    //   title: postForm.value.title,
    //   content: postForm.value.content
    // };
    // this.postCreated.emit(post);
    this.postsService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
}
