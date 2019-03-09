import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { CardService } from './card.service';
import { formatDate } from '@angular/common';
import { Summary } from './card.service';



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
    iconClass: 'nb-lightbulb',
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
    info: this.cards['checkedCount'],
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: '打卡率',
    info: this.cards['checkRatio'],
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: [];

  commonStatusCardsSet: CardSettings[] = [
    this.dateCard,
    this.totalUserCard,
    this.checkedCountCard,
    this.coffeeMakerCard,
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
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private cardService: CardService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

      this.cardService.getCheckDayInfo(this.myDate).subscribe((res) => {
      this.cards = res;
      const date = this.cards['date'];
      this.dateCard.info = date;
      const totalUserCount = this.cards['totalUserCount'];
      this.totalUserCard.info = totalUserCount;
      const checkedCount = this.cards['checkedCount'];
      this.checkedCountCard = checkedCount;

// tslint:disable-next-line: no-console
        console.log(date, totalUserCount);
      });

  }



  OnDestroy() {
    this.alive = false;
  }
}


