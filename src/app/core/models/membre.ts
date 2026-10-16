export interface Membre {
  id: number;
  nom: string;
  email: string;
  role: 'ADMIN' | 'MEMBRE';
}