// screens-other.jsx — Recognition, Learning, Incentives, Home hero

// ═══ HOME HERO (top of feed / standalone) ════════════════════
function HomeHero({ theme, persona }) {
  const pct = persona.xp / persona.xpNext;
  return (
    <div style={{
      margin: '14px 16px 0', borderRadius: 20, overflow: 'hidden', position: 'relative',
      background: theme.id === 'editorial'
        ? `linear-gradient(135deg, #191C21 0%, #14171B 100%)`
        : `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent2} 130%)`,
      color: '#fff', padding: '16px 18px 18px',
      boxShadow: `0 10px 28px ${theme.hairline}`,
    }}>
      {theme.showMosaic && (
        <div style={{ position: 'absolute', right: -14, top: -14, opacity: 0.18, pointerEvents: 'none' }}>
          <DCTMosaic size={140} variant="protect"/>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, position: 'relative' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 24,
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600, fontSize: 16, letterSpacing: 0.3,
          border: '1.5px solid rgba(255,255,255,0.3)',
        }}>{persona.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 2, fontFamily: theme.bodyFont }}>
            Good morning,
          </div>
          <div style={{
            fontFamily: theme.headerFont, fontSize: 18, fontWeight: 600, letterSpacing: -0.2,
          }}>{persona.name.split(' ')[0]}</div>
        </div>
        <div style={{
          padding: '5px 10px', borderRadius: 99,
          background: 'rgba(255,255,255,0.18)',
          fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
          fontFamily: theme.bodyFont,
        }}>{persona.tier.toUpperCase()}</div>
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 0.3, marginBottom: 2, fontFamily: theme.bodyFont }}>POINTS</div>
          <div style={{ fontFamily: theme.headerFont, fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>{persona.points.toLocaleString()}</div>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }}/>
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 0.3, marginBottom: 2, fontFamily: theme.bodyFont }}>CITY RANK</div>
          <div style={{ fontFamily: theme.headerFont, fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>#{persona.rank}</div>
        </div>
        <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }}/>
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 0.3, marginBottom: 2, fontFamily: theme.bodyFont }}>BADGES</div>
          <div style={{ fontFamily: theme.headerFont, fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>{persona.badges}</div>
        </div>
      </div>

      {/* XP bar */}
      <div style={{ fontSize: 11, opacity: 0.85, marginBottom: 6, fontFamily: theme.bodyFont, display: 'flex', justifyContent: 'space-between' }}>
        <span>{persona.xp} / {persona.xpNext} XP to next tier</span>
        <span>{Math.round(pct * 100)}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct*100}%`, background: '#fff', borderRadius: 3 }}/>
      </div>
    </div>
  );
}

// ═══ RECOGNITION ════════════════════════════════════════════
function RecognitionScreen({ theme, persona, onNav }) {
  const [tab, setTab] = React.useState('badges');
  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: '62px 20px 4px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 28, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.5,
        }}>Recognition</div>
        <div style={{ color: theme.inkMuted, fontSize: 13, fontFamily: theme.bodyFont, marginTop: 2 }}>
          Badges, peer shout-outs, leaderboard.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 20px 4px' }}>
        {[{id:'badges',label:'Badges'},{id:'board',label:'Leaderboard'},{id:'peers',label:'Peer praise'}].map(t => {
          const on = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '7px 14px', borderRadius: 99, border: 'none',
              background: on ? theme.ink : theme.surface,
              color: on ? theme.surface : theme.ink,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: theme.bodyFont,
              boxShadow: on ? 'none' : `0 1px 2px ${theme.hairline}`,
            }}>{t.label}</button>
          );
        })}
      </div>

      {tab === 'badges' && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
          padding: '14px 16px',
        }}>
          {BADGES.map(b => (
            <div key={b.id} style={{
              background: theme.surface, borderRadius: 16, padding: '14px 12px 12px',
              boxShadow: `0 1px 2px ${theme.hairline}`, position: 'relative',
              opacity: b.earned ? 1 : 0.5,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 22, marginBottom: 8,
                background: b.earned ? `linear-gradient(135deg, ${theme.accent2}, ${theme.accent})` : theme.chipBg,
                color: b.earned ? '#fff' : theme.inkMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 600,
              }}>{b.icon}</div>
              <div style={{
                fontFamily: theme.headerFont, fontSize: 14, fontWeight: 600,
                color: theme.ink, lineHeight: 1.2, marginBottom: 3,
              }}>{b.name}</div>
              <div style={{ fontSize: 11, color: theme.inkMuted, lineHeight: 1.3, fontFamily: theme.bodyFont }}>
                {b.desc}
              </div>
              {b.earned && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 18, height: 18, borderRadius: 9,
                  background: theme.accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="check" size={10} color="#fff" strokeWidth={3}/></div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'board' && (
        <div style={{ padding: '14px 16px 0' }}>
          {/* instance scope chips */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {['Abu Dhabi','My venue','My role'].map((s,i) => (
              <div key={s} style={{
                padding: '5px 10px', borderRadius: 99,
                background: i === 0 ? theme.accent : theme.surface,
                color: i === 0 ? '#fff' : theme.ink,
                fontSize: 11, fontWeight: 600, fontFamily: theme.bodyFont,
                boxShadow: i === 0 ? 'none' : `0 1px 2px ${theme.hairline}`,
              }}>{s}</div>
            ))}
          </div>
          <div style={{
            background: theme.surface, borderRadius: 18, overflow: 'hidden',
            boxShadow: `0 1px 2px ${theme.hairline}`,
          }}>
            {LEADERBOARD.map((p,i) => (
              <div key={p.rank} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                borderBottom: i < LEADERBOARD.length - 1 ? `1px solid ${theme.hairline}` : 'none',
              }}>
                <div style={{
                  width: 26, fontFamily: theme.headerFont,
                  fontSize: 17, fontWeight: 600, color: theme.ink, textAlign: 'center',
                }}>{p.rank}</div>
                <Avatar initials={p.avatar} size={36} theme={theme} tone={i < 3 ? 'accent2' : undefined}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>{p.venue}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600, color: theme.ink }}>
                    {p.points.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 10, color: theme.accent, fontWeight: 600, fontFamily: theme.bodyFont }}>
                    ↑ {p.delta}
                  </div>
                </div>
              </div>
            ))}
            {/* self row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', background: theme.surfaceAlt,
              borderTop: `2px solid ${theme.accent}`,
            }}>
              <div style={{ width: 26, fontFamily: theme.headerFont, fontSize: 17, fontWeight: 600, color: theme.accent, textAlign: 'center' }}>
                {persona.rank}
              </div>
              <Avatar initials={persona.avatar} size={36} theme={theme} tone="accent"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
                  You — {persona.name}
                </div>
                <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>{persona.venue}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600, color: theme.ink }}>
                  {persona.points.toLocaleString()}
                </div>
                <div style={{ fontSize: 10, color: theme.accent, fontWeight: 600, fontFamily: theme.bodyFont }}>
                  ↑ +85
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'peers' && (
        <div style={{ padding: '14px 16px 0' }}>
          {[
            { from: 'Hamad Al Nuaimi', msg: 'Walked our guests to Louvre AD when their driver no-showed. Pure class.', time: '2d' },
            { from: 'Sara Benali', msg: 'Helped me de-escalate a confused family at arrivals. Calm under fire.', time: '5d' },
            { from: 'Joseph Nair', msg: 'Best recommendation for an iftar spot I\'ve ever gotten from a colleague.', time: '1w' },
          ].map((p,i) => (
            <div key={i} style={{
              background: theme.surface, borderRadius: 16, padding: '14px',
              marginBottom: 10, boxShadow: `0 1px 2px ${theme.hairline}`,
              display: 'flex', gap: 12,
            }}>
              <Avatar initials={p.from.split(' ').map(x=>x[0]).join('')} size={38} theme={theme} tone="accent2"/>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>{p.from}</div>
                  <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>{p.time}</div>
                </div>
                <div style={{ fontSize: 13.5, color: theme.ink, lineHeight: 1.4, fontFamily: theme.headerFont, fontStyle: 'italic' }}>
                  “{p.msg}”
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══ LEARNING ═══════════════════════════════════════════════
function LearningScreen({ theme, persona, onOpenLesson }) {
  const [view, setView] = React.useState('modules'); // 'modules' | 'module-detail'
  const [activeModule, setActiveModule] = React.useState(null);
  const [playingUnit, setPlayingUnit] = React.useState(null);
  const [justCompleted, setJustCompleted] = React.useState(null); // { unit, points }

  const openModule = (mod) => {
    setActiveModule(mod);
    setView('module-detail');
  };

  if (view === 'module-detail' && activeModule) {
    return (
      <ModuleDetailView
        theme={theme}
        module={activeModule}
        onBack={() => { setView('modules'); setActiveModule(null); }}
        onPlayUnit={(unit) => setPlayingUnit(unit)}
        playingUnit={playingUnit}
        onUnitComplete={(unit) => {
          setPlayingUnit(null);
          setJustCompleted({ unit, points: unit.points, phase: 'points' });
          setTimeout(() => setJustCompleted(c => c ? { ...c, phase: 'rate' } : null), 2000);
        }}
        justCompleted={justCompleted}
      />
    );
  }

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: '62px 20px 4px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 28, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.5,
        }}>Learning</div>
        <div style={{ color: theme.inkMuted, fontSize: 13, fontFamily: theme.bodyFont, marginTop: 2 }}>
          Build skills with micro-lessons — synced from DCT Academy.
        </div>
      </div>

      {/* streak banner */}
      <div style={{
        margin: '14px 16px 0', padding: '12px 14px', borderRadius: 14,
        background: theme.surfaceAlt, display: 'flex', alignItems: 'center', gap: 12,
        border: `1px solid ${theme.hairline}`,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: theme.priority, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="flame" size={18} color="#fff"/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
            7-day lesson streak
          </div>
          <div style={{ fontSize: 11.5, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            1 more day to unlock the Learner Gold badge
          </div>
        </div>
        <Icon name="chevron-right" size={18} color={theme.inkMuted}/>
      </div>

      {/* modules grid */}
      <div style={{ padding: '18px 20px 6px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.1,
        }}>Learning modules</div>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {LEARNING_MODULES.map(mod => (
          <ModuleCard key={mod.id} theme={theme} module={mod} onClick={() => openModule(mod)}/>
        ))}
      </div>

      {/* quick pick (micro-lesson) */}
      <div style={{ padding: '18px 20px 6px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.1,
        }}>Quick refresher · 1 min</div>
      </div>
      <div onClick={onOpenLesson} style={{
        margin: '0 16px', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
        color: '#fff', padding: '16px',
      }}>
        <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 0.5, marginBottom: 6, fontFamily: theme.bodyFont }}>
          HOSPITALITY REFRESHER
        </div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 17, fontWeight: 600,
          letterSpacing: -0.2, lineHeight: 1.25, marginBottom: 12,
        }}>Handling lost-passport guests — the 4-step process</div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 99,
          background: 'rgba(255,255,255,0.22)', fontSize: 12, fontWeight: 600,
          fontFamily: theme.bodyFont,
        }}>
          <Icon name="play" size={10} color="#fff"/> Start · earn 25 pts
        </div>
      </div>

      <div style={{ padding: '18px 20px 6px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600, color: theme.ink,
        }}>LMS courses</div>
        <div style={{ fontSize: 12, color: theme.accent, fontWeight: 600, fontFamily: theme.bodyFont }}>See all</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {COURSES.map(c => (
          <div key={c.id} style={{
            background: theme.surface, borderRadius: 14, padding: '12px 14px',
            marginBottom: 10, boxShadow: `0 1px 2px ${theme.hairline}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: theme.surfaceAlt,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="learn" size={22} color={theme.accent}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                {c.status === 'new' && (
                  <div style={{
                    padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 700,
                    letterSpacing: 0.5, background: theme.accent, color: '#fff', fontFamily: theme.bodyFont,
                  }}>NEW</div>
                )}
                {c.status === 'complete' && (
                  <div style={{
                    padding: '1px 6px', borderRadius: 4, fontSize: 9, fontWeight: 700,
                    letterSpacing: 0.5, background: theme.chipBg, color: theme.inkMuted, fontFamily: theme.bodyFont,
                  }}>COMPLETE</div>
                )}
                <div style={{ fontSize: 13.5, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
                  {c.name}
                </div>
              </div>
              <div style={{ fontSize: 11, color: theme.inkMuted, marginBottom: 6, fontFamily: theme.bodyFont }}>
                {c.mods} modules · {c.duration} · {c.reward}
              </div>
              <div style={{ height: 4, borderRadius: 2, background: theme.chipBg, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${c.progress * 100}%`,
                  background: c.progress === 1 ? theme.accent2 : theme.accent,
                }}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── module card (list view) ──
function ModuleCard({ theme, module, onClick }) {
  const progress = module.completedUnits / module.totalUnits;
  return (
    <div onClick={onClick} style={{
      background: theme.surface, borderRadius: 16, padding: '14px 16px',
      boxShadow: `0 1px 2px ${theme.hairline}`, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: `${module.color}18`, border: `2px solid ${module.color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
      }}>{module.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 16, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.2, marginBottom: 2,
        }}>{module.name}</div>
        <div style={{ fontSize: 12, color: theme.inkMuted, fontFamily: theme.bodyFont, marginBottom: 6 }}>
          {module.completedUnits} of {module.totalUnits} units · {module.desc}
        </div>
        <div style={{ height: 5, borderRadius: 3, background: theme.chipBg, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: module.color, transition: 'width 0.4s',
          }}/>
        </div>
      </div>
      <Icon name="chevron-right" size={18} color={theme.inkMuted}/>
    </div>
  );
}

// ── module detail (unit list + video player) ──
function ModuleDetailView({ theme, module, onBack, onPlayUnit, playingUnit, onUnitComplete, justCompleted }) {
  const progress = module.completedUnits / module.totalUnits;

  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100, background: theme.appBg }}>
      {/* header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10, background: theme.appBg,
        padding: '54px 20px 10px',
      }}>
        <button onClick={onBack} style={{
          width: 34, height: 34, borderRadius: 17, border: 'none',
          background: theme.surface, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 1px 2px ${theme.hairline}`, marginBottom: 12,
        }}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8 2L2 8l6 6" stroke={theme.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 32 }}>{module.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: theme.headerFont, fontSize: 24, fontWeight: 600,
              color: theme.ink, letterSpacing: -0.5, lineHeight: 1.1,
            }}>{module.name}</div>
            <div style={{ fontSize: 12.5, color: theme.inkMuted, fontFamily: theme.bodyFont, marginTop: 2 }}>
              {module.completedUnits} of {module.totalUnits} units complete
            </div>
          </div>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: theme.chipBg, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: module.color, transition: 'width 0.4s',
          }}/>
        </div>
      </div>

      {/* unit list */}
      <div style={{ padding: '10px 16px 0' }}>
        {module.units.map((unit, idx) => (
          <UnitRow key={unit.id} theme={theme} unit={unit} index={idx+1}
            moduleColor={module.color}
            isPlaying={playingUnit?.id === unit.id}
            onClick={() => !unit.completed && onPlayUnit(unit)}/>
        ))}
      </div>

      {/* video player overlay */}
      {playingUnit && (
        <VideoPlayerOverlay theme={theme} unit={playingUnit}
          onClose={() => onPlayUnit(null)}
          onComplete={() => onUnitComplete(playingUnit)}/>
      )}

      {/* points credit animation */}
      {justCompleted && justCompleted.phase === 'points' && (
        <PointsCreditAnimation theme={theme} points={justCompleted.points}/>
      )}
      {/* rate experience sheet */}
      {justCompleted && justCompleted.phase === 'rate' && (
        <RateExperienceSheet theme={theme} unit={justCompleted.unit}
          onDone={() => setJustCompleted(null)}/>
      )}
    </div>
  );
}

