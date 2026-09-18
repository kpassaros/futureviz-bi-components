# Contrato de componente

Cada componente FutureViz é descrito por um estado independente da plataforma.

```json
{
  "component": "flow-concentration",
  "platform": "datastudio",
  "fields": {
    "dimension": { "index": 0, "labelSource": "metadata" },
    "metric": { "index": 0, "labelSource": "metadata", "format": "currency" }
  },
  "limit": 5,
  "theme": {
    "primary": "#2563eb",
    "surface": "#ffffff",
    "radius": 14,
    "density": "compact"
  }
}
```

## Campos obrigatórios

- `component`: família visual.
- `platform`: adaptador de destino.
- `fields`: contrato de dimensões e métricas.
- `theme`: tokens visuais.

## Regras

1. Rótulos usam metadados quando a plataforma os fornece.
2. Formatos não são inferidos silenciosamente quando houver ambiguidade.
3. O adaptador declara recursos não suportados.
4. A prévia usa dados fictícios.
5. O código exportado deve corresponder ao estado exibido.

## Edição de código

A configuração visual é a fonte canônica. Edições avançadas atualizam a prévia, mas só retornam aos controles quando puderem ser analisadas com segurança.
