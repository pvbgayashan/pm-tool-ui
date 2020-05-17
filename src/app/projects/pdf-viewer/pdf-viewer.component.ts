import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit, OnDestroy {

  @Input() public fileName: string;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;

  private getFileSubscription: Subscription;

  constructor(private commonService: CommonService) {}

  ngOnInit() {

    if (this.fileName) {

      const fileName: string = this.fileName;

      this.getFileSubscription = this.commonService.getFile(fileName).subscribe(
        (response) => {
          this.pdfViewerAutoLoad.pdfSrc = response;
          this.pdfViewerAutoLoad.refresh();
        },
        (error: Error) => {
          console.log(error);
        }
      );

    }

  }

  ngOnDestroy() {

    if (this.getFileSubscription) {
      this.getFileSubscription.unsubscribe();
    }

  }

}
