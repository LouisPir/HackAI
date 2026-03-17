# HR Retention AI

Application web d’aide à la décision RH pour identifier les employés présentant un risque plus élevé de départ volontaire, expliquer les facteurs de risque observés et suggérer des actions de prévention.

---

## 1. Contexte

Dans beaucoup d’organisations, le turnover entraîne des coûts importants : perte de compétences, baisse de continuité dans les équipes, coûts de recrutement et temps de montée en compétence.

Notre projet **HR Retention AI** propose une solution simple et responsable pour aider les RH à :
- repérer les profils les plus à risque ;
- comprendre les facteurs qui influencent ce risque ;
- prioriser des actions de rétention ;
- visualiser des indicateurs globaux sur le dataset.

L’outil est conçu comme une **aide à la décision**, et non comme un système de décision automatique.

---

## 2. Objectif du projet

L’objectif est de construire une interface de démonstration capable de :
- charger un dataset RH anonymisé ;
- calculer un **score de risque de départ** à partir de variables RH simples ;
- afficher les employés actifs les plus à risque ;
- expliquer les raisons possibles du score ;
- proposer des actions RH concrètes ;
- fournir une page d’analytics pour visualiser les tendances du dataset.

---

## 3. Périmètre réel du code

Le dépôt contient plusieurs éléments, mais la partie exécutable principale côté interface est le projet :

```text
frontend-app/
```

C’est ce projet Vite + React qui contient l’application affichée à l’utilisateur.

Le fichier `frontend` présent à la racine ressemble à un prototype antérieur ou à une version non intégrée dans le projet Vite. Il ne constitue pas l’entrée principale de l’application.

Le dossier `dataset/` contient un script Python de préparation / enrichissement des données.

---

## 4. Persona et cas d’usage

### Persona principal
**Responsable RH / Talent Manager**

Cette personne souhaite repérer les situations de départ potentiel avant qu’elles ne deviennent critiques, tout en gardant une lecture compréhensible et justifiable des résultats.

### Cas d’usage
1. Rechercher un employé par `EmpID` ou index.
2. Consulter son score de risque de départ.
3. Lire une explication synthétique des facteurs de risque.
4. Obtenir des recommandations RH simples.
5. Voir les employés actifs les plus à risque.
6. Explorer des statistiques globales sur le dataset.

---

## 5. Fonctionnalités implémentées

### Page Home
- recherche d’un employé par identifiant ;
- calcul d’un score de risque ;
- affichage d’une fiche employé ;
- explication textuelle du score ;
- recommandations d’actions ;
- tableau des 10 employés actifs les plus à risque.

### Page Analytics
- taux global d’attrition ;
- comparaison employés actifs vs terminés ;
- taux de départ par département ;
- taux de départ par performance ;
- taux de départ par satisfaction ;
- importance relative de certaines variables.

---

## 6. Architecture fonctionnelle

### Frontend
Le frontend est développé avec **React** et **Vite**.

Fichiers principaux :
- `frontend-app/src/App.jsx` : structure des pages, navigation, composants UI ;
- `frontend-app/src/main.jsx` : point d’entrée React ;
- `frontend-app/src/index.css` : styles globaux ;
- `frontend-app/src/data.js` : chargement des données, calcul du risque, explications, analytics.

### Données
Les données utilisées par l’application sont chargées côté frontend depuis `data.js`.

### Préparation des données
Le script :

```python
dataset/Remplissage.py
```

sert à enrichir / transformer un dataset RH en fusionnant un dataset RH existant avec un dataset IBM pour produire une version consolidée :
- lecture de `HRDataset_v14.csv` ;
- lecture de `IBM.csv` ;
- génération de colonnes compatibles ;
- export de `HRDataset_Expanded_v2.csv`.

---

## 7. Logique de scoring

Dans l’état actuel du code, le score de risque affiché est calculé à partir de variables RH structurées présentes dans le dataset, notamment :
- absences ;
- satisfaction ;
- engagement ;
- performance ;
- retards / signaux comportementaux selon les champs disponibles.

Le projet met l’accent sur la **lisibilité métier** du score plutôt que sur une pipeline ML industrialisée complète exposée dans ce dépôt.

Autrement dit, l’application démontre une logique d’**IA explicable orientée RH**, avec restitution compréhensible des causes et des actions, même si le dépôt ne montre pas ici un notebook d’entraînement complet ni un backend de serving dédié.

---

## 8. IA responsable

### Éthique
- Le score est présenté comme une aide à la décision.
- Une validation humaine reste nécessaire avant toute action RH.
- Les attributs sensibles doivent être manipulés avec prudence et ne pas servir à discriminer.

### Explicabilité
- Le score affiché est accompagné d’une explication textuelle.
- L’interface ne montre pas uniquement un pourcentage brut.
- Les RH peuvent relier le score à des signaux concrets.

### Frugalité
- L’application repose sur une architecture légère côté frontend.
- Le calcul présenté est simple à exécuter et adapté à une démonstration frugale.

### Cybersécurité / conformité
- Le projet se base sur des données RH anonymisées / synthétiques.
- Il faut éviter d’exposer des données personnelles réelles dans le dépôt.
- Les variables sensibles doivent être protégées et encadrées.

---

## 9. Structure du projet

```text
louispir-hackai/
├── README.md
├── frontend                      # prototype / ancienne version
├── dataset/
│   └── Remplissage.py            # préparation / enrichissement de données
└── frontend-app/                 # application principale React + Vite
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.css
        ├── App.jsx
        ├── data.js
        ├── index.css
        └── main.jsx
```

---

## 10. Installation et lancement

### Prérequis
- Node.js 18+
- npm

### Lancer le frontend
Depuis le dossier `frontend-app/` :

```bash
npm install
npm run dev
```

Puis ouvrir l’URL locale indiquée par Vite.

### Build de production
```bash
npm run build
npm run preview
```

---

## 11. Limites actuelles

- Pas de backend Python branché en temps réel sur le frontend.
- Pas de pipeline d’entraînement complète documentée dans le dépôt.
- Le score repose sur une logique implémentée dans `data.js`, sans exposer ici tout le cycle MLOps.
- La fairness est évoquée dans l’interface et la documentation, mais l’audit d’équité complet reste à formaliser.
- Les résultats ne doivent pas être utilisés pour prendre une décision automatique sur un salarié.

---

## 12. Pistes d’amélioration

- ajouter un backend API pour servir un vrai modèle entraîné ;
- intégrer SHAP ou LIME pour une explicabilité plus formelle ;
- ajouter un audit d’équité par sous-groupes ;
- mesurer la frugalité avec CodeCarbon ;
- renforcer la documentation des données et du modèle ;
- connecter une base de données RH anonymisée ;
- ajouter gestion des rôles et journalisation des accès.

---

## 13. Conclusion

**HR Retention AI** est une démonstration d’outil RH responsable orienté :
- **prévention du turnover** ;
- **explicabilité des scores** ;
- **lecture opérationnelle pour les RH** ;
- **sensibilisation aux enjeux d’éthique, de conformité et de frugalité**.

Le projet ne remplace pas le jugement humain. Il aide les RH à mieux prioriser et à ouvrir les bonnes discussions au bon moment.
