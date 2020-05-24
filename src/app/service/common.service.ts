import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../dtd/user-dtd';
import { Comment } from '../dtd/comment-dtd';
import { LoginUser } from '../dtd/login-user-dtd';
import { LoggedUser } from '../dtd/logged-user-dtd';

@Injectable()
export class CommonService {

  // upload
  private getAllUploadsUrl: string = environment.API.UPLOAD.GET_ALL;
  private saveUploadUrl: string = environment.API.UPLOAD.SAVE;
  private getFileUrl: string = environment.API.UPLOAD.GET_FILE;

  // user
  private getAllUsersUrl: string = environment.API.USER.GET_ALL;
  private saveUserUrl: string = environment.API.USER.SAVE;
  private updateUserUrl: string = environment.API.USER.UPDATE;
  private deleteUserUrl: string = environment.API.USER.DELETE_BY_ID;
  private userAuthenticateUrl: string = environment.API.USER.AUTHENTICATE;

  // comment
  private getCommentsByUploadIdUrl: string = environment.API.COMMENT.GET_BY_UPLOAD_ID;
  private saveCommentUrl: string = environment.API.COMMENT.SAVE;

  // login
  private loginSubject: Subject<LoggedUser> = new Subject<LoggedUser>();

  constructor(private httpClient: HttpClient) {}

  /* upload */
  public getAllUploads(): Observable<any> {
    return this.httpClient.get(this.getAllUploadsUrl);
  }

  public saveUpload(uploadData: FormData): Observable<any> {
    return this.httpClient.post(this.saveUploadUrl, uploadData);
  }

  public getFile(fileName: string): Observable<any> {
    return this.httpClient.get(this.getFileUrl + "/" + fileName, { responseType: 'blob' });
  }

  /* user */
  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.getAllUsersUrl);
  }

  public saveUser(user: User): Observable<any> {
    return this.httpClient.post(this.saveUserUrl, user);
  }

  public updateUser(user: User): Observable<any> {
    return this.httpClient.put(this.updateUserUrl, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.deleteUserUrl + '/' + id);
  }

  public authenticateUser(loginUser: LoginUser): Observable<any> {
    return this.httpClient.post(this.userAuthenticateUrl, loginUser);
  }

  /* comment */
  public getCommentsByUploadId(id: number): Observable<any> {
    return this.httpClient.get(this.getCommentsByUploadIdUrl + '/' + id);
  }

  public saveComment(comment: Comment): Observable<any> {
    return this.httpClient.post(this.saveCommentUrl, comment);
  }

  /* login */
  public setLoggedUser(user: LoggedUser) {
    this.loginSubject.next(user);
  }

  public getLoggedUser(): Observable<LoggedUser> {
    return this.loginSubject.asObservable();
  }

}
