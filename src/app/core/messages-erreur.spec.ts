import { messageErreur } from './messages-erreur';

describe('messageErreur', () => {
  const parDefaut = 'Erreur par défaut';

  it('devrait joindre les messages de champs en cas de validation', () => {
    const err = {
      error: {
        status: 400,
        erreur: 'Données invalides',
        champs: {
          motDePasse: 'Le mot de passe doit contenir au moins 8 caractères',
          email: 'Email invalide',
        },
      },
    };

    expect(messageErreur(err, parDefaut)).toBe(
      'Le mot de passe doit contenir au moins 8 caractères · Email invalide',
    );
  });

  it('devrait utiliser le message erreur quand il n\'y a pas de champs', () => {
    const err = { error: { status: 409, erreur: 'Livre encore non rendu' } };

    expect(messageErreur(err, parDefaut)).toBe('Livre encore non rendu');
  });

  it('devrait retomber sur le message par défaut si le corps est inexploitable', () => {
    expect(messageErreur({ error: null }, parDefaut)).toBe(parDefaut);
    expect(messageErreur({ error: 'texte brut' }, parDefaut)).toBe(parDefaut);
    expect(messageErreur(undefined, parDefaut)).toBe(parDefaut);
  });
});