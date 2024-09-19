import {Injectable} from '@angular/core';

export interface Menu{
  state: string;
  name: string;
  variable_name: string;
  role: string;
}

const DASHBOARDITEMS = [
  {state: '/main/directionofthesis', name: 'Кількість напрямків:', variable_name: 'directionofthesisCount', role: '3'},
  {state: '/main/speciality', name: 'Кількість груп:', variable_name: 'specialityCount', role: '3'},
  {state: '/main/teacherPractice', name: 'Кількість практик студентів:', variable_name: 'practiceCount', role: 'not_exist'},
  {state: '/main/studenttasks', name: 'Загальна кількість етапів:', variable_name: 'tasksCount', role: '1'},
  {state: '/main/studenttasks', name: 'Кількість завершених етапів:', variable_name: 'completeTasksCount', role: '1'},
  {state: '/main/teacherPractice', name: 'Кількість практик студентів:', variable_name: 'practiceCount', role: 'not_exist'},
  {state: '/main/diplomapractice', name: 'Кількість Необраних Тем:', variable_name: 'newThemeCount', role: '2'},
  {state: '/main/teacherPractice', name: 'Кількість Обраних Тем:', variable_name: 'practiceCount', role: '2'}
];

@Injectable()
export class DashboardItems {
  geDashboarditem(): Menu[]{
    return DASHBOARDITEMS;
  }
}
