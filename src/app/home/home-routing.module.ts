import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { ItemListComponent } from './item-list/item-list.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  Shell.childRoutes([
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    { path: 'item', component: ItemListComponent, data: { title: marker('Item') } },
    { path: 'orderList', component: OrderListComponent, data: { title: marker('OrderList') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
