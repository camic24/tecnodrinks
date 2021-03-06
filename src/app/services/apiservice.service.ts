import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  url:String ="https://www.thecocktaildb.com/api/json/v1/1/";
  constructor(public http:HttpClient,public com:CommonService) { 


  }

  getSearchResults(name:String){
    return this.http.get(`${this.url}/search.php?s=${name}`).toPromise();
  }

  getRandomCocktail(){
    return this.http.get(this.url+"/random.php.php").toPromise();

  }

  getResultsByIngredient(ingrid:any){
    return this.http.get(`${this.url}/filter.php?i=${ingrid}`).toPromise();

  }

  getResultsByCategory(category:String){
    return this.http.get(`${this.url}/filter.php?c=${category}`).toPromise();

  }
  getResultsById(id:String){
    return this.http.get(`${this.url}/lookup.php?i=${id}`).toPromise();

  }
}
