import { Injectable } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.model';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PeriodicElementService {
  
  constructor() { }

  private simulateDelay(rangeFrom:number,rangeTo:number)
  {
    return Math.floor(Math.random()*(rangeTo-rangeFrom+1))+rangeFrom;
  }

  public getPeriodicElements(query?:string): Observable<PeriodicElement[]>
  {
    let elements:PeriodicElement[];
    if(!query)
      elements=ELEMENT_DATA;
    else
    {
      const queryLowerCase=query.toLocaleLowerCase();
      elements=ELEMENT_DATA.filter(element=>
        element.position.toString().includes(queryLowerCase) ||
        element.name.toLocaleLowerCase().includes(queryLowerCase) ||
        element.symbol.toLocaleLowerCase().includes(queryLowerCase) ||
        element.weight.toString().includes(queryLowerCase)
      );
    }
    return of(elements)
      .pipe(delay(this.simulateDelay(50,250)));
  }

  public updatePeriodicElement(updatedData:PeriodicElement):Observable<PeriodicElement>
  {
    return of(ELEMENT_DATA).pipe(
      map(()=>{
         let toUpdate=ELEMENT_DATA.find(element=>element.position===updatedData.position);
         if(toUpdate)
         {
          toUpdate.name=updatedData.name;
          toUpdate.position=updatedData.position;
          toUpdate.symbol=updatedData.symbol;
          toUpdate.weight=updatedData.weight;
         }
         return updatedData;
      })
    );
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];