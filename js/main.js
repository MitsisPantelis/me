// Lightweight scroll reveal using IntersectionObserver
document.addEventListener('DOMContentLoaded',function(){
  // Theme initialization: default to light unless user explicitly chose 'dark'
  const current = localStorage.getItem('theme');
  if(current === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.add('light');

  const toggle = document.getElementById('theme-toggle');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const isLight = document.documentElement.classList.toggle('light');
      // mirror classes: ensure only one theme class present
      if(isLight) document.documentElement.classList.remove('dark');
      else document.documentElement.classList.add('dark');
      localStorage.setItem('theme', isLight? 'light' : 'dark');
    })
  }

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible')
      }
    })
  },{threshold:0.12})

  // mark panels and cards for reveal
  document.querySelectorAll('.panel, .card, .project, .avatar').forEach(el=>{
    el.classList.add('reveal')
    observer.observe(el)
  })

  // Scroll indicator: hide when hero is not fully visible
  const scrollIndicator = document.querySelector('.scroll-indicator')
  if(scrollIndicator){
    const hero = document.getElementById('hero')
    const heroObserver = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting && e.intersectionRatio > 0.7){
          scrollIndicator.classList.remove('hidden')
        } else {
          scrollIndicator.classList.add('hidden')
        }
      })
    },{threshold:[0,0.7,1]})
    if(hero) heroObserver.observe(hero)
  }
})
