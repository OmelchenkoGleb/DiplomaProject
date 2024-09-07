export class GlobalConstants {
  // Message
  public static genericError = 'Something went wrong. Please try again later';

  public static unathorizaed = 'You are not authorized person to access this page';

  // Regex
  //   Name [a-zA-Z0-9 ]*
  //   Email [A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}
  //   Contact Number ^[e0-9]{10,10}$

  // public static nameRegex = '[a-zA-Z0-9 ]*';
  public static nameRegex = '^[a-zA-Zа-яА-ЯіїєґА-ЯІЇЄҐ\' -]+$';
  public static emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public static contactNumberRegex = '^[e0-9]{10,10}$';

  // Variable
  public static error = 'error';

  // Role Management
  public static roleDependency = {
    3: 'admin',
    2: 'teacher',
    1: 'student'
  };
}
