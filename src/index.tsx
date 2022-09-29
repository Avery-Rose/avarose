import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastBar } from './components/ToastBar';
import './firebaseInit';
import { Header } from './Header';
import { NotificationContext, Toast } from './NotificationContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const AppWithToast = () => {
  const [list, setList] = React.useState<Toast[]>([]);
  const add = (toast: Toast) => {
    console.log('add', toast);
    setList((list) => [...list, toast]);

    setTimeout(() => {
      remove(toast.id);
    }, 3000);
  };
  const remove = (id: number) => {
    setList((list) => list.filter((toast) => toast.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ list, add, remove }}>
      <Header />
      <App />
      <ToastBar />
    </NotificationContext.Provider>
  );
};

root.render(<AppWithToast />);
