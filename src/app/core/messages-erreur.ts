export interface ApiError {
  status?: number;
  erreur?: string;
  champs?: Record<string, string> | null;
}

export function messageErreur(err: unknown, parDefaut: string): string {
  const corps = (err as { error?: unknown } | null | undefined)?.error;

  if (corps && typeof corps === 'object') {
    const apiError = corps as ApiError;

    const messagesChamps = apiError.champs ? Object.values(apiError.champs) : [];
    if (messagesChamps.length > 0) {
      return messagesChamps.join(' · ');
    }

    if (apiError.erreur) {
      return apiError.erreur;
    }
  }

  return parDefaut;
}