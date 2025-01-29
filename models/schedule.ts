export interface ScheduleItem {
    idSpotkania: { idSpotkania: number } | null;
    nazwaPelnaPrzedmiotu: string;
    nazwaSkroconaPrzedmiotu: string;
    godzinyPlanowane: number;
    dataRozpoczecia: number;
    dataZakonczenia: number;
    sale: { nazwaSkrocona: string }[];
    wykladowcy: { stopienImieNazwisko: string }[];
    grupyDziekanskie?: { nazwaCyklu?: string; nazwaGrupy?: string }[];
}