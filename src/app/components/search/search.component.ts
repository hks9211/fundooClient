import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ListGridViewService } from 'src/app/services/list-grid-view.service';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  items: any[];
  Search: any =" " ;
  constructor(private data: ListGridViewService,
    private noteServices: NoteServiceService,
    ) { }

  ngOnInit() {
    this.data.findMessage.subscribe(message  => {this.Search = message
    })
  }

  // getNotes() {  
  
  //   const reqData = {
  //     userId: localStorage.getItem('userId')
  //   };
  //   this.noteServices.getCards(reqData).subscribe(data => {
  //        this.items = [];
  //        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
  //          if (data["data"]['data'][i].isDeleted == false &&
  //          data["data"]['data'][i].isArchived == false) {
  //          this.items.push(data["data"]['data'][i])
  //        }
  //      }
  //      console.log("Search card array ",this.items)
        
  //      }, error => {
  //        console.log(error);
  //      })
  //    }
 
    
}
