(() => {
  "use strict";
  const WHATSAPP_NUMBER = "917742062730";
  const CONTACT_EMAIL = "mandaljodhaom@gmail.com";
  const UPI_ID = ""; // Add your verified business UPI ID here before enabling real UPI instructions.
  const DEMO_PASSCODE = "khetfit-demo";
  const PRODUCTS_KEY = "khetfit-demo-products-v1";
  const CART_KEY = "khetfit-demo-cart-v1";
  const REVIEWS_KEY = "khetfit-demo-reviews-v1";
  const ORDERS_KEY = "khetfit-demo-orders-v1";
  const categories = ["All products", "Peanut butter", "Protein", "Supplements", "Healthy foods"];
  const starterProducts = [
    {id:"pb-creamy",name:"Creamy Peanut Butter",category:"Peanut butter",emoji:"🥜",price:399,weight:["340 g","1 kg"],flavours:["Classic creamy","No added sugar"],desc:"A smooth peanut butter demo listing for toast, oats and everyday recipes. Sample content only; verify ingredients, nutrition, allergen details and price before selling.",stock:"In stock (demo)",rating:4.6,reviews:18,tag:"BESTSELLER"},
    {id:"pb-crunchy",name:"Crunchy Peanut Butter",category:"Peanut butter",emoji:"🥜",price:399,weight:["340 g","1 kg"],flavours:["Classic crunchy","No added sugar"],desc:"A crunchy texture option for customers who like a little bite. Sample content only; confirm product specifications before launch.",stock:"In stock (demo)",rating:4.4,reviews:12,tag:"CRUNCHY"},
    {id:"pb-choco",name:"Chocolate Peanut Butter",category:"Peanut butter",emoji:"🍫",price:279,weight:["340 g","500 g"],flavours:["Chocolate","Dark chocolate"],desc:"A chocolate-flavour demo product. Ingredients, allergens, nutrition information and actual availability must be supplied by the owner.",stock:"In stock (demo)",rating:4.5,reviews:9,tag:"CHOCOLATE"},
    {id:"pb-combo",name:"Peanut Butter Duo",category:"Peanut butter",emoji:"🥜",price:749,weight:["2 × 1 kg"],flavours:["Creamy + Crunchy"],desc:"Sample bundle containing two peanut butter variants. Bundle contents and price are placeholders.",stock:"In stock (demo)",rating:4.7,reviews:6,tag:"COMBO"},
    {id:"pr-whey",name:"Whey Protein",category:"Protein",emoji:"🥤",price:2299,weight:["500 g","1 kg","2 kg"],flavours:["Chocolate","Vanilla","Mango"],desc:"Demo listing only. Do not rely on this description for nutrition or health claims. Confirm supplier, ingredient list, batch details and applicable labelling before sale.",stock:"In stock (demo)",rating:4.5,reviews:24,tag:"PROTEIN"},
    {id:"pr-plant",name:"Plant Protein",category:"Protein",emoji:"🌱",price:1799,weight:["500 g","1 kg"],flavours:["Chocolate","Vanilla"],desc:"A placeholder plant-protein listing. Product composition and dietary suitability need to be verified from the actual label.",stock:"In stock (demo)",rating:4.3,reviews:11,tag:"PLANT BASED"},
    {id:"pr-shaker",name:"KhetFit Shaker",category:"Protein",emoji:"🥤",price:349,weight:["700 ml"],flavours:["Black","Olive"],desc:"Demo shaker bottle listing. Confirm material, capacity and care instructions before launch.",stock:"In stock (demo)",rating:4.4,reviews:7,tag:"GEAR"},
    {id:"su-creatine",name:"Creatine Monohydrate",category:"Supplements",emoji:"⚡",price:899,weight:["100 g","250 g"],flavours:["Unflavoured"],desc:"Placeholder supplement listing. Confirm authenticity, ingredient and label information, serving directions and regulatory compliance before sale.",stock:"In stock (demo)",rating:4.2,reviews:14,tag:"ESSENTIAL"},
    {id:"su-multi",name:"Multivitamin",category:"Supplements",emoji:"💊",price:599,weight:["30 tablets","60 tablets"],flavours:["Standard"],desc:"Sample catalogue entry only. Verify the exact formulation, label claims, warnings and expiry details before publishing.",stock:"In stock (demo)",rating:4.1,reviews:8,tag:"DAILY"},
    {id:"hf-oats",name:"Rolled Oats",category:"Healthy foods",emoji:"🌾",price:199,weight:["500 g","1 kg"],flavours:["Classic"],desc:"Demo oats listing for breakfast and recipes. Confirm pack size, ingredients, nutrition details and actual price before sale.",stock:"In stock (demo)",rating:4.6,reviews:15,tag:"PANTRY"},
    {id:"hf-trail",name:"Trail Mix",category:"Healthy foods",emoji:"🥣",price:299,weight:["200 g","500 g"],flavours:["Classic","Fruit & nut"],desc:"Placeholder snack mix. Actual ingredients, allergen information and pack sizes must be verified before launch.",stock:"In stock (demo)",rating:4.3,reviews:10,tag:"SNACK"},
    {id:"hf-oil",name:"Roasted Peanuts",category:"Healthy foods",emoji:"🥜",price:149,weight:["200 g","500 g"],flavours:["Salted","Classic"],desc:"Demo roasted peanut listing. Confirm ingredients, allergen warnings, nutrition facts and final pack details.",stock:"In stock (demo)",rating:4.4,reviews:5,tag:"SIMPLE"}
  ];
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
  const read = (key, fallback) => { try { const v=localStorage.getItem(key); return v?JSON.parse(v):fallback; } catch { return fallback; } };
  const save = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch {} };
  let products = read(PRODUCTS_KEY, starterProducts);
  let cart = read(CART_KEY, []);
  let reviews = read(REVIEWS_KEY, {});
  let orders = read(ORDERS_KEY, []);
  let activeCategory = "All products";
  let selectedProduct = null;
  let selectedWeight = "";
  let selectedFlavour = "";
  let detailQty = 1;
  let galleryIndex = 0;
  let toastTimer;

  function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function getProduct(id){return products.find(p=>p.id===id);}
  function userReviews(id){return reviews[id]||[];}
  function ratingData(p){const r=userReviews(p.id);if(!r.length)return {rating:p.rating,count:p.reviews,source:"sample"};const sum=r.reduce((a,x)=>a+x.rating,0);return {rating:sum/r.length,count:p.reviews+r.length,source:"sample + browser reviews"};}
  function stars(value){const full=Math.round(value);return "★".repeat(full)+"☆".repeat(5-full);}
  function iconArt(p,index=0){const emojis=[p.emoji,["📦","🔍","✦","🌿","⚡"][index%5],p.emoji,["🥣","🏷️","✨","🌾","◈"][index%5],p.emoji,["✔","📋","✳","🌱","★"][index%5]];return emojis[index%emojis.length];}
  function renderCategories(){ $("#categories").innerHTML=categories.map(c=>`<button class="category-button ${c===activeCategory?"active":""}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join(""); }
  function visibleProducts(){
    const q=$("#search").value.trim().toLowerCase(); let list=products.filter(p=>(activeCategory==="All products"||p.category===activeCategory)&&(!q||(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(q)));
    const sort=$("#sort").value;if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));return list;
  }
  function renderProducts(){
    const list=visibleProducts();$("#product-grid").innerHTML=list.map((p,i)=>{const r=ratingData(p);return `<article class="product-card" data-product="${p.id}" tabindex="0" role="button" aria-label="View ${escapeHtml(p.name)}"><div class="product-art"><span class="art-label">${escapeHtml(p.tag||"KHETFIT")}</span><span class="product-emoji">${p.emoji}</span><span class="art-index">KF / ${String(i+1).padStart(2,"0")}</span></div><div class="card-info"><span class="card-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><div class="card-meta">${escapeHtml(p.weight[0])} · ${escapeHtml(p.flavours[0])}</div><div class="card-rating"><span class="stars">${stars(r.rating)}</span> ${r.rating.toFixed(1)} <span class="card-meta">(${r.count})</span></div><div class="card-buy"><span class="card-price">${money(p.price)}</span><button class="add-mini" data-add="${p.id}" aria-label="Add ${escapeHtml(p.name)} to cart">Quick add +</button></div></div></article>`;}).join("");
    $("#empty-state").hidden=list.length>0;
  }
  function openOverlay(id){$("#"+id).hidden=false;document.body.style.overflow="hidden";}
  function closeOverlay(id){$("#"+id).hidden=true;if(!$$(".overlay").some(x=>!x.hidden))document.body.style.overflow="";}
  function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200);}
  function openProduct(id){const p=getProduct(id);if(!p)return;selectedProduct=p;selectedWeight=p.weight[0];selectedFlavour=p.flavours[0];detailQty=1;galleryIndex=0;renderDetail();openOverlay("product-overlay");}
  function renderDetail(){
    const p=selectedProduct;if(!p)return;const r=ratingData(p);const rev=userReviews(p.id);
    $("#product-detail").innerHTML=`<div class="detail-layout"><div><div class="gallery-main"><span class="product-emoji">${iconArt(p,galleryIndex)}</span><span class="gallery-count">IMAGE ${galleryIndex+1} / 6</span></div><div class="gallery-thumbs">${[0,1,2,3,4,5].map(i=>`<button class="thumb ${i===galleryIndex?"active":""}" data-gallery="${i}" aria-label="Show product image ${i+1}">${iconArt(p,i)}</button>`).join("")}</div><p class="detail-note">Six demo gallery views are shown here. Replace these illustrations with six real product photos before launch.</p></div><div class="detail-copy"><span class="card-category">${escapeHtml(p.category)} / ${escapeHtml(p.tag||"KHETFIT")}</span><h2 id="detail-title">${escapeHtml(p.name)}</h2><div class="detail-rating"><span class="stars">${stars(r.rating)}</span> <strong>${r.rating.toFixed(1)}/5</strong> · ${r.count} ratings <span class="subtle">(includes sample rating)</span></div><div class="detail-price">${money(p.price)} <span class="subtle">starting price · demo</span></div><p class="detail-description">${escapeHtml(p.desc)}</p><label class="field-label">Choose weight / pack</label><div class="variant-row" id="weight-options">${p.weight.map((w,i)=>`<button class="variant ${w===selectedWeight?"active":""}" data-weight="${escapeHtml(w)}">${escapeHtml(w)}</button>`).join("")}</div><label class="field-label">Choose flavour / variant</label><div class="variant-row" id="flavour-options">${p.flavours.map((f,i)=>`<button class="variant ${f===selectedFlavour?"active":""}" data-flavour="${escapeHtml(f)}">${escapeHtml(f)}</button>`).join("")}</div><div class="quantity-row"><strong>Quantity</strong><div class="qty-control"><button data-detail-qty="-1" aria-label="Decrease quantity">−</button><span id="detail-qty">${detailQty}</span><button data-detail-qty="1" aria-label="Increase quantity">+</button></div></div><div class="detail-actions"><button class="button button-primary" id="detail-add">Add to cart · ${money(p.price*detailQty)}</button><button class="button button-ghost" id="detail-buy">Buy now ↗</button></div><p class="detail-note">Demo listing: confirm actual stock, final variant prices and product label before purchase.</p></div></div><div class="review-section"><h3>Customer ratings & reviews</h3><div class="review-summary"><strong>${r.rating.toFixed(1)}</strong><div><div class="stars">${stars(r.rating)}</div><small class="subtle">${r.count} ratings · demo/sample ratings are not verified purchases</small></div></div><div class="review-list">${rev.length?rev.map(x=>`<div class="review"><span class="stars">${stars(x.rating)}</span> <strong>${escapeHtml(x.name)}</strong><small> · browser demo review</small><p>${escapeHtml(x.text)}</p></div>`).join(""):`<p class="subtle">No customer-written reviews yet. Add a demo review below to try the feature.</p>`}</div><form class="review-form" id="review-form"><select name="rating" aria-label="Your rating"><option value="5">★★★★★ — 5</option><option value="4">★★★★☆ — 4</option><option value="3">★★★☆☆ — 3</option><option value="2">★★☆☆☆ — 2</option><option value="1">★☆☆☆☆ — 1</option></select><input name="name" placeholder="Your name" required maxlength="40"><textarea name="text" placeholder="Write a product review..." required maxlength="400"></textarea><button class="button button-ghost" type="submit">Submit demo review</button></form></div>`;
  }
  function addCart(p,weight,flavour,qty=1){const key=[p.id,weight,flavour].join("::");const found=cart.find(x=>x.key===key);if(found)found.qty=Math.min(20,found.qty+qty);else cart.push({key,id:p.id,weight,flavour,qty:Math.min(20,qty)});save(CART_KEY,cart);renderCartCount();toast("Added to cart");}
  function cartRows(){return cart.map(item=>({...item,product:getProduct(item.id)})).filter(x=>x.product);}
  function renderCartCount(){$("#cart-count").textContent=cart.reduce((s,x)=>s+x.qty,0);}
  function renderCart(){
    const rows=cartRows();const total=rows.reduce((s,x)=>s+x.product.price*x.qty,0);$("#cart-items-label").textContent=`(${rows.reduce((s,x)=>s+x.qty,0)})`;
    if(!rows.length){$("#cart-content").innerHTML=`<div class="empty-cart"><span>🛒</span><h3>Your cart is waiting.</h3><p>Add a product to get started.</p><button class="button button-primary" id="continue-shopping">Explore products</button></div>`;return;}
    $("#cart-content").innerHTML=`<div class="cart-lines">${rows.map(x=>`<div class="cart-line"><div class="cart-thumb">${x.product.emoji}</div><div><h3>${escapeHtml(x.product.name)}</h3><small>${escapeHtml(x.weight)} · ${escapeHtml(x.flavour)}</small><div class="qty-control"><button data-cart-qty="-1" data-key="${escapeHtml(x.key)}">−</button><span>${x.qty}</span><button data-cart-qty="1" data-key="${escapeHtml(x.key)}">+</button></div><button class="remove-line" data-remove="${escapeHtml(x.key)}">Remove</button></div><strong class="line-price">${money(x.product.price*x.qty)}</strong></div>`).join("")}</div><div class="cart-bottom"><div class="subtotal-row"><span>Subtotal</span><span>${money(total)}</span></div><p>Shipping charges, delivery availability and final price will be confirmed before dispatch. Demo orders are not sent to a live store.</p><button class="button button-primary button-wide" id="go-checkout">Continue to checkout ↗</button><button class="button button-ghost button-wide" id="keep-shopping">Keep shopping</button></div>`;
  }
  function cartTotal(){return cartRows().reduce((s,x)=>s+x.product.price*x.qty,0);}
  function changeCart(key,delta){const item=cart.find(x=>x.key===key);if(!item)return;item.qty+=delta;if(item.qty<1)cart=cart.filter(x=>x.key!==key);if(item.qty>20)item.qty=20;save(CART_KEY,cart);renderCart();renderCartCount();}
  function openCheckout(){if(!cart.length){toast("Add a product first");return;}closeOverlay("cart-overlay");$("#checkout-result").hidden=true;$("#checkout-form").hidden=false;openOverlay("checkout-overlay");}
  function buildOrderMessage(form,payment){
    const data=new FormData(form);const lines=cartRows().map((x,i)=>`${i+1}. ${x.product.name} — ${x.weight}, ${x.flavour} × ${x.qty} = ${money(x.product.price*x.qty)}`);
    return `KHETFIT DEMO ORDER REQUEST\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nAddress: ${data.get("address")}, ${data.get("city")}, ${data.get("state")} - ${data.get("pin")}\n\nItems:\n${lines.join("\n")}\n\nSubtotal: ${money(cartTotal())}\nPayment preference: ${payment==="cod"?"Cash on Delivery": "Pay Now — UPI (payment not collected by this demo)"}\nNotes: ${data.get("notes")||"None"}\n\nPlease confirm stock, shipping and final payable amount with the customer.`;
  }
  function submitCheckout(e){
    e.preventDefault();const form=e.currentTarget;const data=new FormData(form);const payment=data.get("payment");const message=buildOrderMessage(form,payment);
    const order={id:"KF-"+Date.now().toString().slice(-7),createdAt:new Date().toLocaleString(),payment,status:"Demo request — not sent to server",total:cartTotal(),message};orders.unshift(order);save(ORDERS_KEY,orders);
    $("#checkout-form").hidden=true;const result=$("#checkout-result");result.hidden=false;
    const paymentNote=payment==="upi"?(UPI_ID?`Configured UPI ID: ${UPI_ID}. Use a verified payment flow before launch.`:"<strong>UPI is not configured yet.</strong> No payment has been collected. Ask the owner to add a verified business UPI ID and payment instructions before launch."):"COD selected. This is only a demo request; confirm COD serviceability and order with the seller.";
    result.innerHTML=`<h3>Order preview created</h3><p class="subtle">Reference ${order.id}. This request is stored only in this browser. It has not been sent to a server and is not a confirmed order.</p><div class="admin-warning">${paymentNote}</div><pre>${escapeHtml(message)}</pre><div class="result-actions"><a class="button button-primary" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener">Send request on WhatsApp ↗</a><button class="button button-ghost" id="copy-order">Copy order</button></div>`;
    $("#copy-order").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(message);toast("Order copied");}catch{toast("Please select and copy the order text");}});
  }
  function renderAdminProducts(){
    $("#admin-product-list").innerHTML=products.map(p=>`<div class="admin-product"><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.category)} · ${escapeHtml(p.stock||"Demo stock")}</small></div><label>Price (₹)<input type="number" min="1" max="100000" data-admin-price="${p.id}" value="${p.price}"></label></div>`).join("");
  }
  function renderAdminOrders(){
    $("#admin-order-list").innerHTML=orders.length?orders.map(o=>`<div class="admin-order"><strong>${escapeHtml(o.id)} · ${money(o.total)}</strong><p>${escapeHtml(o.createdAt)} · ${escapeHtml(o.payment.toUpperCase())}</p><p class="subtle">${escapeHtml(o.status)}</p><pre>${escapeHtml(o.message)}</pre></div>`).join(""):`<p class="subtle">No demo orders in this browser yet. Orders from other devices/customers will not appear here until a backend is connected.</p>`;
  }
  function openAdmin(){openOverlay("admin-overlay");$("#admin-login").hidden=false;$("#admin-panel").hidden=true;$("#admin-pass").value="";}
  function showAdmin(){if($("#admin-pass").value!==DEMO_PASSCODE){toast("Incorrect demo passcode");return;}$("#admin-login").hidden=true;$("#admin-panel").hidden=false;renderAdminProducts();renderAdminOrders();}
  function resetCatalogue(){products=starterProducts.map(p=>({...p}));save(PRODUCTS_KEY,products);renderProducts();renderAdminProducts();toast("Sample catalogue reset");}

  document.addEventListener("click",e=>{
    const close=e.target.closest("[data-close]");if(close){closeOverlay(close.dataset.close);return;}
    const cat=e.target.closest("[data-category]");if(cat){activeCategory=cat.dataset.category;renderCategories();renderProducts();return;}
    const add=e.target.closest("[data-add]");if(add){e.stopPropagation();const p=getProduct(add.dataset.add);addCart(p,p.weight[0],p.flavours[0]);return;}
    const card=e.target.closest("[data-product]");if(card){openProduct(card.dataset.product);return;}
    const gallery=e.target.closest("[data-gallery]");if(gallery){galleryIndex=Number(gallery.dataset.gallery);renderDetail();return;}
    const weight=e.target.closest("[data-weight]");if(weight){selectedWeight=weight.dataset.weight;renderDetail();return;}
    const flavour=e.target.closest("[data-flavour]");if(flavour){selectedFlavour=flavour.dataset.flavour;renderDetail();return;}
    const dq=e.target.closest("[data-detail-qty]");if(dq){detailQty=Math.max(1,Math.min(20,detailQty+Number(dq.dataset.detailQty)));renderDetail();return;}
    const cqty=e.target.closest("[data-cart-qty]");if(cqty){changeCart(cqty.dataset.key,Number(cqty.dataset.cartQty));return;}
    const rem=e.target.closest("[data-remove]");if(rem){cart=cart.filter(x=>x.key!==rem.dataset.remove);save(CART_KEY,cart);renderCart();renderCartCount();return;}
    if(e.target.id==="open-cart"){renderCart();openOverlay("cart-overlay");}
    if(e.target.id==="continue-shopping"||e.target.id==="keep-shopping"){closeOverlay("cart-overlay");$("#shop").scrollIntoView({behavior:"smooth"});}
    if(e.target.id==="go-checkout"){openCheckout();}
    if(e.target.id==="detail-add"){addCart(selectedProduct,selectedWeight,selectedFlavour,detailQty);closeOverlay("product-overlay");}
    if(e.target.id==="detail-buy"){addCart(selectedProduct,selectedWeight,selectedFlavour,detailQty);closeOverlay("product-overlay");renderCart();openCheckout();}
    if(e.target.id==="open-admin"){openAdmin();}
    if(e.target.id==="admin-login-btn"){showAdmin();}
    if(e.target.id==="reset-products"){resetCatalogue();}
    if(e.target.id==="copy-order"){ /* handled by delegated checkout result listener */ }
    const tab=e.target.closest("[data-admin-tab]");if(tab){$$("[data-admin-tab]").forEach(b=>b.classList.toggle("active",b===tab));$("#admin-products").hidden=tab.dataset.adminTab!=="products";$("#admin-orders").hidden=tab.dataset.adminTab!=="orders";if(tab.dataset.adminTab==="orders")renderAdminOrders();}
  });
  $("#product-grid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-product]")){e.preventDefault();openProduct(e.target.dataset.product);}});
  $("#product-detail").addEventListener("click",e=>{if(e.target.id==="detail-add"||e.target.id==="detail-buy")return;});
  $("#product-detail").addEventListener("submit",e=>{
    if(e.target.id!=="review-form")return;e.preventDefault();const d=new FormData(e.target);const arr=userReviews(selectedProduct.id);arr.push({rating:Number(d.get("rating")),name:String(d.get("name")).trim(),text:String(d.get("text")).trim()});reviews[selectedProduct.id]=arr;save(REVIEWS_KEY,reviews);renderDetail();renderProducts();toast("Demo review saved in this browser");
  });
  $("#search").addEventListener("input",renderProducts);$("#sort").addEventListener("change",renderProducts);
  $("#search-toggle").addEventListener("click",()=>{$("#search").focus();$("#shop").scrollIntoView({behavior:"smooth"});});
  $("#open-cart").addEventListener("click",()=>{renderCart();openOverlay("cart-overlay");});
  $("#open-admin").addEventListener("click",openAdmin);
  $("#checkout-form").addEventListener("submit",submitCheckout);
  $("#admin-pass").addEventListener("keydown",e=>{if(e.key==="Enter")showAdmin();});
  $("#admin-product-list").addEventListener("change",e=>{
    const input=e.target.closest("[data-admin-price]");if(!input)return;const p=getProduct(input.dataset.adminPrice);const val=Number(input.value);if(!p||!Number.isFinite(val)||val<1||val>100000){toast("Enter a valid price");return;}p.price=Math.round(val);save(PRODUCTS_KEY,products);renderProducts();toast("Demo price saved in this browser");
  });
  $$(".overlay").forEach(ov=>ov.addEventListener("click",e=>{if(e.target===ov)closeOverlay(ov.id);}));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".overlay").filter(x=>!x.hidden).forEach(x=>closeOverlay(x.id));});
  $("#year").textContent=new Date().getFullYear();
  renderCategories();renderProducts();renderCartCount();
})();