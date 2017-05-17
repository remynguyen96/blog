import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
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
    private _categoryService : CategoryService
  ) {
    titleService.setTitle('Create New Category For Blog');
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
