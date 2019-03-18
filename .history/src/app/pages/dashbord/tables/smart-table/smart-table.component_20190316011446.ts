import { Component } from '@angular/core';
import { Day, CardService } from '../../card.service';
import { formatDate } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';

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

     myDate = '2019-03-09';
  // myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  tables: Day[] = [];
  abc = [];
  settings = {
    columns: {
      index: {
        title: '序号',
        type: 'string',
        valuePrepareFunction(value: any, row: any, cell: { row: { index: number; }; }) {
          return cell.row.index + 1;
        },
      },
      username: {
        title: '用户名',
        type: 'string',
      },
      solvedQuestion: {
        title: '刷题数',
        type: 'number',
      },
      submission: {
        title: '近一年打卡天数',
        type: 'number',
      },
      isChecked: {
        title: '今日查卡',
        type: 'string',
        valuePrepareFunction(isChecked) {
          return isChecked === 1 ? '已打卡' : '缺卡';
        },

      },
      gmt_modified: {
        title: '数据更新时间',
        type: 'string',
        valuePrepareFunction(gmt_modified) {
          return formatDate(new Date(gmt_modified), 'medium', 'en');
        },
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();

  constructor(private infoService: CardService) {

    this.infoService.getCheckDayInfoDay(this.myDate).subscribe((res) => {
      this.tables = res;
      this.source.load(this.tables);
// tslint:disable-next-line: no-console
      console.log(this.tables.map(table => (table)));
      });

  }

}
