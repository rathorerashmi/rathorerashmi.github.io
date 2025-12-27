// Small interactions: nav toggle, smooth scroll, gallery lightbox, set year
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // nav toggle for small screens
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', () => {
    const visible = nav.style.display === 'flex';
    nav.style.display = visible ? '' : 'flex';
    if (!visible) nav.style.flexDirection = 'column';
  });

  // smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); if(nav.style.display==='flex' && window.innerWidth<900){nav.style.display='';} }
    });
  });

  // gallery lightbox
  const gallery = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');

  // state for lightbox navigation
  let galleryItems = [];
  let currentIndex = -1;

  function collectGalleryItems(){
    galleryItems = [];
    if(!gallery) return;
    gallery.querySelectorAll('img').forEach(img => {
      galleryItems.push({src: img.dataset.full || img.src, alt: img.alt || ''});
    });
  }

  function showLightboxAt(i){
    if(i < 0 || i >= galleryItems.length) return;
    currentIndex = i;
    const it = galleryItems[i];
    lbImg.src = it.src;
    lbImg.alt = it.alt;
    lightbox.setAttribute('aria-hidden','false');
    lbClose && lbClose.focus();
  }

  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    currentIndex = -1;
  }

  function showNext(){ if(currentIndex < galleryItems.length -1) showLightboxAt(currentIndex+1); }
  function showPrev(){ if(currentIndex > 0) showLightboxAt(currentIndex-1); }

  // load projects and render gallery
  function renderGallery(projects){
    if(!gallery) return;
    gallery.innerHTML = '';
    projects.forEach(proj => {
      proj.images.forEach(imgPath => {
        const wrapper = document.createElement('div');
        wrapper.className = 'project-card';
        const img = document.createElement('img');
        img.src = imgPath;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.setAttribute('tabindex','0');
        img.setAttribute('role','button');
        img.alt = proj.title + ' — ' + (proj.category || '');
        img.dataset.full = imgPath;
        // allow opening lightbox with Enter/Space when focused
        img.addEventListener('keydown', (ev)=>{
          if(ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            collectGalleryItems();
            const src = img.dataset.full || img.src;
            const idx = galleryItems.findIndex(it => it.src === src);
            showLightboxAt(idx === -1 ? 0 : idx);
          }
        });
        const caption = document.createElement('div');
        caption.className = 'note';
        caption.textContent = proj.title + ' • ' + proj.year;
        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        gallery.appendChild(wrapper);
      });
    });
  }

  function loadProjects(){
    fetch('js/projects.json').then(r=>r.json()).then(data=>{
      renderGallery(data);
    }).catch(err=>{
      console.warn('Could not load projects.json', err);
    });
  }

  loadProjects();

  gallery && gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if(!img) return;
    // ensure items collected
    collectGalleryItems();
    // find index
    const src = img.dataset.full || img.src;
    const idx = galleryItems.findIndex(it => it.src === src);
    showLightboxAt(idx === -1 ? 0 : idx);
  });
  lbClose && lbClose.addEventListener('click', ()=> closeLightbox());
  lbPrev && lbPrev.addEventListener('click', ()=> showPrev());
  lbNext && lbNext.addEventListener('click', ()=> showNext());
  lightbox && lightbox.addEventListener('click', (e)=> {
    if(e.target === lightbox) closeLightbox();
  });

  // keyboard support
  document.addEventListener('keydown', (e)=>{
    if(!lightbox || lightbox.getAttribute('aria-hidden') === 'true') return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') showNext();
    if(e.key === 'ArrowLeft') showPrev();
  });

  // contact form: rely on mailto action; optionally show simple validation
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      // Let mailto open the client; minimal validation already enforced by required fields
    });
  }
});