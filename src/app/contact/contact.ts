import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {

  @ViewChild('contactForm') contactForm!: NgForm; 

  formData = {
    name: '',
    email: '',
    message: ''
  };

  // Puzzle State
  num1: number = 0;
  num2: number = 0;
  userPuzzleAnswer: number | null = null;
  isPuzzleSolved: boolean = false;
  isSubmitting: boolean = false;

  socials = [
    { icon: 'bi bi-linkedin', link: 'https://www.linkedin.com/in/ranjan-kumar-mahunta-6a2581371/', color: '#0077b5', label: 'LinkedIn' },
    { icon: 'bi bi-github', link: 'https://github.com/Ranjan0211', color: '#6e5494', label: 'GitHub' },
    { icon: 'bi bi-whatsapp', link: 'https://wa.me/8328810710?text=Hi%20Ranjan,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.', color: '#25D366', label: 'WhatsApp' },
    { icon: 'bi bi-envelope-fill', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=ranjanmahunta0211@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Ranjan,%20I%20visited%20your%20portfolio.', color: '#ea4335', label: 'Email' }
  ];

  // Location
  userLat: number | null = null;
  userLng: number | null = null;
  locationName: string = 'INITIALIZING SATELLITE...';
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // FIX 1: Set a valid default map (World View)
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://maps.google.com/maps?q=20.5937,78.9629&t=k&z=3&ie=UTF8&iwloc=&output=embed'
    );
  }

  ngOnInit() {
    this.getUserLocation();
    this.generatePuzzle();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          
          // FIX 2: Correct URL format for Satellite Map (t=k)
          const rawUrl = `https://maps.google.com/maps?q=${this.userLat},${this.userLng}&t=k&z=15&ie=UTF8&iwloc=&output=embed`;

          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

          this.fetchLocationName(this.userLat, this.userLng);
        },
        (error) => {
          console.error('Location Error:', error);
          this.locationName = 'SIGNAL LOST (DENIED)';
        }
      );
    } else {
      this.locationName = 'GPS UNSUPPORTED';
    }
  }

  async fetchLocationName(lat: number, lng: number) {
    try {
      this.locationName = 'TRIANGULATING...';
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.address;
      const area = address.suburb || address.neighbourhood || address.residential || address.village || 'Unknown Sector';
      const city = address.city || address.town || address.state_district || '';
      this.locationName = `LOC: ${area.toUpperCase()}${city ? ', ' + city.toUpperCase() : ''}`;
    } catch (err) {
      this.locationName = 'LOC: UNKNOWN SECTOR';
    }
  }

  generatePuzzle() {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;
    this.userPuzzleAnswer = null;
    this.isPuzzleSolved = false;
  }

  checkPuzzle() {
    if (this.userPuzzleAnswer === (this.num1 + this.num2)) {
      this.isPuzzleSolved = true;
    } else {
      this.isPuzzleSolved = false;
    }
  }

  onSubmit() {
    if (this.isPuzzleSolved && this.formData.name && this.formData.email && this.formData.message) {
      
      this.isSubmitting = true;

      setTimeout(() => {
        this.isSubmitting = false;

        // Success Alert
        Swal.fire({
          title: 'TRANSMISSION SUCCESSFUL!',
          text: 'Your message has been encrypted and sent to Ranjan.',
          icon: 'success',
          background: '#0f172a',
          color: '#fff',
          confirmButtonColor: '#22c55e',
        });

        // Reset
        this.generatePuzzle();
        this.formData = { name: '', email: '', message: '' };
        if (this.contactForm) this.contactForm.resetForm();
        
      }, 1500); 
    }
  }
}
