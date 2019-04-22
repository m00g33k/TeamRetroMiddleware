import { Length, IsEmail, IsNotEmpty, IsDateString } from "class-validator";
import IsEqualTo from "../utils/validations/isEqualTo";

export default class User {
  @Length(2, 20)
  firstname: string;

  @Length(2, 20)
  lastname: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdDate: string;

  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @IsEqualTo("password", {
    message: "Password is not equal to confirm password"
  })
  confirmPassword: string;

  userId: string; // firebase userid
  id: string; // generated handler id

  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      createdDate: this.createdDate
    };
  }
}
