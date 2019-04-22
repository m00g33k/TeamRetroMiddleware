import { Length } from "class-validator";

export default class Board {
  @Length(3, 15)
  title: string;

  toJson() {
    return {
      title: this.title
    };
  }
}
