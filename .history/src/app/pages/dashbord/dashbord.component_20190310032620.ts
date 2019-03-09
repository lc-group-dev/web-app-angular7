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
  lightCard: CardSettings = {
    title: '日期',
    info: this.myDate,
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: '统计人数',
    info: this.cards['totalUserCount'],
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
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
// tslint:disable-next-line: no-console
      console.log(this.myDate);
      this.cardService.getCheckDayInfo(this.myDate).subscribe((res) => {
      this.cards = res;
// tslint:disable-next-line: no-console
        console.log(this.cards['checkRatio'],
        this.cards['totalUserCount']);
      });

  }



  OnDestroy() {
    this.alive = false;
  }
}


