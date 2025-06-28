import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../data.service';
import { HorizontalScrollerComponent } from '../components/horizontal-scroller/horizontal-scroller.component';
import { LoadingErrorComponent } from '../components/loading-error/loading-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, HorizontalScrollerComponent, LoadingErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'jupiter-frontpage';
  categories: any[] = [];
  loading = true;
  error = false;

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.dataService.fetchFrontPageData().subscribe({
      next: result => {
        const frontPage = (result as any)?.data?.category?.frontPage || [];
        this.categories = frontPage.filter((cat: any) => Array.isArray(cat.data) && cat.data.length > 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
