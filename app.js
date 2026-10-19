// ============ KALIX ARTISANAL GLACÉ — APP.JS ============

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
    ingredients: ['Roasted Iranian Pistachio', 'Kannauj Damask Rose', '100% A2 Gir Malai', 'Raw Khandsari'],
    sweetness: 75, tartness: 18, creaminess: 96,
    bg: 'linear-gradient(145deg, #eaf5ea 0%, #d5edd6 100%)'
  },
  {
    id: 2,
    name: 'Kalix Salted Butterscotch Crunch Ice Cream',
    subtitle: 'Butterscotch & Salted Jaggery Glacé Tub',
    desc: 'Slow-simmered palm jaggery golden caramel ribboned through rich A2 cow cream, studded with roasted butter toffee shards and pink Himalayan salt.',
    price: 749,
    tag: 'SIGNATURE CRUNCH',
    tagColor: 'amber',
    image: 'images/kalix_butterscotch.png',
    emoji: '🍯',
    category: 'heritage',
    ingredients: ['Butterscotch Toffee Shards', 'Palm Jaggery Caramel', 'Smoked Sea Salt', 'Cultured A2 Cream'],
    sweetness: 85, tartness: 10, creaminess: 94,
    bg: 'linear-gradient(145deg, #fff7e6 0%, #fde6ba 100%)'
  },
  {
    id: 3,
    name: 'Kalix Ratnagiri Alphonso & Kashmiri Chili Pop Ice Cream',
    subtitle: 'Mango Chili Pop Artisanal Tub',
    desc: 'Pure tree-ripened Devgad Alphonso mango pulp churned with velvety sweet malai, kissed with a warm spark of Kashmiri chili flakes and fresh Coorg lime.',
    price: 399,
    tag: 'SEASONAL HARVEST',
    tagColor: 'amber',
    image: 'images/kalix_mango_chili.png',
    emoji: '🥭',
    category: 'fruit',
    ingredients: ['Devgad Alphonso Mango', 'Kashmiri Chili Flakes', 'Coorg Lime Zest', 'A2 Churned Malai'],
    sweetness: 88, tartness: 35, creaminess: 82,
    bg: 'linear-gradient(145deg, #fff3e0 0%, #ffe0b2 100%)'
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
    ingredients: ['Wild Blackberries', 'French Lavender Infusion', 'Golden Cookie Crumble', 'Cultured Cream'],
    sweetness: 72, tartness: 48, creaminess: 88,
    bg: 'linear-gradient(145deg, #f5eefb 0%, #e8d7f7 100%)'
  },
  {
    id: 5,
    name: 'Kalix Mahabaleshwar Strawberry & Lychee Churn Ice Cream',
    subtitle: 'Strawberry Lychee Artisanal Tub',
    desc: 'Hand-picked Mahabaleshwar winter strawberries paired with succulent Muzaffarpur lychee pearls and bourbon vanilla folded into dense A2 Gir cream.',
    price: 459,
    tag: 'SUMMER CRUSH',
    tagColor: 'rose',
    image: 'images/kalix_strawberry_lychee.png',
    emoji: '🍓',
    category: 'fruit',
    ingredients: ['Mahabaleshwar Strawberries', 'Muzaffarpur Shahi Lychee', 'Bourbon Vanilla Bean', 'A2 Sweet Cream'],
    sweetness: 80, tartness: 36, creaminess: 86,
    bg: 'linear-gradient(145deg, #fdebf0 0%, #fad0dc 100%)'
  },
  {
    id: 6,
    name: 'Kalix Ube Cloud & Sweet Velvet Malai Ice Cream',
    subtitle: 'Purple Ube & Toasted Coconut Tub',
    desc: 'Slow-roasted organic purple ube tuber churned with sweet velvety coconut cream and delicate cardamom, crowned with crisp toasted flakes.',
    price: 899,
    tag: 'LIMITED DROP',
    tagColor: 'berry',
    image: 'images/kalix_ube_cloud.png',
    emoji: '🍠',
    category: 'heritage',
    ingredients: ['Organic Purple Ube Tuber', 'Toasted Coconut Flakes', 'Cardamom Mist', 'A2 Gir Malai'],
    sweetness: 74, tartness: 12, creaminess: 95,
    bg: 'linear-gradient(145deg, #ede9fe 0%, #ddd6fe 100%)'
  }
];

