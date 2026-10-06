import { ROLES } from '../config/roles.js';

/** Regra de negócio da demonstração: o perfil é deduzido pelo e-mail informado. */
export function resolveRole(email) {
  const normalizedEmail = email.toLowerCase();
  if (normalizedEmail.includes('admin')) return ROLES.ADMIN;
  if (normalizedEmail.includes('analista')) return ROLES.ANALYST;
  return ROLES.PRODUCER;
}
