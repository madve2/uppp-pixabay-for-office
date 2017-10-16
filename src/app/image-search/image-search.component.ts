import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'uppp-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() images: any[];
  @Input() count: number;
  @Input() page: number;
  @Input() loading: boolean;
  @Input() loaded: boolean;
  @Input() currentQuery: string;
  @Input() errorMessage: string;

  private pageChanged(page: number) {
    console.log("cq: " + this.currentQuery);
    this.onQueryChanged.emit({query: this.currentQuery, page: page});
  }

  private retryQuery() {
    this.onQueryChanged.emit({query: this.currentQuery, page: this.page});    
  }
  
  @Output() onQueryChanged = new EventEmitter<{query: string, page: number}>();
}
