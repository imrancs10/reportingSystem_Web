import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit{
  contactForm!:FormGroup;
  constructor(){}
  ngOnInit(): void {
    this.contactForm=new FormGroup({
      contactedOrgName:new FormControl('',[Validators.required]),
      contactedUserName:new FormControl('',[Validators.required]),
      contactedEmail:new FormControl('',[Validators.required,Validators.email]),
      contactedMsg:new FormControl('',[Validators.required]),
    });
  }
  onContactBtn(){
    //Msg Save Api
    console.log(this.contactForm.value);
    
  }


}
