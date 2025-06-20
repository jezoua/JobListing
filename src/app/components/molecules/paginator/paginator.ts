import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { JobsListingStore } from '../../../app-core/stores/jobs-listing/jobs-listing.store';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  readonly #jobsListingStore = inject(JobsListingStore);

  number_of_pages = this.#jobsListingStore.number_of_pages;
  active_page = signal(1);
  pages = computed(() => {
    const totalPages = this.number_of_pages();
    const currentPage = this.active_page();

    const page_array: number[] = [];

    if (totalPages <= 6) {
      // Show all pages if total pages are 6 or fewer
      for (let i = 1; i <= totalPages; i++) {
        page_array.push(i);
      }
      return page_array;
    }

    page_array.push(1); // Always include first page

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    // Ensure exactly 4 in-between pages when possible
    let inBetweenPages = [];
    for (let i = start; i <= end; i++) {
      inBetweenPages.push(i);
    }

    // Adjust if too few pages at the start or end
    while (inBetweenPages.length < 4) {
      if (start > 2) {
        inBetweenPages.unshift(start - inBetweenPages.length);
      } else if (end < totalPages - 1) {
        inBetweenPages.push(
          end + (inBetweenPages.length - (end - start + 1) + 1),
        );
      } else {
        break;
      }
    }

    page_array.push(...inBetweenPages);
    page_array.push(totalPages); // Always include last page

    // Remove any duplicates (if currentPage is near edges)
    return [...new Set(page_array)];
  });

  setActivePage(page: number) {
    console.log(`🦊setting page to ${page}`);

    this.active_page.set(page);
  }

  nextPage() {
    this.setActivePage(this.active_page() + 1);
  }
  prevPage() {
    this.setActivePage(this.active_page() - 1);
  }

  #pageChangeEffect = effect(() => {
    const el = document.getElementById(`page-${this.active_page()}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  scrollTriggers: ScrollTrigger[] = [];

  #showMoreEffect = effect(() => {
    if (!this.#jobsListingStore.isLoading()) {
      untracked(() => {
        setTimeout(() => {
          this.scrollTriggers.forEach((trigger) => trigger.kill());

          for (const page of this.pages()) {
            const trigger = ScrollTrigger.create({
              trigger: `#page-${page}`,
              scroller: '.jobslist',
              start: 'top 50%',
              end: 'bottom 0%',
              onEnter: () => this.setActivePage(page),
              onEnterBack: () => this.setActivePage(page),
            });

            this.scrollTriggers.push(trigger);
          }
        }, 2000);

        ScrollTrigger.refresh();
      });
    }
  });

  constructor() {
    this.#pageChangeEffect;
    this.#showMoreEffect;
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    console.log('🚀');
  }
  ngOnDestroy() {
    this.scrollTriggers.forEach((trigger) => trigger.kill());
  }
}
