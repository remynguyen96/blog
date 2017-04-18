import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { routerTransition } from "../../global-shared/global.animation";
import { Router,ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
declare var $: any, document : any, FormData : any, FileReader : any, XMLHttpRequest : any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [routerTransition()],
  host:{ '[@routerTransition]' : ''},
})
export class SettingsComponent implements OnInit,OnDestroy {

  private pagin : number;
  private subscription : Subscription;

  constructor(
    private titleService : Title,
    private router : Router,
    private route : ActivatedRoute,
  ){
      titleService.setTitle('Setting Blog')
   }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(
      (queryParams : any) => {
        this.pagin = queryParams['pagination'];
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  paginate(){
    this.router.navigate(['/settings'],{
      queryParams : {'pagination' : ++this.pagin}
    });
  }







  // fileChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader : any = new FileReader();
  //     reader.onload = function (e : any) {
  //         $('#preview_img').attr('src', e.target.result);
  //     }
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  //   let Infofiles = this.fileImages.nativeElement;
  //   if (Infofiles.files && Infofiles.files[0]) {
  //       let file = Infofiles.files[0];
  //       return new Promise((resolve, reject) => {
  //             let formData  = new FormData(),
  //                 xhr = new XMLHttpRequest();
  //             xhr.onreadystatechange = () => {
  //                 if (xhr.readyState === 4) {
  //                     if (xhr.status === 200) {
  //                         resolve(JSON.parse(xhr.response));
  //                         console.log(JSON.parse(xhr.response));
  //                     } else {
  //                         reject(xhr.response);
  //                     }
  //                 }
  //             };
  //             formData.append('files', file, file.name);
  //             xhr.open('POST', `http://blog.app/api/upload-images`, true);
  //             xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
  //             xhr.send(formData);
  //       });
  //   }

}
