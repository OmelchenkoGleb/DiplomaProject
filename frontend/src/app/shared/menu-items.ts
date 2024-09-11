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
  {state: 'speciality', name: 'Спеціальності', icon: 'layers_icon', role: '3'},
  {state: 'directionofthesis', name: 'Напрямки практики', icon: ' dvr_icon', role: '3'},
  {state: 'diplomapractice', name: 'Практика', icon: ' developer_board_icon', role: '3'}
];

@Injectable()
export class MenuItems {
  geMenuitem(): Menu[]{
    return MENUITEMS;
  }
}
