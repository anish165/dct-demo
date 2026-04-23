// screens-feed.jsx — the main feed screen

function FeedHeader({ theme, persona, filter, setFilter, unseen }) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'learning', label: 'Learning' },
    { id: 'comms', label: 'What\'s on' },
    { id: 'incentives', label: 'Rewards' },
    { id: 'recognition', label: 'Recognition' },
  ];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: theme.appBg,
      paddingTop: 54,
    }}>
      {/* top row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 20px 10px',
      }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 28, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.5, flex: 1, lineHeight: 1,
        }}>Feed</div>
        <button style={{
          width: 36, height: 36, borderRadius: 18, border: 'none',
          background: theme.surface, color: theme.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', cursor: 'pointer',
          boxShadow: `0 1px 2px ${theme.hairline}`,
        }}>
          <Icon name="search" size={17} color={theme.ink}/>
        </button>
        <button style={{
          width: 36, height: 36, borderRadius: 18, border: 'none',
          background: theme.surface, color: theme.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', cursor: 'pointer',
          boxShadow: `0 1px 2px ${theme.hairline}`,
        }}>
          <Icon name="bell" size={17} color={theme.ink}/>
          {unseen > 0 && (
            <div style={{
              position: 'absolute', top: 4, right: 4,
              minWidth: 14, height: 14, borderRadius: 7,
              background: theme.priority, color: '#fff',
              fontSize: 9, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 3px',
            }}>{unseen}</div>
          )}
        </button>
      </div>

      {/* tab row */}
      <div style={{
        display: 'flex', gap: 8, padding: '0 20px 12px',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {tabs.map(t => {
          const on = filter === t.id;
          return (
            <button key={t.id} onClick={() => setFilter(t.id)} style={{
              padding: '7px 14px', borderRadius: 99,
              border: 'none', whiteSpace: 'nowrap',
              background: on ? theme.ink : theme.surface,
              color: on ? theme.surface : theme.ink,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: theme.bodyFont,
              boxShadow: on ? 'none' : `0 1px 2px ${theme.hairline}`,
            }}>{t.label}</button>
          );
        })}
      </div>

      {/* hairline under header */}
      <div style={{ height: 1, background: theme.hairline }}/>
    </div>
  );
}

// ─── feed cards by type ──────────────────────────────────────

function AlertCard({ item, theme, onOpen }) {
  return (
    <div onClick={onOpen} style={{
      margin: '14px 16px 0', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
      background: theme.priority, color: '#fff',
      boxShadow: `0 8px 24px ${theme.priority}33`,
    }}>
      <div style={{ padding: '14px 16px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
          opacity: 0.9, marginBottom: 10,
        }}>
          <Icon name="alert" size={13} color="#fff" strokeWidth={2.4}/>
          PRIORITY ALERT · DCT COMMAND · {item.time}
        </div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 19, fontWeight: 600,
          lineHeight: 1.25, letterSpacing: -0.2, marginBottom: 8,
        }}>{item.title}</div>
        <div style={{ fontSize: 14, lineHeight: 1.45, opacity: 0.92, fontFamily: theme.bodyFont }}>
          {item.body}
        </div>
      </div>
      <div style={{
        display: 'flex', borderTop: '1px solid rgba(255,255,255,0.18)',
      }}>
        <div style={{
          flex: 1, padding: '11px 16px', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: theme.bodyFont,
          borderRight: '1px solid rgba(255,255,255,0.18)',
        }}>Acknowledge</div>
        <div style={{
          flex: 1, padding: '11px 16px', fontSize: 13, fontWeight: 600,
          textAlign: 'center', fontFamily: theme.bodyFont,
        }}>View details →</div>
      </div>
    </div>
  );
}

