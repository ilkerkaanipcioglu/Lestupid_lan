# LeStupid 2.0 — Zero-Syntax & AI-Native Specification
*No Syntax. No Markup. Just Human Intent.*

---

## 🧠 Felsefe ve Amaç

İnsanlar hata yaparlar çünkü makinelerin kurallarını ezberlemek zorunda kalırlar. Markdown'da köşeli parantezin mi yoksa normal parantezin mi önce geleceğini unuturlar. HTML'de kapanış etiketlerini kaçırırlar. CSS'te düzen kurarken kaybolurlar. 

**LeStupid 2.0** bu bariyerleri kökten kaldırır. Bu dilde **yanlış yazmak imkansızdır**. Çünkü LeStupid kuralları olan bir dil değil, **insan sezgisini yapay zeka derleyicisine (AI Compiler) aktaran bir davranış biçimidir.**

İnsan aklına geldiği gibi en yalın ve en doğal haliyle yazar; yapay zeka onun ne demek istediğini (tablo mu çiziyor, form mu tasarlıyor, lojik mi kuruyor) bağlamdan çıkarır ve anında mükemmel şekilde derler.

---

## ⚡ Temel Yapı Taşı: Doğal Sezgiler

LeStupid 2.0 üç temel insani sezgi üzerine kuruludur:

1. **Görsel Sezgi (Visual Instinct):** Bir metin başlık gibi görünüyorsa başlıktır. Bir metin liste gibi görünüyorsa listedir.
2. **Konum Sezgisi (Positional Instinct):** Bir elemanın içindeki şeyler, kağıda not alırken yaptığımız gibi doğal olarak **içeri girintilenir (indentation)**.
3. **Yönelme Sezgisi (Conversational Action):** Bir eylem, buton veya yönlendirme, doğal olarak bir ok (`->`) veya doğrudan eylem kelimesiyle ifade edilir.

---

## 🛠 Bileşenler ve Doğal Yazım Kılavuzu

### 1. Metin ve Başlıklar (Zero-Syntax Headers)
İnsanlar başlık yazmak için işaretler ezberlemek zorunda kalmamalıdır. Aşağıdaki yazımların **hepsi** AI tarafından başlık olarak kabul edilir:

*   **Klasik Başlık:** `Başlık: Geleceğin Teknolojisi` (İki nokta üst üste ile biten satırlar başlık olur)
*   **Altı Çizili Başlık:** 
    ```text
    Geleceğin Teknolojisi
    =====================
    ```
*   **Kalın/Büyük Harfli Satırlar:** `HİZMETLERİMİZ` ya da `**Hizmetlerimiz**`
*   **Geriye Uyumlu (Optional Markdown):** `# Hizmetlerimiz` veya `## Alt Başlık`

---

### 2. Otomatik Algılanan Tablolar (Zero-Syntax Tables)
İnsanlar verileri tabloya dökerken Excel'den kopyalayıp yapıştırabilir veya düz metin olarak hizalayabilir. LeStupid AI, aşağıdaki her üç yapıyı da otomatik olarak algılayıp modern, responsive bir tabloya dönüştürür:

*   **Pipes (Düz Çizgilerle):**
    ```text
    İsim | Yaş | Şehir
    Ahmet | 25 | İstanbul
    Mehmet | 30 | Ankara
    ```
*   **Virgüllerle (CSV Stilinde):**
    ```text
    Ürün Adı, Fiyat, Stok
    Elma, 15 TL, Var
    Armut, 20 TL, Yok
    ```
*   **Boşluklarla (Tab/Space Aligned):**
    ```text
    Çalışan      Departman     Maaş
    Selin Can    Yazılım       120.000 TL
    Kaan Aras    Tasarım       110.000 TL
    ```

---

### 3. Liste Özgürlüğü (Bullet-Agnostic Lists)
İşaretçinin ne olduğu önemli değildir. İnsanın eli o an neye giderse:

```text
- Birinci madde
* İkinci madde
• Üçüncü madde
1. Dördüncü madde
a) Beşinci madde
  - Alt madde (Girintilenmiş)
```
AI bunların hepsini tek tip, şık ve CSS ile özelleştirilmiş listelere dönüştürür.

---

### 4. Doğal Butonlar ve Linkler (Conversational Action)
Parantez savaşlarına son. Yönlendirme ve butonlar tamamen konuşma diliyle veya yön okuyla yazılır:

*   **Butonlar:**
    *   `Buton: "Kayıt Ol" -> /kaydol`
    *   `[Kayıt Ol Butonu -> /kaydol]`
    *   `Tıkla: "Kayıt Ol" -> /kaydol`
