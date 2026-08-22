import { site } from '@/data/site';

export function AnnouncementBar() {
  return (
    <div className="border-b border-hairline bg-linen">
      <p className="shell py-2.5 text-center text-[0.78rem] tracking-[0.06em] text-ink2">
        {site.announcement}
      </p>
    </div>
  );
}
