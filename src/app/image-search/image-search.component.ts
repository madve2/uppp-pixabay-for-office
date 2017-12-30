import {Component, OnInit, Input, EventEmitter, Output, AfterViewChecked} from '@angular/core';
declare var $ : any;

@Component({
  selector: 'uppp-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit, AfterViewChecked {

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
  @Input() imageDownloading : boolean;
  @Input() imageSelected : string;

  queryInput: string;
  advancedSearch: boolean;
  options = {
    image_type: "all",
    orientation: "all",
    category: "all",
    editors_choice: false,
    safesearch: true,
    order: "popular",
    min_width: "0",
    min_height: "0"
  };

  queryChanged() {
    this.onQueryChanged.emit({query: this.queryInput, page: 1, options: this.advancedSearch ? this.options : null});
  }

  minSizeChanged(value) { //TODO we don't update this the other way around (but currently we don't need to)
    let sizes = value.split("x");
    if (sizes.length !== 2)
      return;
    this.options.min_width = sizes[0];
    this.options.min_height = sizes[1];
  }

  pageChanged(page: number) {
    this.onQueryChanged.emit({query: this.currentQuery, page: page, options: this.advancedSearch ? this.options : null});
  }

  retryQuery() {
    this.onQueryChanged.emit({query: this.currentQuery, page: this.page, options: this.advancedSearch ? this.options : null});
  }

  imageRequested(url) {
    this.onImageRequested.emit(url)
  }

  @Output() onQueryChanged = new EventEmitter<{query: string, page: number, options?: any}>();
  @Output() onImageRequested = new EventEmitter<string>();

  ngAfterViewChecked() {
    $('.flex-images').flexImages();
  }
}