*   **Linkler / Yönlendirmeler:**
    *   `Link: "Hakkımızda" -> /hakkimizda`
    *   `Detaylar için -> /detaylar`
    *   `"Hakkımızda" yazısı -> /hakkimizda`

---

### 5. Görsel Düzenler ve Kartlar (Conversational Layouts)
Grid, Flex, Column gibi teknik CSS terimlerini bilmenize gerek yoktur. Sadece ne istediğinizi söyleyin ve altına girintileyin:

```text
Kutular (3 kolon yan yana):
  Kutu:
    Başlık: Sadelik
    Açıklama: Kurallarla boğuşmayın, sadece yazın.
    Buton: Detaylar -> /sadelik

  Kutu:
    Başlık: AI Gücü
    Açıklama: AI sizin için en mükemmel tasarımı yapar.
    Buton: Keşfet -> /ai

  Kutu:
    Başlık: Evrensellik
    Açıklama: Notlardan web sayfalarına kadar her yerde.
    Buton: İncele -> /evrensel
```

---

### 6. Sezgisel Formlar (Zero-Syntax Forms)
Form tasarlamak hiç bu kadar kolay olmamıştı. Sadece bir form başlığı açın, altına istediğiniz alanları doğal olarak yazın:

```text
İletişim Formu:
  Adınız Soyadınız: [Metin Girişi]
  E-posta Adresiniz: [E-posta Girişi]
  Mesajınız: [Uzun Metin Kutusu]
  Buton: Gönder
```

Ya da daha da basiti, hiçbir alan tipi belirtmeden yazın, AI isimlerinden veri tiplerini (e-posta, telefon vb.) kendi anlasın:

```text
Giriş Formu:
  Kullanıcı Adı
  Şifre (Gizli)
  Buton: Giriş Yap
```

---

### 7. Doğal Dil Tabanlı Lojik (Natural Logic & Flow)
Programlama dillerindeki karmaşık parantezler ve `if-else` yapıları yerine, normal Türkçe veya İngilizce cümlelerle lojik kurun:

```text
Eğer sepet_toplami > 500 ise:
  Kargo Ücreti: "Bedava"
  Göster: "Tebrikler! Ücretsiz kargo kazandınız."
Değilse:
  Kargo Ücreti: "50 TL"
  Göster: "Bedava kargo için 500 TL'ye tamamlayın!"
```

---

## 🎨 Örnek Senaryo: Tam Bir Modern Landing Page

Aşağıdaki metin, Markdown veya HTML5 bilgisi olmayan bir insanın bir not defterine yazacağı kadar doğaldır. LeStupid AI bunu aldığında harika bir kahraman (hero) alanı, 3 kolonlu özellikler gridi, dinamik bir form ve şık bir footer ile mükemmel bir web sayfasına dönüştürür:

```lestupid
Sayfa Bilgileri:
  Başlık: Harezm Ekosistemi
  Açıklama: SAP ve Yapay Zeka Çözümleri
  Renk Teması: Koyu Mor & Platin Gri

Kahraman Alanı:
  Ana Başlık: Geleceği Şimdi İnşa Edin
  Alt Başlık: SAP uzmanlığı ile yapay zekanın gücünü bir araya getiren yeni nesil ekosistemle tanışın.
  Buton: Hemen Başla -> /kayit
  Buton (Şeffaf): Biz Kimiz? -> /hakkimizda

Özellikler (3 Kolon Yan Yana):
  Kart:
    Başlık: SAP Entegrasyonu
    Detay: Mevcut ERP sistemlerinizle %100 uyumlu, kesintisiz entegrasyon.
  Kart:
    Başlık: Akıllı Ajanlar
    Detay: İş süreçlerinizi 7/24 yöneten otonom yapay zeka asistanları.
  Kart:
    Başlık: Bulut Güvenliği
    Detay: En üst düzey şifreleme ve yasal mevzuat uyumluluğu.

İletişim Formu:
  Adınız Soyadınız
  Şirket E-postanız
  Mesajınız (Uzun Yazı)
  Buton: İletişime Geç -> /gonder

Alt Bilgi:
  © 2026 Harezm Technology. Tüm hakları saklıdır.
  Destek için -> /destek | KVKK için -> /kvkk
```

---

> **LeStupid 2.0 İle Akıllı Olmaya Çalışmayın. Sadece Düşünün ve Yazın. Gerisini AI Halleder.**
