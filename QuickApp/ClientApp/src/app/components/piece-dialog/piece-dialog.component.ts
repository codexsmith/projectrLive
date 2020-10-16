import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { DynamicCrudService } from '../../services/dynamic-crud/dynamic-crud.service';
import { Piece } from '../../models/projectr/piece.model';
import { forkJoin, Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { PieceContentTag } from '../../models/projectr/pieceContentTag.model';


@Component({
  selector: 'app-piece-dialog',
  templateUrl: './piece-dialog.component.html',
  styleUrls: ['./piece-dialog.component.scss']
})
export class PieceDialogComponent implements OnInit, OnDestroy {

  private unsub: Subject<void> = new Subject<any>();
  public response: { dbPath: '' };

  pcId: string;
  piece: Piece;

  DataForm: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) data, private service: DynamicCrudService) {
    this.pcId = data.pcId;
  }

  ngOnInit() {
    const getViewData = this.service.readObs<Piece>(Piece.prototype, "pieceId=" + this.pcId).subscribe(
      res => {
        this.piece = res[0] as Piece;

        if (this.piece.imageJson != null && this.piece.imageJson != "") {
          this.piece.images = JSON.parse(this.piece.imageJson);
        }
        else {
          this.piece.images = [];
        }

        Object.keys(this.piece).forEach(key => {
          this.DataForm.addControl(key, new FormControl(this.piece[key]));
        });
        },
        err => console.error(err)
      );
  }

  ngOnDestroy(): void {
    this.service.updateObs<Piece>(Piece.prototype, this.piece).subscribe(
      res => {
      }
    );
  }

  onClickContentTagToggleEdit(event) {
    //let tagId = event.currentTarget.dataset["tagId"];
    //let tag = this.piece.contentTags.filter(t => t.Id = tagId);
    if (event.currentTarget.dataset["EditFl"] == "0") {
      event.currentTarget.dataset["EditFl"] = "1";

    }
  }

  addImage(event) {

    if (this.piece.images === undefined || this.piece.images === null) {
      this.piece.images = [];
    }
    this.piece.images.push(event);

  }

  addFile(event) {
    if (this.piece.files === undefined || this.piece.files === null) {
      this.piece.files = [];
    }
    this.piece.files.push(event);
  }

  saveContentTag(tag) {
    const index = this.piece.contentTags.findIndex(t => t.id == tag.id);
    this.piece.contentTags.splice(index, 1, tag);
  }

}
