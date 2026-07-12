# Feuille de route ADLC — CI, remédiation et PR

Ce document regroupe les possibilités identifiées pour faire évoluer la démonstration ADLC. Il distingue ce qui est déjà démontré, ce qui est en cours et ce qui reste volontairement différé.

## État actuel

- Le triage automatique des échecs `CI` et `Failure Lab` crée une issue structurée après un échec.
- La revue humaine utilise trois validations : diagnostic accepté, cause vérifiée et action corrective autorisée.
- `/fix-ci` déclenche un second agent de remédiation.
- La remédiation crée une draft PR sur une branche `ai-fix/*`, sans modification directe de `main` ni merge automatique.
- La [PR #9](https://github.com/fx69005/adlc-ci-triage-demo/pull/9) démontre cette création automatique. Elle doit encore être revue humainement, notamment parce que l’agent a ajouté une adaptation de polices pour contourner le réseau.
- Le workflow de remédiation autorise maintenant les écosystèmes `node` et `fonts` dans son sandbox afin que les validations puissent accéder à npm et aux polices nécessaires au build.
- La protection stricte du périmètre de fichiers et la mise à jour d’une PR existante ne sont pas activées pour le moment.

## Capacités identifiées

| Capacité | Utilité | État | Décision ou prochaine étape |
|---|---|---|---|
| CI déterministe | Lint, tests, typecheck et build reproductibles | Fait | Conserver comme signal de référence |
| Failure Lab | Provoquer des échecs contrôlés par catégorie | Fait | Ne jamais corriger automatiquement un lab volontaire |
| Dispatcher automatique | Lancer le triage après un échec de CI | Fait | Ajouter plus tard une déduplication |
| Issue de diagnostic | Conserver run, preuves, reproduction et confiance | Fait | Continuer la revue humaine |
| Labels et assignation | Router les issues vers une équipe ou un responsable | À planifier | Ajouter après la stabilisation du flux PR |
| Déduplication | Regrouper plusieurs échecs identiques dans une issue existante | À planifier | Utiliser signature du run, job et erreur |
| Commentaire de synthèse sur PR | Rendre le diagnostic visible directement sur une PR | À planifier | Ajouter un safe output `add-comment` limité |
| Revue de code agentique | Produire des commentaires ciblés sur les lignes modifiées | À planifier | Déclencher sur demande humaine |
| Création de draft PR | Proposer une correction isolée et révisable | Démontré par PR #9 | Examiner le diff et les checks avant merge |
| Périmètre de fichiers strict | Empêcher les modifications hors sujet | Différé volontairement | Décider plus tard entre `allowed-files`, `excluded-files` et limite de patch |
| Mise à jour d’une PR existante | Ajouter un commit à une PR sans en créer une nouvelle | À planifier | Ajouter un workflow `/fix-ci-update` avec `push-to-pull-request-branch` |
| Demande de reviewers | Ajouter automatiquement un reviewer ou une équipe | À planifier | Après validation du modèle de PR |
| Mise à jour ou fermeture de PR | Maintenir le cycle de vie des PR agentiques | À planifier | Toujours sous conditions explicites |
| Maintenance planifiée | Auditer dépendances, documentation ou dette technique | À planifier | Utiliser un workflow `schedule` séparé |
| CI de la PR | Relancer les checks après création ou mise à jour | Partiellement fait | Vérifier l’approbation des workflows et `GH_AW_CI_TRIGGER_TOKEN` |
| Merge contrôlé | Fusionner uniquement après checks, labels et revue | Différé | Rester manuel pour la V1 ; le merge agentique est expérimental |
| Déploiement | Promouvoir vers un environnement ou la production | Hors périmètre actuel | Concevoir séparément avec environnement protégé |

## Ordre recommandé

1. Terminer la revue de la PR #9 : diff, checks, portée et changement de police.
2. Vérifier que l’autorisation réseau `fonts` évite toute modification de code liée au build.
3. Ajouter le workflow de mise à jour d’une PR existante avec `/fix-ci-update`.
4. Ajouter une protection de périmètre lorsque les règles de correction seront stabilisées.
5. Ajouter la déduplication des issues et les commentaires de synthèse sur PR.
6. Ajouter la revue de code agentique, les reviewers et la maintenance planifiée.
7. Étudier seulement ensuite le merge contrôlé ou le déploiement, avec approbation humaine et protections GitHub.

## Règles de décision

- Une issue de triage est une preuve et une proposition, pas une autorisation de modifier le code.
- `/fix-ci` est une demande explicite de remédiation ; les trois cases de l’issue restent nécessaires.
- Une draft PR doit rester isolée sur une branche dédiée et ne doit jamais être fusionnée automatiquement en V1.
- Un échec de validation réseau ou de dépendance doit produire un diagnostic incomplet, pas une modification fonctionnelle hors sujet.
- Toute évolution de permission ou de safe output doit être documentée et validée par compilation `gh aw validate --strict` puis `gh aw compile --strict --approve`.
