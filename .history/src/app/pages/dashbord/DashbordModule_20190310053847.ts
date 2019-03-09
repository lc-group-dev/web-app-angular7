import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './dashbord.component';
import { TablesComponent } from './tables/tables.component';
import { SmartTableComponent } from '../dashbord/tables/smart-table/smart-table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CardGroupComponent } from './card-group/card-group.component';
@NgModule({
  imports: [
    ThemeModule,
    RouterModule,

  ],
  declarations: [
    ECommerceComponent,
    TablesComponent,
    SmartTableComponent,
    CardGroupComponent,
  ],
  providers: [],
})
export class DashbordModule {
}