function AnnouncementCard({ item, theme, saved, onSave, onOpen }) {
  const imgTone = item.image === 'food-festival' ? 'warm'
               : item.image === 'louvre' ? 'cool'
               : item.image === 'course-ramadan' ? 'sand' : 'warm';
  const imgLabel = item.image === 'food-festival' ? 'FOOD FEST · UMM AL EMARAT'
                 : item.image === 'louvre' ? 'LOUVRE ABU DHABI'
                 : item.image === 'course-ramadan' ? 'RAMADAN COURSE' : 'IMAGE';
  return (
    <div style={{
      margin: '14px 16px 0', borderRadius: 18, overflow: 'hidden',
      background: theme.surface,
      boxShadow: `0 1px 2px ${theme.hairline}, 0 8px 20px ${theme.hairline}`,
    }}>
      {/* author row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px 10px',
      }}>
        <Avatar initials={item.author.slice(0,2).toUpperCase()} size={30} theme={theme} tone="accent"/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: theme.ink,
            fontFamily: theme.bodyFont,
          }}>{item.author}</div>
          <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            {item.time} · {item.tag}
          </div>
        </div>
        <PillarChip pillar={item.pillar} theme={theme}/>
      </div>

      {item.image && <FeedImage scene={item.scene} src={item.imageUrl} label={imgLabel} tone={imgTone} height={200} theme={theme}/>}

      <div style={{ padding: '12px 14px 6px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 18, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.2, lineHeight: 1.25, marginBottom: 6,
        }}>{item.title}</div>
        <div style={{ fontSize: 14, color: theme.inkMuted, lineHeight: 1.45, fontFamily: theme.bodyFont }}>
          {item.body}
        </div>
      </div>

      {/* action row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 18,
        padding: '10px 14px 12px',
      }}>
        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: theme.inkMuted, fontFamily: theme.bodyFont, fontSize: 12 }}>
          <Icon name="heart" size={18} color={theme.inkMuted}/>
          <span>124</span>
        </button>
        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, color: theme.inkMuted, fontFamily: theme.bodyFont, fontSize: 12 }}>
          <Icon name="comment" size={18} color={theme.inkMuted}/>
          <span>12</span>
        </button>
        <div style={{ flex: 1 }}/>
        <button onClick={onSave} style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
          color: saved ? theme.accent : theme.inkMuted, fontFamily: theme.bodyFont, fontSize: 12, fontWeight: 600,
        }}>
          <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={17} color={saved ? theme.accent : theme.inkMuted}/>
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}

function LessonCard({ item, theme, onStart }) {
  return (
    <div onClick={onStart} style={{
      margin: '14px 16px 0', borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
      background: theme.surface,
      boxShadow: `0 1px 2px ${theme.hairline}, 0 8px 20px ${theme.hairline}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px 10px',
      }}>
        <Avatar initials="VX" size={30} theme={theme} tone="accent2"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
            {item.author}
          </div>
          <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            {item.time} · {item.tag}
          </div>
        </div>
        <PillarChip pillar={item.pillar} theme={theme}/>
      </div>

      {/* lesson content */}
      <div style={{
        margin: '0 14px 12px', borderRadius: 14,
        background: theme.surfaceAlt,
        padding: '14px 14px 12px',
        border: `1px solid ${theme.hairline}`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 18, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.2, lineHeight: 1.25, marginBottom: 6,
          textWrap: 'pretty',
        }}>{item.title}</div>
        <div style={{ fontSize: 13.5, color: theme.inkMuted, lineHeight: 1.45, marginBottom: 12, fontFamily: theme.bodyFont }}>
          {item.body}
        </div>
        {/* A B C D preview chips */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {['A','B','C','D'].map(k => (
            <div key={k} style={{
              flex: 1, padding: '6px 0', borderRadius: 8,
              background: theme.surface, border: `1px solid ${theme.hairline}`,
              textAlign: 'center', fontFamily: theme.bodyFont,
              fontSize: 12, fontWeight: 700, color: theme.ink, letterSpacing: 0.5,
            }}>{k}</div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: theme.accent, color: '#fff',
            padding: '9px 14px', borderRadius: 99,
            fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: theme.bodyFont,
          }}>
            <Icon name="play" size={11} color="#fff"/> Take the challenge · {item.duration}
          </div>
          <div style={{ fontSize: 12, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            <b style={{ color: theme.ink }}>+{item.reward.points} pts</b> · +{item.reward.xp} XP
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoutoutCard({ item, theme }) {
  return (
    <div style={{
      margin: '14px 16px 0', borderRadius: 18, overflow: 'hidden',
      background: theme.surface,
      boxShadow: `0 1px 2px ${theme.hairline}, 0 8px 20px ${theme.hairline}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px 10px',
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 15,
          background: theme.accent2, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="sparkle" size={15} color="#fff"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
            {item.author}
          </div>
          <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            {item.time} · {item.tag}
          </div>
        </div>
        <PillarChip pillar={item.pillar} theme={theme}/>
      </div>
      <div style={{ padding: '0 14px 14px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.3, lineHeight: 1.2, marginBottom: 10,
        }}>{item.title}</div>
        <div style={{
          padding: '14px 16px', borderLeft: `3px solid ${theme.accent2}`,
          background: theme.surfaceAlt, borderRadius: '0 10px 10px 0',
          fontStyle: 'italic', fontSize: 14.5, color: theme.ink, lineHeight: 1.45,
          fontFamily: theme.headerFont,
        }}>
          {item.body}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'center' }}>
          <button style={{
            padding: '9px 16px', borderRadius: 99, border: 'none',
            background: theme.ink, color: theme.surface,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6, fontFamily: theme.bodyFont,
          }}>
            <Icon name="heart" size={13} color={theme.surface}/> Cheer
          </button>
          <button style={{
            padding: '9px 16px', borderRadius: 99,
            border: `1px solid ${theme.hairline}`, background: 'transparent',
            color: theme.ink, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: theme.bodyFont,
          }}>Nominate back</button>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ item, theme, onStart }) {
  return (
    <div style={{
      margin: '14px 16px 0', borderRadius: 18, overflow: 'hidden',
      background: theme.surface,
      boxShadow: `0 1px 2px ${theme.hairline}, 0 8px 20px ${theme.hairline}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 14px 10px',
      }}>
        <Avatar initials="DA" size={30} theme={theme} tone="accent"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
            {item.author}
          </div>
          <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            {item.time} · {item.tag}
          </div>
        </div>
        <PillarChip pillar={item.pillar} theme={theme}/>
      </div>
      <FeedImage scene={item.scene} src={item.imageUrl} label="RAMADAN COURSE" tone="sand" height={140} theme={theme}/>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 18, fontWeight: 600,
          color: theme.ink, letterSpacing: -0.2, lineHeight: 1.25, marginBottom: 6,
        }}>{item.title}</div>
        <div style={{ fontSize: 13.5, color: theme.inkMuted, lineHeight: 1.45, marginBottom: 12, fontFamily: theme.bodyFont }}>
          {item.body}
        </div>
        <div onClick={onStart} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 16px', borderRadius: 99,
          background: theme.accent, color: '#fff',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: theme.bodyFont,
        }}>
          {item.cta} <Icon name="chevron-right" size={14} color="#fff"/>
        </div>
      </div>
    </div>
  );
}

function BadgeCard({ item, theme }) {
  return (
    <div style={{
      margin: '14px 16px 0', borderRadius: 18, overflow: 'hidden',
      background: `linear-gradient(135deg, ${theme.accent2} 0%, ${theme.accent} 100%)`,
      color: '#fff', position: 'relative',
      boxShadow: `0 8px 24px ${theme.accent2}55`,
    }}>
      <div style={{ padding: '16px 16px 18px', position: 'relative' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
          opacity: 0.85, marginBottom: 10, fontFamily: theme.bodyFont,
        }}>{item.tag} · {item.time}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 26,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, border: '1.5px solid rgba(255,255,255,0.4)',
          }}>◆</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: theme.headerFont, fontSize: 18, fontWeight: 600,
              letterSpacing: -0.2, lineHeight: 1.2, marginBottom: 4,
            }}>{item.title}</div>
            <div style={{ fontSize: 13, opacity: 0.92, fontFamily: theme.bodyFont }}>
              {item.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedList({ theme, persona, filter, savedIds, toggleSave, onNav }) {
  const items = filter === 'all' ? FEED : FEED.filter(i => i.pillar === filter);
  return (
    <div style={{ paddingBottom: 100 }}>
      {items.map(item => {
        if (item.type === 'alert') return <AlertCard key={item.id} item={item} theme={theme}/>;
        if (item.type === 'lesson') return <LessonCard key={item.id} item={item} theme={theme} onStart={() => onNav('lesson')}/>;
        if (item.type === 'shoutout') return <ShoutoutCard key={item.id} item={item} theme={theme}/>;
        if (item.type === 'course') return <CourseCard key={item.id} item={item} theme={theme} onStart={() => onNav('learn')}/>;
        if (item.type === 'badge') return <BadgeCard key={item.id} item={item} theme={theme}/>;
        return <AnnouncementCard key={item.id} item={item} theme={theme}
                 saved={savedIds.includes(item.id)}
                 onSave={() => toggleSave(item.id)}/>;
      })}
    </div>
  );
}

Object.assign(window, { FeedHeader, FeedList });
