import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'jupiter-frontpage';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchFrontPageData().subscribe(result => {
      console.log(result);
    });
  }
}
