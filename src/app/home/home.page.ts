import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd,ActivatedRoute, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../logout-confirmation-dialog/logout-confirmation-dialog.component';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnDestroy {

  scannedResult: any;
  fechaHoy: string = '';
  readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);  
  userName: string = '';
  content_visibility= 'show';


  user= {
    email: '',
    password: ''
  }

  constructor(
    private activeroute: ActivatedRoute,
    private storage: Storage)
    
    {
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras && navigation.extras.state) {
        this.userName = navigation.extras.state['userName'];
      } else {
        this.userName = ''; 
      }
    });
  }
  

  ngOnInit() {
    const fecha = new Date();
    this.fechaHoy = fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString();
  }



  SalirLogin(): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
      width: '250px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['acceso']); 
      }
    });
  }

  async checkPermission(){
    try{
      const status = await BarcodeScanner.checkPermission({ force: true});
      if (status.granted) {
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
      return false;
    }
  }

  async startScan(){
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = '';
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    } 
  }

  stopScan() {

    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.add('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
    
  }

}