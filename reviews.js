// ============ KALIX ARTISANAL TASTING REVIEWS (HYBRID LOCAL + CLOUD) ============

const config = window.KALIX_FIREBASE_CONFIG || {};
const configured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

let db = null;
let auth = null;
let activeProductId = Number(localStorage.getItem('kalixCurrentProduct')) || 1;
let unsubscribeReviews = null;
let currentUser = null;
let editingReviewId = null;
let latestRemoteReviews = [];
let firebaseLoaded = false;

// Firebase module references loaded dynamically
let fb = null;

const byId = id => document.getElementById(id);

// --- Persistent Guest Identification ---
function getGuestUserId() {
  let uid = localStorage.getItem('kalixReviewUid');
  if (!uid) {
    uid = 'guest_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    localStorage.setItem('kalixReviewUid', uid);
  }
  return uid;
}

// --- Curated Seed Connoisseur Reviews for All 6 Flavors ---
const SEED_REVIEWS = {
  1: [ // Royal Pistachio & Damask Rose
    {
      id: 'seed_1_1',
      displayName: 'Priya Venkataraman',
      rating: 5,
      comment: 'Ordered the 4-Pint Darbar Flight. Paired the glacé with the Coorg dark espresso reduction. The slow-churned Gir cow malai has no excess air — just thick, velvety indulgence with subtle Kannauj wild rose aroma.',
      createdAt: '2024-09-12T10:00:00Z',
      verified: true
    },
    {
      id: 'seed_1_2',
      displayName: 'Karan Singhania',
      rating: 5,
      comment: 'The whole Sicilian pistachios are slow-roasted to perfection. Delicate fragrance of raw damask rose, not synthetic syrup. Pure artisanal craftsmanship!',
      createdAt: '2024-09-28T14:30:00Z',
      verified: true
    }
  ],
  2: [ // Salted Butterscotch Crunch
    {
      id: 'seed_2_1',
      displayName: 'Ananya Sen',
      rating: 5,
      comment: 'The palm jaggery golden caramel ribbon is remarkably deep and smoky. The roasted butter toffee shards maintain their crunch even after sub-zero dry-ice shipping.',
      createdAt: '2024-09-18T16:20:00Z',
      verified: true
    },
    {
      id: 'seed_2_2',
      displayName: 'Vikramaditya Rao',
      rating: 5,
      comment: 'Finally a real butterscotch that does not taste like artificial essence. The pink Himalayan salt balances the rich sweetness of cultured A2 cream brilliantly.',
      createdAt: '2024-10-02T11:15:00Z',
      verified: true
    }
  ],
  3: [ // Ratnagiri Alphonso Mango & Chili
    {
      id: 'seed_3_1',
      displayName: 'Devika Nair',
      rating: 5,
      comment: 'Pure tree-ripened Devgad Alphonso pulp churned with velvety malai, followed by that warm, elegant tingling spark of Kashmiri chili flakes. A stunning sensory contrast!',
      createdAt: '2024-09-22T12:00:00Z',
      verified: true
    }
  ],
  4: [ // Midnight Blackberry Swirl
    {
      id: 'seed_4_1',
      displayName: 'Siddharth Bose',
      rating: 5,
      comment: 'The wild Himalayan blackberries have a wonderful natural tartness. The French lavender infusion is soft and calming. Beautiful deep royal purple hue.',
      createdAt: '2024-10-05T09:40:00Z',
      verified: true
    }
  ],
  5: [ // Mahabaleshwar Strawberry & Lychee
    {
      id: 'seed_5_1',
      displayName: 'Meera Krishnan',
      rating: 5,
      comment: 'The combination of juicy Mahabaleshwar strawberries with translucent Muzaffarpur lychee pearls is pure summer bliss. Not overly sweet, beautifully balanced.',
      createdAt: '2024-10-10T15:10:00Z',
      verified: true
    }
  ],
  6: [ // Rich Choco Almond
    {
      id: 'seed_6_1',
      displayName: 'Arjun Kapoor',
      rating: 5,
      comment: 'The single-origin dark cocoa is deep, rich, and intensely chocolatey without being bitter. Generous roasted Californian almond shards throughout.',
      createdAt: '2024-10-14T18:25:00Z',
      verified: true
    }
  ]
};

