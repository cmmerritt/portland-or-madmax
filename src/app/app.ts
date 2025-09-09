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
      <div class="grid">
        <div class="card" *ngFor="let p of firstTwo(); let i = index">
          <img [src]="p.src" [alt]="p.alt" />
          <div class="label">{{ p.type }}</div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .container { max-width:900px;margin:2rem auto;padding:0 1rem;text-align:center;
      font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif }
    .tagline { color:#6b7280;margin-top:0 }
    .grid { display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1rem 0 1.5rem }
    .card { position:relative;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;
      aspect-ratio:4/3;box-shadow:0 1px 2px rgba(0,0,0,.06) }
    .card img { width:100%;height:100%;object-fit:cover;display:block }
    .label { position:absolute;left:.5rem;bottom:.5rem;background:rgba(17,24,39,.85);
      color:white;padding:.25rem .5rem;border-radius:.5rem;font-size:.8rem }
  `],
})

export class App {
  title = signal('Portland or Mad Max?');

  allPhotos = signal<Photo[]>([
    { src: 'assets/madmax/fury-road-1.jpg', alt: 'Mad Max Fury Road convoy driving still',   type: 'madmax' },
    { src: 'assets/madmax/fury-road-2.jpeg', alt: 'Mad Max Fury Road convoy attack still',  type: 'madmax' },
    { src: 'assets/madmax/road-warrior-1.jpg', alt: 'Mad Max Road Warrior still',  type: 'madmax' },
    { src: 'assets/portland/max-to-hillsboro.jpg', alt: 'MAX to Hillsboro in downtown Portland', type: 'portland' },
    { src: 'assets/portland/old-town-stag-sunset.jpg', alt: 'Old Town White Stag sign at sunset', type: 'portland' },
    { src: 'assets/portland/old-town-stag.jpg', alt: 'Old Town White Stag sign at twilight', type: 'portland' },
  ]);

  firstTwo() { return this.allPhotos().slice(0, 2); }
}