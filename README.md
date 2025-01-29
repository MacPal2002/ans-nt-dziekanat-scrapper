# 📌 Scrapper - Plan Zajęć

## 📖 Opis Projektu
Ten projekt to **scraper** pobierający plan zajęć z systemu **Wirtualny Dziekanat** uczelni **Akademii Nauk Stosowanych w Nowym Targu**. Umożliwia logowanie do systemu, pobieranie planu zajęć dla konkretnej daty i zapisywanie danych do pliku CSV.

---

## 🚀 Funkcjonalności
 ✔️ Automatyczne logowanie do systemu  
 ✔️ Obsługa sesji użytkownika  
 ✔️ Pobieranie planu zajęć dla wybranego dnia  
 ✔️ Zapisywanie planu do pliku CSV  
 ✔️ Automatyczne odświeżanie sesji w przypadku wygaśnięcia  

---

## 📂 Struktura Projektu
```
📦 scrapper
├── 📂 config          # Konfiguracja aplikacji
│   ├── credentials.ts # Dane logowania (pobiera z .env)
│   ├── config.ts      # Ustawienia API
│
├── 📂 services        # Główne funkcje
│   ├── login.ts       # Logowanie do systemu
│   ├── fetchSchedule.ts # Pobieranie planu zajęć
│
├── 📂 utils           # Funkcje pomocnicze
│   ├── session.ts     # Obsługa sesji użytkownika
│   ├── utils.ts       # Obsługa dat
│
├── 📂 data
│    ├── session.ts     # Zapisane sesje użytkownika
│   ├── 📂 data       # Pliki z zapisanym planem zajęć
│        ├── YYYY-MM-DD.csv
│
├── 📜 deno.json       # Konfiguracja Deno
└── 📜 main.ts         # Główny plik uruchamiający aplikację
```

---

## 🛠 Instalacja
1️⃣ **Zainstaluj Deno** (jeśli jeszcze nie masz):
   ```sh
   curl -fsSL https://deno.land/install.sh | sh
   ```
   **Windows**: Pobierz i zainstaluj Deno ze strony [https://deno.land/](https://deno.land/).

2️⃣ **Sklonuj repozytorium**:
   ```sh
   git clone https://github.com/MacPal2002/ans-nt-dziekanat-scrapper.git
   cd scrapper
   ```

3️⃣ **Dodaj dane logowania**:
   Utwórz plik `.env` i wpisz:
   ```sh
   USERNAME=TwojeLogin
   PASSWORD=TwojeHaslo
   ```

---

## 📝 Użycie
📌 **Pobranie planu zajęć dla konkretnej daty**:
```sh
   deno run start YYYY-MM-DD
```

📌 **Dostęp do wygenerowanych plików**:
Pliki CSV zapisują się automatycznie w folderze `data/schedules` np:
```
/data/schedules/YYYY-MM-DD.csv
```

## 📜 Licencja
Projekt jest dostępny na licencji **MIT**.
