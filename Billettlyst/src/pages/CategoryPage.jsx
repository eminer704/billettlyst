import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import ArtistCard from '../components/ArtistCard';

// API-nøkkelen hentes fra miljøvariabler (.env)
const API_KEY = import.meta.env.VITE_TM_API_KEY;

function CategoryPage() {
    // Henter kategori-slug fra URL, f.eks. "musikk" eller "sport"
    const { slug } = useParams();

    // Lager state for arrangementer og attraksjoner i denne kategorien
    const [events, setEvents] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Henter arrangementer fra Ticketmaster API basert på kategori (slug)
        fetch("/api/discovery/v2/events.json?keyword=" + slug + "&size=3&apikey=" + API_KEY)
            .then(res => res.json())
            .then(data => {
                if (data && data._embedded && data._embedded.events) {
                    setEvents(data._embedded.events); // Lagrer arrangementene i state
                } else {
                    setEvents([]);
                }
            })
            .catch(() => setEvents([]));

        // Henter attraksjoner fra samme kategori (bruker samme søkeord)
        fetch("/api/discovery/v2/attractions.json?keyword=" + slug + "&size=3&apikey=" + API_KEY)
            .then(res => res.json())
            .then(data => {
                if (data && data._embedded && data._embedded.attractions) {
                    setAttractions(data._embedded.attractions); // Lagrer attraksjonene i state
                } else {
                    setAttractions([]);
                }
            })
            .catch(() => setAttractions([]));

        // Fjerner "laster"-status
        setLoading(false);
    }, [slug]);

    // Gjør første bokstav stor i kategorinavnet (bare for visning)
    const capitalizedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <main className="page-wrapper">
            <h1>{capitalizedSlug}</h1>

            {/* Viser lastemelding hvis innhold ikke er klart ennå */}
            {loading ? (
                <p>Laster inn kategori...</p>
            ) : (
                <>
                    <section className="section-spacing">
                        <h2>Attraksjoner</h2>
                        <div className="card-grid">
                            {/* Viser attraksjoner i kortformat */}
                            {attractions.length > 0 ? (
                                attractions.map(attraction => {
                                    const image = attraction?.images?.[0]?.url;
                                    const genre = attraction?.classifications?.[0]?.genre?.name;

                                    return (
                                        <ArtistCard
                                            key={attraction.id}
                                            name={attraction.name}
                                            image={image}
                                            genre={genre}
                                        />
                                    );
                                })
                            ) : (
                                <p>Ingen attraksjoner funnet.</p>
                            )}
                        </div>
                    </section>

                    <section className="section-spacing">
                        <h2>Arrangementer</h2>
                        <div className="card-grid">
                            {/* Viser arrangementer i kortformat (ikke klikkbare her) */}
                            {events.length > 0 ? (
                                events.map(event => {
                                    const image = event?.images?.[0]?.url;
                                    return (
                                        <EventCard
                                            key={event.id}
                                            id={event.id}
                                            name={event.name}
                                            image={image}

                                        />
                                    );
                                })
                            ) : (
                                <p>Ingen arrangementer funnet.</p>
                            )}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}

export default CategoryPage;
