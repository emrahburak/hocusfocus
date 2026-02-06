# hocusfocus:1.8.0 🧘‍♂️🚀

> Modern, CLI-based Pomodoro timer designed for productivity.

[![NPM Version](https://img.shields.io/npm/v/hocusfocus.svg)](https://www.npmjs.com/package/hocusfocus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🇺🇸 English Documentation (Default)

`hocusfocus` is a lightweight terminal utility that helps you manage your focus cycles using the Pomodoro technique.

### Key Features
- **Flexible Time Input:** Supports seconds (`1500`), minutes (`25m`), or combined hours and minutes (`1h30m`).
- **Persistent Configuration:** Automatically creates and uses `~/.hocusfocus/hocusfocus.json` for your preferred defaults.
- **Interactive Controls:** Pause/Resume with `Space`, Quit with `Ctrl+C` at any time.
- **Cross-Platform Audio:** Beep alerts that work on Linux, macOS, and Windows.
- **Robust Architecture:** Built with functional programming patterns and covered by unit tests.

### Installation
```bash
npm i -g emrahburak/hocusfocus
# or
git clone https://github.com/emrahburak/hocusfocus.git
cd hocusfocus && npm i -g .
```

### Usage
```bash
# Run with settings from hocusfocus.json
hocusfocus

# Override time via CLI
hocusfocus --time 45m
hocusfocus -t 1h15m

# Show/Initialize configuration path
hocusfocus --config
```

---

## 🇹🇷 Türkçe Dokümantasyon

<details>
<summary><b>Türkçe açıklamayı görüntülemek için tıklayın</b></summary>

`hocusfocus`, Pomodoro tekniğini kullanarak odaklanma döngülerinizi yönetmenize yardımcı olan hafif bir terminal aracıdır.

### Temel Özellikler
- **Esnek Zaman Girişi:** Saniye (`1500`), dakika (`25m`) veya saat-dakika (`1h30m`) formatlarını destekler.
- **Kalıcı Yapılandırma:** Tercih ettiğiniz varsayılanlar için `~/.hocusfocus/hocusfocus.json` dosyasını otomatik oluşturur ve kullanır.
- **Etkileşimli Kontroller:** İstediğiniz an `Space` ile duraklatabilir, `Ctrl+C` ile çıkış yapabilirsiniz.
- **Platformlar Arası Ses:** Linux, macOS ve Windows üzerinde çalışan sesli uyarılar.
- **Sağlam Mimari:** Fonksiyonel programlama prensipleriyle geliştirilmiş ve birim testlerle desteklenmiştir.

### Kurulum
```bash
npm i -g emrahburak/hocusfocus
# veya
git clone https://github.com/emrahburak/hocusfocus.git
cd hocusfocus && npm i -g .
```

### Kullanım
```bash
# hocusfocus.json'daki ayarlarla çalıştır
hocusfocus

# CLI üzerinden süreyi değiştir
hocusfocus --time 45m
hocusfocus -t 1h15m

# Yapılandırma dosyası yolunu göster/oluştur
hocusfocus --config
```
</details>

---

## ToDo

- [x] Restore --help flag.
- [x] Duration check (minutes/hours/seconds) with regex.
- [x] Pause/Resume functionality with Space bar.
- [x] Default system beep or custom path support.
- [x] Cross-platform compatibility (Win, Linux, macOS).
- [x] Persistent Configuration system.
- [x] Unit and Integration test suite.
- [ ] Log lines (warning, info).
- [ ] Focus/Break cycles.