import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <main style="max-width:900px;margin:2rem auto;padding:0 1rem;text-align:center;
                 font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
      <h1>{{ title() }}</h1>
    </main>
  `,
  styles: [],
})
export class App {
  title = signal('Portland or Mad Max?');
}