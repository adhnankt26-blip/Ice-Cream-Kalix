// ============ KALIX PREMIUM ICE CREAM — APP.JS ============

// ---- Data ----
const FLAVORS = [
  {
    id: 1,
    name: 'Kalix Royal Pistachio & Damask Rose Ice Cream',
    subtitle: 'Pistachio Rose Artisanal Tub',
    desc: 'Slow-churned 100% single-herd A2 Gir cow cream infused with copper-distilled Kannauj damask rose, folded with slow-roasted green pistachios and raw misri.',
    price: 699,
    tag: 'AWARD WINNER',
    tagColor: 'green',
    image: 'images/kalix_pistachio_rose.png',
    emoji: '🍨',
    category: 'saffron',
    swatchColor: '#2e7d32',
    glowColor: 'rgba(46, 125, 50, 0.22)',
    bg: 'linear-gradient(145deg, #eaf5ea 0%, #d5edd6 100%)',
    ingredients: ['Roasted Iranian Pistachio', 'Kannauj Damask Rose', '100% A2 Gir Malai', 'Raw Khandsari'],
    sweetness: 75, tartness: 18, creaminess: 96,
    stock: 12
  },
  {
    id: 2,
    name: 'Kalix Salted Butterscotch Crunch Ice Cream',
    subtitle: 'Butterscotch & Salted Jaggery Ice Cream Tub',
    desc: 'Slow-simmered palm jaggery golden caramel ribboned through rich A2 cow cream, studded with roasted butter toffee shards and pink Himalayan salt.',
    price: 749,
    tag: 'SIGNATURE CRUNCH',
    tagColor: 'amber',
    image: 'images/kalix_butterscotch.png',
    emoji: '🍯',
    category: 'heritage',
    swatchColor: '#d97706',
    glowColor: 'rgba(217, 119, 6, 0.22)',
    bg: 'linear-gradient(145deg, #fff7e6 0%, #fde6ba 100%)',
    ingredients: ['Butterscotch Toffee Shards', 'Palm Jaggery Caramel', 'Smoked Sea Salt', 'Cultured A2 Cream'],
    sweetness: 85, tartness: 10, creaminess: 94,
    stock: 10
  },
  {
    id: 3,
    name: 'Kalix Ratnagiri Alphonso & Kashmiri Chili Pop Ice Cream',
    subtitle: 'Mango Chili Pop Artisanal Tub',
    desc: 'Pure tree-ripened Devgad Alphonso mango pulp churned with velvety sweet malai, kissed with a warm spark of Kashmiri chili flakes and fresh Coorg lime.',
    price: 499,
    tag: 'SEASONAL HARVEST',
    tagColor: 'amber',
    image: 'images/kalix_mango_chili.png',
    emoji: '🥭',
    category: 'fruit',
    swatchColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.22)',
    bg: 'linear-gradient(145deg, #fff3e0 0%, #ffe0b2 100%)',
    ingredients: ['Devgad Alphonso Mango', 'Kashmiri Chili Flakes', 'Coorg Lime Zest', 'A2 Churned Malai'],
    sweetness: 88, tartness: 35, creaminess: 82,
    stock: 15
  },
  {
    id: 4,
    name: 'Kalix Midnight Blackberry Swirl Ice Cream',
    subtitle: 'Wild Blackberry & Botanical Lavender Tub',
    desc: 'Cold-steeped wild Himalayan blackberries with aromatic lavender notes, slow-swirled into velvety cultured cream and golden butter biscuit crumble.',
    price: 699,
    tag: 'RARE BOTANICAL',
    tagColor: 'berry',
    image: 'images/kalix_blackberry.png',
    emoji: '🫐',
    category: 'floral',
    swatchColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.22)',
    bg: 'linear-gradient(145deg, #f5eefb 0%, #e8d7f7 100%)',
    ingredients: ['Wild Blackberries', 'French Lavender Infusion', 'Golden Cookie Crumble', 'Cultured Cream'],
    sweetness: 72, tartness: 48, creaminess: 88,
    stock: 8
  },
  {
    id: 5,
    name: 'Kalix Mahabaleshwar Strawberry & Lychee Churn Ice Cream',
    subtitle: 'Strawberry Lychee Artisanal Tub',
    desc: 'Hand-picked Mahabaleshwar winter strawberries paired with succulent Muzaffarpur lychee pearls and bourbon vanilla folded into dense A2 Gir cream.',
    price: 549,
    tag: 'SUMMER CRUSH',
    tagColor: 'rose',
    image: 'images/kalix_strawberry_lychee.png',
    emoji: '🍓',
    category: 'fruit',
    swatchColor: '#e11d48',
    glowColor: 'rgba(225, 29, 72, 0.22)',
    bg: 'linear-gradient(145deg, #fdebf0 0%, #fad0dc 100%)',
    ingredients: ['Mahabaleshwar Strawberries', 'Muzaffarpur Shahi Lychee', 'Bourbon Vanilla Bean', 'A2 Sweet Cream'],
    sweetness: 80, tartness: 36, creaminess: 86,
    stock: 14
  },
  {
    id: 6,
    name: 'Kalix Rich Choco Almond Artisanal Ice Cream',
    subtitle: 'Rich Choco Almond Ice Cream Tub',
    desc: 'Velvety single-origin dark cocoa and slow-churned A2 Gir cow cream, laced with dark chocolate fudge swirl and roasted Californian almond shards.',
    price: 799,
    tag: 'ROYAL INDULGENCE',
    tagColor: 'amber',
    image: 'images/kalix_choco_almond.png',
    emoji: '🍫',
    category: 'heritage',
    swatchColor: '#5c3826',
    glowColor: 'rgba(92, 56, 38, 0.26)',
    bg: 'linear-gradient(145deg, #f7efe8 0%, #ecd8cb 100%)',
    ingredients: ['Single-Origin Dark Cocoa', 'Roasted Almond Shards', 'Dark Chocolate Fudge', 'A2 Churned Malai'],
    sweetness: 82, tartness: 8, creaminess: 98,
    stock: 10
  }
];

