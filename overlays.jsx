// overlays.jsx — key moment overlays: push, lesson, coupon, announcement detail

// ═══ PUSH NOTIFICATION (appears at top of screen) ═══════════
function PushToast({ theme, show, onTap, onClose }) {
  if (!show) return null;
  return (
    <div onClick={onTap} style={{
      position: 'absolute', top: 60, left: 10, right: 10, zIndex: 200,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderRadius: 20, padding: '12px 14px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.05)',
      display: 'flex', alignItems: 'center', gap: 12,
      animation: 'pushIn 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 9,
        background: theme.priority, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}><Icon name="alert" size={19} color="#fff"/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 6,
          fontSize: 12, color: 'rgba(0,0,0,0.6)', marginBottom: 2,
          fontFamily: '-apple-system, system-ui',
        }}>
          <span style={{ fontWeight: 600, color: '#000' }}>DCT HOST</span>
          <span>now</span>
        </div>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#000', lineHeight: 1.25, marginBottom: 2,
          fontFamily: '-apple-system, system-ui',
        }}>Priority alert — Corniche diversions tonight</div>
        <div style={{
          fontSize: 13, color: 'rgba(0,0,0,0.75)', lineHeight: 1.3,
          fontFamily: '-apple-system, system-ui',
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>
          Lanes 2–4 closed 22:00–05:00. Airport pickups: add 15 min.
        </div>
      </div>
    </div>
  );
}

