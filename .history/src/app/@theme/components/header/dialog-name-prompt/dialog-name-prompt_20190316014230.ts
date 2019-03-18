import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: `<nb-card>
  <nb-card-header>Enter your name</nb-card-header>
  <nb-card-body>
    <input #name nbInput placeholder="Name">
  </nb-card-body>
  <nb-card-footer>
    <button nbButton status="danget" (click)="cancel()">Cancel</button>
    <button nbButton status="success" (click)="submit(name.value)">Submit</button>
  </nb-card-footer>
</nb-card>`,
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
