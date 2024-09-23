import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {ScnackbarService} from "../../../services/scnackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {jwtDecode} from "jwt-decode";
import {GlobalConstants} from "../../../shared/global-constants";
import {DirectionofthesisService} from "../../../services/directionofthesis.service";
import {DiplomaPracticeService} from "../../../services/diploma-practice.service";

@Component({
  selector: 'app-topic-proposal',
  templateUrl: './topic-proposal.component.html',
  styleUrls: ['./topic-proposal.component.scss']
})
export class TopicProposalComponent implements OnInit {

  topicForm: any = FormGroup;
  responseMesssage: any;
  constructor(private formBuilder: FormBuilder,
              private diplomaService: DiplomaPracticeService,
              private scnackbarService: ScnackbarService,
              private dialogRef: MatDialogRef<TopicProposalComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {

  }

  ngOnInit(): void {
    this.topicForm = this.formBuilder.group({
      description: [null, [Validators.required]]
    });
  }
  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Сбрасываем высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем высоту в соответствии с содержимым
  }

  handleSubmit(): any{
    const formData = this.topicForm.value;
    const data = {
      description: formData.description,
      student_login: this.dialogData.student_login,
      direction_id: this.dialogData.direction_id
    };
    console.log(data);
    this.diplomaService.topicProposal(data).subscribe(
      (response: any): any => {
        this.scnackbarService.openSnackBar('Тему успішно запропоновано', '');
        this.dialogRef.close();
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: { error: { message: any; }; }) => {
        if (error.error?.message) {
          this.responseMesssage = error.error?.message;
        } else {
          this.responseMesssage = GlobalConstants.genericError;
        }
        this.scnackbarService.openSnackBar(this.responseMesssage, GlobalConstants.error);
      }
    );
  }

}
