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
      expectedRole: ['admin']
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
  }
];
