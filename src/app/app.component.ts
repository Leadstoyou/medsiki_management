import { Component } from '@angular/core';
import { SVGService } from '#services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public iconService: SVGService) {}
}