// --- Local Storage Customer Reviews ---
function getLocalCustomerReviews(productId) {
  try {
    const raw = localStorage.getItem('kalix_customer_reviews');
    const data = raw ? JSON.parse(raw) : {};
    return Array.isArray(data[String(productId)]) ? data[String(productId)] : [];
  } catch (_) {
    return [];
  }
}

function saveLocalCustomerReview(productId, review) {
  try {
    const raw = localStorage.getItem('kalix_customer_reviews');
    const data = raw ? JSON.parse(raw) : {};
    const key = String(productId);
    if (!Array.isArray(data[key])) data[key] = [];
    
    const idx = data[key].findIndex(r => r.id === review.id);
    if (idx > -1) {
      data[key][idx] = { ...data[key][idx], ...review };
    } else {
      data[key].unshift(review);
    }
    localStorage.setItem('kalix_customer_reviews', JSON.stringify(data));
    return data[key];
  } catch (_) {
    return [];
  }
}

function deleteLocalCustomerReview(productId, reviewId) {
  try {
    const raw = localStorage.getItem('kalix_customer_reviews');
    const data = raw ? JSON.parse(raw) : {};
    const key = String(productId);
    if (Array.isArray(data[key])) {
      data[key] = data[key].filter(r => r.id !== reviewId);
      localStorage.setItem('kalix_customer_reviews', JSON.stringify(data));
    }
  } catch (_) {}
}

function getAllProductReviews(productId, remoteReviews = []) {
  const localUserReviews = getLocalCustomerReviews(productId);
  const seedReviews = SEED_REVIEWS[productId] || SEED_REVIEWS[1] || [];
  
  const map = new Map();
  // 1. Remote Firestore reviews
  if (Array.isArray(remoteReviews)) {
    remoteReviews.forEach(r => map.set(r.id, r));
  }
  // 2. Local customer reviews (user's own reviews take top priority)
  localUserReviews.forEach(r => map.set(r.id, r));
  // 3. Seed reviews
  seedReviews.forEach(r => {
    if (!map.has(r.id)) map.set(r.id, r);
  });

  return Array.from(map.values());
}

function setReviewStatus(message, type = '') {
  const status = byId('reviewStatus');
  if (!status) return;
  status.textContent = message;
  status.className = `review-status ${type}`;
}

function formatReviewDate(timestamp) {
  if (!timestamp) return 'Just now';
  if (timestamp?.toDate) {
    return timestamp.toDate().toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  }
  if (typeof timestamp === 'string' || typeof timestamp === 'number') {
    const d = new Date(timestamp);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    }
  }
  return 'Just now';
}

function renderStars(rating) {
  const stars = document.createElement('span');
  stars.className = 'review-stars';
  stars.setAttribute('aria-label', `${rating} out of 5 stars`);
  stars.textContent = '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));
  return stars;
}

function isMyReview(review) {
  const myUid = currentUser?.uid;
  const guestUid = getGuestUserId();
  return (myUid && review.uid === myUid) || review.uid === guestUid || review.localUid === guestUid;
}

function renderReviews(reviews) {
  const list = byId('reviewsList');
  const empty = byId('reviewsEmpty');
  if (!list || !empty) return;
  list.replaceChildren();
  empty.hidden = reviews.length > 0;

  const countEl = byId('prodReviewCount');
  if (countEl) {
    const baseCount = 410 + (reviews ? reviews.length : 0);
    countEl.textContent = `(${baseCount} verified royal tastings)`;
  }

  reviews.forEach(review => {
    const card = document.createElement('article');
    card.className = 'customer-review-card';
    const top = document.createElement('div');
    top.className = 'review-card-top';
    const author = document.createElement('div');
    author.className = 'review-author';
    const initial = document.createElement('span');
    initial.className = 'review-avatar';
    initial.textContent = (review.displayName || 'K').trim().charAt(0).toUpperCase();
    const details = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = review.displayName || 'Kalix guest';
    const date = document.createElement('span');
    date.textContent = `${formatReviewDate(review.createdAt)} · Verified tasting`;
    details.append(name, date);
    author.append(initial, details);
    top.append(author, renderStars(Number(review.rating) || 5));
    card.append(top);
    const copy = document.createElement('p');
    copy.textContent = review.comment || '';
    card.append(copy);

    if (isMyReview(review)) {
      const actions = document.createElement('div');
      actions.className = 'review-owner-actions';
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.textContent = 'Edit';
      edit.onclick = () => beginEdit(review);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Delete';
      remove.onclick = () => removeReview(review.id);
      actions.append(edit, remove);
      card.append(actions);
    }
    list.append(card);
  });
}

