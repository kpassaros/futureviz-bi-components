# Segurança

## Escopo

A FutureViz distribui templates, estilos, exemplos DAX e uma aplicação estática de catálogo. Ela não distribui o código do Templr.

## Regras

- Use dados fictícios ou anonimizados em demonstrações públicas.
- Nunca publique credenciais, tokens, e-mails, documentos ou identificadores sensíveis.
- No Handlebars, prefira `{{valor}}` e evite saída não escapada `{{{valor}}}`.
- Não adicione scripts externos, iframes ou atributos de evento aos templates.
- Revise visuais de terceiros conforme a política da organização.
- Valide resultados contra componentes nativos antes de publicar dashboards.

## Dependência Templr

O DataStudio MVP referencia `gs://templr`. O site, suporte, privacidade, termos e licença do fornecedor não estavam verificáveis durante a v1.0. O bucket pode mudar independentemente da FutureViz.

Por isso:

- o bundle não está incluído neste repositório;
- a dependência deve ser informada ao usuário;
- dados sensíveis não devem ser usados sem avaliação própria;
- disponibilidade e continuidade não são garantidas pela FutureViz.

## Relato de vulnerabilidade

Abra uma issue sem incluir dados sigilosos. Para informações sensíveis, use um canal privado do mantenedor antes de publicar detalhes.
