import {Injectable} from '@angular/core';

export interface Menu{
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {state: 'dashboard', name: 'Інформаційна панель', icon: 'dashboard', role: ''},
  {state: 'admins', name: 'Адміністратори', icon: 'person_icon', role: '3'},
  {state: 'students', name: 'Студенти', icon: 'group_icon', role: '3'},
  {state: 'teachers', name: 'Викладачі', icon: 'group_icon', role: '3'},
  {state: 'speciality', name: 'Групи', icon: 'layers_icon', role: '3'},
  {state: 'directionofthesis', name: 'Напрямки', icon: ' dvr_icon', role: '3'},
  {state: 'studentChoosePractice', name: 'Обрати Тему', icon: ' assignment_icon', role: '1'},
  {state: 'directionForStudent', name: 'Запропонувати Тему', icon: ' layers_icon', role: '1'},
  {state: 'studenttasks', name: 'Календарний План', icon: ' developer_board_icon', role: '1'},
  {state: 'studentResultFileReport', name: 'Звіт (Керівнику)', icon: ' file_copy_icon', role: '1'},
  {state: 'studentResultFileDiary', name: 'Щоденник (Керівнику)', icon: ' insert_drive_file_icon', role: '1'},
  {state: 'topicProposole', name: 'Запропоновані Теми', icon: ' layers_icon', role: '2'},
  {state: 'diplomapractice', name: 'Ваші Теми', icon: ' developer_board_icon', role: '2'},
  {state: 'teacherPractice', name: 'Обрані Теми', icon: ' assignment_icon', role: '2'},
  {state: 'tasks', name: 'Ключові етапи', icon: ' developer_board_icon', role: ''},
  {state: 'files', name: 'Матеріали', icon: ' file_copy_icon', role: ''},
  {state: 'result_files_practice', name: 'Документи Студентів', icon: ' file_copy_icon', role: '3'},
  {state: 'result_files_practice', name: 'Сдача Документів', icon: ' file_copy_icon', role: '1'}
];



@Injectable()
export class MenuItems {
  geMenuitem(): Menu[]{
    return MENUITEMS;
  }
}

