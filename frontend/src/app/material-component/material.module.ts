import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { ManageTeacherComponent } from './manage-teacher/manage-teacher.component';
import { ManageSpecialityComponent } from './manage-speciality/manage-speciality.component';
import { SpecialityComponent } from './dialog/speciality/speciality.component';
import { ManageDirectionofthesisComponent } from './manage-directionofthesis/manage-directionofthesis.component';
import { DirectionofthesisComponent } from './dialog/directionofthesis/directionofthesis.component';
import { DiplomaPracticeComponent } from './dialog/diploma-practice/diploma-practice.component';
import { ManageDiplomaPracticeComponent } from './manage-diploma-practice/manage-diploma-practice.component';
import { StudentViewTasksComponent } from './student-view-tasks/student-view-tasks.component';
import { StudentViewResultfileComponent } from './student-view-resultfile/student-view-resultfile.component';
import { UploadFileDocxComponent } from './dialog/upload-file-docx/upload-file-docx.component';
import { StudentViewDiaryComponent } from './student-view-diary/student-view-diary.component';
import { TeacherViewPracticeComponent } from './teacher-view-practice/teacher-view-practice.component';
import { TeacherPracticeMoreInformationComponent } from './dialog/teacher-practice-more-information/teacher-practice-more-information.component';
import { ManageTasksComponent } from './dialog/manage-tasks/manage-tasks.component';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { AddStudentComponent } from './dialog/add-student/add-student.component';
import { StudentViewPracticeComponent } from './student-view-practice/student-view-practice.component';
import {SharedModule} from "../shared/shared.module";
import { ChatToAdminsComponent } from './dialog/chat-to-admins/chat-to-admins.component';
import { StudentViewDirectionofthesisComponent } from './student-view-directionofthesis/student-view-directionofthesis.component';
import { TopicProposalComponent } from './dialog/topic-proposal/topic-proposal.component';
import { TeacherViewTopicProposalComponent } from './teacher-view-topic-proposal/teacher-view-topic-proposal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MaterialRoutes),
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CdkTableModule,
        SharedModule
    ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageAdminComponent,
    ManageStudentComponent,
    ManageTeacherComponent,
    ManageSpecialityComponent,
    SpecialityComponent,
    ManageDirectionofthesisComponent,
    DirectionofthesisComponent,
    DiplomaPracticeComponent,
    ManageDiplomaPracticeComponent,
    StudentViewTasksComponent,
    StudentViewResultfileComponent,
    UploadFileDocxComponent,
    StudentViewDiaryComponent,
    TeacherViewPracticeComponent,
    TeacherPracticeMoreInformationComponent,
    ManageTasksComponent,
    ChatViewComponent,
    AddStudentComponent,
    StudentViewPracticeComponent,
    ChatToAdminsComponent,
    StudentViewDirectionofthesisComponent,
    TopicProposalComponent,
    TeacherViewTopicProposalComponent
  ]
})
export class MaterialComponentsModule {}