// ═══ LESSON MODAL — VX Destination Challenge quiz → celebration ═══
function LessonModal({ theme, show, stage, onStageChange, onClose }) {
  const [picked, setPicked] = React.useState(null);
  React.useEffect(() => { if (show && stage === 'playing') setPicked(null); }, [show, stage]);
  if (!show) return null;

  const options = [
    { k: 'A', label: 'Louvre Abu Dhabi',       correct: true  },
    { k: 'B', label: 'Yas Marina Circuit',     correct: false },
    { k: 'C', label: 'Abu Dhabi Cruise Terminal', correct: false },
    { k: 'D', label: 'Corniche Beach',         correct: false },
  ];
  const answered = picked !== null;
  const got = answered && options[picked].correct;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.5)',
      animation: 'fadeIn 0.25s',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: theme.surface, borderRadius: '24px 24px 0 0',
        overflow: 'hidden', animation: 'slideUp 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
        maxHeight: '92%', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div style={{ width: 36, height: 5, borderRadius: 3, background: theme.hairline }}/>
        </div>

        {stage === 'playing' && (
          <>
            {/* quiz header */}
            <div style={{ padding: '14px 20px 8px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 9px', borderRadius: 999,
                background: theme.accent2, color: '#fff',
                fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
                fontFamily: theme.bodyFont, marginBottom: 10,
              }}>VX DESTINATION CHALLENGE</div>
              <div style={{
                fontFamily: theme.headerFont, fontSize: 22, fontWeight: 600,
                color: theme.ink, letterSpacing: -0.3, lineHeight: 1.22, marginBottom: 4,
                textWrap: 'pretty',
              }}>Can you guess which Abu Dhabi icon I am?</div>
            </div>

            {/* clue card — themed illustration w/ hints overlaid */}
            <div style={{ margin: '8px 20px 0', borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              <AbuDhabiScene variant="louvre" height={150}/>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)',
              }}/>
              <div style={{
                position: 'absolute', left: 14, right: 14, bottom: 12,
                color: '#fff', fontFamily: theme.bodyFont,
              }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: theme.accent2 }}/>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Known for art, culture, iconic architecture.</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: theme.accent2 }}/>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Located on Saadiyat Island.</div>
                </div>
              </div>
            </div>

            {/* options */}
            <div style={{ padding: '16px 20px 6px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {options.map((opt, i) => {
                const isPicked = picked === i;
                const showState = answered && (isPicked || opt.correct);
                const bg = showState
                  ? (opt.correct ? `${theme.accent2}1a` : `${theme.priority}1a`)
                  : theme.surface;
                const borderColor = showState
                  ? (opt.correct ? theme.accent2 : theme.priority)
                  : theme.hairline;
                const fg = showState && opt.correct ? theme.accent2
                         : showState && isPicked ? theme.priority
                         : theme.ink;
                return (
                  <button key={opt.k} onClick={() => !answered && setPicked(i)}
                    disabled={answered}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '13px 14px', borderRadius: 12,
                      background: bg, border: `1.5px solid ${borderColor}`,
                      color: fg, fontFamily: theme.bodyFont,
                      fontSize: 14.5, fontWeight: 500, textAlign: 'left',
                      cursor: answered ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                    }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                      background: showState
                        ? (opt.correct ? theme.accent2 : isPicked ? theme.priority : theme.chipBg)
                        : theme.chipBg,
                      color: showState && (opt.correct || isPicked) ? '#fff' : theme.ink,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                    }}>{opt.k}</div>
                    <div style={{ flex: 1 }}>{opt.label}</div>
                    {showState && opt.correct && <Icon name="check" size={18} color={theme.accent2} strokeWidth={2.8}/>}
                    {showState && isPicked && !opt.correct && (
                      <div style={{ fontSize: 14, color: theme.priority, fontWeight: 700 }}>✕</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* feedback row */}
            {answered && (
              <div style={{
                margin: '10px 20px 0', padding: '12px 14px', borderRadius: 12,
                background: got ? `${theme.accent2}14` : `${theme.priority}12`,
                border: `1px solid ${got ? theme.accent2 : theme.priority}44`,
                fontFamily: theme.bodyFont, fontSize: 13.5,
                color: theme.ink, lineHeight: 1.4,
              }}>
                {got ? (
                  <><b style={{ color: theme.accent2 }}>Well done, Destination Champion! 👍</b><br/>
                    Louvre Abu Dhabi sits in the Saadiyat Cultural District — a strong recommendation for visitors seeking culture and indoor experiences.</>
                ) : (
                  <><b style={{ color: theme.priority }}>Not quite.</b> It's <b>Louvre Abu Dhabi</b> — art, culture, and iconic architecture on Saadiyat Island. A great tip for culture-seeking guests.</>
                )}
              </div>
            )}

            {/* actions */}
            <div style={{ padding: '16px 20px 24px', display: 'flex', gap: 10 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: '13px 16px', borderRadius: 14,
                border: `1px solid ${theme.hairline}`, background: 'transparent',
                color: theme.ink, fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont,
                cursor: 'pointer',
              }}>Close</button>
              <button onClick={() => answered && onStageChange('complete')}
                disabled={!answered}
                style={{
                  flex: 2, padding: '13px 16px', borderRadius: 14, border: 'none',
                  background: answered ? theme.accent : theme.chipBg,
                  color: answered ? '#fff' : theme.inkMuted,
                  fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont,
                  cursor: answered ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                }}>
                {answered ? 'Collect reward →' : 'Pick an answer'}
              </button>
            </div>
          </>
        )}

        {stage === 'complete' && (
          <div style={{
            padding: '28px 28px 28px', textAlign: 'center',
            background: `linear-gradient(180deg, ${theme.surface} 0%, ${theme.surfaceAlt} 100%)`,
          }}>
            <div style={{ position: 'relative', width: 120, height: 120, margin: '8px auto 20px' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle, ${theme.accent2}22 0%, transparent 70%)`,
                animation: 'pulse 2s ease-in-out infinite',
              }}/>
              <div style={{
                width: 96, height: 96, margin: '12px auto 0', borderRadius: 48,
                background: `linear-gradient(135deg, ${theme.accent2}, ${theme.accent})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 50, color: '#fff', fontWeight: 600,
                boxShadow: `0 16px 40px ${theme.accent2}55`,
                animation: 'pop 0.6s cubic-bezier(0.2, 1.3, 0.4, 1)',
              }}>◆</div>
            </div>

            <div style={{
              fontSize: 11, color: theme.accent, letterSpacing: 1, fontWeight: 700,
              fontFamily: theme.bodyFont, marginBottom: 8,
            }}>CHALLENGE COMPLETE</div>

            <div style={{
              fontFamily: theme.headerFont, fontSize: 24, fontWeight: 600,
              color: theme.ink, letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8,
            }}>Destination Champion 👍</div>

            <div style={{
              fontSize: 15, color: theme.inkMuted, lineHeight: 1.5, marginBottom: 20,
              fontFamily: theme.bodyFont, textWrap: 'pretty',
            }}>
              You unlocked the <b style={{ color: theme.ink }}>Saadiyat Savvy</b> badge and
              <b style={{ color: theme.ink }}> +25 points</b>. New challenge drops every Monday.
            </div>

            <div style={{
              display: 'flex', gap: 10, padding: '14px', borderRadius: 14,
              background: theme.surface, border: `1px solid ${theme.hairline}`,
              marginBottom: 20,
            }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont, marginBottom: 2 }}>POINTS</div>
                <div style={{ fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600, color: theme.ink }}>+25</div>
              </div>
              <div style={{ width: 1, background: theme.hairline }}/>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont, marginBottom: 2 }}>XP</div>
                <div style={{ fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600, color: theme.ink }}>+10</div>
              </div>
              <div style={{ width: 1, background: theme.hairline }}/>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: theme.bodyFont, marginBottom: 2 }}>STREAK</div>
                <div style={{ fontFamily: theme.headerFont, fontSize: 20, fontWeight: 600, color: theme.priority }}>8d</div>
              </div>
            </div>

            <button onClick={onClose} style={{
              width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              background: theme.ink, color: theme.surface,
              fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont, cursor: 'pointer',
            }}>Continue</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ COUPON REDEEM MODAL (QR) ═══════════════════════════════
