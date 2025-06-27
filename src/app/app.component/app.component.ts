import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../data.service';
import { HorizontalScrollerComponent } from '../components/horizontal-scroller/horizontal-scroller.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, HorizontalScrollerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'jupiter-frontpage';
  categories: any[] = [];

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.dataService.fetchFrontPageData().subscribe(result => {
      const frontPage = (result as any)?.data?.category?.frontPage || [];
      this.categories = frontPage.filter((cat: any) => Array.isArray(cat.data) && cat.data.length > 0);
      console.log(result);
    });
  }
}
