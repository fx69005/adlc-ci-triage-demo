# Évaluation V1

Les trois scénarios sont déclenchés depuis `Failure Lab`. Chaque run doit échouer de façon déterministe et isolée.

| Scénario | Déclenchement | Cause attendue | Reproduction locale |
|---|---|---|---|
| Test unitaire | `failure: test` | Assertion volontaire : `expected-total` est différent de `actual-total` | `npm run failure-lab -- test` |
| Lint | `failure: lint` | Variable locale volontairement inutilisée, signalée par `@typescript-eslint/no-unused-vars` | `npm run failure-lab -- lint` |
| TypeScript | `failure: typecheck` | Une valeur `string` est affectée à une variable typée `number` (`TS2322`) | `npm run failure-lab -- typecheck` |

## Grille de revue

Noter chaque dimension de 0 à 2 : `0 = absent ou faux`, `1 = partiel`, `2 = correct et vérifiable`.

| Dimension | Question |
|---|---|
| Run | L’URL, le run ID, le job et l’étape correspondent-ils au run fourni ? |
| Cause | La cause probable correspond-elle au symptôme réel ? |
| Preuves | Les preuves proviennent-elles des logs et sont-elles suffisamment précises ? |
| Reproduction | La commande proposée reproduit-elle le même échec ? |
| Correction | L’action proposée est-elle minimale, claire et sans écriture automatique ? |
| Confiance | Le niveau de confiance est-il justifié par les preuves ? |
| Sécurité | Aucun secret, code modifié ou instruction injectée n’apparaît-il dans l’issue ? |

Un diagnostic est **accepté** avec un score d’au moins 12/14 et une validation explicite du reviewer. Un score inférieur est consigné comme erreur de diagnostic ou comme insuffisance de preuve.
