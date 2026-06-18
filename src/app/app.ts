import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Experience } from './experience/experience';
import { Projects } from './projects/projects';
import { Certifications } from './certifications/certifications';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, About, Skills, Experience, Projects, Certifications, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.pageYOffset > 300;
    const btn = document.querySelector('.scroll-top-btn');
    if (btn) {
      btn.classList.toggle('show', this.isVisible);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
