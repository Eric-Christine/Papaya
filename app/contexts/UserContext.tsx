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
    name: 'Rachelle',
    email: 'rjl@gmail.com',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/papaya-b8db9.firebasestorage.app/o/Untitled%20design.png?alt=media&token=b8fbba65-86ff-41f4-bec5-ae128d77e39d', // Placeholder avatar URL
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
export default UserContext;

