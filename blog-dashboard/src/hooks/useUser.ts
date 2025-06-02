import { useEffect, useState } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      let userId = localStorage.getItem('userId');

      if (!userId) {
        // generate once and store
        userId = (Math.floor(Math.random() * 10) + 1).toString();
        localStorage.setItem('userId', userId);
      }

      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, []);

  return user;
};


