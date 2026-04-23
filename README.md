# DCT Abu Dhabi — Frontline App Pitch

Interactive prototype for a mobile-first loyalty and engagement app targeting 10,000+ frontline hospitality workers in Abu Dhabi (hotel staff, concierge desks, information agents, taxi drivers).

## Quick Start

Open `index.html` in a browser. No build step required — uses React 18 with Babel standalone for client-side JSX compilation.

## Features

- **iOS 26 device frame** with Liquid Glass UI elements
- **5-tab mobile app**: Home, Learn, Feed, Rewards, Recognition
- **4-step onboarding flow**: Venue type, Brand, Role, Identity (UAE Pass or form)
- **3 visual themes**: DCT Official (coral/indigo/emerald), Modern, Editorial (dark)
- **3 persona profiles**: Concierge, Taxi Driver, Info Desk Agent
- **Interactive demos**: Push notifications, VX Destination Challenge quiz, coupon redemption (QR), leaderboard
- **Learning modules**: Soft Skills (36 units with video player simulation), Hard Skills, Abu Dhabi Info
- **Rewards catalog**: DCT ecosystem venues + everyday partner perks, persona-aware sorting
- **Pitch panel**: Left-side rationale with live demo action buttons

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Entry point — loads React, Babel, and all JSX modules |
| `ios-frame.jsx` | iOS 26 device frame, status bar, keyboard, glass pills |
| `data.jsx` | Personas, feed items, badges, leaderboard, courses, coupons |
| `theme.jsx` | Theme definitions, Icon set, SVG illustrations, UI primitives |
| `screens-feed.jsx` | Feed screen with card types (alert, announcement, lesson, shoutout, course, badge) |
| `screens-other.jsx` | Home, Learning, Recognition, Incentives/Rewards screens |
| `overlays.jsx` | Push notification, lesson quiz modal, coupon redeem modal, announcement detail |
| `onboarding.jsx` | 4-step onboarding flow |
| `app.jsx` | App shell, tab bar, tweaks panel, state management |

## Four Pillars

1. **Learning** — Micro-lessons, LMS courses, VX Destination Challenge
2. **Communication** — Priority alerts, city events, service updates
3. **Incentives** — DCT venue rewards + everyday partner perks
4. **Recognition** — Badges, peer shout-outs, leaderboards
