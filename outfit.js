// ข้อมูลชุดที่ผู้ใช้เลือก
    let selectedOutfit = {

      top: "🤍 White Tee",

      color: "White",

      bottom: "👖 Blue Jeans",

      shoes: "White Sneakers",

      shoeColor: "#FFFFFF",

      accessory: "None",

      style: "🌸 Soft Girl Mood"

    };
    // เปลี่ยนเสื้อ
    function changeTop(color, name, colorName) {

      selectedOutfit.top = name;

      selectedOutfit.color = colorName;

      document.getElementById("styleName").innerHTML = name;

      document.getElementById("aiStatus").innerHTML =
        "Selected: " + name + " ✨";

      console.log("Top:", selectedOutfit.top);

    }
    // เปลี่ยนกางเกง / กระโปรง
    function changeBottom(color, name) {

      selectedOutfit.bottom = name;

      document.getElementById("styleName").innerHTML = name;

      document.getElementById("aiStatus").innerHTML =
        "Selected: " + name + " ✨";

      console.log("Bottom:", selectedOutfit.bottom);

    }
    // เปลี่ยนรองเท้า
    function changeShoes(name, color) {

      selectedOutfit.shoes = name;

      selectedOutfit.shoeColor = color;

      document.getElementById("aiStatus").innerHTML =
        "Selected: " + name + " ✨";

      console.log("Shoes:", selectedOutfit.shoes);

    }
    // Tote Bag
    let bagOpen = false;


    function toggleBag() {

      bagOpen = !bagOpen;

      if (bagOpen) {

        selectedOutfit.accessory = "👜 Tote Bag";

        document.getElementById("aiStatus").innerHTML =
          "Tote Bag added 👜";

      } else {

        selectedOutfit.accessory = "None";

        document.getElementById("aiStatus").innerHTML =
          "Tote Bag removed";

      }

      console.log("Accessory:", selectedOutfit.accessory);

    }
    // เปลี่ยน Mood / Style
    function setMood(mood) {

      selectedOutfit.style = mood;

      document.getElementById("styleName").innerHTML = mood;

      const avatar = document.getElementById("avatarBox");


      if (mood.includes("Coquette")) {

        avatar.style.background = "#FFF1F7";

      }


      else if (mood.includes("Street")) {

        avatar.style.background = "#ECECEC";

      }


      else if (mood.includes("Academia")) {

        avatar.style.background = "#FFF3DD";

      }


      document.getElementById("aiStatus").innerHTML =
        "Style selected: " + mood + " ✨";


      console.log("Style:", selectedOutfit.style);

    }
    // Random Outfit
    function randomOutfit() {


      const tops = [

        {
          name: "🌸 Pink Baby Tee",
          color: "Pink"
        },

        {
          name: "🤍 White Tee",
          color: "White"
        },

        {
          name: "☁️ Blue Tee",
          color: "Blue"
        },

        {
          name: "🌼 Yellow Tee",
          color: "Yellow"
        },

        {
          name: "🍀 Green Hoodie",
          color: "Green"
        },

        {
          name: "🖤 Black Tee",
          color: "Black"
        }

      ];


      const bottoms = [

        "👖 Blue Jeans",

        "🎀 Pink Skirt",

        "💜 Purple Skirt",

        "🧸 Cargo Pants",

        "🖤 Black Skirt",

        "🌼 Yellow Skirt"

      ];


      const shoes = [

        "White Sneakers",

        "Black Sneakers",

        "Pink Sneakers",

        "Purple Sneakers"

      ];


      const randomTop =
        tops[Math.floor(Math.random() * tops.length)];


      const randomBottom =
        bottoms[Math.floor(Math.random() * bottoms.length)];


      const randomShoes =
        shoes[Math.floor(Math.random() * shoes.length)];


      selectedOutfit.top =
        randomTop.name;


      selectedOutfit.color =
        randomTop.color;


      selectedOutfit.bottom =
        randomBottom;


      selectedOutfit.shoes =
        randomShoes;


      selectedOutfit.accessory =
        "None";


      selectedOutfit.style =
        "✨ Random Outfit";


      document.getElementById("styleName").innerHTML =
        "✨ Random Outfit";


      document.getElementById("aiStatus").innerHTML =
        "Random outfit selected! Click Generate AI ✨";


      console.log(
        "Random Outfit:",
        selectedOutfit
      );

    }
    // Generate AI
    // ตอนนี้เป็น TEST ก่อนต่อ AI จริง
async function generateOutfit() {

  console.log(
    "กำลังส่งข้อมูลไป AI:",
    selectedOutfit
  );
  // แสดงสถานะ
  document.getElementById("aiStatus").innerHTML =
    "⏳ AI กำลังเปลี่ยนชุดให้...";


  try {
    // ส่งข้อมูลไป Server
    const response = await fetch(
      "http://127.0.0.1:5000/generate-outfit",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(
          selectedOutfit
        )

      }
    );
    // รับคำตอบจาก Server
    const result =
      await response.json();


    console.log(
      "AI ตอบกลับ:",
      result
    );
    // ถ้าสร้างรูปสำเร็จ
    if (result.success) {


      // เอารูป AI มาใส่ Avatar
      document.getElementById(
        "avatarImage"
      ).src = result.image;


      // เปลี่ยนข้อความ
      document.getElementById(
        "aiStatus"
      ).innerHTML =
        "✨ AI เปลี่ยนชุดให้แล้ว!";


      console.log(
        "🎉 ได้รูปจาก AI แล้ว!"
      );


    }
    // ถ้า AI Error
    else {

      document.getElementById(
        "aiStatus"
      ).innerHTML =
        "❌ AI สร้างภาพไม่สำเร็จ";


      alert(
        "AI สร้างภาพไม่สำเร็จ 😭\n\n" +
        result.error
      );

    }


  }
  // ถ้าเชื่อม Server ไม่ได้
  catch (error) {


    console.error(
      "เกิดข้อผิดพลาด:",
      error
    );


    document.getElementById(
      "aiStatus"
    ).innerHTML =
      "❌ เชื่อมต่อ AI Server ไม่ได้";


    alert(
      "เชื่อมต่อ AI Server ไม่ได้ 😭\n\n" +
      "ตรวจสอบว่า server.py กำลังเปิดอยู่"
    );

  }

}
