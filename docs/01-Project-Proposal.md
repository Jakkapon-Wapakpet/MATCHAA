# MatchA — ข้อเสนอโครงการ (Project Proposal)

> **โครงการ:** MatchA — Personal Color Fashion & Accessories E-Commerce Platform
> **เวอร์ชันเอกสาร:** 1.0 · **วันที่:** 7 กันยายน 2569
> **เอกสารคู่กัน:** [`02-Technical-Spec.md`](./02-Technical-Spec.md) — ข้อกำหนดทางเทคนิค

---

## สารบัญ

1. [บทสรุปผู้บริหาร](#1-บทสรุปผู้บริหาร-executive-summary)
2. [ที่มาและปัญหาที่แก้](#2-ที่มาและปัญหาที่แก้-problem-statement)
3. [เป้าหมายและขอบเขตโครงการ](#3-เป้าหมายและขอบเขตโครงการ-goals--scope)
4. [กลุ่มเป้าหมาย](#4-กลุ่มเป้าหมาย-target-audience)
5. [คุณค่าที่ส่งมอบและจุดต่าง](#5-คุณค่าที่ส่งมอบและจุดต่าง-value-proposition)
6. [ฟีเจอร์หลัก](#6-ฟีเจอร์หลัก-core-features)
7. [รูปแบบธุรกิจและรายได้](#7-รูปแบบธุรกิจและรายได้-business-model)
8. [แผนงานและไทม์ไลน์](#8-แผนงานและไทม์ไลน์-roadmap--timeline)
9. [ทีมงานที่แนะนำ](#9-ทีมงานที่แนะนำ-recommended-team)
10. [งบประมาณโดยประมาณ](#10-งบประมาณโดยประมาณ-budget-estimate)
11. [ตัวชี้วัดความสำเร็จ](#11-ตัวชี้วัดความสำเร็จ-success-metrics)
12. [เอกสารอ้างอิง](#12-เอกสารอ้างอิง-reference-documents)

---

## 1. บทสรุปผู้บริหาร (Executive Summary)

**MatchA** คือแพลตฟอร์มอีคอมเมิร์ซแฟชั่นที่นำ **ทฤษฎี Personal Color** มาเป็นแกนกลางของประสบการณ์การช้อปปิ้ง แทนที่จะให้ลูกค้าเลือกเสื้อผ้าจาก "หมวดหมู่" หรือ "ราคา" เหมือนร้านทั่วไป MatchA ให้ลูกค้าเลือกจาก **"โทนสีที่ขับผิวตัวเอง"** — Spring Warm, Summer Cool, Autumn Warm, Winter Cool

สิ่งที่ทำให้ MatchA ต่างจากอีคอมเมิร์ซแฟชั่นทั่วไปคือ **Color Harmony Engine** ซึ่งเป็นเอนจินคำนวณความเข้ากันของชุดที่พัฒนาขึ้นเอง อ้างอิงหลักวิชาการจริง 4 ชั้น — CIELAB Delta E, ทฤษฎี 7 Contrasts ของ Johannes Itten (Bauhaus), กฎสัดส่วน 60-30-10 และ Munsell Color Space — ให้คะแนน Synergy Score พร้อมคำอธิบายว่า *ทำไม* ชุดนี้ถึงเข้ากัน ไม่ใช่แค่แนะนำแบบสุ่ม

### สถานะปัจจุบัน

ระบบพัฒนาแล้วเสร็จเป็น **Full-Stack Working Prototype** ที่ใช้งานได้จริงครบทั้ง flow:

| ตัวชี้วัด | จำนวน |
| :--- | :--- |
| Epics / User Stories / Story Points | 7 / 31 / **125 pts** (ปิดครบ 100%) |
| หน้าเว็บที่ใช้งานได้ | **12 หน้า** |
| React Components | **38 ชิ้น** (ใช้งานจริง 32) |
| REST API Route Handlers | **21 handler** (ครอบคลุม 29 path) |
| Database Collections | **4 คอลเลกชัน** (Product, User, Cart, Order) |
| สินค้าในแคตตาล็อก | **60 รายการ / 211 ตัวเลือกสี** |
| ไฟล์ภาพสินค้าและ Lookbook | **611 ไฟล์** |
| ชุดทดสอบ E2E | **1 suite** ครอบคลุม CRUD ทุก Entity |

### สิ่งที่ขอในเฟสถัดไป

ต่อยอดจาก Prototype สู่ **Production Launch** ภายใน **12 สัปดาห์** ด้วยทีม **5 คน** โดยเน้น 3 เรื่อง: ระบบยืนยันตัวตนระดับ Production, การเชื่อมต่อ Payment Gateway จริง และการขึ้น Cloud พร้อม Monitoring

---

## 2. ที่มาและปัญหาที่แก้ (Problem Statement)

### ปัญหาของผู้ซื้อเสื้อผ้าออนไลน์

| ปัญหา | ผลกระทบ |
| :--- | :--- |
| **"สีดร็อป"** — สีที่เห็นในจอไม่ตรงกับของจริง และไม่รู้ว่าจะเข้ากับผิวตัวเองไหม | อัตราการคืนสินค้าสูง เสียต้นทุนขนส่งสองต่อ |
| **ไม่รู้ว่าตัวเองเป็นโทนไหน** — Personal Color เป็นกระแสแต่ต้องจ่ายค่าวิเคราะห์กับสไตลิสต์ 1,500–5,000 บาท | ผู้บริโภคสนใจแต่เข้าไม่ถึง |
| **จับคู่ชุดไม่เป็น** — ซื้อของสวยทีละชิ้น แต่ใส่รวมกันแล้วไม่เข้ากัน | สินค้าค้างตู้ ไม่เกิดการซื้อซ้ำ |
| **แคตตาล็อกเรียงตามหมวดหมู่** — เลื่อนดูเป็นร้อยชิ้นโดยไม่มีตัวกรองที่ตรงความต้องการจริง | เสียเวลา ละทิ้งตะกร้ากลางทาง |

### ทางออกของ MatchA

1. **จัดหมวดสินค้าตามฤดูสีผิว** ตั้งแต่ระดับฐานข้อมูล — ทุกชิ้นมี `season` และ `colorHex` กำกับ
2. **แบบทดสอบหา Personal Color ฟรี** บนเว็บ พร้อมพาเลตต์สีที่ควรใส่ / ควรเลี่ยง และคำแนะนำเนื้อผ้า
3. **Mix & Match Studio** — ลองจับคู่ ท่อนบน / ท่อนล่าง / รองเท้า / เครื่องประดับ แล้วได้คะแนนความเข้ากันทันที
4. **Multi-Facet Filtering** — กรองพร้อมกันได้ทั้ง หมวดหมู่ × ฤดู × สี × ทรง × ช่วงราคา × สถานะสต็อก

---

## 3. เป้าหมายและขอบเขตโครงการ (Goals & Scope)

### 3.1 วัตถุประสงค์

| # | วัตถุประสงค์ | ตัวชี้วัด |
| :--- | :--- | :--- |
| O-1 | สร้างแพลตฟอร์มอีคอมเมิร์ซที่ค้นหาสินค้าด้วย Personal Color ได้ | ผู้ใช้กรองสินค้าตามฤดูสีได้ครบ 4 ฤดู + Artisan |
| O-2 | ลดความไม่มั่นใจในการเลือกสีเสื้อผ้า | ผู้ใช้ทำแบบทดสอบและได้พาเลตต์ส่วนตัวภายใน 2 นาที |
| O-3 | เพิ่มมูลค่าตะกร้าเฉลี่ยด้วยการขายเป็น "ชุด" | Mix & Match Studio เพิ่มสินค้าลงตะกร้าได้ทั้งเซ็ต |
| O-4 | ให้ร้านค้าบริหารสต็อกและออเดอร์ได้เอง | Admin Command Center ครบ CRUD + Analytics + Export |
| O-5 | รองรับการขยายสู่ Production บน Cloud | Frontend/Backend แยก deploy ได้อิสระ |

### 3.2 ขอบเขตที่อยู่ในโครงการ (In Scope)

**Customer Facing**
- หน้าแรก Lookbook แบบอินเทอร์แอกทีฟ 4 ฤดู
- แคตตาล็อกสินค้าพร้อมตัวกรอง 6 มิติ + เรียงลำดับ 4 แบบ + Pagination
- Quick View Modal เลือกไซส์ / สลับสี / เช็กสต็อก
- แบบทดสอบ Personal Color + พาเลตต์ส่วนตัว
- Mix & Match Studio พร้อม Color Harmony Engine
- Editorial Lookbook (คอนเทนต์ไกด์การแต่งตัว)
- ตะกร้าสินค้า (Drawer + หน้าเต็ม) พร้อมคำนวณส่งฟรีอัตโนมัติ
- Checkout หลายขั้นตอน (ที่อยู่จัดส่ง → วิธีชำระเงิน → ยืนยัน) พร้อมใบเสร็จและเวลาสั่งซื้อ
- สมัครสมาชิก / เข้าสู่ระบบ / จดจำการเข้าสู่ระบบ
- Member Lounge — โปรไฟล์, ที่อยู่, ประวัติออเดอร์, สินค้าที่บันทึกไว้, วิธีชำระเงิน, การตั้งค่า
- ระบบระดับสมาชิก (Regular / Silver / Gold / VIP Connoisseur)

**Admin Facing**
- Dashboard สรุปภาพรวมร้าน
- Inventory CRUD + เติมสต็อกด่วน (`+10` / `-5`)
- Orders Pipeline อัปเดตสถานะออเดอร์
- Revenue Analytics — กราฟยอดขายรายเดือน + สัดส่วนตามหมวดหมู่
- VIP Customer Registry จัดการระดับสมาชิก
- Export รายงาน CSV 4 ชุด + สำรองระบบ JSON

**System**
- REST API 21 route handler (29 path) เชื่อม MongoDB ผ่าน Mongoose
- Fallback System — ถ้าฐานข้อมูลไม่พร้อม ระบบยังแสดงแคตตาล็อกได้จาก static data
- Image Fallback, Loading Skeleton, Empty State, Toast Notification
- Responsive ครบ Mobile / Tablet / Desktop

### 3.3 ขอบเขตที่ไม่อยู่ในโครงการเฟสนี้ (Out of Scope)

| รายการ | เหตุผล / แผนรองรับ |
| :--- | :--- |
| การตัดเงินจริงกับธนาคาร | เฟสนี้จำลอง flow ครบ — เชื่อม Omise / 2C2P ในเฟส 2 |
| แอปมือถือ Native (iOS/Android) | เว็บทำ Responsive ครบแล้ว — พิจารณา PWA ก่อนในเฟส 3 |
| ระบบคลังสินค้าหลายสาขา (Multi-warehouse) | ปัจจุบันสต็อกรวมศูนย์เดียว เพียงพอต่อขนาดธุรกิจเริ่มต้น |
| การวิเคราะห์ Personal Color จากรูปถ่ายด้วย AI | อยู่ในแผนไตรมาส 2 — เฟสนี้ใช้แบบทดสอบเชิงคำถาม |
| ระบบ Marketplace ให้แบรนด์อื่นมาขาย | โฟกัสสินค้า MatchA คัดสรรก่อน |

---

## 4. กลุ่มเป้าหมาย (Target Audience)

### 4.1 กลุ่มลูกค้าหลัก

| กลุ่ม | สัดส่วนคาดการณ์ | ลักษณะ |
| :--- | :---: | :--- |
| **Personal Color Enthusiasts** | 40% | รู้จักทฤษฎีสีผิวแล้ว ต้องการร้านที่จัดหมวดให้ตรงโทนตัวเอง ยอมจ่ายแพงกว่าเพื่อความมั่นใจ |
| **Fashion & Streetwear Shoppers** | 35% | ชอบเสื้อผ้าคุมโทน มินิมอล เอิร์ธโทน สไตล์ญี่ปุ่น/เกาหลี ให้ความสำคัญกับทรง (Fit) |
| **Online Shoppers ทั่วไป (Gen Z & Millennial)** | 25% | ซื้อออนไลน์เป็นหลัก กลัวสีดร็อป ต้องการตัวช่วยตัดสินใจก่อนกดสั่ง |

### 4.2 Personas

**👤 "มิ้นท์" — นักศึกษาปี 4, อายุ 22**
- เพิ่งดูคลิป Personal Color ใน TikTok อยากรู้ว่าตัวเองเป็นโทนไหนแต่ไม่อยากจ่าย 2,000 บาท
- งบซื้อเสื้อผ้า 1,500–3,000 บาท/เดือน
- **ต้องการจาก MatchA:** แบบทดสอบฟรี + สินค้าที่กรองมาให้แล้วตามโทน

**👤 "พี" — พนักงานออฟฟิศ, อายุ 29**
- รู้แล้วว่าตัวเองเป็น Autumn Warm ซื้อของตามโทนนี้มา 2 ปี
- ซื้อทีละหลายชิ้น ให้ความสำคัญกับคุณภาพผ้าและทรง
- **ต้องการจาก MatchA:** ชุดที่ match กันทั้งเซ็ต + สิทธิ์ VIP Early Access

**👤 "เก่ง" — ผู้ดูแลร้าน (Admin)**
- ต้องอัปเดตสต็อกและสถานะออเดอร์ทุกวัน
- ทำรายงานยอดขายส่งเจ้าของร้านทุกสิ้นเดือน
- **ต้องการจาก MatchA:** หน้าจัดการที่แก้สต็อกได้ในคลิกเดียว + Export CSV

### 4.3 กลุ่มผู้ใช้ระบบ (System Actors)

| บทบาท | สิทธิ์การเข้าถึง |
| :--- | :--- |
| **Guest** | ดูสินค้า, ลองแมตช์ชุด, ทำแบบทดสอบสี, จัดการตะกร้า, สมัครสมาชิก |
| **Regular Member** | ทุกอย่างของ Guest + สั่งซื้อ, ประวัติออเดอร์, บันทึกสินค้าโปรด, จัดการโปรไฟล์ |
| **VIP Connoisseur** | ทุกอย่างของ Member + Early Access 24–48 ชม., Limited Vault, ส่วนลด 15–20% อัตโนมัติ, ส่งฟรี Express |
| **Store Administrator** | จัดการสินค้า / สต็อก / ออเดอร์ / สมาชิก / รายงาน |

### 4.4 เงื่อนไขการเลื่อนระดับสมาชิก

| ระดับ | เงื่อนไข | สิทธิประโยชน์เด่น |
| :--- | :--- | :--- |
| Regular Member | สมัครฟรี | ส่งฟรีเมื่อซื้อครบ $100 |
| Silver Member | ยอดสะสมตามเกณฑ์ร้าน | ส่วนลดตามแคมเปญ + แจ้งเตือนคอลเลกชันใหม่ |
| Gold Member | ยอดสะสมตามเกณฑ์ร้าน | ส่วนลดสูงขึ้น + สิทธิ์จองล่วงหน้าบางรอบ |
| **VIP Connoisseur** | ยอดซื้อสะสม $250+ **หรือ** ครบ 3 ออเดอร์ | Early Access 24–48 ชม. · Limited Vault · ลด 15–20% ทุกออเดอร์ · ส่งฟรี Express ไม่มีขั้นต่ำ · SMS Drop Alert |

---

## 5. คุณค่าที่ส่งมอบและจุดต่าง (Value Proposition)

### 5.1 คุณค่า 3 ข้อหลัก

**① Shop by Personal Color**
สินค้าทุกชิ้นถูกแมปกับฤดูสีตั้งแต่ระดับฐานข้อมูล ไม่ใช่แค่แท็กการตลาด — ลูกค้ากรองเห็นเฉพาะสิ่งที่ "ขับผิวตัวเอง" ได้ทันที

**② Computational Styling ไม่ใช่การเดา**
Color Harmony Engine ให้คะแนนและ *อธิบายเหตุผล* — ผู้ใช้เห็นว่าค่า Delta E เท่าไร, ชุดนี้เป็น Harmony แบบไหน, ตรงกับ Itten Contrast ข้อใด แล้วเชื่อมั่นในคำแนะนำ

**③ Curated ไม่ใช่ Marketplace**
สินค้า 60 รายการ 211 ตัวเลือกสี ทุกชิ้นคุมโทน MatchA Aesthetic — ลูกค้าไม่ต้องเลื่อนผ่านของที่ไม่เข้าธีม

### 5.2 เปรียบเทียบกับทางเลือกอื่น

| ประเด็น | ร้านแฟชั่นออนไลน์ทั่วไป | Marketplace (Shopee/Lazada) | บริการ Personal Color Stylist | **MatchA** |
| :--- | :---: | :---: | :---: | :---: |
| กรองตามโทนสีผิว | ✗ | ✗ | — | **✓** |
| รู้โทนตัวเองได้ฟรี | ✗ | ✗ | ✗ (1,500–5,000฿) | **✓** |
| แนะนำการจับคู่ชุด | บางร้าน (แมนวล) | ✗ | ✓ (ต้องนัดคิว) | **✓ (อัตโนมัติ)** |
| อธิบายเหตุผลเชิงทฤษฎี | ✗ | ✗ | ✓ | **✓** |
| ซื้อได้ทันทีในที่เดียว | ✓ | ✓ | ✗ | **✓** |
| สินค้าคุมโทน | บางร้าน | ✗ | — | **✓** |

---

## 6. ฟีเจอร์หลัก (Core Features)

### 6.1 เสาหลัก 4 ด้าน

```
┌─────────────────────────────────────────────────────────────────────┐
│                          MatchA Platform                            │
├──────────────────┬──────────────────┬──────────────┬────────────────┤
│  DISCOVER        │  DECIDE          │  BUY         │  MANAGE        │
│  ค้นหา            │  ตัดสินใจ         │  ซื้อ         │  จัดการ         │
├──────────────────┼──────────────────┼──────────────┼────────────────┤
│ Hero Lookbook    │ Personal Color   │ Cart Engine  │ Member Lounge  │
│ 4 ฤดู             │ Quiz             │              │                │
│                  │                  │ Multi-Step   │ Admin Command  │
│ Multi-Facet      │ Mix & Match      │ Checkout     │ Center         │
│ Catalog Filter   │ Studio           │              │                │
│                  │                  │ Order        │ Revenue        │
│ Editorial        │ Quick View &     │ Receipt      │ Analytics      │
│ Lookbook         │ Color Swatches   │              │                │
└──────────────────┴──────────────────┴──────────────┴────────────────┘
```

### 6.2 รายละเอียดฟีเจอร์

#### 🔍 DISCOVER — การค้นพบสินค้า

| ฟีเจอร์ | รายละเอียด |
| :--- | :--- |
| **4-Slice Interactive Hero** | แบนเนอร์แนวตั้ง 4 ชิ้น (Spring / Summer / Autumn / Winter) ขยายตามตำแหน่งเมาส์แบบ Dynamic Scale พร้อม CTA เข้าสู่แคตตาล็อก |
| **Multi-Facet Catalog Filter** | กรองพร้อมกัน 6 มิติ — หมวดหมู่ × ฤดู × สี × ทรง × ช่วงราคา × สถานะสต็อก |
| **Sort & Pagination** | เรียงตาม Featured / ราคาต่ำ-สูง / ราคาสูง-ต่ำ / มาใหม่ · แบ่งหน้า 24 ชิ้น |
| **Search** | ค้นหาจากชื่อ, SKU, คำอธิบาย, สี และแท็ก พร้อมกัน |
| **Editorial Lookbook** | คอนเทนต์ไกด์การแต่งตัวและภาพ Lifestyle ประกอบคอลเลกชัน |
| **Fit Selector** | เลือกดูตามทรง 6 หมวด (Boxy Tee, Linen Trouser, Canvas Tote, Mineral Fleece, Cardigan, Bucket Hat) |

#### 🎨 DECIDE — การตัดสินใจ (จุดขายหลัก)

| ฟีเจอร์ | รายละเอียด |
| :--- | :--- |
| **Personal Color Quiz** | แบบทดสอบหาฤดูสีของตัวเอง → ได้โปรไฟล์พร้อม พาเลตต์ 6 สีที่ควรใส่, สีที่ควรเลี่ยง, ชนิดผ้าที่แนะนำ และลักษณะเฉพาะของโทน |
| **Mix & Match Studio** | เลือกท่อนบน + ท่อนล่าง + รองเท้า + เครื่องประดับ → ได้ **Synergy Score** พร้อมคำอธิบายเชิงทฤษฎี |
| **Outfit Presets** | ชุดสำเร็จรูปคัดสรรให้ลองก่อนได้ทันที |
| **Quick View Modal** | เปิดรายละเอียดโดยไม่ออกจากหน้า — เลือกไซส์ S/M/L/XL, สลับสี (Color Swatch), เช็กสต็อก |
| **Live Color Swatches** | สลับสีแล้วรูปสินค้าเปลี่ยนทันที (211 ตัวเลือกสีทั้งระบบ) |

**เกณฑ์การให้คะแนน Synergy Score** (คะแนนเต็ม 100)

| องค์ประกอบ | น้ำหนัก | ฐานทฤษฎี |
| :--- | :---: | :--- |
| Seasonal Synergy & Undertone | **35%** | จับคู่ฤดูสี / อันเดอร์โทน Warm-Cool |
| Color Harmony & Delta E | **30%** | CIELAB Delta E + Monochromatic / Analogous / Complementary |
| Contrast of Value & Extension | **20%** | Johannes Itten 7 Contrasts (Bauhaus) |
| Silhouette & Form Balance | **15%** | กฎสัดส่วน Rule of Thirds / Golden Ratio ของทรงเสื้อผ้า |

#### 🛒 BUY — การซื้อ

| ฟีเจอร์ | รายละเอียด |
| :--- | :--- |
| **Cart Drawer + Cart Page** | เพิ่ม/ลด/ลบสินค้า พร้อมคำนวณยอดและสิทธิ์ส่งฟรีอัตโนมัติเมื่อครบ $100 |
| **Cart Persistence** | ตะกร้าคงอยู่แม้รีเฟรชหรือปิดเบราว์เซอร์ |
| **Multi-Step Checkout** | ขั้นที่ 1 ข้อมูลจัดส่ง → ขั้นที่ 2 วิธีชำระเงิน → ขั้นที่ 3 ยืนยันและสรุปยอด |
| **Payment Options** | Visa / Mastercard / PromptPay QR / COD |
| **Shipping Options** | Standard / Express / Same-Day |
| **Order Receipt** | ใบเสร็จพร้อมเลขออเดอร์ (`ORD-xxxxx`) และ **วันเวลาสั่งซื้อ** |

#### ⚙️ MANAGE — การจัดการ

**Member Lounge (7 แท็บ)**

| แท็บ | ความสามารถ |
| :--- | :--- |
| Profile | แก้ไขชื่อ, อีเมล, เบอร์โทร |
| Orders | ประวัติออเดอร์ + ติดตามสถานะ (Pending → Processing → Shipped → Delivered) |
| Favorites | Saved Archive สินค้าที่บันทึกไว้ |
| Addresses | สมุดที่อยู่จัดส่ง |
| Payment Methods | จัดการวิธีชำระเงินที่บันทึกไว้ |
| Preferences | ตั้งค่าการรับข่าวสาร |
| Admin Dashboard | (เฉพาะ Admin) ทางลัดเข้าหน้าจัดการร้าน |

**Admin Command Center (6 แท็บ)**

| แท็บ | ความสามารถ |
| :--- | :--- |
| Dashboard | สรุปภาพรวมร้านแบบเรียลไทม์ |
| Inventory & Stock | เพิ่ม / แก้ไข / ลบสินค้า · เติมสต็อกด่วน `+10` · ตัดสต็อก `-5` · ฟอร์มพร้อม Live Image Preview และ Validation ครบ 6 ฟิลด์ |
| Orders Pipeline | อัปเดตสถานะออเดอร์ พร้อม Badge นับออเดอร์ที่รอดำเนินการ |
| Revenue Analytics | กราฟแท่งยอดขายรายเดือน + สัดส่วนยอดขายตามหมวดหมู่ |
| VIP Customer Registry | ดูรายชื่อสมาชิก, ยอดใช้จ่ายสะสม, เลื่อน/ลดระดับสมาชิก |
| Backup & Export | Export CSV 4 ชุด (Inventory / Orders / Revenue / VIP Registry) + Full JSON Backup |

### 6.3 คุณภาพประสบการณ์ผู้ใช้ (UX Quality Standard)

ทุกหน้าที่ดึงข้อมูลรองรับ **4 สถานะครบถ้วน**:

| สถานะ | การแสดงผล |
| :--- | :--- |
| **Loading** | Skeleton Loader ที่มีสัดส่วนตรงกับเลย์เอาต์จริง (ไม่ใช่ spinner เปล่า) |
| **Empty** | กรอบเส้นประ + ไอคอน + คำอธิบายเป็นมิตร + ปุ่ม CTA |
| **Error** | การ์ดแจ้งเตือนคอนทราสต์สูง + ข้อความชัดเจน + ปุ่ม Retry |
| **Data** | แสดงผลเต็มรูปแบบ ปรับตัวได้ทั้งตารางบนเดสก์ท็อปและการ์ดบนมือถือ |

เสริมด้วย **Image Fallback** (ภาพเสียแล้วมีภาพสำรอง), **Toast Notification**, **Smooth Scroll (Lenis)** และ **Scroll Progress Tracker**

---

## 7. รูปแบบธุรกิจและรายได้ (Business Model)

### 7.1 Business Model Canvas — สรุป

| ช่อง | สาระสำคัญ |
| :--- | :--- |
| **Key Partners** | แบรนด์แฟชั่น & ซัพพลายเออร์ · Personal Color Stylists · Fashion Influencers (TikTok / IG / Lemon8) · ผู้ให้บริการขนส่งและ Payment Gateway |
| **Key Activities** | คัดสรรและแมปสินค้ากับพาเลตต์สี · พัฒนาและดูแลแพลตฟอร์ม · ผลิตคอนเทนต์ไกด์การแต่งตัว · บริหารสต็อกและออเดอร์ |
| **Key Resources** | คลังสินค้าที่แมป Color Palette แล้ว · แพลตฟอร์มเว็บ · ฐานข้อมูลสินค้าและภาพ Lookbook ความละเอียดสูง (611 ไฟล์) · Color Harmony Engine |
| **Value Propositions** | Shop by Personal Color · Curated Apparel & Bags · Interactive Color Lookbook |
| **Customer Relationships** | MatchA VIP Member Lounge · Personalized Drop Alert · Fit & Color Guide บนหน้าเว็บ |
| **Channels** | เว็บไซต์ MatchA Online Store · Instagram / TikTok / Lemon8 / Pinterest · Email & SMS |
| **Customer Segments** | Personal Color Enthusiasts · Fashion & Streetwear Shoppers · Online Shoppers (Gen Z & Millennial) |
| **Cost Structure** | ต้นทุนจัดซื้อสินค้าและแพ็กเกจจิ้ง · Cloud Server / Hosting / Domain · การตลาดและ Influencer · ค่าธรรมเนียม Payment Gateway |
| **Revenue Streams** | ขายเสื้อผ้า กระเป๋า แอกเซสซอรีส์ · ค่าจัดส่งด่วนพิเศษ · Limited Drop & VIP Exclusive Colorways |

### 7.2 กระแสรายได้

| แหล่งรายได้ | สัดส่วนคาดการณ์ | หมายเหตุ |
| :--- | :---: | :--- |
| ขายสินค้าแฟชั่นหลัก | **80%** | Tops / Bottoms / Outerwear / Accessories |
| Limited Drop & VIP Exclusive Colorways | **12%** | มาร์จิ้นสูงกว่าปกติ สร้างความรู้สึกพิเศษให้สมาชิก |
| ค่าจัดส่งด่วน (Express / Same-Day) | **5%** | |
| อื่น ๆ (Gift Card, Collaboration) | **3%** | เฟส 3 ขึ้นไป |

---

## 8. แผนงานและไทม์ไลน์ (Roadmap & Timeline)

### 8.1 สิ่งที่ทำเสร็จแล้ว (Completed)

| Sprint | เป้าหมาย | ผลลัพธ์ |
| :--- | :--- | :---: |
| **Sprint 1** | ตั้งโครงโปรเจกต์ + Landing Page + Health Check API | ✅ ปิดครบ |
| **Sprint 2** | Full E-Commerce Flow — แคตตาล็อก, ตะกร้า, Checkout, Admin | ✅ ปิดครบ |
| **Sprint 3** | เชื่อมต่อ MongoDB/Mongoose เต็มรูปแบบ, CRUD ครบทุก Entity, Form Validation, React Component Architecture | ✅ ปิดครบ |

**สรุปผลรวม:** 7 Epics · 31 User Stories · **125 Story Points** · ปิด 100%

| Epic | ชื่อ | Stories | Points |
| :--- | :--- | :---: | :---: |
| EPIC-01 | Product Discovery & Lookbook Experience | 5 | 18 |
| EPIC-02 | Catalog & Personal Color Filtering | 4 | 21 |
| EPIC-03 | Interactive Customizer & Cart Engine | 4 | 16 |
| EPIC-04 | Multi-Step Checkout & Order Receipt | 5 | 20 |
| EPIC-05 | Authentication & Member Lounge | 4 | 15 |
| EPIC-06 | Admin Dashboard & Inventory Control | 4 | 18 |
| EPIC-07 | Architecture, Resilience & Quality | 5 | 17 |

### 8.2 แผนเฟสถัดไป — สู่ Production (12 สัปดาห์)

```
สัปดาห์   1    2    3    4    5    6    7    8    9   10   11   12
        ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
Phase 1 ████████████                     Production Readiness
Phase 2           ████████████████       Payment & Fulfillment
Phase 3                     ████████████ Growth Features
Phase 4                               ██████████ Launch & Stabilize
```

#### Phase 1 — Production Readiness (สัปดาห์ 1–4)

| งาน | รายละเอียด | ผู้รับผิดชอบ |
| :--- | :--- | :--- |
| ระบบยืนยันตัวตนระดับ Production | Token-based Session, การเข้ารหัสรหัสผ่าน, Middleware ตรวจสิทธิ์ฝั่งเซิร์ฟเวอร์ | Backend |
| ตั้ง Version Control & CI | Git repository, branch strategy, automated build check | Tech Lead |
| Deploy ขึ้น Cloud | Frontend บน Vercel · Backend บน Render/Railway · MongoDB Atlas | DevOps |
| Environment Config | แยก config ตาม dev / staging / production ผ่าน environment variable | Backend |
| ทำความสะอาดโครงสร้างโค้ด | รวม component ที่ทำหน้าที่ซ้ำกัน, รวมแหล่งข้อมูลสินค้าให้เหลือแหล่งเดียว | Full-Stack |

**ส่งมอบ:** ระบบขึ้น Public URL ใช้งานได้จริง พร้อม Staging Environment

#### Phase 2 — Payment & Fulfillment (สัปดาห์ 3–8)

| งาน | รายละเอียด |
| :--- | :--- |
| เชื่อม Payment Gateway จริง | Omise หรือ 2C2P รองรับบัตรเครดิตและ PromptPay |
| Order Lifecycle เต็มรูปแบบ | Webhook ยืนยันการชำระเงิน, ตัดสต็อกอัตโนมัติ, สถานะออเดอร์ครบวงจร |
| ระบบอีเมลอัตโนมัติ | ยืนยันคำสั่งซื้อ, แจ้งจัดส่ง, รีเซ็ตรหัสผ่าน |
| เชื่อมระบบขนส่ง | สร้างเลขพัสดุและติดตามสถานะ (Flash / Kerry / ไปรษณีย์ไทย) |
| อัปโหลดรูปสินค้า | เชื่อม Cloud Storage แทนการวางไฟล์ในโปรเจกต์ |

**ส่งมอบ:** สั่งซื้อและรับเงินได้จริงตั้งแต่ต้นจนจบ

#### Phase 3 — Growth Features (สัปดาห์ 7–12)

| งาน | รายละเอียด |
| :--- | :--- |
| ระบบคูปองและโปรโมชัน | โค้ดส่วนลด, ส่งฟรี, ส่วนลด VIP อัตโนมัติ |
| Wishlist บนเซิร์ฟเวอร์ | ซิงก์ข้ามอุปกรณ์ |
| ระบบรีวิวและเรตติ้ง | ลูกค้าที่ซื้อจริงเท่านั้นที่รีวิวได้ |
| Personalized Drop Alert | แจ้งเตือนคอลเลกชันใหม่ตามโทนสีที่สนใจ (Email + SMS) |
| SEO & Analytics | Meta tags, Sitemap, Google Analytics / Meta Pixel |
| Performance Optimization | Image CDN + WebP, Code Splitting, Lazy Loading |

**ส่งมอบ:** ฟีเจอร์ที่ขับเคลื่อนยอดขายและการซื้อซ้ำ

#### Phase 4 — Launch & Stabilize (สัปดาห์ 10–12)

| งาน | รายละเอียด |
| :--- | :--- |
| Load Testing & Security Review | ทดสอบรับโหลดช่วง Drop และตรวจสอบความปลอดภัยก่อนเปิดจริง |
| Monitoring & Alerting | Error tracking (Sentry), Uptime monitor, Log aggregation |
| ระบบสำรองข้อมูลอัตโนมัติ | Daily backup + Disaster Recovery Plan |
| Soft Launch | เปิดให้กลุ่มจำกัดใช้งาน เก็บ Feedback |
| Public Launch | เปิดตัวเต็มรูปแบบพร้อมแคมเปญการตลาด |

**ส่งมอบ:** ระบบ Production ที่มี Monitoring และแผนรับมือเหตุขัดข้อง

### 8.3 แผนระยะยาว (Beyond 12 สัปดาห์)

| ช่วงเวลา | สิ่งที่ทำ |
| :--- | :--- |
| ไตรมาส 2 | **AI Personal Color Analysis** — วิเคราะห์โทนสีผิวจากรูปเซลฟี่ · Virtual Try-On เบื้องต้น |
| ไตรมาส 3 | **PWA** ติดตั้งบนมือถือได้ · Push Notification · ระบบ Loyalty Points เต็มรูปแบบ |
| ไตรมาส 4 | รองรับหลายภาษาและหลายสกุลเงิน · เตรียมขยายตลาดต่างประเทศ · Multi-warehouse |

---

## 9. ทีมงานที่แนะนำ (Recommended Team)

### 9.1 องค์ประกอบทีมหลัก — 5 คน

| บทบาท | จำนวน | สัดส่วนเวลา | ความรับผิดชอบ | ทักษะที่ต้องมี |
| :--- | :---: | :---: | :--- | :--- |
| **Tech Lead / Full-Stack Developer** | 1 | 100% | ตัดสินใจสถาปัตยกรรม, Code Review, จัดการ Release, ดูแล Git & CI | React, Node.js, MongoDB, System Design |
| **Frontend Developer** | 1 | 100% | หน้า UI, Component, Responsive, Performance ฝั่งเบราว์เซอร์ | React 18, Tailwind CSS, Vite |
| **Backend Developer** | 1 | 100% | REST API, Data Model, Auth, เชื่อม Payment Gateway | Express, Mongoose, MongoDB |
| **UI/UX Designer** | 1 | 50% | Design System, Wireframe, Lookbook Layout, Design Token | Figma, Design System, Color Theory |
| **Product Owner / Scrum Master** | 1 | 50% | Backlog, จัดลำดับความสำคัญ, ประสานผู้เกี่ยวข้อง, UAT | Agile/Scrum, E-Commerce Domain |

**รวม: 4.0 FTE**

### 9.2 บทบาทเสริม (ตามช่วงเวลา)

| บทบาท | ช่วงที่ต้องใช้ | ความรับผิดชอบ |
| :--- | :--- | :--- |
| **DevOps Engineer** | Phase 1 และ Phase 4 (~0.3 FTE) | ตั้ง Cloud Infrastructure, CI/CD, Monitoring, Backup |
| **QA Engineer** | Phase 2 เป็นต้นไป (~0.5 FTE) | Test Plan, Regression Test, UAT Coordination |
| **Content & Fashion Curator** | ต่อเนื่อง (~0.5 FTE) | คัดสินค้า, แมป Color Palette, ถ่ายภาพ Lookbook, เขียน Editorial |
| **Digital Marketing** | Phase 3–4 (~0.5 FTE) | SEO, Social Media, Influencer Partnership, แคมเปญเปิดตัว |

### 9.3 ตาราง RACI (งานสำคัญ)

| งาน | Tech Lead | FE Dev | BE Dev | Designer | PO |
| :--- | :---: | :---: | :---: | :---: | :---: |
| ออกแบบสถาปัตยกรรมระบบ | **A/R** | C | C | I | I |
| พัฒนา UI Component | A | **R** | I | C | I |
| พัฒนา REST API | A | I | **R** | I | I |
| เชื่อม Payment Gateway | A | C | **R** | I | C |
| Design System & Token | C | C | I | **A/R** | I |
| จัดลำดับ Backlog | C | I | I | C | **A/R** |
| ตัดสินใจปล่อยเวอร์ชัน | **A/R** | I | I | I | C |

> **R** = Responsible ผู้ลงมือ · **A** = Accountable ผู้รับผิดชอบผลลัพธ์ · **C** = Consulted ผู้ให้คำปรึกษา · **I** = Informed ผู้รับทราบ

### 9.4 วิธีการทำงาน

- **กรอบการทำงาน:** Agile / Scrum · Sprint ละ 2 สัปดาห์
- **พิธีกรรมประจำ:** Daily Standup 15 นาที · Sprint Planning · Sprint Review · Retrospective
- **การประเมินงาน:** Story Points ตามลำดับ Fibonacci (1, 2, 3, 5, 8, 13)
- **การจัดลำดับความสำคัญ:** MoSCoW (Must / Should / Could / Won't)

**Definition of Ready (DoR)**
1. เขียน User Story ในรูปแบบ *"As a [User], I want [Action], So that [Benefit]"*
2. มีเงื่อนไขการยอมรับ (Acceptance Criteria) ชัดเจนทุกข้อ
3. ประเมิน Story Points แล้ว

**Definition of Done (DoD)**
1. โค้ดผ่านการตรวจสอบ Compile — 0 errors, 0 warnings
2. รองรับ Responsive ครบ Mobile / Tablet / Desktop
3. มีการดักจับข้อผิดพลาดครบ 4 สถานะ UI
4. จัดเก็บและซิงก์สถานะข้อมูลถูกต้อง
5. ผ่าน Code Review อย่างน้อย 1 คน

---

## 10. งบประมาณโดยประมาณ (Budget Estimate)

### 10.1 ค่าพัฒนา (12 สัปดาห์ / 3 เดือน)

| รายการ | FTE | เดือน | ประมาณการ (บาท) |
| :--- | :---: | :---: | ---: |
| Tech Lead / Full-Stack | 1.0 | 3 | 300,000 |
| Frontend Developer | 1.0 | 3 | 195,000 |
| Backend Developer | 1.0 | 3 | 195,000 |
| UI/UX Designer | 0.5 | 3 | 90,000 |
| Product Owner / Scrum Master | 0.5 | 3 | 105,000 |
| DevOps (ตามช่วง) | 0.3 | 3 | 63,000 |
| QA Engineer (ตามช่วง) | 0.5 | 2 | 60,000 |
| **รวมค่าพัฒนา** | | | **~1,008,000** |

### 10.2 ค่าดำเนินการรายเดือน (Operating Cost)

| รายการ | ประมาณการ/เดือน (บาท) |
| :--- | ---: |
| MongoDB Atlas (Shared → Dedicated M10) | 2,000 – 7,000 |
| Frontend Hosting (Vercel Pro) | 700 |
| Backend Hosting (Render / Railway) | 900 – 2,500 |
| Image CDN & Object Storage | 1,000 – 3,000 |
| Domain & SSL | 100 |
| Email Service (Transactional) | 500 – 1,500 |
| SMS Gateway (VIP Alert) | 500 – 2,000 |
| Monitoring & Error Tracking | 900 |
| **รวมค่าดำเนินการ** | **~6,600 – 17,700** |

### 10.3 ค่าธรรมเนียมผันแปร

| รายการ | อัตรา |
| :--- | :--- |
| Payment Gateway | ~3.65% + 5 บาท ต่อรายการ (บัตรเครดิต) · ~1.65% (PromptPay) |
| ค่าขนส่ง | ตามน้ำหนักและพื้นที่จัดส่ง |

> **หมายเหตุ:** ตัวเลขข้างต้นเป็นการประมาณการเพื่อวางแผน ควรปรับตามอัตราจ้างจริงและแพ็กเกจผู้ให้บริการที่เลือกใช้

---

## 11. ตัวชี้วัดความสำเร็จ (Success Metrics)

### 11.1 ตัวชี้วัดธุรกิจ

| ตัวชี้วัด | เป้าหมาย 3 เดือนแรกหลังเปิดตัว |
| :--- | :--- |
| ผู้เข้าชมเว็บไซต์ต่อเดือน | 15,000 คน |
| อัตราการแปลงเป็นคำสั่งซื้อ (Conversion Rate) | ≥ 2.0% |
| มูลค่าตะกร้าเฉลี่ย (AOV) | ≥ $85 |
| อัตราการละทิ้งตะกร้า | ≤ 65% |
| อัตราการซื้อซ้ำภายใน 90 วัน | ≥ 20% |
| จำนวนสมาชิกที่สมัคร | 3,000 คน |
| สัดส่วนสมาชิกที่เลื่อนเป็น VIP | ≥ 8% |

### 11.2 ตัวชี้วัดเฉพาะของ MatchA

| ตัวชี้วัด | เป้าหมาย | เหตุผล |
| :--- | :--- | :--- |
| ผู้ทำแบบทดสอบ Personal Color จบ | ≥ 40% ของผู้เข้าชม | วัดว่าจุดขายหลักดึงดูดจริง |
| ผู้ใช้ Mix & Match Studio | ≥ 25% ของผู้เข้าชม | วัดการมีส่วนร่วมกับ Color Harmony Engine |
| AOV ของคนที่ใช้ Mix & Match เทียบคนที่ไม่ใช้ | **สูงกว่า ≥ 30%** | พิสูจน์ว่าเอนจินช่วยเพิ่มยอดขายเป็นเซ็ต |
| อัตราการคืนสินค้าเพราะ "สีไม่ตรง" | ≤ 3% | พิสูจน์ว่าการจัดหมวดตามโทนสีแก้ปัญหาได้ |

### 11.3 ตัวชี้วัดเชิงเทคนิค

| ตัวชี้วัด | เป้าหมาย |
| :--- | :--- |
| Uptime | ≥ 99.5% |
| เวลาตอบสนอง API (p95) | ≤ 400 ms |
| Largest Contentful Paint (LCP) | ≤ 2.5 วินาที |
| Lighthouse Performance Score | ≥ 85 |
| อัตราข้อผิดพลาดของ API | ≤ 0.5% |

---

## 12. เอกสารอ้างอิง (Reference Documents)

### เอกสารในโครงการ

| เอกสาร | เนื้อหา |
| :--- | :--- |
| [`02-Technical-Spec.md`](./02-Technical-Spec.md) | สถาปัตยกรรม, Tech Stack, Data Model, API, ความเสี่ยง, แผนขยาย |
| [`03-Component-Reference.md`](./03-Component-Reference.md) | คู่มืออ้างอิงคอมโพเนนต์รายตัว 38 ตัว + กายวิภาคหน้าจอ 11 หน้า |
| [`Requirement/Requirement.md`](../Requirement/Requirement.md) | SRS ฉบับเต็ม — BMC, Use Case 21 ตัว, ERD, Wireframes, Design Token |
| [`Requirement/backlog.md`](../Requirement/backlog.md) | Product Backlog — 7 Epics / 31 Stories / 125 pts |
| [`Sprint-01-Audit-and-Git-Guide.md`](../Sprint-01-Audit-and-Git-Guide.md) | เกณฑ์ประเมิน Sprint 1 |
| [`Sprint-02-Audit-and-Git-Guide.md`](../Sprint-02-Audit-and-Git-Guide.md) | เกณฑ์ประเมิน Sprint 2 |
| [`Sprint-03.md`](../Sprint-03.md) | เกณฑ์ประเมิน Sprint 3 — Database CRUD, Deployment, Validation |
| [`personal-color-theory.md`](./personal-color-theory.md) | ทฤษฎี Personal Color ที่ใช้อ้างอิงในระบบ |

### ไดอะแกรม

| ไฟล์ | เนื้อหา |
| :--- | :--- |
| [`docs/diagrams/matcha-architecture.html`](./diagrams/matcha-architecture.html) | สถาปัตยกรรมระบบ (แบบโต้ตอบได้) |
| [`docs/diagrams/matcha-database-erd.html`](./diagrams/matcha-database-erd.html) | ERD ฐานข้อมูล |
| [`docs/diagrams/matcha-order-sequence.html`](./diagrams/matcha-order-sequence.html) | Sequence Diagram การสั่งซื้อ |
| [`docs/diagrams/matcha-showcase-hub.html`](./diagrams/matcha-showcase-hub.html) | หน้ารวมไดอะแกรมทั้งหมด |
| `Requirement/MatchA_UseCase_Diagram_TH.svg` | Use Case Diagram 4 บทบาท (ภาษาไทย) |
| `Requirement/MatchA_Business_Model_Canvas_TH.svg` | Business Model Canvas (ภาษาไทย) |
| `Requirement/MatchA_Database_ERD_TH.svg` | ERD (ภาษาไทย) |
| `Requirement/MatchA_App_Wireframes.excalidraw` | Wireframes ทุกหน้าจอ |
| `Requirement/MatchA_System_Software_Architecture.png` | ผังสถาปัตยกรรมซอฟต์แวร์ |

---

*เอกสารนี้จัดทำขึ้นเพื่อประกอบการนำเสนอโครงการ MatchA — ปรับปรุงล่าสุด 7 กันยายน 2569*
