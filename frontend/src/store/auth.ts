import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { User } from '../types/auth';

// Atoms
export const userAtom = atomWithStorage<User | null>('auth_user', null);
export const accessTokenAtom = atomWithStorage<string | null>('auth_token', null);

export const isAuthenticatedAtom = atom((get) => {
  const token = get(accessTokenAtom);
  const user = get(userAtom);
  return !!token && !!user;
});

// Actions (helper object to be used in components/hooks)
// Note: In Jotai, we usually use useSetAtom in components. 
// But for non-React contexts (like axios interceptors), accessing atoms is harder without a store reference.
// For simplicity in this project, we will rely on localStorage for the HTTP client to avoid circular deps or complex store passing.
