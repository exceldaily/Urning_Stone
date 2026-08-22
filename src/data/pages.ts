/**
 * SUPPORT PAGE CONTENT
 * -------------------------------------------------------------------------
 * Structured content for the policy and support pages, rendered by
 * <DocPage />. Sections marked `pending: true` render inside a visible
 * "to be confirmed" panel so no invented policy can be mistaken for a real one.
 *
 * >> REPLACE BEFORE LAUNCH: every section with `pending: true` must be
 *    rewritten with the real terms and the flag removed. Legal pages should be
 *    reviewed by a qualified adviser in your jurisdiction.
 */

export interface DocSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Renders the section as an unconfirmed placeholder. */
  pending?: boolean;
}

export interface DocPageContent {
  slug: string;
  title: string;
  standfirst: string;
  seoTitle: string;
  seoDescription: string;
  sections: DocSection[];
  updated?: string;
}

const PENDING_NOTE = 'This section is a placeholder. The final wording must be supplied by the business before launch.';

export const docPages: DocPageContent[] = [
  {
    slug: 'shipping',
    title: 'Shipping and delivery',
    standfirst: 'How your order is packed, when it moves, and what you can expect to hear from us along the way.',
    seoTitle: 'Shipping and delivery',
    seoDescription: 'How memorial urn orders are packaged, processed and delivered, with tracking and support details.',
    sections: [
      {
        heading: 'How orders are packaged',
        paragraphs: [
          'Every piece is wrapped, cushioned and boxed by hand. Fragile materials such as ceramic, glass and stone are cradled in foam and double-boxed.',
          'Outer packaging is plain. Nothing on the box identifies what is inside, and no branding suggests the nature of the contents.',
        ],
      },
      { heading: 'Processing times', pending: true, paragraphs: [PENDING_NOTE, 'Required: processing time for plain items, processing time for engraved items, and the cut-off time for same-day dispatch.'] },
      { heading: 'Delivery options and costs', pending: true, paragraphs: [PENDING_NOTE, 'Required: carriers used, service levels, delivery estimates by region, shipping costs or thresholds, and whether a signature is required.'] },
      { heading: 'International delivery', pending: true, paragraphs: [PENDING_NOTE, 'Required: countries served, customs and duties responsibility, and any restrictions on shipping urns internationally.'] },
      {
        heading: 'Tracking your order',
        paragraphs: [
          'You will receive a confirmation when the order is received, a second message when it ships, and tracking details with it. If a date matters — a service, a burial, a family gathering — tell us when you order and we will tell you honestly whether it is achievable.',
        ],
      },
      { heading: 'If a delivery is time-critical', paragraphs: ['Contact us before ordering and we will confirm what is realistic rather than guess. We would rather tell you no in advance than let a date pass.'] },
    ],
  },
  {
    slug: 'returns',
    title: 'Returns and exchanges',
    standfirst: 'What can be returned, how long you have, and what happens with engraved pieces.',
    seoTitle: 'Returns and exchanges',
    seoDescription: 'Return window, condition requirements, exchange process and personalized item terms for memorial urn orders.',
    sections: [
      { heading: 'Return window and condition', pending: true, paragraphs: [PENDING_NOTE, 'Required: the number of days to return, the condition items must be in, whether original packaging is needed, and who pays return postage.'] },
      { heading: 'Personalized and engraved items', pending: true, paragraphs: [PENDING_NOTE, 'Required: whether engraved items are final sale. Engraved pieces are commonly non-returnable because they cannot be resold, but we will not publish that as policy until it is confirmed.'] },
      { heading: 'Damaged or incorrect items', pending: true, paragraphs: [PENDING_NOTE, 'Required: the reporting window, whether photographs are needed, and whether the resolution is replacement, refund or either at the customer\u2019s choice.'] },
      { heading: 'Exchanges', pending: true, paragraphs: [PENDING_NOTE, 'Required: whether exchanges are offered, and how price differences are handled.'] },
      {
        heading: 'If you have already used the urn',
        paragraphs: [
          'Please contact us before returning anything that has held ashes. This needs handling carefully and respectfully, and we would rather talk it through with you first.',
        ],
      },
    ],
  },
  {
    slug: 'personalization-guide',
    title: 'Personalization guide',
    standfirst: 'What can be engraved, how much text fits, and how to check it before you order.',
    seoTitle: 'Personalization and engraving guide',
    seoDescription: 'How engraving works on memorial urns: available fields, character limits, fonts, motifs and proofing.',
    sections: [
      {
        heading: 'What you can add',
        list: [
          'A name, as you would say it aloud rather than as it appears on a document.',
          'Dates, in a format of your choosing — full dates or years alone.',
          'A short inscription, usually one or two lines.',
          'A simple motif, where the material allows it.',
          'A photo medallion on selected pieces.',
        ],
      },
      {
        heading: 'How much text fits',
        paragraphs: [
          'Each field shows a live character count as you type, set to what actually fits on that piece rather than an arbitrary cap. Shorter lines are usually easier to read and sit better on a curved surface.',
        ],
      },
      {
        heading: 'Checking the spelling',
        paragraphs: [
          'You will see a preview of the layout, and you are asked to confirm the spelling before the item is added to your basket. Please read it twice, and if you can, ask someone else to read it too. Engraving cannot be undone once it is cut.',
        ],
      },
      { heading: 'Fonts and finishes by material', pending: true, paragraphs: [PENDING_NOTE, 'Required: the engraving methods available per material, the fonts offered, and any minimum or maximum text sizes.'] },
      { heading: 'Added time for engraving', pending: true, paragraphs: [PENDING_NOTE, 'Required: how many additional days engraving adds to an order.'] },
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    standfirst: 'What we collect, why, and how to ask us to remove it.',
    seoTitle: 'Privacy policy',
    seoDescription: 'How customer data is collected, used, stored and deleted.',
    sections: [
      { heading: 'This policy is not final', pending: true, paragraphs: ['This page is a structural placeholder. A privacy policy is a legal document and must be written or reviewed by a qualified adviser for the jurisdictions you sell into.'] },
      { heading: 'Information we collect', pending: true, paragraphs: [PENDING_NOTE, 'Required: categories of data collected, at which points, and the lawful basis for each.'] },
      { heading: 'How information is used', pending: true, paragraphs: [PENDING_NOTE, 'Required: order fulfilment, support, marketing consent, and any profiling.'] },
      { heading: 'Third parties and processors', pending: true, paragraphs: [PENDING_NOTE, 'Required: payment provider, shipping carriers, email platform, analytics provider, and where data is stored.'] },
      { heading: 'Cookies and analytics', paragraphs: ['No third-party analytics or advertising scripts load until consent is given. Analytics events are queued locally and discarded if consent is declined. See src/lib/analytics.ts.'] },
      { heading: 'Your rights and contact', pending: true, paragraphs: [PENDING_NOTE, 'Required: how to request access, correction or deletion, the response window, and the supervisory authority for complaints.'] },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms and conditions',
    standfirst: 'The terms that apply when you order from us.',
    seoTitle: 'Terms and conditions',
    seoDescription: 'Terms of sale, ordering, pricing, liability and governing law.',
    sections: [
      { heading: 'This document is not final', pending: true, paragraphs: ['This page is a structural placeholder. Terms of sale must be drafted or reviewed by a qualified adviser before launch.'] },
      { heading: 'Orders and acceptance', pending: true, paragraphs: [PENDING_NOTE, 'Required: when a contract is formed, and the right to decline or cancel an order.'] },
      { heading: 'Pricing, taxes and payment', pending: true, paragraphs: [PENDING_NOTE, 'Required: currency, tax handling, pricing error corrections and accepted payment methods.'] },
      { heading: 'Product descriptions and variation', paragraphs: ['Handmade materials vary between pieces. Grain, glaze and veining will differ from the images shown, and capacity figures are nominal. We describe this variation rather than treat it as a fault.'] },
      { heading: 'Liability', pending: true, paragraphs: [PENDING_NOTE, 'Required: limitation of liability and statutory rights that cannot be excluded.'] },
      { heading: 'Governing law', pending: true, paragraphs: [PENDING_NOTE, 'Required: governing jurisdiction and dispute process.'] },
    ],
  },
  {
    slug: 'accessibility',
    title: 'Accessibility statement',
    standfirst: 'What we have built to, where we know we fall short, and how to tell us.',
    seoTitle: 'Accessibility statement',
    seoDescription: 'Our accessibility commitments, conformance target and how to report a barrier.',
    sections: [
      {
        heading: 'Our target',
        paragraphs: [
          'This site is built to meet WCAG 2.1 Level AA. In practice that means text meets minimum contrast ratios, every interactive element can be reached and operated with a keyboard, focus is always visible, images carry meaningful alternative text, and forms name their errors clearly.',
        ],
      },
      {
        heading: 'Motion',
        paragraphs: ['Animation is limited to short, low-amplitude transitions, and is removed entirely when your device or browser requests reduced motion.'],
      },
      { heading: 'Independent audit', pending: true, paragraphs: [PENDING_NOTE, 'Required: date and result of a formal accessibility audit, plus any known outstanding issues.'] },
      {
        heading: 'Telling us about a problem',
        paragraphs: ['If something on this site is difficult or impossible to use, please tell us and we will fix it. Describe what you were trying to do and what happened, and we will reply with a plan and a timeframe.'],
      },
    ],
  },
];

export const getDocPage = (slug: string) => docPages.find((p) => p.slug === slug);

/** Pet loss resources — practical, non-commercial guidance. */
export const resourceGroups = [
  {
    heading: 'In the first days',
    items: [
      { title: 'Ask the crematorium how long they can hold the ashes', body: 'This is almost always longer than families expect, and it removes the pressure to choose an urn quickly.' },
      { title: 'Ask for the approximate volume', body: 'Some crematoriums can tell you the volume in cubic inches, which removes the guesswork from sizing entirely.' },
      { title: 'Check whether the cremation was individual', body: 'Communal cremation means ashes are not returned to you. If you are expecting them back, confirm which service was arranged — this is worth checking early rather than discovering later.' },
      { title: 'Keep the collar somewhere safe', body: 'People very often want the collar, tag or a lock of fur later, and just as often cannot find it. Put it somewhere deliberate now, even in a drawer.' },
    ],
  },
  {
    heading: 'Deciding together',
    items: [
      { title: 'Agree who the decision belongs to', body: 'Disagreement at this point is common and rarely about the urn. Naming one person to decide, with others consulted, tends to help.' },
      { title: 'Consider dividing the ashes', body: 'Keepsakes let several people keep something without anyone having to concede. Your crematorium will usually divide them for you.' },
      { title: 'Say out loud who is keeping what', body: 'If more than one household shared the pet, agree it before the ashes come back. Memory of these conversations diverges quickly.' },
      { title: 'Include children if they want to be', body: 'A small object they can hold is usually easier for a child than an urn on a high shelf they are told not to touch.' },
    ],
  },
  {
    heading: 'Grief that other people underestimate',
    items: [
      { title: 'It is not disproportionate', body: 'Pet grief is frequently dismissed, including by people who mean well. The relationship was daily, physical and years long, and losing it lands accordingly. You are not overreacting.' },
      { title: 'Pet loss support exists', body: 'Several countries have dedicated pet bereavement helplines and counselling services, and many veterinary practices can refer you.', pending: true },
      { title: 'Other pets notice', body: 'Animals left behind often change routine, appetite or sleep for a while. Your vet can advise if it does not settle.' },
      { title: 'Anticipated loss counts too', body: 'If you are choosing an urn before the end, that is a normal and practical thing to do, and it is often easier than deciding afterwards.' },
    ],
  },
  {
    heading: 'Practical matters',
    items: [
      { title: 'Rules on scattering vary', body: 'Permission is often required on public land, and rules differ by country, state and waterway. Check before planning a date.', pending: true },
      { title: 'Burying at home', body: 'Home burial of a pet is permitted in many places and restricted in others, with rules on depth and proximity to water. Check your local authority first.', pending: true },
      { title: 'Travelling with an urn', body: 'Airlines usually require an urn that can be screened, which rules out some metals and stone. Check with the airline in advance.', pending: true },
      { title: 'Burial of a biodegradable urn', body: 'If you are planting a tree over them, choose the spot with some care — it is harder to move later than people expect.' },
    ],
  },
];
