import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DatePicker } from './components/date-picker/date-picker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Auth } from './components/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers : [HttpClient , HttpClientModule]
})
export class App {
  protected readonly title = signal('parking-frontend');
}