// ── unit row ──
function UnitRow({ theme, unit, index, moduleColor, isPlaying, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: theme.surface, borderRadius: 14, padding: '12px 14px',
      marginBottom: 8, boxShadow: `0 1px 2px ${theme.hairline}`,
      display: 'flex', alignItems: 'center', gap: 12,
      cursor: unit.completed ? 'default' : 'pointer',
      opacity: unit.completed ? 0.6 : 1,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: unit.completed ? theme.accent2 : isPlaying ? moduleColor : theme.chipBg,
        color: unit.completed || isPlaying ? '#fff' : theme.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: theme.bodyFont, fontSize: 13, fontWeight: 700,
      }}>
        {unit.completed ? <Icon name="check" size={16} color="#fff" strokeWidth={2.5}/> : index}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: theme.ink,
          fontFamily: theme.bodyFont, marginBottom: 2,
        }}>{unit.name}</div>
        <div style={{ fontSize: 11.5, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
          {unit.duration} · {unit.points} pts
        </div>
      </div>
      {!unit.completed && (
        <div style={{
          padding: '5px 10px', borderRadius: 99,
          background: moduleColor, color: '#fff',
          fontSize: 11, fontWeight: 600, fontFamily: theme.bodyFont,
        }}>Watch</div>
      )}
    </div>
  );
}

