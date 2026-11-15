(() => {
  const media = window.PortfolioEffects.media;
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const ease = 'cubic-bezier(.16,1,.3,1)';
  const running = new Set();
  let heroVisible = false, frame = 0;

  function animate(element, keyframes, options) {
    if (!element || media.matches || document.hidden) return;
    const animation = element.animate(keyframes, {duration:800,easing:ease,fill:'backwards',...options});
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
  }
  function enterCase(id) {
    const caseStudy = document.getElementById(id);
    if (!caseStudy) return;
    animate(caseStudy.querySelector('.case-copy'), [{opacity:0,transform:'translateY(30px)'},{opacity:1,transform:'none'}]);
    animate(caseStudy.querySelector('.project-gallery'), [
      {opacity:0,transform:'translateY(38px) scale(.96)',clipPath:'inset(5% 2% 0 round 28px)'},
      {opacity:1,transform:'none',clipPath:'inset(0 round 20px)'}
    ], {duration:1050,delay:90});
  }
  window.addEventListener('portfolio-case-change', event => enterCase(event.detail));

  const scenes = [...document.querySelectorAll('[data-scene]')];
  const sceneObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    entry.target.classList.toggle('scene-visible', entry.isIntersecting);
  }), {threshold:.08});
  scenes.forEach(scene => sceneObserver.observe(scene));

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
    if (!hero || !heroVisible || media.matches || document.hidden) return;
    const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
    hero.style.setProperty('--scene-travel', `${(progress * 60).toFixed(2)}px`);
  }
  function schedule() {
    if (!frame && heroVisible && !media.matches && !document.hidden) frame = requestAnimationFrame(paint);
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
