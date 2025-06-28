import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElementDialogData } from './periodic-element-dialog-data.model';
import { PeriodicElement } from '../../core/models/periodic-element.model';

@Component({
  selector: 'app-periodic-element-dialog',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatDialogModule,FormsModule],
  templateUrl: './periodic-element-dialog.html',
  styleUrl: './periodic-element-dialog.css'
})
export class PeriodicElementDialog {

  private readonly dialogRef=inject(MatDialogRef<PeriodicElementDialog>)
  readonly data=inject<PeriodicElementDialogData>(MAT_DIALOG_DATA);
  readonly element=model<PeriodicElement>(this.data.element);

  constructor(){}

  onClickClose(){
    this.dialogRef.close();
  }
}