let cart = JSON.parse(localStorage.getItem('kalixCart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('kalixWishlist') || '[]');

function getFlavorStock(flavorId) {
  const f = FLAVORS.find(x => x.id === parseInt(flavorId) || x.id === flavorId);
  return (f && typeof f.stock === 'number') ? f.stock : 10;
}

function getCartItemQty(flavorId) {
  syncCartFromStorage();
  const item = cart.find(x => x.id === parseInt(flavorId) || x.id === flavorId);
  return item ? (Number(item.qty) || 0) : 0;
}

function renderCardActionHtml(flavorId) {
  const f = FLAVORS.find(x => x.id === parseInt(flavorId) || x.id === flavorId);
  if (!f) return '';
  const qty = getCartItemQty(flavorId);
  const stock = getFlavorStock(flavorId);

  if (qty > 0) {
    return `
      <div class="card-qty-stepper" data-card-stepper="${flavorId}" onclick="event.stopPropagation()">
        <button type="button" class="card-qty-btn card-qty-minus" onclick="event.stopPropagation();handleCardQtyChange(${flavorId}, -1)" title="Reduce quantity" aria-label="Reduce quantity">−</button>
        <span class="card-qty-val" aria-live="polite" aria-label="${qty} tubs in bag">${qty}</span>
        <button type="button" class="card-qty-btn card-qty-plus" onclick="event.stopPropagation();handleCardQtyChange(${flavorId}, 1)" title="Add more" aria-label="Add more" ${qty >= stock ? 'disabled' : ''}>+</button>
      </div>
    `;
  }

  return `
    <button type="button" class="boutique-add-btn" data-card-add="${flavorId}" onclick="event.stopPropagation();handleCardAdd(${flavorId})" title="Add to Bag">
      <span class="btn-caption">Add to Bag</span>
      <span class="material-icons">shopping_bag</span>
    </button>
  `;
}

function handleCardAdd(flavorId) {
  const f = FLAVORS.find(x => x.id === parseInt(flavorId) || x.id === flavorId);
  if (!f) return;
  const stock = getFlavorStock(flavorId);
  if (stock <= 0) {
    showToast('⚠️ Fresh batch is currently sold out.');
    return;
  }
  addToCart(flavorId, 1);
  updateAllCardActionButtons();
}

function handleCardQtyChange(flavorId, delta) {
  syncCartFromStorage();
  const f = FLAVORS.find(x => x.id === parseInt(flavorId) || x.id === flavorId);
  if (!f) return;
  const existing = cart.find(x => x.id === parseInt(flavorId) || x.id === flavorId);
  const stock = getFlavorStock(flavorId);

  if (!existing && delta > 0) {
    addToCart(flavorId, 1);
    updateAllCardActionButtons();
    return;
  }
  if (!existing) return;

  const newQty = existing.qty + delta;
  if (delta > 0 && existing.qty >= stock) {
    showToast(`⚠️ Batch limit reached: Maximum ${stock} tubs per order.`);
    return;
  }

  if (newQty <= 0) {
    removeFromCart(flavorId);
    showToast(`Removed from bag`);
  } else {
    existing.qty = newQty;
    saveCart();
    updateDrawer();
    if (document.body.dataset.page === 'cart') renderCartPage();
    showToast(`Updated bag quantity (${newQty} tubs)`);
  }
  updateAllCardActionButtons();
}

function updateAllCardActionButtons() {
  document.querySelectorAll('.card-action-wrap[data-flavor-id]').forEach(wrap => {
    const fid = parseInt(wrap.getAttribute('data-flavor-id'));
    if (!isNaN(fid)) {
      wrap.innerHTML = renderCardActionHtml(fid);
    }
  });
}

function getCartQuantity(items = cart) {
  return (Array.isArray(items) ? items : []).reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
}

function syncCartFromStorage() {
  try {
    const savedCart = JSON.parse(localStorage.getItem('kalixCart') || '[]');
    if (Array.isArray(savedCart)) cart = savedCart;
  } catch (_) { /* Keep the current cart if storage cannot be read. */ }
  return cart;
}

const MILESTONE_STEP = 10;
const MILESTONE_TARGET = MILESTONE_STEP;

function getPacksClaimed() {
  return parseInt(localStorage.getItem('kalixPacksClaimed') || '0');
}

function setPacksClaimed(count) {
  localStorage.setItem('kalixPacksClaimed', Math.max(0, count).toString());
}

function getTotalOrderedPints() {
  return parseInt(localStorage.getItem('kalixTotalOrderedPints') || '0');
}

function getMysteryPackProgress() {
  syncCartFromStorage();
  const packsClaimed = getPacksClaimed();
  const totalOrdered = getTotalOrderedPints();
  const cartPints = getCartQuantity(cart);
  const pageQtyEl = document.getElementById('qtyNum');
  const pageQty = (pageQtyEl && document.body.dataset.page === 'product') ? (parseInt(pageQtyEl.textContent) || 0) : 0;
  
  const pendingPints = Math.max(cartPints, pageQty);
  const totalPints = totalOrdered + pendingPints;
  const consumedPints = packsClaimed * MILESTONE_STEP;
  const currentPints = Math.max(0, totalPints - consumedPints);
  
  const isPending = sessionStorage.getItem('kalixPendingRewardPack') === 'true';
  const packsAvailable = Math.floor(currentPints / MILESTONE_STEP);
  const unlocked = isPending || (packsAvailable > 0);
  
  const cyclePints = unlocked ? MILESTONE_STEP : Math.min(currentPints % MILESTONE_STEP, MILESTONE_STEP);
  const remaining = unlocked ? 0 : Math.max(0, MILESTONE_STEP - (currentPints % MILESTONE_STEP));
  
  return {
    total: cyclePints,
    target: MILESTONE_STEP,
    remaining: remaining,
    unlocked: unlocked,
    packsClaimed: packsClaimed,
    lifetimeOrdered: totalOrdered,
    isPending: isPending
  };
}

function saveCart() {
  localStorage.setItem('kalixCart', JSON.stringify(cart));
  updateBadges();
  if (typeof updateRewardsUI === 'function') updateRewardsUI();
  updateAllCardActionButtons();
  document.dispatchEvent(new CustomEvent('kalix:cart-updated'));
}
function saveWishlist() { localStorage.setItem('kalixWishlist', JSON.stringify(wishlist)); updateBadges(); }

function updateBadges() {
  const cartCount = getCartQuantity(syncCartFromStorage());
  const wishCount = wishlist.length;
  const rewardCoins = typeof getRewardCoins === 'function' ? getRewardCoins() : parseInt(localStorage.getItem('kalixRewardsCoins') || '0');
  document.querySelectorAll('#cartBadge').forEach(b=>{
    const changed = b.textContent !== String(cartCount);
    b.textContent=cartCount;
    if (changed) { b.classList.remove('has-update'); void b.offsetWidth; b.classList.add('has-update'); }
  });
  document.querySelectorAll('#wishlistBadge').forEach(b=>{
    const changed = b.textContent !== String(wishCount);
    b.textContent=wishCount;
    if (changed) { b.classList.remove('has-update'); void b.offsetWidth; b.classList.add('has-update'); }
  });
  document.querySelectorAll('#navRewardsCount').forEach(b=>b.textContent=rewardCoins);
}

function addToCart(flavorId, qty=1) {
  syncCartFromStorage();
  const f = FLAVORS.find(x=>x.id===parseInt(flavorId)||x.id===flavorId);
  if(!f) return;
  const stock = getFlavorStock(flavorId);
  const existing = cart.find(x=>x.id===parseInt(flavorId)||x.id===flavorId);
  if(existing) {
    if (existing.qty + qty > stock) {
      existing.qty = stock;
      showToast(`⚠️ Batch limit reached: Maximum ${stock} tubs per order.`);
    } else {
      existing.qty += qty;
    }
  } else {
    cart.push({id:f.id, name:f.name, price:f.price, image:f.image, emoji:f.emoji, qty: Math.min(qty, stock)});
  }
  saveCart();
  const progress = getMysteryPackProgress();
  if(progress.unlocked) {
    showToast(`🎉 10 Ice Creams Reached! Mystery Pack unlocked for checkout!`);
  } else {
    showToast(`🍨 Added to bag! ${progress.remaining} more needed for Mystery Pack (${progress.total}/${MILESTONE_STEP}).`);
  }
  updateDrawer();
  updateAllCardActionButtons();
}

function addFlightToCart() {
  syncCartFromStorage();
  const flight = {
    id: 'flight1',
    name: 'The Royal Darbar 4-Tub Ice Cream Box',
    price: 2199,
    image: 'images/royal_flight.jpg',
    emoji: '🍨',
    qty: 1
  };
  const existing = cart.find(x=>x.id==='flight1');
  if(existing) existing.qty += 1;
  else cart.push(flight);
  saveCart();
  showToast('🍨 Royal Darbar 4-Tub Box added to Cryo-Bag!');
  updateDrawer();
}

function removeFromCart(id) {
  syncCartFromStorage();
  cart = cart.filter(x=>x.id!==id && x.id!==parseInt(id));
  saveCart();
  updateDrawer();
  renderCartPage();
  updateAllCardActionButtons();
}

function toggleWishlist(flavorId) {
  const idx = wishlist.findIndex(x=>x.id===flavorId);
  const f = FLAVORS.find(x=>x.id===flavorId);
  if(!f) return;
  if(idx>-1) {
    wishlist.splice(idx,1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push({id:f.id, name:f.name, price:f.price, image:f.image, emoji:f.emoji});
    showToast('❤️ Added to wishlist!');
  }
  saveWishlist();
  document.querySelectorAll(`[data-wish="${flavorId}"]`).forEach(b=>{
    const isW = wishlist.some(x=>x.id===flavorId);
    b.classList.toggle('active', isW);
    const icon = b.querySelector('.material-icons');
    if(icon) icon.textContent = isW ? 'favorite' : 'favorite_border';
  });
}

function isWishlisted(id) { return wishlist.some(x=>x.id===id); }

// ---- Toast ----
let toastTimer;
function showToast(msg) {
  let t = document.getElementById('toast');
  if(!t) { t=document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.innerHTML=`<span class="material-icons">check_circle</span>${msg}`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'),2800);
}

// ---- Cart Drawer ----
function openCartDrawer() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('drawerOverlay')?.classList.add('active');
  document.body.style.overflow='hidden';
}
function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('drawerOverlay')?.classList.remove('active');
  document.body.style.overflow='';
}
function updateDrawer() {
  const el = document.getElementById('drawerItems');
  const footer = document.getElementById('drawerFooter');
  if(!el) return;
  if(cart.length===0) {
    el.innerHTML=`<div class="empty-state"><span class="material-icons" style="font-size:48px;color:var(--outline)">shopping_bag</span><p>Your cryo-bag is empty.<br/>Start exploring our Ice Cream Tubs.</p><a href="index.html#flavors" class="btn-primary btn-sm" onclick="closeCartDrawer()">Explore Flavours</a></div>`;
    if(footer) footer.style.display='none';
    return;
  }
  el.innerHTML = cart.map(item=>{
    const f = FLAVORS.find(x=>x.id===item.id) || item;
    const img = item.image || (f && f.image) || 'images/kalix_pistachio_rose.png';
    return `
    <div class="drawer-item">
      <div class="drawer-item-img-wrap">
        <img src="${img}" alt="${item.name}" class="drawer-item-img" />
      </div>
      <div class="drawer-item-info">
        <div class="drawer-item-name">${item.name}</div>
        <div class="drawer-item-price">₹${(item.price*item.qty).toLocaleString('en-IN')} × ${item.qty}</div>
      </div>
      <button class="drawer-item-remove" onclick="removeFromCart('${item.id}')"><span class="material-icons">delete_outline</span></button>
    </div>`;
  }).join('');
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  if(document.getElementById('drawerTotal')) document.getElementById('drawerTotal').textContent='₹'+total.toLocaleString('en-IN');
  if(footer) footer.style.display='block';
}

// ---- Flavor Rendering ----
function renderFlavors(filter='all') {
  const grid = document.getElementById('flavorsGrid');
  if(!grid) return;
  const filtered = filter==='all' ? FLAVORS : FLAVORS.filter(f=>f.category===filter);
  grid.innerHTML = filtered.map(f=>{
    const wishActive = isWishlisted(f.id);
    return `
    <div class="flavor-card" onclick="goToProduct(${f.id})" tabindex="0" role="button" aria-label="View ${f.name}">
      <div class="flavor-card-stage" style="background:${f.bg}">
        <div class="card-stage-top">
          <span class="card-origin-pill">✦ 500 ML · PREMIUM ICE CREAM</span>
          <button class="card-wish-btn ${wishActive?'active':''}" data-wish="${f.id}" onclick="event.stopPropagation();toggleWishlist(${f.id})" title="${wishActive?'Remove from wishlist':'Save to wishlist'}">
            <span class="material-icons">${wishActive?'favorite':'favorite_border'}</span>
          </button>
        </div>
        <div class="card-tub-wrap">
          <img src="${f.image}" alt="${f.name}" class="flavor-tub-img" loading="lazy" />
        </div>
      </div>
      <div class="flavor-card-body">
        <div class="card-badge-row">
          <span class="flavor-tag-chip tag-${f.tagColor}">${f.tag}</span>
          <div class="card-rating-pill">
            <span class="star-icon">★</span>
            <span class="rating-num">4.9</span>
            <span class="rating-count">(400+)</span>
          </div>
        </div>
        <h3 class="flavor-name">${f.name}</h3>
        <div class="flavor-subtitle">${f.subtitle}</div>
        <p class="flavor-desc">${f.desc}</p>
        <div class="card-ingredients-strip">
          ${f.ingredients.slice(0,3).map(ing=>`<span class="card-mini-chip">${ing}</span>`).join('')}
        </div>
        <div class="flavor-footer">
          <div class="card-price-block">
            <span class="price-symbol">₹</span>
            <span class="price-val">${f.price}</span>
            <span class="price-unit">/ 500ml tub</span>
          </div>
          <div class="card-action-wrap" data-flavor-id="${f.id}">
            ${renderCardActionHtml(f.id)}
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
  requestAnimationFrame(()=> refreshMotionElements(grid));
}

function goToProduct(id) {
  localStorage.setItem('kalixCurrentProduct', id);
  window.location.href='product.html';
}

// ---- PIN Check & Automatic Indian Location Fetcher ----
const PIN_PREFIX_MAP = {
  '11': { state: 'Delhi', district: 'New Delhi', cityPill: 'delhi' },
  '12': { state: 'Haryana', district: 'Gurugram/Faridabad', cityPill: 'noida' },
  '13': { state: 'Haryana', district: 'Ambala/Panipat', cityPill: 'delhi' },
  '14': { state: 'Punjab', district: 'Ludhiana/Amritsar', cityPill: 'delhi' },
  '15': { state: 'Punjab', district: 'Bathinda/Firozpur', cityPill: 'delhi' },
  '16': { state: 'Chandigarh', district: 'Chandigarh', cityPill: 'delhi' },
  '20': { state: 'Uttar Pradesh', district: 'Noida/Ghaziabad', cityPill: 'noida' },
  '22': { state: 'Uttar Pradesh', district: 'Lucknow/Kanpur', cityPill: 'delhi' },
  '38': { state: 'Gujarat', district: 'Ahmedabad/Surat', cityPill: 'mumbai' },
  '40': { state: 'Maharashtra', district: 'Mumbai & Navi Mumbai', cityPill: 'mumbai' },
  '41': { state: 'Maharashtra', district: 'Pune', cityPill: 'pune' },
  '42': { state: 'Maharashtra', district: 'Nashik/Thane', cityPill: 'mumbai' },
  '50': { state: 'Telangana', district: 'Hyderabad', cityPill: 'hyderabad' },
  '56': { state: 'Karnataka', district: 'Bengaluru', cityPill: 'bengaluru' },
  '57': { state: 'Karnataka', district: 'Mangaluru/Mysuru', cityPill: 'bengaluru' },
  '60': { state: 'Tamil Nadu', district: 'Chennai', cityPill: 'chennai' },
  '62': { state: 'Tamil Nadu', district: 'Madurai/Tiruchirappalli', cityPill: 'chennai' },
  '64': { state: 'Tamil Nadu', district: 'Coimbatore', cityPill: 'chennai' },
  '67': { state: 'Kerala', district: 'Kannur / Kozhikode', cityPill: 'kerala' },
  '68': { state: 'Kerala', district: 'Kochi / Ernakulam', cityPill: 'kerala' },
  '69': { state: 'Kerala', district: 'Thiruvananthapuram', cityPill: 'kerala' },
  '70': { state: 'West Bengal', district: 'Kolkata', cityPill: 'kolkata' },
  '71': { state: 'West Bengal', district: 'Howrah', cityPill: 'kolkata' }
};

async function checkPin() {
  const pinInput = document.getElementById('pinInput');
  const pin = (pinInput?.value || '').trim();
  const resContainer = document.getElementById('pinResultContainer');
  const resText = document.getElementById('pinResult');
  const checkBtn = document.getElementById('checkPinBtn');

  if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    showToast('Please enter a valid 6-digit Indian PIN code (e.g. 670592)');
    if (resContainer) {
      resContainer.innerHTML = `
        <div class="pin-result-box error">
          <div class="pin-result-header">
            <div class="pin-location-title" style="color:var(--tertiary)">
              <span class="material-icons" style="color:var(--tertiary)">error_outline</span>
              <span>Invalid PIN Code format</span>
            </div>
            <span class="pin-status-tag error">6 Digits Required</span>
          </div>
          <p style="margin:0.5rem 0 0;font-size:13px;color:var(--on-surface-variant)">
            Please enter a valid 6-digit postal code (e.g., 670592 for Kannur, 560001 for Bengaluru).
          </p>
        </div>
      `;
    }
    return;
  }

  // Show fetching indicator
  if (checkBtn) {
    checkBtn.disabled = true;
    checkBtn.innerHTML = '<span class="pin-loading-spinner"></span> Checking...';
  }
  if (resContainer) {
    resContainer.innerHTML = `
      <p style="text-align:center;font-size:14px;color:var(--amber);margin:1rem 0;font-weight:600">
        <span class="pin-loading-spinner"></span> Fetching location details for PIN <strong>${pin}</strong>...
      </p>
    `;
  }

  let locationInfo = null;

  // 1. Fetch live postal location from India Postal PIN API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0].PostOffice) && data[0].PostOffice.length > 0) {
        const offices = data[0].PostOffice;
        // Find best matching post office
        const primaryPo = offices.find(p => p.BranchType === 'Sub Post Office' || p.DeliveryStatus === 'Delivery') || offices[0];
        locationInfo = {
          name: primaryPo.Name,
          district: primaryPo.District,
          state: primaryPo.State,
          block: primaryPo.Block && primaryPo.Block !== 'NA' ? primaryPo.Block : null,
          allOffices: offices.map(o => o.Name).slice(0, 4)
        };
      }
    }
  } catch (err) {
    console.warn('Postal PIN API note, falling back to prefix index:', err);
  }

  // 2. Fallback to regional prefix index if postal API returned no data or failed
  if (!locationInfo) {
    const prefix2 = pin.substring(0, 2);
    const prefix1 = pin.substring(0, 1);
    const fallback = PIN_PREFIX_MAP[prefix2];

    if (fallback) {
      locationInfo = {
        name: fallback.district,
        district: fallback.district,
        state: fallback.state,
        block: null
      };
    } else if (['1','2','3','4','5','6','7'].includes(prefix1)) {
      locationInfo = {
        name: `Zone ${prefix1}`,
        district: `Region ${pin.substring(0, 3)}`,
        state: 'India (Covered)',
        block: null
      };
    }
  }

  // Reset button text
  if (checkBtn) {
    checkBtn.disabled = false;
    checkBtn.textContent = 'Check Delivery PIN';
  }

  // 3. Highlight matching city pill in the grid
  highlightCityPillForPin(pin, locationInfo);

  // 4. Render Rich Result Box
  if (resContainer) {
    if (locationInfo) {
      const locDisplay = [locationInfo.name, locationInfo.district, locationInfo.state]
        .filter((v, i, a) => v && a.indexOf(v) === i)
        .join(', ');

      const officesSubtext = locationInfo.allOffices && locationInfo.allOffices.length > 1
        ? `<div style="font-size:11px;color:var(--outline);margin-top:2px">Covered localities: ${locationInfo.allOffices.join(' · ')}</div>`
        : '';

      resContainer.innerHTML = `
        <div class="pin-result-box">
          <div class="pin-result-header">
            <div>
              <div class="pin-location-title">
                <span class="material-icons">place</span>
                <span>${locDisplay}</span>
              </div>
              <div style="font-size:12px;font-weight:600;color:var(--outline);margin-left:26px">
                PIN Code: <strong>${pin}</strong>
              </div>
              ${officesSubtext}
            </div>
            <span class="pin-status-tag">✓ Express Delivery Available</span>
          </div>

          <div class="pin-result-details">
            <div class="pin-info-point">
              <span class="material-icons">ac_unit</span>
              <div>
                <strong style="color:var(--on-surface);display:block">-18°C Deep Frozen Cryo-Box</strong>
                <span>Packed with food-grade dry ice for 100% melt-free transit</span>
              </div>
            </div>
            <div class="pin-info-point">
              <span class="material-icons">local_shipping</span>
              <div>
                <strong style="color:var(--on-surface);display:block">Delivery Within 24–48 Hours</strong>
                <span>Direct express dispatch to ${locationInfo.district || 'your door'}</span>
              </div>
            </div>
            <div class="pin-info-point">
              <span class="material-icons">payments</span>
              <div>
                <strong style="color:var(--on-surface);display:block">Cash on Delivery (COD) Available</strong>
                <span>Pay by Cash or UPI on arrival</span>
              </div>
            </div>
            <div class="pin-info-point">
              <span class="material-icons">verified</span>
              <div>
                <strong style="color:var(--on-surface);display:block">Free Cold-Chain Shipping</strong>
                <span>Complimentary cryo-box on orders above ₹1,500</span>
              </div>
            </div>
          </div>

          <div class="pin-action-row">
            <span style="font-size:12px;color:var(--outline)">🍨 Pure A2 Malai Ice Cream ready for order</span>
            <a href="#flavors" class="pin-action-btn">
              Explore Ice Creams for ${locationInfo.district || 'Your City'} <span class="material-icons" style="font-size:16px">arrow_forward</span>
            </a>
          </div>
        </div>
      `;
    } else {
      resContainer.innerHTML = `
        <div class="pin-result-box error">
          <div class="pin-result-header">
            <div class="pin-location-title" style="color:var(--tertiary)">
              <span class="material-icons" style="color:var(--tertiary)">location_off</span>
              <span>PIN ${pin} — Outside Cold Chain</span>
            </div>
            <span class="pin-status-tag error">Not Covered Yet</span>
          </div>
          <p style="margin:0.6rem 0 0;font-size:13px;color:var(--on-surface-variant);line-height:1.5">
            We currently do not have sub-zero cold chain delivery to PIN ${pin}. We are rapidly expanding our dry-ice refrigerated hub network.
          </p>
          <div class="pin-action-row">
            <span style="font-size:12px;color:var(--outline)">Explore current special coupons & launch deals</span>
            <a href="javascript:void(0)" onclick="openOffersModal()" class="pin-action-btn" style="background:var(--tertiary)">
              View Exclusive Offers <span class="material-icons" style="font-size:16px">local_offer</span>
            </a>
          </div>
        </div>
      `;
    }
  }
}

function highlightCityPillForPin(pin, locationInfo) {
  const pills = document.querySelectorAll('.city-pill');
  if (!pills.length) return;

  const state = (locationInfo?.state || '').toLowerCase();
  const district = (locationInfo?.district || '').toLowerCase();
  const name = (locationInfo?.name || '').toLowerCase();

  let targetPill = null;

  if (state.includes('kerala') || district.includes('kannur') || district.includes('kochi') || district.includes('calicut') || district.includes('kozhikode') || pin.startsWith('67') || pin.startsWith('68') || pin.startsWith('69')) {
    targetPill = document.querySelector('.city-pill[data-city="kerala"]');
  } else if (district.includes('bengaluru') || district.includes('bangalore') || state.includes('karnataka') || pin.startsWith('56')) {
    targetPill = document.querySelector('.city-pill[data-city="bengaluru"]');
  } else if (district.includes('mumbai') || pin.startsWith('40')) {
    targetPill = document.querySelector('.city-pill[data-city="mumbai"]');
  } else if (district.includes('pune') || pin.startsWith('41')) {
    targetPill = document.querySelector('.city-pill[data-city="pune"]');
  } else if (district.includes('delhi') || pin.startsWith('11')) {
    targetPill = document.querySelector('.city-pill[data-city="delhi"]');
  } else if (district.includes('noida') || district.includes('gurgaon') || district.includes('gurugram') || pin.startsWith('12') || pin.startsWith('20')) {
    targetPill = document.querySelector('.city-pill[data-city="noida"]');
  } else if (district.includes('hyderabad') || state.includes('telangana') || pin.startsWith('50')) {
    targetPill = document.querySelector('.city-pill[data-city="hyderabad"]');
  } else if (district.includes('kolkata') || district.includes('howrah') || pin.startsWith('70')) {
    targetPill = document.querySelector('.city-pill[data-city="kolkata"]');
  } else if (district.includes('chennai') || district.includes('madras') || pin.startsWith('60')) {
    targetPill = document.querySelector('.city-pill[data-city="chennai"]');
  }

  if (targetPill) {
    pills.forEach(p => p.classList.remove('active'));
    targetPill.classList.add('active');
  }
}

// City Pill Click Handlers for Interactive PIN checking
document.addEventListener('DOMContentLoaded', () => {
  const cityPills = document.querySelectorAll('.city-pill');
  cityPills.forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.addEventListener('click', () => {
      cityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const pin = pill.getAttribute('data-pin');
      const pinInput = document.getElementById('pinInput');
      if (pin && pinInput) {
        pinInput.value = pin;
        checkPin();
      }
    });
  });
});

// ---- Newsletter ----
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('🎉 Welcome to the Royal Court! Check your inbox.');
  e.target.reset();
}

// ---- Navbar scroll ----
window.addEventListener('scroll', ()=>{
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY>10);
});

// ---- Filters ----
document.addEventListener('click', e=>{
  if(e.target.classList.contains('pill') && e.target.dataset.filter) {
    document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
    e.target.classList.add('active');
    renderFlavors(e.target.dataset.filter);
  }
});

// ---- Cart Icon click ----
document.addEventListener('click', e=>{
  const cartBtn = e.target.closest('#cartBtn');
  if(cartBtn) { e.preventDefault(); openCartDrawer(); }
});

// ---- Product Page with Dynamic Flavor & Color Morphing ----
function selectProductFlavor(id) {
  const f = FLAVORS.find(x => x.id === id);
  if (!f) return;
  localStorage.setItem('kalixCurrentProduct', id);
  if (typeof window.setReviewsProduct === 'function') window.setReviewsProduct(id);

  document.title = `${f.name} | Kalix Artisanal Ice Cream`;

  const el = id => document.getElementById(id);

  // 1. Morph background color and ambient shadow glow
  const galleryMain = el('prodGalleryMain');
  if (galleryMain) {
    galleryMain.style.background = f.bg;
    galleryMain.style.boxShadow = `0 24px 50px ${f.glowColor}, var(--shadow-md)`;
    galleryMain.style.border = `1.5px solid ${f.swatchColor}33`;
  }

  // 2. Smooth animated image swap
  const prodImg = el('prodImage');
  if (prodImg) {
    prodImg.classList.add('switching');
    setTimeout(() => {
      prodImg.src = f.image;
      prodImg.alt = f.name;
      prodImg.onload = () => {
        prodImg.classList.remove('switching');
      };
      setTimeout(() => prodImg.classList.remove('switching'), 220);
    }, 140);
  }

  // 3. Update pill & dynamic colors
  const pill = el('selectedFlavorPill');
  if (pill) {
    const shortName = f.name.replace('Kalix ', '').split(' Ice Cream')[0];
    pill.textContent = shortName;
    pill.style.color = f.swatchColor;
    pill.style.background = `${f.swatchColor}18`;
    pill.style.border = `1px solid ${f.swatchColor}44`;
  }

  // 4. Update texts and chips
  if (el('prodBreadcrumb')) el('prodBreadcrumb').textContent = f.subtitle;
  if (el('prodTag')) {
    el('prodTag').textContent = f.tag;
    el('prodTag').style.color = f.swatchColor;
  }
  if (el('prodTitle')) el('prodTitle').textContent = f.name;
  if (el('prodSubtitle')) el('prodSubtitle').textContent = f.subtitle;
  if (el('prodDesc')) el('prodDesc').textContent = f.desc;
  if (el('prodPrice')) el('prodPrice').textContent = '₹' + f.price;

  // 5. Update sensory spectrum bars with animated width & matching colors
  if (el('sweetBar')) {
    el('sweetBar').style.width = f.sweetness + '%';
    el('sweetBar').style.background = `linear-gradient(90deg, ${f.swatchColor}, var(--amber))`;
  }
  if (el('tartBar')) el('tartBar').style.width = f.tartness + '%';
  if (el('creamBar')) el('creamBar').style.width = f.creaminess + '%';
  if (el('sweetPct')) el('sweetPct').textContent = f.sweetness + '%';
  if (el('tartPct')) el('tartPct').textContent = f.tartness + '%';
  if (el('creamPct')) el('creamPct').textContent = f.creaminess + '%';

  if (el('ingChips')) {
    el('ingChips').innerHTML = f.ingredients.map(i => `<span class="ingr-chip">${i}</span>`).join('');
  }

  // 6. Update Add to Cart, Stock & Wishlist buttons
  const stock = getFlavorStock(f.id);
  const stockPill = el('productStockPill');
  if (stockPill) {
    stockPill.innerHTML = `<span class="material-icons" style="font-size:15px;color:var(--pistachio);vertical-align:-2px">check_circle</span> Fresh Batch in Stock: <strong>${stock} tubs available</strong>`;
  }
  const inCartQty = getCartItemQty(f.id);
  if (el('qtyNum')) el('qtyNum').textContent = inCartQty > 0 ? inCartQty : 1;

  if (el('addCartBtn')) {
    el('addCartBtn').onclick = () => {
      const q = parseInt(el('qtyNum')?.textContent || 1);
      addToCart(f.id, q);
      const btn = el('addCartBtn');
      btn.innerHTML = `Added to Bag (${q}) <span class="material-icons">check</span>`;
      setTimeout(() => {
        btn.innerHTML = `Add to Bag <span class="material-icons">shopping_bag</span>`;
      }, 1400);
    };
  }
  if (el('wishBtn')) {
    el('wishBtn').classList.toggle('active', isWishlisted(f.id));
    el('wishBtn').setAttribute('data-wish', f.id);
    el('wishBtn').onclick = () => toggleWishlist(f.id);
  }

  // 7. Update Swatch Cards Active State
  document.querySelectorAll('.flavor-swatch-card').forEach(card => {
    const cardId = parseInt(card.getAttribute('data-flavor-id'));
    const isActive = cardId === f.id;
    card.classList.toggle('active', isActive);
    if (isActive) {
      card.style.borderColor = f.swatchColor;
      card.style.boxShadow = `0 0 0 2px ${f.swatchColor}, 0 8px 20px ${f.glowColor}`;
    } else {
      card.style.borderColor = '';
      card.style.boxShadow = '';
    }
  });

  // 8. Update Related Grid
  const others = FLAVORS.filter(x => x.id !== f.id).slice(0, 3);
  const relGrid = el('relatedGrid');
  if (relGrid) {
    relGrid.innerHTML = others.map(r => `
      <div class="flavor-card" onclick="selectProductFlavor(${r.id});window.scrollTo({top:0,behavior:'smooth'});" style="cursor:pointer">
        <div class="flavor-card-stage" style="background:${r.bg}">
          <div class="card-stage-top">
            <span class="card-origin-pill">✦ 500 ML · PREMIUM ICE CREAM</span>
          </div>
          <div class="card-tub-wrap">
            <img src="${r.image}" alt="${r.name}" class="flavor-tub-img" />
          </div>
        </div>
        <div class="flavor-card-body">
          <div class="card-badge-row">
            <span class="flavor-tag-chip tag-${r.tagColor}">${r.tag}</span>
          </div>
          <h3 class="flavor-name">${r.name.replace('Kalix ', '').split(' Ice Cream')[0]}</h3>
          <div class="flavor-footer">
            <span class="flavor-price">₹${r.price}</span>
            <div class="card-action-wrap" data-flavor-id="${r.id}">
              ${renderCardActionHtml(r.id)}
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  // 9. Sync product reviews for current flavor
  if (typeof window.setReviewsProduct === 'function') {
    window.setReviewsProduct(f.id);
  }
}

function renderProductPage() {
  const id = parseInt(localStorage.getItem('kalixCurrentProduct')) || 1;
  const initial = FLAVORS.find(x => x.id === id) || FLAVORS[0];

  // Render Swatch Grid
  const swatchContainer = document.getElementById('flavorSwatchesGrid');
  if (swatchContainer) {
    swatchContainer.innerHTML = FLAVORS.map(f => {
      const shortTitle = f.name.replace('Kalix ', '').split(' Ice Cream')[0];
      return `
      <div class="flavor-swatch-card ${f.id === initial.id ? 'active' : ''}" 
           data-flavor-id="${f.id}" 
           onclick="selectProductFlavor(${f.id})"
           title="${f.name}">
        <span class="flavor-swatch-dot" style="background:${f.swatchColor}"></span>
        <div class="flavor-swatch-info">
          <span class="flavor-swatch-name">${shortTitle}</span>
          <span class="flavor-swatch-price">₹${f.price}</span>
        </div>
      </div>`;
    }).join('');
  }

  // Populate data for initial flavor
  selectProductFlavor(initial.id);

  // Stepper handlers
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyNum = document.getElementById('qtyNum');
  if (qtyMinus && !qtyMinus._bound) {
    qtyMinus._bound = true;
    qtyMinus.addEventListener('click', () => {
      let currentVal = parseInt(qtyNum?.textContent || '1');
      if (currentVal > 1) {
        currentVal--;
        if (qtyNum) qtyNum.textContent = currentVal;
      }
    });
  }
  if (qtyPlus && !qtyPlus._bound) {
    qtyPlus._bound = true;
    qtyPlus.addEventListener('click', () => {
      const curId = parseInt(localStorage.getItem('kalixCurrentProduct')) || initial.id;
      const curF = FLAVORS.find(x => x.id === curId) || initial;
      const maxStock = getFlavorStock(curF.id);
      let currentVal = parseInt(qtyNum?.textContent || '1');
      if (currentVal < maxStock) {
        currentVal++;
        if (qtyNum) qtyNum.textContent = currentVal;
      } else {
        showToast(`⚠️ Batch limit reached: Maximum ${maxStock} tubs available in this fresh batch.`);
      }
    });
  }
}

// ---- Cart Page ----
function renderCartPage() {
  const el = id => document.getElementById(id);
  const list = el('cartItemsList');
  if(!list) return;
  const checkoutBtn = el('checkoutBtn');
  const hasCartItems = cart.length > 0;
  if (checkoutBtn) {
    checkoutBtn.disabled = !hasCartItems;
    checkoutBtn.setAttribute('aria-disabled', String(!hasCartItems));
  }
  if(cart.length===0) {
    list.innerHTML=`<div class="empty-state" style="padding:4rem 0"><span class="material-icons" style="font-size:64px;color:var(--outline)">shopping_bag</span><p style="font-size:18px;margin:1rem 0">Your cryo-bag is empty.</p><a href="index.html#flavors" class="btn-primary">Explore Handcrafted Flavours</a></div>`;
    return;
  }
  list.innerHTML = cart.map(item=>{
    const f = FLAVORS.find(x=>x.id===item.id) || item;
    const img = item.image || (f && f.image) || 'images/kalix_pistachio_rose.png';
    return `
    <div class="cart-item">
      <div class="cart-item-img-wrap">
        <img src="${img}" alt="${item.name}" class="cart-item-img" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-tag">REAL A2 MALAI ICE CREAM TUB</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">500ml · 100% Single-Herd A2 Malai · Dry-Ice Cryo Packed Across India</div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-stepper">
          <button class="qty-btn" onclick="changeQty('${item.id}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}',1)">+</button>
        </div>
        <span class="cart-item-price">₹${(item.price*item.qty).toLocaleString('en-IN')}</span>
        <button class="drawer-item-remove" onclick="removeFromCart('${item.id}')"><span class="material-icons">delete_outline</span></button>
      </div>
    </div>`;
  }).join('');
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  let shipping = subtotal>=1499 ? 0 : 199;
  
  // Coupon benefit calculation
  const couponResult = calculateCouponBenefit(subtotal, shipping);
  let couponDiscount = 0;
  if (couponResult.active && couponResult.eligible) {
    couponDiscount = couponResult.discount;
    if (couponResult.freeShipping) shipping = 0;
  }

  const availableCoins = getRewardCoins();
  const maxCoinsUsable = Math.min(availableCoins, Math.ceil(Math.max(0, subtotal - couponDiscount) / COIN_VALUE_INR));
  if (appliedCartCoins > maxCoinsUsable) {
    appliedCartCoins = maxCoinsUsable;
    sessionStorage.setItem('kalixAppliedCoins', appliedCartCoins.toString());
  }
  const coinDiscount = appliedCartCoins * COIN_VALUE_INR;
  const total = Math.max(0, subtotal + shipping - couponDiscount - coinDiscount);

  if(el('subtotal')) el('subtotal').textContent='₹'+subtotal.toLocaleString('en-IN');
  if(el('shipping')) el('shipping').textContent = shipping===0?'FREE':'₹'+shipping;
  if(el('totalAmt')) el('totalAmt').textContent='₹'+total.toLocaleString('en-IN');

  const couponRow = el('couponDiscountRow');
  const couponGiftRow = el('couponGiftRow');
  const couponInput = el('cartCouponInput');
  const couponFeedback = el('cartCouponFeedback');

  if (couponRow) {
    if (couponDiscount > 0) {
      couponRow.style.display = 'flex';
      if (el('appliedCouponCode')) el('appliedCouponCode').textContent = couponResult.coupon.code;
      if (el('appliedCouponDiscount')) el('appliedCouponDiscount').textContent = couponDiscount.toLocaleString('en-IN');
    } else {
      couponRow.style.display = 'none';
    }
  }

  if (couponGiftRow) {
    couponGiftRow.style.display = (couponResult.active && couponResult.eligible && couponResult.freeTub) ? 'flex' : 'none';
  }

  if (couponInput && !couponInput.matches(':focus')) {
    couponInput.value = couponResult.active ? (couponResult.coupon?.code || getAppliedCouponCode()) : '';
  }

  if (couponFeedback) {
    if (couponResult.active) {
      couponFeedback.style.display = 'block';
      if (couponResult.eligible) {
        couponFeedback.style.color = 'var(--pistachio)';
        couponFeedback.innerHTML = `<span class="material-icons" style="font-size:14px;vertical-align:middle;margin-right:2px">check_circle</span> ${couponResult.message}`;
      } else {
        couponFeedback.style.color = '#d97706';
        couponFeedback.innerHTML = `<span class="material-icons" style="font-size:14px;vertical-align:middle;margin-right:2px">info</span> ${couponResult.message}`;
      }
    } else {
      couponFeedback.style.display = 'none';
    }
  }

  const discountRow = el('coinDiscountRow');
  if (discountRow) {
    if (coinDiscount > 0) {
      discountRow.style.display = 'flex';
      if (el('appliedCoinsCount')) el('appliedCoinsCount').textContent = appliedCartCoins;
      if (el('appliedCoinsDiscount')) el('appliedCoinsDiscount').textContent = coinDiscount.toLocaleString('en-IN');
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (el('redeemWalletBalance')) {
    el('redeemWalletBalance').textContent = `${availableCoins} Coins (₹${availableCoins * COIN_VALUE_INR})`;
  }

  const totalItems = cart.reduce((s,i)=>s+i.qty,0);

  // Reward Coins redemption in Cart (available whenever user has coins)
  const coinInput = el('coinsToApplyInput');
  const coinFeedback = el('coinRedeemFeedback');
  if (availableCoins <= 0) {
    if (coinInput) {
      coinInput.disabled = true;
      coinInput.value = '';
      coinInput.placeholder = '0 Coins available';
      coinInput.style.opacity = '0.7';
      coinInput.style.cursor = 'not-allowed';
    }
    if (coinFeedback) {
      coinFeedback.style.display = 'block';
      coinFeedback.style.color = 'var(--outline)';
      coinFeedback.innerHTML = `<span style="display:flex;align-items:center;gap:0.35rem"><span class="material-icons" style="font-size:14px">info</span> No coins available yet. Order 10 ice creams to unlock a Mystery Pack!</span>`;
    }
    if (appliedCartCoins > 0) {
      appliedCartCoins = 0;
      sessionStorage.removeItem('kalixAppliedCoins');
    }
  } else {
    if (coinInput) {
      coinInput.disabled = false;
      coinInput.placeholder = `Coins to use (max ${availableCoins})`;
      coinInput.style.opacity = '1';
      coinInput.style.cursor = 'text';
    }
    if (coinFeedback) {
      if (appliedCartCoins > 0) {
        coinFeedback.style.display = 'block';
        coinFeedback.style.color = 'var(--pistachio)';
        coinFeedback.innerHTML = `<span class="material-icons" style="font-size:14px;vertical-align:middle;margin-right:2px">check_circle</span> ${appliedCartCoins} Coins applied (-₹${appliedCartCoins * COIN_VALUE_INR} discount)!`;
      } else {
        coinFeedback.style.display = 'none';
      }
    }
  }

  const rewardsBanner = el('cartRewardsBanner');
  if (rewardsBanner) {
    if (totalItems >= MILESTONE_TARGET) {
      rewardsBanner.innerHTML = `
        <div style="background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border-radius:var(--r-lg);padding:1.25rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;box-shadow:0 4px 20px rgba(245,158,11,0.35)">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <span style="font-size:32px">👑</span>
            <div>
              <div style="font-weight:700;font-size:15px">${MILESTONE_TARGET} ICE CREAMS BONUS QUALIFIED!</div>
              <div style="font-size:12px;opacity:0.9">Your order qualifies for an exclusive Mystery Pack (Win 1–100 Coins)! Complete checkout to claim.</div>
            </div>
          </div>
          <a href="checkout.html" class="btn-primary" style="background:white;color:#b45309;font-weight:700;border:none;padding:0.6rem 1.25rem;box-shadow:var(--shadow-md);cursor:pointer;text-decoration:none">
            ⚡ PROCEED TO CHECKOUT
          </a>
        </div>`;
    } else {
      rewardsBanner.innerHTML = `
        <div style="background:rgba(217,119,6,0.06);border:1.5px dashed rgba(217,119,6,0.4);border-radius:var(--r-lg);padding:0.9rem 1.25rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem">
          <div style="display:flex;align-items:center;gap:0.5rem;font-size:13px;color:var(--on-surface)">
            <span style="font-size:18px">🪙</span>
            <span>Add <strong>${MILESTONE_TARGET - totalItems} more ice cream(s)</strong> to unlock your Royal Mystery Pack! (<strong>${totalItems}/${MILESTONE_TARGET}</strong>)</span>
          </div>
          <button onclick="openRewardsModal()" class="rewards-nav-btn" style="font-size:12px;padding:4px 10px">View Rewards</button>
        </div>`;
    }
  }

  const pct = Math.min((subtotal/1499)*100,100);
  if(el('pbFill')) el('pbFill').style.width=pct+'%';
  if(el('pbText')) el('pbText').textContent = subtotal<1499 ? `You're ₹${(1499-subtotal).toLocaleString('en-IN')} away from complimentary Pan-India Insulated Cryo-Shipping & a handcrafted brass tasting spoon set!` : '🎉 Complimentary Pan-India Cryo-Shipping & Brass Spoon Set Unlocked!';
}

function goToCheckout() {
  syncCartFromStorage();
  if (!cart.length) {
    showToast('Your bag is empty. Please add an ice cream before checkout.');
    return;
  }
  window.location.href = 'checkout.html';
}

function changeQty(id, delta) {
  syncCartFromStorage();
  const item = cart.find(x=>x.id===parseInt(id)||x.id===id);
  if(!item) return;
  const stock = getFlavorStock(item.id);
  if (delta > 0 && item.qty >= stock) {
    showToast(`⚠️ Batch limit reached: Maximum ${stock} tubs per order.`);
    return;
  }
  const newQty = item.qty + delta;
  if (newQty <= 0) {
    removeFromCart(id);
  } else {
    item.qty = newQty;
    saveCart();
    renderCartPage();
  }
}

// ---- Wishlist Page ----
function renderWishlistPage() {
  const grid = document.getElementById('wishlistGrid');
  const count = document.getElementById('wishCount');
  if(!grid) return;
  if(count) count.textContent = wishlist.length+' items';
  if(wishlist.length===0) {
    grid.innerHTML=`<div class="empty-state" style="padding:4rem 0;grid-column:1/-1"><span class="material-icons" style="font-size:64px;color:var(--outline)">favorite_border</span><p style="font-size:18px;margin:1rem 0">Your wishlist is empty.</p><a href="index.html#flavors" class="btn-primary">Explore Handcrafted Flavours</a></div>`;
  } else {
    grid.innerHTML = wishlist.map(item=>{
      const f = FLAVORS.find(x=>x.id===item.id) || item;
      const img = item.image || (f && f.image) || 'images/kalix_pistachio_rose.png';
      const bg = f.bg || 'linear-gradient(145deg, #eaf5ea 0%, #d5edd6 100%)';
      return `
      <div class="wishlist-card">
        <button class="wishlist-remove" onclick="removeFromWishlist(${item.id})" title="Remove"><span class="material-icons" style="font-size:16px">close</span></button>
        <div class="flavor-card-stage" style="background:${bg};height:200px">
          <div class="card-tub-wrap" style="height:140px">
            <img src="${img}" alt="${item.name}" class="flavor-tub-img" />
          </div>
        </div>
        <div class="flavor-card-body">
          <div class="flavor-name" style="font-size:18px">${item.name}</div>
          <div class="flavor-footer" style="margin-top:1rem">
            <div class="card-price-block">
              <span class="price-symbol">₹</span>
              <span class="price-val">${item.price}</span>
            </div>
            <div class="card-action-wrap" data-flavor-id="${item.id}">
              ${renderCardActionHtml(item.id)}
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  // Populate suggested grid if present
  const sugg = document.getElementById('suggestedGrid');
  if(sugg) {
    const suggestions = FLAVORS.slice(0, 4);
    sugg.innerHTML = suggestions.map(f=>{
      const wishActive = isWishlisted(f.id);
      return `
      <div class="flavor-card" onclick="goToProduct(${f.id})">
        <div class="flavor-card-stage" style="background:${f.bg}">
          <div class="card-stage-top">
            <span class="card-origin-pill">✦ 500 ML</span>
            <button class="card-wish-btn ${wishActive?'active':''}" data-wish="${f.id}" onclick="event.stopPropagation();toggleWishlist(${f.id})" title="Save to wishlist">
              <span class="material-icons">${wishActive?'favorite':'favorite_border'}</span>
            </button>
          </div>
          <div class="card-tub-wrap">
            <img src="${f.image}" alt="${f.name}" class="flavor-tub-img" />
          </div>
        </div>
        <div class="flavor-card-body">
          <div class="card-badge-row">
            <span class="flavor-tag-chip tag-${f.tagColor}">${f.tag}</span>
            <div class="card-rating-pill"><span class="star-icon">★</span> 4.9</div>
          </div>
          <h3 class="flavor-name" style="font-size:18px">${f.name}</h3>
          <div class="flavor-footer">
            <div class="card-price-block">
              <span class="price-symbol">₹</span>
              <span class="price-val">${f.price}</span>
            </div>
            <div class="card-action-wrap" data-flavor-id="${f.id}">
              ${renderCardActionHtml(f.id)}
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  }
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(x=>x.id!==id);
  saveWishlist();
  renderWishlistPage();
}

// ==========================================
// KALIX ROYAL REWARDS & EA FC PACK OPENING
// ==========================================
const COIN_VALUE_INR = 5; // 1 Coin = ₹5 value!
let appliedCartCoins = parseInt(sessionStorage.getItem('kalixAppliedCoins') || '0');

function getRewardCoins() {
  return parseInt(localStorage.getItem('kalixRewardsCoins') || '0');
}

function setRewardCoins(amount) {
  localStorage.setItem('kalixRewardsCoins', Math.max(0, amount).toString());
  updateBadges();
  updateRewardsUI();
}

function addRewardCoins(amount) {
  setRewardCoins(getRewardCoins() + amount);
}

// Probability: 1 to 20 has high win rate (80%), >20 has lower rate
function generatePackCoins() {
  const rand = Math.random();
  if (rand < 0.80) {
    // 80% chance: 1 to 20 coins
    return Math.floor(Math.random() * 20) + 1;
  } else if (rand < 0.95) {
    // 15% chance: 21 to 50 coins (Rare)
    return Math.floor(Math.random() * 30) + 21;
  } else {
    // 5% chance: 51 to 100 coins (Legendary 99 Walkout)
    return Math.floor(Math.random() * 50) + 51;
  }
}

// Web Audio API Sound Synthesizer (Zero external audio files needed)
function playFutAudio(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'shake') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(50, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 1.4);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } else if (type === 'boom') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } else if (type === 'reveal') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 1.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.7);
      });
    }
  } catch(e) {
    console.log('AudioContext ready');
  }
}

