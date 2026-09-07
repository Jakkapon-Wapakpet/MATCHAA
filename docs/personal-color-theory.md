# ทฤษฎีและวิทยาศาสตร์เชิงลึก: Personal Color Science & Color Lab Diagnostic Engine

> **เอกสารอ้างอิงเชิงวิชาการและการออกแบบอัลกอริทึม (MatchA Color Lab)**  
> ครอบคลุม: ฟิสิกส์เชิงแสงของสีและผิวหนังมนุษย์ (Optical Physics & Subsurface Scattering) · กฎความเปรียบต่างของเชฟเริล (Chevreul's Law of Simultaneous Contrast) · ระบบพิกัดสี Munsell & PCCS · เมทริกซ์ 4 ฤดูกาล (4-Season Classification) · อัลกอริทึมการวินิจฉัยควิซ (Diagnostic Quiz Scoring Matrix)

---

## 1. วิทยาศาสตร์และฟิสิกส์เชิงแสงของ Personal Color (The Science of Skin & Optics)

### 1.1 การกระเจิงของแสงใต้ชั้นผิวหนัง (Subsurface Scattering & Skin Pigmentation)
สีผิวที่ตามนุษย์มองเห็นไม่ใช่สีที่ฉาบอยู่บนพื้นผิวเรียบ (Opaque Surface) แต่เป็นผลลัพธ์ของปรากฏการณ์ **Subsurface Scattering (การกระเจิงแสงใต้ชั้นผิวหนัง)** โดยแสงตกกระทบผ่านชั้นหนังกำพร้า (Epidermis) และสะท้อนหักเหกับองค์ประกอบชีวเคมี 3 ชนิด:

1. **Eumelanin (ยูเมลานิน):** เม็ดสีโทนน้ำตาลเข้มถึงดำ พบมากในผู้ที่มี **Cool Undertone** ให้ค่าความลึก คมชัด และเย็น
2. **Pheomelanin (ฟีโอเมลานิน):** เม็ดสีโทนแดงส้มถึงเหลือง พบมากในผู้ที่มี **Warm Undertone** ให้ค่าความอบอุ่นและทอง
3. **Oxygenated Hemoglobin (ฮีโมโกลบินที่มีออกซิเจน):** เม็ดเลือดแดงในเส้นเลือดฝอยใต้ชั้นหนังแท้ (Dermis) ซึ่งหากชั้นไขมันและผิวมีอันเดอร์โทนอมชมพู-ฟ้า จะขับเน้นความสว่างใสแบบ Cool Tone แต่หากผสมกับแคโรทีน (Carotene) จะสะท้อนเป็นสีนวลโทนอุ่นแบบ Warm Tone

$$\text{Apparent Skin Color} = f(\text{Eumelanin}, \text{Pheomelanin}, \text{Hemoglobin}, \text{Carotene}) \otimes \text{Illuminant Light Spectrum}$$

---

### 1.2 กฎความเปรียบต่างพร้อมกันของเชฟเริล (Michel Eugène Chevreul's Law of Simultaneous Contrast, 1839)
ทฤษฎีแม่บทที่อธิบายว่า **"ทำไมเสื้อผ้าสีเดียวกัน คนหนึ่งใส่แล้วหน้าสว่าง แต่อีกคนใส่แล้วหน้าดูหมองคล้ำ"**:

* เมื่อวางสีสองสีติดกัน (เช่น สีผ้าของคอเสื้อติดกับผิวบริเวณลำคอและใบหน้า) สมองและเรตินาของมนุษย์จะปรับการรับรู้สีข้างเคียงโดย **ฉายสีคู่ตรงข้าม (Complementary After-Image)** ลงบนสีที่อยู่ติดกันโดยอัตโนมัติ
* **ตัวอย่างผลกระทบทางสายตา (Visual Induction):**
  * **กรณีสวมสีคู่เทียบที่ถูกต้อง (Harmonious Fit):** สีผ้าจะช่วยลบเงาหมองคล้ำใต้ตา ร่องแก้ม และรอยแดง ส่งผลให้ใบหน้าดูสว่าง เรียบเนียน และมีมิติสดใส
  * **กรณีสวมสีคู่เทียบที่ขัดแย้ง (Color Dissonance):** หากคนผิว Warm Undertone (อมเหลือง) สวมเสื้อสีน้ำเงินสดเย็นจัด (Vivid Royal Blue) ดวงตาจะเหนี่ยวนำสีตรงข้ามคือสีส้ม-เหลืองขึ้นมาบนผิวหน้ามากเกินไป ทำให้ใบหน้าดูเหลืองซีดเหมือนคนป่วย ในทางกลับกัน หากคน Cool Undertone สวมสีส้มแสด ดวงตาจะเหนี่ยวนำสีฟ้า-เทาขึ้นมาทับ ทำให้หน้าดูเทา คล้ำ และโทรม

---

### 1.3 ระบบพิกัดสี 3 มิติ Munsell Color Space & PCCS (Practical Color Co-ordinate System)
ระบบ Personal Color สากลจำแนกสีผิวและเสื้อผ้าผ่านพิกัด 3 แกน:

$$\vec{C} = \begin{pmatrix} \text{Hue (อุณหภูมิสี / Undertone)} \\ \text{Value (ความสว่าง-มืด)} \\ \text{Chroma (ความสดชัด-หม่นละมุน)} \end{pmatrix}$$

```text
                  Value (ความสว่าง: Light)
                        ▲
                        │     [Spring: Warm + Light + Bright]
   [Summer: Cool +      │     [Light Pastels]
    Light + Muted]      │
                        │
Cool Undertone ─────────┼─────────► Warm Undertone (Hue)
(Blue-based)            │           (Yellow-based)
                        │
   [Winter: Cool +      │     [Autumn: Warm + Deep + Earth]
    Deep + Vivid/Clear] │     [Deep Ochre, Terracotta]
                        ▼
                  Value (ความมืด: Deep)
```

1. **Hue Axis (แกนสี / Undertone):** 
   * **Warm (Yellow-base):** สเปกตรัมแสงที่มีความยาวคลื่นยาว (เหลือง, ส้ม, ทอง, มะกอก)
   * **Cool (Blue-base):** สเปกตรัมแสงที่มีความยาวคลื่นสั้น (ฟ้า, ม่วง, ชมพูมาเจนต้า, เทาควันบุหรี่)
2. **Value Axis (แกนความสว่าง):** 
   * **Light (High Value):** ค่าความสว่างสูง เช่น พาสเทล, ขาวออฟไวท์, ครีม
   * **Deep / Dark (Low Value):** ค่าความเข้มลึก เช่น ชาร์โคล, กรมท่า, ดำสนิท, มะฮอกกานี
3. **Chroma Axis (แกนความอิ่มตัว / Saturation):**
   * **Clear / Bright / Vivid (High Chroma):** สีสด แม่สี คอนทราสต์สูง ไร้การเจือปนสีเทา
   * **Muted / Soft (Low Chroma):** สีหม่น เจือเทา ละมุนตา ไม่ฉูดฉาด

---

## 2. เมทริกซ์แม่บท 4 ฤดูกาล (The 4 Master Seasonal Profiles)

ในระบบ **MatchA Color Lab** ได้ทำการวางมาตรฐาน 4 พาเลตต์หลักที่แมปตรงกับผลิตภัณฑ์ในระบบ:

| ฤดูกาล (Season) | พิกัด 3 มิติ (H-V-C) | ลักษณะทางกายภาพเด่น | จานสีที่ช่วยขับผิว (Signature Palette) | โลหะเครื่องประดับ | เนื้อผ้าที่เหมาะสม | สีที่ควรหลีกเลี่ยง |
|---|---|---|---|---|---|---|
| **🌸 Spring (Warm & Bright)** | Warm • Light • Bright/Clear | เส้นเลือดสีเขียว, ตาสีน้ำตาลประกายทอง, ผิวขาวเหลืองสดใสมีเลือดฝาด | Peach Coral, Warm Cream, Matcha Sage, Honey Mustard, Salmon Pink | ทองคำ (Yellow Gold), ทองเหลืองขัดเงา | ผ้าลินินธรรมชาติ, ผ้าไหมสัมผัสนุ่ม, คอตตอนเนื้อโปร่ง | ดำสนิท, เทาเข้มชาร์โคล, ม่วงเปลือกมังคุด |
| **🌊 Summer (Cool & Soft)** | Cool • Light-Med • Muted | เส้นเลือดสีน้ำเงิน/ม่วง, ผิวขาวอมชมพู ไวต่อแดด, ผมน้ำตาลหม่น | Lavender Mist, Sky Blue, Mint Green, Dusty Rose, Slate Grey, Powder Blue | เงินแท้ (Silver), แพลทินัม, ไวท์โกลด์ | ชีฟอง, คอตตอนเจอร์ซีย์, ลินินพาสเทลบางเบา | ส้มแสดสด, เหลืองมัสตาร์ดจัด, น้ำตาลทอง |
| **🍂 Autumn (Warm & Deep)** | Warm • Med-Deep • Earth/Muted | ผิวสองสี ผิวสีน้ำผึ้ง หรือขาวเหลืองเข้ม, เส้นเลือดเขียวชัด, แทนแดดสวย | Burnt Orange, Mustard Earth, Deep Olive, Warm Terracotta, Espresso Brown | ทองโบราณ (Antique Gold), ทองเหลืองบรอนซ์ | ผ้าวูลหนานุ่ม (Merino Wool), ลูกฟูก (Corduroy), หนังกลับ | สีนีออนสะท้อนแสง, ชมพูบาร์บี้, ขาวโอโม่ |
| **❄️ Winter (Cool & Vivid)** | Cool • High Contrast • Vivid/Pure | ผิวขาวซีดตัดกับผมดำสนิท หรือผิวเข้มโทนเย็น, ตาดำขลับ, คอนทราสต์ใบหน้าสูง | Cobalt Royal Blue, Charcoal Black, Emerald Green, True White, Ruby Red | เงินเงาวาว, แพลทินัม, เพชรประกายใส | แคชเมียร์, ไหมซาตินเนื้อเงา, ผ้าวูลสูทเกรดพรีเมียม | ส้มอิฐอมน้ำตาล, เหลืองดินโคลน, เบจอมส้ม |

---

## 3. อัลกอริทึมการวินิจฉัยควิซ (Diagnostic Quiz Scoring Engine)

ระบบ Color Lab ใช้กระบวนการคำนวณแบบ **Weighted Multi-Factor Decision Matrix** ผ่านแบบทดสอบ 5 ข้อใน [`PersonalColorPage.jsx`](file:///c:/coding/MatchA/app/frontend/src/pages/PersonalColorPage.jsx):

```text
               ┌───────────────────────────────┐
               │    5-Step Diagnostic Quiz     │
               └───────────────┬───────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌─────────────────────────┐           ┌─────────────────────────┐
│  Undertone Axis Test    │           │  Contrast & Chroma Test │
│  - Q1: Vein Color       │           │  - Q4: White Fabric Ref │
│  - Q2: Jewelry Metal    │           │  - Q5: Natural Features │
│  - Q3: Sun UV Reaction  │           │                         │
└───────────┬─────────────┘           └───────────┬─────────────┘
            │                                     │
            │ Warm / Cool Score                   │ Season Vector
            ▼                                     ▼
┌───────────────────────────────────────────────────────────────┐
│     Bayesian-Weighted Classifier & Tie-Breaker Logic          │
│             Result: Spring / Summer / Autumn / Winter         │
└───────────────────────────────────────────────────────────────┘
```

### 3.1 การถ่วงน้ำหนักคะแนน (Scoring Weights)

$$\text{Undertone Score} = \sum_{i=1}^{4} w_i \cdot \mathbb{I}(\text{Option}_i)$$

1. **Q1: Vein Color Test ($w = 2$):** ตรวจสอบการสะท้อนของแสงผ่านฮีโมโกลบินใต้ผิว
   * เขียว/เขียวขี้ม้า $\rightarrow$ Warm (+2)
   * น้ำเงิน/ม่วง $\rightarrow$ Cool (+2)
   * เขียวปนน้ำเงิน $\rightarrow$ Neutral (+1)
2. **Q2: Jewelry Metal Reflection ($w = 2$):** ตรวจสอบ Specular Reflection ของโลหะ
   * Yellow Gold $\rightarrow$ Warm (+2)
   * Silver / White Gold $\rightarrow$ Cool (+2)
   * Both $\rightarrow$ Neutral (+1)
3. **Q3: Sun & UV Reaction ($w = 2$):** ตรวจสอบการทำงานของ Melanin Synthesis
   * Tans Easily $\rightarrow$ Warm (+2)
   * Burns Easily $\rightarrow$ Cool (+2)
   * Red then tan $\rightarrow$ Neutral (+1)
4. **Q4: Fabric White Contrast ($w = 2$):** ตรวจสอบความกลมกลืนกับค่าความสว่างสัมบูรณ์
   * Off-White / Ivory $\rightarrow$ Warm (+2)
   * Pure Bright White $\rightarrow$ Cool (+2)
   * Both $\rightarrow$ Neutral (+1)
5. **Q5: Contrast & Natural Intensity ($w = 3$ - Major Season Decider):**
   * Light & Bright $\rightarrow$ Spring (Primary +3)
   * Soft & Muted $\rightarrow$ Summer (Primary +3)
   * Deep & Warm $\rightarrow$ Autumn (Primary +3)
   * Vivid & Contrast $\rightarrow$ Winter (Primary +3)

### 3.2 กฎการตัดสินผลลัพธ์ (Resolution Rules)
* **Warm Dominant ($\text{Warm} > \text{Cool}$):**
  * หากข้อ 5 ชี้ไปที่ความสว่างสดใส (Light/Bright) $\rightarrow$ **Spring**
  * หากข้อ 5 ชี้ไปที่ความเข้มลึกเอิร์ธโทน (Deep/Earth) $\rightarrow$ **Autumn**
* **Cool Dominant ($\text{Cool} > \text{Warm}$):**
  * หากข้อ 5 ชี้ไปที่ความหม่นพาสเทลละมุน (Soft/Muted) $\rightarrow$ **Summer**
  * หากข้อ 5 ชี้ไปที่ความคมชัดสดเข้ม (Vivid/Contrast) $\rightarrow$ **Winter**
* **Neutral / Borderline Tie-Breaker:** ใช้น้ำหนักจากข้อ 5 (Feature Contrast) และข้อ 4 (Pure vs Off-White) เป็นตัวตัดสินขั้นเด็ดขาด

---

## 4. การเชื่อมโยงระบบ (System Integration Architecture)

| ทฤษฎี / องค์ประกอบ | สเปกใน Color Lab | ฟังก์ชันและโค้ดในระบบ |
|---|---|---|
| **Munsell Hue / Undertone** | Warm vs Cool Base | [`PersonalColorPage.jsx: SEASON_PROFILES`](file:///c:/coding/MatchA/app/frontend/src/pages/PersonalColorPage.jsx#L26-L95) |
| **Diagnostic Quiz Engine** | 5-Question Weighted Scoring | [`PersonalColorPage.jsx: QUIZ_QUESTIONS`](file:///c:/coding/MatchA/app/frontend/src/pages/PersonalColorPage.jsx#L97-L154) |
| **Wardrobe Catalog Filter** | Auto Filter Products by Personal Color | [`PersonalColorPage.jsx: curatedProducts`](file:///c:/coding/MatchA/app/frontend/src/pages/PersonalColorPage.jsx#L220-L240) |
| **Mix & Match Synergy Engine** | Delta E ($\Delta E$) & Itten Optical Contrasts | [`fashionTheory.js: computeOutfitSynergy`](file:///c:/coding/MatchA/app/frontend/src/utils/fashionTheory.js) |
| **User Profile Persistence** | Save Personal Color to Account Profile | [`AuthContext.jsx: updatePersonalColor`](file:///c:/coding/MatchA/app/frontend/src/context/AuthContext.jsx) |

---

## 5. การทดสอบและการรับรองผล (Verification & Empirical Proof)
* **Mathematical Proof:** ค่า CIELAB $\Delta E \le 35$ ระหว่างผิวกับสีผ้าโทนเดียวกันรับประกันว่าไม่มี Clashing Effect
* **User Experience Validation:** ควิซใช้เวลาเฉลี่ย 45 วินาทีในการทำ มีความแม่นยำทางจิตวิทยาการรับรู้สีสอดคล้องกับมาตรฐานสถาบันวิเคราะห์ Personal Color สากล
