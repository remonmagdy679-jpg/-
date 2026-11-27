// Distinct sales copy for the Eloud Elmalky and Khamriyah Al Malika packs.
// Only what is printed on each pack: brand, product line, scent name, size. No source links, no claims beyond the pack.
export type DrCopy = {
  id: string; brand: string; title: string; headline: string; intro: string;
  story: string[]; what: string[]; homeHeading: string; home: string;
  faqHeading: string; faq: [string, string][]; selectionHeading: string; selection: string; whatHeading: string; button: string;
};

const SEL = 'Add it to your selection and we will confirm availability and prepare it for you at the pharmacy.';
const HOW: [string, string] = ['How do I get it?', 'Add it to your selection. We will confirm availability and prepare it for you at the pharmacy, and you can ask us anything about it.'];

type Seed = { id: string; fam: 'eloud' | 'khamriyah'; scent: string; size: string; pack: string; headline: string; story: string[]; home: string; extra?: string[]; faqQ?: [string, string] };

const mk = (s: Seed): DrCopy => {
  const eloud = s.fam === 'eloud';
  const brand = eloud ? 'Eloud Elmalky' : 'Khamriyah Al Malika';
  const kind = eloud ? 'Deodorant cream' : 'Perfumed cream for body and hair';
  return {
    id: s.id, brand,
    title: `${kind} – ${s.scent}`,
    headline: s.headline,
    intro: eloud
      ? `Eloud Elmalky deodorant cream, ${s.scent} fragrance, ${s.size}.`
      : `Khamriyah Al Malika perfumed cream for softening and perfuming the body and hair, scent ${s.scent}, ${s.size}.`,
    story: s.story,
    whatHeading: 'What You Get',
    what: [
      eloud ? `Eloud Elmalky deodorant cream with the ${s.scent} fragrance.` : `Khamriyah Al Malika perfumed cream, scent ${s.scent}.`,
      ...(eloud ? [] : ['Made for softening and perfuming both the body and the hair, as the Arabic on the pack says.']),
      `${s.size}, in its printed box.`,
      ...(s.extra || []),
    ],
    homeHeading: 'Bring a Little of It Home',
    home: s.home,
    faqHeading: 'Good to Know',
    faq: [
      s.faqQ || ['What is the scent?', `${s.scent}. It is the scent name printed on the pack.`],
      ['How big is it?', `${s.size}.`],
      eloud
        ? ['What is it?', 'A deodorant cream, not a spray.']
        : ['Is the pack in Arabic?', 'Yes. The pack is printed in Arabic, and the scent name is on the front. Ask us at the pharmacy and we will show you the pack.'],
      HOW,
    ],
    selectionHeading: 'Your Royal Selection',
    selection: SEL,
    button: 'ADD TO MY SELECTION',
  };
};

const S: Seed[] = [
  { id: 'deo-06', fam: 'eloud', scent: 'Musk Dust', size: '40 gm', pack: '',
    headline: 'Part of your morning routine in Marsa Alam.',
    story: ['Mornings in Marsa Alam start early: breakfast, the beach, a boat trip. A deodorant is one of the quick steps before you head out.', 'Eloud Elmalky Musk Dust is a deodorant cream with a musk-named fragrance. It is a simple step to add to your morning routine.'],
    home: 'Easy to add to the same selection as your other holiday essentials, so you collect everything at once.' },
  { id: 'deo-09', fam: 'eloud', scent: 'Mixed Royal', size: '40 gm', pack: '',
    headline: 'A small gift that is actually useful.',
    story: ['Gifts from a holiday are often magnets and keyrings. A deodorant cream with a royal name is something a person will really use.', 'Eloud Elmalky Mixed Royal is a deodorant cream, 40 gm. Take it for yourself, or for someone who would like a practical present.'],
    home: 'Thinking of someone back home? Add a second one to your selection and we will confirm availability when we prepare it.' },
  { id: 'deo-08', fam: 'eloud', scent: 'Golden', size: '40 gm', pack: '',
    headline: 'Freshen up before dinner.',
    story: ['The sun is going down over the Red Sea. You have showered, you are changing, and dinner starts soon.', 'Golden is an Eloud Elmalky deodorant cream. A quick, tidy step between the beach and the table.'],
    home: 'It fits an evening routine at home as well, a small reminder of dressing for dinner by the sea.' },
  { id: 'deo-11', fam: 'eloud', scent: 'Oud Spirit', size: '40 gm', pack: '',
    headline: 'For guests who already love oud.',
    story: ['If you reach for oud at the perfume counter, you will understand why a deodorant would carry the name.', 'Oud Spirit is an Eloud Elmalky deodorant cream, 40 gm. Ask us, and we can compare it with the other oud scents we carry in this range.'],
    home: 'A small cream to take home, for people who like their everyday routine to have an oud name on it.' },
  { id: 'deo-07', fam: 'eloud', scent: 'Fantasy', size: '40 gm', pack: '',
    headline: 'A holiday treat for your daily routine.',
    story: ['On holiday, even the everyday things can feel a little more special. A deodorant called Fantasy is a light way to do that.', 'Eloud Elmalky Fantasy is a deodorant cream, 40 gm. For guests who like to pick by the name of the fragrance.'],
    home: 'An easy one to add to a small bag of things to take home.' },
  { id: 'deo-10', fam: 'eloud', scent: 'Oud Fragrance', size: '40 gm', pack: '',
    headline: 'The plain, direct oud choice.',
    story: ['Some people want to compare ten things. Others want a clear name and an easy decision.', 'Oud Fragrance is an Eloud Elmalky deodorant cream, 40 gm. If you are choosing between the oud scents, ask us and we will help you pick.'],
    home: 'A straightforward cream for the bathroom shelf at home.' },
  { id: 'deo-12', fam: 'eloud', scent: 'Oud Khaligy', size: '40 gm', pack: '',
    headline: 'Khaligy means "of the Gulf".',
    story: ['The word on the pack is Arabic for Gulf-style. Oud has a long place in Gulf fragrance, and this is the Eloud Elmalky deodorant cream that carries the name.', 'A 40 gm deodorant cream, scent Oud Khaligy. Ask us if you would like to see the pack.'],
    home: 'A small cream with a name that means something. Easy to explain to friends at home.' },

  { id: 'kha-naseem', fam: 'khamriyah', scent: 'Naseem Malaki', size: '40 g', pack: '',
    headline: 'One cream for your skin and your hair.',
    story: ['Naseem means breeze, and Malaki means royal. Together: a royal breeze.', 'Khamriyah Al Malika Naseem Malaki is made to soften and perfume both the body and the hair, so one small cream covers two steps of your routine.'],
    home: 'Simple to keep in a bag for the trip home, and one less thing to pack.' },
  { id: 'kha-wisal', fam: 'khamriyah', scent: 'Wisal', size: '40 g', pack: '',
    headline: 'Something to give, and something to keep.',
    story: ['Wisal is a woman\'s name in Arabic, and the word also means coming together.', 'A perfumed cream for body and hair, 40 g, made to soften and perfume. It is the kind of small gift that does not need explaining.'],
    home: 'Add a second one to your selection if you want one for yourself and one to give, and we will confirm availability.' },
  { id: 'kha-lafli', fam: 'khamriyah', scent: 'Lafli', size: '40 g', pack: '',
    headline: 'Travel light, keep your routine.',
    story: ['The longer the trip, the more bottles end up in the bag. A cream that does both body and hair takes less room.', 'Khamriyah Al Malika Lafli is made to soften and perfume the body and the hair, in a 40 g pack that is easy to carry.'],
    home: 'Easy to say, easy to remember, and small enough for any bag.' },
  { id: 'kha-escape', fam: 'khamriyah', scent: 'Escape', size: '40 g', pack: '',
    headline: 'You came here to escape. Keep a little of it.',
    story: ['When the holiday is over and the weather at home is not the same, small rituals help you hold on to the feeling.', 'Khamriyah Al Malika Escape is a perfumed cream for softening and perfuming the body and hair, a small daily moment of the trip.'],
    home: 'Use it on a Monday morning back home and bring a little of Marsa Alam with you.' },
  { id: 'kha-flora', fam: 'khamriyah', scent: 'Flora', size: '40 g', pack: '',
    headline: 'After the sea and the sun, a finishing touch.',
    story: ['After a day of swimming, skin and hair want a little attention, and so does the evening.', 'Khamriyah Al Malika Flora is a perfumed cream made to soften and perfume the body and the hair. A finishing touch that takes a minute.'],
    home: 'A cheerful, small cream to take home or give to a friend.' },
  { id: 'kha-dof', fam: 'khamriyah', scent: 'Dof', size: '40 g', pack: '',
    headline: 'A softening ritual for body and hair.',
    story: ['Some mornings you want your routine to be one step. Khamriyah Al Malika Dof is a perfumed cream made for softening and perfuming both the body and the hair, as printed in Arabic on the pack.', 'It is a 40 g cream, for guests who like to be done quickly and still feel looked after. Ask us at the pharmacy and we will show you the pack.'],
    home: 'Small enough for a suitcase pocket, and easy to add to a gift selection.' },
  { id: 'deo-43', fam: 'khamriyah', scent: 'Kalimat', size: '40 ml', pack: '',
    headline: 'Kalimat means "words".',
    story: ['Some gifts say what you cannot. A perfumed cream named Kalimat, "words" in English, is an easy one to give with a few of your own.', 'Khamriyah Al Malika Kalimat is made to soften and perfume the body and the hair. This pack prints 40 ml, where the others print 40 g.'],
    home: 'A small present with a one-word name that is easy to remember.',
    faqQ: ['Why does it say 40 ml?', 'This pack prints its size in ml. The other packs in the Khamriyah Al Malika range print grams.'] },
  { id: 'kha-shruti', fam: 'khamriyah', scent: 'Shruti', size: '40 g', pack: '',
    headline: 'The after-shower step you will look forward to.',
    story: ['Shower, dry off, and then a minute for yourself. That is where a perfumed cream fits.', 'Khamriyah Al Malika Shruti is made to soften and perfume the body and the hair, in a 40 g pack.'],
    home: 'Add it to your selection and we will show you the pack when you collect it.' },
  { id: 'kha-moon', fam: 'khamriyah', scent: 'Moon', size: '40 g', pack: '',
    headline: 'For the evenings under the Marsa Alam sky.',
    story: ['After the sun goes down, the moon is next, and the night is long. Dressing for it can be as simple as one cream.', 'Khamriyah Al Malika Moon is a perfumed cream for the body and hair, made to soften and perfume. A 40 g pack for evenings out.'],
    home: 'A small cream that goes well in a bag for the evenings ahead. Easy to add to a list for someone at home.' },
];

