export interface Emprunt {
  id: number;
  membreNom: string;
  livreTitre: string;
  dateEmprunt: string;
  dateRetourPrevue: string;
  statut: 'EN_COURS' | 'RENDU';
}