// ── video player overlay (simulated) ──
function VideoPlayerOverlay({ theme, unit, onClose, onComplete }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 1) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 1;
        }
        return p + 0.02; // ~5 sec to complete
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
      background: '#000', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 54, right: 20, zIndex: 10,
          width: 36, height: 36, borderRadius: 18, border: 'none',
          background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer',
          fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>×</button>
        <div style={{ textAlign: 'center', color: '#fff', padding: '0 40px' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>▶️</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: theme.headerFont }}>
            {unit.name}
          </div>
          <div style={{ fontSize: 13, opacity: 0.7, fontFamily: theme.bodyFont }}>
            Playing... ({Math.floor(progress * 100)}%)
          </div>
        </div>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.2)' }}>
        <div style={{
          height: '100%', width: `${progress * 100}%`,
          background: '#fff', transition: 'width 0.1s linear',
        }}/>
      </div>
    </div>
  );
}

// ── points credit animation ──
function PointsCreditAnimation({ theme, points }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
      background: 'rgba(0,0,0,0.18)',
    }}>
      <div style={{
        animation: 'pop 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        background: theme.surface,
        borderRadius: 24,
        padding: '28px 36px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
        textAlign: 'center',
        minWidth: 180,
      }}>
        {/* coin burst */}
        <div style={{ position: 'relative', height: 64, marginBottom: 12 }}>
          {[...Array(6)].map((_,i) => {
            const angle = (i / 6) * 360;
            const rad = angle * Math.PI / 180;
            const x = Math.cos(rad) * 28;
            const y = Math.sin(rad) * 28;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `calc(50% + ${x}px - 8px)`,
                top: `calc(50% + ${y}px - 8px)`,
                width: 16, height: 16, borderRadius: 8,
                background: theme.accent,
                opacity: 0.5 + (i % 3) * 0.2,
                animation: `pop 0.4s ${i * 0.05}s both`,
              }}/>
            );
          })}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 44, height: 44, borderRadius: 22,
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>★</div>
        </div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 36, fontWeight: 700,
          color: theme.accent, letterSpacing: -1, lineHeight: 1,
          marginBottom: 4,
        }}>+{points}</div>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
          color: theme.inkMuted, fontFamily: theme.bodyFont,
          textTransform: 'uppercase',
        }}>points earned</div>
      </div>
    </div>
  );
}

