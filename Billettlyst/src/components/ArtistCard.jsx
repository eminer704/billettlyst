function ArtistCard({ name, image }) {
    return (
        <div className="artist-card">
            <img
                src={image}
                alt={name}
                className="artist-image"
            />
            <h4>{name}</h4>
        </div>
    );
}

export default ArtistCard;
