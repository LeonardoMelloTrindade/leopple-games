import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@leopple-games/styles/normalize';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  protected readonly title = signal('configurations');
}