// ── rate experience bottom sheet ──
function RateExperienceSheet({ theme, unit, onDone }) {
  const [rating, setRating] = React.useState(0);
  const [hovered, setHovered] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);

  const submit = () => {
    setSubmitted(true);
    setTimeout(onDone, 1200);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 201,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 0.2s',
    }}>
      <div style={{
        width: '100%', background: theme.surface,
        borderRadius: '20px 20px 0 0',
        padding: '10px 20px 36px',
        animation: 'slideUp 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
      }}>
        {/* drag handle */}
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: theme.chipBg, margin: '0 auto 20px',
        }}/>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🙏</div>
            <div style={{
              fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600,
              color: theme.ink, marginBottom: 4,
            }}>Thanks for the feedback!</div>
            <div style={{ fontSize: 13, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
              It helps us improve the content for you.
            </div>
          </div>
        ) : (
          <>
            <div style={{
              fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600,
              color: theme.ink, letterSpacing: -0.3, marginBottom: 4,
              textWrap: 'pretty',
            }}>How was that lesson?</div>
            <div style={{
              fontSize: 12.5, color: theme.inkMuted, fontFamily: theme.bodyFont,
              marginBottom: 20, lineHeight: 1.4,
            }}>{unit.name}</div>

            {/* stars */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24,
            }}>
              {[1,2,3,4,5].map(n => (
                <button key={n}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(n)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 36, padding: 2, lineHeight: 1,
                    transition: 'transform 0.15s',
                    transform: (hovered || rating) >= n ? 'scale(1.15)' : 'scale(1)',
                    filter: (hovered || rating) >= n ? 'none' : 'grayscale(1) opacity(0.4)',
                  }}>★</button>
              ))}
            </div>

            {/* labels */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: 22,
              fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont,
            }}>
              <span>Not helpful</span>
              <span>Very helpful</span>
            </div>

            <button onClick={submit} disabled={!rating} style={{
              width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              background: rating ? theme.accent : theme.chipBg,
              color: rating ? '#fff' : theme.inkMuted,
              fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont,
              cursor: rating ? 'pointer' : 'default', transition: 'all 0.2s',
              boxShadow: rating ? `0 6px 18px ${theme.accent}44` : 'none',
            }}>Submit rating</button>

            <button onClick={onDone} style={{
              width: '100%', padding: '10px', marginTop: 6, borderRadius: 14,
              border: 'none', background: 'none', color: theme.inkMuted,
              fontSize: 13, fontFamily: theme.bodyFont, cursor: 'pointer',
            }}>Skip</button>
          </>
        )}
      </div>
    </div>
  );
}

