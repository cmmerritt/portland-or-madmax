import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type PhotoType = 'madmax' | 'portland';

interface Photo {
  src: string;
  alt: string;
  type: PhotoType;
}

type Result = 'unanswered' | 'yes' | 'sorry';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="container">
      <h1>{{ title() }}</h1>
      <h2>Can YOU tell the difference between Portland and Mad Max?</h2>
      <h2><i>Select the image that best depicts the postapocalyptic dystopia portrayed in the Mad Max film series</i></h2>
      <div class="grid">
        <div
          class="card"
          *ngFor="let p of pair(); let i = index"
          (click)="pick(i)"
          (keydown.enter)="pick(i)"
          (keydown.space)="pick(i)"
          [class.clickable]="clickedIndex() === null"
          [class.disabled]="clickedIndex() !== null && clickedIndex() !== i"
          role="button"
          [attr.aria-disabled]="clickedIndex() !== null && clickedIndex() !== i ? 'true' : null"
          [attr.tabindex]="clickedIndex() === null ? 0 : (clickedIndex() === i ? 0 : -1)"
          [attr.aria-label]="'Choose image ' + (i + 1)"
        >
          <img [src]="p.src" [alt]="p.alt" />
          <div
            class="overlay"
            *ngIf="results()[i] !== 'unanswered'"
            [class.success]="results()[i] === 'yes'"
            [class.fail]="results()[i] === 'sorry'"
            aria-live="polite"
          >
            <span>{{ overlayText(i) }}</span>
          </div>
        </div>
      </div>

      <button type="button" (click)="loadNewPair()">New pair</button>
    </main>
  `,
  styles: [`
    * { box-sizing: border-box; }
    .container {
      max-width: 900px; margin: 2rem auto; padding: 0 1rem; text-align: center;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    }
    .tagline { color:#6b7280; margin-top: 0; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0 1.5rem; }
    .card {
      position: relative; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;
      aspect-ratio: 4/3; box-shadow: 0 1px 2px rgba(0,0,0,.06); outline: none; cursor: pointer;
      transition: transform .12s ease, box-shadow .12s ease, opacity .12s ease;
    }
    .card.clickable:hover, .card.clickable:focus-visible {
      transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,.12);
    }
    .card.disabled {
      pointer-events: none;    
      cursor: default;
      opacity: .5;             
      filter: grayscale(.80);
    }
    .card img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .overlay {
      position: absolute; inset: 0; display: grid; place-items: center; padding: 1rem;
      font-weight: 800; font-size: clamp(1rem, 2.4vw, 1.5rem); color: #fff;
    }
    .overlay.success { background: rgba(16,185,129,.88); } 
    .overlay.fail    { background: rgba(239,68,68,.90); } 
    button {
      padding: .6rem 1rem; border: none; border-radius: .7rem; background: #111827; color: #fff; cursor: pointer;
    }
  `],
})

export class App {
  title = signal('Portland or Mad Max');

  allPhotos = signal<Photo[]>([
    { src: 'assets/madmax/furiosa-1.jpg', alt: 'Mad Max Furiosa', type: 'madmax' },
    { src: 'assets/madmax/fury-road-1.jpg', alt: 'Mad Max Fury Road convoy driving still',   type: 'madmax' },
    { src: 'assets/madmax/fury-road-2.jpeg', alt: 'Mad Max Fury Road convoy attack still',  type: 'madmax' },
    { src: 'assets/madmax/fury-road-3.jpg', alt: 'Mad Max Fury Road still', type: 'madmax' },
    { src: 'assets/madmax/fury-road-4.jpg', alt: 'Mad Max Fury Road still', type: 'madmax' },
    { src: 'assets/madmax/fury-road-5.jpg', alt: 'Mad Max Fury Road still', type: 'madmax' },
    { src: 'assets/madmax/fury-road-6.jpg', alt: 'Mad Max Fury Road still', type: 'madmax' },
    { src: 'assets/madmax/fury-road-7.jpg', alt: 'Mad Max Fury Road still', type: 'madmax' },
    { src: 'assets/madmax/road-warrior-1.jpg', alt: 'Mad Max Road Warrior still',  type: 'madmax' },
    { src: 'assets/madmax/road-warrior-1.jpg', alt: 'Mad Max Road Warrior still',  type: 'madmax' },
    { src: 'assets/madmax/thunderdome-1.jpg', alt: 'Mad Max Beyond Thunderdome still',  type: 'madmax' },
    { src: 'assets/madmax/thunderdome-2.jpg', alt: 'Mad Max Beyond Thunderdome still',  type: 'madmax' },
    { src: 'assets/portland/4t-trail.jpg', alt: '4T Trail photo', type: 'portland' },
    { src: 'assets/portland/cherry-blossom.jpg', alt: 'Skyline behind cherry blossom trees', type: 'portland' },
    { src: 'assets/portland/convention-center.jpg', alt: 'Portland Convention Center', type: 'portland' },
    { src: 'assets/portland/lan-su-garden.jpg', alt: 'Lan Su Chinese Garden', type: 'portland' },
    { src: 'assets/portland/marquam-bridge.jpg', alt: 'Marquam Bridge', type: 'portland' },
    { src: 'assets/portland/max-downtown.jpg', alt: 'MAX in downtown Portland', type: 'portland' },
    { src: 'assets/portland/max-to-hillsboro.jpg', alt: 'MAX to Hillsboro in downtown Portland', type: 'portland' },
    { src: 'assets/portland/old-town-stag-sunset.jpg', alt: 'Old Town White Stag sign at sunset', type: 'portland' },
    { src: 'assets/portland/old-town-stag.jpg', alt: 'Old Town White Stag sign at twilight', type: 'portland' },
    { src: 'assets/portland/portland-sign-1.jpg', alt: 'Portland sign on building', type: 'portland' },
    { src: 'assets/portland/powells.jpg', alt: 'Powells bookstore', type: 'portland' },
    { src: 'assets/portland/st-johns-bridge-1.jpg', alt: 'St. Johns Bridge', type: 'portland' },
    { src: 'assets/portland/tilikum-crossing-bridge-night.jpg', alt: 'Tilikum Crossing Bridge', type: 'portland' },
  ]);

  pair = signal<Photo[]>([]);
  results = signal<Result[]>(['unanswered','unanswered']);
  clickedIndex = signal<number | null>(null);

  constructor() { this.loadNewPair(); }

  loadNewPair() {
    const photos = this.allPhotos();
    const mad = photos.filter(p => p.type === 'madmax');
    const pdx = photos.filter(p => p.type === 'portland');
    const pick = (arr: Photo[]) => arr[Math.floor(Math.random() * arr.length)];
    this.pair.set([pick(mad), pick(pdx)].sort(() => Math.random() - 0.5));
    this.results.set(['unanswered','unanswered']);
    this.clickedIndex.set(null);
  }

  pick(i: number) {
    if (this.results()[i] !== 'unanswered') return;
    const clicked = this.pair()[i];
    const outcome: Result = clicked.type === 'portland' ? 'yes' : 'sorry';
    this.results.update(r => {
      const next = [...r];
      next[i] = outcome;
      return next;
    });
    this.clickedIndex.set(i);
  }

  overlayText(i: number) {
    const r = this.results()[i];
    if (r === 'yes')   return 'Yes! This is the wasteland seen in Mad Max';
    if (r === 'sorry') return 'Sorry, this is a photo of Portland';
    return '';
  }
}