import type { Lang } from '../data';

type T = Record<Lang, string>;
const t = (en: string, de: string, pl: string, cs: string, nl: string, fr: string, it: string): T => ({ en, de, pl, cs, nl, fr, it });

// The four steps of the guest journey, led by Cleopatra in the scroll story on the home page.
// English wording is fixed by the brief. Other languages are drafts for pharmacy review.
// `word` is the short word shown in large type behind Cleopatra (decorative, hidden from screen readers).
export const LIVE = {
    stepsH: t('How it works', 'So funktioniert es', 'Jak to działa', 'Jak to funguje', 'Hoe het werkt', 'Comment ça marche', 'Come funziona'),
    steps: [
        {
            word: t('Browse', 'Stöbern', 'Przeglądaj', 'Prohlížejte', 'Bekijken', 'Parcourir', 'Sfoglia'),
            body: t(
                'Browse the range in your own language.',
                'Stöbern Sie im Sortiment in Ihrer eigenen Sprache.',
                'Przeglądaj ofertę we własnym języku.',
                'Prohlédněte si nabídku ve svém vlastním jazyce.',
                'Bekijk het aanbod in je eigen taal.',
                'Parcourez la sélection dans votre propre langue.',
                'Sfoglia l’assortimento nella tua lingua.'),
        },
        {
            word: t('Send', 'Senden', 'Wyślij', 'Odeslat', 'Versturen', 'Envoyer', 'Invia'),
            body: t(
                'Send your list on WhatsApp (nothing is paid or ordered online).',
                'Senden Sie Ihre Liste per WhatsApp (es wird nichts online bezahlt oder bestellt).',
                'Wyślij swoją listę przez WhatsApp (nic nie jest płatne ani zamawiane online).',
                'Pošlete svůj seznam přes WhatsApp (nic se neplatí ani neobjednává online).',
                'Stuur je lijst via WhatsApp (er wordt niets online betaald of besteld).',
                'Envoyez votre liste sur WhatsApp (rien n’est payé ni commandé en ligne).',
                'Invia la tua lista su WhatsApp (nulla viene pagato o ordinato online).'),
        },
        {
            word: t('Prepare', 'Vorbereiten', 'Przygotowanie', 'Příprava', 'Klaarmaken', 'Préparer', 'Preparazione'),
            body: t(
                'The pharmacy confirms on WhatsApp and prepares the items.',
                'Die Apotheke bestätigt per WhatsApp und bereitet die Artikel vor.',
                'Apteka potwierdza na WhatsApp i przygotowuje produkty.',
                'Lékárna potvrdí na WhatsApp a připraví zboží.',
                'De apotheek bevestigt via WhatsApp en maakt de artikelen klaar.',
                'La pharmacie confirme sur WhatsApp et prépare les articles.',
                'La farmacia conferma su WhatsApp e prepara i prodotti.'),
        },
        {
            word: t('Pick up', 'Abholen', 'Odbiór', 'Vyzvednutí', 'Ophalen', 'Retirer', 'Ritiro'),
            body: t(
                'Pick up at the pharmacy inside the resort.',
                'Holen Sie alles in der Apotheke im Resort ab.',
                'Odbierz w aptece na terenie resortu.',
                'Vyzvedněte si vše v lékárně v areálu resortu.',
                'Haal alles op bij de apotheek in het resort.',
                'Retirez vos articles à la pharmacie dans le resort.',
                'Ritira i prodotti in farmacia, all’interno del resort.'),
        },
    ],
};
