import {
  db,
  collection,
  getDocs,
  query,
  orderBy,
  auth,
  onAuthStateChanged
} from './firebase.js';

const localFallback = await fetch('./data.json').then(r => r.json()).catch(() => []);

async function loadRemoteAnime() {
  try {
    const q = query(collection(db, 'anime'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const items = snapshot.docs
      .map(doc => {
        const data = doc.data();
        if (data.published === false) return null;
        return { id: doc.id, ...data };
      })
      .filter(Boolean);

    return items.length ? items : null;
  } catch (error) {
    console.warn('Firebase is not available yet, using local data.json fallback.', error);
    return null;
  }
}

window.__remoteData = await loadRemoteAnime();
window.__fallbackData = localFallback;

if (window.__remoteData && window.__remoteData.length) {
  window.database = window.__remoteData;
} else {
  window.database = localFallback;
}

if (typeof window.router !== 'undefined') {
  if (window.location.hash.startsWith('#details/')) {
    const id = window.location.hash.split('/')[1];
    window.router.renderDetails(id);
  } else if (window.location.hash === '#anime' || window.location.hash === '#movies') {
    window.router.go(window.location.hash.replace('#', ''));
  } else {
    window.router.go('home');
  }
}

window.addEventListener('load', () => {
  if (typeof window.router !== 'undefined') {
    const activeTab = document.querySelector('.nav-item.active')?.dataset.tab || 'home';
    window.router.renderHome(activeTab);
  }
});
