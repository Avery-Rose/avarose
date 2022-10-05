import { useState, useEffect } from 'react';
import { Cards as CardList, Card } from '../types/card';

const Cards = () => {
  const [cardsList, setCardsList] = useState<Card[]>([]);

  const handleOnMouseMove = (e) => {
    const inverse = (x) => (x > 0 ? -1 : 1) * Math.abs(x);
    const target = e.target as HTMLElement;

    const rest = target.getBoundingClientRect(),
      x = Math.round(e.clientX - rest.left),
      y = Math.round(e.clientY - rest.top),
      yDeg = inverse(Math.round((y / (rest.width / 2)) * 10) - 10),
      xDeg = Math.round((x / (rest.height / 2)) * 10) - 10;

    const addVar = (name: string, value: string) =>
      target.style.setProperty(name, `${value}`);

    addVar('--card-mouse-x', `${x}px`);
    addVar('--card-mouse-y', `${y}px`);

    addVar('--card-rotate-x', `${yDeg}deg`);
    addVar('--card-rotate-y', `${xDeg}deg`);
  };

  useEffect(() => {
    const cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      card.addEventListener('mousemove', handleOnMouseMove);
    }

    return () => {
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        card.removeEventListener('mousemove', handleOnMouseMove);
      }
    };
  }, [cardsList]);

  useEffect(() => {
    const cards = new CardList();

    for (let i = 1; i <= 10; i++) {
      cards.addCard(
        new Card({
          name: `Card ${i}`,
          body: `This is card ${i}`,
          id: i,
        })
      );
    }

    setCardsList(cards.getCards());

    return () => {
      setCardsList([]);
    };
  }, []);

  const addCard = () => {
    const cards = new CardList();
    cards.addCard({
      name: `Card ${cardsList.length + 1}`,
      body: `This is card ${cardsList.length + 1}`,
      id: cardsList.length + 1,
    });
    setCardsList((prev) => [
      ...prev,
      cards.getCards()[cards.getCards().length - 1],
    ]);

    setTimeout(() => {
      const lastCard = cards.getCards()[cards.getCards().length - 1];
      const lastCardElement = document.getElementById(`card-${lastCard.id}`);
      

      lastCardElement?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);

    // scroll to last card
  };

  return (
    <main
      className='fill-W fill-H'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#151515',
      }}>
      <button
        onClick={addCard}
        style={{
          backgroundColor: '#707070',
          color: '#fff',
          border: 'none',
          padding: '1rem',
          fontSize: '1.5rem',
          cursor: 'pointer',
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
        }}>
        Add Card
      </button>
      <div className='cards'>
        {cardsList.map((card: Card, i) => (
          <div className='card' id={`card-${card.id}`} key={card.id}>
            <div className='card-border' />
            <div className='card-content'>
              <h2>{card.name}</h2>
              <p>{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Cards;
