# FutureViz Components

> Open UI Components Pack for Power BI & DataStudio.

FutureViz é uma biblioteca aberta de componentes visuais configuráveis para experiências de BI mais claras, consistentes e reutilizáveis.

**Demo:** https://kpassaros.github.io/futureviz-bi-components/

O projeto combina uma **Central de Coleções** com o **FutureViz Lab**, um configurador que atualiza a prévia e gera código para cada plataforma.

## Destaques da v1.0.0

- Catálogo responsivo e publicável no GitHub Pages.
- FutureViz Lab com temas, cores, formato, densidade e raio configuráveis.
- Nomes de dimensões e métricas orientados por metadados.
- Código copiável para DataStudio e Power BI.
- KPI, progresso de meta, concentração de fluxo e grid multi-KPI.
- 20 testes funcionais validados no DataStudio.
- Ranking testado com 2.508 registros, filtros e scroll contínuo.

## Demo local

Não há build nem dependências:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Publicação no GitHub Pages

1. Crie o repositório público `futureviz-bi-components`.
2. Envie o conteúdo deste pacote para a branch `main`.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **GitHub Actions**.
5. O workflow incluído publicará o catálogo.

## Estrutura

```text
futureviz-bi-components/
├── index.html
├── assets/
├── components/
│   ├── datastudio/
│   └── powerbi/
├── docs/
├── examples/
└── .github/workflows/
```

## DataStudio

A implementação validada utiliza o Templr como dependência externa:

```text
gs://templr
```

A FutureViz distribui somente seus próprios Templates, Styles e documentação. O bundle do Templr não está incluído.

## Power BI

Os exemplos geram HTML por medidas DAX e exigem um visual compatível com renderização HTML. Confirme a política de visuais da organização antes de usar em produção.

## Segurança

- Não use credenciais ou dados pessoais nos exemplos públicos.
- Evite `{{{...}}}`, scripts externos, iframes e eventos inline.
- Consulte [SECURITY.md](SECURITY.md).

## Licença

Os códigos originais da FutureViz estão sob licença MIT. Dependências externas mantêm suas próprias condições e não são relicenciadas por este projeto.
