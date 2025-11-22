import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth';

const STORAGE_KEY_USERS = 'mock_users';

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getMockUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEY_USERS);
  return users ? JSON.parse(users) : [];
};

const saveMockUser = (user: User) => {
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
};

export const mockService = {
  auth: {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
      await delay(500); // Simulate latency
      const users = getMockUsers();
      const user = users.find(
        (u) => (u.username === credentials.usernameOrEmail || u.email === credentials.usernameOrEmail) && 
               (credentials.password === '123456' || true) // Accept any password for now or check if we stored it (we didn't store password in User type)
      );

      // In a real mock, we should store passwords. But User type doesn't have password.
      // Let's just assume if user exists, login success for this simple mock.
      // Or better, let's check against a hardcoded admin or the registered users.
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      return {
        accessToken: 'mock_access_token_' + user.id,
        refreshToken: 'mock_refresh_token_' + user.id,
        user,
      };
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
      await delay(800);
      const users = getMockUsers();
      if (users.some((u) => u.username === data.username || u.email === data.email)) {
        throw new Error('Username or Email already exists');
      }

      const newUser: User = {
        id: Date.now(),
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        roles: ['CUSTOMER'],
      };

      saveMockUser(newUser);

      return {
        accessToken: 'mock_access_token_' + newUser.id,
        refreshToken: 'mock_refresh_token_' + newUser.id,
        user: newUser,
      };
    },

    getProfile: async (): Promise<User> => {
      await delay(300);
      // In a real app, we'd parse the token. Here we just return the last user from storage or a dummy.
      // But wait, useAuthStore (Jotai) already has the user. 
      // This endpoint is usually called to refresh the user data.
      // Let's return the first user found in LS or a default one.
      const users = getMockUsers();
      if (users.length > 0) return users[users.length - 1]; // Return the most recently created user
      
      throw new Error('User not found');
    }
  },
  // Placeholders for future mocks
  cinema: {},
  movie: {},
  showtime: {},
  booking: {}
};