// Confetti Particle Canvas
let confettiAnimationId = null;
function startConfettiCanvas() {
  const canvas = document.getElementById('futCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f59e0b', '#fbbf24', '#d97706', '#10b981', '#34d399', '#ffffff', '#e11d48', '#38bdf8'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 120,
      y: canvas.height / 2 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 1.2) * 16,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45;
      p.vx *= 0.98;
      p.rotation += p.vRot;
      p.opacity -= 0.005;

      if (p.opacity > 0 && p.y < canvas.height + 50) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      }
    });

    if (alive) {
      confettiAnimationId = requestAnimationFrame(render);
    }
  }

  cancelAnimationFrame(confettiAnimationId);
  render();
}

// 10 Ice Creams Celebration Milestone Modal & Notification
function ensureMilestoneModal() {
  if (document.getElementById('milestoneModal')) return;
  const modal = document.createElement('div');
  modal.id = 'milestoneModal';
  modal.className = 'milestone-modal';
  modal.innerHTML = `
    <div class="milestone-aurora" aria-hidden="true"></div>
    <div class="milestone-stars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <!-- Top Sliding Notification Banner -->
    <div class="milestone-notify-banner">
      <div class="notify-icon-glow">
        <ion-icon name="notifications"></ion-icon>
      </div>
      <div class="notify-text-content">
        <div class="notify-headline">✦ ORDER MILESTONE NOTIFICATION ✦</div>
        <div class="notify-body">${MILESTONE_TARGET} Ice Creams Reached! You unlocked a Kalix Royal Mystery Pack!</div>
      </div>
      <button class="notify-close-btn" onclick="closeMilestoneScreen()" title="Close"><span class="material-icons">close</span></button>
    </div>

    <!-- Center Celebration Screen -->
    <div class="milestone-content-card">
      <div class="milestone-ribbon-tag">
        <ion-icon name="trophy"></ion-icon>
        <span>${MILESTONE_TARGET} ICE CREAMS CELEBRATION</span>
      </div>
      
      <div class="milestone-hero-visual">
        <div class="milestone-pulse-ring"></div>
        <div class="milestone-3d-coin-box">
          <div class="animated-3d-coin">
            <span class="coin-crown">👑</span>
            <span class="coin-sub">KALIX</span>
          </div>
        </div>
      </div>

      <h2 class="milestone-headline">Mystery Pack Unlocked!</h2>
      <p class="milestone-sub">
        Congratulations! For purchasing ${MILESTONE_TARGET} artisanal ice creams, you unlocked an exclusive Kalix Royal Pack. Win <strong>1 to 100 reward coins</strong> (1 Coin = ₹5 cash discount)!
      </p>

      <div class="milestone-probability-hint">
        <span class="prob-tag">✦ 1–20 Coins: High Drop Rate (80%)</span>
        <span class="prob-tag rare">✦ 21–100 Coins: Rare Walkout</span>
      </div>

      <div class="milestone-action-row">
        <button class="btn-primary btn-claim-checkout" onclick="openPackFromMilestone()">
          <ion-icon name="flash" style="font-size:20px"></ion-icon>
          <span>Crack Open Pack Now</span>
          <span class="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function triggerMilestoneScreen(force = false) {
  if (force) sessionStorage.setItem('kalixPendingRewardPack', 'true');
  ensureMilestoneModal();
  const modal = document.getElementById('milestoneModal');
  if (modal) {
    modal.classList.add('active');
    playFutAudio('reveal');
  }
}

function closeMilestoneScreen() {
  const modal = document.getElementById('milestoneModal');
  if (modal) modal.classList.remove('active');
}

function openPackFromMilestone() {
  closeMilestoneScreen();
  triggerPackOpening(null, true);
}

// Ensure Modal Structure in DOM
function ensureFutModal() {
  if (document.getElementById('futModal')) return;
  const modal = document.createElement('div');
  modal.id = 'futModal';
  modal.className = 'fut-modal';
  modal.innerHTML = `
    <canvas id="futCanvas" class="fut-confetti-canvas"></canvas>
    <div class="fut-grain" aria-hidden="true"></div>
    <div class="fut-vault-orbit fut-vault-orbit-one" aria-hidden="true"></div>
    <div class="fut-vault-orbit fut-vault-orbit-two" aria-hidden="true"></div>
    
    <div class="fut-stadium-lights">
      <div class="fut-beam"></div>
      <div class="fut-beam right"></div>
    </div>
    
    <div class="fut-pack-stage">
      <button onclick="closeFutModal()" class="fut-close-btn" title="Close"><span class="material-icons">close</span></button>

      <!-- PHASE 1: UNOPENED PACK -->
      <div id="futPackUnopened">
        <p class="fut-stage-eye">✦ ${MILESTONE_TARGET} ICE CREAMS SPECIAL UNLOCK ✦</p>
        <div class="fut-vault-status"><span></span>ROYAL VAULT SECURED<span></span></div>
        <div class="fut-card" id="futCardElement" onclick="startPackOpening()">
          <div class="fut-card-shimmer"></div>
          <div class="fut-card-corner top-left"></div><div class="fut-card-corner top-right"></div>
          <div class="fut-card-corner bottom-left"></div><div class="fut-card-corner bottom-right"></div>
          <div class="fut-card-header">
            <div>
              <div class="fut-card-rating">100</div>
              <div class="fut-card-pos">MAX COINS</div>
            </div>
            <div class="fut-card-emblem"><ion-icon name="ribbon"></ion-icon></div>
          </div>
          <div class="fut-card-crest">
            <div class="fut-inner-coin">🪙</div>
          </div>
          <div>
            <div class="fut-card-title">Kalix Royal Pack</div>
            <div class="fut-card-sub">MYSTERY COIN DROP (1–100)</div>
          </div>
        </div>
        <div class="fut-tap-prompt"><span class="material-icons">touch_app</span> Tap the pack to reveal your drop</div>
        <p class="fut-stage-hint">Every coin is worth <strong style="color:#fbbf24">₹5 Discount</strong> on your ice creams!</p>
        <button class="btn-primary btn-lg btn-claim-checkout" onclick="startPackOpening()" id="openPackBtn">
          <ion-icon name="flash" style="font-size:20px"></ion-icon>
          <span>TAP TO CRACK OPEN PACK!</span>
        </button>
      </div>

      <!-- PHASE 2: WALKOUT REVEAL -->
      <div id="futPackReveal" class="fut-reveal-container">
        <div id="revealedTierBadge" class="fut-tier-pill tier-gold">✦ REWARD COIN DROP ✦</div>
        
        <!-- 3D Animated Metallic Coin -->
        <div class="fut-3d-coin-stage">
          <div class="fut-coin-halo"></div>
          <div class="fut-3d-coin">
            <div class="coin-face-front">
              <span class="coin-symbol-large">🪙</span>
              <span class="coin-title-micro">KALIX COIN</span>
            </div>
          </div>
        </div>

        <div class="fut-coins-num" id="revealedCoinsCount">+0 COINS</div>
        <div class="fut-coins-headline">KALIX REWARD COINS WON!</div>
        <div class="fut-coins-val" id="revealedCashValue">Cash Value: ₹0 OFF</div>
        <p class="fut-reveal-sub">
          1 Coin = ₹5. Use these coins to pay for your ice cream orders directly at checkout!
        </p>

        <!-- ONLY Claim Coins to Checkout Button (Use on checkout removed) -->
        <div class="fut-actions-wrap">
          <button class="btn-primary btn-claim-checkout" onclick="claimCoinsToCheckout()">
            <ion-icon name="flash" style="font-size:20px"></ion-icon>
            <span>Claim Coins to Checkout</span>
            <span class="material-icons">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// ==========================================================================
// KALIX ROYAL OFFERS & COUPONS SYSTEM
// ==========================================================================

const KALIX_COUPONS = [
  {
    code: 'WELCOME500',
    title: 'Free 500ml Tub on First Order Above ₹1,499',
    badge: 'SPECIAL WELCOME OFFER',
    badgeBg: '#b45309',
    discountText: 'FREE 500ml Tub',
    desc: 'Join the Kalix Club privilege! Get a complimentary 500ml artisanal tub added with your first order above ₹1,499.',
    minOrder: 1499,
    type: 'free_tub',
    terms: 'Valid on orders of ₹1,499 and above. One-time welcome privilege.'
  },
  {
    code: 'TASTE100',
    title: 'Flat ₹100 Instant Cash Discount',
    badge: 'FIRST ORDER',
    badgeBg: '#15803d',
    discountText: 'FLAT ₹100 OFF',
    desc: 'Instant ₹100 off on any slow-churned pure A2 Gir cow milk ice cream order above ₹499.',
    minOrder: 499,
    type: 'flat',
    discountValue: 100,
    terms: 'Valid on orders of ₹499 and above.'
  },
  {
    code: 'FREESHIP',
    title: 'Complimentary Cryo-Express Shipping',
    badge: 'FREE DELIVERY',
    badgeBg: '#2563eb',
    discountText: 'SAVE ₹199 SHIPPING',
    desc: 'Enjoy free melt-free sub-zero cryo-insulated delivery (-18°C guaranteed) right to your doorstep.',
    minOrder: 999,
    type: 'free_shipping',
    discountValue: 199,
    terms: 'Valid on orders of ₹999 and above.'
  },
  {
    code: 'ROYAL15',
    title: '15% Off Handcrafted Heritage Tubs',
    badge: 'CONNOISSEUR CLUB',
    badgeBg: '#ea580c',
    discountText: '15% OFF (UP TO ₹250)',
    desc: 'Exclusive 15% discount on all single-herd malai tubs, tasting flights, and royal hampers.',
    minOrder: 1199,
    type: 'percent',
    percent: 15,
    maxDiscount: 250,
    terms: 'Maximum discount ₹250. Valid on orders above ₹1,199.'
  },
  {
    code: 'FESTIVE20',
    title: '20% Off Festive Celebrations',
    badge: 'FESTIVAL SPECIAL',
    badgeBg: '#7c3aed',
    discountText: '20% OFF (UP TO ₹400)',
    desc: 'Celebrate auspicious moments with our GI-tagged Saffron & Alphonso Ice Creams.',
    minOrder: 1999,
    type: 'percent',
    percent: 20,
    maxDiscount: 400,
    terms: 'Maximum discount ₹400. Valid on orders above ₹1,999.'
  }
];

function getAppliedCouponCode() {
  return (localStorage.getItem('kalixAppliedCoupon') || '').toUpperCase().trim();
}

function setAppliedCouponCode(code) {
  if (code) {
    localStorage.setItem('kalixAppliedCoupon', code.toUpperCase().trim());
  } else {
    localStorage.removeItem('kalixAppliedCoupon');
  }
}

function calculateCouponBenefit(subtotal, shipping = 199) {
  const code = getAppliedCouponCode();
  if (!code) return { active: false };

  const coupon = KALIX_COUPONS.find(c => c.code === code);
  if (!coupon) return { active: false, invalid: true, code };

  if (subtotal < coupon.minOrder) {
    return {
      active: true,
      eligible: false,
      coupon,
      needed: coupon.minOrder - subtotal,
      message: `Add ₹${(coupon.minOrder - subtotal).toLocaleString('en-IN')} more to unlock coupon ${coupon.code}!`
    };
  }

  let discount = 0;
  let freeShipping = false;
  let freeTub = false;

  if (coupon.type === 'flat') {
    discount = Math.min(coupon.discountValue, subtotal);
  } else if (coupon.type === 'free_shipping') {
    freeShipping = true;
    discount = shipping;
  } else if (coupon.type === 'percent') {
    discount = Math.min(Math.round((subtotal * coupon.percent) / 100), coupon.maxDiscount || Infinity);
  } else if (coupon.type === 'free_tub') {
    freeTub = true;
    discount = 0;
  }

  return {
    active: true,
    eligible: true,
    coupon,
    discount,
    freeShipping,
    freeTub,
    message: freeTub ? `Free 500ml Tub unlocked with ${coupon.code}!` : `Saved ₹${discount.toLocaleString('en-IN')} with ${coupon.code}!`
  };
}

function ensureOffersModal() {
  if (document.getElementById('offersModal')) return;
  const modal = document.createElement('div');
  modal.id = 'offersModal';
  modal.className = 'offers-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'offersModalTitle');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeOffersModal();
  });

  modal.innerHTML = `
    <div class="offers-modal-card">
      <div class="offers-modal-hero">
        <button class="offers-modal-close" onclick="closeOffersModal()" aria-label="Close offers modal">
          <span class="material-icons">close</span>
        </button>
        <div class="offers-hero-badge">
          <span class="material-icons" style="font-size:13px">local_offer</span> EXCLUSIVE PRIVILEGES
        </div>
        <h2 id="offersModalTitle">Kalix Offers &amp; Coupons</h2>
        <p>Apply these exclusive coupon codes at checkout or tap to copy. Handcrafted discounts on every order.</p>
      </div>
      <div class="offers-modal-body" id="offersModalBody"></div>
      <div class="offers-modal-footer">
        ✦ Coupon codes can also be entered directly in Cart &amp; Checkout ✦
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function renderOffersModalCards() {
  const container = document.getElementById('offersModalBody');
  if (!container) return;

  const currentCode = getAppliedCouponCode();
  const currentCoupon = KALIX_COUPONS.find(c => c.code === currentCode);

  let bannerHtml = '';
  if (currentCode && currentCoupon) {
    bannerHtml = `
      <div class="applied-coupon-banner">
        <div style="display:flex;align-items:center;gap:0.45rem">
          <span class="material-icons" style="font-size:17px;color:#059669">check_circle</span>
          <span>Applied: <strong>${currentCoupon.code}</strong> (${currentCoupon.discountText})</span>
        </div>
        <button type="button" class="btn-remove-applied" onclick="removeAppliedCoupon();renderOffersModalCards()">Remove</button>
      </div>
    `;
  }

  const cardsHtml = KALIX_COUPONS.map(c => {
    const isCurrent = currentCode === c.code;
    return `
      <div class="coupon-card ${isCurrent ? 'is-active' : ''}">
        <div class="coupon-card-header">
          <span class="coupon-badge" style="background:${c.badgeBg}">${c.badge}</span>
          <span class="coupon-discount-text">${c.discountText}</span>
        </div>
        <h3 class="coupon-title">${c.title}</h3>
        <p class="coupon-desc">${c.desc}</p>
        <div class="coupon-card-footer">
          <div class="coupon-code-pill">
            <span class="material-icons" style="font-size:15px">confirmation_number</span>
            <span>${c.code}</span>
          </div>
          <div class="coupon-actions">
            <button type="button" class="btn-copy-code" onclick="copyCouponCode('${c.code}', this)" title="Copy coupon code">
              <span class="material-icons" style="font-size:14px">content_copy</span>
              <span>Copy</span>
            </button>
            <button type="button" class="btn-apply-code ${isCurrent ? 'applied' : ''}" onclick="applyCouponFromModal('${c.code}')">
              <span class="material-icons" style="font-size:14px">${isCurrent ? 'check_circle' : 'shopping_bag'}</span>
              <span>${isCurrent ? 'Applied' : 'Apply Code'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = bannerHtml + cardsHtml;
}

