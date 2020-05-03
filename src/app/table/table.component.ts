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
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['Restaurant_ID', 'Restaurant_Name', 'Cuisines', 'Average_Cost_for_two',
    'Currency', 'Has_Table_booking', 'Has_Online_delivery', 'Aggregate_rating', 'Rating_color',
    'Rating_text', 'Votes'];
  dataSource = new MatTableDataSource(RESTAURANT_DATA);

  applyFilterCuisine(event: Event) {
    const filterValueString = (event.target as HTMLInputElement).value;
    // var array = filterValue.split(',');
    // console.log(array);
    // array.forEach(filterValue => {
    //   this.dataSource.filter = filterValue.trim().toLowerCase()
    // })
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      const matchFilter = [];
      console.log('data', data)
      var filterArray = filter.split(',');
      console.log('FlterArray');
      console.log(filterArray)
      filterArray.forEach(filtervalue => {
        console.log('filter value ' + filtervalue);
        if (data.Cuisines.toLowerCase().includes(filtervalue)) {
          matchFilter.push(true);
        }
        if (!data.Cuisines.toLowerCase().includes(filtervalue)) {
          matchFilter.push(false);
        }
      })
      console.log(matchFilter)
      return matchFilter.some(Boolean)
    }
    this.dataSource.filter = filterValueString.trim().toLowerCase();
  }
  applyFilterName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.Restaurant_Name.toLowerCase().includes(filter);
    }
  }
}

const RESTAURANT_DATA = restaurantData
