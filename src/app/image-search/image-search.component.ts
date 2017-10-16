import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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

  private queryTextChanged() {
    this.onQueryChanged.emit({query: this.queryInput, page: 1});
  }

  private pageChanged(page: number) {
    this.onQueryChanged.emit({query: this.currentQuery, page: page});
  }

  private retryQuery() {
    this.onQueryChanged.emit({query: this.currentQuery, page: this.page});    
  }
  
  @Output() onQueryChanged = new EventEmitter<{query: string, page: number}>();
}
