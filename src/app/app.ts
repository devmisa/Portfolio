import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, ProjectsComponent],
  template: `
    <main class="bg-zinc-950 min-h-screen selection:bg-indigo-500/30 font-sans">
      <app-navbar />
      <app-hero />
      <app-projects />
      
      <!-- Footer -->
      <footer id="contact" class="py-12 border-t border-zinc-900 bg-zinc-950 text-center">
        <div class="container mx-auto px-6">
          <h2 class="text-2xl font-bold text-white mb-6">Vamos conversar?</h2>
          <p class="text-zinc-400 mb-8 max-w-lg mx-auto">Estou sempre aberto a novas oportunidades e desafios. Sinta-se à vontade para entrar em contato.</p>
          <a href="mailto:misael-202@hotmail.com.br" class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors duration-300 mb-12">
            Me envie um email
          </a>
          <p class="text-zinc-600 text-sm">
            © 2026 Portfólio. Desenvolvido com Angular & Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  `
})
export class App {}
