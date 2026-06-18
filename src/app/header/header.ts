import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  activeSection: string = 'home';

  setActive(section: string) {
    this.activeSection = section;

    // Auto-close menu on mobile when a link is clicked
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // FIX: Force 'home' active when at the very top of the page
    if (window.scrollY < 100) {
      this.activeSection = 'home';
      return;
    }

    // Loop through other sections
    const sections = ['about', 'skills', 'experience', 'projects', 'contact'];

    for (const section of sections) {
      const element = document.getElementById(section);

      if (element) {
        const rect = element.getBoundingClientRect();

        // Check if section is in view
        if (rect.top >= -100 && rect.top < 200) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}