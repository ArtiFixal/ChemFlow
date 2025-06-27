import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PeriodicTable } from "./features/periodic-table/periodic-table";

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, RouterOutlet, PeriodicTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ChemFlow';
}
