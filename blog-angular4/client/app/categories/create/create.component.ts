import { Component, OnInit } from '@angular/core';
import { Title , Meta } from "@angular/platform-browser";
import { CategoryService } from "../shared/category.service";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
   ticketCount:number = 0;

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private _categoryService : CategoryService
  ) {
    titleService.setTitle('Create New Category For Blog');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Create new category for blogs'},
      {name: 'description', content: 'This is create new category page !'},
    ]);
  }

  ngOnInit() {
    this._categoryService.totalTicketCount.subscribe(totalTicketCount => {
            this.ticketCount = totalTicketCount
    });
  }

  bookTicket = () => {
        this.ticketCount = this.ticketCount - 1;
        this._categoryService.totalTicketCount.next(this.ticketCount);
    };

}
