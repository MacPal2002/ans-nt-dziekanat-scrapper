import { login } from "./services/login.ts";
import { fetchSchedule } from "./services/fetchSchedule.ts";
import { loadSession, saveSession } from "./utils/session.ts";
import { PASSWORD, LOGIN } from "./config/credentials.ts";


const TARGET_DATE = "2025-01-07";

async function main() {
    console.log(`🚀 Sprawdzam sesję dla użytkownika ${LOGIN}...`);

    let sessionData = await loadSession(LOGIN);
    
    if (!sessionData) {
        console.log("🔑 Brak zapisanej sesji, logowanie...");
        sessionData = await login(LOGIN, PASSWORD);

        if (!sessionData) {
            console.error("❌ Nie udało się zalogować. Sprawdź dane logowania.");
            return;
        }

        await saveSession(LOGIN, sessionData);
    }

    let { sessionCookie, userId } = sessionData;
    console.log("🎟  Sesja:", sessionCookie);
    console.log("👤 ID użytkownika:", userId);

    const scheduleSuccess = await fetchSchedule(sessionCookie, userId, TARGET_DATE);

    if (!scheduleSuccess) {
        console.log("🔄 Logowanie ponowne...");
        sessionData = await login(LOGIN, PASSWORD);

        if (!sessionData) {
            console.error("❌ Logowanie ponowne nie powiodło się.");
            return;
        }

        await saveSession(LOGIN, sessionData);
        sessionCookie = sessionData.sessionCookie;
        userId = sessionData.userId;

        console.log("✅ Nowa sesja pobrana!");
        await fetchSchedule(sessionCookie, userId, TARGET_DATE);
    }
}

main();
