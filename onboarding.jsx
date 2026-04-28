// onboarding.jsx — login flow: venue type → brand → role → identity
// 4 steps, full-screen inside the iOS device frame.

// ═══ step content ═════════════════════════════════════════════
const VENUE_TYPES = [
  { id: 'hotel',     label: 'Hotels',         sub: 'Front-of-house, housekeeping, F&B',  scene: 'corniche' },
  { id: 'attraction',label: 'Attractions',    sub: 'Theme parks, landmarks, experiences', scene: 'foodFestival' },
  { id: 'museum',    label: 'Museums',        sub: 'Galleries, exhibitions, guides',      scene: 'louvre' },
  { id: 'cultural',  label: 'Cultural Sites', sub: 'Heritage, religious, historic',       scene: 'ramadan' },
];

const BRANDS = {
  hotel: [
    { id: 'marriott', label: 'Marriott',           sub: '6 properties in AD',  monogram: 'M' },
    { id: 'w',        label: 'W Hotels',           sub: 'W Abu Dhabi · Yas Island', monogram: 'W' },
    { id: 'hilton',   label: 'Hilton',             sub: '4 properties in AD',  monogram: 'H' },
    { id: 'mo',       label: 'Mandarin Oriental',  sub: 'Emirates Palace',     monogram: 'MO' },
    { id: 'rotana',   label: 'Rotana Hotels',      sub: '9 properties in AD',  monogram: 'R' },
    { id: 'rixos',    label: 'Rixos',              sub: 'Marina · Yas Island', monogram: 'Rx' },
  ],
  attraction: [
    { id: 'yas',    label: 'Yas Island', sub: 'Ferrari World, Warner Bros, Waterworld', monogram: 'Y' },
    { id: 'saad',   label: 'Saadiyat Experiences', sub: 'Beach clubs & cultural venues', monogram: 'S' },
  ],
  museum: [
    { id: 'louvre', label: 'Louvre Abu Dhabi', sub: 'Saadiyat Cultural District', monogram: 'L' },
    { id: 'nhm',    label: 'Natural History Museum', sub: 'Opening 2026',         monogram: 'N' },
  ],
  cultural: [
    { id: 'szg',    label: 'Sheikh Zayed Grand Mosque', sub: 'Visitor Centre',    monogram: 'SZ' },
    { id: 'qaw',    label: 'Qasr Al Watan',   sub: 'Presidential Palace',         monogram: 'QW' },
  ],
};

const ROLES = {
  hotel: [
    { id: 'reception', label: 'Reception / Front Desk', sub: 'Check-in, check-out, guest queries' },
    { id: 'concierge', label: 'Concierge',              sub: 'Recommendations, bookings, runs' },
    { id: 'guest-relations', label: 'Guest Relations',  sub: 'VIPs, feedback, recovery' },
    { id: 'housekeeping',    label: 'Housekeeping',     sub: 'Rooms, public areas, laundry' },
    { id: 'fnb',             label: 'F&B Service',      sub: 'Restaurants, bars, in-room dining' },
    { id: 'bell',            label: 'Bell Desk / Valet',sub: 'Arrivals, luggage, parking' },
  ],
  attraction: [
    { id: 'ticketing', label: 'Ticketing / Entry', sub: 'Gates, turnstiles, day-passes' },
    { id: 'host',      label: 'Guest Host',        sub: 'Park-wide recommendations' },
    { id: 'ride',      label: 'Ride Operator',     sub: 'Attraction operations' },
    { id: 'retail',    label: 'Retail & F&B',      sub: 'Shops and eateries on site' },
  ],
  museum: [
    { id: 'welcome', label: 'Welcome Desk',  sub: 'First line of welcome' },
    { id: 'guide',   label: 'Gallery Guide', sub: 'Tours, exhibit queries' },
    { id: 'educator',label: 'Educator',      sub: 'School groups, workshops' },
    { id: 'retail',  label: 'Museum Shop',   sub: 'Retail and catalogue sales' },
  ],
  cultural: [
    { id: 'welcome', label: 'Visitor Welcome', sub: 'Entry, orientation' },
    { id: 'guide',   label: 'Heritage Guide',  sub: 'Tours and storytelling' },
    { id: 'support', label: 'Visitor Support', sub: 'Modesty robes, wheelchair, lost & found' },
  ],
};

