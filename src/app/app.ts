import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type PhotoType = 'madmax' | 'portland';

interface Photo {
  src: string;
  alt: string;
  type: PhotoType;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="container">
      <h1>{{ title() }}</h1>
      <ul>
        <li *ngFor="let p of allPhotos()">
          <strong>{{ p.type }}</strong> — {{ p.alt }} <code>{{ p.src }}</code>
        </li>
      </ul>
    </main>
  `,
  styles: [`
    .container { max-width:900px;margin:2rem auto;padding:0 1rem;text-align:center;
      font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif }
    .tagline { color:#6b7280;margin-top:0 }
    ul { text-align:left; display:inline-block }
  `],
})

export class App {
  title = signal('Portland or Mad Max?');

  allPhotos = signal<Photo[]>([
    { src: 'assets/madmax/fury-road-1.jpg', alt: 'Mad Max Fury Road convoy driving still',   type: 'madmax' },
    { src: 'assets/madmax/fury-road-2.jpg', alt: 'Mad Max Fury Road convoy attack still',  type: 'madmax' },
    { src: 'assets/madmax/road-warrior-1.jpg', alt: 'Mad Max Road Warrior still',  type: 'madmax' },
    { src: 'assets/portland/max-to-hillsboro.jpg', alt: 'MAX to Hillsboro in downtown Portland', type: 'portland' },
    { src: 'assets/portland/old-town-stag-sunset.jpg', alt: 'Old Town White Stag sign at sunset', type: 'portland' },
    { src: 'assets/portland/old-town-stag.jpg', alt: 'Old Town White Stag sign at twilight', type: 'portland' },
  ]);
}