let cart = JSON.parse(localStorage.getItem('kalixCart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('kalixWishlist') || '[]');

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
  const existing = cart.find(x=>x.id===parseInt(flavorId)||x.id===flavorId);
  if(existing) existing.qty += qty;
  else cart.push({id:f.id, name:f.name, price:f.price, image:f.image, emoji:f.emoji, qty});
  saveCart();
  const progress = getMysteryPackProgress();
  if(progress.unlocked) {
    showToast(`🎉 10 Ice Creams Reached! Mystery Pack unlocked for checkout!`);
  } else {
    showToast(`🍨 Added! ${progress.remaining} more needed for Mystery Pack (${progress.total}/${MILESTONE_STEP}).`);
  }
  updateDrawer();
}

function addFlightToCart() {
  syncCartFromStorage();
  const flight = {
    id: 'flight1',
    name: 'The Royal Darbar 4-Pint Ice Cream Flight',
    price: 2199,
    image: 'images/royal_flight.jpg',
    emoji: '🍨',
    qty: 1
  };
  const existing = cart.find(x=>x.id==='flight1');
  if(existing) existing.qty += 1;
  else cart.push(flight);
  saveCart();
  showToast('🍨 Royal Darbar 4-Pint Flight added to Cryo-Bag!');
  updateDrawer();
}

function removeFromCart(id) {
  syncCartFromStorage();
  cart = cart.filter(x=>x.id!==id && x.id!==parseInt(id));
  saveCart();
  updateDrawer();
  renderCartPage();
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
    el.innerHTML=`<div class="empty-state"><span class="material-icons" style="font-size:48px;color:var(--outline)">shopping_bag</span><p>Your cryo-bag is empty.<br/>Start exploring Heritage Ice Cream Pints.</p><a href="index.html#flavors" class="btn-primary btn-sm" onclick="closeCartDrawer()">Explore Flavors</a></div>`;
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
    <div class="flavor-card" onclick="handleFlavorCardClick(event, ${f.id})" tabindex="0" role="button" aria-label="View ${f.name}">
      <div class="flavor-card-stage" style="background:${f.bg}">
        <div class="card-stage-top">
          <span class="card-origin-pill">✦ 500 ML · ARTISANAL GLACÉ</span>
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
          <button class="boutique-add-btn" onclick="event.stopPropagation();addToCart(${f.id});this.classList.add('added');setTimeout(()=>this.classList.remove('added'),1200)" title="Add to Cryo-Bag">
            <span class="btn-caption">Add to Bag</span>
            <span class="material-icons">shopping_bag</span>
          </button>
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

function handleFlavorCardClick(event, id) {
  // On phones, a tap reveals the flavour description rather than navigating away.
  if (window.matchMedia('(max-width: 600px)').matches) {
    const card = event.currentTarget || event.target.closest('.flavor-card');
    if (!card) return;
    const expanded = card.classList.toggle('is-expanded');
    card.setAttribute('aria-expanded', String(expanded));
    return;
  }
  goToProduct(id);
}

// ---- PIN Check ----
function checkPin() {
  const pin = document.getElementById('pinInput')?.value;
  if(!pin || pin.length!==6 || isNaN(pin)) { showToast('Please enter a valid 6-digit PIN code'); return; }
  const res = document.getElementById('pinResult');
  const first = pin[0];
  if(['1','2','3','4','5','6','7'].includes(first)) {
    res.style.color='var(--pistachio)';
    res.textContent='✓ Delivery available! Expected: 1–2 business days in a dry-ice cryo-box.';
  } else {
    res.style.color='var(--tertiary)';
    res.textContent='⚠ Your area is currently outside our cold chain coverage. Join waitlist below.';
  }
}

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

// ---- Product Page ----
function renderProductPage() {
  const id = parseInt(localStorage.getItem('kalixCurrentProduct')) || 1;
  const f = FLAVORS.find(x=>x.id===id) || FLAVORS[0];
  document.title = `${f.name} | Kalix Artisanal Ice Cream`;

  const el = id => document.getElementById(id);
  if(el('prodImage')) {
    el('prodImage').src = f.image;
    el('prodImage').alt = f.name;
  }
  if(el('prodBreadcrumb')) el('prodBreadcrumb').textContent = f.subtitle;
  if(el('prodEmoji')) el('prodEmoji').textContent = f.emoji;
  if(el('prodEmojiBg')) el('prodEmojiBg').style.background = f.bg;
  if(el('prodTag')) {
    el('prodTag').textContent = f.tag;
    el('prodTag').style.color = f.tagColor==='berry'?'var(--tertiary)':f.tagColor==='green'?'var(--pistachio)':'var(--amber)';
  }
  if(el('prodTitle')) el('prodTitle').textContent = f.name;
  if(el('prodSubtitle')) el('prodSubtitle').textContent = f.subtitle;
  if(el('prodDesc')) el('prodDesc').textContent = f.desc;
  if(el('prodPrice')) el('prodPrice').textContent = '₹'+f.price;
  if(el('sweetBar')) el('sweetBar').style.width = f.sweetness+'%';
  if(el('tartBar')) el('tartBar').style.width = f.tartness+'%';
  if(el('creamBar')) el('creamBar').style.width = f.creaminess+'%';
  if(el('sweetPct')) el('sweetPct').textContent = f.sweetness+'%';
  if(el('tartPct')) el('tartPct').textContent = f.tartness+'%';
  if(el('creamPct')) el('creamPct').textContent = f.creaminess+'%';
  if(el('ingChips')) {
    el('ingChips').innerHTML = f.ingredients.map(i=>`<span class="ingr-chip">${i}</span>`).join('');
  }
  if(el('addCartBtn')) {
    el('addCartBtn').onclick = ()=>{
      const q = parseInt(el('qtyNum')?.textContent || 1);
      addToCart(f.id, q);
    };
  }
  if(el('wishBtn')) {
    el('wishBtn').classList.toggle('active', isWishlisted(f.id));
    el('wishBtn').setAttribute('data-wish', f.id);
    el('wishBtn').onclick = () => toggleWishlist(f.id);
  }

  // Related
  const others = FLAVORS.filter(x=>x.id!==f.id).slice(0, 3);
  const relGrid = el('relatedGrid');
  if(relGrid) {
    relGrid.innerHTML = others.map(r=>`
      <div class="flavor-card" onclick="goToProduct(${r.id})" style="cursor:pointer">
        <div class="flavor-card-img">
          <img src="${r.image}" alt="${r.name}" class="flavor-img" />
          <span class="flavor-badge-pill">${r.tag}</span>
        </div>
        <div class="flavor-card-body">
          <div class="flavor-tag" style="color:var(--amber)">${r.tag}</div>
          <div class="flavor-name">${r.name.split(' & ')[0]} Ice Cream</div>
          <div class="flavor-footer">
            <span class="flavor-price">₹${r.price}</span>
            <button class="quick-add-btn" onclick="event.stopPropagation();addToCart(${r.id})">
              <span class="material-icons">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </div>`).join('');
  }

  // stepper
  let qty = 1;
  el('qtyMinus')?.addEventListener('click', ()=>{
    if(qty > 1) { qty--; if(el('qtyNum')) el('qtyNum').textContent = qty; }
  });
  el('qtyPlus')?.addEventListener('click', ()=>{
    qty++; if(el('qtyNum')) el('qtyNum').textContent = qty;
  });
}

// ---- Cart Page ----
function renderCartPage() {
  const el = id => document.getElementById(id);
  const list = el('cartItemsList');
  if(!list) return;
  if(cart.length===0) {
    list.innerHTML=`<div class="empty-state" style="padding:4rem 0"><span class="material-icons" style="font-size:64px;color:var(--outline)">shopping_bag</span><p style="font-size:18px;margin:1rem 0">Your cryo-bag is empty.</p><a href="index.html#flavors" class="btn-primary">Explore Ice Cream Flavors</a></div>`;
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
        <div class="cart-item-tag">ARTISANAL ICE CREAM PINT</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">500ml · 100% Single-Herd A2 Malai · Dry-Ice Cryo Packed</div>
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
  const shipping = subtotal>=1500 ? 0 : 199;
  
  const availableCoins = getRewardCoins();
  const maxCoinsUsable = Math.min(availableCoins, Math.ceil(subtotal / COIN_VALUE_INR));
  if (appliedCartCoins > maxCoinsUsable) {
    appliedCartCoins = maxCoinsUsable;
    sessionStorage.setItem('kalixAppliedCoins', appliedCartCoins.toString());
  }
  const coinDiscount = appliedCartCoins * COIN_VALUE_INR;
  const total = Math.max(0, subtotal + shipping - coinDiscount);

  if(el('subtotal')) el('subtotal').textContent='₹'+subtotal.toLocaleString('en-IN');
  if(el('shipping')) el('shipping').textContent = shipping===0?'FREE':'₹'+shipping;
  if(el('totalAmt')) el('totalAmt').textContent='₹'+total.toLocaleString('en-IN');

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

  const pct = Math.min((subtotal/1500)*100,100);
  if(el('pbFill')) el('pbFill').style.width=pct+'%';
  if(el('pbText')) el('pbText').textContent = subtotal<1500 ? `You're ₹${(1500-subtotal).toLocaleString('en-IN')} away from complimentary Insulated Cryo-Shipping & a handcrafted brass tasting spoon set!` : '🎉 Complimentary Cryo-Shipping & Brass Spoon Set Unlocked!';
}

function changeQty(id, delta) {
  syncCartFromStorage();
  const item = cart.find(x=>x.id===parseInt(id)||x.id===id);
  if(!item) return;
  item.qty = Math.max(1, item.qty+delta);
  saveCart();
  renderCartPage();
}

// ---- Wishlist Page ----
function renderWishlistPage() {
  const grid = document.getElementById('wishlistGrid');
  const count = document.getElementById('wishCount');
  if(!grid) return;
  if(count) count.textContent = wishlist.length+' items';
  if(wishlist.length===0) {
    grid.innerHTML=`<div class="empty-state" style="padding:4rem 0;grid-column:1/-1"><span class="material-icons" style="font-size:64px;color:var(--outline)">favorite_border</span><p style="font-size:18px;margin:1rem 0">Your wishlist is empty.</p><a href="index.html#flavors" class="btn-primary">Explore Ice Cream Flavors</a></div>`;
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
            <button class="boutique-add-btn" onclick="addToCart(${item.id})">
              <span class="btn-caption">Add to Bag</span>
              <span class="material-icons">shopping_bag</span>
            </button>
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
            <button class="boutique-add-btn" onclick="event.stopPropagation();addToCart(${f.id})" title="Add to cart">
              <span class="btn-caption">Add</span>
              <span class="material-icons">shopping_bag</span>
            </button>
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
    
    <div class="fut-stadium-lights">
      <div class="fut-beam"></div>
      <div class="fut-beam right"></div>
    </div>
    
    <div class="fut-pack-stage">
      <button onclick="closeFutModal()" class="fut-close-btn" title="Close"><span class="material-icons">close</span></button>

      <!-- PHASE 1: UNOPENED PACK -->
      <div id="futPackUnopened">
        <p class="fut-stage-eye">✦ ${MILESTONE_TARGET} ICE CREAMS SPECIAL UNLOCK ✦</p>
        <div class="fut-card" id="futCardElement" onclick="startPackOpening()">
          <div class="fut-card-shimmer"></div>
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

// Rewards Info Modal (Wallet Details & 10 Items Progress)
function ensureRewardsInfoModal() {
  if (document.getElementById('rewardsInfoModal')) return;
  const modal = document.createElement('div');
  modal.id = 'rewardsInfoModal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;padding:1.5rem';
  modal.innerHTML = `
    <div style="background:white;border-radius:var(--r-xl);max-width:460px;width:100%;overflow:hidden;box-shadow:var(--shadow-lg);position:relative">
      <div style="background:linear-gradient(135deg,#1f1b13,#0d0b07);color:white;padding:2rem 1.5rem;text-align:center;position:relative">
        <button onclick="closeRewardsInfoModal()" style="position:absolute;top:1rem;right:1rem;background:transparent;border:none;color:white;cursor:pointer"><span class="material-icons">close</span></button>
        <div style="font-size:42px;margin-bottom:0.5rem">👑</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:#fef3c7;margin-bottom:0.25rem">Kalix Royal Rewards</h2>
        <p style="font-size:13px;color:#fbbf24">Order ${MILESTONE_STEP} Ice Creams &amp; Unlock Mystery Packs</p>
        
        <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(245,158,11,0.4);border-radius:var(--r-lg);padding:1rem;margin-top:1.25rem;display:flex;align-items:center;justify-content:space-around">
          <div>
            <div style="font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase">Your Coin Balance</div>
            <div style="font-size:28px;font-weight:700;color:#fbbf24;margin-top:2px">🪙 <span id="modalCoinCount">0</span></div>
          </div>
          <div style="width:1px;height:40px;background:rgba(255,255,255,0.15)"></div>
          <div>
            <div style="font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase">Cash Value (₹5/coin)</div>
            <div style="font-size:26px;font-weight:700;color:#a7f3d0;margin-top:2px">₹<span id="modalCashValue">0</span></div>
          </div>
        </div>
      </div>
      
      <div style="padding:1.5rem">
        <div style="margin-bottom:1.25rem">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:0.4rem">
            <span id="modalPackTitle">Progress to Pack #1 (${MILESTONE_STEP} Ice Creams)</span>
            <span id="modalProgressText" style="color:var(--amber)">0 / ${MILESTONE_STEP}</span>
          </div>
          <div class="coin-progress-bar">
            <div class="coin-progress-fill" id="modalProgressFill" style="width:0%"></div>
          </div>
          <p style="font-size:12px;color:var(--outline);margin-top:0.4rem" id="modalProgressSub">Add ${MILESTONE_STEP} ice creams to unlock a random 1–100 coins pack!</p>
        </div>

        <div style="background:var(--surface-container-low);border-radius:var(--r-md);padding:1rem;margin-bottom:1.5rem;font-size:12px;color:var(--on-surface-variant);line-height:1.6">
          <div style="font-weight:700;color:var(--on-surface);margin-bottom:0.25rem;display:flex;align-items:center;gap:0.35rem">
            <span class="material-icons" style="font-size:16px;color:var(--amber)">info</span> How it works:
          </div>
          • Every ${MILESTONE_STEP} Ice Creams purchased unlocks 1 Mystery Gold Pack.<br/>
          • After claiming, progress resets to 0/${MILESTONE_STEP} and the next pack strictly requires the <strong>next ${MILESTONE_STEP} orders/products</strong>.<br/>
          • Every pack contains a random drop of <strong>1 to 100 Coins</strong>.<br/>
          • <strong>1–20 Coins have high drop probability (80%)</strong>.<br/>
          • <strong>1 Coin = ₹5 discount value</strong>.<br/>
          • Redeem your coins directly on any order at checkout or in your cart!
        </div>

        <div style="display:flex;gap:0.75rem">
          <button class="btn-primary btn-full btn-claim-checkout" onclick="closeRewardsInfoModal();triggerPackOpening(null, true)" id="modalOpenPackBtn">
            <ion-icon name="flash"></ion-icon>
            <span>Open Mystery Pack Now</span>
          </button>
        </div>
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

  modal.classList.add('active');
}

function startPackOpening() {
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

  // Shake animation & rumble sound
  card.classList.add('shaking');
  playFutAudio('shake');

  setTimeout(() => {
    card.classList.remove('shaking');
    unopened.style.display = 'none';
    reveal.style.display = 'flex';

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
  requestAnimationFrame(()=> refreshMotionElements());
});
