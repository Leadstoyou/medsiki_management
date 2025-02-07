import { BaseComponent } from '#components/core/base/base.component';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
