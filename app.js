(() => {
  'use strict';
  const data = window.siteContent;
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let language = 'zh';
  try { language = localStorage.getItem('cheng-language') === 'en' ? 'en' : 'zh'; } catch (_) {}
  const t = value => typeof value === 'object' ? value[language] : value;
  const galleryPages = new Map();
  function galleryMarkup(project, copy) {
    const images = project.images || [];
    if (!images.length) return '';
    const index = Math.min(galleryPages.get(project.id) || 0, images.length - 1);
    const active = images[index];
    return `<figure class="project-figure project-gallery" data-gallery="${escape(project.id)}" data-gallery-index="${index}" role="region" aria-roledescription="${language === 'zh' ? '图片轮播' : 'carousel'}" aria-label="${escape(t(project.title) + ': ' + copy.gallery)}">
      <div class="gallery-heading"><h4 class="gallery-title">${escape(t(active.title))}</h4><span class="gallery-count" aria-live="polite" aria-atomic="true">${index + 1} / ${images.length}</span></div>
      <div class="gallery-viewport"><div class="gallery-track" style="transform:translateX(-${index * 100}%)">${images.map((image, n) => `<div class="gallery-slide" aria-hidden="${n !== index}"><a class="project-image" href="${escape(image.src)}" target="_blank" rel="noopener noreferrer" tabindex="${n === index ? 0 : -1}" aria-label="${escape(copy.viewFigure + ': ' + t(image.title))}"><img src="${escape(image.src)}" width="${escape(image.width)}" height="${escape(image.height)}" alt="${escape(t(image.alt))}" loading="lazy" decoding="async"></a></div>`).join('')}</div></div>
      <div class="gallery-controls"><button class="gallery-step" type="button" data-step="-1"${index === 0 ? ' disabled' : ''}>${escape(copy.previousImage)}</button><div class="gallery-pages" role="group" aria-label="${escape(copy.gallery)}">${images.map((image, n) => `<button class="gallery-page" type="button" data-page="${n}" aria-label="${escape(copy.selectImage.replace('{n}', n + 1) + ': ' + t(image.title))}" aria-current="${n === index ? 'true' : 'false'}">${n + 1}</button>`).join('')}</div><button class="gallery-step" type="button" data-step="1"${index === images.length - 1 ? ' disabled' : ''}>${escape(copy.nextImage)}</button></div>
      <figcaption><span class="figure-caption">${escape(t(active.caption))}</span><span class="figure-credit">${escape(t(active.credit))}</span><a class="figure-link" href="${escape(active.src)}" target="_blank" rel="noopener noreferrer">${escape(copy.viewFigure)}</a></figcaption>
    </figure>`;
  }
  function showGalleryPage(figure, project, requestedIndex) {
    const index = Math.max(0, Math.min(requestedIndex, project.images.length - 1));
    if (index === Number(figure.dataset.galleryIndex)) return;
    galleryPages.set(project.id, index);
    figure.dataset.galleryIndex = String(index);
    figure.querySelector('.gallery-track').style.transform = `translateX(-${index * 100}%)`;
    figure.querySelectorAll('.gallery-slide').forEach((slide, n) => {
      slide.setAttribute('aria-hidden', String(n !== index));
      slide.querySelector('a').tabIndex = n === index ? 0 : -1;
    });
    figure.querySelectorAll('[data-page]').forEach((button, n) => button.setAttribute('aria-current', String(n === index)));
    figure.querySelector('[data-step="-1"]').disabled = index === 0;
    figure.querySelector('[data-step="1"]').disabled = index === project.images.length - 1;
    const active = project.images[index];
    figure.querySelector('.gallery-title').textContent = t(active.title);
    figure.querySelector('.gallery-count').textContent = `${index + 1} / ${project.images.length}`;
    figure.querySelector('.figure-caption').textContent = t(active.caption);
    figure.querySelector('.figure-credit').textContent = t(active.credit);
    figure.querySelector('.figure-link').href = active.src;
    const focused = document.activeElement;
    if (figure.contains(focused) && focused.closest('.gallery-slide')) {
      figure.querySelector('.gallery-slide[aria-hidden="false"] a').focus({preventScroll: true});
    } else if (figure.contains(focused) && focused.disabled) {
      figure.querySelector(`[data-page="${index}"]`).focus({preventScroll: true});
    }
  }
  function bindGalleries() {
    document.querySelectorAll('[data-gallery]').forEach(figure => {
      const project = data.projects.find(p => p.id === figure.dataset.gallery);
      figure.addEventListener('click', event => {
        const button = event.target.closest('button[data-page], button[data-step]');
        if (!button || button.disabled) return;
        const next = button.hasAttribute('data-page') ? Number(button.dataset.page) : Number(figure.dataset.galleryIndex) + Number(button.dataset.step);
        showGalleryPage(figure, project, next);
      });
      figure.addEventListener('keydown', event => {
        if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        showGalleryPage(figure, project, Number(figure.dataset.galleryIndex) + (event.key === 'ArrowRight' ? 1 : -1));
      });
      const viewport = figure.querySelector('.gallery-viewport');
      let touchStart = null;
      viewport.addEventListener('touchstart', event => {
        touchStart = event.touches.length === 1 ? {x: event.touches[0].clientX, y: event.touches[0].clientY} : null;
      }, {passive: true});
      viewport.addEventListener('touchcancel', () => { touchStart = null; }, {passive: true});
      viewport.addEventListener('touchend', event => {
        if (!touchStart || !event.changedTouches.length) return;
        const dx = event.changedTouches[0].clientX - touchStart.x;
        const dy = event.changedTouches[0].clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
        event.preventDefault();
        showGalleryPage(figure, project, Number(figure.dataset.galleryIndex) + (dx < 0 ? 1 : -1));
      }, {passive: false});
    });
  }
  function render() {
    const copy = data.copy[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelector('#navigation').setAttribute('aria-label', language === 'zh' ? '主导航' : 'Main navigation');
    document.querySelector('#heroPortrait').alt = copy.portraitAlt;
    document.querySelectorAll('[data-copy]').forEach(el => { el.textContent = copy[el.dataset.copy]; });
    document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
    document.querySelector('#researchCards').innerHTML = data.research.map((r,i) => `<article class="research-card"><span class="card-number">0${i+1}</span><h3>${escape(t(r.title))}</h3><p>${escape(t(r.text))}</p><span class="tagline">${escape(r.tag)}</span></article>`).join('');
    document.querySelector('#publicationList').innerHTML = data.publications.map(p => `<article class="publication"><span class="pub-year">${escape(p.year)}</span><div><h4>${escape(p.title)}</h4><p>${escape(p.authors)}<br>${escape(t(p.venue))}</p></div><a href="${escape(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(copy.paper + ': ' + p.title)}">${escape(copy.paper)}</a></article>`).join('');
    document.querySelector('#conferenceList').innerHTML = data.conferences.map(c => `<article class="conference-item"><div class="conference-meta"><time datetime="${escape(c.dateISO)}">${escape(t(c.date))}</time><span class="conference-role">${escape(t(c.role))}</span></div><div class="conference-body"><h3>${escape(t(c.name))}</h3><p class="conference-venue">${escape(t(c.venue))}</p>${c.topic ? `<p class="conference-topic"><span>${escape(copy.presentationTopic)}</span>${escape(t(c.topic))}</p>` : ''}</div></article>`).join('');
    document.querySelector('#conferencePhotos').innerHTML = data.conferencePhotos.map(photo => `<figure class="conference-gallery-item"><a href="${escape(photo.src)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(copy.viewConferencePhoto + ': ' + t(photo.caption))}"><img src="${escape(photo.src)}" width="${photo.width}" height="${photo.height}" alt="${escape(t(photo.alt))}" loading="lazy" decoding="async"></a><figcaption>${escape(t(photo.caption))}</figcaption></figure>`).join('');
    const timeline = items => items.map(item => `<article class="timeline-item"><p class="timeline-date">${escape(t(item.date))}</p><div class="timeline-organization">${item.logo ? `<span class="organization-logo${item.logo.theme ? ` organization-logo--${escape(item.logo.theme)}` : ''}"><img src="${escape(item.logo.src)}" width="${item.logo.width}" height="${item.logo.height}" alt="" decoding="async"></span>` : ''}<h4>${escape(t(item.name))}</h4></div><p class="role">${escape(t(item.role))}</p><p class="detail">${escape(t(item.detail))}</p></article>`).join('');
    document.querySelector('#workList').innerHTML = timeline(data.work);
    document.querySelector('#educationList').innerHTML = timeline(data.education);
    document.querySelector('#projectList').innerHTML = data.projects.map((p,i) => {
      const figure = galleryMarkup(p, copy);
      return `<article class="project-card${figure ? ' project-card--featured' : ''}"${p.id ? ` id="${escape(p.id)}"` : ''}><div class="project-top"><span class="project-type">${escape(copy[p.type])}</span><span>0${i+1}</span></div><div class="project-content${figure ? ' project-content--visual' : ''}"><div class="project-body"><h3>${escape(t(p.title))}</h3><p><strong>${escape(t(p.subtitle))}</strong><br>${escape(t(p.text))}</p><div class="project-tags">${p.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div>${p.links.length ? `<div class="project-links">${p.links.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(copy[link.label] + ': ' + t(p.title))}">${escape(copy[link.label])}</a>`).join('')}</div>` : ''}</div>${figure}</div></article>`;
    }).join('');
    bindGalleries();
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.lang;
    try { localStorage.setItem('cheng-language', language); } catch (_) {}
    render();
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
  render();
})();
