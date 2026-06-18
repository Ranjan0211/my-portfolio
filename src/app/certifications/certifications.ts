import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css',
})
export class Certifications {
  certs = [
    { 
      name: 'Azure Fundamentals', 
      issuer: 'Microsoft', 
      date: 'Issued 2024',
      id: 'AZ-900',
      icon: 'bi bi-microsoft',
      color: '#0078D4', 
      link: '#'
    },
    { 
      name: '.NET Developer', 
      issuer: 'Microsoft', 
      date: 'Issued 2023',
      id: 'NET-CERT',
      icon: 'bi bi-code-slash',
      color: '#512BD4', 
      link: '#'
    }
  ];

}
