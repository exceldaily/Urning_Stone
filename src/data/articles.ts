/** Educational articles. Real content, written for this brand — replace freely. */
export interface Article {
  slug: string;
  title: string;
  standfirst: string;
  readingMinutes: number;
  published: string;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
  related: string[];
}

export const articles: Article[] = [
  {
    slug: 'how-to-choose-the-right-urn-size',
    title: 'How to choose the right urn size',
    standfirst: 'Capacity is the one thing worth getting right first. Everything else — material, shape, finish — is easier once you know the number you are looking for.',
    readingMinutes: 4,
    published: '2026-02-04',
    body: [
      {
        paragraphs: [
          'Urn capacity is measured in cubic inches. The common planning guideline is that roughly one pound of healthy body weight needs about one cubic inch of space. Someone who weighed around 170 pounds would usually be well served by an urn of about 170 to 200 cubic inches.',
          'This is an estimate rather than a rule. Bone density, height and the practices of the individual crematory all affect the final volume, so treat the number as a starting point and confirm it with the crematory or funeral provider if you can.',
        ],
      },
      {
        heading: 'When you are unsure, size up',
        paragraphs: [
          'An urn with a little room to spare closes properly and is easier to fill without worry. An urn that is slightly too small cannot be used at all. If you are choosing between two capacities, the larger one is almost always the more comfortable decision.',
        ],
      },
      {
        heading: 'The sizes you are likely to see',
        paragraphs: ['Most of the market sorts into five bands:'],
        list: [
          'Adult urns, usually 180 to 220 cubic inches.',
          'Extra-large urns, 250 cubic inches and above, for larger adults.',
          'Companion urns, 380 to 440 cubic inches, holding two people, often in separate compartments.',
          'Keepsake urns, 1 to 20 cubic inches, holding a small portion.',
          'Pet urns, sized by the animal\u2019s weight on the same one-pound-to-one-cubic-inch guide.',
        ],
      },
      {
        heading: 'If ashes will be divided',
        paragraphs: [
          'Families often keep one main urn and share keepsakes among relatives. If that is your plan, choose the main urn at full capacity anyway. Keepsakes hold very little, and it is easier to fill them from a full urn than to discover later that the main vessel is short.',
        ],
      },
      {
        heading: 'A practical checklist',
        paragraphs: ['Before ordering, it helps to know:'],
        list: [
          'The approximate healthy body weight of the person you are remembering.',
          'Whether the ashes will be kept whole, divided, buried or scattered.',
          'Where the urn will sit, and the height and depth of that space.',
          'Whether a cemetery or columbarium has its own size limits — many do.',
        ],
      },
    ],
    related: ['choosing-an-urn-that-feels-personal', 'understanding-keepsake-and-companion-urns'],
  },
  {
    slug: 'choosing-an-urn-that-feels-personal',
    title: 'Choosing an urn that feels personal',
    standfirst: 'There is no correct answer here, only a fitting one. A few questions tend to make the choice clearer.',
    readingMinutes: 3,
    published: '2026-02-18',
    body: [
      {
        paragraphs: [
          'People often arrive at this decision expecting to feel certain, and are unsettled when they do not. That is normal. You are choosing an object to stand in for a person, and no object will ever be equal to that. What an urn can do is feel right — recognisable, in keeping, unembarrassed.',
        ],
      },
      {
        heading: 'Start with the room, not the catalogue',
        paragraphs: [
          'Think about where it will actually live. A shelf among books, a mantel, a windowsill, a side table in a hallway. The materials already in that room — oak, brass, painted wood, ceramic — are a better guide than any product category.',
        ],
      },
      {
        heading: 'Think about what they used and liked',
        paragraphs: [
          'Someone who worked with their hands often suits wood. Someone precise and unfussy often suits plain geometry. Someone who gardened, walked or fished often suits ceramic, stone or a botanical motif. These are not rules, but they are a useful way in when the choice feels abstract.',
        ],
      },
      {
        heading: 'Words are optional',
        paragraphs: [
          'Engraving makes a piece specific, but a name and two dates can feel spare in a way some families find difficult. Others find it exactly right. A short line — something they said often, or a place that mattered — is a middle path. If you are unsure, plain is not a failure of effort; many families add engraving later.',
        ],
      },
      {
        heading: 'Give yourself permission to take a few days',
        paragraphs: [
          'Very few decisions in this process need to be made quickly. A crematory will normally hold ashes in a temporary container for some time. Ask them how long, then take the time you are given.',
        ],
      },
    ],
    related: ['how-to-choose-the-right-urn-size', 'understanding-keepsake-and-companion-urns'],
  },
  {
    slug: 'understanding-keepsake-and-companion-urns',
    title: 'Understanding keepsake and companion urns',
    standfirst: 'Two words that come up constantly and are rarely explained. Here is what each one means in practice.',
    readingMinutes: 4,
    published: '2026-03-06',
    body: [
      {
        heading: 'Keepsake urns',
        paragraphs: [
          'A keepsake urn holds a small portion of ashes rather than all of them — typically between 1 and 20 cubic inches. They exist because grief is rarely held in one place. Children who live in different cities, a sibling abroad, a parent who wants something small on a bedside table: keepsakes let several people keep something without anyone having to give anything up.',
          'Most families choose a full-size urn as well, and fill the keepsakes from it. Dividing ashes is a straightforward practical task, and a funeral director will usually do it for you if you would rather not.',
        ],
      },
      {
        heading: 'Memorial jewelry',
        paragraphs: [
          'Cremation pendants are keepsakes worn rather than displayed, holding a very small amount — often a fraction of a cubic inch. They usually arrive with a small funnel and a sealing adhesive. Fill them somewhere still, over a sheet of paper, without hurrying.',
        ],
      },
      {
        heading: 'Companion urns',
        paragraphs: [
          'A companion urn holds two people. Most have divided interiors with two sealed compartments, which matters because the two are rarely placed at the same time — often years apart. A divided design means the urn can be opened again without disturbing what is already inside.',
          'Capacity is usually 380 to 440 cubic inches in total, roughly double an adult urn. Check whether the compartments are separate or shared before ordering, and check the dimensions against any cemetery niche you have in mind.',
        ],
      },
      {
        heading: 'Choosing between them',
        paragraphs: [
          'These are not competing options. A common arrangement is one main urn for the home, two or three keepsakes for family, and sometimes a small portion set aside for scattering somewhere that mattered. If that is your plan, tell us and we will help you work out the sizes.',
        ],
      },
    ],
    related: ['how-to-choose-the-right-urn-size', 'choosing-an-urn-that-feels-personal'],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
