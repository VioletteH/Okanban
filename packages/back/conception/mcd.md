# MCD

MCD de l'application okanban

## définition des entités

Liste
- **code liste**
- titre
- position

Carte
- **code carte**
- titre
- position

Label
- **code label**
- nom
- couleur

## association

Liste <- 0N   appartenir   11 -> Carte
Carte <- 0N  correspondre 0N -> Label

## retranscription Mocode

```txt
LISTE: code liste, titre, position
APPARTENIR, 0N  LISTE, 11 CARTE
CARTE: code carte, titre, position
CORRESPONDRE, 0N  CARTE, 0N LABEL
LABEL: code label, nom, couleur
```
