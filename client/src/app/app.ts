import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Hello Friday!');
  private http=inject(HttpClient);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/food/token').subscribe((res)=>console.log(res));
  }
}
