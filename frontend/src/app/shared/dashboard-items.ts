import {Injectable} from '@angular/core';

export interface Menu{
  state: string;
  name: string;
  variable_name: string;
  role: string;
}

const DASHBOARDITEMS = [
  {state: '/main/directionofthesis', name: 'Кількість напрямків:', variable_name: 'directionofthesisCount', role: '3'},
  {state: '/main/speciality', name: 'Кількість спеціальностей:', variable_name: 'specialityCount', role: '3'},
  {state: '/main/diplomapractice', name: 'Кількість активних практик:', variable_name: 'diplomapracticeCount', role: '3'},
  {state: '/main/studenttasks', name: 'Занальна кількість тасків:', variable_name: 'tasksCount', role: '1'},
  {state: '/main/studenttasks', name: 'Кількість виконаних тасків:', variable_name: 'completeTasksCount', role: '1'},
  {state: '/main/teacherPractice', name: 'Кількість практик студентів:', variable_name: 'practiceCount', role: 'not_exist'},
  {state: '/main/teacherPractice', name: 'Кількість практик студентів:', variable_name: 'practiceCount', role: '2'}
];

@Injectable()
export class DashboardItems {
  geDashboarditem(): Menu[]{
    return DASHBOARDITEMS;
  }
}
