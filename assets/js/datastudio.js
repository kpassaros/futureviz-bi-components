(()=>{
  const data=window.FV_DATASTUDIO||[];
  const grid=document.querySelector('#dsGrid'),modal=document.querySelector('#modalDs'),code=document.querySelector('#dsCode'),fields=document.querySelector('#dsContract'),title=document.querySelector('#dsTitle'),label=document.querySelector('#dsModalLabel'),stage=document.querySelector('#dsStage'),styleBox=document.querySelector('#dsStyleFilters'),sectorBox=document.querySelector('#dsSectorFilters'),search=document.querySelector('#dsSearch'),count=document.querySelector('#dsCount'),closeButton=document.querySelector('#closeDs'),copyButton=document.querySelector('#copyDs');
  let current=data[0],key='template',style='Todos',sector='Todos',query='',themeMode='light';
  const darkDefaults=new Set(['revenue','cashflow','status','funnel','sla','sprint']);

  function defaultTheme(c){return darkDefaults.has(c.preview)?'dark':'light'}

  function preview(c,mode=defaultTheme(c)){
    const map={
      revenue:`<article class="visual dark"><small>RECEITA TOTAL</small><strong>R$ 428,60 mil</strong><em>↑ 12,40% vs. período anterior</em></article>`,
      goal:`<article class="visual"><small>PROGRESSO DA META</small><strong>R$ 780.000,00</strong><em>78,00% realizado</em><div class="bar"><i style="width:78%"></i></div></article>`,
      compare:`<article class="visual"><small>COMPARATIVO</small><div class="split"><b>Atual<br>R$ 96,40 mil</b><b>Anterior<br>R$ 84,10 mil</b></div><em>↑ 14,63%</em></article>`,
      cashflow:`<article class="visual dark"><small>FLUXO DE CAIXA</small><strong>R$ 124,00 mil</strong><div class="split"><b>Entradas<br>R$ 342 mil</b><b>Saídas<br>R$ 218 mil</b></div></article>`,
      status:`<article class="visual dark"><small>STATUS OPERACIONAL</small><strong>146,91%</strong><em>● Entrada saudável</em></article>`,
      multi:`<article class="visual"><small>VISÃO EXECUTIVA</small><div class="quad"><b>Receita<br>R$ 428k</b><b>Clientes<br>1.248</b><b>Conversão<br>4,80%</b><b>NPS<br>72</b></div></article>`,
      trend:`<article class="visual"><small>ANÁLISE DE TENDÊNCIAS</small><strong>R$ 926 mil</strong><div class="quad"><b>Semana<br>3,20%</b><b>Mês<br>8,40%</b><b>Ano<br>21,70%</b></div></article>`,
      ranking:`<article class="visual"><small>RANKING COMPACTO</small><div class="rank">Norte <b>R$ 482k</b></div><div class="bar"><i style="width:100%"></i></div><div class="rank">Sul <b>R$ 391k</b></div><div class="bar"><i style="width:81%"></i></div></article>`,
      funnel:`<article class="visual dark"><small>FUNIL DE CONVERSÃO</small><div class="web-funnel"><b style="width:100%">Leads · 2.400</b><b style="width:72%">Oportunidades · 820</b><b style="width:52%">Vendas · 463</b></div></article>`,
      sla:`<article class="visual dark"><small>TICKETS E SLA</small><strong>142 abertos</strong><em>8 críticos · SLA 96,20%</em></article>`,
      inventory:`<article class="visual"><small>SAÚDE DO ESTOQUE</small><strong>8.420 itens</strong><em>312 críticos · 28 dias</em></article>`,
      sprint:`<article class="visual dark web-sprint"><small>SPRINT EM ANDAMENTO</small><strong>72,41% concluído</strong><em>42 de 58 tarefas · 5 dias</em><div class="bar"><i style="width:72%"></i></div></article>`
    };
    const html=map[c.preview]||map.revenue;
    return html.replace(/class="visual(?: dark)?([^\"]*)"/,`class="visual${mode==='dark'?' dark':''}$1"`);
  }

  function themedTemplate(value){
    const clean=value.replace(/\sdata-theme="(?:light|dark)"/,'');
    return clean.replace(/<article class="([^"]+)"/,`<article class="$1" data-theme="${themeMode}"`);
  }

  function themeCss(){
    if(themeMode==='dark')return `

/* FutureViz · modo escuro */
[data-theme="dark"]{color:#f8fafc!important;background:#172033!important;border-color:#334155!important}
[data-theme="dark"] .fv-tile,[data-theme="dark"] .fv-ranking details div{color:#f8fafc!important;background:#223044!important;border-color:#334155!important}
[data-theme="dark"] .fv-track,[data-theme="dark"] .fv-mini-track{background:#ffffff24!important}
[data-theme="dark"] .fv-head p,[data-theme="dark"] .fv-label,[data-theme="dark"] .fv-muted,[data-theme="dark"] .fv-period{color:#9fb0c5!important}`;
    return `

/* FutureViz · modo claro */
[data-theme="light"]{color:#172033!important;background:#fff!important;border-color:#dfe5ec!important}
[data-theme="light"] .fv-tile,[data-theme="light"] .fv-ranking details div{color:#172033!important;background:#f8fafc!important;border-color:#e7ecf2!important}
[data-theme="light"] .fv-track,[data-theme="light"] .fv-mini-track{background:#edf1f5!important}
[data-theme="light"] .fv-head p,[data-theme="light"] .fv-label,[data-theme="light"] .fv-muted,[data-theme="light"] .fv-period{color:#8a9ab2!important}`;
  }

  function themedValue(){
    if(key==='template')return themedTemplate(current.template);
    if(key==='style')return current.style+themeCss();
    return current[key]||'Campo Experimental vazio.';
  }

  function updateTheme(){
    stage.dataset.theme=themeMode;
    stage.innerHTML=preview(current,themeMode);
    document.querySelectorAll('[data-theme-mode]').forEach(button=>{
      const active=button.dataset.themeMode===themeMode;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    show();
  }

  function filters(box,keyName,selected,setter){
    const values=['Todos',...new Set(data.map(c=>c[keyName]))];
    box.innerHTML=values.map(v=>`<button class="${selected===v?'active':''}" data-value="${v}"><span>${v}</span><b>${v==='Todos'?data.length:data.filter(c=>c[keyName]===v).length}</b></button>`).join('');
    box.querySelectorAll('button').forEach(button=>button.onclick=()=>setter(button.dataset.value));
  }

  function draw(){
    filters(styleBox,'styleCategory',style,value=>{style=value;draw()});
    filters(sectorBox,'sector',sector,value=>{sector=value;draw()});
    const list=data.filter(c=>(style==='Todos'||c.styleCategory===style)&&(sector==='Todos'||c.sector===sector)&&(c.name+' '+c.desc).toLowerCase().includes(query));
    count.textContent=`${list.length} componentes`;
    grid.innerHTML=list.map(c=>{const i=data.indexOf(c);return `<article class="item"><div class="preview">${preview(c)}</div><div class="meta"><span>${c.styleCategory} · ${c.sector}</span><h3>${c.name}</h3><p>${c.desc}</p></div><div class="one"><button data-use="${i}">Usar componente</button></div></article>`}).join('');
    grid.querySelectorAll('[data-use]').forEach(button=>button.onclick=()=>open(Number(button.dataset.use)));
  }

  function show(){
    code.value=themedValue();
    document.querySelectorAll('[data-k]').forEach(button=>button.classList.toggle('active',button.dataset.k===key));
  }

  function open(index){
    current=data[index];key='template';themeMode=defaultTheme(current);
    title.textContent=current.name;
    label.textContent=`DataStudio · ${current.styleCategory} · ${current.sector}`;
    fields.innerHTML=current.fields.map(value=>`<li>${value}</li>`).join('');
    modal.classList.add('open');document.body.style.overflow='hidden';
    updateTheme();closeButton.focus();
  }

  function shut(){modal.classList.remove('open');document.body.style.overflow=''}

  closeButton.addEventListener('click',shut);
  modal.addEventListener('click',event=>{if(event.target===modal)shut()});
  document.querySelectorAll('[data-k]').forEach(button=>button.addEventListener('click',()=>{key=button.dataset.k;show()}));
  document.querySelectorAll('[data-theme-mode]').forEach(button=>button.addEventListener('click',()=>{themeMode=button.dataset.themeMode;updateTheme()}));
  copyButton.addEventListener('click',async()=>{await navigator.clipboard.writeText(themedValue());copyButton.textContent='Copiado';setTimeout(()=>copyButton.textContent='Copiar código completo',1300)});
  search.addEventListener('input',event=>{query=event.target.value.toLowerCase();draw()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))shut()});
  draw();
})();
