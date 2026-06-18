import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  
  // 1. Tab Switching Logic
  activeTab: 'bio' | 'timeline' = 'bio';

  setTab(tab: 'bio' | 'timeline') {
    this.activeTab = tab;
  }

  // 2. Experience Timeline Data
  timeline = [
    { year: '2025', role: 'Senior Architect', company: 'Global Tech', desc: 'Leading migration to .NET 8 & Microservices.' },
    { year: '2023', role: 'Full Stack Dev', company: 'Innovate Corp', desc: 'Built enterprise Angular dashboards.' },
    { year: '2021', role: 'Junior Dev', company: 'StartUp Inc', desc: 'Backend API development & optimization.' }
  ];

  // 3. Stats Data
  stats = [
    { label: 'Years Exp.', value: '03+' },
    { label: 'Projects', value: '15+' },
    { label: 'Clients', value: '10+' }
  ];

  // 4. Infinite Marquee Data
  techStack = [
    'devicon-angularjs-plain', 'devicon-dotnetcore-plain', 'devicon-csharp-plain', 
    'devicon-typescript-plain', 'devicon-azure-plain', 'devicon-docker-plain',
    'devicon-github-original', 'devicon-microsoftsqlserver-plain'
  ];
}