import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BussinessService } from 'src/app/services/bussiness.service';
import { TermsconditionComponent } from 'src/app/shared/termscondition/termscondition.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!:NgForm
  termsCondition:boolean=false;
  constructor(public route:Router,public dialog: MatDialog,public business:BussinessService){}
  ngOnInit(): void {
    this.termsCondition=false;
  }

  onClick(form:NgForm){
    if(!this.termsCondition || form.invalid) return;
    //logic for generate the UserName by Raghav Garg 
    let name=form.value.fname[0]+form.value.lname[0];
    let username=name+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)
    let pass=this.business.getPass();
    let body={
      "organization_name": form.value.organization_name,
      "gmail": form.value.gmail,
      "fname": form.value.fname,
      "lname": form.value.lname,
      "state": form.value.state,
      "city": form.value.city,
      "Pincode": form.value.Pincode,
      "phone": form.value.phone,
      "username":username,
      "password":pass
    }
    // console.log(body);
    
    //data save table main  and navigate home
    this.onLogin();
  }

  onLogin(){
    this.route.navigate(['/login']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermsconditionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result==='accept'){
        this.termsCondition=true;
      }
      else this.termsCondition=false;
    });
  }

}
