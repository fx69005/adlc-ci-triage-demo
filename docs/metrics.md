# Métriques de démonstration

Ce fichier sert de registre manuel pour la V1. Une ligne est ajoutée après chaque triage.

| Date | Scénario | Run CI | Run agent | Issue | Durée diagnostic | Score /14 | Accepté humainement | Erreur de diagnostic | AIC / coût observé |
|---|---|---|---|---|---:|---:|---|---|---:|
| À renseigner | test / lint / typecheck | URL | URL | URL | minutes | 0–14 | oui / non | oui / non + note | valeur `gh aw logs` |

## Définitions

- **Durée du diagnostic** : heure de fin du run agent moins heure de début, relevée dans GitHub Actions.
- **Taux de diagnostics acceptés** : diagnostics acceptés / diagnostics exécutés. La cible V1 est au moins `2/3`.
- **Erreur de diagnostic** : cause incorrecte, preuve absente, reproduction incohérente ou niveau de confiance injustifié.
- **Issues créées** : nombre d’issues créées par le safe output `create-issue`. La cible est une issue au maximum par run agent.
- **Consommation par run** : valeur AIC affichée par `gh aw logs` ou par le résumé d’exécution. La limite configurée est `max-ai-credits: 50`.

## Résumé V1

| Indicateur | Cible | Résultat |
|---|---:|---:|
| Scénarios exécutés | 3 | À renseigner |
| Diagnostics acceptés | >= 2/3 | À renseigner |
| Issues conformes au format | 3/3 | À renseigner |
| Fuite de secret ou écriture de code | 0 | À renseigner |
