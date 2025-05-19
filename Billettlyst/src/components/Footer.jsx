import React from 'react';

function Footer() {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f2f2f2' }}>
            <p>
                Data hentet fra{' '}
                <a href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer">
                    Ticketmaster API
                </a>
                .
            </p>
        </footer>
    );
}

export default Footer;
