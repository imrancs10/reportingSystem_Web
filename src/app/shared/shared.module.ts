import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TermsconditionComponent } from './termscondition/termscondition.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent,TermsconditionComponent],
  imports:[
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
