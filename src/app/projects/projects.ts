import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})

 export class Projects implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  activeCategory: string = 'All';
  visibleProjects: any[] = [];
  autoScrollInterval: any;
  
  // NEW: Tracks the currently open project for the modal
  selectedProject: any = null;

  // --- MASTER DATA (Enriched for Modal) ---
  allProjects = [
    { 
      title: 'E-Commerce Platform', 
      category: 'Web',
      tech: ['Angular', '.NET Core', 'SQL'],
      description: 'A full-featured shopping cart with payment integration and admin dashboard.',
      longDescription: 'This enterprise-level e-commerce solution features a robust product management system, secure Stripe payment integration, and a real-time order tracking dashboard for administrators. It handles high traffic loads efficiently using .NET Core.',
      features: ['User Authentication (JWT)', 'Stripe Payment Gateway', 'Admin Analytics Dashboard', 'Responsive Product Grid'],
      image: '/image/E-COMMERCE.jpg',
      featured: true, 
      links: { demo: '#', github: '#' }
    },
    { 
      title: 'CRM System', 
      category: 'Backend',
      tech: ['.NET Core', 'Azure', 'Web API'],
      description: 'Customer relationship tool with real-time analytics and reporting features.',
      longDescription: 'A comprehensive CRM designed to help businesses manage customer data. It includes automated email marketing, lead tracking pipelines, and Azure-hosted database solutions for scalability.',
      features: ['Role-based Access Control', 'Automated Email Sequences', 'Azure Blob Storage', 'PowerBI Reporting'],
      image: '/image/CRM-System.jpg',
      featured: false,
      links: { demo: '#', github: '#' }
    },
    { 
      title: 'Task Management App', 
      category: 'Web',
      tech: ['Angular', 'TypeScript', 'Bootstrap'],
      description: 'Kanban-style task tracker with drag-and-drop functionality.',
      longDescription: 'A productivity tool inspired by Trello. Users can create boards, drag tasks between columns (To-Do, In Progress, Done), and assign due dates with local storage persistence.',
      features: ['Drag & Drop Interface', 'Dark/Light Mode Toggle', 'Local Storage Save', 'Sub-task Management'],
      image: '/image/taskmanager.jpg',
      featured: false,
      links: { demo: '#', github: '#' }
    },
    { 
      title: 'Finance Dashboard', 
      category: 'Mobile',
      tech: ['Flutter', 'Firebase'],
      description: 'Personal finance tracker with expense categorization and charts.',
      longDescription: 'A cross-platform mobile application that helps users track expenses, set monthly budgets, and visualize spending habits through interactive charts and graphs.',
      features: ['Expense Categorization', 'Monthly Budget Alerts', 'Firebase Auth & Database', 'PDF Report Export'],
      image: '/image/FINANCE-DASHBORD.jpeg',
      featured: false,
      links: { demo: '#', github: '#' }
    },
    { 
      title: 'AI Chatbot Assistant', 
      category: 'Web',
      tech: ['Python', 'OpenAI API', 'React'],
      description: 'An intelligent customer support bot capable of answering complex queries.',
      longDescription: 'Integrated with OpenAI, this chatbot understands context and provides human-like responses for customer support scenarios, significantly reducing support ticket volume.',
      features: ['Natural Language Processing', 'Context Awareness', 'Conversation History', 'Fallback to Human Agent'],
      image: '/image/chatboat.png',
      featured: true,
      links: { demo: '#', github: '#' }
    },
    { 
      title: 'Fitness Tracker', 
      category: 'Mobile',
      tech: ['React Native', 'Node.js'],
      description: 'Workout planner app with progress tracking and social sharing features.',
      longDescription: 'A social fitness app allowing users to log workouts, track GPS running routes, and share achievements with a community feed.',
      features: ['GPS Route Tracking', 'Social Feed', 'Workout Analytics', 'Apple Health Integration'],
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
      featured: false,
      links: { demo: '#', github: '#' }
    }
  ];

  // --- LIFECYCLE HOOKS ---
  ngOnInit() {
    this.visibleProjects = this.allProjects;
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  // --- FILTER LOGIC ---
  setCategory(category: string) {
    this.activeCategory = category;
    this.stopAutoScroll(); // Pause while filtering
    
    if (category === 'All') {
      this.visibleProjects = this.allProjects;
    } else {
      this.visibleProjects = this.allProjects.filter(p => p.category === category);
    }

    setTimeout(() => this.startAutoScroll(), 2000); // Resume
  }

  // --- SCROLL HELPERS ---
  getScrollDistance(): number {
    if (this.scrollContainer?.nativeElement?.children?.length > 0) {
      const card = this.scrollContainer.nativeElement.children[0] as HTMLElement;
      return card.clientWidth + 25; // Card Width + Gap
    }
    return 405; // Fallback
  }

  // --- MANUAL SCROLL ---
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ 
      left: -this.getScrollDistance(), 
      behavior: 'smooth' 
    });
  }

  scrollRight() {
    const el = this.scrollContainer.nativeElement;
    // Loop Logic
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: this.getScrollDistance(), behavior: 'smooth' });
    }
  }

  // --- AUTO SCROLL (HOLD & SLIDE) ---
  startAutoScroll() {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      this.scrollRight();
    }, 3500); // 3.5 seconds hold time
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  // --- MODAL LOGIC (New Feature) ---
  openModal(project: any) {
    this.stopAutoScroll(); // Stop background scroll
    this.selectedProject = project;
    document.body.style.overflow = 'hidden'; // Lock page scroll
  }

  closeModal() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto'; // Unlock page scroll
    this.startAutoScroll(); // Resume background scroll
  }
}