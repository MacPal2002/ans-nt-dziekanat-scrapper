import { AJAX_URL } from "../config/urls.ts";
import { ScheduleItem } from "../models/schedule.ts";
import { getStartOfWeekTimestamp, getDateTimestamp, formatTime, formatDate } from "../utils/dateUtils.ts";

export async function fetchSchedule(sessionCookie: string, userId: string, targetDate: string): Promise<boolean> {
    console.log(`📥 Pobieranie planu zajęć dla dnia: ${targetDate}...`);

    const weekStartTimestamp = getStartOfWeekTimestamp(targetDate);
    const targetTimestamp = getDateTimestamp(targetDate);

    const response = await fetch(AJAX_URL, {
        method: "POST",
        headers: {
            "Cookie": `JSESSIONID=${sessionCookie}`,  // 🔹 Dynamiczna sesja
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
        },
        body: JSON.stringify({
            service: "Planowanie",
            method: "getUlozoneTerminyOsoby",
            params: {
                idOsoby: userId,
                poczatekTygodnia: weekStartTimestamp
            }
        }),
    });

    if (!response.ok) {
        console.error(`❌ Błąd: ${response.status} - ${await response.text()}`);
        return false;
    }

    const data = await response.json();
    // console.log("📜 Otrzymane dane:", data);

    // 🔥 Sprawdzenie błędów sesji
    if (data?.exceptionClass === "java.lang.SecurityException") {
        console.error("❌ Sesja wygasła lub jest nieprawidłowa.");
        return false;
    }

    let scheduleItems: ScheduleItem[] = data?.returnedValue?.items || [];

    // 🔹 Filtracja według konkretnego dnia
    scheduleItems = scheduleItems.filter(item => {
        const zajeciaDate = getDateTimestamp(new Date(item.dataRozpoczecia).toISOString().split("T")[0]);
        return zajeciaDate === targetTimestamp;
    });

    if (scheduleItems.length === 0) {
        console.log("ℹ️ Brak zajęć do wyświetlenia.");
        return true;
    }


    // 🔹 **Sortowanie według godziny rozpoczęcia**
    scheduleItems.sort((a, b) => a.dataRozpoczecia - b.dataRozpoczecia);

    // 🔹 Przetwarzanie danych do CSV w formacie zgodnym z Twoim modelem `Schedule`
    const csvData = scheduleItems.map((item: ScheduleItem) => [
        item.idSpotkania?.idSpotkania ?? "Brak",                      // id
        formatDate(targetDate),                                       // day
        formatTime(item.dataRozpoczecia),                             // startTime
        formatTime(item.dataZakonczenia),                             // endTime
        item.nazwaPelnaPrzedmiotu,                                    // subject
        item.grupyDziekanskie?.[0]?.nazwaCyklu ?? "Brak",             // year (np. 1,2,3,4)
        item.sale.length > 0 ? item.sale[0].nazwaSkrocona : "Brak",   // classroom
        item.wykladowcy.length > 0 ? item.wykladowcy[0].stopienImieNazwisko : "Nieznany", // teacher
        item.grupyDziekanskie?.[0]?.nazwaGrupy ?? "Brak"              // group
    ].join(",")).join("\n");

    // 🔹 Nagłówki CSV zgodne z modelem
    const csvHeader = "id,day,startTime,endTime,subject,year,classroom,teacher,group\n";
    const csvContent = csvHeader + csvData;

    const fileName = `${targetDate}.csv`;
    await Deno.writeTextFile(`./data/schedules/${fileName}`, csvContent);
    console.log(`✅ Dane zapisane jako ${fileName}.`);

    return true;
}
