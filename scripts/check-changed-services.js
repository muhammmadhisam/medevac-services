const { execSync } = require("node:child_process");

// ตรวจสอบว่าไฟล์ที่เปลี่ยนแปลงอยู่ในบริการไหนบ้าง
function checkChangedServices() {
  try {
    const changedFiles = execSync("git diff --name-only HEAD~1")
      .toString()
      .split("\n");

    // คุณสามารถใส่ logic ของการตรวจสอบว่าไฟล์ไหนเกี่ยวข้องกับ service อะไร
    const changedServices = changedFiles.filter(file =>
      file.includes("services/"),
    );

    if (changedServices.length > 0) {
      console.log("มีการเปลี่ยนแปลงใน services ต่อไปนี้:");
      changedServices.forEach(service => console.log(service));
      // หากมีการเปลี่ยนแปลงใน service ให้อัพเดตเวอร์ชั่นที่จำเป็น
      execSync("npm version patch"); // หรือใช้คำสั่งที่เหมาะสมกับเครื่องมือของคุณ
    }
    else {
      console.log("ไม่มีการเปลี่ยนแปลงใน services");
    }
  }
  catch (error) {
    console.error("Error checking changed services:", error);
    process.exit(1); // หยุดการ commit หากเกิดข้อผิดพลาด
  }
}

checkChangedServices();