function CouponRedeemModal({ theme, show, coupon, onClose }) {
  if (!show || !coupon) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.6)',
      animation: 'fadeIn 0.25s',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: theme.surface, borderRadius: '24px 24px 0 0',
        overflow: 'hidden', animation: 'slideUp 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div style={{ width: 36, height: 5, borderRadius: 3, background: theme.hairline }}/>
        </div>

        <div style={{ padding: '20px 24px 10px', textAlign: 'center' }}>
          <div style={{
            fontSize: 11, color: theme.inkMuted, letterSpacing: 1,
            fontWeight: 700, fontFamily: theme.bodyFont, marginBottom: 6,
          }}>{coupon.brand.toUpperCase()}</div>
          <div style={{
            fontFamily: theme.headerFont, fontSize: 24, fontWeight: 600,
            color: theme.ink, letterSpacing: -0.3, lineHeight: 1.2,
          }}>{coupon.title}</div>
        </div>

        {/* QR */}
        <div style={{ padding: '14px 24px 18px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            padding: 14, background: '#fff', borderRadius: 16,
            boxShadow: `0 1px 2px ${theme.hairline}, 0 10px 24px ${theme.hairline}`,
          }}>
            <QRPattern size={180} />
          </div>
        </div>

        <div style={{ padding: '0 24px 6px', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 18, letterSpacing: 4, color: theme.ink, marginBottom: 6,
          }}>DCT-H4K2-9P3M</div>
          <div style={{ fontSize: 12, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
            Show this code at the counter · expires in 14:52
          </div>
        </div>

        <div style={{
          margin: '18px 24px 0', padding: '14px', borderRadius: 12,
          background: theme.surfaceAlt, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: theme.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check" size={20} color="#fff" strokeWidth={2.6}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
              {coupon.cost} points deducted
            </div>
            <div style={{ fontSize: 11.5, color: theme.inkMuted, fontFamily: theme.bodyFont }}>
              Remaining balance: 4,620 pts
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 24px 28px' }}>
          <button onClick={onClose} style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: theme.ink, color: theme.surface,
            fontSize: 15, fontWeight: 600, fontFamily: theme.bodyFont, cursor: 'pointer',
          }}>Done</button>
        </div>
      </div>
    </div>
  );
}