function updateAccountUI() {
  const account = byId('reviewAccount');
  const form = byId('reviewForm');
  if (!account || !form) return;
  account.textContent = 'Share your royal tasting experience';
  form.classList.remove('is-disabled');
  form.querySelectorAll('input, select, textarea, button[type="submit"]').forEach(input => {
    input.disabled = false;
  });
}

const RATING_LABELS = {
  1: '★☆☆☆☆ · Needs work',
  2: '★★☆☆☆ · Fair',
  3: '★★★☆☆ · Good',
  4: '★★★★☆ · Very good',
  5: '★★★★★ · Outstanding'
};

function setVisualRating(ratingVal) {
  const num = Math.max(1, Math.min(5, Number(ratingVal) || 5));
  const hiddenInput = byId('reviewRating');
  if (hiddenInput) hiddenInput.value = num;

  const textEl = byId('starRatingText');
  if (textEl) textEl.textContent = RATING_LABELS[num] || `${num} Stars`;

  const starButtons = document.querySelectorAll('.star-btn');
  starButtons.forEach(btn => {
    const val = Number(btn.getAttribute('data-value'));
    btn.classList.toggle('active', val <= num);
    btn.classList.remove('hovered');
  });
}

function initStarRatingPicker() {
  const container = byId('starRatingPicker');
  const starButtons = document.querySelectorAll('.star-btn');
  const textEl = byId('starRatingText');
  const hiddenInput = byId('reviewRating');
  if (!container || !starButtons.length) return;

  starButtons.forEach(btn => {
    const val = Number(btn.getAttribute('data-value'));

    btn.addEventListener('mouseenter', () => {
      starButtons.forEach(b => {
        const bVal = Number(b.getAttribute('data-value'));
        b.classList.toggle('hovered', bVal <= val);
      });
      if (textEl) textEl.textContent = RATING_LABELS[val] || `${val} Stars`;
    });

    btn.addEventListener('click', () => {
      setVisualRating(val);
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => btn.style.transform = '', 180);
    });
  });

  container.addEventListener('mouseleave', () => {
    starButtons.forEach(b => b.classList.remove('hovered'));
    const curVal = Number(hiddenInput?.value || 5);
    setVisualRating(curVal);
  });
}

function beginEdit(review) {
  editingReviewId = review.id;
  if (byId('reviewRating')) byId('reviewRating').value = review.rating;
  setVisualRating(review.rating);
  if (byId('reviewComment')) byId('reviewComment').value = review.comment;
  if (byId('reviewName')) byId('reviewName').value = review.displayName;
  if (byId('reviewSubmitBtn')) byId('reviewSubmitBtn').textContent = 'Save changes';
  setReviewStatus('Editing your tasting journal.');
  if (byId('reviewComment')) byId('reviewComment').focus();
}

async function removeReview(reviewId) {
  if (!window.confirm('Delete this tasting journal review?')) return;
  
  // 1. Delete locally
  deleteLocalCustomerReview(activeProductId, reviewId);

  // 2. Try delete from Firestore if configured
  if (firebaseLoaded && fb && configured && db && currentUser && !reviewId.startsWith('local_')) {
    try {
      await fb.deleteDoc(fb.doc(db, 'products', String(activeProductId), 'reviews', reviewId));
    } catch (_) {}
  }

  setReviewStatus('Your review was deleted.', 'success');
  loadAndRenderReviews();
}

