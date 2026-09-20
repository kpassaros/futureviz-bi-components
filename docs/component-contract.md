# Contrato de componente

Cada componente FutureViz deve declarar campos, regras, formatação e limitações.

## Regras obrigatórias

1. Entregar Template e Style completos.
2. Evitar campos calculados quando o Template puder fazer o cálculo.
3. Usar metadados para nomes de propriedades.
4. Limitar decimais a no máximo 2 casas.
5. Tratar nulos e divisão por zero.
6. Declarar se a lógica é `quanto maior, melhor` ou `quanto menor, melhor`.
7. Manter Experimental vazio na coleção DataStudio v1.
8. A prévia deve corresponder ao código disponibilizado.
9. O README deve informar campos e ordenação necessários.

## Estrutura

```json
{
  "component": "period-comparison",
  "platform": "datastudio",
  "fields": {
    "dimensions": 1,
    "metrics": 1,
    "sort": "period-desc"
  },
  "format": {
    "decimalPlacesMax": 2,
    "date": "automatic"
  },
  "experimental": false
}
```
