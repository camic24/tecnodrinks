import { SearchComponent } from './components/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "home",
    component: HomeComponent,

  },
  {
    path: "search",
    children: [
      {
        path: "names/:q",
        component: SearchComponent,
        data:{
          type:"name"
        }
      },
      {
        path: "ingredients/:q",
        component: SearchComponent,
        data:{
          type:"ing"
        }
      },
      {
        path: "category/:q",
        component: SearchComponent,
        data:{
          type:"category"
        }
      }
    ],
  },
  {path: '**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