// ═══ INCENTIVES / REWARDS ═══════════════════════════════════
function IncentivesScreen({ theme, persona, onRedeem }) {
  const dctRewards = COUPONS.filter(c => c.kind === 'dct');
  const partnerRewards = COUPONS.filter(c => c.kind === 'partner');

  // persona-tailored "For you" — DCT ecosystem items that match this persona
  const featured = dctRewards
    .filter(c => c.audience.includes(persona.id))
    .slice(0, 2);

  // partner rewards sorted by audience match first
  const sortedPartners = [...partnerRewards].sort((a, b) => {
    const am = a.audience.includes(persona.id) ? 0 : 1;
    const bm = b.audience.includes(persona.id) ? 0 : 1;
    return am - bm;
  });

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: '62px 20px 4px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 28, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.5,
        }}>Rewards</div>
        <div style={{ color: theme.inkMuted, fontSize: 13, fontFamily: theme.bodyFont, marginTop: 2 }}>
          Spend your points across Abu Dhabi — hotels, attractions, and everyday perks.
        </div>
      </div>

      {/* balance */}
      <div style={{
        margin: '14px 16px 0', padding: '16px 18px', borderRadius: 18,
        background: theme.ink, color: theme.surface,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 0.5, fontFamily: theme.bodyFont, marginBottom: 2 }}>
            AVAILABLE POINTS
          </div>
          <div style={{ fontFamily: theme.headerFont, fontSize: 30, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1 }}>
            {persona.points.toLocaleString()}
          </div>
        </div>
        <button style={{
          padding: '9px 14px', borderRadius: 99, border: 'none',
          background: theme.accent2, color: '#000',
          fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: theme.bodyFont,
        }}>Passbook</button>
      </div>

      {/* ── FOR YOU — persona-tailored featured ── */}
      <SectionHeader theme={theme}
        kicker="Picked for you"
        title="Because you're on the front line" />
      <div style={{
        padding: '0 16px', display: 'flex', gap: 10,
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {featured.map(c => (
          <FeaturedRewardCard key={c.id} coupon={c} theme={theme} onRedeem={onRedeem}/>
        ))}
      </div>

      {/* ── EXPERIENCE ABU DHABI — DCT ecosystem ── */}
      <SectionHeader theme={theme}
        kicker="DCT · Experience Abu Dhabi"
        title="On the house, from our venues"
        caption="Hotel stays, museums, pool days — redeemable across DCT-licensed partners."/>
      <div style={{ padding: '0 16px 4px' }}>
        {dctRewards.map(c => (
          <DctRewardRow key={c.id} coupon={c} theme={theme} persona={persona} onRedeem={onRedeem}/>
        ))}
      </div>

      {/* ── EVERYDAY ── */}
      <SectionHeader theme={theme}
        kicker="Everyday perks"
        title="Groceries, telecom, fuel & ride"/>
      <div style={{ padding: '0 16px 0' }}>
        {sortedPartners.map(c => (
          <PartnerRewardRow key={c.id} coupon={c} theme={theme} persona={persona} onRedeem={onRedeem}/>
        ))}
      </div>
    </div>
  );
}

