# OKANBAN

## BACK

Description de l'API
- Le board de gestion de projet "Okanban" permet de créer des listes et des cartes à l'intérieur des listes
- L'utilisateur doit pouvoir créer, modifier et supprimer ces listes et ces cartes
- Les cartes peuvent avoir un ou plusieurs tags, chacun ayant une couleur spécifique

Ce qui a été réalisé sur ce projet :
- création des users stories
- conception de la base de donnée (MCD et MLD)
- création des fichiers SQL (create_table.sql et seed_table.sql)
- création de l'utilisateur, de la base de données et exécution des scripts de création de base
- connexion Sequelize, création des modèles et des associations
- création des routes et des fonctions de controllers
- tests avec REST Client

## FRONT

Matériel donné : intégration des listes uniquement (template et modale), projet Okanban API

Objectif : création d'une SPA à partir du projet API déjà réalisé

Ce qui a été réalisé sur ce projet

DISPLAY
- récupération des listes / cards / tags de l'API avec une requête fetch 
- affichage en JS à l'aide des templates

POST
- gestion de l'ouverture et de la fermeture de la modale de création de liste
- création d'une modale pour les cards et gestion de son ouverture / fermeture
- gestion d'un toggle pour associer / dissocier les tags aux cards
- envoi des données du formulaire à l'API 
- mise à jour de l'affichage

UPDATE
- création d'une modale de modification de liste et de card
- gestion de l'ouverture et de la fermeture des modales de modification de liste et de card
- mise en avant des tags déjà associés aux cards
- envoie des données à l'API 
- mise à jour de l'affichage

DELETE
- création d'une modale de suppression de liste et de card
- gestion de l'ouverture et de la fermeture de la modale de suppression de liste et de card
- envoie des données à l'API 
- mise à jour de l'affichage

- mise en place d'un outil de drag and drop pour les listes et les cards
- organisation du code avec un index central

