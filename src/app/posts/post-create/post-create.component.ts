import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import {
  ActivatedRoute,
  ParamMap
} from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() postCreated = new EventEmitter<Post>();

  post: Post;
  private mode = 'create';
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(postForm.value.title, postForm.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        postForm.value.title,
        postForm.value.content
      );
    }

    postForm.resetForm();
  }
}
