import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ChartModule } from 'angular2-chartjs';
import { SlideOutComponent } from './slide-out/slide-out.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TablesComponent } from './tables/tables.component';
import { SmartTableComponent } from '../e-commerce/tables/smart-table/smart-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CardGroupComponent } from './card-group/card-group.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    RouterModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ECommerceComponent,
    SlideOutComponent,
    TablesComponent,
    SmartTableComponent,
    CardGroupComponent,

  ],
  providers: [
  ],
})

export class ECommerceModule { }
