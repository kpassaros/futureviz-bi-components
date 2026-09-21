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
10. Todo componente deve possuir os modos **Claro** e **Escuro** em todas as plataformas.
11. A troca de modo deve atualizar simultaneamente a prévia e o código disponibilizado.
12. O tema padrão deve ser explícito no código por `data-theme`, propriedade `theme` ou configuração equivalente da plataforma.
13. Os dois modos devem preservar contraste, estados semânticos, responsividade e formatação numérica.

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
  "theme": {
    "supported": ["light", "dark"],
    "default": "light",
    "syncPreviewAndCode": true
  },
  "experimental": false
}
```
