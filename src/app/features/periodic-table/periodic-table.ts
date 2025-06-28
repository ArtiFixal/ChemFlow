import { Component, effect, inject } from '@angular/core';
import { PeriodicElement } from '../../core/models/periodic-element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PeriodicElementsStore } from './periodic-elements.store';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PeriodicElementDialog } from "../../shared/periodic-element-dialog/periodic-element-dialog";
import { PeriodicElementDialogData } from '../../shared/periodic-element-dialog/periodic-element-dialog-data.model';

@Component({
  selector: 'app-periodic-table',
  providers: [PeriodicElementsStore],
  imports: [CommonModule, MatTableModule, MatInputModule, MatDialogModule],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.css'
})
export class PeriodicTable {

  readonly periodicStore=inject(PeriodicElementsStore);
  readonly updateDialog=inject(MatDialog);

  displayedColumns: string[]=["position","symbol","name","weight"];
  elementSource = new MatTableDataSource<PeriodicElement>([]);

  constructor(){
    effect(()=>this.elementSource.data=this.periodicStore.periodicElements())
    this.periodicStore.search();
  }

  onQueryChange(event:Event){
    const query=(event.target as HTMLInputElement).value
    this.periodicStore.search(query);
  }

  onRowClick(row:PeriodicElement){
    const dialogData:PeriodicElementDialogData={
      element:{ name:row.name, position:row.position, symbol:row.symbol, weight:row.weight },
      dialogTitle:'Update Periodic Element',
      actionText:'Update'
    };
    const dialogRef=this.updateDialog.open(PeriodicElementDialog,{data: dialogData});

    dialogRef.afterClosed().subscribe(result=>{
      if(result!==undefined)
        this.periodicStore.updatePeriodicElement(result);
    });
  }
}
