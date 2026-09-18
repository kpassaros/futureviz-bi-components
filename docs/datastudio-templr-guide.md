# DataStudio + Templr

## Instalação

1. No DataStudio, adicione uma visualização da comunidade.
2. Informe o caminho `gs://templr`.
3. Autorize o componente apenas após avaliar a política da organização.
4. Configure dimensões e métricas conforme o README do componente.
5. Cole o arquivo `template.html` em **Template**.
6. Cole `style.css` em **Style**.
7. Mantenha **JavaScript Helpers (Experimental)** vazio nos componentes v1.

## Modelo de dados validado

```json
{
  "fields": {
    "dimensions": [{ "name": "Categoria" }],
    "metrics": [{ "name": "Saída realizada" }]
  },
  "data": {
    "DEFAULT": [
      { "dimensions": ["Fornecedores"], "metrics": [1197520.78] }
    ]
  }
}
```

## Padrões confirmados

```handlebars
{{#each data.DEFAULT}}
  {{lookup dimensions 0}}
  {{lookup metrics 0}}
{{else}}
  Nenhum dado
{{/each}}
```

Nome dinâmico do campo:

```handlebars
{{lookup (lookup fields.dimensions 0) "name"}}
{{lookup (lookup fields.metrics 0) "name"}}
```

BRL:

```handlebars
R$ {{localeString (lookup metrics 0) "pt-BR"}}
```

Percentual:

```handlebars
{{replace (decimalPrecision (multiply (lookup metrics 0) 100) 2) "." ","}}%
```

## Helpers validados

- `each`, `lookup`, `add`, `@index`.
- `localeString`, `decimalPrecision`.
- `multiply`, `replace`, `gte`, `eq`.
- `if`, `else`.

`length` não ficou disponível no contexto testado.

## Filtros

O Templr recebeu controles de período, filtros categóricos, filtros combinados e cross-filter originado por outros gráficos. Não foi identificado mecanismo para emitir cross-filter pelo Template.

## Desempenho

A lista de concentração renderizou e filtrou 2.508 registros sem travamento perceptível no cenário validado. O desempenho pode variar com fonte, navegador, complexidade do template e volume.

## Segurança

O Templr é uma dependência externa. Não inclua seu bundle neste repositório sem licença verificável. Evite dados sensíveis e consulte `SECURITY.md`.
