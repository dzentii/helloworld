setTimeout(() => {
  // Обработка спойлеров
  const detailsElements = document.querySelectorAll('.spoiler details');
  detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        details.style.animation = 'fadeIn 0.5s';
      }
    });
  });

  // Инициализация Mermaid
  const initMermaid = () => {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose'
      });
      mermaid.init(undefined, '.mermaid')
    }
  }

  // Загрузка Mermaid
  if (typeof mermaid === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = initMermaid; 
    document.head.appendChild(script)
  } else {
    initMermaid()
  }
}, 1000);