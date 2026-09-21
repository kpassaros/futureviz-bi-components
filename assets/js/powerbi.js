(()=>{
  const C=window.POWERBI||[];
  let style='Todos',sector='Todos',q='',current=C[0],themeMode=current?.theme||'light';
  const styleBox=document.querySelector('#pbStyleFilters'),sectorBox=document.querySelector('#pbSectorFilters'),modal=document.querySelector('#modal'),modalBody=document.querySelector('#modalBody'),modalClose=document.querySelector('#close'),pbModalLabel=document.querySelector('#pbModalLabel'),search=document.querySelector('#search'),grid=document.querySelector('#grid'),count=document.querySelector('#count');

  function visual(c,mode=c.theme||'light'){
    let body;
    if(c.id==='multi')body=`<div class="quad"><b>Receita<br>R$ 428k</b><b>Clientes<br>1.248</b><b>Conversão<br>4,80%</b><b>NPS<br>72</b></div>`;
    else if(['cashflow','comparativo'].includes(c.id))body=`<div class="split"><b>Atual<br>${c.value}</b><b>Referência<br>R$ 218k</b></div><em>${c.description}</em>`;
    else if(c.id==='ranking')body=`<div class="rank">Norte <b>R$ 482k</b></div><div class="bar"><i style="width:100%"></i></div><div class="rank">Sul <b>R$ 391k</b></div><div class="bar"><i style="width:81%"></i></div>`;
    else if(c.id==='funil')body=`<div class="web-funnel"><b style="width:100%">Leads · 2.400</b><b style="width:72%">Oportunidades · 820</b><b style="width:52%">Vendas · 463</b></div>`;
    else if(c.id==='meta')body=`<strong>${c.value}</strong><em>${c.description}</em><div class="bar"><i style="width:78%"></i></div>`;
    else body=`<strong>${c.value}</strong><em>${c.description}</em>`;
    return `<article class="visual${mode==='dark'?' dark':''}"><small>${c.name.toUpperCase()}</small>${body}</article>`;
  }

  function themedDax(value){
    let dax=value.replace(/<article(?![^>]*data-theme)/i,`<article data-theme='${themeMode}'`);
    if(themeMode==='dark'){
      dax=dax.replace(/background:(?:#fff(?:fff)?|linear-gradient\(135deg,#315CF5,#7C3AED\))/gi,'background:#17242D').replace(/color:#17242D/gi,'color:#fff').replace(/background:#(?:E4EAF0|E7EBF2)/gi,'background:#334155');
      if(!/color:#fff/i.test(dax))dax=dax.replace(/background:#17242D/i,'background:#17242D;color:#fff');
    }else{
      dax=dax.replace(/background:(?:#17242D|linear-gradient\(135deg,#315CF5,#7C3AED\))/gi,'background:#fff').replace(/color:#fff/gi,'color:#17242D').replace(/background:#334155/gi,'background:#E4EAF0');
      if(!/color:#17242D/i.test(dax))dax=dax.replace(/background:#fff/i,'background:#fff;color:#17242D');
    }
    return dax;
  }

  function filterGroup(box,values,selected,onSelect){
    box.innerHTML=values.map(v=>`<button class="${selected===v?'active':''}" data-value="${v}"><span>${v}</span><b>${v==='Todos'?C.length:C.filter(c=>c.styleCategory===v||c.sector===v).length}</b></button>`).join('');
    box.querySelectorAll('button').forEach(button=>button.onclick=()=>onSelect(button.dataset.value));
  }

  function draw(){
    filterGroup(styleBox,['Todos',...new Set(C.map(c=>c.styleCategory))],style,value=>{style=value;draw()});
    filterGroup(sectorBox,['Todos',...new Set(C.map(c=>c.sector))],sector,value=>{sector=value;draw()});
    const list=C.filter(c=>(style==='Todos'||c.styleCategory===style)&&(sector==='Todos'||c.sector===sector)&&(c.name+' '+c.description).toLowerCase().includes(q));
    count.textContent=list.length+' componentes';
    grid.innerHTML=list.map(c=>`<article class="item"><div class="preview">${visual(c)}</div><div class="meta"><span>${c.styleCategory} · ${c.sector}</span><h3>${c.name}</h3><p>${c.description}</p></div><div class="one"><button data-use="${c.id}">Usar componente</button></div></article>`).join('');
    grid.querySelectorAll('[data-use]').forEach(button=>button.onclick=()=>open(C.find(c=>c.id===button.dataset.use)));
  }

  function syncTheme(){
    const stage=modalBody.querySelector('.modal-stage'),codeField=modalBody.querySelector('#code');
    stage.dataset.theme=themeMode;stage.innerHTML=visual(current,themeMode);codeField.value=themedDax(current.dax);
    modal.querySelectorAll('[data-theme-mode]').forEach(button=>{const active=button.dataset.themeMode===themeMode;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  }

  function open(c){
    current=c;themeMode=c.theme||'light';pbModalLabel.textContent=`Power BI · ${c.styleCategory} · ${c.sector}`;
    modalBody.innerHTML=`<div class="modal-stage"></div><div class="modal-grid"><article class="info"><span class="eyebrow">Código completo</span><h2>${c.name}</h2><p>${c.description}</p><textarea class="code ds-code" id="code" readonly spellcheck="false"></textarea><div class="actions"><button class="button primary" id="copy" type="button">Copiar DAX completo</button><a class="button" href="../../guias/index.html#powerbi">Ver guia de utilização</a></div></article><aside class="info"><h3>Campos/dados Mínimos</h3><ul>${c.fields.map(x=>`<li>${x}</li>`).join('')}</ul><div class="ds-note"><b>Compatibilidade</b><p>Power BI · HTML Content · contexto de filtros.</p></div></aside></div>`;
    modalBody.querySelector('#copy').addEventListener('click',async event=>{await navigator.clipboard.writeText(themedDax(current.dax));event.currentTarget.textContent='Copiado';setTimeout(()=>event.currentTarget.textContent='Copiar DAX completo',1300)});
    modal.classList.add('open');document.body.style.overflow='hidden';syncTheme();modalClose.focus();
  }

  function shut(){modal.classList.remove('open');document.body.style.overflow=''}
  modalClose.addEventListener('click',shut);modal.addEventListener('click',event=>{if(event.target===modal)shut()});
  modal.querySelectorAll('[data-theme-mode]').forEach(button=>button.addEventListener('click',()=>{themeMode=button.dataset.themeMode;syncTheme()}));
  search.addEventListener('input',event=>{q=event.target.value.toLowerCase();draw()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))shut()});
  draw();
})();
