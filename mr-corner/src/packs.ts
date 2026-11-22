import honey from './photos/eva-honey.jpg';
import glyc from './photos/eva-glyc.jpg';
import soft from './photos/eva-soft.jpg';
import yog from './photos/eva-yog.jpg';
import oCyl from './photos/orga-cyl.jpg';
import oYel from './photos/orga-yel.jpg';
import oChar from './photos/orga-char.jpg';
import oAlgae from './photos/orga-algae.jpg';
import oGold from './photos/orga-gold.jpg';
import oRsa from './photos/orga-rsa.jpg';
import oShea from './photos/orga-shea.jpg';
import lMocha from './photos/lot-mocha.jpg';
import lCoco from './photos/lot-coco.jpg';
import lBerry from './photos/lot-berry.jpg';
import lPeach from './photos/lot-peach.jpg';
import lPassion from './photos/eva-passion-ai.jpg';
import type { Lang } from './data';

type T = Record<Lang, string>;
const t = (en: string, de: string, pl: string, cs: string, nl: string, fr: string): T => ({ en, de, pl, cs, nl, fr });

// The pharmacy's own photos of the 170g jars. Other sizes reuse the image as a labelled representative image.
// kind: own = item list says 170g; rep = other size, pharmacy says same design; fam = list entry gives no size.
export type Lbl = { named?: string; ing?: string; use?: T; caution?: T };
export type Pack = { photo: string; name: string; front: string; kind: 'own' | 'rep' | 'fam' | 'pk' | 'ai'; lbl?: Lbl };
const HONEY: Pack = { photo: honey, name: 'Eva Skin Care Honey Nourishing Cream', front: 'Eva Skin Care · HONEY Nourishing Cream · for normal skin', kind: 'rep' };
const GLYC: Pack = { photo: glyc, name: 'Eva Skin Care Glycerin Intensive Moisture Cream', front: 'Eva Skin Care · GLYCERIN Intensive Moisture Cream · for dry skin', kind: 'rep' };
const SOFT: Pack = { photo: soft, name: 'Eva Skin Care Soft Moisturizing Cream with Aloe Vera', front: 'Eva Skin Care · Soft Moisturizing cream with Aloe Vera · Panthenol & Vitamin E · For face and body', kind: 'rep' };
const YOG: Pack = { photo: yog, name: 'Eva Skin Care Yogurt & Cucumber Refreshing Cream', front: 'Eva Skin Care · YOGURT & CUCUMBER Refreshing Cream · for oily skin', kind: 'rep' };

