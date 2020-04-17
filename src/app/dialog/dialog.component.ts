import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  user= {username:'', password:'', remember:false};

  constructor(public dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

  }
  onSubmit(){
    console.log('User: ', this.user);
    this.dialogRef.close();
  }
}
