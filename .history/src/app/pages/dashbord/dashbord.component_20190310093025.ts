import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { CardService, Summary } from './card.service';
import { formatDate } from '@angular/common';



interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  info: string | number;
}


@Component({
  selector: 'ngx-dashbord',
  templateUrl: './dashbord.component.html',
})
export class ECommerceComponent {

  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  cards: Summary[] = [];

  private alive = true;
// ng 指令 carddgroup;
  solarValue: number;
  dateCard: CardSettings = {
    title: '日期',
    info: '',
    iconClass: 'nb-compose',
    type: 'primary',
  };
  totalUserCard: CardSettings = {
    title: '统计人数',
    info: '',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  checkedCountCard: CardSettings = {
    title: '打卡人数',
    info: '',
    iconClass: 'nb-audio',
    type: 'info',
  };
  checkRatioCard: CardSettings = {
    title: '打卡率',
    info: '',
    iconClass: 'nb-checkmark-circle',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.dateCard,
    this.totalUserCard,
    this.checkedCountCard,
    this.checkRatioCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.dateCard,
        type: 'warning',
      },
      {
        ...this.totalUserCard,
        type: 'primary',
      },
      {
        ...this.checkedCountCard,
        type: 'danger',
      },
      {
        ...this.checkRatioCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService,
              private infoService: CardService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

      this.infoService.getCheckDayInfoSum(this.myDate).subscribe((res) => {
      this.cards = res;
// tslint:disable-next-line: no-console
         console.log(this.cards.map);
      // const date = this.cards['date'];
      // this.dateCard.info = date;
      // const totalUserCount = this.cards['totalUserCount'];
      // this.totalUserCard.info = totalUserCount;
      // const checkRatio = this.cards['checkRatio'];
      // this.checkRatioCard.info = checkRatio;
      // const checkedCount = this.cards['checkedCount'];
      // this.checkedCountCard.info = checkedCount;
      });

  }


  OnDestroy() {
    this.alive = false;
  }
}