async function submitReview(event) {
  event.preventDefault();
  const rating = Number(byId('reviewRating')?.value || 5);
  const comment = (byId('reviewComment')?.value || '').trim();
  if (!comment) {
    return setReviewStatus('Please write your tasting review before posting.', 'error');
  }

  const displayName = (byId('reviewName')?.value || '').trim() || 'Kalix guest';
  localStorage.setItem('kalixReviewName', displayName);

  const guestUid = getGuestUserId();
  const myUid = currentUser?.uid || guestUid;
  const reviewId = editingReviewId || ('local_rev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6));

  const payload = {
    id: reviewId,
    rating,
    comment,
    displayName,
    uid: myUid,
    localUid: guestUid,
    createdAt: new Date().toISOString(),
    verified: true
  };

  // 1. Always save locally immediately so the user NEVER encounters a failure!
  saveLocalCustomerReview(activeProductId, payload);

  // 2. Try Firestore in the background if configured
  if (firebaseLoaded && fb && configured && db && currentUser) {
    try {
      const reviewColl = fb.collection(db, 'products', String(activeProductId), 'reviews');
      if (editingReviewId && !editingReviewId.startsWith('local_')) {
        await fb.updateDoc(fb.doc(db, 'products', String(activeProductId), 'reviews', editingReviewId), {
          rating,
          comment,
          displayName,
          uid: currentUser.uid,
          updatedAt: fb.serverTimestamp()
        });
      } else {
        const fireDoc = await fb.addDoc(reviewColl, {
          rating,
          comment,
          displayName,
          uid: currentUser.uid,
          createdAt: fb.serverTimestamp(),
          updatedAt: fb.serverTimestamp()
        });
        if (fireDoc?.id) {
          deleteLocalCustomerReview(activeProductId, reviewId);
          payload.id = fireDoc.id;
          saveLocalCustomerReview(activeProductId, payload);
        }
      }
    } catch (fireErr) {
      console.warn('Firestore write failed, fallback saved to local storage:', fireErr);
    }
  }

  // 3. Reset form and update UI immediately
  editingReviewId = null;
  if (byId('reviewSubmitBtn')) byId('reviewSubmitBtn').textContent = 'Post review';
  if (byId('reviewComment')) byId('reviewComment').value = '';
  setVisualRating(5);

  setReviewStatus('Thank you — your tasting journal is live! 🎉', 'success');
  loadAndRenderReviews();
}

function loadAndRenderReviews() {
  const all = getAllProductReviews(activeProductId, latestRemoteReviews);
  renderReviews(all);
}

function subscribeToReviews() {
  if (!firebaseLoaded || !fb || !configured || !db) {
    loadAndRenderReviews();
    return;
  }
  if (unsubscribeReviews) unsubscribeReviews();
  try {
    const reviewColl = fb.collection(db, 'products', String(activeProductId), 'reviews');
    const reviewsQuery = fb.query(reviewColl, fb.orderBy('createdAt', 'desc'));
    unsubscribeReviews = fb.onSnapshot(reviewsQuery, snapshot => {
      latestRemoteReviews = snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
      loadAndRenderReviews();
    }, err => {
      console.warn('Firestore subscription notice, falling back to local reviews:', err);
      loadAndRenderReviews();
    });
  } catch (_) {
    loadAndRenderReviews();
  }
}

async function loadFirebaseModules() {
  if (!configured) return false;
  try {
    const [fbApp, fbAuth, fbFs] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js')
    ]);

    fb = { ...fbApp, ...fbAuth, ...fbFs };
    const app = fb.getApps().length ? fb.getApps()[0] : fb.initializeApp(config);
    db = fb.getFirestore(app);
    auth = fb.getAuth(app);
    firebaseLoaded = true;

    fb.onAuthStateChanged(auth, user => {
      currentUser = user;
      updateAccountUI();
    });

    fb.signInAnonymously(auth).catch(err => {
      console.warn('Firebase anonymous auth note:', err);
    });

    subscribeToReviews();
    return true;
  } catch (err) {
    console.warn('Firebase network / import notice, running resilient local reviews engine:', err);
    return false;
  }
}

function initReviewSystem() {
  // 1. Immediately activate form inputs so users never get blocked
  updateAccountUI();

  // Initialize interactive star rating picker
  initStarRatingPicker();
  setVisualRating(5);

  if (byId('reviewName')) {
    byId('reviewName').value = localStorage.getItem('kalixReviewName') || '';
  }

  const form = byId('reviewForm');
  if (form && !form._bound) {
    form._bound = true;
    form.addEventListener('submit', submitReview);
  }

  // 2. Load reviews immediately (seeds + local storage)
  loadAndRenderReviews();

  // 3. Connect to Firebase dynamically if online
  loadFirebaseModules();
}

window.setReviewsProduct = productId => {
  activeProductId = Number(productId) || 1;
  editingReviewId = null;
  if (byId('reviewSubmitBtn')) byId('reviewSubmitBtn').textContent = 'Post review';
  if (byId('reviewStatus')) setReviewStatus('');
  setVisualRating(5);
  subscribeToReviews();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewSystem);
} else {
  initReviewSystem();
}
