import { Component } from '@angular/core';
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
      info_id: {
        title: '序号',
        type: 'number',
      },
      username: {
        title: '用户名',
        type: 'string',
      },
      solvedProblemToday: {
        title: '刷题数',
        type: 'number',
      },
      solvedQuestion: {
        title: '近一年打卡天数',
        type: 'number',
      },
      isChecked: {
        title: '今日查卡',
        type: 'number',
      },
      gmt_modified: {
        title: '数据更新时间',
        type: 'string',
      },
    },
  };


  constructor(private infoService: CardService) {

// tslint:disable-next-line: no-console
    console.log(this.myDate);
    this.infoService.getCheckDayInfoDay(this.myDate).subscribe((res) => {
      this.tables = res;
      });
  }

}
