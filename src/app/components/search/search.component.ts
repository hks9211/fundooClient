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
}
