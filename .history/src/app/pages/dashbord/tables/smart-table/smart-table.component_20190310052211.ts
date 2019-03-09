import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../../@core/data/smart-table';
import { Day, CardService } from '../../card.service';
import { formatDate } from '@angular/common';

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

  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  tables: Day[] = [];

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

  constructor(private service: SmartTableData,
              private infoService: CardService) {
    const data = this.service.getData();
    this.source.load(data);

// tslint:disable-next-line: no-console
    console.log(this.myDate);
    this.infoService.getCheckDayInfoDay(this.myDate).subscribe((res) => {
      this.tables = res;
      });
  }

}
