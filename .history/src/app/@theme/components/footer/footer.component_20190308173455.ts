import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://github.com/lc-group-dev"
    target="_blank">一时打卡小组</a></b> 2019</span>
  `,
})
export class FooterComponent {
}
