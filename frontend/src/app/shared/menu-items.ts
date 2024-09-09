import {Injectable} from '@angular/core';

export interface Menu{
  state: string;
  name: string;
  icon: string;
  role: string;
}
const MENUITEMS = [
  {state: 'dashboard', name: 'Інформаційна панель', icon: 'dashboard', role: ''},
  {state: 'admins', name: 'Адміністратори', icon: 'person_add_icon', role: '3'},
  {state: 'students', name: 'Студенти', icon: 'contacts_icon', role: '3'},
  {state: 'teachers', name: 'Викладачі', icon: 'contacts_icon', role: '3'}
];

@Injectable()
export class MenuItems {
  geMenuitem(): Menu[]{
    return MENUITEMS;
  }
}
