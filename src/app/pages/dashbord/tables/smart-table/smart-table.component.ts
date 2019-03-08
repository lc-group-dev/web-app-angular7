import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    columns: {
      id: {
        title: '序号',
        type: 'number',
      },
      firstName: {
        title: '用户名',
        type: 'string',
      },
      lastName: {
        title: '刷题数',
        type: 'string',
      },
      username: {
        title: '近一年打卡天数',
        type: 'string',
      },
      email: {
        title: '今日查卡',
        type: 'string',
      },
      age: {
        title: '数据更新时间',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

}