// ── section header (consistent rhythm) ──
function SectionHeader({ theme, kicker, title, caption }) {
  return (
    <div style={{ padding: '22px 20px 10px' }}>
      {kicker && (
        <div style={{
          fontSize: 10.5, fontWeight: 700, letterSpacing: 1.2,
          color: theme.accent, fontFamily: theme.bodyFont,
          textTransform: 'uppercase', marginBottom: 4,
        }}>{kicker}</div>
      )}
      <div style={{
        fontFamily: theme.headerFont, fontSize: 19, fontWeight: 600,
        color: theme.ink, letterSpacing: -0.3, lineHeight: 1.2,
      }}>{title}</div>
      {caption && (
        <div style={{
          fontSize: 12.5, color: theme.inkMuted, marginTop: 4,
          fontFamily: theme.bodyFont, lineHeight: 1.4,
        }}>{caption}</div>
      )}
    </div>
  );
}

// ── featured horizontal card (persona hero) ──
function FeaturedRewardCard({ coupon, theme, onRedeem }) {
  return (
    <div onClick={() => onRedeem(coupon)} style={{
      flex: '0 0 260px', borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
      background: theme.surface, position: 'relative',
      boxShadow: `0 1px 2px ${theme.hairline}, 0 10px 28px ${theme.hairline}`,
    }}>
      <div style={{ position: 'relative' }}>
        <AbuDhabiScene variant={coupon.scene || 'corniche'} height={120}/>
        <div style={{
          position: 'absolute', top: 10, left: 10,
          padding: '4px 9px', borderRadius: 99,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
          fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
          color: '#141414', fontFamily: theme.bodyFont,
        }}>{coupon.category.toUpperCase()}</div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{
          fontSize: 10.5, color: theme.inkMuted, letterSpacing: 0.6,
          fontFamily: theme.bodyFont, marginBottom: 2,
        }}>{coupon.brand.toUpperCase()}</div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600,
          color: theme.ink, lineHeight: 1.25, letterSpacing: -0.2,
          marginBottom: 10, textWrap: 'pretty',
          minHeight: 36,
        }}>{coupon.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            padding: '5px 10px', borderRadius: 99, background: theme.ink,
            color: theme.surface, fontSize: 11, fontWeight: 700,
            fontFamily: theme.bodyFont,
          }}>{coupon.cost} pts</div>
          <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            Expires {coupon.expires}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DCT row with illustration (showcases DCT venues) ──
