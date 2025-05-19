import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

// API-nøkkelen lagres i .env-filen for sikkerhet
const API_KEY = import.meta.env.VITE_TM_API_KEY;

function Home() {
    // Lager state for festivalene vi henter fra API-et
    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        const fetchFestivals = async () => {
            // Her har jeg lagt inn en liste med festivals jeg vil vise.
            /* De fire festivalene som er nevnt i eksamensoppgaven – Findings, Neon, Skeikampenfestivalen 
             og Tons of Rock – returnerer ikke data fra Discovery API.*/
            /* Derfor har jeg også lagt til andre arrangementer som faktisk gir gyldige svar fra API-et, 
            slik at forsiden ikke blir tom.*/
            const festivalNavn = [
                'Findings',
                'Neon',
                'Skeikampenfestivalen',
                'Tons of Rock',
                'Tundra and Lightning',
                'Whitsun Festival',
                'Oslo Chamber Choir',
                'Oktoberfest 2025',
                'Sweden Rock Festival 2025',

            ];

            const results = [];

            // Løper gjennom hver festival og søker etter dem via API
            for (let i = 0; i < festivalNavn.length; i++) {
                const name = festivalNavn[i];
                try {
                    const url = "/api/discovery/v2/events.json?keyword=" + encodeURIComponent(name) + "&apikey=" + API_KEY;

                    const res = await fetch(url);
                    const data = await res.json();

                    // Brukte dette til å teste under utvikling
                    console.log(`Søk: ${name}`);
                    console.log("Rådata:", data);

                    let event = null;
                    if (
                        data &&
                        data._embedded &&
                        data._embedded.events &&
                        data._embedded.events[0]
                    ) {
                        event = data._embedded.events[0];
                        console.log(`Fant event for "${name}":`, event.name);
                    } else {
                        console.warn(`Ingen event funnet for "${name}"`);
                    }

                    if (event) {
                        results.push(event);
                    }
                } catch (error) {
                    // Hvis API-feil oppstår, vises det i konsollen
                    console.error("API-feil:", error);
                }
            }

            // Lagrer festivalene som ble hentet fra API-et i state
            setFestivals(results);
        };

        fetchFestivals();
    }, []);

    return (
        <main className="page-wrapper">
            <h1>Billettlyst</h1>
            <section aria-labelledby="festivaloversikt">
                <h2 id="festivaloversikt">Utvalgte festivaler</h2>
                <div className="event-list">
                    {festivals.length > 0 ? (
                        festivals.map((event) => {
                            let imageUrl = '';
                            if (
                                event &&
                                event.images &&
                                event.images[0] &&
                                event.images[0].url
                            ) {
                                imageUrl = event.images[0].url;
                            }

                            // Viser hvert event som et kort med bilde og navn
                            return (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    image={imageUrl}
                                />
                            );
                        })
                    ) : (
                        <p>Laster inn festivaler...</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Home;
