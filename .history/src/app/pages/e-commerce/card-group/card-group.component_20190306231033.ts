import { Component, Input } from '@angular/core';



@Component({
    selector: 'ngx-card-group',
    template: `
    <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
    `,
})

export class CardGroupComponent {
    @Input() title: string;
    @Input() type: string;
    @Input() on = true;
}
