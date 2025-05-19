# Eksamen – Billettlyst (gruppe 19)

Vanskelighetsgrad

Jeg har valgt å levere på nivå D, og har kun implementert kravene som gjelder for karakter E og D.
Jeg har jobbet alene i gruppen, og på grunn av begrenset tid og kapasitet har jeg valgt å fokusere på å oppfylle D-kravene så grundig som mulig.

---

## GitHub-bruker

eminer704 = Muhammed Emin Ercetin

---

## GitHub-repo

https://github.com/eminer704/billettlyst

---

## Forutsetninger og redegjørelser

De festivalene som er nevnt i eksamensoppgaven (Findings, Neon, Skeikampenfestivalen, Tons of Rock) returnerer ikke data fra Ticketmaster Discovery API. Jeg forsøkte også ulike variasjoner av navnene, som:

  * "Findings Festival"
  * "Findings 2025"
  * "Neon Festival"
  * "Skeikampenfestival"
  * "Tons of Rock Oslo"
  * "Tons of Rock 2025"

  Til tross for disse forsøkene returnerte API-et fortsatt ingen gyldige events. Derfor har jeg valgt å bruke andre arrangementer som faktisk gir resultater fra API-et, slik som Oktoberfest 2025 og Tundra and Lightning.

* Dashboard-siden inneholder kun et enkelt innloggingsskjema uten reell funksjonalitet, i tråd med kravene for karakter E.

---

## Potensielle utfordringer

* Ticketmaster API returnerte ofte `429 Too Many Requests`. Jeg måtte derfor teste med færre arrangementer og legge inn forsinkelse mellom kallene.
* Jeg har kun implementert komponenter og routing i tråd med E- og D-krav, og utelatt ønskeliste, byvalg, filtrering og ekstra seksjoner som tilhører høyere vanskelighetsnivå.

---

## Redegjørelser og forutsetninger

* Oppgaveteksten kunne med fordel spesifisert arrangementer som faktisk finnes i Ticketmaster sitt API, for eksempel kjente og pågående festivaler. Dette ville gjort det lettere å jobbe med API-et uten å bruke mye tid på feilsøking og manuelle søk.

* Demo-videoen burde også vært mer detaljert. Den viser strukturen og utseendet, men forklarer ikke tydelig hvilke brukerhandlinger som skal knyttes til hvilke karakterkrav (E, D, C osv.). En trinnvis forklaring i videoen ville vært mer hjelpsom for å forstå hva som forventes i praksis.

---

## Kilder til dokumentasjon

* https://developer.ticketmaster.com/
* https://reactrouter.com/
* [Vite Config](https://vitejs.dev/config/)
* [Stack Overflow – Proxy-løsning](https://stackoverflow.com/questions/64677212/how-to-configure-proxy-in-vite)

---

## Bruk av AI

Jeg har brukt ChatGPT (GPT-4) som støtteverktøy under utviklingen.

Prompter brukt:

* "Hvordan løser man 429-feil med Ticketmaster API?"
* "Hvordan løser man CORS-problemer med API i Vite?"
* "Hvordan henter man tryggest ut nested data fra et API som kanskje mangler noen felt?"

---

Svar – AI bruk: 

1. "HTTP 429 betyr at du har sendt for mange forespørsler til API-et på kort tid, og at serveren midlertidig blokkerer deg for å beskytte seg mot overbelastning.Ticketmaster har rate limits som ikke er offentlig spesifisert, men det anbefales å:Hente færre arrangementer
Begrense antall søk og legge inn pauser mellom dem
Cache resultater lokalt under utvikling"

2. \CORS-feilen oppstår fordi nettleseren blokkerer kall til eksterne domener. Du kan løse dette lokalt ved å bruke en proxy i vite.config.js slik at du ruter kallene via /api

Det var en god råd fra AI og gjørde tilleg search på google og fant veldig nyttig info på Stackoverflow som er lagt som en kilde.\

3. \Når du jobber med eksterne API-er, bør du aldri anta at alle feltene alltid er til stede. For å unngå at applikasjonen krasjer ved `undefined`, kan du:
Bruke `if`-sjekker på hvert nivå før du henter verdier
Alternativt bruke `optional chaining (?.)` i moderne JavaScript
Eksempel med if:

```js
if (data && data.details && data.details.city) {
  const city = data.details.city.name;
}
```
Eksempel med optional chaining:

```js
const city = data?.details?.city?.name; \
```

Jeg brukte disse prinsippene til å skrive robust kode for visning av sted i `EventPage.jsx`. Her det koden jeg utviklet ut i fra rådet fra AI:
(if (
        event &&
        event._embedded &&
        event._embedded.venues &&
        event._embedded.venues[0]
    ) {
        const venue = event._embedded.venues[0];
        const venueName = venue.name || "";
        const city = venue.city && venue.city.name ? venue.city.name : "";
        const country = venue.country && venue.country.name ? venue.country.name : "";
        location = venueName + ", " + city + ", " + country;
    })


---

Hvorfor jeg brukte AI:

AI ble brukt for å:

1.Forstå API-begrensninger og feil
2.Forbedre datatilgang og feilhåndtering
3.Skrive robuste kod.


AI fungerte som en slags "medveileder" gjennom utviklingsprosessen.
