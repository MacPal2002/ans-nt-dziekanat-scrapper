const SESSION_FILE = "./data/session.json";

// 📥 Wczytuje sesje dla wszystkich użytkowników
export async function loadSessions(): Promise<{ [login: string]: { sessionCookie: string, userId: string } }> {
    try {
        const data = await Deno.readTextFile(SESSION_FILE);
        return JSON.parse(data);
    // deno-lint-ignore no-unused-vars
    } catch (error) {
        console.log("ℹ️ Brak pliku sesji lub nie można odczytać.");
        return {};
    }
}

// 📥 Wczytuje sesję dla konkretnego loginu
export async function loadSession(login: string): Promise<{ sessionCookie: string, userId: string } | null> {
    const sessions = await loadSessions();
    return sessions[login] || null;
}

// 💾 Zapisuje sesję dla danego loginu
export async function saveSession(login: string, sessionData: { sessionCookie: string, userId: string }) {
    const sessions = await loadSessions();
    sessions[login] = sessionData;
    await Deno.writeTextFile(SESSION_FILE, JSON.stringify(sessions, null, 2));
    console.log(`💾 Sesja dla użytkownika ${login} zapisana do pliku.`);
}