const MASK_USE = t('Wash the face with water and dry well. Apply the mask with the fingertips, leave for 10 to 15 minutes, then remove it.', 'Gesicht mit Wasser waschen und gut abtrocknen. Maske mit den Fingerspitzen auftragen, 10 bis 15 Minuten einwirken lassen, dann entfernen.', 'Umyj twarz wodą i dobrze osusz. Nałóż maskę czubkami palców, zostaw na 10 do 15 minut, a potem zdejmij.', 'Obličej omyjte vodou a dobře osušte. Masku naneste konečky prstů, nechte působit 10 až 15 minut a poté sundejte.', 'Was het gezicht met water en droog goed af. Breng het masker aan met de vingertoppen, laat 10 tot 15 minuten zitten en verwijder het.', 'Laver le visage à l\u2019eau et bien sécher. Appliquer le masque du bout des doigts, laisser poser 10 à 15 minutes, puis retirer.');
const MASK_CAUTION = t('For external use only. Avoid eye contact. Keep out of reach of children.', 'Nur zur äußeren Anwendung. Augenkontakt vermeiden. Außerhalb der Reichweite von Kindern aufbewahren.', 'Tylko do użytku zewnętrznego. Unikaj kontaktu z oczami. Chronić przed dziećmi.', 'Pouze k zevnímu použití. Vyhněte se kontaktu s očima. Uchovávejte mimo dosah dětí.', 'Alleen voor uitwendig gebruik. Vermijd contact met de ogen. Buiten bereik van kinderen houden.', 'Usage externe uniquement. Éviter le contact avec les yeux. Tenir hors de portée des enfants.');
const CREAM_USE = t('Morning and evening: apply a suitable amount to the face and neck with gentle circular massage. (Read from the Arabic text on the pack.)', 'Morgens und abends: eine passende Menge mit sanften, kreisenden Bewegungen auf Gesicht und Hals auftragen. (Aus dem arabischen Text auf der Packung gelesen.)', 'Rano i wieczorem: nałóż odpowiednią ilość na twarz i szyję, delikatnie masując ruchami okrężnymi. (Odczytane z arabskiego tekstu na opakowaniu.)', 'Ráno a večer: naneste vhodné množství na obličej a krk a jemně masírujte kruhovými pohyby. (Přečteno z arabského textu na obalu.)', 'Ochtend en avond: breng een geschikte hoeveelheid aan op gezicht en hals met zachte cirkelvormige bewegingen. (Gelezen uit de Arabische tekst op de verpakking.)', 'Matin et soir : appliquer une quantité suffisante sur le visage et le cou en massant doucement par mouvements circulaires. (Lu dans le texte arabe de l\u2019emballage.)');
const MASKING = 'Hydrolyzed collagen (origin fish skin), jojoba oil, argan oil, aloe vera oil, almond oil, carrot oil, blackseed oil, %s, polyvinylpyrrolidone, butylene glycol, glycerin, propylene glycol, vitamin A & E';
const OBASE = 'Orgakera Collagen ';
const cream = (photo: string, name: string, front: string, named: string): Pack => ({ photo, name, front, kind: 'pk', lbl: { named, use: CREAM_USE } });
export const ORGA: Record<string, Pack> = {
    'face-23': { photo: oCyl, name: 'The Secret of Egyptian Magic Collagen Hyaluronic Acid Niacinamide & Vit. E,A Anti Aging Cream', front: 'THE SECRET OF EGYPTIAN MAGIC · COLLAGEN · HYALURONIC ACID · NIACINAMIDE & VIT. E,A · ANTI AGING CREAM', kind: 'pk' },
    'face-14': cream(oYel, OBASE + 'Hyaluronic Acid Niacinamide & Vit. E,A Anti Ageing Cream', 'ORGAKERA · COLLAGEN · Hyaluronic Acid · Niacinamide & Vit. E,A · ANTI AGEING CREAM', 'Hyaluronic acid, marine collagen, niacinamide'),
    'face-16': cream(oGold, OBASE + 'Hyaluronic Acid Retinol & 24k Gold Anti Ageing Cream', 'ORGAKERA · COLLAGEN · Hyaluronic Acid · Retinol & 24k Gold · ANTI AGEING CREAM', 'Hyaluronic acid, marine collagen, collagen'),
    'face-15': cream(oRsa, OBASE + 'Hyaluronic Acid Red Sea Algae Anti Ageing Cream', 'ORGAKERA · COLLAGEN · Hyaluronic Acid · Red Sea Algae · ANTI AGEING CREAM', 'Hyaluronic acid, marine collagen, collagen'),
    'face-17': cream(oShea, OBASE + 'Hyaluronic Acid Shea Butter & Retinol Anti Ageing Cream', 'ORGAKERA · COLLAGEN · Hyaluronic Acid · Shea Butter & Retinol · ANTI AGEING CREAM', 'Hyaluronic acid, marine collagen, retinol'),
    'face-13': { photo: oChar, name: OBASE + 'Charcoal 5x1 Peeling Mask', front: 'Orgakera · COLLAGEN CHARCOAL · 5x1 with Vit. E · PEELING MASK', kind: 'pk', lbl: { ing: MASKING.replace('%s', 'charcoal extract'), use: MASK_USE, caution: MASK_CAUTION } },
    'face-18': { photo: oAlgae, name: OBASE + 'Red Sea Algae 5x1 Peeling Mask', front: 'Orgakera · COLLAGEN RED SEA ALGEA · 5x1 with Vit. E · PEELING MASK', kind: 'pk', lbl: { ing: MASKING.replace('%s', 'Red Sea algea extract'), use: MASK_USE, caution: MASK_CAUTION } },
};
const LOT_USE = t('Apply a thin layer to the skin and spread evenly several times a day.', 'Eine dünne Schicht auf die Haut auftragen und mehrmals täglich gleichmäßig verteilen.', 'Nałóż cienką warstwę na skórę i rozprowadź równomiernie kilka razy dziennie.', 'Naneste tenkou vrstvu na pokožku a rovnoměrně rozetřete několikrát denně.', 'Breng een dunne laag aan op de huid en verdeel gelijkmatig, meerdere keren per dag.', 'Appliquer une fine couche sur la peau et étaler uniformément plusieurs fois par jour.');
const lot = (photo: string, name: string, front: string, lbl?: Lbl): Pack => ({ photo, name, front, kind: 'pk', lbl });
export const LOTION: Record<string, Pack> = {
    'body-16': { photo: lPassion, name: 'EVA Skin Care Body Lotion Passion', front: 'Eva Skin Care · Body Lotion · Passion', kind: 'ai' },
    'body-11': lot(lMocha, 'Eva Optimum Care Recipe Age-Defying Blend Lotion Mocha Scent', 'Eva Optimum Care · Recipe · AGE-DEFYING BLEND Lotion · FOR NORMAL SKIN · Mocha Scent · FREE: Paraben, Phthalate, Colorants · VEGAN'),
    'body-13': lot(lCoco, 'Eva Optimum Care Recipe Nourishing Blend Lotion Coconut Scent', 'Eva Optimum Care · Recipe · NOURISHING BLEND Lotion · FOR NORMAL SKIN · Coconut Scent · FREE: Paraben, Phthalate, Colorants · VEGAN'),
    'body-12': lot(lBerry, 'Eva Optimum Care Recipe Hydrating Blend Lotion Berries Scent', 'Eva Optimum Care · Recipe · HYDRATING BLEND Lotion · FOR NORMAL SKIN · Berries Scent · FREE: Paraben, Phthalate, Colorants · VEGAN'),
    'body-14': lot(lPeach, 'Eva Optimum Care Recipe Revival Blend Lotion For Dry Skin Peach Scent', 'Eva Optimum Care · Recipe · REVIVAL BLEND Lotion · FOR DRY SKIN · Peach Scent · FREE: Paraben, Phthalate, Colorants · VEGAN', { named: 'Argan oil, avocado oil, shea butter', use: LOT_USE }),
};
export const PACKS: Record<string, Pack> = {
    ...ORGA, ...LOTION,
    'body-06': { ...HONEY, kind: 'own' }, 'body-09': HONEY, 'body-07': HONEY,
    'body-10': { ...GLYC, kind: 'own' }, 'body-05': GLYC, 'eva-glyc-25': GLYC,
    'body-01': { ...SOFT, kind: 'own' }, 'body-03': SOFT, 'eva-soft-25': SOFT,
    'body-02': { ...YOG, kind: 'own' }, 'body-04': YOG, 'eva-yog-25': YOG,
};
// Legacy list names (as written in the pharmacy's list) kept for search and for saved selections.
export const ALIAS: Record<string, string> = { 'body-08': 'body-07', 'face-02': 'body-10' };
export const LEGACY: Record<string, string[]> = {
    'body-13': ['Eva Optimum Care Recipe Lotion Coconut Scent'], 'body-14': ['Eva Optimum Care Recipe Lotion For Dry Skin Peach Scent'],
    'body-01': ['Eva carem soft170mg'], 'body-02': ['Eva carem yogurt and cucumber170mg'], 'body-03': ['Eva cream Aloe vera 50g'], 'body-04': ['Eva cream Cucumber 50g'],
    'body-05': ['Eva cream GLYCERIN 50G'], 'body-06': ['Eva cream Honey 170g'], 'body-07': ['Eva cream Honey 25g', 'Eva cream Honey 25g small'], 'body-09': ['Eva cream Honey 50g'],
    'body-10': ['Eva gylcerin cream 170mg', 'Eva Skin Care Glycerin Intensive Moisture Cream for dry skin'],
};
export const PACKX = {
    pill: t('Pharmacy photo', 'Foto der Apotheke', 'Zdjęcie apteki', 'Foto lékárny', 'Foto van de apotheek', 'Photo de la pharmacie'),
    pillAi: t('AI-retouched product image', 'KI-bearbeitetes Produktbild', 'Zdjęcie produktu poprawione przez AI', 'Produktový snímek upravený AI', 'Met AI bewerkte productafbeelding', 'Image produit retouchée par IA'),
    ai: t('AI-retouched product image, made from the pharmacy\'s own photo of this pack. It is not the original photo. Small details such as the top seam, the lace pattern, the cap and the glossy finish differ from the real pack.', 'KI-bearbeitetes Produktbild, erstellt aus dem Foto dieser Packung von der Apotheke. Es ist nicht das Originalfoto. Kleine Details wie die obere Naht, das Spitzenmuster, die Kappe und der Glanz weichen von der echten Packung ab.', 'Zdjęcie produktu poprawione przez AI na podstawie zdjęcia tego opakowania wykonanego przez aptekę. To nie jest oryginalne zdjęcie. Drobne szczegóły, takie jak górny szew, wzór koronki, nakrętka i połysk, różnią się od prawdziwego opakowania.', 'Produktový snímek upravený AI z fotografie tohoto balení od lékárny. Nejde o původní fotografii. Drobné detaily, jako je horní šev, vzor krajky, víčko a lesk, se liší od skutečného balení.', 'Met AI bewerkte productafbeelding, gemaakt van de foto van deze verpakking van de apotheek. Het is niet de originele foto. Kleine details zoals de bovenste naad, het kantpatroon, de dop en de glans wijken af van de echte verpakking.', 'Image produit retouchée par IA, créée à partir de la photo de cet emballage prise par la pharmacie. Ce n\'est pas la photo originale. De petits détails comme la soudure du haut, la dentelle, le bouchon et la finition brillante diffèrent de l\'emballage réel.'),
    pillRep: t('Representative image', 'Beispielbild', 'Zdjęcie poglądowe', 'Ilustrační snímek', 'Voorbeeldafbeelding', 'Image représentative'),
    front: t('On the front of the pack', 'Auf der Vorderseite der Packung', 'Na przodzie opakowania', 'Na přední straně obalu', 'Op de voorkant van de verpakking', 'Sur le devant de l’emballage'),
    own: t('The pharmacy\'s own photo of this pack (170g).', 'Foto dieser Packung (170 g) von der Apotheke.', 'Zdjęcie tego opakowania (170 g) wykonane przez aptekę.', 'Fotografie tohoto balení (170 g) od lékárny.', 'Foto van deze verpakking (170 g) van de apotheek.', 'Photo de ce pot (170 g) prise par la pharmacie.'),
    rep: t('Representative image: the pharmacy\'s photo of the 170g pack. The pharmacy says this size has the same design.', 'Beispielbild: Foto der 170-g-Packung von der Apotheke. Laut Apotheke hat diese Größe dasselbe Design.', 'Zdjęcie poglądowe: opakowanie 170 g sfotografowane przez aptekę. Apteka podaje, że ten rozmiar ma taki sam wygląd.', 'Ilustrační snímek: fotografie balení 170 g od lékárny. Lékárna uvádí, že tato velikost má stejný design.', 'Voorbeeldafbeelding: foto van de verpakking van 170 g van de apotheek. De apotheek zegt dat dit formaat hetzelfde ontwerp heeft.', 'Image représentative : photo du pot de 170 g par la pharmacie. La pharmacie indique que cette taille a le même design.'),
    fam: t('Representative image: the pharmacy\'s photo of the 170g pack of this cream. The list entry does not state a size.', 'Beispielbild: Foto der 170-g-Packung dieser Creme von der Apotheke. Der Listeneintrag nennt keine Größe.', 'Zdjęcie poglądowe: opakowanie 170 g tego kremu sfotografowane przez aptekę. Pozycja na liście nie podaje rozmiaru.', 'Ilustrační snímek: fotografie balení 170 g tohoto krému od lékárny. Položka v seznamu neuvádí velikost.', 'Voorbeeldafbeelding: foto van de verpakking van 170 g van deze crème van de apotheek. Het item in de lijst noemt geen formaat.', 'Image représentative : photo du pot de 170 g de cette crème par la pharmacie. L’entrée de la liste n’indique pas de taille.'),
    pk: t('The pharmacy\'s own photo of this pack. Any size in the name comes from the pharmacy\'s list; this photo does not confirm it.', 'Foto dieser Packung von der Apotheke. Eine Größe im Namen stammt aus der Liste der Apotheke; das Foto bestätigt sie nicht.', 'Zdjęcie tego opakowania wykonane przez aptekę. Rozmiar w nazwie pochodzi z listy apteki; zdjęcie go nie potwierdza.', 'Fotografie tohoto balení od lékárny. Velikost v názvu pochází ze seznamu lékárny; fotografie ji nepotvrzuje.', 'Foto van deze verpakking van de apotheek. Een maat in de naam komt uit de lijst van de apotheek; de foto bevestigt die niet.', 'Photo de cet emballage prise par la pharmacie. Toute taille dans le nom vient de la liste de la pharmacie ; la photo ne la confirme pas.'),
    named: t('Named on the pack', 'Auf der Packung genannt', 'Wymienione na opakowaniu', 'Uvedeno na obalu', 'Genoemd op de verpakking', 'Mentionné sur l\u2019emballage'),
    lblFine: t('Label text is read from the pharmacy\'s photos of the pack. The pack also prints cosmetic benefit claims; they are the maker\'s own wording and have not been checked by the pharmacy. Translations are drafts. For pharmacy review.', 'Der Etikettentext stammt aus den Fotos der Apotheke. Die Packung nennt auch kosmetische Wirkversprechen; das sind Angaben des Herstellers und wurden von der Apotheke nicht geprüft. Übersetzungen sind Entwürfe. Zur Prüfung durch die Apotheke.', 'Tekst etykiety odczytano ze zdjęć apteki. Opakowanie podaje też kosmetyczne deklaracje producenta; apteka ich nie sprawdziła. Tłumaczenia to wersje robocze. Do sprawdzenia przez aptekę.', 'Text etikety je přečten z fotografií lékárny. Obal uvádí i kosmetická tvrzení výrobce; lékárna je neověřila. Překlady jsou návrhy. K ověření lékárnou.', 'De tekst komt uit de foto\'s van de apotheek. De verpakking noemt ook cosmetische claims van de fabrikant; de apotheek heeft die niet gecontroleerd. Vertalingen zijn concepten. Ter controle door de apotheek.', 'Le texte provient des photos de la pharmacie. L\u2019emballage affiche aussi des allégations cosmétiques du fabricant ; la pharmacie ne les a pas vérifiées. Traductions provisoires. À relire par la pharmacie.'),
    fine: t('Name from the pharmacy\'s own list. Pack text above is read from the front of the pharmacy\'s photo. For pharmacy review.', 'Name aus der eigenen Liste der Apotheke. Der Text oben stammt von der Vorderseite des Apothekenfotos. Zur Prüfung durch die Apotheke.', 'Nazwa z listy apteki. Tekst powyżej odczytano z przodu zdjęcia apteki. Do sprawdzenia przez aptekę.', 'Název ze seznamu lékárny. Text výše je přečten z přední strany fotografie lékárny. K ověření lékárnou.', 'Naam uit de eigen lijst van de apotheek. De tekst hierboven is gelezen van de voorkant van de foto van de apotheek. Ter controle door de apotheek.', 'Nom tiré de la liste de la pharmacie. Le texte ci-dessus est lu sur le devant de la photo de la pharmacie. À vérifier par la pharmacie.'),
};

