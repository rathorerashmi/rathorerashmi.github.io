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

  gallery && gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if(!img) return;
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
  });
  lbClose && lbClose.addEventListener('click', ()=> lightbox.setAttribute('aria-hidden', 'true'));
  lightbox && lightbox.addEventListener('click', (e)=> {
    if(e.target === lightbox) lightbox.setAttribute('aria-hidden','true');
  });

  // contact form: rely on mailto action; optionally show simple validation
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      // Let mailto open the client; minimal validation already enforced by required fields
    });
  }
});