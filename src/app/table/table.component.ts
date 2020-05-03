import { Component, OnInit, ViewChild } from "@angular/core";
import { restaurantData } from '../model/Restaurant';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.Cuisines.toLowerCase().includes(filter);
    }
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['Restaurant_ID', 'Restaurant_Name', 'Cuisines', 'Average_Cost_for_two',
    'Currency', 'Has_Table_booking', 'Has_Online_delivery', 'Aggregate_rating', 'Rating_color',
    'Rating_text', 'Votes'];
  dataSource = new MatTableDataSource(RESTAURANT_DATA);

  applyFilterCuisine(event: Event) {
    console.log('hello');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

const RESTAURANT_DATA = restaurantData