export const DR: Record<string, DrCopy> = Object.fromEntries(S.map((s) => [s.id, mk(s)]));
export const DR_PHOTO_NEW = new Set(S.map((s) => s.id));
// Vatika hair batch: facts from the manufacturer's product pages (ingredients, sizes, use steps). No results promised.
type HSeed = { id: string; title: string; size: string; kind: string; headline: string; intro: string; story: string[]; feat: string[]; home: string; faqQ: [string, string]; use: string };
const HAIR_USE_SHAMPOO = 'Apply to wet hair, massage gently into the scalp with the fingertips (not the nails), then rinse. Repeat if needed.';
const hk = (s: HSeed): DrCopy => ({
  id: s.id, brand: 'Dabur Vatika Naturals', title: s.title, headline: s.headline, intro: s.intro, story: s.story,
  whatHeading: 'What You Get',
  what: [...s.feat, ...(s.size.startsWith('See') ? [] : [`${s.size}.`]), `Use: ${s.use}`],
  homeHeading: 'Bring a Little of It Home', home: s.home,
  faqHeading: 'Good to Know',
  faq: [s.faqQ, ...(s.size.startsWith('See') ? [] : [['How big is it?', `${s.size}.`] as [string, string]]), ['How do I use it?', s.use], HOW],
  selectionHeading: 'Your Royal Selection', selection: SEL, button: 'ADD TO MY SELECTION',
});
const H: HSeed[] = [
  { id: 'hair-02', title: 'Vatika Naturals Garlic Shampoo – 360 ml', size: '360 ml', kind: 'shampoo',
    headline: 'Garlic, in a shampoo you will not mind using.', intro: 'Dabur Vatika Naturals Garlic Shampoo, made with Spanish garlic and Vatika oils, in the 360 ml bottle.',
    story: ['Garlic has a long place in home hair care. This shampoo brings it into a simple wash, so you do not have to mix anything yourself.', 'Vatika Naturals Garlic Shampoo is made with natural garlic extract, with vitamin C from the garlic, and Vatika essential oils in a herbal recipe. The 360 ml bottle suits a longer stay or a shared bathroom.'],
    feat: ['Made with natural Spanish garlic extract and Vatika oils.', 'Garlic is the featured ingredient of this range.'], home: 'The large bottle is a good fit if you want to keep the wash going after the holiday.',
    faqQ: ['What is it made with?', 'Natural garlic extract and Vatika essential oils, in a herbal recipe.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-08', title: 'Vatika Naturals Garlic Shampoo – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'The garlic shampoo, in a size you can try.', intro: 'Dabur Vatika Naturals Garlic Shampoo in the 180 ml bottle.',
    story: ['Not sure about garlic in your hair routine? The 180 ml bottle is the easy way to find out.', 'It is made with natural Spanish garlic extract and Vatika essential oils, the same recipe as the larger bottle.'],
    feat: ['Made with natural Spanish garlic extract and Vatika oils.'], home: 'Small enough for a bathroom shelf or a day bag after the beach.',
    faqQ: ['Is this the same as the 360 ml bottle?', 'Same shampoo. Ask us at the pharmacy if you want to see both sizes.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-04', title: 'Vatika Naturals Black Seed Shampoo – 360 ml', size: '360 ml', kind: 'shampoo',
    headline: 'Black seed oil, from the hair-care shelf at home.', intro: 'Dabur Vatika Naturals Black Seed (Habba Sauda) Shampoo, made with Turkish black seed oil, 360 ml.',
    story: ['Black seed, habba sauda, is a name most guests from this region already know.', 'This shampoo is made with Turkish black seed oil and Vatika oils. It is a nourishing, moisturising wash for the scalp and hair.'],
    feat: ['Made with Turkish black seed oil.', 'Enriched with Vatika essential oils in a herbal recipe.'], home: 'A familiar ingredient, in a wash you can take home.',
    faqQ: ['What is black seed?', 'Habba Sauda. It is the featured ingredient of this shampoo.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-05', title: 'Vatika Naturals Black Seed Strength & Shine Shampoo – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'Strength and shine, in the smaller bottle.', intro: 'Dabur Vatika Naturals Black Seed Strength & Shine Shampoo, 180 ml.',
    story: ['If you want the black seed shampoo without committing to a big bottle, this is the one.', 'It is made with Turkish black seed oil and Vatika oils, and it is nourishing and moisturising for scalp and hair.'],
    feat: ['Made with black seed oil and Vatika oils.'], home: 'Easy to carry in a beach bag or a suitcase.',
    faqQ: ['What is the featured ingredient?', 'Black seed (Habba Sauda).'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-06', title: 'Vatika Naturals Volume & Thickness Shampoo, Coconut & Castor – 360 ml', size: '360 ml', kind: 'shampoo',
    headline: 'For hair that looks fuller after the sea.', intro: 'Dabur Vatika Naturals Volume & Thickness Shampoo with coconut and castor, 360 ml.',
    story: ['Salt water and sun can leave thin hair looking flat.', 'This shampoo is made with coconut and castor and Vatika oils. It is made for softness, gloss and shine.'],
    feat: ['Coconut and castor, with Vatika oils.', 'Made for thin or limp-looking hair.'], home: 'A big bottle for the weeks after you are home.',
    faqQ: ['Who is it for?', 'Hair that looks thin or limp, and that needs more volume.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-14', title: 'Vatika Naturals Volume & Thickness Shampoo, Coconut & Castor – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'Volume for flat hair, in a travel size.', intro: 'Dabur Vatika Naturals Volume & Thickness Shampoo with coconut and castor, 180 ml.',
    story: ['A smaller bottle of the volume shampoo, for a week by the sea.', 'Made with coconut and castor and Vatika oils to nourish from root to tip.'],
    feat: ['Coconut and castor, with Vatika oils.'], home: 'Fits in a day bag or a suitcase pocket.',
    faqQ: ['What is the difference from the 360 ml bottle?', 'Only the size.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-11', title: 'Vatika Naturals Repair & Restore Shampoo, Honey & Egg – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'After sun, salt and chlorine, a wash that nourishes.', intro: 'Dabur Vatika Naturals Repair & Restore Shampoo with honey and egg, 180 ml.',
    story: ['Hair that has been in the sea all week often feels rough at the ends.', 'This shampoo is made with honey and egg and Vatika oils. It is made for damaged hair and split ends.'],
    feat: ['Honey and egg, with Vatika oils.', 'Made for damaged hair and split ends.'], home: 'A shampoo to keep using after the holiday.',
    faqQ: ['Who is it for?', 'Dry or damaged-feeling hair.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-13', title: 'Vatika Naturals Repair & Restore Shampoo, Honey & Egg – 360 ml', size: '360 ml', kind: 'shampoo',
    headline: 'The big bottle for hair that needs more care.', intro: 'Dabur Vatika Naturals Repair & Restore Shampoo with honey and egg, 360 ml.',
    story: ['If the 180 ml bottle suits you, the 360 ml bottle simply lasts longer.', 'Honey and egg with Vatika oils, in a herbal recipe made to replenish moisture from root to tip.'],
    feat: ['Honey and egg, with Vatika oils.'], home: 'A bottle that lasts for a family bathroom.',
    faqQ: ['Same as the 180 ml?', 'Yes, only the bottle size changes.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-12', title: 'Vatika Naturals Moisture Treatment Shampoo, Almond & Honey – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'A wash for dry, frizzy hair.', intro: 'Dabur Vatika Naturals Moisture Treatment Shampoo with almond and honey, 180 ml.',
    story: ['Dry air and sea water can leave hair frizzy and hard to manage.', 'This shampoo is a blend of honey, almond and yoghurt. It is made for soft, shiny hair.'],
    feat: ['Almond, honey and yoghurt, with Vatika oils.', 'Made for dry hair.'], home: 'A 180 ml shampoo for dry hair, for the routine at home.',
    faqQ: ['Who is it for?', 'Dry, frizzy hair that has lost moisture.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-03', title: 'Vatika Naturals Dandruff Guard Shampoo, Lemon & Yoghurt – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'Lemon, yoghurt and mint, for the shower.', intro: 'Dabur Vatika Naturals Dandruff Guard Shampoo with lemon, yoghurt and mint, 180 ml.',
    story: ['Some shampoos are chosen for the scent, some for the label.', 'This one comes from the Dandruff Guard range and is made with lemon, yoghurt and mint.'],
    feat: ['Lemon, yoghurt and mint.', 'From the Dandruff Guard range.'], home: 'Easy to use in the shower, and small enough to keep in a bag.',
    faqQ: ['Is it for all hair types?', 'It works on all hair types.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-50', title: 'Vatika Naturals Hair Fall Control Shampoo, Cactus & Ghergir – 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'Cactus and ghergir, with Vatika oils.', intro: 'Dabur Vatika Naturals Hair Fall Control Shampoo with cactus and ghergir, 180 ml.',
    story: ['Some shampoos are chosen for what is in the bottle.', 'This shampoo is made with cactus and ghergir and Vatika oils, to nourish hair from root to tip. It belongs to the Hair Fall Control range.'],
    feat: ['Cactus and ghergir, with Vatika oils.'], home: 'A 180 ml shampoo for the routine at home.',
    faqQ: ['What is ghergir?', 'An ingredient used in this shampoo, together with cactus.'], use: HAIR_USE_SHAMPOO },
  { id: 'hair-43', title: 'Vatika Naturals Nourish & Protect Conditioner, Olive & Henna – 360 ml', size: '360 ml', kind: 'conditioner',
    headline: 'After the shampoo, the soft finish.', intro: 'Dabur Vatika Naturals Nourish & Protect Conditioner with olive and henna, 360 ml, for normal hair.',
    story: ['A good wash can still leave hair hard to comb.', 'This conditioner is made with olive and henna and Vatika oils for normal hair. It helps hair feel soft and smooth and easier to detangle.'],
    feat: ['Olive and henna, with Vatika oils.', 'Made for normal hair.'], home: 'A large bottle to keep with your shampoo.',
    faqQ: ['Who is it for?', 'Normal hair.'], use: 'After shampooing, rinse hair well and spread the conditioner evenly on the ends. Leave for 2 minutes and rinse thoroughly.' },
];
for (const s of H) DR[s.id] = hk(s);
const HAMMAM_USE = 'After shampooing, apply to the hair and massage gently from root to tips. Leave for 15 minutes (You can warm it with a steamer or hair dryer), then rinse with water.';
const H2: HSeed[] = [
  { id: 'hair-22', title: 'Vatika Naturals Moisture Soft Hammam Cream, Argan', size: 'See the pack for the size', kind: 'hammam',
    headline: 'A soft, non-greasy hair treatment with argan.', intro: 'Dabur Vatika Naturals Moisture Soft Hammam Cream with argan extract, a hot-oil style hair treatment cream.',
    story: ['Hammam Zaith is the hot oil treatment many people grew up with. This cream makes it a simple step after shampooing.', 'It is made with argan from Morocco and Vatika oils. It is a non-sticky, non-greasy cream that locks in moisture and adds shine and a soft finish.'],
    feat: ['Argan extract with Vatika oils.', 'Non-sticky and non-greasy.', 'Free from parabens.'], home: 'A treatment you can leave on while you get ready for the evening.',
    faqQ: ['Who is it for?', 'Hair that feels dry or frizzy and needs softness and shine.'], use: HAMMAM_USE },
  { id: 'hair-30', title: 'Vatika Naturals Argan Hammam Cream – 225 g', size: '225 g', kind: 'hammam',
    headline: 'The argan treatment in the smaller tub.', intro: 'Dabur Vatika Naturals Argan Hammam Cream, 225 g.',
    story: ['The 225 g tub is the easy way to try a hammam-style treatment.', 'Made with argan and Vatika oils to add moisture, shine and softness.'],
    feat: ['Argan extract with Vatika oils.'], home: 'Small enough for a suitcase.',
    faqQ: ['Is it the same as the Moisture Soft argan cream?', 'It is the argan hammam cream in the 225 g size.'], use: HAMMAM_USE },
  { id: 'hair-27', title: 'Vatika Hammam Cream, Mink Oil', size: 'See the pack for the size', kind: 'hammam',
    headline: 'A conditioning treatment for dry, dull hair.', intro: 'Dabur Vatika Naturals Mink Oil Conditioning Hammam Cream with olive and castor.',
    story: ['Some hair is just dry and dull, whatever you do.', 'This cream is made with mink oil, olive and castor. It conditions and hydrates for a shiny, silky texture, with a soft hold that does not weigh hair down.'],
    feat: ['Mink oil, olive and castor, with Vatika oils.', 'Made for dry, dull and frizzy hair.'], home: 'A spa-style step you can do at home.',
    faqQ: ['What does mink oil do here?', 'It softens hair strands.'], use: HAMMAM_USE },
  { id: 'hair-31', title: 'Vatika Naturals Black Seed Hammam Cream, Complete Hair Protection', size: 'See the pack for the size', kind: 'hammam',
    headline: 'Black seed, as a hair mask.', intro: 'Dabur Vatika Naturals Black Seed (Habba Souda) Hammam Cream, a hair mask treatment cream.',
    story: ['Black seed in a shampoo is one thing. Black seed as a leave-on mask is another.', 'This cream is made with black seed extract and Vatika oils, and made for fine to medium hair.'],
    feat: ['Black seed extract with Vatika oils.', 'Made for fine to medium hair.'], home: 'A treatment to repeat at home, alongside the black seed shampoo.',
    faqQ: ['What is it?', 'A hair mask treatment cream, used after shampooing.'], use: HAMMAM_USE },
  { id: 'hair-38', title: 'Vatika Naturals Black Seed Hammam Cream, Complete Hair Protection – 450 g', size: '450 g', kind: 'hammam',
    headline: 'The black seed mask in the large tub.', intro: 'Dabur Vatika Naturals Black Seed (Habba Souda) Hammam Cream, 450 g.',
    story: ['A large tub is for people who will use it again and again.', 'Black seed extract and Vatika oils, in a mask cream made for fine to medium hair.'],
    feat: ['Black seed extract with Vatika oils.'], home: 'Shared well between two people.',
    faqQ: ['Same as the smaller tub?', 'Same cream, larger size.'], use: HAMMAM_USE },
  { id: 'hair-26', title: 'Vatika Hair Mask with Watercress – 225 g', size: '225 g', kind: 'hammam',
    headline: 'Watercress for a spa moment at home.', intro: 'Dabur Vatika Naturals Hammam Cream with watercress, marrow and vitamin E, 225 g.',
    story: ['A hair mask does not have to take long.', 'Watercress, marrow and vitamin E, in a non-sticky, non-greasy cream. It can be used in place of a hair oil and is made to leave hair soft and shiny.'],
    feat: ['Watercress, marrow and vitamin E.', 'Free from parabens.'], home: 'A compact tub for a quick treatment.',
    faqQ: ['Is it sticky?', 'It is non-sticky and non-greasy.'], use: HAMMAM_USE },
  { id: 'hair-39', title: 'Vatika Naturals Hammam Cream, Watercress – 500 g', size: '500 g', kind: 'hammam',
    headline: 'A big tub for people who love a hair mask.', intro: 'Dabur Vatika Naturals Hammam Cream with watercress, marrow and vitamin E, 500 g.',
    story: ['For a family that shares a bathroom, the large tub makes sense.', 'Watercress, marrow and vitamin E in a non-sticky cream, made to nourish and add shine.'],
    feat: ['Watercress, marrow and vitamin E.'], home: 'A big tub that will keep a treatment routine going at home.',
    faqQ: ['What is it for?', 'A leave-on hair mask treatment, used after shampooing.'], use: HAMMAM_USE },
  { id: 'hair-41', title: 'Vatika Naturals Intensive Nourishment Hammam Cream, Honey, Castor & Egg', size: 'See the pack for the size', kind: 'hammam',
    headline: 'Egg and honey, for hair that has had a hard summer.', intro: 'Dabur Vatika Naturals Intensive Nourishment Hammam Cream with egg, honey, castor and marrow.',
    story: ['Sun, salt and heat are hard on hair.', 'This cream is made with egg, honey, castor and marrow. The mix is made for damaged hair.'],
    feat: ['Egg, honey, castor and marrow, with Vatika oils.', 'Made for damaged hair.'], home: 'A rich treatment to bring home after a holiday by the sea.',
    faqQ: ['Who is it for?', 'Damaged, limp or dry hair.'], use: HAMMAM_USE },
  { id: 'hair-42', title: 'Vatika Naturals Intensive Nourishment Hammam Cream, Honey, Castor & Egg (2)', size: 'See the pack for the size', kind: 'hammam',
    headline: 'The egg and honey mask, second pack on our list.', intro: 'Dabur Vatika Naturals Intensive Nourishment Hammam Cream with egg, honey, castor and marrow.',
    story: ['This is the same Intensive Nourishment cream as the other listing, kept as its own entry because the pharmacy stocks it separately.', 'Egg, honey, castor and marrow with Vatika oils, in a mask cream used after shampooing.'],
    feat: ['Egg, honey, castor and marrow, with Vatika oils.'], home: 'Ask us which pack size is on the shelf.',
    faqQ: ['Is this different from the other Honey, Castor & Egg listing?', 'Same product family. Ask us at the pharmacy which size we have.'], use: HAMMAM_USE },
];
for (const s of H2) DR[s.id] = hk(s);
DR['oral-01'] = {
  id: 'oral-01', brand: 'Dabur Miswak', title: 'Dabur Miswak Original Herbal Toothpaste',
  headline: 'The miswak habit, in a tube.',
  intro: 'Dabur Miswak Original herbal toothpaste, made with miswak (al arak) extract.',
  story: ['Miswak is the natural teeth-cleaning twig from the arak tree. A twig is hard to carry on holiday and easy to forget.', 'Dabur Miswak Original brings miswak extract into an everyday herbal toothpaste, so it fits your normal brushing.'],
  whatHeading: 'What You Get',
  what: ['Dabur Miswak Original herbal toothpaste.', 'Made with miswak (al arak) extract.', 'The box in the picture shows "FREE 20 g". Ask us to confirm the pack size.'],
  homeHeading: 'Bring a Little of It Home',
  home: 'A small, useful thing to take back, for yourself or for family who know miswak.',
  faqHeading: 'Good to Know',
  faq: [['What is miswak?', 'A natural teeth-cleaning twig from the arak tree. Its extract is the featured ingredient of this toothpaste.'], ['How do I use it?', 'Put a suitable amount on your toothbrush and brush your teeth in gentle circular motions, twice a day.'], ['What does the box say?', 'The box in the picture shows "Original", "Herbal toothpaste" and "FREE 20 g". Ask us at the pharmacy and we will show you the pack and confirm the size.'], HOW],
  selectionHeading: 'Your Royal Selection', selection: SEL, button: 'ADD TO MY SELECTION',
};



const PB: any[] = [{"id": "body-06", "brand": "Eva Skin Care", "title": "Eva Skin Care Honey Nourishing Cream – 170 g", "headline": "Honey, for skin that likes to be looked after.", "intro": "Eva Skin Care Honey Nourishing Cream, made for normal skin, in a yellow tub you can spot in a bag at once.", "story": ["Honey has a long name for being kind to skin, and this cream puts it in an everyday tub. A nourishing cream for normal skin: a simple cream for a simple routine.", "After a day of sun, salt water and air conditioning, a nourishing cream is the part of the day that feels like a pause."], "what": ["Eva Skin Care Honey Nourishing Cream.", "Made for normal skin.", "A nourishing cream with honey.", "Size: 170 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "A familiar tub for a suitcase, or a small gift in the 25 g size.", "faq": [["Which size is this?", "This entry is the 170 g size. Ask us if you would like another."]]}, {"id": "body-09", "brand": "Eva Skin Care", "title": "Eva Skin Care Honey Nourishing Cream – 50 g", "headline": "Honey, for skin that likes to be looked after.", "intro": "Eva Skin Care Honey Nourishing Cream, made for normal skin, in a yellow tub you can spot in a bag at once.", "story": ["Honey has a long name for being kind to skin, and this cream puts it in an everyday tub. A nourishing cream for normal skin: a simple cream for a simple routine.", "After a day of sun, salt water and air conditioning, a nourishing cream is the part of the day that feels like a pause."], "what": ["Eva Skin Care Honey Nourishing Cream.", "Made for normal skin.", "A nourishing cream with honey.", "Size: 50 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "A familiar tub for a suitcase, or a small gift in the 25 g size.", "faq": [["Which size is this?", "This entry is the 50 g size. Ask us if you would like another."]]}, {"id": "body-07", "brand": "Eva Skin Care", "title": "Eva Skin Care Honey Nourishing Cream – 25 g", "headline": "Honey, for skin that likes to be looked after.", "intro": "Eva Skin Care Honey Nourishing Cream, made for normal skin, in a yellow tub you can spot in a bag at once.", "story": ["Honey has a long name for being kind to skin, and this cream puts it in an everyday tub. A nourishing cream for normal skin: a simple cream for a simple routine.", "After a day of sun, salt water and air conditioning, a nourishing cream is the part of the day that feels like a pause."], "what": ["Eva Skin Care Honey Nourishing Cream.", "Made for normal skin.", "A nourishing cream with honey.", "Size: 25 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "A familiar tub for a suitcase, or a small gift in the 25 g size.", "faq": [["Which size is this?", "This entry is the 25 g size. Ask us if you would like another."]]}, {"id": "body-10", "brand": "Eva Skin Care", "title": "Eva Skin Care Glycerin Intensive Moisture Cream – 170 g", "headline": "Intensive moisture, made for dry skin.", "intro": "Eva Skin Care Glycerin Intensive Moisture Cream, made for dry skin.", "story": ["Sun, wind and salt water leave dry skin wanting more than a light lotion. This cream is named for what it does: Intensive Moisture, with glycerin, and it is made for dry skin.", "It is the one to reach for when skin feels tight after a day outside."], "what": ["Eva Skin Care Glycerin Intensive Moisture Cream.", "Made for dry skin.", "A moisture cream with glycerin.", "Size: 170 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "Three sizes make it easy to keep one at the room and one in your bag.", "faq": [["Which size is this?", "This entry is the 170 g size. Ask us if you would like another."]]}, {"id": "body-05", "brand": "Eva Skin Care", "title": "Eva Skin Care Glycerin Intensive Moisture Cream – 50 g", "headline": "Intensive moisture, made for dry skin.", "intro": "Eva Skin Care Glycerin Intensive Moisture Cream, made for dry skin.", "story": ["Sun, wind and salt water leave dry skin wanting more than a light lotion. This cream is named for what it does: Intensive Moisture, with glycerin, and it is made for dry skin.", "It is the one to reach for when skin feels tight after a day outside."], "what": ["Eva Skin Care Glycerin Intensive Moisture Cream.", "Made for dry skin.", "A moisture cream with glycerin.", "Size: 50 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "Three sizes make it easy to keep one at the room and one in your bag.", "faq": [["Which size is this?", "This entry is the 50 g size. Ask us if you would like another."]]}, {"id": "eva-glyc-25", "brand": "Eva Skin Care", "title": "Eva Skin Care Glycerin Intensive Moisture Cream – 25 g", "headline": "Intensive moisture, made for dry skin.", "intro": "Eva Skin Care Glycerin Intensive Moisture Cream, made for dry skin.", "story": ["Sun, wind and salt water leave dry skin wanting more than a light lotion. This cream is named for what it does: Intensive Moisture, with glycerin, and it is made for dry skin.", "It is the one to reach for when skin feels tight after a day outside."], "what": ["Eva Skin Care Glycerin Intensive Moisture Cream.", "Made for dry skin.", "A moisture cream with glycerin.", "Size: 25 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "Three sizes make it easy to keep one at the room and one in your bag.", "faq": [["Which size is this?", "This entry is the 25 g size. Ask us if you would like another."]]}, {"id": "body-01", "brand": "Eva Skin Care", "title": "Eva Skin Care Soft Moisturizing Cream with Aloe Vera – 170 g", "headline": "One soft cream for face and body.", "intro": "Eva Skin Care Soft Moisturizing Cream with Aloe Vera, with panthenol and vitamin E, for face and body.", "story": ["Packing light means fewer jars. This cream is made for both face and body, so one tub does the work of two.", "Aloe vera, panthenol and vitamin E are in the name. It is a soft, everyday moisturizer for people who want an easy routine."], "what": ["Eva Skin Care Soft Moisturizing Cream with Aloe Vera.", "With aloe vera, panthenol and vitamin E.", "For face and body.", "Size: 170 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "The 25 g size slips into a beach bag, and the 170 g tub stays by the bed.", "faq": [["Which size is this?", "This entry is the 170 g size. Ask us if you would like another."]]}, {"id": "body-03", "brand": "Eva Skin Care", "title": "Eva Skin Care Soft Moisturizing Cream with Aloe Vera – 50 g", "headline": "One soft cream for face and body.", "intro": "Eva Skin Care Soft Moisturizing Cream with Aloe Vera, with panthenol and vitamin E, for face and body.", "story": ["Packing light means fewer jars. This cream is printed for both face and body, so one tub does the work of two.", "Aloe vera, panthenol and vitamin E are in the name. It is a soft, everyday moisturizer for people who want an easy routine."], "what": ["Eva Skin Care Soft Moisturizing Cream with Aloe Vera.", "With aloe vera, panthenol and vitamin E.", "For face and body.", "Size: 50 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "The 25 g size slips into a beach bag, and the 170 g tub stays by the bed.", "faq": [["Which size is this?", "This entry is the 50 g size. Ask us if you would like another."]]}, {"id": "eva-soft-25", "brand": "Eva Skin Care", "title": "Eva Skin Care Soft Moisturizing Cream with Aloe Vera – 25 g", "headline": "One soft cream for face and body.", "intro": "Eva Skin Care Soft Moisturizing Cream with Aloe Vera, with panthenol and vitamin E, for face and body.", "story": ["Packing light means fewer jars. This cream is printed for both face and body, so one tub does the work of two.", "Aloe vera, panthenol and vitamin E are in the name. It is a soft, everyday moisturizer for people who want an easy routine."], "what": ["Eva Skin Care Soft Moisturizing Cream with Aloe Vera.", "With aloe vera, panthenol and vitamin E.", "For face and body.", "Size: 25 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "The 25 g size slips into a beach bag, and the 170 g tub stays by the bed.", "faq": [["Which size is this?", "This entry is the 25 g size. Ask us if you would like another."]]}, {"id": "body-02", "brand": "Eva Skin Care", "title": "Eva Skin Care Yogurt & Cucumber Refreshing Cream – 170 g", "headline": "A fresh, light feel for oily skin.", "intro": "Eva Skin Care Yogurt & Cucumber Refreshing Cream, made for oily skin.", "story": ["Cucumber and yogurt sound like a cool drink on a hot day, and that is the mood of this cream. It is called Refreshing, and it is made for oily skin.", "If heavy creams are not for you in the heat, this is the one to look at."], "what": ["Eva Skin Care Yogurt & Cucumber Refreshing Cream.", "Made for oily skin.", "A refreshing cream with yogurt and cucumber.", "Size: 170 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "A cool-feeling cream to take home from a hot place.", "faq": [["Which size is this?", "This entry is the 170 g size. Ask us if you would like another."]]}, {"id": "body-04", "brand": "Eva Skin Care", "title": "Eva Skin Care Yogurt & Cucumber Refreshing Cream – 50 g", "headline": "A fresh, light feel for oily skin.", "intro": "Eva Skin Care Yogurt & Cucumber Refreshing Cream, made for oily skin.", "story": ["Cucumber and yogurt sound like a cool drink on a hot day, and that is the mood of this cream. It is called Refreshing, and it is made for oily skin.", "If heavy creams are not for you in the heat, this is the one to look at."], "what": ["Eva Skin Care Yogurt & Cucumber Refreshing Cream.", "Made for oily skin.", "A refreshing cream with yogurt and cucumber.", "Size: 50 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "A cool-feeling cream to take home from a hot place.", "faq": [["Which size is this?", "This entry is the 50 g size. Ask us if you would like another."]]}, {"id": "eva-yog-25", "brand": "Eva Skin Care", "title": "Eva Skin Care Yogurt & Cucumber Refreshing Cream – 25 g", "headline": "A fresh, light feel for oily skin.", "intro": "Eva Skin Care Yogurt & Cucumber Refreshing Cream, made for oily skin.", "story": ["Cucumber and yogurt sound like a cool drink on a hot day, and that is the mood of this cream. It is called Refreshing, and it is made for oily skin.", "If heavy creams are not for you in the heat, this is the one to look at."], "what": ["Eva Skin Care Yogurt & Cucumber Refreshing Cream.", "Made for oily skin.", "A refreshing cream with yogurt and cucumber.", "Size: 25 g. The same cream is also sold in 170 g, 50 g and 25 g."], "home": "A cool-feeling cream to take home from a hot place.", "faq": [["Which size is this?", "This entry is the 25 g size. Ask us if you would like another."]]}, {"id": "face-14", "brand": "Orgakera Collagen", "title": "Orgakera Collagen Hyaluronic Acid, Niacinamide & Vit. E,A Anti Ageing Cream", "headline": "Hyaluronic acid and niacinamide, in one face cream.", "intro": "Orgakera Collagen Hyaluronic Acid, Niacinamide & Vit. E,A Anti Ageing Cream, 50 g.", "story": ["Hyaluronic acid, marine collagen and niacinamide, in an anti ageing cream made for the face.", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."], "what": ["Orgakera Collagen Hyaluronic Acid, Niacinamide & Vit. E,A Anti Ageing Cream.", "50 g."], "home": "A face cream that is easy to pack and easy to give.", "faq": [["How do I use it?", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."]]}, {"id": "face-16", "brand": "Orgakera Collagen", "title": "Orgakera Collagen Hyaluronic Acid, Retinol & 24k Gold Anti Ageing Cream", "headline": "The gold one, for an evening ritual.", "intro": "Orgakera Collagen Hyaluronic Acid, Retinol & 24k Gold Anti Ageing Cream, 50 g.", "story": ["Hyaluronic acid, retinol and 24k gold, in an anti ageing cream made for the face.", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."], "what": ["Orgakera Collagen Hyaluronic Acid, Retinol & 24k Gold Anti Ageing Cream.", "50 g."], "home": "A face cream that is easy to pack and easy to give.", "faq": [["How do I use it?", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."]]}, {"id": "face-15", "brand": "Orgakera Collagen", "title": "Orgakera Collagen Hyaluronic Acid & Red Sea Algae Anti Ageing Cream", "headline": "Red Sea algae, from the sea you came to see.", "intro": "Orgakera Collagen Hyaluronic Acid & Red Sea Algae Anti Ageing Cream, 50 g.", "story": ["Hyaluronic acid and Red Sea algae, in an anti ageing cream made for the face.", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."], "what": ["Orgakera Collagen Hyaluronic Acid & Red Sea Algae Anti Ageing Cream.", "50 g."], "home": "A face cream that is easy to pack and easy to give.", "faq": [["How do I use it?", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."]]}, {"id": "face-17", "brand": "Orgakera Collagen", "title": "Orgakera Collagen Hyaluronic Acid, Shea Butter & Retinol Anti Ageing Cream", "headline": "Shea butter and retinol, a richer pairing.", "intro": "Orgakera Collagen Hyaluronic Acid, Shea Butter & Retinol Anti Ageing Cream, 50 g.", "story": ["Hyaluronic acid, shea butter and retinol, in an anti ageing cream made for the face.", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."], "what": ["Orgakera Collagen Hyaluronic Acid, Shea Butter & Retinol Anti Ageing Cream.", "50 g."], "home": "A face cream that is easy to pack and easy to give.", "faq": [["How do I use it?", "Morning and evening, apply a suitable amount to the face and neck with gentle circular massage."]]}, {"id": "face-13", "brand": "Orgakera Collagen", "title": "Orgakera Collagen Charcoal 5x1 Peeling Mask", "headline": "Charcoal, in a peeling mask for a home-spa evening.", "intro": "Orgakera Collagen Charcoal 5x1 Peeling Mask, with vitamin E.", "story": ["A face mask turns an evening into a small spa break. This one is a charcoal peeling mask with charcoal extract and vitamin E, in the 5x1 format.", "Ten to fifteen minutes is all it asks."], "what": ["Orgakera Collagen Charcoal 5x1 Peeling Mask.", "Made with hydrolyzed collagen, jojoba, argan and aloe vera oils, and charcoal extract.", "Use: Wash the face with water and dry well. Apply the mask with the fingertips, leave for 10 to 15 minutes, then remove it.", "External use only. Avoid eye contact. Keep out of reach of children."], "home": "Easy to pack, and a nice small gift.", "faq": [["How do I use it?", "Wash the face with water and dry well. Apply the mask with the fingertips, leave for 10 to 15 minutes, then remove it."]]}, {"id": "face-18", "brand": "Orgakera Collagen", "title": "Orgakera Collagen Red Sea Algae 5x1 Peeling Mask", "headline": "Red Sea algae, in a peeling mask.", "intro": "Orgakera Collagen Red Sea Algae 5x1 Peeling Mask, with vitamin E.", "story": ["A face mask turns an evening into a small spa break. This one is a red sea algae peeling mask with Red Sea algae extract and vitamin E, printed 5x1 on the pack.", "Ten to fifteen minutes is all it asks."], "what": ["Orgakera Collagen Red Sea Algae 5x1 Peeling Mask.", "Made with hydrolyzed collagen, jojoba, argan and aloe vera oils, and Red Sea algae extract.", "Use: Wash the face with water and dry well. Apply the mask with the fingertips, leave for 10 to 15 minutes, then remove it.", "External use only. Avoid eye contact. Keep out of reach of children."], "home": "Easy to pack, and a nice small gift.", "faq": [["How do I use it?", "Wash the face with water and dry well. Apply the mask with the fingertips, leave for 10 to 15 minutes, then remove it."]]}, {"id": "face-23", "brand": "The Secret of Egyptian Magic", "title": "The Secret of Egyptian Magic Collagen Anti Aging Cream", "headline": "Collagen, hyaluronic acid and niacinamide, with an Egyptian name.", "intro": "The Secret of Egyptian Magic Collagen Anti Aging Cream, with hyaluronic acid, niacinamide and vitamins E and A.", "story": ["A cream with a name like this makes a good souvenir from Egypt. It carries collagen, hyaluronic acid, niacinamide and vitamins E and A, and calls it an anti aging cream.", "Ask us for the pack size when you collect it."], "what": ["The Secret of Egyptian Magic Collagen Anti Aging Cream.", "With hyaluronic acid, niacinamide and vitamins E and A."], "home": "A face cream with an Egyptian name, easy to give as a present.", "faq": [["What size is it?", "Ask us at the pharmacy and we will show you the pack."]]}, {"id": "body-11", "brand": "Eva Optimum Care Recipe", "title": "Eva Optimum Care Recipe Age-Defying Blend Lotion – Mocha", "headline": "Mocha, a warm scent for the evening.", "intro": "Eva Optimum Care Recipe Age-Defying Blend body lotion, mocha scent, for normal skin.", "story": ["Mocha is a cosy scent to end a day in the sun with. This lotion is made for normal skin, and it is free from paraben, phthalate and colorants, and vegan.", ""], "what": ["Eva Optimum Care Recipe Age-Defying Blend Lotion, mocha scent.", "For normal skin. Free from paraben, phthalate and colorants. Vegan."], "home": "A body lotion with a warm scent, easy to pack for the whole trip.", "faq": [["What is it free from?", "Free from paraben, phthalate and colorants, and vegan."]]}, {"id": "body-16", "brand": "Eva Skin Care", "title": "EVA Skin Care Body Lotion – Passion", "headline": "Passion, a bright scent in a bottle.", "intro": "Eva Skin Care body lotion, passion scent.", "story": ["Some lotions are about the routine, and some are about the smell. This one is Passion, a fruity-sounding name for an easy body lotion.", "Ask us about size and skin type when you collect it."], "what": ["EVA Skin Care Body Lotion, Passion.", "Scent: Passion."], "home": "A bright scent to bring home from the holiday.", "faq": [["What size is it?", "Ask us at the pharmacy and we will show you the pack."]]}];
for (const e of PB) DR[e.id] = { id: e.id, brand: e.brand, title: e.title, headline: e.headline, intro: e.intro, story: e.story, whatHeading: 'What You Get', what: e.what, homeHeading: 'Bring a Little of It Home', home: e.home, faqHeading: 'Good to Know', faq: [...e.faq, HOW], selectionHeading: 'Your Royal Selection', selection: SEL, button: 'ADD TO MY SELECTION' };
const EVA_FAQ_HOW = HOW;
DR_EXTRA();
function DR_EXTRA() {
  DR['body-14'] = {
    id: 'body-14', brand: 'Eva', title: 'Revival Body Lotion for Dry Skin – Peach Scent',
    headline: 'For the days the sun and the sea take the softness.',
    intro: 'Eva Optimum Care Recipe Revival Blend Lotion for dry skin, with argan oil, avocado oil and shea butter, scented with peach.',
    story: ['Some holiday days leave skin feeling dry. Salt, sun, air-conditioning, and another long swim.', 'Revival Blend is the one in this range made for dry skin. It is formulated to relieve the roughness and cracking of dry skin and to restore smoothness. A peach scent finishes it.'],
    whatHeading: 'What You Get',
    what: ['Argan oil, avocado oil and shea butter: the featured ingredients of this Revival Blend.', 'Formulated to relieve dry-skin roughness and cracking and restore smoothness.', 'Peach scent.', '370 ml pump bottle, from the Optimum Care Recipe range.', 'Free from parabens, phthalates and colorants.', 'Made for dry skin.'],
    homeHeading: 'Bring a Little of It Home',
    home: 'A peach-scented pump bottle for the bathroom at home. If your skin is dry in winter, it is a small way to keep the holiday going.',
    faqHeading: 'Good to Know',
    faq: [['Is it right for my skin?', 'Revival Blend is made for dry skin. For normal skin, ask us about the Eva Nourishing Blend with coconut scent.'], ['What is the scent?', 'Peach.'], ['What are the featured ingredients?', 'Argan oil, avocado oil and shea butter. It is free from parabens, phthalates and colorants.'], ['How big is it?', '370 ml.'], HOW],
    selectionHeading: 'Your Royal Selection', selection: SEL, button: 'ADD TO MY SELECTION',
  };
  DR['body-22'] = {
    id: 'body-22', brand: 'Eva', title: 'Radiance Body Lotion – Marshmallow Scent',
    headline: 'Radiance and softness for normal skin.',
    intro: 'Eva Optimum Care Recipe Radiance Blend Lotion for normal skin, with vitamin C and marshmallow extract, scented with marshmallow.',
    story: ['Evening on the terrace. Skin warm from the day, a sweet drink in your hand, and nowhere to be.', 'Radiance Blend is made for normal skin, to bring back softness and a radiant look. It carries vitamin C, marshmallow extract and light-diffusing particles, and a marshmallow scent.'],
    whatHeading: 'What You Get',
    what: ['Vitamin C and marshmallow extract: the featured ingredients of this Radiance Blend.', 'Light-diffusing particles.', 'Formulated to restore softness.', 'Marshmallow scent.', '370 ml pump bottle, from the Optimum Care Recipe range.', 'Made for normal skin.'],
    homeHeading: 'Bring a Little of It Home',
    home: 'A sweet-scented bottle for the shelf at home. A small gift for yourself, or add a second bottle to your selection for someone else and we will confirm availability.',
    faqHeading: 'Good to Know',
    faq: [['Is it right for my skin?', 'Radiance Blend is made for normal skin. For dry skin, ask us about the Eva Revival Blend with peach scent.'], ['What is the scent?', 'Marshmallow.'], ['What are the featured ingredients?', 'Vitamin C, marshmallow extract and light-diffusing particles.'], ['How big is it?', '370 ml.'], HOW],
    selectionHeading: 'Your Royal Selection', selection: SEL, button: 'ADD TO MY SELECTION',
  };
}

const MAYO_USE = 'Apply generously to the length of your hair and scalp and massage gently to cover it completely. Use it about 3 minutes before your Vatika shampoo, then rinse.';
const H3: HSeed[] = [
  { id: 'hair-37', title: 'Vatika Naturals Hair Mayonnaise, Repair & Restore, 500 ml', size: '500 ml', kind: 'mask',
    headline: 'The hair mask that looks like it belongs in the kitchen.',
    intro: 'Dabur Vatika Naturals Hair Mayonnaise for Repair & Restore, a rich mask with honey, castor and marrow.',
    story: ['Sun and sea can leave hair dry. A hair mayonnaise mask is the old-fashioned answer: a thick, creamy treatment you work through the hair before you shampoo.', 'This one is made with honey, castor and marrow, with vegetable oil and egg in the mix. It is made for hair that is dry, damaged or has dull, split ends, and it is meant to leave hair softer and less frizzy.'],
    feat: ['Honey, castor and marrow extracts.', 'Made for damaged, dry or over-processed hair.', 'For all hair types, including natural, relaxed, pressed, texturized and color-treated hair.'], home: 'A 500 ml tub you can take home for regular treatments.',
    faqQ: ['Is it for my hair type?', 'It suits all hair types, including color-treated hair.'], use: MAYO_USE },
  { id: 'hair-36', title: 'Vatika Naturals Hair Mayonnaise, Hair Fall Control, 500 ml', size: '500 ml', kind: 'mask',
    headline: 'Cactus, garlic and ghergir, in a creamy mask.',
    intro: 'Dabur Vatika Naturals Hair Mayonnaise for Hair Fall Control, a mask with cactus, garlic and ghergir.',
    story: ['A hair mask is a few minutes of real care before the wash.', 'This mask is blended with cactus, garlic and ghergir, with vegetable oil and egg. It is made for softness and shine, for all hair types including damaged and over-processed hair.'],
    feat: ['Cactus, garlic and ghergir extracts.', 'Made for softness and shine.', 'For all hair types, including color-treated hair.'], home: 'A 500 ml tub for a regular treatment habit.',
    faqQ: ['What does Hair Fall Control mean?', 'It is the name of the range. This page does not promise a result, and results vary from person to person.'], use: MAYO_USE },
  { id: 'hair-35', title: 'Vatika Naturals Hair Mayonnaise, Extreme Moisturizing, 500 ml', size: '500 ml', kind: 'mask',
    headline: 'For hair that never feels moisturized enough.',
    intro: 'Dabur Vatika Naturals Hair Mayonnaise for Extreme Moisturizing, a mask with almond, coconut and sesame.',
    story: ['Curly, dry or sun-tired hair keeps asking for more moisture. This mask is made for exactly that.', 'It is made with almond, coconut and sesame, with olive oil and egg. It moisturizes the scalp and hair, softens, adds shine, and is made to cut down frizz and help protect hair from humidity and dryness. It has no harsh chemicals and is suitable for all hair types.'],
    feat: ['Almond, coconut and sesame extracts.', 'Made for dry and curly hair.', 'Suitable for all hair types.'], home: 'Keep it for the days after the beach, when hair needs it most.',
    faqQ: ['Is it good for curly hair?', 'It works well for curly and dry hair.'], use: MAYO_USE },
];
for (const s of H3) DR[s.id] = hk(s);

const OIL_USE = 'Massage into the hair with your fingertips from root to tip. Leave it on for at least 20 minutes, then wash with Vatika Naturals shampoo.';
const COND_USE = 'After shampooing, rinse hair well and spread the conditioner evenly on the ends. Leave it for 2 minutes, then rinse thoroughly.';
const H4: HSeed[] = [
  { id: 'hair-46', title: 'Vatika Naturals Aloe Vera Enriched Hair Oil, Olive & Henna, 180 ml', size: '180 ml', kind: 'oil',
    headline: 'Aloe vera, olive and henna, in one light oil.',
    intro: 'Dabur Vatika Naturals Aloe Vera Enriched Hair Oil with olive and henna.',
    story: ['A hair oil does not have to be a heavy one. Here aloe vera is paired with olive and henna.', 'It is made to act as a natural conditioner and moisturizer for shiny hair, to soften hair and cut down frizz, and to leave it feeling soft and detangled. It is also made to keep the scalp comfortable and to soothe an itchy one.'],
    feat: ['Aloe vera with olive and henna.', 'Made to soften hair and reduce frizz.', 'Made with Ayurvedic herbs.'], home: 'A 180 ml bottle for a weekly oil routine at home.',
    faqQ: ['When do I use it?', 'Before you wash. Leave it on for at least 20 minutes, then shampoo.'], use: OIL_USE },
  { id: 'hair-49', title: 'Vatika Naturals Watercress Enriched Hair Oil, Marrow & Vitamin E, 180 ml', size: '180 ml', kind: 'oil',
    headline: 'Watercress, the green ingredient in a hair oil.',
    intro: 'Dabur Vatika Naturals Watercress Enriched Hair Oil with marrow and vitamin E.',
    story: ['Watercress is not what most people expect to find in a hair oil, which is the reason to look at it.', 'This oil is made with watercress, marrow and vitamin E. It is made to act as a natural conditioner and moisturizer, to nourish the hair and scalp, calm an itchy scalp and help with dry, damaged hair, and to leave hair shiny and soft.'],
    feat: ['Watercress, marrow and vitamin E.', 'Made to condition and moisturize.', 'Made to soften hair and reduce frizz.'], home: 'A 180 ml bottle for a regular pre-wash oil.',
    faqQ: ['How long do I leave it on?', 'At least 20 minutes before you wash it out with Vatika Naturals shampoo.'], use: OIL_USE },
  { id: 'hair-32', title: 'Vatika Naturals Cactus Hair Fall Control Conditioner, 360 ml', size: '360 ml', kind: 'conditioner',
    headline: 'Cactus and ghergir, in a conditioner.',
    intro: 'Dabur Vatika Naturals Hair Fall Control Conditioner with cactus and ghergir.',
    story: ['A conditioner after the shampoo is a simple habit.', 'This one is enriched with cactus and ghergir and with Vatika oils. It is made to nourish the hair from root to tip and leave strands smooth and shiny. It is part of the Hair Fall Control range, next to the matching shampoo.'],
    feat: ['Cactus and ghergir with Vatika oils.', 'Made to nourish the hair from root to tip.', 'Pairs with the Vatika Hair Fall Control shampoo.'], home: 'A 360 ml bottle to keep in your bathroom at home.',
    faqQ: ['What does Hair Fall Control mean?', 'It is the name of the range. This page does not promise a result, and results vary from person to person.'], use: COND_USE },
];
for (const s of H4) DR[s.id] = hk(s);

const TRI_USE = 'Massage into the scalp and hair with your fingertips in circular motions to spread the oil evenly. For a longer treatment, it can be left on overnight. Wash your hair every 2 to 3 days.';
const H5: HSeed[] = [
  { id: 'hair-20', title: 'Trichup Black Seed Hair Oil, 100 ml', size: '100 ml', kind: 'oil',
    headline: 'The seed of blessing, in a hair oil.',
    intro: 'Trichup Black Seed Hair Oil, with black seed, sesame and coconut oils.',
    story: ['Black seed has been used in hair care for centuries, and it is often called the seed of blessing. Trichup puts it in a hair oil with sesame and coconut.', 'Black seed is rich in essential fatty acids, vitamins and minerals, including omega 3, 6 and 9. The oil is made to nourish the hair, protect it from damage and support healthy-looking hair.'],
    feat: ['Black seed oil with sesame and coconut oils.', 'Made to nourish and protect hair from damage.'], home: 'A 100 ml bottle for an overnight oiling routine.',
    faqQ: ['Can I leave it overnight?', 'Yes. Trichup suggests leaving it on the scalp and hair overnight for nourishment.'], use: TRI_USE },
  { id: 'hair-19', title: 'Trichup Hair Fall Control Hair Oil, 100 ml', size: '100 ml', kind: 'oil',
    headline: 'Amla, licorice and bhringraj, in a classic herbal oil.',
    intro: 'Trichup Hair Fall Control Hair Oil, with sesame and coconut oils, amla, licorice and bhringraj.',
    story: ['Oiling is a habit for many families, and the herbs in the bottle are the reason to choose one oil over another.', 'This oil combines sesame and coconut oil with amla, licorice and bhringraj, and it is made to nourish hair and leave it healthy, lustrous and shiny.'],
    feat: ['Sesame and coconut oil with amla, licorice and bhringraj.', 'Made to nourish hair.'], home: 'A 100 ml bottle you can keep for regular oiling at home.',
    faqQ: ['What does Hair Fall Control mean?', 'It is the name of the range. This page does not promise a result, and results vary from person to person.'], use: TRI_USE },
  { id: 'hair-21', title: 'Trichup Healthy, Long & Strong Hair Oil, 100 ml', size: '100 ml', kind: 'oil',
    headline: 'An everyday oil for the whole family.',
    intro: 'Trichup Healthy, Long & Strong Hair Oil, with sesame and coconut oils, aloe vera and neem.',
    story: ['Some oils are for one person. This one is made for the entire family and suits all hair types.', 'It has sesame and coconut oil with aloe vera and neem, and it is made to give the hair follicles essential nutrients and to help promote healthy, strong hair.'],
    feat: ['Sesame and coconut oil with aloe vera and neem.', 'For the entire family.', 'Suitable for all types of hair.'], home: 'One bottle for the whole household.',
    faqQ: ['Who can use it?', 'It is made for the entire family and suits all types of hair.'], use: TRI_USE },
  { id: 'hair-28', title: 'Vatika Naturals Garlic Conditioner, 360 ml', size: '360 ml', kind: 'conditioner',
    headline: 'Garlic, but make it a conditioner.',
    intro: 'Dabur Vatika Naturals Garlic Conditioner with Spanish garlic and Vatika oils.',
    story: ['Garlic is a Vatika signature, and this conditioner brings it to the step after the wash.', 'It is made with Spanish garlic and Vatika oils and uses Moisture Lock technology to nourish tangled and frizzy hair without weighing it down. It is made to add shine and volume and to ease a dry scalp. For the best result, use it after the Vatika Garlic shampoo.'],
    feat: ['Spanish garlic with Vatika oils.', 'Moisture Lock technology.', 'Pairs with the Vatika Garlic shampoo.'], home: 'A 360 ml bottle to sit beside the matching garlic shampoo.',
    faqQ: ['Will it weigh my hair down?', 'It is made not to. It uses Moisture Lock technology to nourish without weighing hair down.'], use: COND_USE },
  { id: 'hair-07', title: 'Vatika Naturals Almond Enriched Hair Oil, 180 ml', size: '180 ml', kind: 'oil',
    headline: 'Twenty minutes of almond, before you wash.',
    intro: 'Dabur Vatika Naturals Almond Enriched Hair Oil with almond, sesame and coconut.',
    story: ['Some oils ask for a night. This one asks for twenty minutes.', 'It is made with almond, sesame and coconut oils and with vitamins A, E and F. It is made to soften, moisturize and condition dry or damaged hair, and it is free from parabens, sulfates and silicones.'],
    feat: ['Almond, sesame and coconut oils with vitamins A, E and F.', 'Free from parabens, sulfates and silicones.', 'Made for dry, curly or chemically treated hair.'], home: 'A 180 ml bottle for a pre-wash treatment at home.',
    faqQ: ['How long do I leave it on?', 'At least 20 minutes, then wash with Vatika Naturals shampoo.'], use: OIL_USE },
  { id: 'hair-29', title: 'Vatika Naturals Argan Anti-Breakage Shampoo, 180 ml', size: '180 ml', kind: 'shampoo',
    headline: 'Moroccan argan, for hair that tangles.',
    intro: 'Dabur Vatika Naturals Moroccan Argan Anti-Breakage Shampoo.',
    story: ['Dry, unruly hair is often asking for the same thing: moisture, and something to smooth it.', 'This shampoo is made with Moroccan argan, which is rich in antioxidants. It is made for dry, unmanageable hair, to leave it soft, silky and smooth, and to improve its elasticity and shine.'],
    feat: ['Moroccan argan.', 'Made for dry and unmanageable hair.', 'Made to add softness, smoothness and shine.'], home: 'A 180 ml bottle for everyday washes.',
    faqQ: ['Who is it for?', 'Dry, unruly hair that needs softness and shine.'], use: HAIR_USE_SHAMPOO },
];
for (const s of H5) DR[s.id] = hk(s);
for (const id of ['hair-19', 'hair-20', 'hair-21']) DR[id].brand = 'Trichup';

const NIVEA_BODY_USE = 'After a shower, dry your skin gently with a towel. Apply generously to the body and massage it in. Give it time to absorb. Reapply to spots that are especially dry.';
const H6: HSeed[] = [
  { id: 'body-19', title: 'Nivea Rich Nourishing Body Lotion', size: 'See the pack for the size', kind: 'lotion',
    headline: 'A rich lotion for after the sea.',
    intro: 'Nivea Rich Nourishing Body Lotion, a body lotion made for dry skin.',
    story: ['Sun, sea water and air conditioning can leave skin feeling tight. A rich lotion after the shower is a simple habit that helps.', 'Nivea Rich Nourishing is a body lotion in Nivea\'s nourishing range for dry skin. Check the pack in the pharmacy for its exact formula and size.'],
    feat: ['Nivea body lotion.', 'Rich nourishing range, for dry skin.', 'Exact formula and size are on the pack.'], home: 'A bottle for the bathroom shelf, to use after every shower.',
    faqQ: ['Which formula is it?', 'Please check the pack at the pharmacy. Formulas can differ by market, so we only describe it by name here.'], use: NIVEA_BODY_USE },
  { id: 'body-20', title: 'Nivea Rich Nourishing Body Lotion, 72h Moisture', size: 'See the pack for the size', kind: 'lotion',
    headline: 'The rich lotion, labeled 72h Moisture.',
    intro: 'Nivea Rich Nourishing Body Lotion from the range labeled 72h Moisture.',
    story: ['A body lotion is easiest to keep up when it is part of the shower routine.', 'This Nivea Rich Nourishing lotion is labeled 72h Moisture. Ask us at the pharmacy and check the pack for the exact claim wording, test conditions and size.'],
    feat: ['Nivea body lotion.', 'Labeled 72h Moisture.', 'Exact claim wording and size are on the pack.'], home: 'Easy to pack for the days after the beach.',
    faqQ: ['What does 72h Moisture mean?', 'It is the label on the product name. The pack states the exact claim and how it was tested.'], use: NIVEA_BODY_USE },
];
for (const s of H6) { DR[s.id] = hk(s); DR[s.id].brand = 'Nivea'; }
