import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { CardService } from './card.service';
import { formatDate } from '@angular/common';



interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  info: string | number;
}

interface Card {
  date: string;
  checkedCount: number;
  totalUserCount: number;
  checkRatio: string;
}

@Component({
  selector: 'ngx-dashbord',
  templateUrl: './dashbord.component.html',
})
export class ECommerceComponent {

  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  cards: Card[] = [];
  totalUserCount: number;
  private alive = true;
// ng 指令 carddgroup;
  solarValue: number;
  lightCard: CardSettings = {
    title: '日期',
    info: this.myDate,
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: '统计人数',
    info: this.totalUserCount,
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: '打卡人数',
    info: '',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: '打卡率',
    info: '',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: [];

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
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
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
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
      this.cardService.getCheckDayInfo(this.myDate).subscribe((cards) => this.cards = cards);
  }



  OnDestroy() {
    this.alive = false;
  }
}