function openOffersModal() {
  ensureOffersModal();
  renderOffersModalCards();
  const modal = document.getElementById('offersModal');
  if (modal) modal.style.display = 'flex';
}

function closeOffersModal() {
  const modal = document.getElementById('offersModal');
  if (modal) modal.style.display = 'none';
}

function copyCouponCode(code, btn) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  if (btn) {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `<span class="material-icons" style="font-size:14px">done</span> <span>Copied!</span>`;
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.classList.remove('copied');
    }, 2000);
  }
  showToast(`🎟️ Coupon code "${code}" copied to clipboard!`);
}

function applyCouponFromModal(code) {
  setAppliedCouponCode(code);
  renderOffersModalCards();

  if (typeof renderCart === 'function' && document.getElementById('cartCouponInput')) {
    renderCart();
  }
  if (typeof updateCheckoutTotals === 'function' && document.getElementById('checkoutCouponInput')) {
    updateCheckoutTotals();
  }

  showToast(`🎉 Coupon "${code}" applied to your order!`);
  setTimeout(() => {
    closeOffersModal();
  }, 450);
}

function applyCartCoupon() {
  const input = el('cartCouponInput');
  const feedback = el('cartCouponFeedback');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (!code) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#ef4444';
      feedback.textContent = 'Please enter a coupon code.';
    }
    return;
  }
  const coupon = KALIX_COUPONS.find(c => c.code === code);
  if (!coupon) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#ef4444';
      feedback.innerHTML = `<span class="material-icons" style="font-size:14px;vertical-align:middle;margin-right:2px">error_outline</span> Invalid code "${code}". Tap "View Offers" to choose a code.`;
    }
    return;
  }
  setAppliedCouponCode(code);
  renderCart();
  showToast(`🎉 Coupon "${code}" applied!`);
}

