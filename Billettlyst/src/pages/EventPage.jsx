import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Henter API-nøkkelen fra .env
const API_KEY = import.meta.env.VITE_TM_API_KEY;

function EventPage() {
    // Bruker URL-parameteret "id" for å vite hvilket event som skal hentes
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // Henter detaljer om et spesifikt arrangement basert på ID
                const url = "/api/discovery/v2/events/" + id + ".json?apikey=" + API_KEY;
                const res = await fetch(url);
                const data = await res.json();
                setEvent(data); // Lagrer arrangementet i state
            } catch (error) {
                // Viser feilmelding i konsollen hvis API-kallet feiler
                console.error("API-feil:", error);
                setEvent(null);
            } finally {
                setLoading(false); // Skjuler "laster"-melding uansett resultat
            }
        };

        fetchEvent();
    }, [id]);

    // Viser lastemelding mens data hentes
    if (loading) {
        return <p>Laster inn arrangement...</p>;
    }

    // Hvis event ikke finnes (f.eks. feil ID), vises feilmelding
    if (!event) {
        return <p>Arrangement ikke funnet.</p>;
    }

    // Henter ut forskjellige felt fra event-data
    const name = event && event.name ? event.name : "Uten navn";
    const image = event && event.images && event.images[0] && event.images[0].url;
    const date = event && event.dates && event.dates.start && event.dates.start.localDate;
    const time = event && event.dates && event.dates.start && event.dates.start.localTime;

    // Bygger opp sted som tekst basert på tilgjengelig info
    let location = "Ukjent sted";
    if (
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
    }

    const info = event && event.info;
    const ticketUrl = event && event.url;

    return (
        <main className="page-wrapper">
            <article>
                <header>
                    {/* Viser navnet på arrangementet */}
                    <h1>{name}</h1>
                </header>

                {/* Viser bilde hvis det finnes */}
                {image && (
                    <img
                        src={image}
                        alt={name}
                        className="event-image-large"
                    />
                )}

                <section>
                    {/* Viser dato, tid, sted og annen info */}
                    <p><strong>Dato:</strong> {date} {time ? "kl. " + time : ""}</p>
                    <p><strong>Sted:</strong> {location}</p>
                    {info && <p><strong>Beskrivelse:</strong> {info}</p>}
                    {ticketUrl && (
                        <p>
                            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                                Kjøp billetter
                            </a>
                        </p>
                    )}
                </section>
            </article>
        </main>
    );
}

export default EventPage;
