# SpaceLaunchApp

## Korte projectbeschrijving

SpaceLaunchApp is een kleine React Native (Expo) applicatie die aankomende lanceringen ophaalt en toont in een lijst. Je kunt zoeken, filteren op status en sorteren op naam of starttijd. De app gebruikt de openbare TheSpaceDevs API voor lanceerdata.

## github repository

- Repository URL: `https://github.com/kobeDespeghel/MobileApp1-SpaceLaunchApp`

## Gebruikte API

De app gebruikt TheSpaceDevs (lokale dev endpoint) API:

- Basis-URL: `https://lldev.thespacedevs.com/2.3.0`
- Je kan de base-URL aanpassen naar `https://ll.thespacedevs.com/2.3.0` in het bestand `settings.json` voor een beter api performance (max 15 calls/uur)

Belangrijke endpoints gebruikt in deze app:

- Lijst van aankomende lanceringen (searchable):

  - Endpoint: `GET /launches/upcoming`
  - Voorbeeld full URL (gebruikt in de helper):
    `https://lldev.thespacedevs.com/2.3.0/launches/upcoming?mode=list&limit=100&offset=0&search=<zoekterm>`
  - Parameters:
    - `search` (optioneel): zoekterm voor launch naam/velden
    - `status` (optioneel): filter op launch status
    - `limit` (optioneel): maximaal aantal resultaten
    - `offset` (optioneel): paginatie offset

- Detail van een launch:

  - Endpoint: `GET /launches/{id}`
  - Voorbeeld: `https://lldev.thespacedevs.com/2.3.0/launches/9d3f...`

- Statussen lijst:
  - Endpoint: `GET /config/launch_statuses/`
  - Voorbeeld: `https://lldev.thespacedevs.com/2.3.0/config/launch_statuses/`

## Run-instructies

Vereisten:

- Node.js en npm geïnstalleerd

Installeren en starten:

```powershell
cd SpaceLaunchApp
npm i
npm start
```

Gebruik de Expo Go app of een emulator om de app te bekijken.

## Zoeken en sorteren (korte uitleg)

- Zoeken:

  - In de Home screen staat een zoekveld. Bij indrukken van Enter (of bij verlies van focus) wordt een nieuwe API-aanvraag gestuurd naar het `launches/upcoming` endpoint met de zoekterm in de `search` query-parameter.

- Sorteren:

  - Sorteren gebeurt client-side in de component `LaunchList`.
  - Er zijn twee sorteervelden:
    - `Name` (alfabetisch op `name`)
    - `Start` (op `startwindow`)
  - De sorteerrichting kan toggled worden tussen `ascending` en `descending`.
  - Sortering verandert alleen de volgorde van de reeds opgehaalde resultaten; er wordt geen nieuwe API-aanvraag gedaan voor sortering. (zou via api enkel mogelijk zijn via naam)

- Filteren op status:
  - De lijst van statussen wordt uit de api gehaald bij het laden van de Home screen.
  - Als een status is geselecteerd wordt er een nieuwe API-aanvraag gestuurd naar het `launches/upcoming` endpoint met de geselecteerde status in de `status` query-parameter.
  - Je kunt `All` kiezen om alle resultaten te zien, of een specifieke status om te filteren.
