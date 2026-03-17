# HackAI
# HR Retention AI

## Notre projet

On a développé **HR Retention AI**, une application web qui aide à repérer les employés présentant un **risque plus élevé de démission**.

L’idée n’est pas de remplacer les RH, mais de leur donner un **outil d’appui** pour mieux prioriser les suivis, comprendre certaines situations à risque et agir plus tôt.

Notre projet repose sur deux axes principaux :

- **l’éthique**, pour éviter les usages injustes ou discriminatoires ;
- **l’explicabilité**, pour que les résultats affichés soient compréhensibles et pas seulement techniques.

---

## Le problème auquel on répond

Dans une entreprise, les départs volontaires peuvent coûter cher : perte de compétences, désorganisation, temps de recrutement, baisse de motivation dans les équipes.

On a donc choisi de travailler sur une question simple :

**comment repérer plus tôt les situations où un employé semble plus susceptible de quitter l’entreprise ?**

Le but est d’aider les RH à anticiper, pas à prendre une décision automatique.

---

## Ce que fait l’application

Le site permet de consulter les résultats d’un modèle entraîné au préalable sur des données RH.

Pour chaque employé, l’application affiche :

- un **pourcentage de risque de démission** ;
- un **niveau de risque** ;
- quelques **facteurs qui expliquent le score** ;
- une **suggestion d’action RH** formulée simplement.

Les profils peuvent ensuite être **triés par ordre décroissant de risque**, ce qui permet d’identifier rapidement les cas les plus prioritaires.

---

## Ce qu’on a choisi de mettre en avant

### 1. L’éthique

Dans un projet RH, on ne peut pas se contenter de faire une prédiction “efficace”.  
Il faut aussi faire attention à ce que le système ne renforce pas des biais.

C’est pour ça que notre approche repose sur plusieurs principes :

- les variables sensibles ne doivent pas servir directement à prendre la décision ;
- le score affiché reste une **aide à la décision** ;
- une **validation humaine** est toujours nécessaire avant toute action.

Autrement dit : le modèle signale un risque, mais il ne décide jamais à la place d’un recruteur ou d’un responsable RH.

### 2. L’explicabilité

On ne voulait pas afficher un score brut sans contexte.  
Dans un usage RH, ce serait peu utile et difficile à défendre.

On a donc choisi d’accompagner chaque résultat avec :
- une lecture simple du niveau de risque ;
- des éléments d’explication ;
- une recommandation concrète et compréhensible.

Le but est que même une personne non technique puisse comprendre ce que le système essaye de dire.

---

## Comment le projet fonctionne

Le projet est organisé en deux parties :

### Frontend
Le frontend est l’interface web.  
C’est la partie visible par l’utilisateur. Elle permet de :

- afficher les employés analysés ;
- trier les résultats par niveau de risque ;
- filtrer les profils ;
- lire les explications et les recommandations RH.

### Backend
Le backend gère la logique métier et la prédiction.  
Il charge le modèle entraîné en Python, traite les données et renvoie les résultats au frontend.

### Modèle
Le modèle de machine learning a été entraîné en amont sur une base RH.  
Il calcule une **probabilité de démission** à partir des caractéristiques disponibles dans les données.

---

## Structure du projet

```text
hr_attrition_ai_project/
├── backend/
├── frontend/
├── model/
├── sample_data/
├── requirements.txt
├── docker-compose.yml
└── README.md
