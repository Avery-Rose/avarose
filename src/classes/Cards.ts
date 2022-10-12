import { Card } from './Card';
import { ICard } from '../interfaces/Card';
import { ICardList } from '../interfaces/CardList';

export class Cards {
  cards: Card[];

  constructor({ cards }: ICardList = { cards: [] }) {
    if (cards) {
      this.cards = cards.map((card: ICard) => new Card(card));
    } else {
      this.cards = [];
    }
  }

  getCard(id: number): Card | undefined {
    return this.cards.find((card) => card.id === id);
  }

  getCards(): Card[] {
    return this.cards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  removeCard(id: number) {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  updateCard(id: number, card: Card) {
    this.cards = this.cards.map((c) => (c.id === id ? card : c));
  }

  getCardIndex(id: number): number {
    return this.cards.findIndex((card) => card.id === id);
  }

  getCardCount(): number {
    return this.cards.length;
  }

  getCardIds(): number[] {
    return this.cards.map((card) => card.id);
  }

  getCardById(id: number): Card | undefined {
    return this.cards.find((card) => card.id === id);
  }

  getCardByIndex(index: number): Card {
    return this.cards[index];
  }
}
