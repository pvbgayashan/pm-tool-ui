import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { CommonService } from '../../../service/common.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-grid-action',
  templateUrl: './user-grid-action.component.html',
  styleUrls: ['./user-grid-action.component.css']
})
export class UserGridActionComponent implements OnInit, OnDestroy {

  private params: ICellRendererParams;

  private deleteUserSubscription: Subscription;

  constructor(private commonService: CommonService,
              private toastrService: ToastrService) {}

  ngOnInit() {}

  agInit(params: ICellRendererParams) {
    this.params = params;
  }

  public onEdit() {
    if (this.params.data) {
      this.params.context.parent.onEdit(this.params.data);
    }
  }

  public onDelete() {

    if (confirm("Are you sure to delete?")) {

      if (this.params.data) {

        let userId: number = this.params.data.id;

        this.deleteUserSubscription = this.commonService.deleteUser(userId).subscribe(
          () => {
            this.params.context.parent.loadUserData();
            this.toastrService.success('Successfully deleted', 'Success');
          },
          (error: Error) => {
            console.log(error);
            this.toastrService.error('Error while deleting', 'Error');
          }
        );

      }

    }

  }

  ngOnDestroy() {

    if (this.deleteUserSubscription) {
      this.deleteUserSubscription.unsubscribe();
    }

  }

}
