import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { OverviewComponent } from './overview/overview.component';
import { AppRoutingModule } from './app.route';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './login/login.component';
import { CommonService } from './service/common.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsGridActionComponent } from './projects/cell-renderer-frameworks/projects-grid-action/projects-grid-action.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PdfViewerComponent } from './projects/pdf-viewer/pdf-viewer.component';
import { UserGridActionComponent } from './users/cell-renderer-frameworks/user-grid-action/user-grid-action.component';
import { CommentsComponent } from './projects/comments/comments.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    UsersComponent,
    OverviewComponent,
    LoginComponent,
    ProjectsGridActionComponent,
    PdfViewerComponent,
    UserGridActionComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    PdfJsViewerModule,
    AgGridModule.withComponents([]),
    ToastrModule.forRoot()
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
  entryComponents: [
    ProjectsGridActionComponent,
    UserGridActionComponent
  ]
})
export class AppModule {}

