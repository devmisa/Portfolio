import { Component, inject, OnInit, PLATFORM_ID, signal, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-24 bg-zinc-950 relative min-h-screen">
      <div class="container mx-auto px-6">
        <div class="mb-16 md:mb-24 max-w-2xl">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">Meus <span class="text-indigo-400">Projetos</span></h2>
          <p class="text-zinc-400 text-lg">Uma seleção dos meus repositórios mais recentes no GitHub, demonstrando minhas habilidades, interesses tecnológicos e a evolução do meu código.</p>
        </div>

        <div *ngIf="loading()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let item of [1,2,3,4,5,6]" class="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 animate-pulse">
            <div class="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-zinc-800 rounded w-full mb-2"></div>
            <div class="h-4 bg-zinc-800 rounded w-5/6 mb-6"></div>
            <div class="flex gap-3 mt-auto">
              <div class="h-4 bg-zinc-800 rounded w-20"></div>
              <div class="h-4 bg-zinc-800 rounded w-8 ml-auto"></div>
            </div>
          </div>
        </div>

        <div *ngIf="!loading()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let repo of repositories()" 
               class="project-card opacity-0 translate-y-8 group flex flex-col bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-700 ease-out hover:-translate-y-2">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1" [title]="repo.name">{{ repo.name }}</h3>
              <a [href]="repo.html_url" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-white transition-colors" aria-label="Ver no GitHub">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
            </div>
            <p class="text-zinc-400 text-sm mb-6 flex-grow line-clamp-3">{{ repo.description || 'Nenhuma descrição fornecida para este repositório.' }}</p>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full" [ngStyle]="{'background-color': getLanguageColor(repo.language)}"></span>
                <span class="text-xs text-zinc-300 font-medium">{{ repo.language || 'Múltiplas' }}</span>
              </div>
              <div class="flex items-center text-zinc-500 text-xs font-medium">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                {{ repo.stargazers_count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  repositories = signal<Repository[]>([]);
  loading = signal(true);
  
  private githubService = inject(GithubService);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.githubService.getRepositories().subscribe({
        next: (repos) => {
          this.repositories.set(repos);
          this.loading.set(false);
          setTimeout(() => this.setupIntersectionObserver(), 100);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  ngAfterViewInit() {
    if (!this.loading() && isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const cards = this.el.nativeElement.querySelectorAll('.project-card');
    cards.forEach((card: Element) => observer.observe(card));
  }

  getLanguageColor(language: string): string {
    const colors: {[key: string]: string} = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C#': '#178600',
      'PHP': '#4F5D95',
      'C++': '#f34b7d',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Swift': '#F05138',
      'Kotlin': '#A97BFF',
      'Rust': '#dea584'
    };
    return colors[language] || '#8b949e';
  }
}
