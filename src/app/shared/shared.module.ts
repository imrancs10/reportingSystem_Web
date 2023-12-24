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
import {HomeHeaderComponent} from './home-header/home-header.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../_alert';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [HeaderComponent, FooterComponent,TermsconditionComponent,HomeHeaderComponent, ContactusComponent, AboutusComponent],
  imports:[
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    AlertModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent,
    ContactusComponent,
    AboutusComponent,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
})
export class SharedModule {}
