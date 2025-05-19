import { Link } from 'react-router-dom';

// Komponent som viser et enkelt arrangement i kortformat
function EventCard({ id, name, image }) {
    return (
        <div className="event-card">
            {/* Viser bilde av arrangementet */}
            <img
                src={image}
                alt={name}
                className="event-image"
            />

            <h3>{name}</h3>

            <Link to={`/event/${id}`}>Se mer</Link>
        </div>
    );
}

export default EventCard;
