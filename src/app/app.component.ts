import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoComponent } from "./to-do/to-do.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToDoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'To_Do';
}
