export interface Livre {
  id: number;
  titre: string;
  isbn: string;
  nombreExemplaires: number;
  auteurNom: string;
}

export interface LivreRequest {
  titre: string;
  isbn: string;
  nombreExemplaires: number;
  auteurId: number;
}