function removeAppliedCoupon() {
  const oldCode = getAppliedCouponCode();
  setAppliedCouponCode('');
  if (typeof renderCart === 'function' && el('cartCouponInput')) {
    renderCart();
  }
  if (typeof updateCheckoutTotals === 'function' && document.getElementById('checkoutCouponInput')) {
    updateCheckoutTotals();
  }
  if (document.getElementById('offersModalBody')) {
    renderOffersModalCards();
  }
  showToast(oldCode ? `Coupon "${oldCode}" removed.` : 'Coupon removed.');
}

// Rewards Info Modal (Wallet Details & 10 Items Progress)
function ensureRewardsInfoModal() {
  if (document.getElementById('rewardsInfoModal')) return;
  const modal = document.createElement('div');
  modal.id = 'rewardsInfoModal';
  modal.className = 'rewards-modal';
  modal.innerHTML = `
    <div class="rewards-modal-card" role="dialog" aria-modal="true" aria-labelledby="rewardsModalTitle">
      <div class="rewards-modal-hero">
        <div class="rewards-hero-orbit orbit-one"></div><div class="rewards-hero-orbit orbit-two"></div>
        <button class="rewards-modal-close" onclick="closeRewardsInfoModal()" aria-label="Close rewards"><span class="material-icons">close</span></button>
        <div class="rewards-crown">👑</div>
        <p class="rewards-kicker">KALIX PRIVATE CLUB</p>
        <h2 id="rewardsModalTitle">Royal Rewards</h2>
        <p class="rewards-hero-sub">Every ${MILESTONE_STEP} ice creams unlock a mystery coin pack.</p>
        <div class="rewards-wallet-grid">
          <div class="rewards-wallet-stat"><span>YOUR WALLET</span><strong>🪙 <b id="modalCoinCount">0</b></strong></div>
          <div class="rewards-wallet-divider"></div>
          <div class="rewards-wallet-stat"><span>CASH VALUE</span><strong class="rewards-cash">₹<b id="modalCashValue">0</b></strong></div>
        </div>
      </div>
      <div class="rewards-modal-body">
        <div class="rewards-progress-head">
          <span id="modalPackTitle">Progress to Pack #1 (${MILESTONE_STEP} Ice Creams)</span>
          <strong id="modalProgressText">0 / ${MILESTONE_STEP}</strong>
        </div>
        <div class="coin-progress-bar"><div class="coin-progress-fill" id="modalProgressFill" style="width:0%"></div></div>
        <p class="rewards-progress-sub" id="modalProgressSub">Add ${MILESTONE_STEP} ice creams to unlock a random 1–100 coins pack!</p>
        <div class="rewards-how-card">
          <div class="rewards-how-title"><span class="material-icons">auto_awesome</span> How the royal drop works</div>
          <ul>
            <li>Every ${MILESTONE_STEP} ice creams unlocks one Mystery Gold Pack.</li>
            <li>Each pack drops <strong>1–100 Reward Coins</strong>.</li>
            <li><strong>1 coin = ₹5</strong> discount at checkout.</li>
          </ul>
        </div>
        <button class="btn-primary btn-full btn-claim-checkout" onclick="closeRewardsInfoModal();triggerPackOpening(null, true)" id="modalOpenPackBtn">
          <ion-icon name="flash"></ion-icon><span>Open Mystery Pack Now</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function openRewardsModal() {
  // Rehydrate before opening so the modal never shows an old locked count.
  try {
    const savedCart = JSON.parse(localStorage.getItem('kalixCart') || '[]');
    if (Array.isArray(savedCart)) cart = savedCart;
  } catch (_) { /* Keep current cart state. */ }
  ensureRewardsInfoModal();
  updateRewardsUI();
  const modal = document.getElementById('rewardsInfoModal');
  if (modal) modal.style.display = 'flex';
}

function closeRewardsInfoModal() {
  const modal = document.getElementById('rewardsInfoModal');
  if (modal) modal.style.display = 'none';
}

function updateRewardsUI() {
  const coins = getRewardCoins();
  const cashVal = coins * COIN_VALUE_INR;
  document.querySelectorAll('#navRewardsCount, #modalCoinCount').forEach(el => el.textContent = coins);
  document.querySelectorAll('#modalCashValue').forEach(el => el.textContent = cashVal);
  document.querySelectorAll('#redeemWalletBalance, #checkoutWalletCoins').forEach(el => {
    el.textContent = `${coins} Coins (₹${cashVal})`;
  });

  const progress = getMysteryPackProgress();
  const nextPackNum = (progress.packsClaimed || 0) + 1;
  const totalItems = progress.total;
  const pct = progress.unlocked ? 100 : Math.min((totalItems / MILESTONE_STEP) * 100, 100);

  const titleEl = document.getElementById('modalPackTitle');
  const fill = document.getElementById('modalProgressFill');
  const txt = document.getElementById('modalProgressText');
  const sub = document.getElementById('modalProgressSub');
  const btn = document.getElementById('modalOpenPackBtn');

  if (titleEl) titleEl.textContent = `Progress to Pack #${nextPackNum} (${MILESTONE_STEP} Ice Creams)`;
  if (fill) fill.style.width = pct + '%';
  if (txt) txt.textContent = progress.unlocked ? `${MILESTONE_STEP} / ${MILESTONE_STEP} Ice Creams (Pack #${nextPackNum} Unlocked!)` : `${totalItems} / ${MILESTONE_STEP} Ice Creams`;

  if (progress.unlocked) {
    if (sub) sub.innerHTML = `🎉 <strong>Pack #${nextPackNum} Unlocked!</strong> You reached ${MILESTONE_STEP} ice creams. Ready to crack open your Mystery Pack!`;
    if (btn) {
      btn.disabled = false;
      btn.removeAttribute('aria-disabled');
      btn.removeAttribute('title');
      btn.style.display = 'flex';
      btn.innerHTML = `<ion-icon name="flash"></ion-icon> <span>OPEN PACK #${nextPackNum} NOW!</span>`;
      btn.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)';
      btn.onclick = () => { closeRewardsInfoModal(); triggerPackOpening(null, true); };
    }
  } else {
    if (sub) sub.textContent = `Order ${progress.remaining} more ice cream(s) to unlock Pack #${nextPackNum}!`;
    if (btn) {
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
      btn.title = `Locked — order ${progress.remaining} more ice cream(s) to unlock Pack #${nextPackNum}`;
      btn.innerHTML = `<ion-icon name="lock-closed"></ion-icon> <span>LOCKED — NEED ${progress.remaining} MORE</span>`;
      btn.style.background = '';
      btn.onclick = null;
    }
  }
}

