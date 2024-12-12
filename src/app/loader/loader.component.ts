import { Component, Input } from '@angular/core';
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;

}
