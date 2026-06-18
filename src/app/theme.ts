import { Injectable, signal, effect } from '@angular/core';

// Define the allowed theme types
export type ThemeOption = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  // 1. Signal to hold the current state (default is 'auto')
  currentTheme = signal<ThemeOption>('auto');

  constructor() {
    this.initializeTheme();

    // 2. EFFECT: Automatically runs whenever 'currentTheme' signal changes
    effect(() => {
      this.applyTheme(this.currentTheme());
    });

    // 3. LISTEN: Watch for system changes (Windows/Mac settings) only if in Auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.currentTheme() === 'auto') {
        this.applyTheme('auto');
      }
    });
  }

  // --- PUBLIC METHODS ---

  // Call this from your Header buttons
  setTheme(theme: ThemeOption) {
    this.currentTheme.set(theme);
    localStorage.setItem('theme', theme); // Save preference
  }

  // --- PRIVATE LOGIC ---

  private initializeTheme() {
    // Check LocalStorage for saved preference
    const savedTheme = localStorage.getItem('theme') as ThemeOption;
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    }
  }

  private applyTheme(theme: ThemeOption) {
    const root = document.documentElement; // The <html> tag
    
    // Determine if we should show Dark Mode
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = theme === 'dark' || (theme === 'auto' && isSystemDark);

    // Apply the changes to the HTML tag
    if (shouldBeDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.setAttribute('data-theme', 'light');
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }
}