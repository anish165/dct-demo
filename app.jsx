// app.jsx — main shell, tab bar, tweaks panel, pitch wrapper

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "heritage",
  "persona": "concierge",
  "tab": "feed",
  "showPitch": true,
  "showOnboarding": true
}/*EDITMODE-END*/;

function TabBar({ theme, active, setActive }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'learn', label: 'Learn', icon: 'learn' },
    { id: 'feed', label: 'Feed', icon: 'feed' },
    { id: 'rewards', label: 'Rewards', icon: 'wallet' },
    { id: 'recognition', label: 'Recognition', icon: 'trophy' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
      padding: '6px 12px 24px',
      background: theme.id === 'editorial' ? 'rgba(14,16,19,0.7)' : 'rgba(255,255,255,0.7)',
      backdropFilter: 'blur(22px) saturate(180%)',
      WebkitBackdropFilter: 'blur(22px) saturate(180%)',
      borderTop: `1px solid ${theme.hairline}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
    }}>
      {tabs.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '8px 10px 4px', color: on ? theme.accent : theme.inkMuted,
            fontFamily: theme.bodyFont, fontSize: 10, fontWeight: 600,
            letterSpacing: 0.2,
          }}>
            <Icon name={t.icon} size={22} color={on ? theme.accent : theme.inkMuted} strokeWidth={on ? 2.2 : 1.7}/>
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function HomeScreen({ theme, persona, onNav }) {
  return (
    <div style={{ paddingTop: 54, paddingBottom: 100 }}>
      <div style={{ padding: '10px 20px 0' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 28, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.5,
        }}>Home</div>
      </div>
      <HomeHero theme={theme} persona={persona}/>

      {/* quick pillars */}
      <div style={{ padding: '18px 16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { k: 'learn', icon: 'learn', title: '3 courses', sub: 'in progress' },
            { k: 'feed', icon: 'megaphone', title: '12 updates', sub: 'from DCT today' },
            { k: 'rewards', icon: 'wallet', title: `${persona.points.toLocaleString()} pts`, sub: 'to spend' },
            { k: 'recognition', icon: 'medal', title: '7 badges', sub: '1 away from Gold' },
          ].map(c => (
            <div key={c.k} onClick={() => onNav(c.k)} style={{
              background: theme.surface, borderRadius: 14, padding: '14px',
              boxShadow: `0 1px 2px ${theme.hairline}`, cursor: 'pointer',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: theme.navIconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
              }}><Icon name={c.icon} size={17} color={theme.accent}/></div>
              <div style={{ fontFamily: theme.headerFont, fontSize: 16, fontWeight: 600, color: theme.ink, letterSpacing: -0.2, marginBottom: 1 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 12, color: theme.inkMuted, fontFamily: theme.bodyFont }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* today's priority */}
      <div style={{ padding: '18px 20px 6px' }}>
        <div style={{ fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600, color: theme.ink, letterSpacing: -0.1 }}>
          Today in Abu Dhabi
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>
        {[
          { title: 'F1 setup — Corniche diversions', sub: '22:00 tonight · priority', prio: true },
          { title: 'Food Festival opens at Umm Al Emarat', sub: 'Thu · free with Emirates ID' },
          { title: 'Louvre AD late night', sub: 'Thu 22:00 · oud performance' },
        ].map((x,i) => (
          <div key={i} onClick={() => onNav('feed')} style={{
            background: theme.surface, borderRadius: 14, padding: '12px 14px',
            marginBottom: 8, boxShadow: `0 1px 2px ${theme.hairline}`,
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: 4,
              background: x.prio ? theme.priority : theme.accent, flexShrink: 0,
            }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>{x.title}</div>
              <div style={{ fontSize: 11.5, color: theme.inkMuted, fontFamily: theme.bodyFont }}>{x.sub}</div>
            </div>
            <Icon name="chevron-right" size={16} color={theme.inkMuted}/>
          </div>
        ))}
      </div>

      {/* ── WEEKLY QUIZ ──────────────────────────────────────── */}
      <WeeklyQuizBanner theme={theme} onNav={onNav}/>

      {/* ── PRACTICAL SERVICE TIP ────────────────────────────── */}
      <ServiceTipCard theme={theme}/>
    </div>
  );
}

// ── Weekly quiz banner — loud, gamified ──
function WeeklyQuizBanner({ theme, onNav }) {
  const [timeLeft, setTimeLeft] = React.useState({ h: 11, m: 42, s: 7 });
  React.useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return prev;
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, '0');

  return (
    <div style={{ padding: '18px 16px 0' }}>
      <div onClick={() => onNav('learn')} style={{
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative',
        background: `linear-gradient(135deg, #1a0a3e 0%, #3B2B6B 50%, #7B2D8B 100%)`,
        padding: '18px 16px 16px',
        boxShadow: '0 8px 32px rgba(59,43,107,0.45)',
      }}>
        {/* sparkle dots */}
        {[[14,12],[80,8],[62,40],[22,52],[90,55],[50,18]].map(([x,y],i) => (
          <div key={i} style={{
            position: 'absolute', left: `${x}%`, top: `${y}%`,
            width: i%2===0 ? 4 : 6, height: i%2===0 ? 4 : 6,
            borderRadius: '50%', background: '#fff',
            opacity: 0.15 + (i%3)*0.12,
            animation: `pulse ${1.5 + i*0.3}s ease-in-out infinite`,
          }}/>
        ))}

        {/* LIVE badge + timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{
            padding: '3px 8px', borderRadius: 99,
            background: theme.accent, color: '#fff',
            fontSize: 9.5, fontWeight: 800, letterSpacing: 1.5,
            fontFamily: theme.bodyFont,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: '50%', background: '#fff',
              animation: 'pulse 1s ease-in-out infinite',
            }}/>
            LIVE
          </div>
          <div style={{
            fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: theme.bodyFont,
          }}>Ends in <span style={{ color: '#fff', fontWeight: 700 }}>{pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}</span></div>
          <div style={{ flex: 1 }}/>
          <div style={{
            fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: theme.bodyFont,
          }}>🏆 500 pts</div>
        </div>

        <div style={{
          fontFamily: theme.headerFont, fontSize: 21, fontWeight: 700,
          color: '#fff', letterSpacing: -0.5, lineHeight: 1.15, marginBottom: 6,
        }}>Weekly Destination Challenge</div>
        <div style={{
          fontSize: 13, color: 'rgba(255,255,255,0.75)',
          fontFamily: theme.bodyFont, marginBottom: 14, lineHeight: 1.4,
        }}>5 questions · Abu Dhabi knowledge · climb the leaderboard</div>

        {/* participants + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* avatar stack */}
          <div style={{ display: 'flex' }}>
            {['FA','LH','DK'].map((a,i) => (
              <div key={a} style={{
                width: 24, height: 24, borderRadius: 12,
                background: [theme.accent, '#fff', theme.accent2][i],
                color: [theme.accent, theme.ink, '#fff'][i],
                border: '2px solid #3B2B6B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 700, fontFamily: theme.bodyFont,
                marginLeft: i > 0 ? -8 : 0, zIndex: 3-i,
                position: 'relative',
              }}>{a}</div>
            ))}
          </div>
          <div style={{
            fontSize: 11.5, color: 'rgba(255,255,255,0.7)', fontFamily: theme.bodyFont,
          }}>247 playing now</div>
          <div style={{ flex: 1 }}/>
          <div style={{
            padding: '9px 18px', borderRadius: 99, border: 'none',
            background: '#fff', color: '#3B2B6B',
            fontSize: 13, fontWeight: 700, fontFamily: theme.bodyFont,
            boxShadow: '0 4px 14px rgba(255,255,255,0.3)',
          }}>Play now →</div>
        </div>
      </div>
    </div>
  );
}

