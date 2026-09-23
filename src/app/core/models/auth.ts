export interface RegisterRequest {
  nom: string;
  email: string;
  motDePasse: string;
}

export interface RegisterResponse {
  id: number;
  nom: string;
  email: string;
  role: 'ADMIN' | 'MEMBRE';
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  token: string;
}