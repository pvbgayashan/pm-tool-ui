import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Upload } from '../dtd/upload-dtd';
import { Subscription } from 'rxjs';
import { ProjectsGridActionComponent } from './cell-renderer-frameworks/projects-grid-action/projects-grid-action.component';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  public rowData: Upload[] = [];
  public columnDefs: any[];
  public gridOptions: any;

  public inputFile: File;
  public selectedFileName: string;
  public viewerEnabled: boolean = false;
  public uploadFormGroup: FormGroup;
  public selectedUpload: Upload;

  private getAllUploadsSubscription: Subscription;
  private saveUploadSubscription: Subscription;

  constructor(private commonService: CommonService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {}

  ngOnInit() {

    // set grid options
    this.gridOptions = {
      context: {
        parent: this
      }
    };

    // set grid columns
    this.setColumns();

    // load data to grid
    this.loadUploadData();

    // init form
    this.initForm();

  }

  private setColumns() {
    this.columnDefs = [
      {headerName: 'File Name', field: 'documentName', width: 300 },
      {headerName: 'Version', field: 'version', width: 150 },
      {
        headerName: 'Uploaded',
        field: 'uploadedTime',
        width: 200,
        cellRenderer: (params) => {
          return formatDate(params.value, 'mediumDate', 'en-US');
        }
      },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 210,
        cellRendererFramework: ProjectsGridActionComponent
      }
    ];
  }

  private loadUploadData() {
    this.getAllUploadsSubscription = this.commonService.getAllUploads().subscribe(
      (response) => {
        if (response) {
          this.rowData = response;
        }
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  private initForm() {
    this.uploadFormGroup = this.formBuilder.group({
      documentName: new FormControl('', Validators.required),
      version: new FormControl('', Validators.required),
      supervisor: new FormControl('', Validators.required),
      comment: new FormControl(''),
      file: new FormControl(null)
    });
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.inputFile = event.target.files[0];
    }
  }

  public onUpload() {

    // validate
    if (!this.uploadFormGroup.valid) {
      this.toastrService.warning('Invalid input(s)', 'Warning');
      return;
    } else if (!this.inputFile) {
      this.toastrService.warning('File not selected', 'Warning');
      return;
    } else {

      let uploadFormValue: any = this.uploadFormGroup.value;
      let upload: Upload = new Upload();

      upload.documentName = uploadFormValue.documentName;
      upload.version = uploadFormValue.version;
      upload.supervisor = uploadFormValue.supervisor;
      upload.comment = uploadFormValue.comment;
      upload.uploadedTime = new Date();
      upload.fileName = this.inputFile.name;

      // append data to form data
      let uploadData: FormData = new FormData();
      uploadData.append('uploadString', JSON.stringify(upload));
      uploadData.append('inputFile', this.inputFile);

      this.saveUploadSubscription = this.commonService.saveUpload(uploadData).subscribe(
        () => {
          this.uploadFormGroup.reset();
          this.inputFile = null;
          this.loadUploadData();
          this.toastrService.success('Successfully saved', 'Success');
        },
        (error: Error) => {
          console.log(error);
          this.toastrService.error('Error while saving', 'Error');
        }
      );

    }

  }

  public onViewerEnable(enabled: boolean, fileName?: string) {
    this.selectedFileName = fileName;
    this.viewerEnabled = enabled;
    if (!enabled) {
      this.selectedUpload = null;
    }
  }

  public onViewDetails(data: Upload) {
    this.selectedUpload = data;
  }

  ngOnDestroy() {

    if (this.getAllUploadsSubscription) {
      this.getAllUploadsSubscription.unsubscribe();
    }

    if (this.saveUploadSubscription) {
      this.saveUploadSubscription.unsubscribe();
    }

  }

}
