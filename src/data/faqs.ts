/** FAQ content. Answers that depend on business policy are marked TODO. */
export interface Faq { q: string; a: string; group: string; policyPending?: boolean }

export const faqs: Faq[] = [
  { group: 'Choosing', q: 'How do I know what size urn I need?', a: 'Capacity is measured in cubic inches, and the usual planning guideline is about one cubic inch for each pound of healthy body weight. Someone who weighed 170 pounds is usually well served by an urn of 170 to 200 cubic inches. It is an estimate rather than a guarantee, so confirm it with the crematory if you can, and size up when you are between two options.' },
  { group: 'Choosing', q: 'What is the difference between a keepsake and a companion urn?', a: 'A keepsake holds a small portion of ashes, usually 1 to 20 cubic inches, so several family members can each keep something. A companion urn holds two people, normally in two separate sealed compartments so it can be opened again years later without disturbing what is already inside.' },
  { group: 'Choosing', q: 'Can ashes be divided between more than one urn?', a: 'Yes, and it is common. Many families keep one full-size urn and share keepsakes among relatives. A funeral director will usually divide ashes for you if you would rather not do it yourself.' },
  { group: 'Choosing', q: 'Do I have to decide quickly?', a: 'Almost never. Crematories normally hold ashes in a temporary container, often for weeks. Ask them how long you have, and then take the time you are given.' },
  { group: 'Choosing', q: 'Will an urn fit in a cemetery niche or columbarium?', a: 'Check the exterior dimensions against the space before ordering, as niches vary widely and many have strict limits. Every product page lists height, width and depth.' },
  { group: 'Personalization', q: 'What can be engraved?', a: 'Depending on the piece, a name, dates, a short inscription and sometimes a simple motif. Each product page shows exactly which options that item supports, with live character limits as you type.' },
  { group: 'Personalization', q: 'Will I see the engraving before it is made?', a: 'You will see a live preview of the layout as you type, and you are asked to confirm the spelling before adding the item to your basket. The preview shows placement and wording, not the exact final finish.' },
  { group: 'Personalization', q: 'Can a personalized item be returned?', a: 'TODO: confirm the personalization returns policy before launch. Engraved items are commonly final sale because they cannot be resold, but we will not state a policy here until the business has set one.', policyPending: true },
  { group: 'Personalization', q: 'Can I add engraving later?', a: 'TODO: confirm whether later engraving is offered, and on which materials.', policyPending: true },
  { group: 'Ordering', q: 'How long will my order take?', a: 'TODO: confirm processing and delivery timeframes. Plain items and engraved items normally have different lead times, and both should be stated plainly at checkout.', policyPending: true },
  { group: 'Ordering', q: 'How is the order packaged?', a: 'Everything ships wrapped and boxed with care, in plain outer packaging with no branding that identifies the contents.' },
  { group: 'Ordering', q: 'Do I need an account to order?', a: 'No. You can check out as a guest. An account only saves your details and favourites for another time.' },
  { group: 'Ordering', q: 'What happens if something arrives damaged?', a: 'TODO: confirm the damage and replacement process, including the reporting window and whether photographs are required.', policyPending: true },
  { group: 'Care', q: 'How do I look after the urn?', a: 'Dust with a soft, dry cloth. Avoid household cleaners, and keep wooden and biodegradable pieces out of prolonged direct sunlight and damp. Each product page lists care details for that material.' },
  { group: 'Care', q: 'How is the urn sealed?', a: 'It depends on the closure. Threaded lids and base plates seat firmly on their own; some pieces use a silicone ring or a felt seal. If you would like a permanent seal, a small amount of clear silicone adhesive around the closure is the usual approach.' },
];

export const faqGroups = ['Choosing', 'Personalization', 'Ordering', 'Care'];
