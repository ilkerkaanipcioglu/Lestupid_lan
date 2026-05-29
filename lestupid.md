# LeStupid

> *"O kadar basit ki aptal gibi görünür — ama her şeyi yapar."*

---

## Felsefe

### Temel İnanç

Diller insanları değil, insanlar dilleri şekillendirmeli.

Bugün bir web sayfası yazmak için HTML öğrenmek gerekiyor. Bir uygulama yazmak için Rust ya da Elixir öğrenmek gerekiyor. Bir not almak için Markdown'ın kurallarını ezberlemek gerekiyor. Her araç kendi dilini dayatıyor.

LeStupid bunu tersine çevirir.

**Düşündüğün gibi yaz. LeStupid gerisini halleder.**

### Üç İlke

**1. Sezgisel**
Her kural tahmin edilebilir. Bir şeyi bir kez gören kişi bir daha bakmaz. Çocuk da yazar, kıdemli geliştirici de.

**2. Evrensel**
Tek bir dil — not, web sayfası, uygulama mantığı, AI talimatı. Hedef ne olursa olsun, LeStupid aynı şekilde yazılır.

**3. AI-native**
LeStupid, AI ile birlikte çalışmak için tasarlanmıştır. AI LeStupid okur, anlar, üretir. İnsan ve AI arasındaki en kısa yol.

### Rakiplerden Farkı

| | Markdown | HTML | Rust/Elixir | LeStupid |
|---|---|---|---|---|
| Not alma | ✅ | ❌ | ❌ | ✅ |
| Web sayfası | ⚠️ | ✅ | ❌ | ✅ |
| UI bileşenleri | ❌ | ✅ | ❌ | ✅ |
| Uygulama mantığı | ❌ | ❌ | ✅ | ✅ |
| AI dostu | ⚠️ | ❌ | ❌ | ✅ |
| Sezgisel | ✅ | ❌ | ❌ | ✅ |
| Öğrenme süresi | 10 dk | Haftalar | Aylar | 10 dk |

---

## Dil Tasarımı

### Temel Kurallar (Sadece 5)

1. `eleman: içerik` — tek satır
2. Girinti ile iç içe yapı
3. `"tırnak"` — metin değeri
4. `/yol` — link veya kaynak
5. Blok açılır `:eleman` ile kapanır

### Web Katmanı

```
# Başlık 1
## Başlık 2
### Başlık 3

Düz metin direkt yazılır.

*kalın*   _italik_   ~üstü çizili~   `kod`

[Link metni](/url)
[Buton](/url !buton)
![Resim açıklaması](/resim.jpg)

---

- madde
- madde
  - alt madde

1. birinci
2. ikinci

> alıntı bloku

| Ad    | Yaş | Şehir    |
| Ali   | 32  | İstanbul |
| Ayşe  | 28  | Ankara   |

::not      Bu bir bilgi kutusudur.
::uyarı    Bu işlem geri alınamaz.
::hata     Bir şeyler ters gitti.
::başarı   Form gönderildi.

@video(/tanitim.mp4)
@ses(/muzik.mp3)

grid(3):
  kart:
    # Başlık
    Açıklama metni
  :kart
  kart:
    # Başlık
    Açıklama metni
  :kart
:grid

form:
  ad     | metin | Adınız
  email  | email | E-posta
  mesaj  | alan  | Mesajınız
  ---
  Gönder
:form

bölüm(koyu):
  # İçerik
:bölüm

===
başlık: Sayfa Adı
açıklama: SEO metni
dil: tr
===
```

### Kod Katmanı

```
isim = "Ali"
yaş = 32
aktif = doğru

fonk selamVer(isim):
  döndür "Merhaba " + isim

eğer yaş > 18:
  yazdır "Yetişkin"
değilse:
  yazdır "Çocuk"

her ürün için liste:
  yazdır ürün.ad

dene:
  dosya aç "veri.txt"
hata:
  yazdır "Dosya bulunamadı"
sonunda:
  kapat

eşleş sonuç:
  tamam, değer → yazdır değer
  hata, sebep  → yazdır "Hata: " + sebep
  boş          → yazdır "Veri yok"

paralel:
  görev1()
  görev2()

boru liste:
  | filtrele x > 2
  | dönüştür x * 2
  | topla
```

