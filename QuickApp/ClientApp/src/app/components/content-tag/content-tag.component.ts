import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { PieceContentTag } from '../../models/projectr/pieceContentTag.model';

@Component({
  selector: 'app-content-tag',
  templateUrl: './content-tag.component.html',
  styleUrls: ['./content-tag.component.scss']
})
export class ContentTagComponent implements OnInit, OnDestroy {

  @Input() contentTag: PieceContentTag;
  @Output() valueChange = new EventEmitter<PieceContentTag>();
  @Output() onRemove = new EventEmitter<PieceContentTag>();

  edit: boolean = false;
  dirty: boolean = false;

  constructor() { }
    
  ngOnInit() {
  }

  onClickContentTagToggleEdit(event) {
    this.edit = !this.edit;
  }

  onClickName(event) {
    event.stopPropagation();
  }

  save() {
    this.dirty = true;
    this.edit = false;
  }

  ngOnDestroy(): void {
    debugger;
    //this.contentTag.name
    if (this.dirty || this.contentTag.dirty) {
      this.valueChange.emit(this.contentTag);
    }

  }

  onClickRemoveContentTag(event): void {
    this.onRemove.emit(this.contentTag);
  }


}
