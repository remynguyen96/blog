import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title as TitleCategory, Meta } from "@angular/platform-browser";
import { routerTransition } from "../../global-shared/global.animation";
import { CategoryService } from "../shared/category.service";
import { Observable } from "rxjs/Rx";
import { AnonymousSubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations : [routerTransition()],
  host:{'[@routerTransition]' : ''}
})
export class CategoriesComponent implements OnInit, OnDestroy {
  ticketCount:number = 0;

  private posts: any = [];

  private post : any = {
    title : ''
  };

  private timerSubscription: AnonymousSubscription;

  private postsSubscription: AnonymousSubscription;

  constructor(
    private titleService : TitleCategory,
    private metaService : Meta,
    private _categoryService : CategoryService
  ) {
      titleService.setTitle('Category Infomation');
      metaService.addTags([
        {name: 'author', content: 'Remy Nguyen'},
        {name: 'keywords', content: 'Category infomation for blogs'},
        {name: 'description', content: 'This is categories page !'},
      ]);
  }

  ngOnInit() {
    this.refreshData();

    this._categoryService.totalTicketCount.subscribe(totalTicketCount => {
        this.ticketCount = totalTicketCount
    });
  }

  ngOnDestroy() {
      if (this.postsSubscription) {
          this.postsSubscription.unsubscribe();
      }
      if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
      }
  }

  bookShow = () => {
       let ticketCount = this.ticketCount - 1;

       this._categoryService.totalTicketCount.next(ticketCount);
   }
  ////////////////////////////////////////////////////

   public save(): void {
       this._categoryService.save(this.post)
           .subscribe(post => {
               this.posts.unshift(post);
           });
      this.post.title = '';
   }

   public deletePost(postToDelete: any, event: any): void {
       event.stopPropagation();
       this._categoryService.delete(postToDelete).subscribe(() => {
           this.posts = this.posts.filter((post: any) => post.id !== postToDelete.id);
       });
   }


   private refreshData(): void {
       this.postsSubscription = this._categoryService.getAll().subscribe(posts => {
           this.posts = posts;
           this.subscribeToData();
       });
   }

   private subscribeToData(): void {
       this.timerSubscription = Observable.timer(2000).first().subscribe(() => this.refreshData());
   }


   public toAlias(str) {
       str = str.toLowerCase();
       str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
       str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
       str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
       str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
       str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
       str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
       str = str.replace(/đ/g, "d");
       str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
       str = str.replace(/-+-/g, "-");
       str = str.replace(/^\-+|\-+$/g, "");
       return str;
   }

}
