import {
  Component,
  PLATFORM_ID,
  inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero-container" class="relative h-[200vh] bg-zinc-950">
      <div
        class="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        <!-- Background Video -->
        <div class="absolute inset-0 z-0 bg-zinc-950">
          <video
            #bgVideo
            muted
            playsinline
            preload="auto"
            class="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="assets/videos/meu-video.mp4" type="video/mp4" />
          </video>
          <div
            class="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950"
          ></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto fade-in-up">
          <span class="text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-4 block"
            >DevMisa</span
          >
          <h1
            class="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight"
          >
            Transformando ideias em <br class="hidden md:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"
              >experiências digitais</span
            >
          </h1>
          <p class="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Desenvolvedor Full Stack criando soluções utilizando as melhores tecnologias do mercado.
          </p>
          <a
            href="#projects"
            class="inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/30 transform hover:-translate-y-1"
          >
            Ver meus projetos
          </a>

          <!-- Seção de Tecnologias -->
          <div class="mt-24">
            <h3
              class="text-sm font-semibold uppercase tracking-wider text-zinc-500 text-center mb-6"
            >
              Experência com as seguintes tecnologias
            </h3>
            <div
              class="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-zinc-400 font-medium"
            >
              <span
                ><img
                  alt=".NET"
                  height="45"
                  width="45"
                  src="https://devicons.io/devicons/icons/dotnet.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="CSharp"
                  height="45"
                  width="45"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="TypeScript"
                  height="45"
                  width="45"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="PostgreSQL"
                  height="45"
                  width="45"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="Angular"
                  height="45"
                  width="45"
                  src="https://devicons.io/devicons/icons/angular-icon.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="Docker"
                  height="45"
                  width="45"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="RabbitMQ"
                  height="45"
                  width="45"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="Datadog"
                  height="45"
                  width="45"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/datadog/datadog-original.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="AWS"
                  height="45"
                  width="45"
                  src="https://devicons.io/devicons/icons/aws.svg"
                  style="max-width:100%"
              /></span>
              <span
                ><img
                  alt="Azure"
                  height="45"
                  width="45"
                  src="https://devicons.io/devicons/icons/microsoft-azure.svg"
                  style="max-width:100%"
              /></span>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div class="p-2 text-zinc-500 flex flex-col items-center">
            <span class="text-xs mb-2 uppercase tracking-widest text-zinc-600"
              >Scroll para explorar</span
            >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .fade-in-up {
        animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgVideo') videoElement!: ElementRef<HTMLVideoElement>;
  private platformId = inject(PLATFORM_ID);
  private ctx!: gsap.Context;
  private el = inject(ElementRef);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initVideoScrubbing();
    }
  }

  private initVideoScrubbing(): void {
    const video = this.videoElement.nativeElement;

    this.ctx = gsap.context(() => {
      const setupAnimation = () => {
        video.pause();

        gsap.to(video, {
          currentTime: video.duration || 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-container',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.1,
          },
        });
      };

      if (video.readyState >= 2) {
        setupAnimation();
      } else {
        video.addEventListener('loadeddata', setupAnimation, { once: true });
      }
    }, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}
