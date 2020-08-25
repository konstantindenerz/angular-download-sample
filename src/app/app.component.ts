import {Component, OnInit} from '@angular/core';
import {DocumentService} from './document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-download-sample';
  blob: Blob;

  constructor(private documentService: DocumentService) {
    window.URL = window.URL || window.webkitURL;
  }

  async ngOnInit(): Promise<void> {
    const result = await this.documentService.get();
    this.blob = await result.blob();
  }

  download(): void {
    const url = URL.createObjectURL(this.blob);
    alert(navigator.userAgent)
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      const window = open(url, '_blank'); // Brave mobile requires _self
      window.onload = () => {
        URL.revokeObjectURL(url);
      };
    } else {
      const element = document.createElement('a');
      element.href = url;
      element.download = 'bubu.pdf';
      element.click();
      element.remove();
      URL.revokeObjectURL(url);
    }
  }

}
