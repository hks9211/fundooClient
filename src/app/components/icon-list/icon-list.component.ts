import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';
import { NoteServiceService } from 'src/app/services/noteSerives/note-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CollaboratorsComponent } from '../collaborators/collaborators.component';
import { HttpService } from 'src/app/services/http.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})
export class IconListComponent implements OnInit {

  constructor(
    private noteServices: NoteServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private http: HttpService,
  ) { }
  labels : any = [];
  isMenuOpen = false;
  open = false;
  date = new FormControl('');
  time = new FormControl('');
  checked = new FormControl(false);


  @Input() childMessage: any = "";
  @Input() userData;
  @Input() noteData;
  @Input() test: string;
  @Output() messageEvent = new EventEmitter<any>();
  @Output() reminderEvent = new EventEmitter<any>();
  @Output() setColorEvent = new EventEmitter<any>();
  @Output() updateColorEvent = new EventEmitter<any>();
  @Output() archiveEvent = new EventEmitter<any>();
  @Output() changeColorForEditCard = new EventEmitter<any>();
  @Output() sendDeletedNoteToTrashEvent = new EventEmitter<any>();
  @Output() sendDeletedNoteInfoEvent = new EventEmitter<any>();
  @Output() archiveFromCardEvent = new EventEmitter<any>();
  @Output() archiveFromCard = new EventEmitter<any>();
  @Output() reminderEventForCards = new EventEmitter<any>();
  @Output() updateLabelsEvent = new EventEmitter<any>();


  ngOnInit() {
    this.getLabels();
    
   }

  colorArray = [[
    { 'color': 'rgb(255, 255, 255)', 'name': 'White' },
    { 'color': 'rgb(242, 139, 130)', 'name': 'Red' },
    { 'color': 'rgb(251, 188, 4)', 'name': 'Orange' },
    { 'color': 'rgb(255, 244, 117)', 'name': 'Yellow' }],

  [{ 'color': 'rgb(204, 255, 144)', 'name': 'Green' },
  { 'color': 'rgb(167, 255, 235)', 'name': 'Teal' },
  { 'color': 'rgb(203, 240, 248)', 'name': 'Blue' },
  { 'color': 'rgb(174, 203, 250)', 'name': 'Darkblue' }],

  [{ 'color': 'rgb(215, 174, 251)', 'name': 'Purple' },
  { 'color': 'rgb(253, 207, 232)', 'name': 'Pink' },
  { 'color': 'rgb(230, 201, 168)', 'name': 'Brown' },
  { 'color': 'rgb(232, 234, 237)', 'name': 'Gray' }
  ]]


  addReminder() {
    const reminderData =  this.date.value.toLocaleDateString()+","+" "+ this.time.value
    
    console.log("reminder: ", reminderData)
     this.reminderEvent.emit(reminderData);
     this.reminderEventForCards.emit(reminderData);
  }

  archiveNewNote() {
    const archiveData = {
      '_id':this.userData._id,
      'isArchived': true
    }
 console.log("user data at icon",this.userData);
 console.log("update archive data at icon: ",archiveData);
 
this.noteServices.postUpdateNote(archiveData).subscribe(
      data => {
        this.snackBar.open("Archived","",{duration:1000})
        console.log("data after archive at card component",data);
            this.archiveFromCard.emit("done");

      },
      error => {
        this.snackBar.open("Archived failed","",{duration:1000})
        console.log("Error after archive at card component",error);
      }
    ) 

    // this.archiveEvent.emit(archiveData);
    // // this.archiveFromCardEvent.emit(archiveData);
    // this.archiveFromCard.emit(archiveData);
  }

  setColor(colorId) {
    this.setColorEvent.emit(colorId);
    this.changeColorForEditCard.emit(colorId);

    if (this.childMessage != "") {
      const updateColorData = {
        'noteId': this.childMessage,
        'color': colorId
      }
      this.noteServices.updateColor(updateColorData).subscribe(
        data => {
          console.log(' response: ', data);
          this.updateColorEvent.emit(colorId);
        },
        error => {
          console.log('error response: ', error);
        }
      );
    } else {
      console.log("not an update request");

    }
  }

  deleteNote() {
    var updateTrash = {};
    if (this.childMessage == "") {
      updateTrash = {
        '_id': this.childMessage,
        'isDeleted': true
      }
    } else {
      updateTrash = {
        '_id': this.childMessage,
        'isDeleted': true
      }
    }
    this.noteServices.postUpdateNote(updateTrash).subscribe(
      data => {
        console.log(' response: ', data);
        this.snackBar.open("Note Deleted", "", { duration: 1000 });
        this.sendDeletedNoteToTrashEvent.emit("done");
        this.sendDeletedNoteInfoEvent.emit("done");
      },
      error => {
        console.log('error response: ', error);
        this.snackBar.open("Note not Deleted", "", { duration: 1000 })
      }
    );
  }

  openCollabWindow(userData1){
    console.log(userData1)
    const dialogRef = this.dialog.open(CollaboratorsComponent, {
      autoFocus: false,
      data:this.userData
    });
  }

  getLabels(){
    this.http.getLabels('getLabels').subscribe(
     data => {
      // console.log("getLabel data: ",(data as any).response);
      this.labels = (data as any).response;
     },
     error => {
     console.log(error);
     }
    )
  }

  checkBoxClicked(item){
    console.log(this.userData);
    
    if(this.checked.value == false){
    console.log(this.checked.value);
    console.log(item);    
    
    const data = {
      '_id':item._id , 
      'noteId':this.userData._id,
      'labelData':{
        'labelName':item.labelName,
        'labelId':item._id
      }
    }
  this.noteServices.addLabelToNote(data).subscribe(
    data => {
      console.log("data after update label" , data);
      this.updateLabelsEvent.emit("done");
      
    },
    error => {
       console.log("data after error" , error);
    }
  )
    }
  }
}
