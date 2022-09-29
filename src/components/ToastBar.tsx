import { useContext } from 'react';
import { NotificationContext } from '../NotificationContext';

export const ToastBar = () => {
  const { list, remove } = useContext(NotificationContext);

  return (
    <div className='toast-bar'>
      {list.map((toast) => {
        return (
          <div className={`toast ${toast.type}`} key={toast.id}>
            <button
              className='toast-close'
              onClick={() => {
                remove(toast.id);
              }}>
              X
            </button>
            <p>{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};
