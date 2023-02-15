import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { SampleComponent } from './sample/sample.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch : 'full'},
  {path: '', component:SidebarComponent,
    children: [
      {path: '', redirectTo: 'employeecrud', pathMatch : 'full'},
      {path: 'employeecrud', component:CrudComponent},
      {path: '', redirectTo: 'sample', pathMatch : 'full'},
      {path: 'sample', component:SampleComponent}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
