/**
 * PLACEHOLDER HERO / LIFESTYLE ART
 * -------------------------------------------------------------------------
 * A drawn interior standing in for photography: daylight from a window, a
 * console table, books, and an urn resting among them. No people, no cemetery
 * or religious imagery.
 *
 * >> REPLACE WITH PHOTOGRAPHY: drop a photograph at /public/hero.jpg and swap
 *    this component for next/image. Nothing else depends on it.
 *
 * `tone` shifts the palette so the same scene can be reused in the
 * "made for the home you shared" section without looking repeated.
 */

type Tone = 'morning' | 'afternoon' | 'evening';

const palettes: Record<Tone, { wallTop: string; wallBottom: string; outside: string; wood: string; woodDark: string; vessel: string; vesselDark: string; accent: string; floor: string }> = {
  morning:   { wallTop: '#FFFAF0', wallBottom: '#F3EDE1', outside: '#EFF2EA', wood: '#C9A87C', woodDark: '#A88659', vessel: '#D3C0A0', vesselDark: '#9D8560', accent: '#A9B7A1', floor: '#E7DCC9' },
  afternoon: { wallTop: '#FDF6E9', wallBottom: '#EFE8DB', outside: '#F1EFE7', wood: '#B4926A', woodDark: '#8F7150', vessel: '#CFC8BC', vesselDark: '#9A9184', accent: '#C7A099', floor: '#E3D8C4' },
  evening:   { wallTop: '#FAF1E1', wallBottom: '#EBE3D5', outside: '#EDEAE0', wood: '#9C7F58', woodDark: '#7A6141', vessel: '#C2A276', vesselDark: '#8E713F', accent: '#84947C', floor: '#DED2BE' },
};

export function RoomScene({ tone = 'morning', className = '', label }: { tone?: Tone; className?: string; label?: string }) {
  const p = palettes[tone];
  const id = `room-${tone}`;

  return (
    <svg
      viewBox="0 0 640 460"
      role="img"
      aria-label={label ?? 'An illustrated corner of a room: daylight through a window, a console table with books and a small sprig, and a memorial urn resting among them. Photography to follow.'}
      className={`h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={p.wallTop} /><stop offset="100%" stopColor={p.wallBottom} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor={p.outside} />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" /><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-v`} x1="0.15" y1="0" x2="0.95" y2="0.9">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="38%" stopColor={p.vessel} />
          <stop offset="100%" stopColor={p.vesselDark} />
        </linearGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.wood} /><stop offset="100%" stopColor={p.woodDark} />
        </linearGradient>
      </defs>

      <rect width="640" height="460" fill={`url(#${id}-wall)`} />

      {/* Window */}
      <g>
        <rect x="44" y="28" width="212" height="224" rx="2" fill={`url(#${id}-glass)`} />
        <g stroke="#D9CFBE" strokeWidth="2" fill="none">
          <rect x="44" y="28" width="212" height="224" rx="2" />
          <path d="M150 28 V252 M44 140 H256" />
        </g>
        {/* A suggestion of a garden beyond the glass */}
        <g opacity="0.55">
          <path d="M48 196 q30 -16 62 -2 q34 15 68 1 q40 -16 78 0 v55 H48 Z" fill={p.accent} opacity="0.3" />
          <path d="M198 196 v-52" stroke={p.accent} strokeWidth="4" opacity="0.45" />
          <path d="M198 158 q-22 -6 -30 -24 M198 150 q22 -8 28 -26" stroke={p.accent} strokeWidth="2.4" fill="none" opacity="0.4" strokeLinecap="round" />
        </g>
        {/* Sill */}
        <rect x="34" y="252" width="232" height="9" rx="3" fill={`url(#${id}-wood)`} />
        {/* Curtain */}
        <path d="M256 22 q34 118 12 246 q-6 -128 -12 -246 Z" fill="#FFFFFF" opacity="0.8" />
        <path d="M268 22 q26 122 8 246 q-4 -130 -8 -246 Z" fill="#FFFFFF" opacity="0.55" />
      </g>

      {/* Daylight across the room */}
      <path d="M256 70 L640 300 L640 430 L230 300 Z" fill={`url(#${id}-beam)`} opacity="0.55" />

      {/* Console table */}
      <g>
        <rect x="286" y="326" width="330" height="12" rx="3" fill={`url(#${id}-wood)`} />
        <rect x="286" y="338" width="330" height="5" rx="2" fill="#000000" opacity="0.07" />
        <rect x="300" y="343" width="7" height="86" rx="2" fill={p.woodDark} opacity="0.85" />
        <rect x="595" y="343" width="7" height="86" rx="2" fill={p.woodDark} opacity="0.85" />
      </g>

      {/* Stacked books, left of the urn */}
      <g>
        <rect x="308" y="308" width="86" height="8" rx="2" fill="#CFC2A9" />
        <rect x="312" y="298" width="80" height="10" rx="2" fill={p.accent} opacity="0.85" />
        <rect x="316" y="288" width="72" height="10" rx="2" fill="#DDD2BB" />
      </g>

      {/* Sprig in a small vase, right of the urn */}
      <g>
        <g stroke={p.accent} strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M538 300 v-52" /><path d="M538 272 q-20 -14 -25 -36" /><path d="M538 262 q19 -16 26 -38" />
        </g>
        <path d="M527 326 l4 -28 h14 l4 28 Z" fill="#EDE3D3" stroke="#D9CFBE" strokeWidth="1.2" />
      </g>

      {/* Upright books at the far right */}
      <g opacity="0.92">
        <rect x="578" y="268" width="13" height="58" rx="2" fill="#C4B49A" />
        <rect x="593" y="258" width="10" height="68" rx="2" fill={p.accent} opacity="0.8" />
        <rect x="605" y="276" width="14" height="50" rx="2" fill="#D8CBB4" />
      </g>

      {/* The urn */}
      <g>
        <ellipse cx="452" cy="327" rx="44" ry="7" fill={p.woodDark} opacity="0.3" />
        <path
          d="M428 214 c-13 18 -19 42 -19 62 c0 33 15 50 43 50 c28 0 43 -17 43 -50 c0 -20 -6 -44 -19 -62 Z"
          fill={`url(#${id}-v)`} stroke={p.vesselDark} strokeWidth="1.6" strokeOpacity="0.7"
        />
        {/* Lid, seated on the shoulder */}
        <path d="M424 214 q28 -13 56 0 Z" fill={p.vessel} stroke={p.vesselDark} strokeWidth="1.6" strokeOpacity="0.7" />
        <path d="M424 214 h56" stroke={p.vesselDark} strokeWidth="2.4" strokeLinecap="round" strokeOpacity="0.55" />
        {/* Soft vertical sheen */}
        <ellipse cx="433" cy="270" rx="11" ry="38" fill="#FFFFFF" opacity="0.16" />
      </g>

      {/* Floor */}
      <path d="M0 429 H640" stroke="#D9CFBE" strokeWidth="2" opacity="0.8" />
      <rect y="429" width="640" height="31" fill={p.floor} opacity="0.85" />
    </svg>
  );
}