// Keep an already-open Rewards screen live while products are added elsewhere on the page.
document.addEventListener('kalix:cart-updated', () => {
  if (document.getElementById('rewardsInfoModal')) updateRewardsUI();
});

// A cart can be updated from another storefront page/tab; never leave Rewards on an old count.
function refreshCartDependentUI() {
  syncCartFromStorage();
  updateBadges();
  updateDrawer();
  updateRewardsUI();
}
window.addEventListener('storage', event => {
  if (event.key === 'kalixCart') refreshCartDependentUI();
});
window.addEventListener('focus', refreshCartDependentUI);

// Trigger EA FC Pack Opening
let currentPackCoins = 0;
let packOpeningInProgress = false;
function triggerPackOpening(forcedCoins = null, forceUnlock = false) {
  const isPending = sessionStorage.getItem('kalixPendingRewardPack') === 'true';
  const progress = getMysteryPackProgress();
  if (!forceUnlock && !isPending && !progress.unlocked) {
    updateRewardsUI();
    showToast(`🔒 Mystery Pack is locked. Order 10 ice creams to unlock it.`);
    return;
  }
  closeRewardsInfoModal();
  ensureFutModal();

  // Weighted Probability: 1-20 has very high chance (80%), >20 has lower chance
  currentPackCoins = forcedCoins || generatePackCoins();

  const modal = document.getElementById('futModal');
  const unopened = document.getElementById('futPackUnopened');
  const reveal = document.getElementById('futPackReveal');
  const card = document.getElementById('futCardElement');

  unopened.style.display = 'block';
  reveal.style.display = 'none';
  if (card) card.classList.remove('shaking');
  packOpeningInProgress = false;
  modal.classList.remove('is-opening', 'is-revealed');

  modal.classList.add('active');
}

