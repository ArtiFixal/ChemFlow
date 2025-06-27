import { Component, effect, inject } from '@angular/core';
import { PeriodicElement } from '../../core/models/periodic-element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PeriodicElementsStore } from './periodic-elements.store';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-periodic-table',
  providers: [PeriodicElementsStore],
  imports: [CommonModule,MatTableModule,MatInputModule],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.css'
})
export class PeriodicTable {

  readonly periodicStore=inject(PeriodicElementsStore);

  displayedColumns: string[]=["position","name","weight","symbol"];
  elementSource = new MatTableDataSource<PeriodicElement>([]);

  constructor(){
    effect(()=>this.elementSource.data=this.periodicStore.periodicElements())
    this.periodicStore.search();
  }

  onQueryChange(event:Event){
    const query=(event.target as HTMLInputElement).value
    this.periodicStore.search(query);
  }
}
