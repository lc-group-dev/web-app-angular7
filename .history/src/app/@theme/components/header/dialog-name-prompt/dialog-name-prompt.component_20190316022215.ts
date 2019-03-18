
import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CardService } from '../../../../pages/dashbord/card.service';


@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {

  url: '';

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>,
              private UserService: CardService) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.UserService.createUserAccout(this.url).subscribe(
      data => {
        this.ref.close();
      },
    );
  }
}
