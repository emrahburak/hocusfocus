# HocusFocus: Gelecek Vizyonu ve Genişleme Spesifikasyonları

Bu belge, `hocusfocus` projesinin bir verimlilik ekosistemine dönüşmesi için planlanan teknik genişlemeleri ve iyileştirmeleri içerir.

## 1. Mimari Genişleme: Görev Yönetimi (Task Management)
*   **Amaç:** Pomodoro tekniğini sadece bir zamanlayıcı olmaktan çıkarıp, somut görev takibi ile birleştirmek.
*   **Özellik:** `hocusfocus "Refactoring" -t 25m` şeklinde görev isimlendirme.
*   **Kalıcılık:** Görevlerin bir `history.json` dosyasına kaydedilmesi ve gün sonunda raporlanması.

## 2. Yapılandırma Sistemi (Persistent Configuration)
*   **Amaç:** Kullanıcı deneyimini hızlandırmak ve kişiselleştirmek.
*   **Özellik:** `.hocusfocusrc` veya `config.json` desteği.
*   **Kapsam:** Varsayılan süreler, mola süreleri ve özel ses dosyası yollarının saklanması.

## 3. Otomatik Döngüler (Focus/Break Cycles)
*   **Amaç:** Klasik Pomodoro döngüsünü (4 odak + 1 uzun mola) otomatize etmek.
*   **Özellik:** `--cycle` bayrağı ile periyot yönetimi.
*   **Görsel Geri Bildirim:** Odaklanma ve mola sürelerinde farklı terminal renkleri (Chalk kullanımı).

## 4. Gelişmiş Bildirimler (Native Notifications)
*   **Amaç:** İşitme engelli kullanıcılar veya gürültülü ortamlar için alternatif uyarı sağlamak.
*   **Özellik:** `node-notifier` entegrasyonu ile masaüstü bildirimleri.
*   **Etkileşim:** Bildirim üzerinden mola başlatma opsiyonu.

## 5. Görsel İyileştirmeler (UX & Progress)
*   **Amaç:** Terminal üzerinden görsel odaklanmayı artırmak.
*   **Özellik:** `cli-progress` ile ilerleme çubuğu (progress bar).
*   **Tasarım:** Sabit "status bar" yapısı.

## 6. İstatistik ve Analiz (Analytics)
*   **Amaç:** Kullanıcının çalışma verimini analiz etmesini sağlamak.
*   **Özellik:** `--stats` komutu ile son 7 günün ASCII grafik tabanlı özeti.

## 7. Entegrasyonlar (Webhooks)
*   **Amaç:** Çalışma seanslarını diğer dijital araçlarla senkronize etmek.
*   **Özellik:** Webhook desteği (Slack durum güncelleme, Spotify kontrolü vb.).

---

## [TEKNİK BORÇ VE ÖNCELİK]
*   **Test Altyapısı:** Mevcut `lib/validation` ve `lib/counter` modülleri için Mocha/Chai veya Jest kullanılarak test suitleri oluşturulmalıdır.
*   **Error Handling:** `afterPathResolver` gibi fonksiyonlardaki hata yönetimi daha sistematik hale getirilmelidir.