### Web + Kod Birlikte

```
# Sipariş Hesaplama

Bu fonksiyon sepet toplamını hesaplar.

@kod:
  fonk hesapla(sepet):
    toplam = sepet.topla()
    döndür toplam
:@kod

[Hesapla !buton]
```

---

## Ekosistem — Yapılacaklar

### Aşama 1 — Temel (MVP)

- [ ] Dil spesifikasyonu — tüm kuralların yazılı tanımı
- [ ] Web parser — LeStupid → HTML dönüştürücü (JavaScript)
- [ ] Tarayıcı editörü — sol yaz, sağ gör, canlı preview
- [ ] Dosya kaydet / aç — `.ls` uzantısı
- [ ] Temel syntax renklendirme

### Aşama 2 — Editor

- [ ] Masaüstü uygulama (Electron)
- [ ] Obsidian plugin — vault içinde `.ls` dosyaları
- [ ] VS Code extension — syntax highlight + preview
- [ ] Otomatik tamamlama — `gri` yazınca `grid():` önerir
- [ ] Hata mesajları — sezgisel, Türkçe/İngilizce

### Aşama 3 — AI Entegrasyonu

- [ ] "Rust'a çevir" butonu — LeStupid → AI → Rust
- [ ] "Elixir'e çevir" butonu — LeStupid → AI → Elixir
- [ ] "Python'a çevir" butonu
- [ ] "SQL'e çevir" butonu
- [ ] AI ile birlikte yazma — yarım bırak, AI tamamlar
- [ ] Doğal dilden LeStupid üretme — "bir ürün kartı yap" → LeStupid kodu

### Aşama 4 — Web Yayınlama

- [ ] CLI tool — `ls build index.ls` → `index.html`
- [ ] Tema sistemi — renk tokenları, font sistemi
- [ ] Bileşen kütüphanesi — hazır kartlar, formlar, layoutlar
- [ ] LeStupid → React dönüştürücü
- [ ] Statik site üretici — tüm `.ls` → tam web sitesi

### Aşama 5 — Topluluk

- [ ] lestupid.dev — resmi site (LeStupid ile yazılmış)
- [ ] Canlı playground — tarayıcıda dene
- [ ] Dökümantasyon sitesi
- [ ] GitHub repo — açık kaynak
- [ ] Örnek projeler — blog, portföy, landing page, not defteri
- [ ] Discord / topluluk

---

## Dosya Yapısı

```
proje/
  index.ls          → ana sayfa
  hakkimda.ls       → hakkımda
  notlar/
    toplanti.ls     → not dosyası
    fikir.ls
  bilesenler/
    kart.ls         → tekrar kullanılabilir bileşen
    menu.ls
  tema.ls           → renk ve font tanımları
```

---

## Örnek: Tam Bir Sayfa

```
===
başlık: Harezm Technology
açıklama: SAP ve AI çözümleri
renk: #580F41
===

bölüm(tam-ekran koyu):
  # Geleceği Şimdi İnşa Et
  SAP uzmanlığı ve yapay zeka bir arada.
  [Keşfet !buton](/hizmetler)
:bölüm

bölüm:
  ## Hizmetlerimiz

  grid(3):
    kart:
      # SAP Danışmanlık
      FI/CO, e-Dönüşüm ve otomasyon çözümleri.
    :kart
    kart:
      # AI Otomasyon
      AgentandBot ile iş süreçleri otomatikleşir.
    :kart
    kart:
      # E-Dönüşüm
      e-Fatura, e-Defter, yasal uyumluluk.
    :kart
  :grid
:bölüm

bölüm(gri):
  ## İletişim

  form:
    ad     | metin | Adınız
    email  | email | E-posta
    mesaj  | alan  | Mesajınız
    ---
    Gönder
  :form
:bölüm
```

---

## Özet

LeStupid bir programlama dili değil.
Bir markup dili de değil tam olarak.

**İnsan düşüncesi ile dijital çıktı arasındaki en kısa yol.**

Not al. Web sayfası yaz. Uygulama mantığını ifade et. AI'ya talimat ver.
Hepsini aynı dille. Öğrenmesi 10 dakika.

> *Le Stupid. Because smart is overrated.*
