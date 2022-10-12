import { ICard } from '../interfaces/Card';

export class Card {
  id: number;
  name: string;
  body: string;

  constructor({ id, name, body }: ICard) {
    this.id = id;
    this.name = name;
    this.body = body;
  }
}