function DctRewardRow({ coupon, theme, persona, onRedeem }) {
  return (
    <div onClick={() => onRedeem(coupon)} style={{
      marginBottom: 10, borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      background: theme.surface, boxShadow: `0 1px 2px ${theme.hairline}`,
      display: 'flex', position: 'relative',
    }}>
      <div style={{ width: 96, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <AbuDhabiScene variant={coupon.scene || 'corniche'} height={100}/>
      </div>
      <div style={{ flex: 1, padding: '11px 12px 11px 14px', minWidth: 0 }}>
        <div style={{
          fontSize: 10, color: theme.inkMuted, letterSpacing: 0.4,
          fontFamily: theme.bodyFont, fontWeight: 600, marginBottom: 3,
        }}>{coupon.category.toUpperCase()}</div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 14.5, fontWeight: 600,
          color: theme.ink, lineHeight: 1.2, marginBottom: 2, letterSpacing: -0.2,
          textWrap: 'pretty',
        }}>{coupon.title}</div>
        <div style={{
          fontSize: 11.5, color: theme.inkMuted, marginBottom: 8,
          fontFamily: theme.bodyFont, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{coupon.brand}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            padding: '4px 10px', borderRadius: 99, background: theme.ink,
            color: theme.surface, fontSize: 11, fontWeight: 700,
            fontFamily: theme.bodyFont,
          }}>{coupon.cost.toLocaleString()} pts</div>
          <div style={{ flex: 1 }}/>
          <div style={{
            padding: '4px 10px', borderRadius: 99,
            border: `1px solid ${theme.accent}`, color: theme.accent,
            fontSize: 11, fontWeight: 600, fontFamily: theme.bodyFont,
          }}>Redeem →</div>
        </div>
      </div>
    </div>
  );
}

