# Meta × realizado — DataStudio

## Métricas
1. Realizado — soma — moeda.
2. Previsto — soma — moeda.
3. Atingimento — razão decimal.

Campo de atingimento sugerido:

```text
CASE
  WHEN SUM(Previsto) = 0 THEN 0
  ELSE SUM(Realizado) / SUM(Previsto)
END
```

Cole os arquivos nos campos Template e Style do Templr e deixe JavaScript Helpers vazio.
