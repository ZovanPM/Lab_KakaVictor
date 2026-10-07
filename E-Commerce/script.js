(function(){
"use strict";
"use strict";

  /* ---------------- data ---------------- */
  const CATEGORIES = ["Semua","Gantung","Meja","Pot Besar","Aksesoris","Perawatan"];

  function leafIcon(color1, color2){
    return `<svg viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="86" rx="34" ry="6" fill="${color2}" opacity="0.25"/>
      <path d="M50 86V40" stroke="${color2}" stroke-width="4" stroke-linecap="round"/>
      <path d="M50 60c-16-4-26-16-28-34 18 2 28 12 28 34z" fill="${color1}"/>
      <path d="M50 55c14-6 22-18 22-34-16 3-24 12-22 34z" fill="${color2}"/>
      <path d="M50 40c-4-14 0-24 8-32-10 6-14 16-8 32z" fill="${color1}" opacity="0.85"/>
    </svg>`;
  }
  function potIcon(color1, color2){
    return `<svg viewBox="0 0 100 100" fill="none">
      <path d="M32 55h36l-5 30a4 4 0 0 1-4 3H41a4 4 0 0 1-4-3l-5-30z" fill="${color1}"/>
      <rect x="28" y="47" width="44" height="10" rx="3" fill="${color2}"/>
      <path d="M50 47V22" stroke="${color2}" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="50" cy="20" rx="16" ry="10" fill="${color2}"/>
      <ellipse cx="34" cy="30" rx="12" ry="8" fill="${color1}" transform="rotate(-20 34 30)"/>
      <ellipse cx="66" cy="30" rx="12" ry="8" fill="${color1}" transform="rotate(20 66 30)"/>
    </svg>`;
  }
  function toolIcon(color1, color2){
    return `<svg viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="34" fill="${color1}" opacity="0.18"/>
      <path d="M30 70 62 38" stroke="${color2}" stroke-width="5" stroke-linecap="round"/>
      <path d="M55 33h16v16" stroke="${color1}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="30" cy="70" r="6" fill="${color1}"/>
    </svg>`;
  }
  function bagIcon(color1, color2){
    return `<svg viewBox="0 0 100 100" fill="none">
      <path d="M28 40h44l4 40a5 5 0 0 1-5 5H29a5 5 0 0 1-5-5l4-40z" fill="${color1}"/>
      <path d="M38 40c0-10 5-17 12-17s12 7 12 17" stroke="${color2}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="40" y="52" width="20" height="6" rx="3" fill="${color2}"/>
    </svg>`;
  }

  const forest="var(--forest)", forestDim="var(--forest-dim)", moss="var(--moss)", clay="var(--clay)", gold="var(--gold)";

  const PRODUCTS = [
    {id:"p1", name:"Monstera Deliciosa", cat:"Meja", price:185000, stock:12, desc:"Daun berlubang ikonik, tumbuh cepat di cahaya terang tak langsung.", icon:leafIcon(forest, forestDim)},
    {id:"p2", name:"Sirih Gantung Variegata", cat:"Gantung", price:95000, stock:30, desc:"Rambatan indah untuk rak atau pot gantung, tahan banting.", icon:leafIcon(moss, forest)},
    {id:"p3", name:"Lidah Mertua Laurentii", cat:"Meja", price:75000, stock:8, desc:"Nyaris tak perlu disiram, cocok untuk sudut ruangan minim cahaya.", icon:leafIcon(forestDim, moss)},
    {id:"p4", name:"Kaktus Koleksi Mini (3pcs)", cat:"Meja", price:120000, stock:20, desc:"Tiga kaktus mungil siap tata di meja kerja, pot keramik disertakan.", icon:leafIcon(gold, forest)},
    {id:"p5", name:"Pot Terakota Bulat 20cm", cat:"Pot Besar", price:65000, stock:0, desc:"Pot tanah liat dengan lubang drainase, cocok untuk tanaman besar.", icon:potIcon(clay, forestDim)},
    {id:"p6", name:"Pot Keramik Bergelombang", cat:"Aksesoris", price:89000, stock:45, desc:"Finishing matte dengan tekstur bergelombang, tersedia dudukan kayu.", icon:potIcon(forestDim, clay)},
    {id:"p7", name:"Pupuk Organik Cair 500ml", cat:"Perawatan", price:45000, stock:5, desc:"Formula alami untuk pertumbuhan daun lebih subur dan hijau.", icon:bagIcon(gold, forest)},
    {id:"p8", name:"Media Tanam Premium 5kg", cat:"Perawatan", price:38000, stock:60, desc:"Campuran sekam, kompos, dan cocopeat siap pakai.", icon:bagIcon(forestDim, moss)},
    {id:"p9", name:"Set Alat Berkebun Mini", cat:"Aksesoris", price:129000, stock:15, desc:"Sekop, garpu, dan gunting stainless dengan pouch kanvas.", icon:toolIcon(clay, forest)},
    {id:"p10", name:"Philodendron Brasil", cat:"Gantung", price:110000, stock:18, desc:"Daun belang kuning-hijau, tumbuh subur dengan sedikit perawatan.", icon:leafIcon(gold, moss)},
    {id:"p11", name:"Pot Gantung Rotan Anyam", cat:"Pot Besar", price:150000, stock:9, desc:"Anyaman rotan asli, kuat menopang pot hingga diameter 18cm.", icon:potIcon(gold, clay)},
    {id:"p12", name:"Semprotan Kabut Kaca", cat:"Aksesoris", price:69000, stock:0, desc:"Botol kaca elegan untuk menjaga kelembapan daun tropis.", icon:bagIcon(moss, forestDim)},
  ];

  const FREE_SHIP_THRESHOLD = 300000;
  const VOUCHERS = {
    "HIJAU10": {type:"percent", value:10, label:"Diskon 10%"},
    "RIMBA20K": {type:"flat", value:20000, label:"Potongan Rp20.000"},
  };

  /* ---------------- state ---------------- */
  let state = {
    cart: {},          // id -> qty
    category: "Semua",
    search: "",
    sort: "default",
    voucher: null,
  };

  function loadCart(){
    try{
      const raw = localStorage.getItem("rimba-cart-v1");
      if(raw) state.cart = JSON.parse(raw);
      const v = localStorage.getItem("rimba-voucher-v1");
      if(v) state.voucher = JSON.parse(v);
    }catch(e){ /* ignore, start fresh */ }
  }
  function saveCart(){
    try{
      localStorage.setItem("rimba-cart-v1", JSON.stringify(state.cart));
      if(state.voucher) localStorage.setItem("rimba-voucher-v1", JSON.stringify(state.voucher));
      else localStorage.removeItem("rimba-voucher-v1");
    }catch(e){ /* storage unavailable, continue without persistence */ }
  }

  function formatRp(n){
    return "Rp" + Math.round(n).toLocaleString("id-ID");
  }
  function productById(id){ return PRODUCTS.find(p => p.id === id); }
  function cartQty(id){ return state.cart[id] || 0; }

  /* ---------------- rendering: chips ---------------- */
  const chipsEl = document.getElementById("category-chips");
  function renderChips(){
    chipsEl.innerHTML = CATEGORIES.map(c =>
      `<button class="chip ${c===state.category?'active':''}" data-cat="${c}">${c}</button>`
    ).join("");
  }
  chipsEl.addEventListener("click", e=>{
    const btn = e.target.closest(".chip");
    if(!btn) return;
    state.category = btn.dataset.cat;
    renderChips();
    renderGrid();
  });

  /* ---------------- rendering: grid ---------------- */
  const gridEl = document.getElementById("product-grid");
  const resultCountEl = document.getElementById("result-count");
  const emptyIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`;

  function getFiltered(){
    let list = PRODUCTS.filter(p => state.category==="Semua" || p.cat===state.category);
    if(state.search.trim()){
      const q = state.search.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if(state.sort==="price-asc") list = [...list].sort((a,b)=>a.price-b.price);
    else if(state.sort==="price-desc") list = [...list].sort((a,b)=>b.price-a.price);
    else if(state.sort==="name-asc") list = [...list].sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  }

  function renderGrid(){
    const list = getFiltered();
    resultCountEl.textContent = `${list.length} produk ditampilkan dari total ${PRODUCTS.length}`;

    if(list.length===0){
      gridEl.innerHTML = `<div class="empty-state">${emptyIconSvg}<div>Tidak ada tanaman yang cocok. Coba kata kunci atau kategori lain.</div></div>`;
      return;
    }

    gridEl.innerHTML = list.map(p=>{
      const qty = cartQty(p.id);
      const outOfStock = p.stock === 0;
      const low = !outOfStock && p.stock <= 6;
      let stockLabel, stockClass;
      if(outOfStock){ stockLabel = "Stok habis"; stockClass = "out"; }
      else if(low){ stockLabel = `Sisa ${p.stock}`; stockClass = "low"; }
      else { stockLabel = `Stok tersedia: ${p.stock}`; stockClass = ""; }

      let footHtml;
      if(outOfStock){
        footHtml = `<button class="add-btn" disabled>Habis</button>`;
      } else if(qty > 0){
        footHtml = `
          <div class="qty-stepper">
            <button data-act="dec" data-id="${p.id}" aria-label="Kurangi">–</button>
            <span>${qty}</span>
            <button data-act="inc" data-id="${p.id}" aria-label="Tambah" ${qty>=p.stock?'disabled':''}>+</button>
          </div>
          <button class="add-btn in-cart" data-act="goto" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>
            Di keranjang
          </button>`;
      } else {
        footHtml = `<button class="add-btn" data-act="add" data-id="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Tambah
          </button>`;
      }

      return `<div class="card">
        <div class="card-art">${p.icon}</div>
        <div class="card-body">
          <span class="card-tag">${p.cat}</span>
          <h3>${p.name}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-price">${formatRp(p.price)}</div>
          <div class="card-stock ${stockClass}">${stockLabel}</div>
          <div class="card-foot">${footHtml}</div>
        </div>
      </div>`;
    }).join("");
  }

  gridEl.addEventListener("click", e=>{
    const btn = e.target.closest("button[data-act]");
    if(!btn) return;
    const id = btn.dataset.id;
    const act = btn.dataset.act;
    const p = productById(id);
    if(!p) return;

    if(act==="add"){
      state.cart[id] = 1;
      showToast(`${p.name} ditambahkan ke keranjang`);
    } else if(act==="inc"){
      if(cartQty(id) < p.stock) state.cart[id] = cartQty(id)+1;
    } else if(act==="dec"){
      const nq = cartQty(id)-1;
      if(nq <= 0) delete state.cart[id]; else state.cart[id] = nq;
    } else if(act==="goto"){
      document.getElementById("cart-panel").scrollIntoView({behavior:"smooth", block:"start"});
    }
    saveCart();
    renderGrid();
    renderCart();
  });

  /* ---------------- toolbar ---------------- */
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", e=>{
    state.search = e.target.value;
    renderGrid();
  });
  document.getElementById("sort-select").addEventListener("change", e=>{
    state.sort = e.target.value;
    renderGrid();
  });

  /* ---------------- cart panel ---------------- */
  const cartItemsEl = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartSummaryEl = document.getElementById("cart-item-summary");
  const shipMsgEl = document.getElementById("ship-msg");
  const shipFillEl = document.getElementById("ship-fill");
  const checkoutBtn = document.getElementById("checkout-btn");
  const orderNoteEl = document.getElementById("order-note");

  function getCartEntries(){
    return Object.entries(state.cart)
      .map(([id,qty])=>({p: productById(id), qty}))
      .filter(e=>e.p);
  }

  function computeTotals(){
    const entries = getCartEntries();
    const subtotal = entries.reduce((s,e)=> s + e.p.price*e.qty, 0);
    let discount = 0;
    if(state.voucher){
      const v = VOUCHERS[state.voucher];
      if(v){
        discount = v.type==="percent" ? subtotal*(v.value/100) : Math.min(v.value, subtotal);
      }
    }
    const afterDiscount = Math.max(subtotal - discount, 0);
    const shipping = (subtotal===0 || afterDiscount >= FREE_SHIP_THRESHOLD) ? 0 : 15000;
    const total = afterDiscount + shipping;
    return {entries, subtotal, discount, shipping, total};
  }

  function renderCart(){
    const {entries, subtotal, discount, shipping, total} = computeTotals();
    const totalQty = entries.reduce((s,e)=>s+e.qty,0);
    cartCountEl.textContent = totalQty;

    if(entries.length===0){
      cartItemsEl.innerHTML = `<div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <div>Keranjang masih kosong.</div>
      </div>`;
      cartSummaryEl.textContent = "Belum ada tanaman dipilih";
    } else {
      cartItemsEl.innerHTML = entries.map(({p,qty})=>`
        <div class="cart-row">
          <div class="cart-row-art">${p.icon}</div>
          <div class="cart-row-info">
            <div class="name">${p.name}</div>
            <div class="price">${formatRp(p.price)} × ${qty}</div>
            <div class="cart-row-ctrl">
              <button data-act="dec" data-id="${p.id}" aria-label="Kurangi">–</button>
              <span>${qty}</span>
              <button data-act="inc" data-id="${p.id}" aria-label="Tambah" ${qty>=p.stock?'disabled':''}>+</button>
              <button class="remove-x" data-act="remove" data-id="${p.id}">Hapus</button>
            </div>
          </div>
        </div>`).join("");
      cartSummaryEl.textContent = `${totalQty} item di keranjang`;
    }

    if(subtotal >= FREE_SHIP_THRESHOLD || subtotal===0){
      shipMsgEl.textContent = subtotal===0 ? "Belanja Rp300.000 lagi untuk bebas ongkir" : "Kamu mendapat ongkir gratis 🎉";
      shipFillEl.style.width = subtotal===0 ? "0%" : "100%";
    } else {
      const remaining = FREE_SHIP_THRESHOLD - subtotal;
      shipMsgEl.textContent = `Belanja ${formatRp(remaining)} lagi untuk bebas ongkir`;
      shipFillEl.style.width = Math.min(100,(subtotal/FREE_SHIP_THRESHOLD)*100)+"%";
    }

    document.getElementById("sum-subtotal").textContent = formatRp(subtotal);
    document.getElementById("sum-discount").textContent = "-"+formatRp(discount);
    document.getElementById("sum-shipping").textContent = subtotal===0 ? formatRp(0) : (shipping===0 ? "Gratis" : formatRp(shipping));
    document.getElementById("sum-total").textContent = formatRp(total);

    checkoutBtn.disabled = entries.length===0;

    // voucher field sync
    document.getElementById("voucher-input").value = state.voucher || "";
  }

  cartItemsEl.addEventListener("click", e=>{
    const btn = e.target.closest("button[data-act]");
    if(!btn) return;
    const id = btn.dataset.id;
    const act = btn.dataset.act;
    const p = productById(id);
    if(!p) return;
    if(act==="inc"){
      if(cartQty(id) < p.stock) state.cart[id] = cartQty(id)+1;
    } else if(act==="dec"){
      const nq = cartQty(id)-1;
      if(nq<=0) delete state.cart[id]; else state.cart[id]=nq;
    } else if(act==="remove"){
      delete state.cart[id];
    }
    saveCart();
    renderGrid();
    renderCart();
  });

  /* ---------------- voucher ---------------- */
  const voucherMsgEl = document.getElementById("voucher-msg");
  document.getElementById("voucher-apply").addEventListener("click", ()=>{
    const code = document.getElementById("voucher-input").value.trim().toUpperCase();
    if(!code){
      state.voucher = null;
      voucherMsgEl.textContent = "";
      voucherMsgEl.className = "voucher-msg";
      saveCart(); renderCart();
      return;
    }
    if(VOUCHERS[code]){
      state.voucher = code;
      voucherMsgEl.textContent = `Kode dipakai: ${VOUCHERS[code].label}`;
      voucherMsgEl.className = "voucher-msg ok";
    } else {
      state.voucher = null;
      voucherMsgEl.textContent = "Kode voucher tidak ditemukan.";
      voucherMsgEl.className = "voucher-msg err";
    }
    saveCart();
    renderCart();
  });

  /* ---------------- checkout ---------------- */
  checkoutBtn.addEventListener("click", ()=>{
    const {entries, total} = computeTotals();
    if(entries.length===0) return;
    const totalQty = entries.reduce((s,e)=>s+e.qty,0);
    orderNoteEl.textContent = `Pesanan ${totalQty} barang senilai ${formatRp(total)} berhasil dibuat.`;
    orderNoteEl.classList.add("show");
    state.cart = {};
    state.voucher = null;
    voucherMsgEl.textContent = "";
    voucherMsgEl.className = "voucher-msg";
    saveCart();
    renderGrid();
    renderCart();
    setTimeout(()=>orderNoteEl.classList.remove("show"), 5000);
  });

  /* ---------------- toast ---------------- */
  let toastTimer;
  function showToast(msg){
    const t = document.getElementById("toast");
    document.getElementById("toast-text").textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>t.classList.remove("show"), 2200);
  }

  /* ---------------- header interactions ---------------- */
  document.getElementById("cart-scroll-btn").addEventListener("click", ()=>{
    document.getElementById("cart-panel").scrollIntoView({behavior:"smooth", block:"start"});
  });
  document.getElementById("hero-shop-btn").addEventListener("click", ()=>{
    document.querySelector(".catalog").scrollIntoView({behavior:"smooth", block:"start"});
  });
  document.getElementById("hero-guide-btn").addEventListener("click", ()=>{
    showToast("Panduan perawatan: siram saat tanah kering 2cm dari permukaan 🌱");
  });

  /* ---------------- theme toggle ---------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const sunPath = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>`;
  const moonPath = `<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>`;
  function applyTheme(mode){
    if(mode==="dark"){ document.documentElement.setAttribute("data-theme","dark"); themeIcon.innerHTML = moonPath; }
    else { document.documentElement.setAttribute("data-theme","light"); themeIcon.innerHTML = sunPath; }
    try{ localStorage.setItem("rimba-theme", mode); }catch(e){}
  }
  themeToggle.addEventListener("click", ()=>{
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current==="dark" ? "light" : "dark");
  });
  (function initTheme(){
    let saved = null;
    try{ saved = localStorage.getItem("rimba-theme"); }catch(e){}
    if(saved) applyTheme(saved);
    else themeIcon.innerHTML = sunPath;
  })();

  /* ---------------- init ---------------- */
  loadCart();
  renderChips();
  renderGrid();
  renderCart();
})();
