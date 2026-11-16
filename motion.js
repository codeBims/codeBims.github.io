(() => {
  const M = window.PortfolioModels;
  const reduced = window.PortfolioEffects?.media || matchMedia('(prefers-reduced-motion: reduce)');
  const text = (id,en) => document.documentElement.lang === 'en' ? en : id;
  const ease = 'cubic-bezier(.2,.8,.2,1)';
  const interaction = () => window.PortfolioEffects?.interaction || (reduced.matches ? 'fade' : 'full');
  function enter(el) {
    if (!el || interaction() === 'none') return;
    el.getAnimations().forEach(animation => animation.cancel());
    const full = interaction() === 'full';
    el.animate(full ? [{opacity:.25,transform:'translateY(12px)'},{opacity:1,transform:'none'}] : [{opacity:.4},{opacity:1}],{duration:full?440:180,easing:ease});
  }
  reduced.addEventListener('change',()=>{
    if(reduced.matches)document.getAnimations().forEach(animation=>{
      if(Number.isFinite(animation.effect?.getComputedTiming().endTime))animation.finish();
    });
  });

  document.querySelectorAll('[data-instrument]').forEach(instrument => {
    const grains = [...instrument.querySelectorAll('[data-grain]')];
    const front = instrument.querySelector('svg'); front.classList.add('instrument-front');
    const volume = document.createElement('div'); volume.className = 'instrument-volume';
    front.before(volume);
    const depthGrains = ['back','middle'].map(layer => {
      const plane = document.createElementNS('http://www.w3.org/2000/svg','svg');
      plane.setAttribute('viewBox','0 0 500 250'); plane.setAttribute('aria-hidden','true');
      plane.classList.add('instrument-plane',`instrument-plane-${layer}`);
      const points = grains.map(grain => { const point=grain.cloneNode();point.removeAttribute('data-grain');point.setAttribute('class','depth-grain');plane.append(point);return point; });
      volume.append(plane); return points;
    });
    volume.append(front);
    const grainLayers=[grains,...depthGrains];
    const buttons = [...instrument.querySelectorAll('[data-instrument-step]')];
    const toggle = instrument.querySelector('[data-instrument-toggle]');
    let stage = 0, paused = false, visible = false, hovering = false, focused = false, timer, frame;
    let positions = M.grainPositions(0);
    function paint(points) { points.forEach((p,i) => { grainLayers.forEach(layer=>{layer[i].setAttribute('cx',p.x);layer[i].setAttribute('cy',p.y);}); }); }
    function labels() { toggle.textContent = paused ? text('Putar','Play') : text('Jeda','Pause'); toggle.setAttribute('aria-pressed',String(!paused)); toggle.setAttribute('aria-label',paused ? text('Putar ilustrasi otomatis','Play the automatic illustration') : text('Jeda ilustrasi otomatis','Pause the automatic illustration')); toggle.hidden = reduced.matches; }
    function schedule() {
      clearTimeout(timer);
      if (!visible || paused || hovering || focused || reduced.matches || document.hidden) return;
      timer = setTimeout(() => show((stage+1)%3),4200);
    }
    function show(next, manual = false) {
      cancelAnimationFrame(frame); stage = next; instrument.dataset.stage = stage;
      buttons.forEach((button,i) => button.setAttribute('aria-pressed',String(i===stage)));
      const target=M.grainPositions(stage), from=positions.map(p=>({...p}));
      if (reduced.matches || (!visible && !manual)) { positions=target; paint(positions); if(manual)enter(front); schedule(); return; }
      const start=performance.now();
      function tick(now) {
        const progress=Math.min(1,(now-start)/950), e=1-Math.pow(1-progress,4);
        positions=target.map((p,i)=>({x:from[i].x+(p.x-from[i].x)*e,y:from[i].y+(p.y-from[i].y)*e})); paint(positions);
        if(progress<1) frame=requestAnimationFrame(tick); else schedule();
      }
      frame=requestAnimationFrame(tick);
    }
    buttons.forEach((button,i)=>button.addEventListener('click',()=>{paused=true;labels();show(i,true);}));
    toggle.addEventListener('click',()=>{paused=!paused;labels();schedule();});
    instrument.addEventListener('mouseenter',()=>{hovering=true;clearTimeout(timer);});
    instrument.addEventListener('mouseleave',()=>{hovering=false;schedule();});
    instrument.addEventListener('focusin',()=>{focused=true;clearTimeout(timer);});
    instrument.addEventListener('focusout',event=>{if(!instrument.contains(event.relatedTarget)){focused=false;schedule();}});
    new IntersectionObserver(entries=>{
      visible=entries[0].isIntersecting;
      if(!visible){clearTimeout(timer);cancelAnimationFrame(frame);positions=M.grainPositions(stage);paint(positions);}else schedule();
    },{threshold:.2}).observe(instrument);
    document.addEventListener('visibilitychange',()=>{if(document.hidden){clearTimeout(timer);cancelAnimationFrame(frame);}else{positions=M.grainPositions(stage);paint(positions);schedule();}});
    reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);positions=M.grainPositions(stage);paint(positions);labels();schedule();});
    window.addEventListener('portfolio-language-change',labels);labels();show(0);
  });

  document.querySelectorAll('[data-story]').forEach(story=>{
    const buttons=[...story.querySelectorAll('[data-story-step]')], panels=[...story.querySelectorAll('[data-story-panel]')];
    story.dataset.stage='0';
    if(story.dataset.story==='logs') {
      story.querySelector('.raw-logs').textContent=M.sampleLogs.join('\n');
      const summary=M.summarizeLogs(M.sampleLogs);
      story.querySelectorAll('.log-bars p').forEach(row=>{const count=summary[row.querySelector('span').textContent];row.querySelector('b').textContent=count;row.querySelector('i').style.setProperty('--bar',`${count/4*100}%`);});
    }
    function show(index) {
      story.dataset.stage=String(index);
      buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      panels.forEach((panel,i)=>{panel.hidden=i!==index;});enter(panels[index]);
      if(interaction()==='fade')enter(story.querySelector('.story-figure'));
    }
    buttons.forEach((button,i)=>{
      button.addEventListener('click',()=>show(i));
      button.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[next].focus();show(next);
      });
    });
  });

  document.querySelectorAll('[data-pose-lab]').forEach(lab=>{
    const article=lab.closest('.case-study')||document.querySelector('.detail-evidence');
    const gallery=article.querySelector('[data-gallery]'), video=gallery.querySelector('video');
    const seek=lab.querySelector('[data-video-seek]'), time=lab.querySelector('[data-video-time]');
    const buttons=[...lab.querySelectorAll('[data-model]')];let model='blaze';
    function modelLabels() {
      lab.querySelector('[data-model-value]').textContent=M.mae[model].toLocaleString(document.documentElement.lang==='en'?'en-US':'id-ID',{minimumFractionDigits:1});
      lab.querySelector('[data-model-bar]').style.setProperty('--mae',`${M.mae[model]/10*100}%`);
      lab.querySelector('[data-model-note]').textContent=model==='blaze' ? text('BlazePose juga mendeteksi 8/8 repetisi pada salah satu skenario. Hasil ini tidak berlaku otomatis pada semua kondisi.','BlazePose also detected 8/8 repetitions in one scenario. This does not automatically generalize to all conditions.') : text('Selisih MAE pada skenario ini 0,2°. Angka tersebut tidak cukup untuk menyimpulkan keunggulan umum satu model.','The MAE difference in this scenario is 0.2°. This alone does not establish that one model is generally superior.');
    }
    buttons.forEach(button=>button.addEventListener('click',()=>{model=button.dataset.model;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));modelLabels();}));
    function format(seconds){return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;}
    function updateTime(){
      const valid=Number.isFinite(video.duration)&&video.duration>0;seek.disabled=!valid;
      if(valid){seek.value=String(video.currentTime/video.duration*100);time.textContent=`${format(video.currentTime)} / ${format(video.duration)}`;seek.style.setProperty('--played',`${seek.value}%`);}
    }
    const showVideo=()=>{
      const slides=[...gallery.querySelectorAll('[data-gallery-slide]')];
      gallery.querySelectorAll('.gallery-thumbnails button')[slides.findIndex(slide=>slide.contains(video))].click();
    };
    lab.querySelector('[data-open-demo]').addEventListener('click',()=>{showVideo();gallery.scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'center'});video.focus({preventScroll:true});});
    seek.addEventListener('input',()=>{showVideo();video.pause();video.currentTime=Number(seek.value)/100*video.duration;updateTime();});
    ['loadedmetadata','timeupdate','seeked'].forEach(name=>video.addEventListener(name,updateTime));
    window.addEventListener('portfolio-language-change',modelLabels);modelLabels();updateTime();
  });

  const journey=document.querySelector('.journey-layout');
  if(journey){
    const chapters=[...journey.querySelectorAll('[data-chapter]')], links=[...journey.querySelectorAll('[data-chapter-link]')];
    const year=journey.querySelector('[data-chapter-year]'),photo=journey.querySelector('[data-chapter-photo]'),learning=journey.querySelector('[data-learning-mark]');
    new IntersectionObserver(entries=>{learning.dataset.inView=String(entries[0].isIntersecting);},{threshold:.2}).observe(learning);
    let active=-1, ticking=false;
    function select(index){
      if(active===index)return;active=index;const chapter=chapters[index];
      year.textContent=chapter.dataset.chapterYear;enter(year);
      links.forEach((link,i)=>i===index?link.setAttribute('aria-current','step'):link.removeAttribute('aria-current'));
      const src=chapter.dataset.chapterImage;photo.hidden=!src;learning.hidden=!!src;
      if(src){photo.src=src;photo.alt=links[index].textContent.trim();enter(photo);}else enter(learning);
    }
    function update(){const line=document.querySelector('.site-header').getBoundingClientRect().bottom+innerHeight*.3;let index=0;chapters.forEach((chapter,i)=>{if(chapter.getBoundingClientRect().top<line)index=i;});select(index);ticking=false;}
    window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
    window.addEventListener('resize',update);window.addEventListener('portfolio-language-change',()=>{active=-1;update();});update();
  }
  document.querySelectorAll('.contact-list a,.hero-actions a').forEach(link=>{
    if(!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
    link.addEventListener('pointermove',event=>{if(reduced.matches)return;const r=link.getBoundingClientRect();link.style.setProperty('--pointer-x',`${(event.clientX-r.left)/r.width*100}%`);link.style.setProperty('--pointer-y',`${(event.clientY-r.top)/r.height*100}%`);});
  });
  const signal=document.querySelector('.contact-signal path');
  function drawSignal(){
    if(!signal || interaction()==='none')return;
    signal.getAnimations().forEach(animation=>animation.cancel());
    if(interaction()==='full')signal.animate([{strokeDashoffset:260},{strokeDashoffset:0}],{duration:900,easing:ease});
    else enter(signal.closest('.contact-signal'));
  }
  const contact=document.querySelector('.contact-main');
  contact?.addEventListener('pointerenter',drawSignal);
  contact?.addEventListener('focusin',drawSignal);
  document.querySelector('[data-copy-email]')?.addEventListener('click',async()=>{
    const output=document.querySelector('[data-copy-status]');
    try {await navigator.clipboard.writeText('abimkaizen@gmail.com');output.textContent=text('Alamat email tersalin.','Email address copied.');}
    catch {output.textContent=text('Alamat email: abimkaizen@gmail.com','Email address: abimkaizen@gmail.com');}
    enter(output);drawSignal();
  });
})();
