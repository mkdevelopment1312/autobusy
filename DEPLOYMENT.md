# Instrukcje wdrożenia - Autokary Lublin

## 📋 Informacje o deploymencie

**Domena:** `kamilmaslanka.pl`  
**Folder:** `public_html/autobusy`  
**URL:** `https://kamilmaslanka.pl/autobusy`

## 🚀 Kroki wdrożenia

### 1. Upload plików
Skopiuj całą zawartość folderu `dist/` do folderu `public_html/autobusy/` na serwerze.

### 2. Struktura plików na serwerze
```
public_html/
└── autobusy/
    ├── .htaccess
    ├── index.html
    ├── robots.txt
    ├── sitemap.xml
    ├── placeholder.svg
    └── assets/
        ├── index-B7X8kahs.js
        └── index-E1Azd7-g.css
```

### 3. Sprawdź uprawnienia
- Pliki: `644`
- Foldery: `755`
- `.htaccess`: `644`

### 4. Testowanie
Po uploadzeniu odwiedź: `https://kamilmaslanka.pl/autobusy`

## 🔧 Konfiguracja

### .htaccess
- ✅ Obsługuje React Router (SPA routing)
- ✅ Przekierowanie HTTP → HTTPS
- ✅ Kompresja Gzip
- ✅ Cache przeglądarki
- ✅ Nagłówki bezpieczeństwa

### SEO
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Meta tags
- ✅ JSON-LD structured data
- ✅ Open Graph
- ✅ Twitter Cards

### SSL
- ✅ HTTPS redirect skonfigurowany
- ✅ Wszystkie linki używają HTTPS

## 🛠️ Regeneracja plików

Jeśli potrzebujesz wprowadzić zmiany:

```bash
# Wprowadź zmiany w kodzie
npm run build

# Skopiuj nowe pliki z dist/ na serwer
```

## 🔍 Weryfikacja

1. **Sprawdź routing:** `https://kamilmaslanka.pl/autobusy` powinno działać
2. **Sprawdź SEO:** Sprawdź źródło strony - meta tagi powinny być właściwe
3. **Sprawdź HTTPS:** Strona powinna automatycznie przekierować na HTTPS
4. **Sprawdź sitemap:** `https://kamilmaslanka.pl/autobusy/sitemap.xml`
5. **Sprawdź robots:** `https://kamilmaslanka.pl/autobusy/robots.txt`

## 📞 Kontakt

W przypadku problemów skontaktuj się z deweloperem.

---
*Wygenerowano automatycznie przez Vite - 15.01.2025*
