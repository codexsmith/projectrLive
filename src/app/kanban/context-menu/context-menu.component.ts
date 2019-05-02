import { Component, OnInit, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  show = false;
  @Output() contextAction: EventEmitter<string> = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  emitCloseEvent() {
    this.contextAction.emit('DELETE');
    this.show = false;
  }

  @HostListener('document:click', ['$event'])
  closeOutClickOutside(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.show = false;
    }
  }
}
