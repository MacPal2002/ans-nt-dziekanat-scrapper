import { LOGIN_URL } from "../config/urls.ts";

export async function login(login: string, password: string): Promise<{ sessionCookie: string, userId: string } | null> {
    console.log("🔑 Logowanie...");

    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
        },
        body: new URLSearchParams({ login: login, password: password })
    });

    // 📜 Pobierz treść odpowiedzi (ważne do sprawdzenia ID użytkownika)
    const responseBody = await response.text();
    // console.log("📜 Otrzymane dane:", responseBody);

    // 🔹 Pobranie ciasteczka sesji JSESSIONID
    const setCookie = response.headers.get("set-cookie");
    if (!setCookie || !setCookie.includes("JSESSIONID")) {
        console.error("❌ Logowanie nie powiodło się: Brak ciasteczka sesji.");
        return null;
    }

    const sessionMatch = setCookie.match(/JSESSIONID=([^;]+)/);
    const sessionCookie = sessionMatch ? sessionMatch[1] : null;

    if (!sessionCookie) {
        console.error("❌ Nie udało się pobrać JSESSIONID.");
        return null;
    }

    console.log("✅ Logowanie udane!");

    // 🔹 Pobranie ID użytkownika ze strony po zalogowaniu
    const userId = extractUserId(responseBody);
    if (!userId) {
        console.error("❌ Nie udało się pobrać ID użytkownika.");
        return null;
    }
    return { sessionCookie, userId };
}

// 🔍 Funkcja do wyciągnięcia ID użytkownika z HTML-a
function extractUserId(html: string): string | null {
    const userIdMatch = html.match(/idosoby=(\d+)/);
    return userIdMatch ? userIdMatch[1] : null;
}
