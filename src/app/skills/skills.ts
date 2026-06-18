import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for Search Input

interface Skill {
  name: string;
  icon: string;
  color: string;
  level: number;
  years: number; // New Feature: Experience Years
  projects: string[];
  status?: 'Expert' | 'Proficient' | 'Learning';
}

interface SkillCategory {
  name: string;
  value: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  
  activeCategory: string = 'All';
  searchQuery: string = ''; // New Feature: Search Query

  // Master Data
  categories: SkillCategory[] = [
    {
      name: 'Frontend',
      value: 'frontend',
      skills: [
        { 
          name: 'Angular 18+', 
          icon: 'devicon-angularjs-plain', 
          color: '#dd0031', 
          level: 90,
          years: 2.5, 
          projects: ['E-Commerce Platform', 'Task App', 'All Projects'], 
          status: 'Expert' 
        },
        { 
          name: 'TypeScript', 
          icon: 'devicon-typescript-plain', 
          color: '#3178c6', 
          level: 85,
          years: 2.5, 
          projects: ['Finance Dash', 'Chatbot'],
          status: 'Proficient'
        },
        { 
          name: 'Bootstrap 5', 
          icon: 'devicon-bootstrap-plain', 
          color: '#7952b3', 
          level: 95,
          years: 2.5, 
          projects: ['Portfolio', 'All Projects'],
          status: 'Expert'
        }
      ]
    },
    {
      name: 'Backend',
      value: 'backend',
      skills: [
        { 
          name: '.NET Core', 
          icon: 'devicon-dotnetcore-plain', 
          color: '#512bd4', 
          level: 80,
          years: 2.5, 
          projects: ['CRM System', 'E-Commerce'],
          status: 'Proficient'
        },
        { 
          name: 'C# Web API', 
          icon: 'devicon-csharp-plain', 
          color: '#9b4993', 
          level: 85,
          years: 2.5, 
          projects: ['Bank API', 'Auth Service'],
          status: 'Proficient'
        },
        { 
          name: 'SQL Server', 
          icon: 'devicon-microsoftsqlserver-plain', 
          color: '#cc2927', 
          level: 75,
          years: 2.5, 
          projects: ['Inventory DB', 'User Data'],
          status: 'Proficient'
        }
      ]
    },
    {
      name: 'Tools & Cloud',
      value: 'tools',
      skills: [
        { 
          name: 'Azure Cloud', 
          icon: 'devicon-azure-plain', 
          color: '#007fff', 
          level: 60,
          years: 1, 
          projects: ['Hosting', 'Blob Storage'],
          status: 'Learning'
        },
        { 
          name: 'Git & CI/CD', 
          icon: 'devicon-git-plain', 
          color: '#f05032', 
          level: 80,
          years: 2, 
          projects: ['All Projects'],
          status: 'Proficient'
        }
      ]
    }
  ];

  // Helper: Filter by Category AND Search Query
  get visibleSkills(): Skill[] {
    // 1. Filter by Tab
    let filtered = this.activeCategory === 'All'
      ? this.categories.flatMap(c => c.skills)
      : this.categories.find(c => c.name === this.activeCategory)?.skills || [];

    // 2. Filter by Search Query (if exists)
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  setCategory(categoryName: string) {
    this.activeCategory = categoryName;
    this.searchQuery = ''; // Optional: Clear search when switching tabs? I kept it to clear for better UX.
  }
}