import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../data.service';
import { HorizontalScrollerComponent } from '../components/horizontal-scroller/horizontal-scroller.component';
import { LoadingErrorComponent } from '../components/loading-error/loading-error.component';
import { Router } from '@angular/router';
import { MainBannerComponent } from '../components/main-banner/main-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NgIf, HorizontalScrollerComponent, LoadingErrorComponent, MainBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'jupiter-frontpage';
  categories: any[] = [];
  loading = true;
  error = false;
  heroItem: any = null;

  constructor(private dataService: DataService, public router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.dataService.fetchFrontPageData().subscribe({
      next: result => {
        const frontPage = (result as any)?.data?.category?.frontPage || [];
        this.heroItem = frontPage[0] && frontPage[0].data && frontPage[0].data[0] ? frontPage[0].data[0] : null;
        this.categories = frontPage
          .filter((cat: any, idx: number) => idx > 0 && Array.isArray(cat.data) && cat.data.length > 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