// deterministic-ish "QR" pattern (grid of squares)
function QRPattern({ size = 180 }) {
  const n = 21;
  const cells = [];
  // seeded pseudo-random
  let s = 1337;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) cells.push(rnd() > 0.5);
  // finder patterns (3 corners)
  const inFinder = (x, y) => {
    const finders = [[0,0],[n-7,0],[0,n-7]];
    return finders.some(([fx,fy]) => x>=fx && x<fx+7 && y>=fy && y<fy+7);
  };
  const isFinderDark = (x, y) => {
    for (const [fx, fy] of [[0,0],[n-7,0],[0,n-7]]) {
      if (x>=fx && x<fx+7 && y>=fy && y<fy+7) {
        const lx = x - fx, ly = y - fy;
        if (lx===0||lx===6||ly===0||ly===6) return true;
        if (lx>=2&&lx<=4&&ly>=2&&ly<=4) return true;
        return false;
      }
    }
    return false;
  };
  const cs = size / n;
  return (
    <svg width={size} height={size}>
      {cells.map((on, i) => {
        const x = i % n, y = Math.floor(i / n);
        const dark = inFinder(x, y) ? isFinderDark(x, y) : on;
        if (!dark) return null;
        return <rect key={i} x={x*cs} y={y*cs} width={cs} height={cs} fill="#000"/>;
      })}
    </svg>
  );
}

// ═══ ANNOUNCEMENT DETAIL (from push) ════════════════════════
function AnnouncementDetail({ theme, show, onClose }) {
  if (!show) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 250,
      background: theme.appBg, overflow: 'auto',
      animation: 'slideLeft 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
    }}>
      {/* nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10, background: theme.appBg,
        padding: '54px 16px 10px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 18, border: 'none',
          background: theme.surface, color: theme.ink, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 1px 2px ${theme.hairline}`,
        }}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8 2L2 8l6 6" stroke={theme.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: theme.ink, fontFamily: theme.bodyFont }}>
          Priority alert
        </div>
      </div>

      {/* hero */}
      <div style={{
        margin: '4px 16px 0', padding: '18px 20px 20px', borderRadius: 20,
        background: theme.priority, color: '#fff',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.9,
          marginBottom: 10, fontFamily: theme.bodyFont,
        }}>DCT COMMAND · 2 MIN AGO</div>
        <div style={{
          fontFamily: theme.headerFont, fontSize: 22, fontWeight: 600,
          letterSpacing: -0.3, lineHeight: 1.2, marginBottom: 10,
        }}>Service diversions around Corniche — F1 setup begins tonight</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.95, fontFamily: theme.bodyFont }}>
          Lanes 2–4 closed <b>22:00–05:00</b> through Friday. Use the inland service road.
          Guests asking for airport pickup: add <b>15 min</b> to estimates.
        </div>
      </div>

      {/* what to tell guests */}
      <div style={{ padding: '20px 20px 6px' }}>
        <div style={{ fontFamily: theme.headerFont, fontSize: 15, fontWeight: 600, color: theme.ink, marginBottom: 10 }}>
          What to tell guests
        </div>
      </div>
      <div style={{ margin: '0 16px', padding: '16px', borderRadius: 14, background: theme.surface, boxShadow: `0 1px 2px ${theme.hairline}` }}>
        {[
          'Expect 15 min extra travel time for hotel → airport.',
          'F1 shuttle service runs every 10 min from Corniche station.',
          'Louvre AD & Qasr Al Watan remain fully accessible via Sheikh Zayed bridge.',
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
            <div style={{
              width: 20, height: 20, borderRadius: 10, background: theme.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              fontSize: 10, fontWeight: 700, fontFamily: theme.bodyFont, marginTop: 2,
            }}>{i+1}</div>
            <div style={{ fontSize: 14, color: theme.ink, lineHeight: 1.45, fontFamily: theme.bodyFont }}>{t}</div>
          </div>
        ))}
      </div>

      {/* actions */}
      <div style={{ padding: '16px 16px 100px', display: 'flex', gap: 10 }}>
        <button style={{
          flex: 1, padding: '14px', borderRadius: 14, border: 'none',
          background: theme.ink, color: theme.surface,
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: theme.bodyFont,
        }}>Acknowledge — Got it</button>
        <button style={{
          padding: '14px 16px', borderRadius: 14,
          border: `1px solid ${theme.hairline}`, background: 'transparent', color: theme.ink,
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: theme.bodyFont,
          display: 'flex', alignItems: 'center', gap: 6,
        }}><Icon name="bookmark" size={15} color={theme.ink}/> Save</button>
      </div>
    </div>
  );
}

Object.assign(window, { PushToast, LessonModal, CouponRedeemModal, AnnouncementDetail, QRPattern });
