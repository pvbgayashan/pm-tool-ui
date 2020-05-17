import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { saveAs } from 'file-saver';
import { ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-grid-action',
  templateUrl: './projects-grid-action.component.html',
  styleUrls: ['./projects-grid-action.component.css']
})
export class ProjectsGridActionComponent implements OnInit, OnDestroy {

  private params: ICellRendererParams;

  private getFileSubscription: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  agInit(params: ICellRendererParams) {
    this.params = params;
  }

  public downloadFile() {

    if (this.params.data.fileName) {

      const fileName: string = this.params.data.fileName;
      const mediaType = 'application/pdf';

      this.getFileSubscription = this.commonService.getFile(fileName).subscribe(
        (response) => {
          const blob = new Blob([response], { type: mediaType });
          saveAs(blob, fileName);
        },
        (error: Error) => {
          console.log(error);
        }
      );

    }

  }

  public viewFile() {
    if (this.params.data.fileName) {
      this.params.context.parent.onViewerEnable(true, this.params.data.fileName);
      this.viewDetails();
    }
  }

  public viewDetails() {
    this.params.context.parent.onViewDetails(this.params.data);
  }

  ngOnDestroy() {

    if (this.getFileSubscription) {
      this.getFileSubscription.unsubscribe();
    }

  }

}
