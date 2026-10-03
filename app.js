(() => {
  'use strict';
  const data = window.siteContent;
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let language = 'zh';
  try { language = localStorage.getItem('cheng-language') === 'en' ? 'en' : 'zh'; } catch (_) {}
  const t = value => typeof value === 'object' ? value[language] : value;
  function render() {
    const copy = data.copy[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelector('meta[name="description"]').content = copy.description;
    document.querySelector('#navigation').setAttribute('aria-label', language === 'zh' ? '主导航' : 'Main navigation');
    document.querySelector('.research-visual').setAttribute('aria-label', language === 'zh' ? '研究方法示意：从数据，通过模型，发现结构' : 'Research approach: from data, through models, to structure');
    document.querySelectorAll('[data-copy]').forEach(el => { el.textContent = copy[el.dataset.copy]; });
    document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
    document.querySelector('#researchCards').innerHTML = data.research.map((r,i) => `<article class="research-card"><span class="card-number">0${i+1}</span><h3>${escape(t(r.title))}</h3><p>${escape(t(r.text))}</p><span class="tagline">${escape(r.tag)}</span></article>`).join('');
    document.querySelector('#publicationList').innerHTML = data.publications.map(p => `<article class="publication"><span class="pub-year">${escape(p.year)}</span><div><h4>${escape(p.title)}</h4><p>${escape(p.authors)}<br>${escape(t(p.venue))}</p></div><a href="${escape(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(copy.paper + ': ' + p.title)}">${escape(copy.paper)}</a></article>`).join('');
    document.querySelector('#conferenceList').innerHTML = data.conferences.map(c => `<article class="conference-item"><div class="conference-meta"><time datetime="${escape(c.dateISO)}">${escape(t(c.date))}</time><span class="conference-role">${escape(t(c.role))}</span></div><div class="conference-body"><h3>${escape(t(c.name))}</h3><p class="conference-venue">${escape(t(c.venue))}</p>${c.topic ? `<p class="conference-topic"><span>${escape(copy.presentationTopic)}</span>${escape(t(c.topic))}</p>` : ''}</div></article>`).join('');
    const timeline = items => items.map(item => `<article class="timeline-item"><p class="timeline-date">${escape(t(item.date))}</p><h4>${escape(t(item.name))}</h4><p class="role">${escape(t(item.role))}</p><p class="detail">${escape(t(item.detail))}</p></article>`).join('');
    document.querySelector('#workList').innerHTML = timeline(data.work);
    document.querySelector('#educationList').innerHTML = timeline(data.education);
    document.querySelector('#projectList').innerHTML = data.projects.map((p,i) => {
      const figure = p.image ? `<figure class="project-figure"><a class="project-image" href="${escape(p.image.src)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(copy.viewFigure + ': ' + t(p.title))}"><img src="${escape(p.image.src)}" width="${escape(p.image.width)}" height="${escape(p.image.height)}" alt="${escape(t(p.image.alt))}" loading="lazy" decoding="async"></a><figcaption><span class="figure-caption">${escape(t(p.image.caption))}</span><span class="figure-credit">${escape(t(p.image.credit))}</span><a class="figure-link" href="${escape(p.image.src)}" target="_blank" rel="noopener noreferrer">${escape(copy.viewFigure)}</a></figcaption></figure>` : '';
      return `<article class="project-card${p.image ? ' project-card--featured' : ''}"${p.id ? ` id="${escape(p.id)}"` : ''}><div class="project-top"><span class="project-type">${escape(copy[p.type])}</span><span>0${i+1}</span></div><div class="project-content${p.image ? ' project-content--visual' : ''}">${figure}<div class="project-body"><h3>${escape(t(p.title))}</h3><p><strong>${escape(t(p.subtitle))}</strong><br>${escape(t(p.text))}</p><div class="project-tags">${p.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div>${p.links.length ? `<div class="project-links">${p.links.map(link => `<a href="${escape(link.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(copy[link.label] + ': ' + t(p.title))}">${escape(copy[link.label])}</a>`).join('')}</div>` : ''}</div></div></article>`;
    }).join('');
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.lang;
    try { localStorage.setItem('cheng-language', language); } catch (_) {}
    render();
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
  render();
})();
