const suppliers=[
{id:1,name:"AquaFresh Water",area:"Near Main Gate · Campus zone",price:250,available:true,detail:"Fast lodge delivery"},
{id:2,name:"BlueSpring Supplies",area:"Hostel Road · Campus zone",price:220,available:true,detail:"Bulk orders welcome"},
{id:3,name:"ClearDrop Water",area:"New Layout · Campus zone",price:280,available:true,detail:"Daily supply"}
];
let selected=null,quantity=1;
const money=n=>"₦"+Number(n).toLocaleString("en-NG");
const grid=document.getElementById("supplierGrid");
function render(){
 let list=[...suppliers],q=document.getElementById("searchInput").value.toLowerCase();
 if(q)list=list.filter(s=>(s.name+" "+s.area).toLowerCase().includes(q));
 if(document.getElementById("sortSelect").value==="price")list.sort((a,b)=>a.price-b.price);
 grid.innerHTML=list.map(s=>`<article class="supplier-card"><div class="supplier-top"><div class="supplier-symbol">≈</div><span class="available">● Available</span></div><h3>${s.name}</h3><div class="supplier-area">${s.area}</div><div class="supplier-area">${s.detail}</div><div class="supplier-bottom"><div class="price">${money(s.price)} <small>/ 20L jerrycan</small></div><button class="order-btn" data-id="${s.id}">Order water →</button></div></article>`).join("")||'<p class="muted">No suppliers match your search.</p>';
 grid.querySelectorAll("button[data-id]").forEach(b=>b.addEventListener("click",()=>openOrder(Number(b.dataset.id))));
}
function openOrder(id){selected=suppliers.find(s=>s.id===id);quantity=1;document.getElementById("supplierLine").textContent=selected.name+" · "+money(selected.price)+" per 20L jerrycan";document.getElementById("qty").textContent=quantity;updateTotal();document.getElementById("modal").classList.remove("hidden");document.getElementById("customerName").focus()}
function updateTotal(){document.getElementById("total").textContent=money(selected.price*quantity)}
document.getElementById("searchInput").addEventListener("input",render);
document.getElementById("sortSelect").addEventListener("change",render);
document.getElementById("plus").onclick=()=>{quantity=Math.min(50,quantity+1);document.getElementById("qty").textContent=quantity;updateTotal()};
document.getElementById("minus").onclick=()=>{quantity=Math.max(1,quantity-1);document.getElementById("qty").textContent=quantity;updateTotal()};
function close(){document.getElementById("modal").classList.add("hidden")}
document.getElementById("closeModal").onclick=close;
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")close()});
document.getElementById("orderForm").addEventListener("submit",e=>{
 e.preventDefault();
 const order={id:"XO"+Date.now().toString().slice(-7),supplier:selected.name,quantity,total:selected.price*quantity,name:document.getElementById("customerName").value,phone:document.getElementById("phone").value,lodge:document.getElementById("lodge").value,room:document.getElementById("room").value,payment:document.getElementById("payment").value,status:"Demo order saved",createdAt:new Date().toISOString()};
 const orders=JSON.parse(localStorage.getItem("xorder_demo_orders")||"[]");orders.unshift(order);localStorage.setItem("xorder_demo_orders",JSON.stringify(orders));close();e.target.reset();showToast("Demo order "+order.id+" saved on this device. No supplier was notified.");
});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),5500)}
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuBtn").onclick=()=>document.getElementById("suppliers").scrollIntoView({behavior:"smooth"});
let deferredPrompt;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.getElementById("installBtn").classList.remove("hidden")});
document.getElementById("installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}else showToast("On iPhone: use Share → Add to Home Screen in Safari.")};
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
render();