import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-horizontal-scroller',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './horizontal-scroller.component.html',
  styleUrls: ['./horizontal-scroller.component.css']
})
export class HorizontalScrollerComponent {
  @Input() category: any;
}