// ═══ shared UI bits ═══════════════════════════════════════════
function OnboardHeader({ theme, step, total, onBack, title, kicker }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5, background: theme.appBg,
      padding: '54px 20px 6px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
      }}>
        {step > 1 ? (
          <button onClick={onBack} style={{
            width: 34, height: 34, borderRadius: 17, border: 'none',
            background: theme.surface, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 1px 2px ${theme.hairline}`,
          }}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M8 2L2 8l6 6" stroke={theme.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : <div style={{ width: 34, height: 34 }}/>}
        <div style={{ flex: 1 }}/>
        <div style={{
          fontSize: 11, color: theme.inkMuted, letterSpacing: 1,
          fontWeight: 600, fontFamily: theme.bodyFont,
        }}>STEP {step} OF {total}</div>
      </div>
      {/* progress bars */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
        {[...Array(total)].map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i < step ? theme.accent : theme.chipBg,
            transition: 'all 0.3s',
          }}/>
        ))}
      </div>
      {kicker && (
        <div style={{
          fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase',
          color: theme.accent, fontWeight: 700, marginBottom: 6,
          fontFamily: theme.bodyFont,
        }}>{kicker}</div>
      )}
      <div style={{
        fontFamily: theme.headerFont, fontSize: 26, fontWeight: 600,
        color: theme.ink, letterSpacing: -0.5, lineHeight: 1.15,
        textWrap: 'pretty',
      }}>{title}</div>
    </div>
  );
}

function OptionCard({ theme, selected, onClick, illustration, monogram, label, sub }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: 0, borderRadius: 16,
      background: theme.surface,
      border: selected ? `2px solid ${theme.accent}` : `1px solid ${theme.hairline}`,
      boxShadow: selected
        ? `0 6px 20px ${theme.accent}33`
        : `0 1px 2px ${theme.hairline}`,
      cursor: 'pointer', textAlign: 'left',
      display: 'flex', alignItems: 'stretch', gap: 0,
      overflow: 'hidden',
      transition: 'all 0.2s',
    }}>
      {illustration && (
        <div style={{ width: 80, flexShrink: 0, overflow: 'hidden' }}>
          <AbuDhabiScene variant={illustration} height={80}/>
        </div>
      )}
      {monogram && (
        <div style={{
          width: 64, flexShrink: 0,
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: theme.headerFont, fontSize: 22, fontWeight: 600, letterSpacing: -0.5,
        }}>{monogram}</div>
      )}
      <div style={{
        flex: 1, padding: '12px 14px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0,
      }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 15.5, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.2, marginBottom: 2,
        }}>{label}</div>
        <div style={{
          fontSize: 12, color: theme.inkMuted, lineHeight: 1.35,
          fontFamily: theme.bodyFont,
        }}>{sub}</div>
      </div>
      <div style={{
        width: 44, flexShrink: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {selected ? (
          <div style={{
            width: 22, height: 22, borderRadius: 11, background: theme.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="check" size={13} color="#fff" strokeWidth={3}/>
          </div>
        ) : (
          <div style={{
            width: 22, height: 22, borderRadius: 11,
            border: `1.5px solid ${theme.hairline}`,
          }}/>
        )}
      </div>
    </button>
  );
}

function PrimaryCta({ theme, label, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '15px 16px', borderRadius: 14, border: 'none',
      background: disabled ? theme.chipBg : theme.accent,
      color: disabled ? theme.inkMuted : '#fff',
      fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont,
      cursor: disabled ? 'default' : 'pointer', letterSpacing: 0.1,
      boxShadow: disabled ? 'none' : `0 6px 18px ${theme.accent}44`,
      transition: 'all 0.2s',
    }}>{label}</button>
  );
}

// ═══ STEP 1 · venue type ══════════════════════════════════════
function StepVenueType({ theme, value, setValue, onNext }) {
  return (
    <>
      <OnboardHeader theme={theme} step={1} total={4}
        kicker="DCT HOST · Let's get you set up"
        title="Where do you welcome guests?"/>
      <div style={{ padding: '10px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {VENUE_TYPES.map(v => (
          <OptionCard key={v.id} theme={theme}
            selected={value === v.id}
            onClick={() => setValue(v.id)}
            illustration={v.scene}
            label={v.label} sub={v.sub}/>
        ))}
      </div>
      <div style={{ padding: '20px 20px 30px' }}>
        <PrimaryCta theme={theme} label="Continue" disabled={!value} onClick={onNext}/>
      </div>
    </>
  );
}

// ═══ STEP 2 · brand ═══════════════════════════════════════════
function StepBrand({ theme, venueType, value, setValue, onNext, onBack }) {
  const options = BRANDS[venueType] || [];
  const venueLabel = VENUE_TYPES.find(v => v.id === venueType)?.label || '';
  return (
    <>
      <OnboardHeader theme={theme} step={2} total={4} onBack={onBack}
        kicker={venueLabel}
        title="Which brand do you work for?"/>
      <div style={{ padding: '10px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(b => (
          <OptionCard key={b.id} theme={theme}
            selected={value === b.id}
            onClick={() => setValue(b.id)}
            monogram={b.monogram}
            label={b.label} sub={b.sub}/>
        ))}
      </div>
      <div style={{ padding: '20px 20px 4px' }}>
        <div style={{
          fontSize: 12, color: theme.inkMuted, lineHeight: 1.5,
          fontFamily: theme.bodyFont, marginBottom: 12,
        }}>
          Don't see your brand? <b style={{ color: theme.ink }}>Request to add it →</b>
        </div>
      </div>
      <div style={{ padding: '0 20px 30px' }}>
        <PrimaryCta theme={theme} label="Continue" disabled={!value} onClick={onNext}/>
      </div>
    </>
  );
}

// ═══ STEP 3 · role ════════════════════════════════════════════
function StepRole({ theme, venueType, brandId, value, setValue, onNext, onBack }) {
  const options = ROLES[venueType] || [];
  const brandLabel = (BRANDS[venueType] || []).find(b => b.id === brandId)?.label || '';
  return (
    <>
      <OnboardHeader theme={theme} step={3} total={4} onBack={onBack}
        kicker={brandLabel}
        title="What's your role?"/>
      <div style={{ padding: '10px 20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(r => (
          <OptionCard key={r.id} theme={theme}
            selected={value === r.id}
            onClick={() => setValue(r.id)}
            label={r.label} sub={r.sub}/>
        ))}
      </div>
      <div style={{ padding: '20px 20px 30px' }}>
        <PrimaryCta theme={theme} label="Continue" disabled={!value} onClick={onNext}/>
      </div>
    </>
  );
}

// ═══ STEP 4 · identity (form or UAE Pass) ═════════════════════
function StepIdentity({ theme, form: formProp, setForm, onNext, onBack }) {
  const [localForm, setLocalForm] = React.useState(formProp || { name: '', mobile: '', email: '' });
  const form = localForm;
  const update = (patch) => { const n = {...localForm, ...patch}; setLocalForm(n); setForm(n); };
  const valid = form.name.trim().length > 0 && form.mobile.replace(/\D/g,'').length >= 8 && /@/.test(form.email);
  const fieldStyle = {
    width: '100%', padding: '13px 14px', borderRadius: 12,
    border: `1.5px solid ${theme.hairline}`, background: theme.surface,
    fontSize: 15, color: theme.ink, fontFamily: theme.bodyFont,
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontSize: 11, letterSpacing: 0.8, color: theme.inkMuted,
    fontWeight: 600, fontFamily: theme.bodyFont, marginBottom: 6,
    textTransform: 'uppercase',
  };

  return (
    <>
      <OnboardHeader theme={theme} step={4} total={4} onBack={onBack}
        kicker="Almost there"
        title="Tell us who you are."/>

      {/* UAE Pass — hero route */}
      <div style={{ padding: '10px 20px 0' }}>
        <button onClick={() => onNext()} style={{
          width: '100%', padding: '14px 16px', borderRadius: 14, border: 'none',
          background: '#000', color: '#fff',
          fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8v4l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Continue with UAE Pass
        </button>
        <div style={{
          fontSize: 11.5, color: theme.inkMuted, textAlign: 'center',
          marginTop: 8, fontFamily: theme.bodyFont,
        }}>
          Fastest route — verifies your Emirates ID automatically.
        </div>
      </div>

      {/* divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '22px 20px 14px',
      }}>
        <div style={{ flex: 1, height: 1, background: theme.hairline }}/>
        <div style={{ fontSize: 11, color: theme.inkMuted, letterSpacing: 1, fontFamily: theme.bodyFont, fontWeight: 600 }}>OR</div>
        <div style={{ flex: 1, height: 1, background: theme.hairline }}/>
      </div>

      {/* form */}
      <div style={{ padding: '0 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={labelStyle}>Full name</div>
          <input type="text" value={form.name}
            onChange={e => update({ name: e.target.value })}
            placeholder="Leila Haddad" style={fieldStyle}/>
        </div>
        <div>
          <div style={labelStyle}>Mobile number</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 14px', borderRadius: 12,
            border: `1.5px solid ${theme.hairline}`, background: theme.surface,
          }}>
            <div style={{
              fontSize: 15, color: theme.ink, fontFamily: theme.bodyFont,
              fontWeight: 500, paddingRight: 8, borderRight: `1px solid ${theme.hairline}`,
            }}>🇦🇪 +971</div>
            <input type="tel" value={form.mobile}
              onChange={e => update({ mobile: e.target.value.replace(/\D/g,'') })}
              placeholder="50 123 4567"
              style={{
                flex: 1, padding: '13px 0', border: 'none', background: 'transparent',
                fontSize: 15, color: theme.ink, fontFamily: theme.bodyFont, outline: 'none',
              }}/>
          </div>
        </div>
        <div>
          <div style={labelStyle}>Email</div>
          <input type="email" value={form.email}
            onChange={e => update({ email: e.target.value })}
            placeholder="you@hotel.ae" style={fieldStyle}/>
        </div>
      </div>

      <div style={{ padding: '24px 20px 10px' }}>
        <PrimaryCta theme={theme} label="Create my host profile" disabled={!valid} onClick={onNext}/>
      </div>
      <div style={{
        padding: '0 20px 30px', fontSize: 11, color: theme.inkMuted,
        textAlign: 'center', lineHeight: 1.5, fontFamily: theme.bodyFont,
      }}>
        By continuing, you agree to the <u>DCT frontline host</u> terms and privacy policy.
      </div>
    </>
  );
}

// ═══ POST-SIGNUP APP TOUR (5 illustrated slides) ═════════════

const TOUR_SLIDES = [
  {
    id: 'welcome',
    kicker: 'Welcome to DCT Host',
    title: 'Your city needs you to know it.',
    body: 'This app keeps you connected, informed and rewarded — every shift, every day.',
    scene: 'corniche',
    cta: 'Show me around',
  },
  {
    id: 'learn',
    kicker: '01 · Learning',
    title: 'Grow a little every day.',
    body: 'Soft skills, hard skills, Abu Dhabi knowledge — 2-3 minute videos you can watch between guests. Earn points for every unit you complete.',
    icon: '📚',
    scene: null,
    cta: 'Next',
  },
  {
    id: 'feed',
    kicker: '02 · Communication',
    title: 'Stay ahead of the city.',
    body: 'Priority alerts, event updates and service tips land straight in your feed — before your guests ask.',
    icon: '📣',
    scene: 'foodFestival',
    cta: 'Next',
  },
  {
    id: 'rewards',
    kicker: '03 · Incentives',
    title: 'Earn as you serve.',
    body: 'Points stack up every time you learn, help, or get recognised. Spend them on hotel stays, museum passes, or everyday perks.',
    icon: '🎁',
    scene: 'louvre',
    cta: 'Next',
  },
  {
    id: 'recognition',
    kicker: '04 · Recognition',
    title: 'Your work gets seen.',
    body: 'Badges, peer shout-outs and a city-wide leaderboard — because great hosting deserves more than a thank-you.',
    icon: '🏆',
    scene: null,
    cta: "Let's go →",
  },
];

function AppTourSlides({ theme, profile, onDone }) {
  const [idx, setIdx] = React.useState(0);
  const slide = TOUR_SLIDES[idx];
  const isLast = idx === TOUR_SLIDES.length - 1;

  return (
    <div style={{
      height: '100%', background: theme.appBg,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      position: 'relative',
    }}>
      {/* illustrated hero */}
      <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {slide.scene ? (
          <AbuDhabiScene variant={slide.scene} height={240}/>
        ) : (
          <div style={{
            height: 240,
            background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent2} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {slide.icon && (
              <div style={{
                fontSize: 72,
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))',
                animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1)',
              }}>{slide.icon}</div>
            )}
            {/* mosaic watermark */}
            <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.18 }}>
              <DCTMosaic size={120} variant="protect"/>
            </div>
          </div>
        )}
        {/* gradient fade into background */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: `linear-gradient(transparent, ${theme.appBg})`,
        }}/>
      </div>

      {/* content */}
      <div style={{ flex: 1, padding: '8px 28px 0', overflow: 'auto' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1.4,
          color: theme.accent, fontFamily: theme.bodyFont,
          textTransform: 'uppercase', marginBottom: 10,
        }}>{slide.kicker}</div>

        <div style={{
          fontFamily: theme.headerFont, fontSize: 28, fontWeight: 700,
          color: theme.ink, letterSpacing: -0.8, lineHeight: 1.1,
          marginBottom: 14, textWrap: 'pretty',
        }}>{slide.title}</div>

        <div style={{
          fontSize: 15, color: theme.inkMuted, lineHeight: 1.6,
          fontFamily: theme.bodyFont, textWrap: 'pretty',
        }}>{slide.body}</div>

        {/* personalized welcome on first slide */}
        {slide.id === 'welcome' && profile?.name && (
          <div style={{
            marginTop: 20, padding: '14px 16px', borderRadius: 14,
            background: theme.surface, border: `1px solid ${theme.hairline}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: theme.headerFont, fontWeight: 600, fontSize: 16,
            }}>{profile.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
                Welcome, {profile.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: 12, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
                DCT Host · {profile.venueType ? profile.venueType.charAt(0).toUpperCase()+profile.venueType.slice(1) : 'Frontliner'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* footer: dots + CTA */}
      <div style={{ padding: '20px 28px 36px', flexShrink: 0 }}>
        {/* pagination dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
          {TOUR_SLIDES.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{
              height: 6, borderRadius: 3, cursor: 'pointer',
              background: i === idx ? theme.accent : theme.chipBg,
              width: i === idx ? 24 : 6,
              transition: 'all 0.3s',
            }}/>
          ))}
        </div>

        <button onClick={() => isLast ? onDone() : setIdx(i => i + 1)} style={{
          width: '100%', padding: '15px', borderRadius: 14, border: 'none',
          background: theme.accent, color: '#fff',
          fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont,
          cursor: 'pointer', letterSpacing: 0.1,
          boxShadow: `0 6px 20px ${theme.accent}44`,
        }}>{slide.cta}</button>

        {!isLast && (
          <button onClick={onDone} style={{
            width: '100%', padding: '10px', marginTop: 6,
            background: 'none', border: 'none', color: theme.inkMuted,
            fontSize: 13, fontFamily: theme.bodyFont, cursor: 'pointer',
          }}>Skip tour</button>
        )}
      </div>
    </div>
  );
}

// ═══ MAIN CONTAINER ═══════════════════════════════════════════
function OnboardingFlow({ theme, onComplete }) {
  const [step, setStep] = React.useState(1);
  const [venueType, setVenueType] = React.useState(null);
  const [brandId, setBrandId] = React.useState(null);
  const [roleId, setRoleId] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', mobile: '', email: '' });
  const [profile, setProfile] = React.useState(null);
  const [showTour, setShowTour] = React.useState(false);

  // reset downstream selections when upstream changes
  const pickVenue = (v) => { setVenueType(v); setBrandId(null); setRoleId(null); };
  const pickBrand = (b) => { setBrandId(b); setRoleId(null); };

  if (showTour) {
    return (
      <AppTourSlides theme={theme} profile={profile}
        onDone={() => onComplete(profile)}/>
    );
  }

  return (
    <div style={{
      height: '100%', overflow: 'auto', background: theme.appBg,
      position: 'relative',
    }}>
      {/* brand strip — DCT wordmark */}
      {step === 1 && (
        <div style={{
          position: 'absolute', top: 12, right: 20, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <DCTMosaic size={22} variant="promote"/>
          <div style={{
            fontSize: 10, letterSpacing: 2, color: theme.inkMuted,
            fontWeight: 700, fontFamily: theme.bodyFont,
          }}>DCT HOST</div>
        </div>
      )}

      {step === 1 && (
        <StepVenueType theme={theme}
          value={venueType} setValue={pickVenue}
          onNext={() => setStep(2)}/>
      )}
      {step === 2 && (
        <StepBrand theme={theme} venueType={venueType}
          value={brandId} setValue={pickBrand}
          onNext={() => setStep(3)} onBack={() => setStep(1)}/>
      )}
      {step === 3 && (
        <StepRole theme={theme} venueType={venueType} brandId={brandId}
          value={roleId} setValue={setRoleId}
          onNext={() => setStep(4)} onBack={() => setStep(2)}/>
      )}
      {step === 4 && (
        <StepIdentity theme={theme} form={form} setForm={setForm}
          onNext={() => {
            const p = { venueType, brandId, roleId, ...form };
            setProfile(p);
            setShowTour(true);
          }}
          onBack={() => setStep(3)}/>
      )}
    </div>
  );
}

Object.assign(window, { OnboardingFlow, AppTourSlides });
