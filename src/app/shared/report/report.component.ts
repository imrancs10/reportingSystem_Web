import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from 'src/app/_alert';
import { BussinessService } from 'src/app/services/bussiness.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('dicomCanvas') dicomCanvas!: ElementRef;
  cornerstone: any;
  cornerstoneWADOImageLoader: any;
  file: any;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  model: any = {
    "mobileNo": null,
    "gender": "",
    "age": "",
    "CardiacShape": "",
    "BronchoVascularMarking": "",
    "BronchoVascularMarkingSide": "",
    "BronchoVascularMarkingRegion": "",
    "opacity": "",
    "opacitySide": "",
    "opacityRegion": "",
    "cavity": "",
    "cavitySide": "",
    "cavityRegion": "",
    "massesSide": "",
    "masses": "",
    "massesRegion": "",
    "hilum": "",
    "hilumSide": '',
    "trachea": "",
    "tracheaShiftSide": "",
    "mediastinal": "",
    "mediastinalShiftSide": "",
    "CardiacSize": "",
    "CardiacShapeAbnormal": "",
    "BreastShadow": "",
    "BreastShadowSide": "",
    "HemiDiaphragm": "",
    "HemiDiaphragmSide": "",
    "HemiDiaphragmAbormal": "",
    "SoftTissue": "",
    "SoftTissueSide": "",
    "FractureRibNumber": null,
    "Bonylesion": "",
    "FractureSide": "",
    "Finding": "",
    "BonyCage": "",
    "BonyCageSide": "",
    "Pneumothorax": "",
    "PneumothoraxSide": "",
    "CostophrenicAngles": "",
    "CostophrenicAnglesSide": "",
    "LymphNodes": "",
    "AorticKnuckleAbnormal": "",
    "AorticKnuckle": "",
    "ProminentHilumSpecify": "",
    "AorticKnuckleCalcification": "",
    "AorticKnuckleUnfoldingofAorta": "",
    "SoftTissueAbnormal": "",
    "BreastShadowAbnormal": "",
    "orgLogoName": "",
    "showHeader": true,
    "orgName": "",
    "XRayReportFileName": "",
    "XRayReportBase64": "",
  };

  @ViewChild('patientForm') patientForm!: NgForm;
  openfirst: boolean = false;
  openHilum: boolean = false;
  openMasses: boolean = false;
  openCavity: boolean = false;
  openOpacity: boolean = false;
  openTrachea: boolean = false;
  openMedia: boolean = false;
  openCardic: boolean = false;
  openAortic: boolean = false;
  openPneumothorax: boolean = false;
  fracture: boolean = false;
  openbony: boolean = false;
  openBonyCage: boolean = false;
  openBreastShadow: boolean = false;
  openDiaphragm: boolean = false;
  openSoftTissue: boolean = false;
  openCostophrenicAngles: boolean = false;
  openCardicShaped: boolean = false;
  ribnumber: boolean = false;
  pdfUrl: any;
  maxdate: any;
  mindate: any;
  date:any;
  fileName: any = '';
  CardiacShape: any = "";
  BronchoVascularMarking = "";
  BronchoVascularMarkingSide = ""
  BronchoVascularMarkingRegion = "";
  isLungFieldFinding: any = 'Nil';
  isMediastinumFinding: any = 'Nil';
  isCadiacInfoFinding: any = 'Nil';
  isPleuraInfomationFinding: any = 'Nil';
  isChestWallInfoFinding: any = 'Nil';
  opacity = "";
  opacitySide = "";
  opacityRegion = "";
  cavity = "";
  cavitySide = "";
  cavityRegion = "";
  massesSide = "";
  masses = "";
  massesRegion = "";
  hilum = "";
  hilumSide: any = '';
  trachea = "";
  tracheaShiftSide = "";
  mediastinal = "";
  mediastinalShiftSide = "";
  CardiacSize = "";
  CardiacShapeAbnormal = "";
  BreastShadow = "";
  BreastShadowSide = ""
  HemiDiaphragm = "";
  HemiDiaphragmSide = "";
  HemiDiaphragmAbormal = "";
  SoftTissue = "";
  SoftTissueSide = "";
  FractureRibNumber = "";
  Bonylesion = "";
  FractureSide = "";
  Finding = "";
  BonyCage = "";
  BonyCageSide = "";
  Pneumothorax = "";
  PneumothoraxSide = "";
  CostophrenicAngles = "";
  CostophrenicAnglesSide = "";
  LymphNodes = "";
  AorticKnuckleAbnormal = "";
  AorticKnuckle = "";
  ProminentHilumSpecify = "";
  AorticKnuckleCalcification = "";
  AorticKnuckleUnfoldingofAorta = "";
  SoftTissueAbnormal = "";
  BreastShadowAbnormal = "";
  showPreview: boolean = false;

  orgName: string | null = "";
  logoName: string | null = "";
  xrayImage: any = "";
  constructor(
    public dialog: MatDialog,
    public businessData: BussinessService,
    private sanitizer: DomSanitizer,
    protected alertService: AlertService
  ) {
    let todayDate = new Date();
    this.maxdate = todayDate;
    this.model.date=todayDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.date=new Date();
    let todayDate = new Date();
    // this.mindate = todayDate;
    this.maxdate = todayDate;
    
    this.orgName = sessionStorage.getItem("Name");
    this.logoName = "http://api.imgdotpix.in/OrganizationLogo/" + sessionStorage.getItem("orgLogoName");
  }
  onFilechange(event: any) {
    if (!event.target.files) {
      this.alertService.error("Please Upload XRay Report", this.options);
      this.xrayImage = '';
      return;
    }
    // console.log(event.target.files[0]);
    this.file = event.target.files[0];
    let fileType = this.file.name.split('.')[1];
    // console.log(fileType.toString().toUpperCase());

    //  for diacom image

    // if (fileType.toString().toLowerCase() === "dicom") {
    //   this.xrayImage='';
    //   const element = this.dicomCanvas.nativeElement;
    //   this.cornerstone.enable(element);

    //   this.cornerstoneWADOImageLoader.external.cornerstone = this.cornerstone;

    //   const imageId = this.cornerstoneWADOImageLoader.wadouri.fileManager.add(this.file);
    //   this.cornerstone.loadImage(imageId).then((image:any) => {
    //     this.cornerstone.displayImage(element, image);
    //   });
    //   return;
    // }
    if (this.file.type != "image/jpeg") {
      this.alertService.error("Invalid File Format. Please Choose JPEG format", this.options);
      event.target.value = '';
      this.file = '';
      this.xrayImage = '';
      return;
    }

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.xrayImage = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
    // console.log("x-ray image base 64", this.xrayImage);

    // let ImageUrl: any = "";
    // var reader = new FileReader();
    // reader.onload = (event: any) => {
    //   ImageUrl = event.target.result;
    //   var image = new Image();
    //   image.src = ImageUrl;//"data:image/jpg;base64," + data.d;

    //   var w = window.open("");
    //   w?.document.write(image.outerHTML);
    // }
    // reader.readAsDataURL(this.file);

  }


  onCardiacSizeChanged(event: any) {
    // console.log(event);

    if (event.target.value === 'Enlarged') { this.openCardicShaped = true; console.log('enlarged'); }

    this.openCardicShaped = false;
  }

  onChangeBroncho(event: any) {
    if (event.target.value === 'Prominent') this.openfirst = true;
    else this.openfirst = false;
  }
  onCavity(event: any) {
    if (event.target.value === 'Present') this.openCavity = true;
    else this.openCavity = false;
  }
  onMasses(event: any) {
    if (event.target.value === 'Present') this.openMasses = true;
    else this.openMasses = false;
  }

  onHilum(event: any) {
    if (event.target.value === 'Prominent') this.openHilum = true;
    else this.openHilum = false;
  }
  onOpacity(event: any) {
    if (event.target.value === 'Present') this.openOpacity = true;
    else this.openOpacity = false;
  }
  onTrachea(event: any) {
    if (event.target.value === 'Shift') this.openTrachea = true;
    else this.openTrachea = false;
  }
  onMediastinal(event: any) {
    if (event.target.value === 'Shift') this.openMedia = true;
    else this.openMedia = false;
  }
  onCardicShapeAbnormal(event: any) {
    if (event.target.value === 'Abnormal') this.openCardic = true;
    else this.openCardic = false;
  }
  onAortic(event: any) {
    if (event.target.value === 'Prominent') this.openAortic = true;
    else this.openAortic = false;
  }
  onPneumothorax(event: any) {
    if (event.target.value === 'Present') this.openPneumothorax = true;
    else this.openPneumothorax = false;
  }

  onFinding(event: any) {
    if (event.target.value === 'Fracture') {
      this.fracture = true;
      this.openbony = false;
      this.ribnumber = false;
    }
    else if (event.target.value === "Bony Lesion") {
      this.openbony = true;
      this.fracture = false;
      this.ribnumber = false;
    }
    else if (event.target.value === "Dysplasia of Ribs") {
      this.openbony = false;
      this.fracture = false;
      this.ribnumber = true;
    }
    else {
      this.openbony = false;
      this.fracture = false;
      this.ribnumber = false;
    }
  }

  onBonyCage(event: any) {
    if (event.target.value === 'Abnormal') this.openBonyCage = true;
    else this.openBonyCage = false;
  }

  onDiaphragm(event: any) {
    if (event.target.value === 'Abnormal') this.openDiaphragm = true;
    else this.openDiaphragm = false;
  }

  onBreastShadow(event: any) {
    if (event.target.value === 'Abnormal') this.openBreastShadow = true;
    else this.openBreastShadow = false;
  }

  onSoftTissue(event: any) {
    if (event.target.value === 'Abnormal') this.openSoftTissue = true;
    else this.openSoftTissue = false;
  }

  onCostophrenicAngles(event: any) {
    if (event.target.value === 'Blunt') this.openCostophrenicAngles = true;
    else this.openCostophrenicAngles = false;
  }

  private getSafeUrl(blob: Blob): any {
    const unsafeUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

  newSetValues() {
    if (this.isLungFieldFinding === 'Nil') {
      this.model.BronchoVascularMarking = 'Normal';
      this.model.BronchoVascularMarkingRegion = '';
      this.model.BronchoVascularMarkingSide = '';
      this.model.opacity = 'Nil';
      this.model.opacityRegion = '';
      this.model.opacitySide = '';
      this.model.cavity = 'Nil';
      this.model.cavitySide = '';
      this.model.cavityRegion = '';
      this.model.masses = 'Nil';
      this.model.massesRegion = '';
      this.model.massesSide = '';
      this.model.hilum = 'Normal';
      this.model.hilumSide = 'Bilateral';
      this.model.ProminentHilumSpecify = '';
    }
    if (this.isMediastinumFinding === 'Nil') {
      this.model.trachea = 'Central';
      this.model.tracheaShiftSide = '';
      this.model.mediastinal = 'Nil';
      this.model.mediastinalShiftSide = '';
      this.model.LymphNodes = 'Nil';
    }
    if (this.isCadiacInfoFinding === 'Nil') {
      this.model.CardiacSize = 'Nil';
      this.model.CardiacShape = 'Normal';
      this.model.CardiacShapeAbnormal = '';
      this.model.AorticKnuckle = 'Nil';
      this.model.AorticKnuckleAbnormal = 'Nil';
      this.model.AorticKnuckleCalcification = 'Nil';
      this.model.AorticKnuckleUnfoldingofAorta = 'Nil';
    }
    if (this.isPleuraInfomationFinding === 'Nil') {
      this.model.CostophrenicAnglesSide = 'both';
      this.model.CostophrenicAngles = 'Normal';
      this.model.Pneumothorax = 'Nil';
      this.model.PneumothoraxSide = '';
    }
    if (this.isChestWallInfoFinding === 'Nil') {
      this.model.BonyCage = 'Nil';
      this.model.BonyCageSide = '';
      this.model.Finding = '';
      this.model.SoftTissue = 'Normal';
      this.model.SoftTissueAbnormal = '';
      this.model.SoftTissueSide = '';
      this.model.FractureRibNumber = null;
      this.model.FractureSide = '';
      this.model.HemiDiaphragm = 'Normal';
      this.model.HemiDiaphragmAbormal = '';
      this.model.HemiDiaphragmSide = 'Bilateral';
      this.model.BreastShadow = 'Nil';
      this.model.BreastShadowAbnormal = '';
      this.model.BreastShadowSide = 'Bilateral';
      this.model.Bonylesion = '';
    }
  }

  saveReport(patientForm: NgForm) {
    this.newSetValues();
    if (patientForm.invalid) {
      this.openDialog('fields');
      return
    }
    if(this.model.mobileNo.toString().length!=10){
      
      // console.log(this.model.mobileNo.toString().length);
      this.openDialog('mobile');
      return
    }
    // console.log(this.model);
    this.showPreview = true;
    this.model.orgLogoName = sessionStorage.getItem('orgLogoName');
    this.model.showHeader = sessionStorage.getItem('showHeader') == 'true';
    this.model.orgName = sessionStorage.getItem("Name");

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      //console.log(reader.result);
      this.model.XRayReportFileName = this.file.name;
      this.model.XRayReportBase64 = typeof reader.result == 'string' ? reader.result : '';
      this.businessData.saveDataToDB(this.model).subscribe((response) => {
        this.pdfUrl = this.getSafeUrl(response);
        this.onPdfLoad();
        this.showPreview = false;
      },
        error => {
          this.showPreview = false;
          this.openDialog('pdfError');
        });
    };
  }

  openInNewPortal() {
    // Open the x-ray image in a new window or tab
    if (this.xrayImage) {
      let ImageUrl: any = "";
      var reader = new FileReader();
      reader.onload = (event: any) => {
        ImageUrl = event.target.result;
        var image = new Image();
        image.src = ImageUrl;//"data:image/jpg;base64," + data.d;

        var w = window.open("");
        w?.document.write(image.outerHTML);
      }
      reader.readAsDataURL(this.file);
    }
  }

  openDialog(mesg: any) {
    let dialogRef = this.dialog.open(AlertComponent, {
      width: 'auto',
      height: 'auto',
      data: { msg: mesg },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reset') {
        document.body.removeChild(this.iframe);
        this.onReset();
      }
      // else if (result === 'showReport') {
      //   var reportPath = "http://api.imgdotpix.in/XRayReport/" + this.model.uhid + ".jpeg";
      //   window.open(reportPath);
      // }
    });
  }
  iframe: any;

  onPdfLoad(): void {
    this.iframe = document.createElement('iframe');
    this.iframe.style.visibility = 'hidden';
    this.iframe.src = this.pdfUrl.changingThisBreaksApplicationSecurity;
    document.body.appendChild(this.iframe);

    this.iframe.onload = () => {
      this.iframe.contentWindow?.print();
      setTimeout(() => {
        this.showPreview = false;
      }, 2000);
      setTimeout(() => {
        this.openDialog('reset');
      }, 5000);
    };

  }

  onReset() {
    this.file = '';
    this.xrayImage = '';
    this.showPreview = false;
    this.openfirst = false;
    this.openHilum = false;
    this.openMasses = false;
    this.openCavity = false;
    this.openOpacity = false;
    this.openTrachea = false;
    this.openMedia = false;
    this.openCardic = false;
    this.openAortic = false;
    this.openPneumothorax = false;
    this.fracture = false;
    this.openbony = false;
    this.openBonyCage = false;
    this.openBreastShadow = false;
    this.openDiaphragm = false;
    this.openSoftTissue = false;
    this.openCostophrenicAngles = false;
    this.openCardicShaped = false;
    this.ribnumber = false;
    this.fileName = '';
    this.isLungFieldFinding = 'Nil';
    this.isMediastinumFinding = 'Nil';
    this.isCadiacInfoFinding = 'Nil';
    this.isPleuraInfomationFinding = 'Nil';
    this.isChestWallInfoFinding = 'Nil';
    let todayDate = new Date();
    this.maxdate = todayDate;
    this.model.date=todayDate.toISOString().split('T')[0];
    this.model.fullName='';
    this.model.uhid='';
    this.model.refby='';
    this.model.gender='';
    this.model.age='';
    this.model.mobileNo=null;
    this.patientForm.controls['uhid'].markAsUntouched();
    this.patientForm.controls['fullName'].markAsUntouched();
    this.patientForm.controls['refby'].markAsUntouched();
    this.patientForm.controls['age'].markAsUntouched();
    this.patientForm.controls['gender'].markAsUntouched();
    this.patientForm.controls['mobileNo'].markAsUntouched();
    this.patientForm.controls['XRayReportFileName'].markAsUntouched();
    this.model.XRayReportFileName = ''
  }

  onImageUpload(event: any) {
    // console.log(event);
    if (event.srcElement.files.length != 0) {
      this.fileName = event.srcElement.files[0].name;
      const file: File = event.target.files[0];
      this.patientForm.value['image'] = file;
    }
    else {
      this.fileName = '';
    }
  }

  onOptionChange() {
    // console.log(this.isLungFieldFinding);
    if (this.isLungFieldFinding === 'Nil') {
      this.model.BronchoVascularMarking = 'Normal';
      this.model.BronchoVascularMarkingRegion = '';
      this.model.BronchoVascularMarkingSide = '';
      this.model.opacity = 'Nil';
      this.model.opacityRegion = '';
      this.model.opacitySide = '';
      this.model.cavity = 'Nil';
      this.model.cavitySide = '';
      this.model.cavityRegion = '';
      this.model.masses = 'Nil';
      this.model.massesRegion = '';
      this.model.massesSide = '';
      this.model.hilum = 'Normal';
      this.model.hilumSide = 'Bilateral';
      this.model.ProminentHilumSpecify = '';
    }
    else {
      this.model.BronchoVascularMarking = "Normal";
      this.model.BronchoVascularMarkingRegion = '';
      this.model.BronchoVascularMarkingSide = '';
      this.model.opacity = "Nil";
      this.model.opacityRegion = '';
      this.model.opacitySide = '';
      this.model.cavity = "Nil";
      this.model.cavitySide = '';
      this.model.cavityRegion = '';
      this.model.masses = "Nil";
      this.model.massesRegion = '';
      this.model.massesSide = '';
      this.model.hilum = "Normal";
      this.model.hilumSide = "Bilateral";
      this.model.ProminentHilumSpecify = '';
    }
  }
  onOptionChangeMediastinum() {
    if (this.isMediastinumFinding === 'Nil') {
      this.model.trachea = 'Central';
      this.model.tracheaShiftSide = '';
      this.model.mediastinal = 'Nil';
      this.model.mediastinalShiftSide = '';
      this.model.LymphNodes = 'Nil';
    }
    else {
      this.model.trachea = "Central";
      this.model.tracheaShiftSide = '';
      this.model.mediastinal = 'Nil';
      this.model.mediastinalShiftSide = '';
      this.model.LymphNodes = 'Nil';
    }
  }
  onOptionChangeCadiacInfo() {
    if (this.isCadiacInfoFinding === 'Nil') {
      this.model.CardiacSize = 'Nil';
      this.model.CardiacShape = 'Normal';
      this.model.CardiacShapeAbnormal = '';
      this.model.AorticKnuckle = 'Nil';
      this.model.AorticKnuckleAbnormal = 'Nil';
      this.model.AorticKnuckleCalcification = 'Nil';
      this.model.AorticKnuckleUnfoldingofAorta = 'Nil';
    }
    else {
      this.model.CardiacSize = 'Nil';
      this.model.CardiacShape = 'Normal';
      this.model.CardiacShapeAbnormal = '';
      this.model.AorticKnuckle = 'Nil';
      this.model.AorticKnuckleAbnormal = 'Nil';
      this.model.AorticKnuckleCalcification = 'Nil';
      this.model.AorticKnuckleUnfoldingofAorta = 'Nil';
    }
  }
  onOptionChangePleuraInfomation() {
    if (this.isPleuraInfomationFinding === 'Nil') {
      this.model.CostophrenicAnglesSide = 'both';
      this.model.CostophrenicAngles = 'Normal';
      this.model.Pneumothorax = 'Nil';
      this.model.PneumothoraxSide = '';
    }
    else {
      this.model.CostophrenicAnglesSide = 'both';
      this.model.CostophrenicAngles = 'Normal';
      this.model.Pneumothorax = 'Nil';
      this.model.PneumothoraxSide = '';
    }
  }
  onOptionChangeChestWallInfo() {
    if (this.isChestWallInfoFinding === 'Nil') {
      this.model.BonyCage = 'Nil';
      this.model.BonyCageSide = '';
      this.model.Finding = '';
      this.model.SoftTissue = 'Normal';
      this.model.SoftTissueAbnormal = '';
      this.model.SoftTissueSide = '';
      this.model.FractureRibNumber = null;
      this.model.FractureSide = '';
      this.model.HemiDiaphragm = 'Normal';
      this.model.HemiDiaphragmAbormal = '';
      this.model.HemiDiaphragmSide = 'Bilateral';
      this.model.BreastShadow = 'Nil';
      this.model.BreastShadowAbnormal = '';
      this.model.BreastShadowSide = 'Bilateral';
      this.model.Bonylesion = '';
    }
    else {
      this.model.BonyCage = 'Nil';
      this.model.BonyCageSide = '';
      this.model.Finding = '';
      this.model.SoftTissue = 'Normal';
      this.model.SoftTissueAbnormal = '';
      this.model.SoftTissueSide = '';
      this.model.FractureRibNumber = null;
      this.model.FractureSide = '';
      this.model.HemiDiaphragm = 'Normal';
      this.model.HemiDiaphragmAbormal = '';
      this.model.HemiDiaphragmSide = 'Bilateral';
      this.model.BreastShadow = 'Nil';
      this.model.BreastShadowAbnormal = '';
      this.model.BreastShadowSide = 'Bilateral';
      this.model.Bonylesion = '';
    }
  }
}
