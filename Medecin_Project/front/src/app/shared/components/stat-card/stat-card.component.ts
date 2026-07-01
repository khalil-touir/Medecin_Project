import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {
  @Input() title = '';
  @Input() value = 0;
  @Input() icon = '';
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'sky' = 'primary';
  @Input() trend?: number;
  @Input() trendLabel?: string;
  @Input() animationDelay = 0;

  displayValue = 0;
  animating = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.animateCount();
    }, this.animationDelay);
  }

  private animateCount(): void {
    const duration = 1200;
    const steps = 60;
    const step = this.value / steps;
    let current = 0;
    this.animating = true;

    const timer = setInterval(() => {
      current += step;
      if (current >= this.value) {
        this.displayValue = this.value;
        this.animating = false;
        clearInterval(timer);
      } else {
        this.displayValue = Math.floor(current);
      }
    }, duration / steps);
  }
}
