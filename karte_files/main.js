
document.querySelector('.burger')?.addEventListener('click',()=>document.querySelector('.top-nav')?.classList.toggle('open'));
document.querySelectorAll('.check-answer').forEach(btn=>btn.addEventListener('click',()=>{const block=btn.closest('.check-block');const text=(block.querySelector('textarea').value||'').toLowerCase();const kws=(block.dataset.keywords||'').split('|').filter(Boolean);let found=[],miss=[];kws.forEach(k=>{const kl=k.toLowerCase();(text.includes(kl)?found:miss).push(k)});block.querySelector('.feedback').innerHTML=`<div class="ok">Najdeno: ${found.length?found.join(', '):'nič'}</div><div class="miss">Manjka: ${miss.length?miss.join(', '):'nič'}</div>`;}));
const termSearch=document.getElementById('termSearch'); if(termSearch){termSearch.addEventListener('input',()=>{const v=termSearch.value.toLowerCase();document.querySelectorAll('#termsTable tbody tr').forEach(tr=>{tr.style.display=tr.dataset.term.includes(v)?'':'none'})})}


// PATCH: click images in Karte/Testi to open larger preview
(function(){
  const imgs=[...document.querySelectorAll('.map-card .fig img, .test-img img')];
  if(!imgs.length) return;
  const modal=document.createElement('div');
  modal.className='img-modal';
  modal.innerHTML='<button class="close-modal" aria-label="Zapri">×</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(modal);
  const mimg=modal.querySelector('img'), cap=modal.querySelector('figcaption');
  function close(){modal.classList.remove('open')}
  modal.querySelector('.close-modal').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal) close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape') close()});
  imgs.forEach(img=>img.addEventListener('click',()=>{mimg.src=img.src; mimg.alt=img.alt||''; cap.textContent=img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || ''; modal.classList.add('open')}));
})();


// PATCH 2: learning page mobile subnavigation + inline flashcards
(function(){
  document.querySelectorAll('.subnav-toggle').forEach(btn=>{
    const sidebar=btn.parentElement?.querySelector('.sidebar');
    if(!sidebar) return;
    btn.addEventListener('click',()=>{
      const open=sidebar.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent=open ? '× Zapri podteme snovi' : '☰ Podteme snovi';
    });
    sidebar.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      if(window.innerWidth<=900){sidebar.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='☰ Podteme snovi'}
    }));
  });
  document.querySelectorAll('.inline-flash .flash-card').forEach(card=>{
    card.addEventListener('click',e=>{ if(e.target.closest('a,input,button')) return; card.classList.toggle('flipped'); });
  });
})();