function startPackOpening() {
  if (packOpeningInProgress) return;
  const isPending = sessionStorage.getItem('kalixPendingRewardPack') === 'true';
  const progress = getMysteryPackProgress();
  if (!isPending && !progress.unlocked) {
    closeFutModal();
    showToast(`🔒 Mystery Pack requires 10 ice creams.`);
    return;
  }
  const card = document.getElementById('futCardElement');
  const unopened = document.getElementById('futPackUnopened');
  const reveal = document.getElementById('futPackReveal');
  const coinsCountEl = document.getElementById('revealedCoinsCount');
  const cashValEl = document.getElementById('revealedCashValue');
  const tierBadgeEl = document.getElementById('revealedTierBadge');

  if (!card) return;
  packOpeningInProgress = true;
  const modal = document.getElementById('futModal');
  if (modal) modal.classList.add('is-opening');

  // Shake animation & rumble sound
  card.classList.add('shaking');
  playFutAudio('shake');

  setTimeout(() => {
    card.classList.remove('shaking');
    unopened.style.display = 'none';
    reveal.style.display = 'flex';
    if (modal) {
      modal.classList.remove('is-opening');
      modal.classList.add('is-revealed');
    }

    // Play impact boom & fanfare
    playFutAudio('boom');
    setTimeout(() => playFutAudio('reveal'), 150);

    // Launch confetti canvas particles!
    startConfettiCanvas();

    // Set tier badge based on rolled coins
    if (tierBadgeEl) {
      if (currentPackCoins <= 20) {
        tierBadgeEl.textContent = '✦ CLASSIC GOLD DROP ✦';
        tierBadgeEl.className = 'fut-tier-pill tier-gold';
      } else if (currentPackCoins <= 50) {
        tierBadgeEl.textContent = '✦ RARE WALKOUT ✦';
        tierBadgeEl.className = 'fut-tier-pill tier-rare';
      } else {
        tierBadgeEl.textContent = '✦ 99 OVR LEGENDARY WALKOUT ✦';
        tierBadgeEl.className = 'fut-tier-pill tier-legendary';
      }
    }

    // Number roll animation with audio ticking
    const duration = 1400;
    const startTime = performance.now();
    let lastTickVal = -1;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(ease * currentPackCoins);

      if (val !== lastTickVal && val % 2 === 0) {
        lastTickVal = val;
        playFutAudio('tick');
      }

      if (coinsCountEl) coinsCountEl.textContent = `+${val} COINS`;
      if (cashValEl) cashValEl.textContent = `Cash Value: ₹${val * COIN_VALUE_INR} OFF`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (coinsCountEl) coinsCountEl.textContent = `+${currentPackCoins} COINS`;
        if (cashValEl) cashValEl.textContent = `Cash Value: ₹${currentPackCoins * COIN_VALUE_INR} OFF`;
      }
    }
    requestAnimationFrame(updateCounter);
  }, 1600);
}

// ONLY Claim Coins to Checkout button action
function claimCoinsToCheckout() {
  addRewardCoins(currentPackCoins);
  sessionStorage.removeItem('kalixPendingRewardPack');
  setPacksClaimed(getPacksClaimed() + 1);
  appliedCartCoins = currentPackCoins;
  sessionStorage.setItem('kalixAppliedCoins', currentPackCoins.toString());

  const currentCart = syncCartFromStorage();
  const cartHasItems = currentCart && currentCart.length > 0;

  if (cartHasItems) {
    showToast(`🎉 +${currentPackCoins} Coins (-₹${currentPackCoins * COIN_VALUE_INR}) Claimed! Proceeding to Checkout...`);
  } else {
    showToast(`🎉 +${currentPackCoins} Coins (₹${currentPackCoins * COIN_VALUE_INR} discount value) claimed to your wallet!`);
  }

  closeFutModal();
  updateRewardsUI();
  updateBadges();
  setTimeout(() => {
    if (cartHasItems) {
      window.location.href = 'checkout.html';
    } else {
      window.location.href = 'index.html#flavors';
    }
  }, 800);
}

function closeFutModal() {
  const modal = document.getElementById('futModal');
  if (modal) modal.classList.remove('active');
  cancelAnimationFrame(confettiAnimationId);
}

// Cart Coin Apply (Usable on any order whenever user has coins)
function applyCartCoins() {
  const feedback = document.getElementById('coinRedeemFeedback');
  const available = getRewardCoins();

  if (available <= 0) {
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#ef4444';
      feedback.innerHTML = `<span class="material-icons" style="font-size:15px;vertical-align:middle">error_outline</span> No coins available in your wallet.`;
    }
    showToast(`⚠️ No reward coins available to redeem.`);
    return;
  }

  const input = document.getElementById('coinsToApplyInput');
  if (!input) return;
  const coins = parseInt(input.value);

  if (isNaN(coins) || coins <= 0) {
    if (feedback) { feedback.style.display = 'block'; feedback.style.color = '#ef4444'; feedback.textContent = 'Please enter valid coins.'; }
    return;
  }
  if (coins > available) {
    if (feedback) { feedback.style.display = 'block'; feedback.style.color = '#ef4444'; feedback.textContent = `You only have ${available} coins available.`; }
    return;
  }

  appliedCartCoins = coins;
  sessionStorage.setItem('kalixAppliedCoins', coins.toString());
  if (feedback) {
    feedback.style.display = 'block';
    feedback.style.color = 'var(--pistachio)';
    feedback.textContent = `✓ ${coins} Coins applied (-₹${coins * COIN_VALUE_INR} discount)!`;
  }
  showToast(`🪙 ${coins} Coins Applied (-₹${coins * COIN_VALUE_INR})`);
  renderCartPage();
}

// ---- Site motion ----
// Kept in plain CSS/JS so every storefront page gets the same lightweight animation language.
let motionObserver;
function refreshMotionElements(scope=document) {
  if (!motionObserver || !scope) return;
  const selector = [
    '.section-header', '.craft-visual', '.craft-text', '.social-card', '.gift-card',
    '.city-pill', '.pin-check-box', '.delivery-features .df-item', '.newsletter-inner',
    '.footer-top', '.footer-bottom', '.flavor-card', '.flight-card', '.product-gallery',
    '.product-info', '.cart-item', '.summary-card', '.checkout-layout > *', '.form-section',
    '.payment-option', '.wishlist-card', '.empty-cart', '.empty-state'
  ].join(',');
  const elements = [];
  if (scope.matches?.(selector)) elements.push(scope);
  elements.push(...scope.querySelectorAll(selector));
  elements.forEach((element, index) => {
    if (element.dataset.motionReady) return;
    element.dataset.motionReady = 'true';
    element.classList.add('reveal-on-scroll');
    if (element.matches('.flavor-card, .social-card, .gift-card, .city-pill, .df-item, .payment-option, .cart-item, .wishlist-card')) {
      element.classList.add('stagger-item');
      element.style.setProperty('--stagger', index % 6);
    }
    if (element.matches('.flavor-card, .social-card, .gift-card')) element.classList.add('tilt-card');
    if (element.matches('.craft-visual, .product-gallery, .summary-card')) element.classList.add('reveal-scale');
    motionObserver.observe(element);
  });
}

function initialiseMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks') || navbar?.querySelector('.nav-links');
  if (navbar && navLinks) {
    let menuButton = navbar.querySelector('.hamburger');
    if (!menuButton) {
      menuButton = document.createElement('button');
      menuButton.className = 'hamburger';
      menuButton.type = 'button';
      menuButton.innerHTML = '<span></span><span></span><span></span>';
      navbar.querySelector('.nav-actions')?.appendChild(menuButton);
    }
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    navLinks.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('click', event => {
      if (!navbar.contains(event.target)) {
        navbar.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        navbar.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
    });
  }

  const hero = document.querySelector('.hero');
  if (hero && !reduceMotion) {
    const particles = document.createElement('div');
    particles.className = 'hero-particles';
    const colors = ['rgba(217,119,6,.7)', 'rgba(180,11,86,.5)', 'rgba(59,105,52,.55)', 'rgba(255,183,125,.8)'];
    for (let index = 0; index < 14; index += 1) {
      const particle = document.createElement('span');
      particle.className = 'hero-particle';
      particle.style.setProperty('--particle-size', `${4 + (index % 4) * 2}px`);
      particle.style.setProperty('--particle-left', `${5 + ((index * 17) % 90)}%`);
      particle.style.setProperty('--particle-top', `${12 + ((index * 29) % 76)}%`);
      particle.style.setProperty('--particle-color', colors[index % colors.length]);
      particle.style.setProperty('--particle-duration', `${4 + (index % 5)}s`);
      particle.style.setProperty('--particle-delay', `${-(index % 5)}s`);
      particles.appendChild(particle);
    }
    hero.appendChild(particles);
    const cue = document.createElement('span');
    cue.className = 'scroll-cue';
    cue.setAttribute('aria-hidden', 'true');
    hero.appendChild(cue);
  }
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  const updateProgress = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  motionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      motionObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -32px' });

  refreshMotionElements();
  if (reduceMotion) document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));

  // Product, cart and wishlist markup is rendered after page load; animate new cards too.
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) refreshMotionElements(node);
    }));
  }).observe(document.body, { childList: true, subtree: true });

  if (!reduceMotion) {
    let lastSparkle = 0;
    document.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !event.target.closest('.btn-primary, .btn-secondary, .flavor-card, .nav-icon-btn')) return;
      const now = performance.now();
      if (now - lastSparkle < 95) return;
      lastSparkle = now;
      const sparkle = document.createElement('i');
      sparkle.className = 'cursor-sparkle';
      sparkle.style.left = `${event.clientX}px`;
      sparkle.style.top = `${event.clientY}px`;
      document.body.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
    }, { passive: true });

    document.querySelectorAll('.btn-primary, .btn-secondary, .rewards-nav-btn').forEach(button => {
      button.classList.add('magnetic');
      button.addEventListener('mousemove', event => {
        if (!window.matchMedia('(hover: hover)').matches) return;
        const box = button.getBoundingClientRect();
        const x = (event.clientX - box.left - box.width / 2) / box.width;
        const y = (event.clientY - box.top - box.height / 2) / box.height;
        button.style.transform = `translate(${x * 7}px, ${y * 5}px)`;
      });
      button.addEventListener('mouseleave', () => { button.style.transform = ''; });
    });

    document.addEventListener('mousemove', event => {
      const card = event.target.closest('.tilt-card');
      if (!card || !window.matchMedia('(hover: hover)').matches) return;
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-7px)`;
    });
    document.addEventListener('mouseout', event => {
      const card = event.target.closest('.tilt-card');
      if (card && !card.contains(event.relatedTarget)) card.style.transform = '';
    });

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      const href = link?.getAttribute('href');
      if (!href || href.startsWith('#') || link.target === '_blank' || event.ctrlKey || event.metaKey) return;
      if (!/^[\w-]+\.html(?:#.*)?$/.test(href)) return;
      event.preventDefault();
      const wipe = document.createElement('div');
      wipe.className = 'page-wipe is-leaving';
      document.body.appendChild(wipe);
      setTimeout(() => { window.location.href = href; }, 520);
    });
  }

  document.addEventListener('click', event => {
    const city = event.target.closest('.city-pill');
    if (city) {
      document.querySelectorAll('.city-pill').forEach(item => item.classList.remove('active'));
      city.classList.add('active');
    }
  });

  const heroImage = document.querySelector('.hero-img-wrap');
  if (heroImage && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    heroImage.addEventListener('mousemove', event => {
      const bounds = heroImage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      heroImage.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -4}deg) translateY(-5px)`;
    });
    heroImage.addEventListener('mouseleave', () => { heroImage.style.transform = ''; });
  }
}

// ============================================================================
// ---- ROYAL SOMMELIER: WEB SPEECH API & VOICE-ACTIVATED TASTING LOUNGE ----
// ============================================================================

