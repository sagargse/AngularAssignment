import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './EmployeeCRUD/crud/crud.component';
import { SampleComponent } from './sample/sample.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch : 'full'},
  {path: '', component:SidebarComponent,
    children: [
      {path: '', redirectTo: '0', pathMatch : 'full'},
      {path: '0', component:CrudComponent},
      {path: '', redirectTo: '1', pathMatch : 'full'},
      {path: '1', component:SampleComponent}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
