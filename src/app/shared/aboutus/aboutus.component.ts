import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BussinessService } from 'src/app/services/bussiness.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit{
  contactForm!:FormGroup;
  constructor(public business:BussinessService,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.contactForm=new FormGroup({
      contactedOrgName:new FormControl('',[Validators.required]),
      contactedUserName:new FormControl('',[Validators.required]),
      contactedEmail:new FormControl('',[Validators.required,Validators.email]),
      contactedMsg:new FormControl('',[Validators.required]),
    });
  }
  openSnackbar(msg:any){
    this._snackBar.open(msg, 'X', {
      duration:6*1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  onContactBtn(){
    this.openSnackbar('Thanks!! We will revert soon.');
    this.business.postMessage(this.contactForm.value).subscribe((res:any)=>{
      this.openSnackbar('Thanks!! We will revert soon.');
      this.contactForm.reset();
    });

  }


}
