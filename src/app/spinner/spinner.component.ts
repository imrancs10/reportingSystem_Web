import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../loader.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent implements OnInit {
  constructor(public loader: LoaderService) {

  }
  ngOnInit(): void {
    // console.log('loader')
    console.log(this.loader.isLoading$);
  }
}