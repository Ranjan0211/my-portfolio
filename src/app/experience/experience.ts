import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface IExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  location: string;
  responsibilities: string[];
  achievements: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience { 

  // DATA: Using 'IExperience' interface
  experiences: IExperience[] = [
    {
      company: 'ABC Tech Solutions',
      role: 'Software Engineer',
      period: '2022 — Present',
      location: 'Bangalore (Hybrid)',
      description: 'Building scalable web applications using ASP.NET Core and Angular. Focused on performance tuning and UI modernization.',
      tags: ['.NET Core', 'Angular', 'Azure', 'SQL'],
      responsibilities: [
        'Design and develop RESTful APIs using ASP.NET Core.',
        'Create responsive UI components with Angular 17+.',
        'Collaborate with UX/UI teams to implement pixel-perfect designs.',
        'Conduct code reviews and mentor junior developers.'
      ],
      achievements: [
        'Reduced API latency by 40% using Redis caching.',
        'Led the migration from AngularJS to Angular 18, improving load times by 2s.'
      ]
    },
    {
      company: 'XYZ Innovations',
      role: 'Junior Developer',
      period: '2020 — 2022',
      location: 'Hyderabad (On-site)',
      description: 'Gained hands-on experience with frontend and backend development, working on Angular, C#, and SQL.',
      tags: ['C#', 'JavaScript', 'SQL', 'CI/CD'],
      responsibilities: [
        'Maintained legacy codebases and fixed critical bugs.',
        'Assisted in database schema design and SQL query optimization.',
        'Integrated third-party payment gateways (Stripe/Razorpay).'
      ],
      achievements: [
        'Developed 15+ RESTful APIs for internal tools.',
        'Automated deployment pipelines using Azure DevOps.'
      ]
    }
  ];

  // MODAL LOGIC
  selectedExp: IExperience | null = null;

  openModal(exp: IExperience) {
    this.selectedExp = exp;
    document.body.style.overflow = 'hidden'; 
  }

  closeModal() {
    this.selectedExp = null;
    document.body.style.overflow = 'auto'; 
  }
}
