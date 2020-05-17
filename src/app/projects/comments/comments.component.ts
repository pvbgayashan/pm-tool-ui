import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Comment } from '../../dtd/comment-dtd';
import { Subscription } from 'rxjs';
import { LoggedUser } from '../../dtd/logged-user-dtd';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy, OnChanges {

  private loggedUser: LoggedUser;

  @Input() public uploadId: number;

  public commentText: string;
  public comments: Comment[] = [];
  public today: Date;

  private saveCommentSubscription: Subscription;
  private getCommentsSubscription: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {

    // set today
    this.today = new Date();

    // set logged user
    if (localStorage.getItem('logged-user')) {
      this.loggedUser = JSON.parse(localStorage.getItem('logged-user'));
    }

  }

  ngOnChanges() {
    this.loadComments();
  }

  private loadComments() {

    if (this.uploadId) {

      this.getCommentsSubscription = this.commonService.getCommentsByUploadId(this.uploadId).subscribe(
        (response) => {
          this.comments = response;
        },
        (error: Error) => {
          console.log(error);
        }
      );

    }

  }

  public saveComment() {

    let comment: Comment = new Comment();
    comment.uploadId = this.uploadId;
    comment.addedUserId = this.loggedUser.userId;
    comment.addedUserName = this.loggedUser.userName;
    comment.addedDate = new Date();
    comment.commentText = this.commentText;

    if (this.uploadId && this.commentText && this.commentText.length > 0) {

      this.commonService.saveComment(comment).subscribe(
        () => {
          this.commentText = null;
          this.loadComments();
        },
        (error: Error) => {
          console.log(error);
        }
      );

    }

  }

  ngOnDestroy() {

    if (this.saveCommentSubscription) {
      this.saveCommentSubscription.unsubscribe();
    }

    if (this.getCommentsSubscription) {
      this.getCommentsSubscription.unsubscribe();
    }

  }

}
