import { CommonService } from './../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from './../../services/apiservice.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{
  searchQuery:any="";
  showFilter:boolean=false;
  options: AnimationOptions = {
    path: 'assets/load.json',
  };
  resultado:any=[];
  activatedTail:any={};
  isLoading: boolean=false;
  filterQuery:any;
  pageType:any="name"
  backupData: any[]=[];
  modalLoading: boolean=false;

  constructor(public router: ActivatedRoute,
    public api:ApiserviceService,
    public com:CommonService,
    public modal:MatDialog) { 
   this.router.data.subscribe(e=>{
        this.pageType=e.type;
      })
    this.searchQuery= this.router.snapshot.paramMap.get("q");
    if(this.searchQuery!=""){
      this.onSearch();
    }
  }

  onSearch(){
    this.isLoading = true;
    if(this.pageType=="name"){
      this.api.getSearchResults(this.searchQuery).then((res:any)=>{
        this.resultado=this.com.reFormArray(res.drinks);
        this.backupData=this.com.reFormArray(res.drinks);
        this.isLoading = false;
      }).catch((e)=>{
        this.isLoading = false;
  
      })
  
    }else if(this.pageType=="ing"){
      this.api.getResultsByIngredient(this.searchQuery).then((res:any)=>{
        this.resultado=this.com.reFormArray(res.drinks);
        this.backupData=this.com.reFormArray(res.drinks);
        this.isLoading = false;
      }).catch((e)=>{
        this.isLoading = false;
  
      })
  
    }else{
      this.api.getResultsByCategory(this.searchQuery).then((res:any)=>{
        this.resultado=this.com.reFormArray(res.drinks);
        this.backupData=this.com.reFormArray(res.drinks);
        this.isLoading = false;
      }).catch((e)=>{
        this.isLoading = false;
  
      })
  
    }
   
  }

  openModal(te:any,selectedTail:any){
    this.modalLoading=true;
    this.modal.open(te);
    this.loadDrink(selectedTail.id,te)

  }

  onNoClick(): void {
    this.modal.closeAll();
  }

  onUpdateCategory(e:any) {
    this.resultado = this.backupData.filter((i) => {
      return (
        i.category.toLowerCase().indexOf(e.toString().toLowerCase()) !== -1
      );
    });
  }

  onUpdateNames(e:any) {
    this.resultado = this.backupData.filter((i) => {
      return (
        i.drinkName.toLowerCase().indexOf(e.toString().toLowerCase()) !== -1
      );
    });
  }

  onUpdateIngredients(e:any) {
    this.resultado = this.backupData.filter((i) => {
      for(var o=0;o<i.ingredients.length;o++){
        if(i.ingredients[o].ingredient.toLowerCase().indexOf(e.toString().toLowerCase())!==-1){
          return true;
        }
      }
      return false;
    });
  }

  loadDrink(id:any,te:any){
    this.api.getResultsById(id).then((res:any)=>{
      this.activatedTail= this.com.reFormArray(res.drinks)[0];
      console.log(this.activatedTail)
    this.modalLoading=false;
  }).catch((e)=>{
    this.modalLoading=false;

  })
  }
}
