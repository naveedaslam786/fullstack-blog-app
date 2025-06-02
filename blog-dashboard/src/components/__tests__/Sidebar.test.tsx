import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
beforeEach(() => {
  localStorage.setItem('userId', '1');
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('Sidebar', () => {
  it('fetches and displays user details', async () => {
    // Mock the user response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
    });

    render(<Sidebar />);

    // Wait for user name to appear
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    });
  });
});
