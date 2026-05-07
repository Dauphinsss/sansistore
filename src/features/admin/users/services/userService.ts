import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../../../lib/firebase';
import type { CreateUserPayload, User, UserRole } from '../types';

interface UsersResponse {
  users: User[];
}

interface CreateUserResponse {
  user: User;
  temporaryPassword?: string;
}

function toBackendRole(role: UserRole) {
  return role === 'operador' ? 'operador_inv' : role;
}

function toFrontendRole(role: string): UserRole {
  return (role === 'operador_inv' ? 'operador' : role) as UserRole;
}

async function getAuthorizationHeader(): Promise<Record<string, string>> {
  const currentUser =
    auth.currentUser ??
    (await new Promise<FirebaseUser | null>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    }));

  const token = await currentUser?.getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function normalizeUser(user: User): User {
  return {
    ...user,
    roles: user.roles.map((role) => toFrontendRole(role)),
    createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
  };
}

async function parseApiError(response: Response) {
  const body = await response.json().catch(() => null);
  return body?.message ?? 'Ocurrio un error al procesar la solicitud.';
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch('/api/users', {
    headers: await getAuthorizationHeader(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as UsersResponse;
  return data.users.map(normalizeUser);
}

export async function createUser(
  payload: CreateUserPayload,
): Promise<CreateUserResponse> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(await getAuthorizationHeader()),
    },
    body: JSON.stringify({
      displayName: payload.displayName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      roles: payload.roles.map((role) => toBackendRole(role)),
    }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const data = (await response.json()) as CreateUserResponse;
  return {
    ...data,
    user: normalizeUser(data.user),
  };
}