// ── everyday partner row (brand block) ──
function PartnerRewardRow({ coupon, theme, persona, onRedeem }) {
  return (
    <div onClick={() => onRedeem(coupon)} style={{
      marginBottom: 10, borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
      background: theme.surface, boxShadow: `0 1px 2px ${theme.hairline}`,
      display: 'flex',
    }}>
      <div style={{
        width: 78, background: coupon.color, color: coupon.textDark ? '#111' : '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative', flexShrink: 0,
      }}>
        <div style={{ fontSize: 9, opacity: 0.85, letterSpacing: 0.5, fontFamily: theme.bodyFont }}>COST</div>
        <div style={{ fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600, lineHeight: 1 }}>{coupon.cost}</div>
        <div style={{ fontSize: 9, opacity: 0.85, letterSpacing: 0.5, fontFamily: theme.bodyFont }}>POINTS</div>
        <div style={{
          position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
          width: 12, height: 12, borderRadius: 6, background: theme.surface,
        }}/>
      </div>
      <div style={{ flex: 1, padding: '11px 14px 11px 18px', minWidth: 0 }}>
        <div style={{
          fontSize: 10.5, color: theme.inkMuted, letterSpacing: 0.4,
          fontFamily: theme.bodyFont, fontWeight: 600, marginBottom: 2,
        }}>{coupon.brand.toUpperCase()}</div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 14, fontWeight: 600,
          color: theme.ink, lineHeight: 1.25, marginBottom: 6, letterSpacing: -0.2,
        }}>{coupon.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            Expires {coupon.expires}
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{
            padding: '4px 10px', borderRadius: 99, border: `1px solid ${theme.accent}`,
            color: theme.accent, fontSize: 11, fontWeight: 600, fontFamily: theme.bodyFont,
          }}>Redeem</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeHero, RecognitionScreen, LearningScreen, IncentivesScreen, SectionHeader, FeaturedRewardCard, DctRewardRow, PartnerRewardRow });
