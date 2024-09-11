import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ManageAdminComponent} from './manage-admin/manage-admin.component';
import {RouteGuardService} from '../services/route-guard.service';
import {ManageStudentComponent} from './manage-student/manage-student.component';
import {ManageTeacherComponent} from './manage-teacher/manage-teacher.component';
import {ManageSpecialityComponent} from "./manage-speciality/manage-speciality.component";
import {ManageDirectionofthesisComponent} from "./manage-directionofthesis/manage-directionofthesis.component";
import {ManageDiplomaPracticeComponent} from "./manage-diploma-practice/manage-diploma-practice.component";



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
  }
];
