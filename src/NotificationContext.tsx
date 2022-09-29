import React from 'react';

export interface Toast {
  id: number;
  message: string;
  type: string;
}
interface NotificationContextType {
  list: Toast[];
  add: (toast: Toast) => void;
  remove: (id: number) => void;
}

export const NotificationContext = React.createContext<NotificationContextType>(
  {
    list: [],
    add: () => {},
    remove: () => {},
  }
);
