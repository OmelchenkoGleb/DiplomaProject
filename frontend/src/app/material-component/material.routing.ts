import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
import {RouteGuardService} from '../services/route-guard.service';
import {ManageStudentComponent} from './manage-student/manage-student.component';
import {ManageTeacherComponent} from './manage-teacher/manage-teacher.component';
import {ManageSpecialityComponent} from "./manage-speciality/manage-speciality.component";
import {ManageDirectionofthesisComponent} from "./manage-directionofthesis/manage-directionofthesis.component";
import {ManageDiplomaPracticeComponent} from "./manage-diploma-practice/manage-diploma-practice.component";
import {StudentViewTasksComponent} from "./student-view-tasks/student-view-tasks.component";
import {StudentViewResultfileComponent} from "./student-view-resultfile/student-view-resultfile.component";
import {StudentViewDiaryComponent} from "./student-view-diary/student-view-diary.component";
import {TeacherViewPracticeComponent} from "./teacher-view-practice/teacher-view-practice.component";
import {ChatViewComponent} from "./chat-view/chat-view.component";
import {StudentViewPracticeComponent} from "./student-view-practice/student-view-practice.component";
import {
  StudentViewDirectionofthesisComponent
} from "./student-view-directionofthesis/student-view-directionofthesis.component";
import {TeacherViewTopicProposalComponent} from "./teacher-view-topic-proposal/teacher-view-topic-proposal.component";
import {ManageAdminsTasksComponent} from "./manage-admins-tasks/manage-admins-tasks.component";
import {ManageAdminsFileComponent} from "./manage-admins-file/manage-admins-file.component";
import {ResultFilesPracticeComponent} from "./result-files-practice/result-files-practice.component";



export const MaterialRoutes: Routes = [
  {
    path: 'admins',
    component: ManageAdminComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'students',
    component: ManageStudentComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'tasks',
    component: ManageAdminsTasksComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student', 'admin', 'teacher']
    }
  },
  {
    path: 'files',
    component: ManageAdminsFileComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student', 'admin', 'teacher']
    }
  },
  {
    path: 'result_files_practice',
    component: ResultFilesPracticeComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student', 'admin']
    }
  },
  {
    path: 'teachers',
    component: ManageTeacherComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'speciality',
    component: ManageSpecialityComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'directionofthesis',
    component: ManageDirectionofthesisComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'diplomapractice',
    component: ManageDiplomaPracticeComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['teacher']
    }
  },
  {
    path: 'studenttasks',
    component: StudentViewTasksComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student']
    }
  },
  {
    path: 'studentChoosePractice',
    component: StudentViewPracticeComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student']
    }
  },
  {
    path: 'studentResultFileReport',
    component: StudentViewResultfileComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student']
    }
  },
  {
    path: 'studentResultFileDiary',
    component: StudentViewDiaryComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student']
    }
  },
  {
    path: 'teacherPractice',
    component: TeacherViewPracticeComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['teacher']
    }
  },
  {
    path: 'chat',
    component: ChatViewComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student']
    }
  },
  {
    path: 'directionForStudent',
    component: StudentViewDirectionofthesisComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['student']
    }
  },
  {
    path: 'topicProposole',
    component: TeacherViewTopicProposalComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['teacher']
    }
  }
];
