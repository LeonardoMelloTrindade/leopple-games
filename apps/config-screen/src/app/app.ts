import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import '@leopple-games/styles/normalize';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbAlertModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly title = signal('configurations');
}
