# Wprowadzenie

Jest to repozytorium zawierające przykładowy projekt z wykorzystaniem node.js oraz mongoDB. Jego celem jest praktyka zabezpieczania aplikacji internetowych.

Plan projektu:

- Instalacja projektu
- Wprowadzenie do struktury projektu
- zad. 0 (konfiguracyjne)

## Instalacja projektu

1. Pobierz projekt za pomocą komendy:

```bash
git clone https://github.com/bpajor/payouts-tracker.git
```

2. Zainstaluj niezbędne biblioteki:

```bash
npm install
```

## Wprowadzenie do struktury projektu

- ### App.js

Jest to główny plik, w którym uruchamiany jest serwer. Do niego importujemy pozostałe niezbędne pliki.

- ### controllers/controllers.js

Jest to plik w którym znajdują się tzw. 'controllers' które służą do obsługiwania endpointów. Tutaj można np. odczytać dane z requestu czy też wysłać zapytanie do bazy danych.

- ### routes/routes.js

Jest to plik służący do "wyłapywania" danych requestów, w tym pliku będziemy dokonywać walidacji pól.

- ### views

Jest to folder w którym znajdują się templatki ejs (ejs to html z możliwością wstawiania dynamicznej zawartości).

- ### package.json

Jest to plik konfiguracyjny, w którym znajdują się odnośniki do zainstalowanych paczek, różne skrypty itd.

## Zad. 0 (konfiguracyjne)

Celem tego zadania jest założenie konta w MongoDB (nierelacyjnej bazie danych). Oto wymagane kroki:

1. Przejdź na stronę: [Stwórz konto w MongoDB](https://account.mongodb.com/account/register)

2. Stwórz konto za pomocą konta google, github lub domyślnie kontem e-mail:

![Zakładanie konta](image-1.png)

3. Wypełnij początkowy dialog:

![Początkowy dialog](image-2.png)

4. Powinien wyświetlić się dialog z wyborem parametrów bazy. Wybieramy opcję darmową:

![Wybór parametrów bazy](image-3.png)

5. Trafiamy na dialog z ustawieniami konta:

![Ustawienia konta](image-4.png)

Ustawiamy swój login oraz hasło. Klikamy 'Create user'.

W drugim kroku na tej stronie kliknij "Add My Current IP Address"

![Ustawienia adresu](image-5.png)

Na dole strony kliknij "Finish and close".

Stworzyliśmy bazę danych z której będziemy mogli korzystać w następnych krokach.
