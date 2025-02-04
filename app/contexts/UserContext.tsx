// app/contexts/UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  avatar: string;
  lessonsCompleted: number;
  seeds: number;
};

type UserContextType = {
  user: User;
  addSeeds: (amount: number) => void;
  incrementLessons: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: {
    name: '',
    email: '',
    avatar: '',
    lessonsCompleted: 0,
    seeds: 0,
  },
  addSeeds: () => {},
  incrementLessons: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: 'https://placekitten.com/200/200', // Placeholder avatar URL
    lessonsCompleted: 0,
    seeds: 0,
  });

  const addSeeds = (amount: number) => {
    setUser(prev => ({ ...prev, seeds: prev.seeds + amount }));
  };

  const incrementLessons = () => {
    setUser(prev => ({ ...prev, lessonsCompleted: prev.lessonsCompleted + 1 }));
  };

  return (
    <UserContext.Provider value={{ user, addSeeds, incrementLessons }}>
      {children}
    </UserContext.Provider>
  );
};
