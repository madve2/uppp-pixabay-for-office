import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var $ : any

@Component({
  selector: 'uppp-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.queryInput = this.currentQuery;
  }

  @Input() images: any[];
  @Input() count: number;
  @Input() page: number;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() currentQuery: string;
  @Input() errorMessage: string;

  queryInput: string;

  queryTextChanged() {
    this.onQueryChanged.emit({query: this.queryInput, page: 1});
  }

  pageChanged(page: number) {
    this.onQueryChanged.emit({query: this.currentQuery, page: page});
  }

  retryQuery() {
    this.onQueryChanged.emit({query: this.currentQuery, page: this.page});    
  }

  imageRequested(url) {
    this.onImageRequested.emit(url)
  }
  
  @Output() onQueryChanged = new EventEmitter<{query: string, page: number}>();
  @Output() onImageRequested = new EventEmitter<string>();

  ngAfterViewChecked() {
    $('.flex-images').flexImages();
  }
}
