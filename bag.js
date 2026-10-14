let packedItems=[];

// เลือกของ
function toggleItem(button,name){

    button.classList.toggle("selected");
    const emoji = button.textContent.trim();

    if(packedItems.includes(name)){
        packedItems=packedItems.filter(item=>item!==name);
        removeItemFromBag(name);
    }else{
        packedItems.push(name);
        flyItemToBag(button, emoji, name);
    }

    updateCounter();
}

function flyItemToBag(button, emoji, name){
    const rect = button.getBoundingClientRect();
    const bag = document.getElementById("realBag");
    const bagRect = bag.getBoundingClientRect();

    const flying = document.createElement("div");
    flying.className = "fly-item";
    flying.textContent = emoji;
    flying.style.left = rect.left + rect.width/2 - 22 + "px";
    flying.style.top = rect.top + rect.height/2 - 22 + "px";
    document.body.appendChild(flying);

    requestAnimationFrame(()=>{
        flying.style.left = bagRect.left + bagRect.width/2 - 22 + "px";
        flying.style.top = bagRect.top + 95 + "px";
        flying.style.transform = "scale(.65) rotate(18deg)";
    });

    setTimeout(()=>{
        flying.remove();
        addItemToBag(emoji,name);
        bag.classList.remove("bag-bounce");
        void bag.offsetWidth;
        bag.classList.add("bag-bounce");
    },560);
}

function addItemToBag(emoji,name){
    const layer=document.getElementById("bagItemsLayer");
    const item=document.createElement("span");
    item.className="packed-emoji";
    item.dataset.name=name;
    item.textContent=emoji;
    item.title=name;
    layer.appendChild(item);
}

function removeItemFromBag(name){
    const item=[...document.querySelectorAll("#bagItemsLayer .packed-emoji")]
      .find(el=>el.dataset.name===name);
    if(!item) return;
    item.style.animation="itemOut .3s ease forwards";
    setTimeout(()=>item.remove(),300);
}

// อัปเดตจำนวน
function updateCounter(){
    document.getElementById("bagCount").innerText=
    packedItems.length+" items packed today 🎒";
}

// เพิ่ม Checklist
function addItem(){

    const input=document.getElementById("newItem");

    if(input.value.trim()=="") return;

    const li=document.createElement("li");

    li.className="check-item";

    li.innerHTML=`
        <label class="flex items-center gap-3 flex-1">
            <input type="checkbox" class="w-5 h-5 accent-pink-400">
            ${input.value}
        </label>

        <button onclick="this.parentElement.remove()" class="text-xl">🗑️</button>
    `;

    document.getElementById("todoList").appendChild(li);

    // custom checklist item gets a quick pop effect in the bag too
    const fakeButton={ getBoundingClientRect:()=>input.getBoundingClientRect() };
    flyItemToBag(fakeButton,"✨",input.value);

    input.value="";
}

/* Navigation */

function goHome(){
    window.location.href="index.html";
}

function goOutfit(){
    window.location.href="outfit.html";
}

function goBag(){
    window.location.href="bag.html";
}

function goMood(){
    window.location.href="mood.html";
}

function goWeather(){
    window.location.href="weather.html";
}
