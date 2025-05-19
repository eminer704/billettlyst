function Dashboard() {
    return (
        <main className="page-wrapper">
            <section>
                <h1>Logg inn</h1>
                <form>
                    <input type="text" placeholder="Brukernavn" />
                    <input type="password" placeholder="Passord" />
                    <button type="submit">Logg inn</button>
                </form>
            </section>
        </main>
    );
}

export default Dashboard;

