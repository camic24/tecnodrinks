import { CommonService } from '../../services/common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class navbarComponent{

  constructor(public com:CommonService) { }  

}
