(() => {
  const media = window.PortfolioEffects.media;
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const ease = 'cubic-bezier(.16,1,.3,1)';
  const running = new Set();
  let heroVisible = false, frame = 0;

  function animate(element, keyframes, options) {
    if (!element || window.PortfolioEffects.interaction === 'none' || document.hidden) return;
    element.getAnimations().forEach(animation => animation.cancel());
    const fade = window.PortfolioEffects.interaction === 'fade';
    const animation = element.animate(fade ? [{opacity:.4},{opacity:1}] : keyframes, fade ? {duration:180,easing:ease} : {duration:800,easing:ease,fill:'backwards',...options});
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
  }
  function enterCase(id) {
    const caseStudy = document.getElementById(id);
    if (!caseStudy) return;
    running.forEach(animation=>{if(animation.effect?.target.closest('.case-study')?.hidden)animation.cancel();});
    caseStudy.querySelectorAll('.case-copy > .case-kicker,.case-copy > h3,.case-copy > .case-summary,.case-copy > .result-callout,.case-copy > .case-facts,.case-copy > .detail-link').forEach((element,index)=>{
      animate(element,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}],{duration:750,delay:Math.min(index*70,280)});
    });
    animate(caseStudy.querySelector('.project-gallery'), [
      {opacity:.3,transform:'perspective(1000px) rotateY(-8deg) scale(.94)',clipPath:'circle(7% at 25% 48%)'},
      {opacity:1,transform:'none',clipPath:'circle(150% at 50% 50%)'}
    ], {duration:1150,delay:60});
  }
  window.addEventListener('portfolio-case-change', event => enterCase(event.detail));

  const scenes = [...document.querySelectorAll('[data-scene]')];
  const sceneObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('scene-visible', entry.isIntersecting);
  }), {threshold:.08});
  scenes.forEach(scene => sceneObserver.observe(scene));

  // Original decorative motifs, separate from the real charts and project results.
  const motifs = {
    fittrack:'<g class="ambient-flow"><path d="M-80 280H170L220 210L260 340L310 130L360 285H1040"/><path d="M-80 330H230L270 280L310 350L350 230L390 330H1040"/></g>',
    jalanyuk:'<g class="ambient-contours"><ellipse cx="700" cy="270" rx="310" ry="175"/><ellipse cx="700" cy="270" rx="230" ry="125"/><ellipse cx="700" cy="270" rx="150" ry="75"/></g><path class="ambient-flow" d="M-20 420Q220 430 320 290T680 210T1050 50"/>',
    telkom:'<g class="ambient-stream"><path d="M160 80H430M510 80H920M80 145H340M420 145H780M210 210H600M680 210H1080M30 275H470M550 275H870M140 340H370M450 340H1030M-80 405H280M360 405H760"/></g>',
    'pantau-asap':'<g class="ambient-wind"><path d="M-100 120Q120 20 390 130T1060 100M-80 230Q180 130 480 250T1130 170M-120 360Q160 260 450 380T1080 310"/><circle cx="350" cy="124" r="7"/><circle cx="760" cy="275" r="5"/><circle cx="540" cy="399" r="4"/></g>',
    'online-retail':'<g class="ambient-matrix"><path d="M150 400V300M250 400V220M350 400V250M450 400V130M550 400V170M650 400V90M750 400V120M850 400V50"/></g>',
    pose:'<g class="ambient-contours"><circle cx="720" cy="250" r="180"/><circle cx="720" cy="250" r="110"/><path d="M540 250H900M720 70V430M590 380L720 250L850 130"/></g><path class="ambient-flow" d="M-20 360Q180 360 250 220T480 190T740 300T1040 180"/>',
    happiness:'<g class="ambient-contours"><circle cx="700" cy="250" r="190"/><ellipse cx="700" cy="250" rx="95" ry="190"/><ellipse cx="700" cy="250" rx="190" ry="80"/><path d="M510 250H890M700 60V440"/></g>'
  };
  const caseObserver = new IntersectionObserver(entries=>entries.forEach(entry=>{entry.target.closest('.case-study').dataset.ambientInView=String(entry.isIntersecting);}),{threshold:0});
  document.querySelectorAll('.case-study').forEach(article=>{
    const art=document.createElementNS('http://www.w3.org/2000/svg','svg');
    art.classList.add('case-atmosphere');art.setAttribute('viewBox','0 0 1000 500');art.setAttribute('aria-hidden','true');art.setAttribute('focusable','false');
    art.innerHTML=motifs[article.id]||motifs['online-retail'];article.prepend(art);caseObserver.observe(art);
  });

  const main=document.querySelector('main');
  const stops=['karya','profil','pengalaman','kontak'].map(id=>document.getElementById(id)).filter(Boolean);
  let thread, route=[], mainTop=0;
  if(stops.length>1){
    thread=document.createElementNS('http://www.w3.org/2000/svg','svg');thread.classList.add('journey-thread');thread.setAttribute('aria-hidden','true');thread.setAttribute('focusable','false');thread.setAttribute('preserveAspectRatio','none');
    thread.innerHTML='<path class="thread-base"/><path class="thread-ink" pathLength="1"/>'+stops.map(()=>'<circle r="3.5" cx="24"/>').join('');main.prepend(thread);
    function measure(){
      const bounds=main.getBoundingClientRect();mainTop=bounds.top+scrollY;
      route=stops.map(stop=>stop.getBoundingClientRect().top-bounds.top+70);
      const first=route[0], path='M24 '+first+route.slice(1).map((y,i)=>` C4 ${route[i]+(y-route[i])*.35},44 ${route[i]+(y-route[i])*.7},24 ${y}`).join('');
      thread.setAttribute('viewBox',`0 0 48 ${main.offsetHeight}`);thread.style.height=`${main.offsetHeight}px`;
      thread.style.left=`${Math.max(0,stops[0].getBoundingClientRect().left-45)}px`;
      thread.querySelectorAll('path').forEach(line=>line.setAttribute('d',path));thread.querySelectorAll('circle').forEach((dot,i)=>dot.setAttribute('cy',route[i]));schedule();
    }
    new ResizeObserver(measure).observe(main);measure();
  }

  if (hero) {
    const observer = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      hero.dataset.inView = String(heroVisible);
      schedule();
    }, {threshold:0});
    observer.observe(hero);
  }
  function paint() {
    frame = 0;
    if (media.matches || document.hidden) return;
    if(hero && heroVisible){
      const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
      hero.style.setProperty('--scene-travel', `${(progress * 60).toFixed(2)}px`);
    }
    scenes.filter(scene=>scene.classList.contains('scene-visible')).forEach(scene=>{
      const travel=Math.max(-1,Math.min(1,(scene.getBoundingClientRect().top-innerHeight*.4)/innerHeight));
      scene.style.setProperty('--section-travel',`${(travel*24).toFixed(1)}px`);
    });
    if(thread){
      const line=scrollY+innerHeight*.55-mainTop, progress=Math.max(0,Math.min(1,(line-route[0])/(route.at(-1)-route[0])));
      thread.style.setProperty('--route-progress',progress.toFixed(4));
      thread.querySelectorAll('circle').forEach((dot,i)=>dot.classList.toggle('is-passed',line>=route[i]));
    }
  }
  function schedule() {
    if (!frame && !media.matches && !document.hidden) frame = requestAnimationFrame(paint);
  }
  window.addEventListener('scroll', schedule, {passive:true});
  const awake = () => {
    root.dataset.pageAwake = String(!document.hidden);
    if (document.hidden) {
      cancelAnimationFrame(frame); frame = 0;
      running.forEach(animation => animation.finish());
    } else schedule();
  };
  document.addEventListener('visibilitychange', awake); awake();
  media.addEventListener('change', () => {
    if (media.matches) {
      running.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame); frame = 0;
      hero?.style.setProperty('--scene-travel', '0px');
    } else schedule();
  });

  document.addEventListener('pointerdown',event=>{
    const control=event.target.closest('button:not(.gallery-zoom),a.button,a.header-cta');
    if(!control || media.matches || event.button!==0 || control.disabled)return;
    const bounds=control.getBoundingClientRect(),mark=document.createElement('span');
    mark.className='press-ink';mark.setAttribute('aria-hidden','true');
    mark.style.left=`${event.clientX-bounds.left}px`;mark.style.top=`${event.clientY-bounds.top}px`;control.append(mark);
    const animation=mark.animate([{opacity:.35,transform:'translate(-50%,-50%) scale(.25)'},{opacity:0,transform:'translate(-50%,-50%) scale(1.2)'}],{duration:550,easing:ease});
    animation.finished.catch(()=>{}).finally(()=>mark.remove());
  });

  // A bounded light reflection moves; clickable targets and charts stay still.
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.work-card,.data-instrument,.project-gallery,.contact-list a').forEach(surface => {
      let pointerFrame = 0, x = 50, y = 50;
      surface.addEventListener('pointermove', event => {
        if (media.matches) return;
        const bounds = surface.getBoundingClientRect();
        x = (event.clientX-bounds.left)/bounds.width*100;
        y = (event.clientY-bounds.top)/bounds.height*100;
        if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
          surface.style.setProperty('--light-x', `${x.toFixed(1)}%`);
          surface.style.setProperty('--light-y', `${y.toFixed(1)}%`);
          pointerFrame = 0;
        });
      });
      surface.addEventListener('pointerleave', () => {
        cancelAnimationFrame(pointerFrame); pointerFrame = 0;
        surface.style.setProperty('--light-x', '50%'); surface.style.setProperty('--light-y', '50%');
      });
    });
  }
})();
