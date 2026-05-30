import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav [class]="'fixed w-full z-50 transition-all duration-300 ' + (scrolled() ? 'bg-zinc-950/90 backdrop-blur-md py-4 border-b border-zinc-800 shadow-xl' : 'bg-transparent py-6')">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <a href="#" class="text-2xl font-bold tracking-tighter text-white">
          Port<span class="text-indigo-500">fólio</span>
        </a>
        
        <ul class="hidden md:flex space-x-8 text-sm font-medium text-zinc-300">
          <li><a href="#hero" class="hover:text-white transition-colors">Início</a></li>
          <li><a href="#projects" class="hover:text-white transition-colors">Projetos</a></li>
          <li><a href="#contact" class="hover:text-white transition-colors">Contato</a></li>
        </ul>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  scrolled = signal(false);
  private platformId = inject(PLATFORM_ID);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 50);
    }
  }
}
