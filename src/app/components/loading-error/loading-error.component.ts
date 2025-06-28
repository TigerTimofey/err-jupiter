import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-error',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-error.component.html',
  styleUrls: ['./loading-error.component.css']
})
export class LoadingErrorComponent {
  @Input() loading = false;
  @Input() error = false;
}