export const GET = {
    h: t('How to get it', 'So bekommen Sie es', 'Jak to dostać', 'Jak to získat', 'Zo krijgt u het', 'Comment l\u2019obtenir'),
    s1: t('Add it to your list.', 'Zur Liste hinzufügen.', 'Dodaj do listy.', 'Přidejte do seznamu.', 'Voeg het toe aan uw lijst.', 'Ajoutez-le à votre liste.'),
    s2: t('Open your list and send it on WhatsApp. It is a request, not an order.', 'Liste öffnen und per WhatsApp senden. Es ist eine Anfrage, keine Bestellung.', 'Otwórz listę i wyślij ją przez WhatsApp. To prośba, nie zamówienie.', 'Otevřete seznam a pošlete ho přes WhatsApp. Je to žádost, ne objednávka.', 'Open uw lijst en stuur die via WhatsApp. Het is een verzoek, geen bestelling.', 'Ouvrez votre liste et envoyez-la sur WhatsApp. C\u2019est une demande, pas une commande.'),
    s3: t('The pharmacy replies to confirm. You collect it at the pharmacy inside the resort. Nothing is paid online.', 'Die Apotheke bestätigt per Antwort. Abholung in der Apotheke im Resort. Es wird nichts online bezahlt.', 'Apteka odpowiada z potwierdzeniem. Odbiór w aptece na terenie resortu. Bez płatności online.', 'Lékárna odpoví a potvrdí. Vyzvednete v lékárně v areálu resortu. Nic se neplatí online.', 'De apotheek bevestigt per antwoord. U haalt het op bij de apotheek in het resort. Er wordt niets online betaald.', 'La pharmacie confirme par réponse. Retrait à la pharmacie dans le resort. Rien n\u2019est payé en ligne.'),
    off: t('Not on your list yet.', 'Noch nicht auf Ihrer Liste.', 'Jeszcze nie na liście.', 'Zatím není na seznamu.', 'Nog niet op uw lijst.', 'Pas encore sur votre liste.'),
    on: t('On your list. Next: send the list on WhatsApp.', 'Auf Ihrer Liste. Als Nächstes: Liste per WhatsApp senden.', 'Na liście. Dalej: wyślij listę przez WhatsApp.', 'Na seznamu. Dále: pošlete seznam přes WhatsApp.', 'Op uw lijst. Volgende stap: stuur de lijst via WhatsApp.', 'Sur votre liste. Ensuite : envoyez la liste sur WhatsApp.'),
    review: t('Review and send your list', 'Liste prüfen und senden', 'Sprawdź i wyślij listę', 'Zkontrolovat a odeslat seznam', 'Lijst bekijken en versturen', 'Vérifier et envoyer la liste'),
    more: t('More details will be added once the pharmacy has checked the label.', 'Weitere Angaben folgen, sobald die Apotheke das Etikett geprüft hat.', 'Więcej informacji pojawi się po sprawdzeniu etykiety przez aptekę.', 'Další informace doplníme po kontrole etikety lékárnou.', 'Meer details volgen zodra de apotheek het etiket heeft gecontroleerd.', 'Plus de détails seront ajoutés après vérification de l\u2019étiquette par la pharmacie.'),
};

