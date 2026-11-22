import type { Lang } from './data';
type T = Record<Lang, string>;
const t = (en: string, de: string, pl: string, cs: string, nl: string, fr: string): T => ({ en, de, pl, cs, nl, fr });

// Pharmacy-style suggestions made from items already in the list. No prices, no offers.
export const SETS = {
    h: t('Pick a set', 'Ein Set wählen', 'Wybierz zestaw', 'Vyberte si set', 'Kies een set', 'Choisir un duo'),
    sub: t('Two items that go together. Add both to your list in one tap.', 'Zwei Artikel, die zusammenpassen. Beide mit einem Tipp zur Liste.', 'Dwa produkty, które do siebie pasują. Dodaj oba jednym dotknięciem.', 'Dva produkty, které k sobě patří. Přidejte oba jedním klepnutím.', 'Twee producten die goed samengaan. Voeg beide toe met één tik.', 'Deux articles qui vont ensemble. Ajoutez les deux d’un geste.'),
    add: t('Add both', 'Beide hinzufügen', 'Dodaj oba', 'Přidat oba', 'Beide toevoegen', 'Ajouter les deux'),
    added: t('Added', 'Hinzugefügt', 'Dodano', 'Přidáno', 'Toegevoegd', 'Ajouté'),
    items: [
        { id: 'beach', ids: ['sun-03', 'after-01'], title: t('Beach day', 'Strandtag', 'Dzień na plaży', 'Den na pláži', 'Stranddag', 'Jour de plage'), line: t('Sun protection and after sun', 'Sonnenschutz und After Sun', 'Ochrona przed słońcem i po opalaniu', 'Ochrana před sluncem a po opalování', 'Zonbescherming en after sun', 'Protection solaire et après-soleil') },
        { id: 'hair', ids: ['vatika-olive', 'hair-07'], title: t('Hair care', 'Haarpflege', 'Pielęgnacja włosów', 'Péče o vlasy', 'Haarverzorging', 'Soin des cheveux'), line: t('Vatika shampoo and hair oil', 'Vatika Shampoo und Haaröl', 'Szampon i olejek Vatika', 'Vatika šampon a olej na vlasy', 'Vatika shampoo en haarolie', 'Shampooing et huile Vatika') },
        { id: 'fresh', ids: ['deo-47', 'deo-22'], title: t('Stay fresh', 'Frisch bleiben', 'Świeżość', 'Svěžest', 'Fris blijven', 'Fraîcheur'), line: t('Roll-on and body mist', 'Roll-on und Body Mist', 'Roll-on i mgiełka do ciała', 'Roll-on a tělová mlha', 'Roll-on en bodymist', 'Roll-on et brume pour le corps') },
    ],
};

export const STEPS = {
    h: t('How it works', 'So funktioniert es', 'Jak to działa', 'Jak to funguje', 'Hoe het werkt', 'Comment ça marche'),
};

export const MEDS = t(
    'Medicines are not listed on this site. For anything else you need from the pharmacy, ask us on WhatsApp.',
    'Arzneimittel sind auf dieser Seite nicht aufgeführt. Für alles andere aus der Apotheke fragen Sie uns per WhatsApp.',
    'Leki nie są wymienione na tej stronie. W sprawie czegokolwiek innego z apteki napisz do nas na WhatsApp.',
    'Léky na těchto stránkách nejsou uvedeny. S čímkoli dalším z lékárny se obraťte na nás přes WhatsApp.',
    'Geneesmiddelen staan niet op deze site. Voor al het andere uit de apotheek kun je ons via WhatsApp vragen.',
    'Les médicaments ne sont pas listés sur ce site. Pour tout autre besoin de la pharmacie, écrivez-nous sur WhatsApp.');

export const POINTS = [
    { title: t('Long opening hours', 'Lange Öffnungszeiten', 'Długie godziny otwarcia', 'Dlouhá otevírací doba', 'Lange openingstijden', 'Longues heures d’ouverture'), body: t('Ask the pharmacy on WhatsApp for today’s hours.', 'Fragen Sie die Apotheke per WhatsApp nach den heutigen Zeiten.', 'Zapytaj aptekę na WhatsApp o dzisiejsze godziny.', 'Zeptejte se lékárny na WhatsApp na dnešní hodiny.', 'Vraag de apotheek via WhatsApp naar de uren van vandaag.', 'Demandez les horaires du jour à la pharmacie sur WhatsApp.') },
    { title: t('Inside the resort', 'Im Resort', 'W resorcie', 'Přímo v resortu', 'In het resort', 'Dans le resort'), body: t('No taxi and no trip into town. Collect at the pharmacy inside the resort.', 'Kein Taxi, keine Fahrt in die Stadt. Abholung in der Apotheke im Resort.', 'Bez taksówki i wyjazdu do miasta. Odbiór w aptece na terenie resortu.', 'Žádný taxík ani cesta do města. Vyzvednutí v lékárně v resortu.', 'Geen taxi en geen rit naar de stad. Ophalen bij de apotheek in het resort.', 'Pas de taxi ni de trajet en ville. Retrait à la pharmacie du resort.') },
    { title: t('Browse in your language', 'In Ihrer Sprache stöbern', 'Przeglądaj w swoim języku', 'Prohlížejte ve svém jazyce', 'Bekijk in jouw taal', 'Parcourez dans votre langue'), body: t('This website is available in English, German, Polish, Czech, Dutch and French.', 'Diese Website gibt es auf Englisch, Deutsch, Polnisch, Tschechisch, Niederländisch und Französisch.', 'Ta strona jest dostępna po angielsku, niemiecku, polsku, czesku, niderlandzku i francusku.', 'Tyto stránky jsou k dispozici v angličtině, němčině, polštině, češtině, nizozemštině a francouzštině.', 'Deze website is beschikbaar in het Engels, Duits, Pools, Tsjechisch, Nederlands en Frans.', 'Ce site est disponible en anglais, allemand, polonais, tchèque, néerlandais et français.') },
];

export const VISIT = t(
    'Prefer to see it in person? The pharmacy is inside the resort.',
    'Lieber persönlich ansehen? Die Apotheke befindet sich im Resort.',
    'Wolisz zobaczyć na miejscu? Apteka znajduje się na terenie resortu.',
    'Chcete si to prohlédnout osobně? Lékárna je v resortu.',
    'Liever het zelf zien? De apotheek is in het resort.',
    'Vous préférez voir sur place ? La pharmacie est dans le resort.');
