const Status = {
  PENDING: 'PENDING',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type StatusPath = (typeof Status)[keyof typeof Status];

export { Status };