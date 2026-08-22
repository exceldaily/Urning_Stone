'use client';
import { useState } from 'react';
import { site } from '@/data/site';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { track } from '@/lib/analytics';

export default function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', topic: 'Choosing an urn', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = 'Please tell us what to call you.';
    if (!/.+@.+\..+/.test(values.email)) next.email = 'Enter an email address in the form name@example.com so we can reply.';
    if (values.message.trim().length < 10) next.message = 'A sentence or two is enough — just enough for us to help.';
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO: connect to the support inbox or helpdesk provider.
    track('support_requested', { topic: values.topic });
    setSent(true);
  };

  const trail = [{ name: 'Home', href: '/' }, { name: 'Help', href: '/help/faq' }, { name: 'Contact', href: '/help/contact' }];

  return (
    <div className="shell section">
      <Breadcrumbs trail={trail} />
      <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl">Contact and support</h1>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink2">
            Tell us as much or as little as you like. There is no wrong question here, and we will not push you towards anything.
          </p>

          {sent ? (
            <div role="status" className="mt-8 rounded-[1.1rem] border border-hairline bg-sage-wash p-8">
              <h2 className="font-display text-2xl">Thank you — your message is with us.</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink2">
                We will reply to {values.email}. If it is urgent, the phone number on this page reaches us faster.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="c-name" className="text-[0.9rem] font-medium">Your name</label>
                <input id="c-name" className={`field mt-1.5 ${errors.name ? 'border-bronze' : ''}`} value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'c-name-err' : undefined} />
                {errors.name && <p id="c-name-err" role="alert" className="mt-1.5 text-[0.82rem] text-bronze-deep">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className="text-[0.9rem] font-medium">Email address</label>
                <input id="c-email" type="email" className={`field mt-1.5 ${errors.email ? 'border-bronze' : ''}`} value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'c-email-err' : undefined} />
                {errors.email && <p id="c-email-err" role="alert" className="mt-1.5 text-[0.82rem] text-bronze-deep">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="c-topic" className="text-[0.9rem] font-medium">What is it about?</label>
                <select id="c-topic" className="field mt-1.5" value={values.topic} onChange={(e) => setValues((v) => ({ ...v, topic: e.target.value }))}>
                  <option>Choosing an urn</option><option>Sizes and capacity</option><option>Engraving</option>
                  <option>An existing order</option><option>Delivery</option><option>Returns</option><option>Something else</option>
                </select>
              </div>
              <div>
                <label htmlFor="c-msg" className="text-[0.9rem] font-medium">Your message</label>
                <textarea id="c-msg" rows={5} className={`field mt-1.5 ${errors.message ? 'border-bronze' : ''}`} value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'c-msg-err' : undefined} />
                {errors.message && <p id="c-msg-err" role="alert" className="mt-1.5 text-[0.82rem] text-bronze-deep">{errors.message}</p>}
              </div>
              <button type="submit" className="btn-primary">Send message</button>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.1rem] border border-hairline bg-linen/60 p-6">
            <h2 className="font-display text-xl">Other ways to reach us</h2>
            <dl className="mt-4 space-y-3 text-[0.92rem]">
              <div><dt className="text-muted">Email</dt><dd>{site.contact.email}</dd></div>
              <div><dt className="text-muted">Phone</dt><dd>{site.contact.phone}</dd></div>
              <div><dt className="text-muted">Hours</dt><dd>{site.contact.hours}</dd></div>
              <div><dt className="text-muted">Address</dt><dd>{site.contact.address}</dd></div>
            </dl>
            <p className="mt-4 text-[0.8rem] text-muted">Contact details are placeholders until the business supplies them.</p>
          </div>
          <div className="rounded-[1.1rem] border border-hairline bg-cream p-6">
            <h2 className="font-display text-lg">If a date is approaching</h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink2">
              Tell us the date when you write. We will say honestly whether it can be met rather than let you find out late.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