// One catalogue card per Eva cream family. Sizes are chosen on the product page; every size keeps its own item id.
export type Fam = { rep: string; title: string; sizes: { g: string; id: string }[] };
const mk = (rep: string, title: string, s: [string, string][]): Fam => ({ rep, title, sizes: s.map(([g, id]) => ({ g, id })) });
const FAMS: Fam[] = [
    mk('body-06', 'Eva Skin Care Honey Nourishing Cream', [['170 g', 'body-06'], ['50 g', 'body-09'], ['25 g', 'body-07']]),
    mk('body-10', 'Eva Skin Care Glycerin Intensive Moisture Cream', [['170 g', 'body-10'], ['50 g', 'body-05'], ['25 g', 'eva-glyc-25']]),
    mk('body-01', 'Eva Skin Care Soft Moisturizing Cream with Aloe Vera', [['170 g', 'body-01'], ['50 g', 'body-03'], ['25 g', 'eva-soft-25']]),
    mk('body-02', 'Eva Skin Care Yogurt & Cucumber Refreshing Cream', [['170 g', 'body-02'], ['50 g', 'body-04'], ['25 g', 'eva-yog-25']]),
];
export const FAM: Record<string, Fam> = Object.fromEntries(FAMS.flatMap((f) => f.sizes.map((s) => [s.id, f])));
export const SIZE_T = {
    pick: t('Choose a size', 'Größe wählen', 'Wybierz rozmiar', 'Vyberte velikost', 'Kies een maat', 'Choisir une taille'),
    need: t('Choose a size to add it to your list.', 'Wählen Sie eine Größe, um den Artikel zur Liste hinzuzufügen.', 'Wybierz rozmiar, aby dodać produkt do listy.', 'Vyberte velikost a přidejte položku do seznamu.', 'Kies een maat om het aan je lijst toe te voegen.', 'Choisissez une taille pour l\u2019ajouter à votre liste.'),
    sizes: t('Sizes', 'Größen', 'Rozmiary', 'Velikosti', 'Maten', 'Tailles'),
    chosen: t('Selected', 'Ausgewählt', 'Wybrano', 'Vybráno', 'Gekozen', 'Sélectionné'),
};
