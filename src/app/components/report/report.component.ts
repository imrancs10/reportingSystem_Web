import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { BussinessService } from 'src/app/services/bussiness.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('patientForm') patientForm!:NgForm;
  openfirst: boolean=false;
  openHilum: boolean=false;
  openMasses: boolean=false;
  openCavity: boolean=false;
  openOpacity: boolean=false;
  openTrachea: boolean=false;
  openMedia: boolean=false;
  openCardic:boolean=false;
  openAortic:boolean=false;
  openPneumothorax:boolean=false;
  fracture:boolean=false;
  openbony:boolean=false;
  openBonyCage:boolean=false;
  openBreastShadow: boolean=false;
  openDiaphragm: boolean=false;
  openSoftTissue: boolean=false;
  openCostophrenicAngles: boolean=false;
  openCardicShaped: boolean=false;
  ribnumber: boolean=false;
  pdfUrl: any;
  xrayImage:any;
  maxdate:any;
  mindate:any;
  fileName: any='';
  constructor(
    public dialog: MatDialog,
    public businessData:BussinessService,
    private sanitizer: DomSanitizer,
    ){
      let todayDate=new Date();
      this.mindate=todayDate;
      this.maxdate=todayDate;
    }

  CardiacShape:any="";
  BronchoVascularMarking="";
  BronchoVascularMarkingSide=""
  BronchoVascularMarkingRegion="";
  opacity="";
  opacitySide="";
  opacityRegion="";
  cavity="";
  cavitySide="";
  cavityRegion="";
  massesSide="";
  masses="";
  massesRegion="";
  hilum="";
  hilumSide:any='';
  trachea="";
  tracheaShiftSide="";
  mediastinal="";
  mediastinalShiftSide="";
  CardiacSize=""; 
  CardiacShapeAbnormal="";
  BreastShadow="";
  BreastShadowSide=""
  HemiDiaphragm="";
  HemiDiaphragmSide="";
  HemiDiaphragmAbormal="";
  SoftTissue="";
  SoftTissueSide="";
  FractureRibNumber="";
  Bonylesion="";
  FractureSide="";
  Finding="";
  BonyCage="";
  BonyCageSide="";
  Pneumothorax="";
  PneumothoraxSide="";
  CostophrenicAngles="";
  CostophrenicAnglesSide="";
  LymphNodes="";
  AorticKnuckleAbnormal="";
  AorticKnuckle="";
  ProminentHilumSpecify="";
  AorticKnuckleCalcification="";
  AorticKnuckleUnfoldingofAorta="";
  SoftTissueAbnormal="";
  BreastShadowAbnormal="";
  showPreview:boolean=false;

  ngOnInit(): void {
    
  }

  onCardiacSizeChanged(event:any){
    console.log(event);
    
    if(event.target.value==='Enlarged') {this.openCardicShaped=true;console.log('enlarged');}
    
    this.openCardicShaped=false;
  }

  onChangeBroncho(event:any){
    if(event.target.value==='Prominent') this.openfirst=true;
    else this.openfirst=false;
  }
  onCavity(event:any){
    if(event.target.value==='Present') this.openCavity=true;
    else this.openCavity=false;
  }
  onMasses(event:any){
    if(event.target.value==='Present') this.openMasses=true;
    else this.openMasses=false;
  }

  onHilum(event:any){
    if(event.target.value==='Prominent') this.openHilum=true;
    else this.openHilum=false;
  }
  onOpacity(event:any){
    if(event.target.value==='Present') this.openOpacity=true;
    else this.openOpacity=false;
  }
  onTrachea(event:any){
    if(event.target.value==='Shift') this.openTrachea=true;
    else this.openTrachea=false;
  }
  onMediastinal(event:any){
    if(event.target.value==='Shift') this.openMedia=true;
    else this.openMedia=false;
  }
  onCardicShapeAbnormal(event:any){
    if(event.target.value==='Abnormal') this.openCardic=true;
    else this.openCardic=false;
  }
  onAortic(event:any){
    if(event.target.value==='Prominent') this.openAortic=true;
    else this.openAortic=false;
  }
  onPneumothorax(event:any){
    if(event.target.value==='Present') this.openPneumothorax=true;
    else this.openPneumothorax=false;
  }

  onFinding(event:any){
    if(event.target.value==='Fracture'){
      this.fracture=true;
      this.openbony=false;
      this.ribnumber=false;
    }
    else if(event.target.value==="Bony Lesion"){
      this.openbony=true;
      this.fracture=false;
      this.ribnumber=false;
    }
    else if(event.target.value==="Dysplasia of Ribs"){
      this.openbony=false;
      this.fracture=false;
      this.ribnumber=true;
    }
    else{
      this.openbony=false;
      this.fracture=false;
      this.ribnumber=false;
    }
  }

  onBonyCage(event:any){
    if(event.target.value==='Abnormal') this.openBonyCage=true;
    else this.openBonyCage=false;
  }

  onDiaphragm(event:any){
    if(event.target.value==='Abnormal') this.openDiaphragm=true;
    else this.openDiaphragm=false;
  }

  onBreastShadow(event:any){
    if(event.target.value==='Abnormal') this.openBreastShadow=true;
    else this.openBreastShadow=false;
  }

  onSoftTissue(event:any){
    if(event.target.value==='Abnormal') this.openSoftTissue=true;
    else this.openSoftTissue=false;
  }

  onCostophrenicAngles(event:any){
    if(event.target.value==='Blunt') this.openCostophrenicAngles=true;
    else this.openCostophrenicAngles=false;
  }

  private getSafeUrl(blob: Blob): any {
    const unsafeUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  onClick(patientForm:NgForm){
    if(patientForm.invalid){
      this.openDialog('fields');
      return
    }
    this.showPreview=true;
    this.businessData.savePatientData(patientForm.value);
    this.businessData.getPdf().subscribe(
      pdfBlob => {

        // first save data then generate PDF
        this.businessData.saveDataToDB().subscribe((res)=>{
            // console.log(res);
            this.pdfUrl = this.getSafeUrl(pdfBlob);
            this.onPdfLoad();
        },
        error => {
          this.showPreview=false;
          this.openDialog('pdfError');
        });

        // window.open(this.pdfUrl.changingThisBreaksApplicationSecurity, '_blank'); 
      },
      error => {
        this.showPreview=false;
        this.openDialog('pdfError');
      }
    );
    
  }

  openDialog(mesg:any){
    let dialogRef=this.dialog.open(AlertComponent,{
      width:'auto',
      height:'auto',
      data:{msg:mesg},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==='reset'){
        document.body.removeChild(this.iframe);
        this.onReset();
      }
    });
  }
  iframe:any;

  onPdfLoad(): void {
    this.iframe = document.createElement('iframe');
    this.iframe.style.visibility = 'hidden';
    this.iframe.src = this.pdfUrl.changingThisBreaksApplicationSecurity;
    document.body.appendChild(this.iframe);

    this.iframe.onload = () => {
      this.iframe.contentWindow?.print();
      setTimeout(() => {
        this.showPreview=false;
      }, 2000);
      setTimeout(() => {
        this.openDialog('reset');
      }, 5000);
    };

  }

  onReset(){
    this.showPreview=false;
    this.patientForm.reset();
    this.openfirst=false;
    this.openHilum=false;
    this.openMasses=false;
    this.openCavity=false;
    this.openOpacity=false;
    this.openTrachea=false;
    this.openMedia=false;
    this.openCardic=false;
    this.openAortic=false;
    this.openPneumothorax=false;
    this.fracture=false;
    this.openbony=false;
    this.openBonyCage=false;
    this.openBreastShadow=false;
    this.openDiaphragm=false;
    this.openSoftTissue=false;
    this.openCostophrenicAngles=false;
    this.openCardicShaped=false;
    this.ribnumber=false;
    this.fileName='';
    // document.body.removeChild(this.iframe);
  }

  onImageUpload(event:any){
    console.log(event);
    if(event.srcElement.files.length!=0){
      this.fileName=event.srcElement.files[0].name;
      const file: File = event.target.files[0];
      this.patientForm.value['image']=file;
    }
    else{
      this.fileName='';
    }
  }


}
