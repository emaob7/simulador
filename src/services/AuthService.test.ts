import { beforeEach, expect, test, vi } from 'vitest';
import type { User } from 'firebase/auth';

const mocks = vi.hoisted(() => ({
  getDoc: vi.fn(), setDoc: vi.fn(), getDocs: vi.fn(),
}));
vi.mock('../firebase', () => ({ auth: {}, db: {} }));
vi.mock('firebase/firestore', () => ({
  doc: (_db: unknown, collection: string, id: string) => `${collection}/${id}`,
  collection: (_db: unknown, name: string) => name,
  getDoc: mocks.getDoc, setDoc: mocks.setDoc, getDocs: mocks.getDocs,
  updateDoc: vi.fn(),
}));
import { AuthService } from './AuthService';

const user = { uid: 'new-user', email: 'student@example.com', displayName: 'Alumno', photoURL: null } as User;
beforeEach(() => {
  vi.resetAllMocks();
  mocks.setDoc.mockResolvedValue(undefined);
});

test('creates a missing profile within the deployed six-field limit', async () => {
  mocks.getDoc.mockResolvedValue({ exists: () => false });
  await AuthService.ensureUserProfile(user);
  const [path, profile] = mocks.setDoc.mock.calls[0];
  expect(path).toBe('users/new-user');
  expect(Object.keys(profile)).toHaveLength(6);
  expect(profile).toMatchObject({ uid: user.uid, role: 'aspirante', isApproved: false });
});

test('does not overwrite existing profiles or admin approval', async () => {
  mocks.getDoc.mockResolvedValue({ exists: () => true });
  await AuthService.ensureUserProfile(user);
  expect(mocks.setDoc).not.toHaveBeenCalled();
});

test('formerly hardcoded admin emails still register with permitted initial values', async () => {
  mocks.getDoc.mockResolvedValue({ exists: () => false });
  await AuthService.ensureUserProfile({ ...user, email: 'emanuelob7@gmail.com' });
  expect(mocks.setDoc.mock.calls[0][1]).toMatchObject({ role: 'aspirante', isApproved: false });
});

test('surfaces denied writes so the app can show retry instead of entering without a profile', async () => {
  mocks.getDoc.mockResolvedValue({ exists: () => false });
  mocks.setDoc.mockRejectedValue(new Error('Missing or insufficient permissions'));
  await expect(AuthService.ensureUserProfile(user)).rejects.toThrow('Missing or insufficient permissions');
});

test('uses document IDs for approval even when a stored uid is missing or stale', async () => {
  mocks.getDocs.mockResolvedValue({ docs: [{ id: 'actual-id', data: () => ({ uid: 'stale-id' }) }] });
  expect(await AuthService.getUsers()).toEqual([{ uid: 'actual-id' }]);
});
