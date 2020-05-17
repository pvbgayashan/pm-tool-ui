import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../dtd/user-dtd';
import { CommonService } from '../service/common.service';
import { Subscription } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { UserGridActionComponent } from './cell-renderer-frameworks/user-grid-action/user-grid-action.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public gridOptions: GridOptions;
  public rowData: User[] = [];
  public columnDefs: any[] = [];

  public userFormGroup: FormGroup;
  public selectedUserType: string;

  private editUserId: number;
  public isOnEdit: boolean = false;

  private getUsersSubscription: Subscription;
  private saveUserSubscription: Subscription;
  private updateUserSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonService,
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
    this.loadUserData();

    // init form
    this.initForm();

  }

  private setColumns() {
    this.columnDefs = [
      { headerName: 'User Type', field: 'userType', width: 150 },
      { headerName: 'Employee / Student ID', field: 'userId', width: 200 },
      { headerName: 'User Name', field: 'userName', width: 300 },
      { headerName: 'Contact Number', field: 'contactNumber', width: 200 },
      { headerName: 'Email', field: 'email', width: 200 },
      { headerName: 'Status', field: 'status', width: 100 },
      {
        headerName: 'Actions',
        field: 'actions',
        width: 150,
        cellRendererFramework: UserGridActionComponent
      }
    ];
  }

  public loadUserData() {

    this.getUsersSubscription = this.commonService.getAllUsers().subscribe(
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
    this.userFormGroup = this.formBuilder.group({
      userType: new FormControl(null, Validators.required),
      userId: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      designation: new FormControl(),
      degreeProgramme: new FormControl({value: null, disabled: true}),
      year: new FormControl({value: null, disabled: true}),
      semester: new FormControl({value: null, disabled: true}),
      subjectName: new FormControl({value: '', disabled: true}),
      subjectCode: new FormControl({value: '', disabled: true}),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      status: new FormControl(null, Validators.required)
    });
  }

  public save() {

    if (!this.userFormGroup.valid) {
      this.toastrService.warning('Invalid input(s)', 'Warning');
    } else if (this.userFormGroup.value.password !== this.userFormGroup.value.confirmPassword) {
      this.toastrService.warning('Invalid password confirmation', 'Warning');
    } else {

      let userFormValue: any = this.userFormGroup.value;
      let user: User = new User();

      user.userType = userFormValue.userType;
      user.userId = userFormValue.userId;
      user.userName = userFormValue.userName;
      user.contactNumber = userFormValue.contactNumber;
      user.designation = userFormValue.designation;
      user.degreeProgramme = userFormValue.degreeProgramme;
      user.year = userFormValue.year;
      user.semester = userFormValue.semester;
      user.subjectName = userFormValue.subjectName;
      user.subjectCode = userFormValue.subjectCode;
      user.email = userFormValue.email;
      user.password = userFormValue.password;
      user.status = userFormValue.status;

      if (this.isOnEdit && this.editUserId !== null) { // update user

        // set id
        user.id = this.editUserId;

        this.updateUserSubscription = this.commonService.updateUser(user).subscribe(
          () => {
            this.clear();
            this.loadUserData();
            this.toastrService.success('Successfully updated', 'Success');
          },
          (error: Error) => {
            console.log(error);
            this.toastrService.error('Error while updating', 'Error');
          }
        );

      } else { // save user

        this.saveUserSubscription = this.commonService.saveUser(user).subscribe(
          () => {
            this.clear();
            this.loadUserData();
            this.toastrService.success('Successfully saved', 'Success');
          },
          (error: Error) => {
            console.log(error);
            this.toastrService.error('Error while saving', 'Error');
          }
        );

      }

    }

  }

  public onEdit(user: User) {

    // set edit status
    this.isOnEdit = true;

    if (user) {
      this.editUserId = user.id;
      this.userFormGroup.patchValue(user);
      this.onChangeUserType(user.userType);
    }

  }

  public clear() {
    this.editUserId = null;
    this.isOnEdit = false;
    this.userFormGroup.reset();
  }

  public onChangeUserType(type: string) {
    this.selectedUserType = type;
    if (this.selectedUserType !== 'Student') {
      this.userFormGroup.controls['designation'].enable();
      this.userFormGroup.controls['degreeProgramme'].disable();
      this.userFormGroup.controls['year'].disable();
      this.userFormGroup.controls['semester'].disable();
      this.userFormGroup.controls['subjectName'].disable();
      this.userFormGroup.controls['subjectCode'].disable();
    } else {
      this.userFormGroup.controls['designation'].disable();
      this.userFormGroup.controls['degreeProgramme'].enable();
      this.userFormGroup.controls['year'].enable();
      this.userFormGroup.controls['semester'].enable();
      this.userFormGroup.controls['subjectName'].enable();
      this.userFormGroup.controls['subjectCode'].enable();
    }
  }

  ngOnDestroy() {

    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }

    if (this.saveUserSubscription) {
      this.saveUserSubscription.unsubscribe();
    }

    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe();
    }

  }

}