const SOMMELIER_PALETTES = [
  {
    flavorId: 2, // Salted Butterscotch Crunch
    primaryName: 'Salted Butterscotch Crunch',
    keywords: ['butterscotch', 'crunch', 'crunchy', 'caramel', 'toffee', 'jaggery', 'salt', 'salted', 'sweet', 'palm', 'shard', 'shards', 'nutty', 'crispy'],
    sommelierIntro: 'An exquisite indulgence for a rich caramel craving!',
    sommelierNote: 'Kalix AI Voice presents our signature Salted Butterscotch Crunch — slow-simmered palm jaggery caramel laced with crunchy butter toffee shards and pink Himalayan salt.',
    cueColor: '#d97706',
    audioFreq: 528
  },
  {
    flavorId: 1, // Royal Pistachio & Damask Rose
    primaryName: 'Royal Pistachio & Damask Rose',
    keywords: ['pistachio', 'rose', 'damask', 'pista', 'green', 'nut', 'nuts', 'floral', 'relaxing', 'saffron', 'kannauj', 'aromatic', 'calm', 'sweet', 'shahi', 'peaceful'],
    sommelierIntro: 'A serene and poetic royal choice for your palate!',
    sommelierNote: 'Kalix AI Voice curates our Award-Winning Royal Pistachio & Damask Rose — slow-churned A2 Gir cow cream infused with copper-distilled Kannauj rose and slow-roasted green pistachios.',
    cueColor: '#2e7d32',
    audioFreq: 639
  },
  {
    flavorId: 6, // Rich Choco Almond
    primaryName: 'Rich Choco Almond',
    keywords: ['chocolate', 'choco', 'almond', 'almonds', 'cocoa', 'fudge', 'dark', 'rich', 'decadent', 'brown', 'belgian', 'creamy', 'choc', 'chocolaty', 'intense'],
    sommelierIntro: 'A decadent masterpiece of dark velvety cocoa!',
    sommelierNote: 'Kalix AI Voice summons our Rich Choco Almond Ice Cream — single-origin dark cocoa churned with velvety malai, dark chocolate fudge ribbons, and toasted Californian almonds.',
    cueColor: '#5c3826',
    audioFreq: 432
  },
  {
    flavorId: 3, // Ratnagiri Alphonso Mango & Chili
    primaryName: 'Ratnagiri Alphonso Mango',
    keywords: ['mango', 'alphonso', 'chili', 'spicy', 'tangy', 'citrus', 'lime', 'fruit', 'fruity', 'tropical', 'kashmiri', 'warm', 'refreshing', 'sweet', 'sunshine', 'spice'],
    sommelierIntro: 'A vibrant tropical sunburst with an unforgettable spark!',
    sommelierNote: 'Kalix AI Voice selects our Ratnagiri Alphonso Mango — tree-ripened Devgad Alphonso pulp folded into sweet malai, energized with Kashmiri chili flakes and fresh lime zest.',
    cueColor: '#ea580c',
    audioFreq: 741
  },
  {
    flavorId: 4, // Midnight Blackberry Swirl
    primaryName: 'Midnight Blackberry Swirl',
    keywords: ['blackberry', 'berry', 'berries', 'lavender', 'midnight', 'purple', 'violet', 'tart', 'botanical', 'wild', 'night', 'mysterious'],
    sommelierIntro: 'A rare botanical journey into the cool Himalayan night!',
    sommelierNote: 'Kalix AI Voice welcomes you to Midnight Blackberry Swirl — cold-steeped wild Himalayan blackberries with French lavender notes and golden butter biscuit crumble.',
    cueColor: '#7c3aed',
    audioFreq: 852
  },
  {
    flavorId: 5, // Mahabaleshwar Strawberry & Lychee
    primaryName: 'Mahabaleshwar Strawberry & Lychee',
    keywords: ['strawberry', 'strawberries', 'lychee', 'litchi', 'pink', 'sweet', 'vanilla', 'delicate', 'romantic', 'summer', 'fresh', 'fruity'],
    sommelierIntro: 'A pure romantic celebration of India’s freshest harvest!',
    sommelierNote: 'Kalix AI Voice unveils Mahabaleshwar Strawberry & Lychee — hand-picked winter strawberries paired with succulent Muzaffarpur lychee pearls and bourbon vanilla.',
    cueColor: '#e11d48',
    audioFreq: 963
  }
];

let sommelierRecognizer = null;
let isSommelierListening = false;
let sommelierAudioCtx = null;

// Ambient Web Audio API Crystal Harmonic Chime
function playSommelierChime(frequency = 528) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!sommelierAudioCtx || sommelierAudioCtx.state === 'suspended') {
      sommelierAudioCtx = new AudioCtx();
    }
    const ctx = sommelierAudioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;
    
    // Primary Tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);
    osc1.frequency.exponentialRampToValueAtTime(frequency * 1.005, now + 0.4);
    gain1.gain.setValueAtTime(0.22, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.6);

    // Harmonic Overtone (Crystal resonance)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2.01, now + 0.08);
    gain2.gain.setValueAtTime(0.12, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 1.4);
  } catch (e) {
    console.warn('Web Audio Sommelier chime error:', e);
  }
}

// Speak Royal Sommelier Confirmation
function speakSommelierRecommendation(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Female') || v.name.includes('Google') || v.name.includes('English')));
    if (engVoice) utterance.voice = engVoice;
    
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
  }
}

function initSommelierSpeech() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) return null;

  const recognizer = new SpeechRec();
  recognizer.continuous = false;
  recognizer.interimResults = true;
  recognizer.lang = 'en-US';

  recognizer.onstart = () => {
    isSommelierListening = true;
    updateSommelierListeningUI(true);
  };

  recognizer.onresult = (event) => {
    let interim = '';
    let final = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }
    const currentText = final || interim;
    updateSpeechTranscript(currentText, Boolean(final));

    if (final) {
      analyzeVoiceCraving(final);
    }
  };

  recognizer.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    isSommelierListening = false;
    updateSommelierListeningUI(false);
    if (event.error === 'not-allowed') {
      showToast('Microphone access blocked. Click any tasting craving below.');
    } else if (event.error !== 'no-speech') {
      showToast('Could not hear clearly. Please tap the mic and speak again.');
    }
  };

  recognizer.onend = () => {
    isSommelierListening = false;
    updateSommelierListeningUI(false);
  };

  return recognizer;
}

function updateSommelierListeningUI(listening) {
  const micBtn = document.getElementById('sommelierMicBtn');
  const micIcon = document.getElementById('sommelierMicIcon');
  const micLabel = document.getElementById('sommelierMicLabel');
  const audioBars = document.getElementById('sommelierAudioBars');
  const speechBubble = document.getElementById('sommelierSpeechBubble');

  if (micBtn) micBtn.classList.toggle('listening', listening);
  if (micIcon) micIcon.textContent = listening ? 'mic' : 'mic_none';
  if (micLabel) micLabel.textContent = listening ? 'Listening to your flavor craving...' : 'Tap to Speak (AI Voice)';
  if (audioBars) audioBars.style.display = listening ? 'flex' : 'none';
  if (speechBubble && listening) {
    speechBubble.style.display = 'inline-flex';
    const textEl = document.getElementById('speechTranscriptText');
    if (textEl) textEl.innerHTML = '<span style="opacity:0.7">Listening... Speak your flavor craving</span>';
  }
}

function updateSpeechTranscript(text, isFinal = false) {
  const speechBubble = document.getElementById('sommelierSpeechBubble');
  const textEl = document.getElementById('speechTranscriptText');
  if (!speechBubble || !textEl) return;

  speechBubble.style.display = 'inline-flex';
  if (isFinal) {
    textEl.innerHTML = `Heard: "<strong>${text}</strong>"`;
  } else {
    textEl.innerHTML = `Listening: "<em>${text}</em>"`;
  }
}

function toggleSommelierListening() {
  if (!sommelierRecognizer) {
    sommelierRecognizer = initSommelierSpeech();
  }

  if (!sommelierRecognizer) {
    showToast('Speech recognition not available. Please tap any tasting craving below!');
    const bubble = document.getElementById('sommelierSpeechBubble');
    if (bubble) {
      bubble.style.display = 'inline-flex';
      const textEl = document.getElementById('speechTranscriptText');
      if (textEl) textEl.textContent = 'Voice recognition unavailable. Tap any craving below!';
    }
    return;
  }

  if (isSommelierListening) {
    try { sommelierRecognizer.stop(); } catch (_) {}
    isSommelierListening = false;
    updateSommelierListeningUI(false);
  } else {
    try {
      sommelierRecognizer.start();
    } catch (err) {
      console.warn('Speech start error:', err);
      sommelierRecognizer = initSommelierSpeech();
      try { sommelierRecognizer.start(); } catch (e) {
        showToast('Please tap a tasting craving below.');
      }
    }
  }
}

function simulateVoiceInput(phrase) {
  updateSommelierListeningUI(true);
  const speechBubble = document.getElementById('sommelierSpeechBubble');
  const textEl = document.getElementById('speechTranscriptText');
  if (speechBubble) speechBubble.style.display = 'inline-flex';
  if (textEl) textEl.innerHTML = `Listening: "<em>${phrase}</em>"`;

  setTimeout(() => {
    updateSommelierListeningUI(false);
    updateSpeechTranscript(phrase, true);
    analyzeVoiceCraving(phrase);
  }, 450);
}

function analyzeVoiceCraving(spokenText) {
  if (!spokenText || spokenText.trim() === '') return;
  const lower = spokenText.toLowerCase();

  let bestMatch = null;
  let highestScore = -1;
  let matchedKeywordsList = [];

  SOMMELIER_PALETTES.forEach(pal => {
    let score = 0;
    const matched = [];
    pal.keywords.forEach(kw => {
      if (lower.includes(kw)) {
        score += (kw.length > 5 ? 2.5 : 1.5);
        matched.push(kw);
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = pal;
      matchedKeywordsList = matched;
    }
  });

  if (!bestMatch || highestScore <= 0) {
    bestMatch = SOMMELIER_PALETTES[0];
    matchedKeywordsList = ['signature', 'artisanal'];
  }

  const flavor = FLAVORS.find(f => f.id === bestMatch.flavorId) || FLAVORS[0];

  const textEl = document.getElementById('speechTranscriptText');
  if (textEl) {
    let displayHtml = spokenText;
    matchedKeywordsList.forEach(kw => {
      const reg = new RegExp(`(${kw})`, 'gi');
      displayHtml = displayHtml.replace(reg, '<em>$1</em>');
    });
    textEl.innerHTML = `Curated for: "${displayHtml}"`;
  }

  // 1. Play Ambient Audio Chime (Web Audio API)
  playSommelierChime(bestMatch.audioFreq || 528);

  // 2. Speak Sommelier confirmation
  speakSommelierRecommendation(`${bestMatch.sommelierIntro} May I present our ${flavor.name.split(' & ')[0].replace('Kalix ', '')}.`);

  // 3. Render Spotlight Reveal Stage
  renderSommelierSpotlight(flavor, bestMatch, matchedKeywordsList);

  // 4. Highlight matching flavor in the catalog grid
  highlightCatalogCard(flavor.id);
}

function renderSommelierSpotlight(flavor, pal, matchedKeywords) {
  const stage = document.getElementById('sommelierSpotlightStage');
  const card = document.getElementById('spotlightCard');
  if (!stage || !card) return;

  stage.style.display = 'block';

  card.style.borderColor = pal.cueColor || 'var(--amber)';
  card.style.boxShadow = `0 24px 60px ${flavor.glowColor || 'rgba(217,119,6,0.22)'}, var(--shadow-md)`;

  card.innerHTML = `
    <div class="spotlight-image-col" style="background:${flavor.bg};border:1.5px solid ${pal.cueColor}33">
      <img src="${flavor.image}" alt="${flavor.name}" class="spotlight-tub-img" />
    </div>
    <div class="spotlight-info-col">
      <span class="spotlight-badge" style="background:${pal.cueColor}18;color:${pal.cueColor};border:1px solid ${pal.cueColor}44">
        ✨ AI Voice Flavour Match
      </span>
      <h3 class="spotlight-flavor-title">${flavor.name}</h3>
      <div style="font-size:13px;font-style:italic;color:var(--outline);margin-bottom:0.85rem">${flavor.subtitle}</div>
      
      <div class="spotlight-tasting-note" style="border-left-color:${pal.cueColor}">
        <strong>AI Voice Tasting Profile:</strong><br />
        ${pal.sommelierNote}
      </div>

      <div class="spotlight-keywords-row">
        <span>Palate Notes Matched:</span>
        ${matchedKeywords.map(k => `<span class="keyword-tag" style="background:${pal.cueColor}18;color:${pal.cueColor}">✦ ${k}</span>`).join(' ')}
      </div>

      <div class="spotlight-actions">
        <div class="card-action-wrap" data-flavor-id="${flavor.id}">
          ${renderCardActionHtml(flavor.id)}
        </div>
        <button class="btn-secondary btn-md" onclick="goToProduct(${flavor.id})">
          Explore Flavour Profile <span class="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function highlightCatalogCard(flavorId) {
  document.querySelectorAll('.flavor-card').forEach(c => c.classList.remove('sommelier-spotlighted'));
  const targetCard = document.querySelector(`.flavor-card[onclick*="goToProduct(${flavorId})"]`);
  if (targetCard) {
    targetCard.classList.add('sommelier-spotlighted');
    setTimeout(() => {
      targetCard.classList.remove('sommelier-spotlighted');
    }, 6000);
  }
}

function openSommelierScreen() {
  const el = document.getElementById('sommelier');
  if (el) {
    el.classList.add('sommelier-screen-open');
    document.body.classList.add('sommelier-screen-active');
    const mic = document.getElementById('sommelierMicBtn');
    if (mic) {
      mic.style.transform = 'scale(1.15)';
      setTimeout(() => mic.style.transform = '', 500);
    }
  }
}

function closeSommelierScreen() {
  const el = document.getElementById('sommelier');
  if (el) el.classList.remove('sommelier-screen-open');
  document.body.classList.remove('sommelier-screen-active');
}

function scrollToSommelier() {
  openSommelierScreen();
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSommelierScreen();
});

// ---- Init per page ----
document.addEventListener('DOMContentLoaded', ()=>{
  updateBadges();
  updateDrawer();
  const page = document.body.dataset.page;
  initialiseMotion();
  if(page==='home') renderFlavors();
  if(page==='product') renderProductPage();
  if(page==='cart') renderCartPage();
  if(page==='wishlist') renderWishlistPage();
  if(page==='checkout' && typeof updateCheckoutTotals === 'function') updateCheckoutTotals();
  updateAllCardActionButtons();
  requestAnimationFrame(()=> refreshMotionElements());
});

window.addEventListener('storage', (e) => {
  if (e.key === 'kalixCart') {
    syncCartFromStorage();
    updateBadges();
    updateAllCardActionButtons();
  }
});

document.addEventListener('kalix:cart-updated', () => {
  updateAllCardActionButtons();
});