// ── Practical service tip of the day ──
const SERVICE_TIPS = [
  { icon: '💡', tag: 'Guest Recovery', tip: 'When a guest is upset, use their name twice — once when acknowledging, once when offering a solution. It disarms and personalises.', credit: 'VX Academy' },
  { icon: '🗺️', tag: 'Local Knowledge', tip: 'If a guest asks about "the best beach," ask first: peaceful or social? Families or couples? Corniche, Saadiyat and Yas all serve different moods.', credit: 'DCT Frontline Tips' },
  { icon: '🤝', tag: 'First Impressions', tip: 'Smile before you speak. Research shows a genuine smile raises guests\' initial satisfaction scores by up to 22% — before a word is exchanged.', credit: 'VX Academy' },
];
const todaysTip = SERVICE_TIPS[new Date().getDay() % SERVICE_TIPS.length];

function ServiceTipCard({ theme }) {
  const [saved, setSaved] = React.useState(false);
  return (
    <div style={{ padding: '18px 16px 0' }}>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          fontSize: 10.5, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
          color: theme.accent, fontFamily: theme.bodyFont,
        }}>Service Tip of the Day</div>
        <div style={{
          fontSize: 9.5, padding: '2px 7px', borderRadius: 99,
          background: theme.chipBg, color: theme.inkMuted,
          fontWeight: 600, fontFamily: theme.bodyFont,
        }}>{todaysTip.tag}</div>
      </div>
      <div style={{
        background: theme.surface, borderRadius: 16,
        boxShadow: `0 1px 2px ${theme.hairline}`,
        overflow: 'hidden',
        borderLeft: `4px solid ${theme.accent}`,
      }}>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{todaysTip.icon}</div>
          <div style={{
            fontSize: 14.5, color: theme.ink, fontFamily: theme.bodyFont,
            lineHeight: 1.55, fontWeight: 500, textWrap: 'pretty',
            marginBottom: 12,
          }}>"{todaysTip.tip}"</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{
              fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont,
            }}>— {todaysTip.credit}</div>
            <button onClick={() => setSaved(s => !s)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 11, fontWeight: 600, color: saved ? theme.accent : theme.inkMuted,
              fontFamily: theme.bodyFont, padding: 0,
            }}>
              <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={14} color={saved ? theme.accent : theme.inkMuted}/>
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppRoot() {
  const [state, setState] = React.useState(() => {
    try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem('dct_state') || '{}')) }; }
    catch { return DEFAULTS; }
  });
  const update = (p) => setState(s => { const n = {...s, ...p}; localStorage.setItem('dct_state', JSON.stringify(n)); return n; });

  const theme = THEMES[state.theme] || THEMES.heritage;
  const persona = PERSONAS[state.persona] || PERSONAS.concierge;
  const [tab, setTab] = React.useState(state.tab || 'feed');
  const [filter, setFilter] = React.useState('all');
  const [savedIds, setSavedIds] = React.useState([]);
  const [lesson, setLesson] = React.useState({ show: false, stage: 'playing' });
  const [coupon, setCoupon] = React.useState(null);
  const [showAnnouncement, setShowAnnouncement] = React.useState(false);
  const [showPush, setShowPush] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [onboarded, setOnboarded] = React.useState(() => {
    try { return localStorage.getItem('dct_onboarded') === '1'; } catch { return false; }
  });
  const [profile, setProfile] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('dct_profile') || 'null'); } catch { return null; }
  });

  // push notification demo trigger
  const triggerPush = () => {
    setShowPush(true);
    setTimeout(() => setShowPush(false), 5000);
  };

  // tweaks wiring
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setEditMode(true);
      if (e.data?.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const toggleSave = (id) => setSavedIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const onNav = (key) => {
    if (key === 'lesson') { setLesson({ show: true, stage: 'playing' }); return; }
    setTab(key);
    update({ tab: key });
  };

  return (
    <div style={{
      width: '100%', minHeight: '100vh', background: '#e8e5de',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        gap: 40, padding: '40px 40px 60px', maxWidth: 1400, margin: '0 auto',
      }}>
        {/* left: pitch rationale */}
        {state.showPitch && (
          <div style={{ flex: '0 0 460px', paddingTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <DCTMosaic size={48} variant="progress"/>
              <div style={{
                fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                color: '#F15A3A', fontWeight: 700, fontFamily: '-apple-system, system-ui',
              }}>Pitch · For DCT Abu Dhabi</div>
            </div>
            <div style={{
              fontFamily: '-apple-system, "SF Pro Display", Inter, system-ui, sans-serif',
              fontSize: 40, fontWeight: 700,
              color: '#141414', letterSpacing: -1.2, lineHeight: 1.05, marginBottom: 18,
              textTransform: 'uppercase',
            }}>
              One app in the pocket of every <span style={{ color: '#F15A3A' }}>frontline host</span> in Abu Dhabi.
            </div>
            <div style={{
              fontSize: 15, lineHeight: 1.6, color: '#3a3630', marginBottom: 28,
              fontFamily: '-apple-system, system-ui',
            }}>
              A mobile-first loyalty and engagement product for hotel staff, concierge desks,
              information agents and taxi drivers — 10,000+ of whom don't have a work email.
              SMS-login, push-first, designed for the last mile of the guest experience.
            </div>
            <div style={{ marginBottom: 24, display: 'flex', gap: 10, padding: '14px 16px', background: '#fff', borderRadius: 14, border: '1px solid rgba(20,20,20,0.08)' }}>
              <DCTMosaic size={56} variant="promote"/>
              <DCTMosaic size={56} variant="protect"/>
              <DCTMosaic size={56} variant="progress"/>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', fontSize: 11.5, color: '#6b635a', lineHeight: 1.4, fontFamily: '-apple-system, system-ui' }}>
                Promote · Protect · Progress — the DCT brand ethos carried through every surface.
              </div>
            </div>

            {/* pillars */}
            <div style={{
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              color: '#6b635a', fontWeight: 600, marginBottom: 10,
            }}>Four pillars, one feed</div>
            <div style={{ marginBottom: 28 }}>
              {[
                { p: 'Learning', d: 'Micro-lessons & full LMS courses. Earn badges and points on completion.' },
                { p: 'Communication', d: 'Priority alerts, what\'s on in AD, service updates — straight to the lock screen.' },
                { p: 'Incentives', d: 'DCT-ecosystem rewards — hotel stays, museum entry, pool days — plus everyday partner perks.' },
                { p: 'Recognition', d: 'Peer shout-outs, badges, venue & city leaderboards.' },
              ].map((x,i) => (
                <div key={i} style={{
                  padding: '14px 0',
                  borderTop: i === 0 ? '1px solid rgba(20,20,20,0.12)' : 'none',
                  borderBottom: '1px solid rgba(20,20,20,0.12)',
                  display: 'flex', gap: 14,
                }}>
                  <div style={{
                    width: 32, fontFamily: '-apple-system, system-ui',
                    fontSize: 20, color: '#F15A3A', fontWeight: 700, letterSpacing: -0.5,
                  }}>0{i+1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#141414', marginBottom: 3 }}>{x.p}</div>
                    <div style={{ fontSize: 13, color: '#5a544a', lineHeight: 1.5 }}>{x.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* demo actions */}
            <div style={{
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              color: '#6b635a', fontWeight: 600, marginBottom: 10,
            }}>Try it live →</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {[
                { label: 'Simulate push', fn: triggerPush },
                { label: 'Replay onboarding', fn: () => {
                    try { localStorage.removeItem('dct_onboarded'); localStorage.removeItem('dct_profile'); } catch {}
                    setOnboarded(false); setProfile(null);
                } },
                { label: 'Open alert', fn: () => setShowAnnouncement(true) },
                { label: 'Take a lesson', fn: () => setLesson({ show: true, stage: 'playing' }) },
                { label: 'Jump to leaderboard', fn: () => { setTab('recognition'); } },
                { label: 'Redeem a coupon', fn: () => setCoupon(COUPONS[0]) },
              ].map(b => (
                <button key={b.label} onClick={b.fn} style={{
                  padding: '9px 14px', borderRadius: 99,
                  border: '1px solid rgba(20,20,20,0.15)',
                  background: '#fff', color: '#141414',
                  fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                  fontFamily: '-apple-system, system-ui',
                }}>{b.label}</button>
              ))}
            </div>

            <div style={{
              padding: '16px', borderRadius: 14, background: 'rgba(241,90,58,0.06)',
              border: '1px solid rgba(241,90,58,0.22)', fontSize: 12.5, color: '#3a3630',
              lineHeight: 1.55, fontFamily: '-apple-system, system-ui',
            }}>
              <b style={{ color: '#F15A3A' }}>Built on the FRT platform.</b> Points, XP, tiers,
              coupons, badges, cohorts, push, QR, and LMS hooks are all live product surfaces —
              the DCT build is configuration, not new engineering.
            </div>
          </div>
        )}

        {/* right: device */}
        <div style={{ flex: '0 0 402px', position: 'sticky', top: 40 }}>
          <div style={{ position: 'relative' }}>
            <IOSDevice width={402} height={874} dark={theme.statusDark}>
              <div style={{
                height: '100%', background: theme.appBg, overflow: 'hidden',
                position: 'relative', display: 'flex', flexDirection: 'column',
              }}>
                {!onboarded ? (
                  <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                    <OnboardingFlow theme={theme} onComplete={(p) => {
                      setProfile(p); setOnboarded(true);
                      try {
                        localStorage.setItem('dct_onboarded', '1');
                        localStorage.setItem('dct_profile', JSON.stringify(p));
                      } catch {}
                      setTab('home'); update({ tab: 'home' });
                    }}/>
                  </div>
                ) : (
                <>
                <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                  {tab === 'home' && <HomeScreen theme={theme} persona={persona} onNav={onNav}/>}
                  {tab === 'feed' && (
                    <>
                      <FeedHeader theme={theme} persona={persona} filter={filter} setFilter={setFilter} unseen={3}/>
                      <FeedList theme={theme} persona={persona} filter={filter} savedIds={savedIds} toggleSave={toggleSave} onNav={onNav}/>
                    </>
                  )}
                  {tab === 'learn' && <LearningScreen theme={theme} persona={persona} onOpenLesson={() => setLesson({ show: true, stage: 'playing' })}/>}
                  {tab === 'recognition' && <RecognitionScreen theme={theme} persona={persona} onNav={onNav}/>}
                  {tab === 'rewards' && <IncentivesScreen theme={theme} persona={persona} onRedeem={c => setCoupon(c)}/>}
                </div>

                <TabBar theme={theme} active={tab} setActive={setTab}/>

                {/* overlays (inside device) */}
                <PushToast theme={theme} show={showPush}
                           onTap={() => { setShowPush(false); setShowAnnouncement(true); }}
                           onClose={() => setShowPush(false)}/>
                <LessonModal theme={theme}
                             show={lesson.show} stage={lesson.stage}
                             onStageChange={(s) => setLesson(l => ({...l, stage: s}))}
                             onClose={() => setLesson({ show: false, stage: 'playing' })}/>
                <CouponRedeemModal theme={theme} show={!!coupon} coupon={coupon} onClose={() => setCoupon(null)}/>
                <AnnouncementDetail theme={theme} show={showAnnouncement} onClose={() => setShowAnnouncement(false)}/>
                </>
                )}
              </div>
            </IOSDevice>
          </div>

          {/* caption under device */}
          <div style={{
            marginTop: 14, textAlign: 'center',
            fontSize: 11, color: '#6b635a', letterSpacing: 2, textTransform: 'uppercase',
            fontFamily: '-apple-system, system-ui',
          }}>
            {persona.role} · {persona.venue} · {theme.label} theme
          </div>
        </div>
      </div>

      {/* TWEAKS PANEL */}
      {editMode && (
        <div style={{
          position: 'fixed', bottom: 20, right: 20, width: 300, zIndex: 1000,
          background: '#fff', borderRadius: 18,
          boxShadow: '0 20px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)',
          overflow: 'hidden', fontFamily: '-apple-system, system-ui',
        }}>
          <div style={{
            padding: '14px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Tweaks</div>
            <button onClick={() => setEditMode(false)} style={{
              background: 'none', border: 'none', fontSize: 18, color: '#666', cursor: 'pointer',
            }}>×</button>
          </div>
          <div style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 8, fontWeight: 600 }}>
              Visual direction
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 16 }}>
              {Object.values(THEMES).map(t => (
                <button key={t.id} onClick={() => update({ theme: t.id })} style={{
                  padding: '8px 4px', borderRadius: 10,
                  border: state.theme === t.id ? `2px solid ${t.accent}` : '1px solid #e6e6e6',
                  background: state.theme === t.id ? '#fafafa' : '#fff',
                  cursor: 'pointer', textAlign: 'center',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 6,
                  }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: t.accent }}/>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: t.accent2 }}/>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: t.appBg, border: '1px solid #eee' }}/>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600 }}>{t.label}</div>
                </button>
              ))}
            </div>

            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 8, fontWeight: 600 }}>
              Persona
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
              {Object.values(PERSONAS).map(p => (
                <button key={p.id} onClick={() => update({ persona: p.id })} style={{
                  padding: '9px 12px', borderRadius: 10, textAlign: 'left',
                  border: state.persona === p.id ? '2px solid #3451b2' : '1px solid #e6e6e6',
                  background: state.persona === p.id ? '#f4f6fc' : '#fff', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{p.role} · {p.venue}</div>
                </button>
              ))}
            </div>

            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#888', marginBottom: 8, fontWeight: 600 }}>
              Layout
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={state.showPitch} onChange={e => update({ showPitch: e.target.checked })}/>
              Show pitch panel
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppRoot/>);
