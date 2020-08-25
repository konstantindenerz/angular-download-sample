import {Component, OnInit} from '@angular/core';
import {DocumentService} from './document.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-download-sample';
  document: ArrayBuffer;

  constructor(private documentService: DocumentService) {


  }


  async ngOnInit(): Promise<void> {
    const result = await this.documentService.get();
    this.document = await result.arrayBuffer();
  }

  async download(): Promise<void> {
    const blob = await new Blob([this.document], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    const window = open(url, '_blank');
    if (window) {
      console.log('open');
    } else {
      console.log('wtf');
    }
  }
}
