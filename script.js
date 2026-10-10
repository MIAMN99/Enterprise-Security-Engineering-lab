// Public repository settings. Change these if you rename the GitHub repository.
const OWNER = 'MIAMN99';
const REPOSITORY = 'Enterprise-Security-Engineering-lab';
const BRANCH = 'main';
const gallery = document.querySelector('#gallery');
const status = document.querySelector('#gallery-status');
const dialog = document.querySelector('#lightbox');
const fullImage = document.querySelector('#lightbox-image');
const caption = document.querySelector('#lightbox-caption');

const readableName = (path) => path.split('/').pop().replace(/\.png$|\.jpe?g$|\.webp$/i, '').replace(/[_-]/g, ' ').trim();
const rawUrl = (path) => `https://raw.githubusercontent.com/${OWNER}/${REPOSITORY}/${BRANCH}/${path.split('/').map(encodeURIComponent).join('/')}`;

function addScreenshot(path) {
  const name = readableName(path);
  const card = document.createElement('button');
  card.className = 'gallery-card';
  card.type = 'button';
  const img = document.createElement('img');
  img.src = rawUrl(path);
  img.alt = `Lab evidence: ${name}`;
  img.loading = 'lazy';
  const info = document.createElement('div');
  info.className = 'gallery-info';
  const tag = document.createElement('small');
  tag.textContent = 'CONFIGURATION SCREENSHOT';
  const title = document.createElement('strong');
  title.textContent = name;
  info.append(tag, title);
  card.append(img, info);
  card.addEventListener('click', () => {
    fullImage.src = img.src;
    fullImage.alt = img.alt;
    caption.textContent = name;
    dialog.showModal();
  });
  gallery.append(card);
}

async function loadGallery() {
  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPOSITORY}/git/trees/${BRANCH}?recursive=1`;
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const data = await response.json();
    const images = (data.tree || [])
      .filter(item => item.type === 'blob' && /\.(png|jpe?g|webp)$/i.test(item.path))
      .filter(item => !/(^|\/)(assets|site-assets)\//i.test(item.path))
      .map(item => item.path)
      .sort((a,b) => a.localeCompare(b, undefined, { numeric: true }));
    if (!images.length) throw new Error('No screenshot images found');
    gallery.replaceChildren();
    images.forEach(addScreenshot);
    status.textContent = `${images.length} screenshots available`;
  } catch (error) {
    gallery.innerHTML = '';
    const fallback = document.createElement('div');
    fallback.className = 'gallery-empty';
    fallback.textContent = 'Screenshots could not be loaded automatically. Open the GitHub repository to view the uploaded evidence. (The GitHub API may be temporarily unavailable or rate-limited.)';
    gallery.append(fallback);
    status.textContent = 'Repository gallery temporarily unavailable';
  }
}
loadGallery();
