import { useEffect, useMemo, useState } from 'react';
import type { User, UserRole, CreateUserPayload } from '../types';
import { createUser, getUsers } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const loadedUsers = await getUsers();
        if (!ignore) setUsers(loadedUsers);
      } catch (error) {
        if (!ignore) {
          showError(error instanceof Error ? error.message : 'No se pudo cargar usuarios.');
        }
      }
    }

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === 'all' || user.roles.includes(roleFilter);

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 4000);
  };

  const registerUser = async (payload: CreateUserPayload) => {
    try {
      const { user, temporaryPassword } = await createUser(payload);
      setUsers((prev) => [...prev, user]);
      const passwordHint = temporaryPassword
        ? ` Contraseña temporal: ${temporaryPassword}`
        : '';
      showSuccess(`Usuario "${payload.displayName}" registrado exitosamente.${passwordHint}`);
      return true;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'No se pudo registrar el usuario.',
      );
    }
  };

  return {
    users: filteredUsers,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    isModalOpen,
    setIsModalOpen,
    registerUser,
    successMessage,
    errorMessage,
  };
}
