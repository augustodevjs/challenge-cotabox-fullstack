import { User } from "../../../shared";

export class TestUtil {
  static giveMeValidUser(): User {
    const user = new User();

    user.firstName = 'João';
    user.lastName = 'Monteiro';
    user.participation = 5

    return user;
  }
}