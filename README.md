# Bibliothèque Front

Interface web Angular pour [Bibliothèque API](https://github.com/nolanjean/bibliotheque-api), une API REST Spring Boot de gestion de bibliothèque (livres, auteurs, membres, emprunts).

Ce projet permet de consulter et gérer le catalogue d'une bibliothèque : parcourir les livres et auteurs, créer un compte, emprunter un livre, et pour les administrateurs, gérer le catalogue et les membres.

## Fonctionnalités

- **Authentification** : inscription, connexion, session persistante (JWT)
- **Livres** : consultation paginée, détail, création/modification/suppression (admin)
- **Auteurs** : consultation, création/modification (admin)
- **Membres** : consultation, modification, suppression (admin)
- **Emprunts** : consultation de ses propres emprunts (membre) ou de tous les emprunts (admin), création d'un emprunt, retour d'un livre (admin)
- **Gestion des rôles** : interface adaptée selon le rôle de l'utilisateur connecté (`ADMIN` / `MEMBRE`), à la fois dans l'affichage et dans l'accès aux routes
- Interface responsive (mobile / desktop)
- **Recherche, filtres et tri** : recherche par titre/ISBN, filtre par auteur et tri sur les livres ; recherche et tri sur les auteurs et les membres ; pagination sur toutes les listes
- **Notifications** : confirmation visuelle après chaque création, modification, suppression ou retour d'emprunt

## Stack technique

- [Angular](https://angular.dev/) 22 (composants standalone, signals, lazy loading)
- TypeScript (mode strict)
- RxJS
- ESLint + Prettier
- Tests unitaires avec Vitest et `HttpTestingController`

## Prérequis

- Node.js 20 ou supérieur
- [Bibliothèque API](https://github.com/nolanjean/bibliotheque-api) démarrée en local sur `http://localhost:8080` — ce projet n'est pas déployé en ligne, il doit être lancé localement avec son backend pour fonctionner

## Installation

```bash
git clone https://github.com/nolanjean/bibliotheque-front.git
cd bibliotheque-front
npm install
```

## Lancer le projet

```bash
ng serve
```

L'application est accessible sur `http://localhost:4200`.

## Tests

```bash
ng test
```

## Lint

```bash
ng lint
```

## Build de production

```bash
ng build
```

Les fichiers compilés sont générés dans `dist/`.

## Structure du projet

```text
src/app/
├── core/       # Services transverses (auth, guards, intercepteurs, modèles)
├── features/   # Un dossier par fonctionnalité (livres, auteurs, membres, emprunts, auth)
└── shared/     # Éléments réutilisables (pipes...)
```

## Projet lié

Backend : [bibliotheque-api](https://github.com/nolanjean/bibliotheque-api)