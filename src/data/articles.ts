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
    slug: 'what-size-urn-for-my-pet',
    title: 'What size urn will I need?',
    standfirst: 'Capacity is the one thing worth getting right first. Everything else — material, shape, finish — is easier once you know the number you are looking for.',
    readingMinutes: 4,
    published: '2026-05-04',
    body: [
      {
        paragraphs: [
          'Urn capacity is measured in cubic inches, and the working guideline is simple: roughly one cubic inch of space for every pound your pet weighed. A cat of 12 lb is comfortably held by an urn of 15 to 20 cubic inches. A labrador of 70 lb wants something closer to 80.',
          'This is an estimate rather than a rule. Breed, bone density and each crematorium’s practice all affect the final volume, so treat the number as a starting point and confirm it with them if you can.',
        ],
      },
      {
        heading: 'Use their healthy weight, not their last weight',
        paragraphs: [
          'This is the mistake we see most often. Illness and old age take weight off an animal without changing their frame, and it is the frame the estimate really follows. An old dog who dropped from 65 lb to 48 lb still needs an urn sized nearer the 65.',
          'If you are not certain what they weighed in good health, your vet will almost always have it on file from an earlier visit.',
        ],
      },
      {
        heading: 'Long coats are misleading',
        paragraphs: [
          'A heavily coated animal looks considerably bigger than they weigh. If you are estimating by eye rather than from a number, you will usually guess high on a collie or a persian and low on a whippet. Where you can, use a real weight rather than an impression.',
        ],
      },
      {
        heading: 'When you are unsure, size up',
        paragraphs: [
          'An urn with a little room to spare closes properly and is easier to fill without worry. An urn that is slightly too small cannot be used at all, and finding that out with the ashes already in front of you is genuinely upsetting.',
          'If you are choosing between two capacities, the larger one is almost always the more comfortable decision.',
        ],
      },
      {
        heading: 'A rough guide by animal',
        paragraphs: ['As a starting point, before you check their actual weight:'],
        list: [
          'Rabbit, guinea pig or small bird — 10 to 15 cubic inches',
          'Cat — 15 to 25 cubic inches',
          'Small dog, up to 30 lb — 25 to 35 cubic inches',
          'Medium dog, 30 to 60 lb — 35 to 65 cubic inches',
          'Large dog, 60 to 100 lb — 65 to 105 cubic inches',
          'Giant breed, over 100 lb — 105 cubic inches and above',
        ],
      },
      {
        heading: 'Check the outside as well as the inside',
        paragraphs: [
          'Capacity tells you what will fit inside. If the urn is going on a particular shelf, in a cabinet, or into a garden niche, check the exterior height, width and depth too — they are listed on every product page. A tall sculpted piece can hold less than a squat one twice its height suggests.',
        ],
      },
    ],
    related: ['bringing-them-home', 'keepsakes-when-a-pet-belonged-to-everyone'],
  },
  {
    slug: 'bringing-them-home',
    title: 'Bringing them home',
    standfirst: 'What actually happens when the ashes come back, and how to move them into an urn without making it harder than it needs to be.',
    readingMinutes: 4,
    published: '2026-05-12',
    body: [
      {
        paragraphs: [
          'Most crematoriums return ashes in a sealed plastic bag inside a plain temporary container — often a rectangular tin or a cardboard box, sometimes with a paper label. It is not meant to be permanent, but there is nothing wrong with it, and no rule says you must move them at all, or move them soon.',
        ],
      },
      {
        heading: 'You do not have to open the bag',
        paragraphs: [
          'This is the part people worry about most, and it is the part that turns out to be easiest. In almost every case the sealed bag lifts straight out of the temporary container and drops into the urn as it is. You never have to see or handle the ashes themselves.',
          'If the bag is slightly too large for the opening, it will usually settle if you ease it in rather than push. If it genuinely will not fit, the urn is too small — stop, and talk to us before doing anything else.',
        ],
      },
      {
        heading: 'For keepsakes and keyrings',
        paragraphs: [
          'Smaller pieces work differently: you are taking a pinch rather than filling anything. Each one comes with a small funnel. Work over a sheet of paper so anything that misses can be tipped back, do it somewhere without a draught, and give yourself more time than you think you need.',
          'There is no ceremony required. Plenty of people do this at the kitchen table on an ordinary afternoon, and that is a perfectly good way to do it.',
        ],
      },
      {
        heading: 'Sealing it, if you want to',
        paragraphs: [
          'Threaded lids and base plates seat firmly on their own and do not need anything more. If you would like the closure permanent — because it will be moved, or because you would rather not be able to open it — a thin bead of clear silicone adhesive around the seam is the usual approach.',
          'Think about it before you do it. It is not easily undone, and some people find later that they wanted to add a collar tag or a lock of fur.',
        ],
      },
      {
        heading: 'Where it goes',
        paragraphs: [
          'There is no correct answer. Some families want the urn somewhere central; others find that too much at first and start it on a shelf in another room, moving it closer over months. Both are normal. You are allowed to change your mind, more than once.',
        ],
      },
    ],
    related: ['what-size-urn-for-my-pet', 'keepsakes-when-a-pet-belonged-to-everyone'],
  },
  {
    slug: 'keepsakes-when-a-pet-belonged-to-everyone',
    title: 'When a pet belonged to everyone',
    standfirst: 'One animal, several households, and one urn that can only live in one of them. How families share a pet they all loved.',
    readingMinutes: 3,
    published: '2026-05-20',
    body: [
      {
        paragraphs: [
          'A dog who was there for fifteen years belonged to the children who have since moved out, and often to a partner who has since left. When the ashes come back, they come back to one address. That is a quietly difficult thing, and it comes up more often than people expect.',
        ],
      },
      {
        heading: 'Dividing ashes is normal',
        paragraphs: [
          'Ashes can be divided, and doing so is common and entirely ordinary. Your crematorium will usually divide them for you if you ask, which spares anyone the job. Many families keep one main urn at the family home and a keepsake each for the people who are not there.',
        ],
      },
      {
        heading: 'What a keepsake actually holds',
        paragraphs: [
          'Less than people imagine, and that is the point. A keepsake urn holds up to about 20 cubic inches; a keyring holds a pinch. They are not a smaller version of the urn — they are a token, deliberately, so that no one has to argue about who gets to keep them.',
        ],
      },
      {
        heading: 'Buy them together if you can',
        paragraphs: [
          'Matching pieces bought at the same time will match. Bought a year apart, glazes and finishes drift, particularly on hand-glazed ceramics where no two are identical to begin with. If you think several people will want one, it is worth asking them now rather than later.',
        ],
      },
      {
        heading: 'A note on children',
        paragraphs: [
          'Children often cope with a small object better than a large one, and better than being kept away from the subject entirely. A keyring they can hold, that goes in a pocket and comes out when they want it, tends to be easier than an urn on a high shelf they are told not to touch.',
        ],
      },
    ],
    related: ['what-size-urn-for-my-pet', 'bringing-them-home'],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
