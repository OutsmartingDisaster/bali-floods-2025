# 27 OCT 2025 — UI/UX Improvements Plan

This document captures a prioritized, detailed plan to elevate the product’s UX/UI quality. It reflects the current stack and constraints:

- React + Vite + Tailwind CSS
- Mapbox GL JS
- i18next (ID/EN) with language selection in Preloader (no Header)
- shadcn/ui components being introduced incrementally
- Choropleth population (per kelurahan) + flood layers
- CollageSection remains as-is (Bahasa Bali + English subtitle)

---

## High-Impact Improvements (Priority)

- **Persist language choice and improve i18n UX**
  - Save selected language in `localStorage` and auto-skip language screen on subsequent visits.
  - Reflect selection to `<html lang="...">` for a11y/SEO.
  - Provide a small floating language switch after preload (bottom-right pill; Drawer on mobile).

- **Choropleth legend + layer toggles overlay**
  - Add a compact legend (top-left) with labeled bins and units (Population per kelurahan).
  - Add layer toggles (Switch/Checkbox) for Choropleth, Flood points, Flood depth, InaRISK, River buffers.
  - Use shadcn Card on desktop; Drawer on mobile; persist user choices.

- **Dynamic map padding per step**
  - Apply responsive `fitBounds`/camera padding so overlays don’t cover POIs.
  - Example padding: mobile `{ top: 40, right: 16, bottom: 160, left: 16 }`, desktop `{ right: 420, top: 60, bottom: 60, left: 60 }`.

- **Mobile overlay ergonomics**
  - Constrain panel: `max-h-[60vh] md:max-h-none overflow-auto overscroll-contain`.
  - Add a "Hide/Show panel" chevron to temporarily collapse overlay.

- **Kelurahan interactions**
  - Hover: outline highlight (`line-width: 2.5`) + slightly higher `fill-opacity`.
  - Click: Popover with `kelurahan`, `jumlah_penduduk`, and InaRISK risk cue (if in high zone).

---

## Detailed Recommendations

### 1) Design System
- **Typography**
  - Use Tailwind font tokens: `font-heading` = Libre Baskerville, `font-body` = Source Sans Pro.
  - Adopt a responsive type scale via `clamp()` for heroes and major headings.
  - Maintain vertical rhythm with an 8px spacing scale.

- **Color & Contrast**
  - Ensure overlay text on translucent backgrounds meets 4.5:1 contrast.
  - Consider perceptually uniform scales (e.g., Viridis) for data viz; current YlOrBr is acceptable.

- **Radii & Elevation**
  - Standardize radii: `rounded-lg` (12px) cards, `rounded-xl` (16px) hero surfaces.
  - Subtle elevation transitions: `shadow-md → shadow-lg` on hover.

### 2) i18n UX
- **Persistence**
  - On language select: set `localStorage.setItem('lang', code)`, update `<html lang>`.
  - On app start: read language and preselect; skip selection screen if found.
- **Audit**
  - Replace hardcoded strings with `t()` across sections (Intro done). Exclude CollageSection per requirement.
  - Include chart axis labels, legends, footnotes, and credits.

### 3) Preloader Accessibility & Feedback
- **A11y**
  - Progressbar: `role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}`.
  - Loading message: `aria-live="polite"`.
  - Language cards: keyboard focusable, visible focus ring.
- **Performance**
  - Load resources with small concurrency (3–4) to shorten perceived waiting while avoiding burst.

### 4) Map UX & Visualization
- **Legend & Toggles**
  - Legend shows discrete bins and numeric labels (e.g., `<10k`, `10–20k`, …). Add info tooltip explaining data source.
  - Use shadcn Card/Tooltip/Switch components for cohesion.
- **Layer Order**
  - Flood points must render last (always on top). Verify re-mount order and consider `*-sort-key` where applicable.
- **Hover/Click**
  - Hover highlight and Popover with structured info. Include a tiny link to “View all layers” (opens Drawer).
- **Dynamic Padding**
  - Compute per step based on overlay width (mobile vs desktop) to avoid overlay occlusion.
- **InaRISK Fallback**
  - If raster fetch fails (timeout/CORS), auto-hide layer and show a non-blocking toast.

### 5) Scrollytelling Panels
- **Pointer events**
  - Wrapper `pointer-events-none`, panel `pointer-events-auto` so the map remains interactive outside the panel.
- **Scroll handling**
  - `max-h-[60vh] overflow-auto` on mobile, `overscroll-contain` to avoid scroll chaining.
- **Focus management**
  - On step enter, move focus to the panel heading (`tabIndex={-1}` + `focus({ preventScroll: true })`).
- **Progress affordances**
  - Add a subtle stepper (desktop) / thin top progress bar (mobile) to indicate narrative progress.

### 6) Components (shadcn/ui)
- Introduce a small set first: Card, Tooltip, Switch, Drawer, Dialog, Skeleton.
- Buttons: use `buttonVariants` consistently (Ghost for icon-only map buttons, Secondary for toggles).

### 7) Performance
- **Code-splitting**
  - Lazy-load Mapbox and heavy libs only at map entry. Use `manualChunks` in Vite for vendor splitting.
- **Images**
  - Convert hero/large images to WebP/AVIF with `srcset`/`sizes`. Preload hero with `fetchpriority="high"`.
- **Fonts**
  - Preconnect to fonts, use `font-display: swap`. Consider self-hosting if CLS persists.

### 8) Accessibility
- **Reduce motion**
  - Respect `prefers-reduced-motion`: disable parallax and bounce.
- **Semantics**
  - Ensure heading hierarchy is logical within each section.
  - Provide descriptive `alt` text and labels for icon-only buttons.
- **Keyboard**
  - Make all map controls reachable via keyboard. `Enter` toggles, `Esc` closes Drawer.

### 9) Content & Copy
- **Consistency**
  - Uniform casing for headings (pick Sentence Case or Title Case and apply globally).
  - Explicit unit labels (e.g., "1–2 m depth").
- **Choropleth classification**
  - Consider quantiles/Jenks for skewed distributions; update legend to match bins.

---

## Quick Wins (Implement in 1–2 PRs)
- Legend + layer toggles overlay (Card/Drawer + Switches) with persistence.
- Mobile overlay constraints (`max-h` + `overflow-auto`) + Hide/Show control.
- Persist language to localStorage + floating language switch.
- Hover highlight and Popover for kelurahan polygons.
- Map padding per step to keep POIs visible.

---

## Implementation Checklist

- [ ] Persist language selection (localStorage + `<html lang>`)
- [ ] Floating language switcher (pill; Drawer on mobile)
- [ ] Replace hardcoded strings with `t()` across all sections (except CollageSection)
- [ ] Choropleth legend with labeled bins + info tooltip
- [ ] Layer toggles overlay (Card/Drawer + Switch) with persistence
- [ ] Ensure flood points are last in render order (always on top)
- [ ] Dynamic map padding responsive to overlay width per step
- [ ] Mobile panels: `max-h-[60vh] overflow-auto overscroll-contain`
- [ ] Panel collapse/expand control on mobile
- [ ] Hover highlight + click Popover for kelurahan
- [ ] Preloader a11y (progressbar ARIA; aria-live)
- [ ] Respect `prefers-reduced-motion` (disable parallax/bounce)
- [ ] Image optimization (WebP/AVIF + srcset)
- [ ] Vendor code-splitting with `manualChunks`

---

## Notes
- Keep CollageSection unchanged (Bahasa Bali with English translation).
- Use shadcn/ui primitives incrementally to avoid large UI diffs.
- Verify color/contrast with tooling (e.g., axe, Lighthouse).

# Copywriting Improvements (EN + ID)

Below are actionable, high-quality copy upgrades by section. I focus on clarity, credibility, inclusivity, and bilingual consistency. Each item includes suggested wording you can plug into your i18n keys.

## Global Principles
- **Tone/voice**
  - EN: Clear, human, credible. Mix short and medium sentences. Avoid passive voice.
  - ID: Ringkas, lugas, manusiawi. Hindari kalimat beranak-pinak; utamakan SPOK sederhana.
- **Dates/units**
  - EN: Use “September 9–11, 2025”, “187 mm”, “1–2 m”.
  - ID: Use “9–11 September 2025”, “187 mm”, “1–2 m”.
- **Terminology**
  - EN: “flood points”, “inundation depth”, “river buffer”, “choropleth”.
  - ID: “titik banjir”, “ketinggian genangan”, “buffer sungai”, “korelasi warna/choropleth”.
- **Numbers**
  - Use thin spaces or commas for readability (e.g., 32,838). In ID copy, prefer “32.838”.
- **Disclaimers**
  - Add short notes near legends: “Indicative only. See Methods.” / “Indikatif. Lihat Metode.”

## Preloader (Language + Loading)
- **Headline**
  - EN: Select your language
  - ID: Pilih bahasa Anda
- **Subcopy**
  - EN: Choose a language to continue.
  - ID: Pilih bahasa untuk melanjutkan.
- **Buttons**
  - EN: English
  - ID: Indonesia
- **Loading text**
  - EN: Loading maps and geospatial data…
  - ID: Memuat peta dan data geospasial…
- **Done**
  - EN: Complete!
  - ID: Selesai!

## Hero Section
- **Badge**
  - EN: September 9–11, 2025
  - ID: 9–11 September 2025
- **Title (Option A: inclusive)**
  - EN: Are We Ready for the Flood?
  - ID: Apakah Kita Siap Menghadapi Banjir?
- **Title (Option B: accountability)**
  - EN: Are They Ready for the Flood?
  - ID: Apakah Mereka Siap Menghadapi Banjir?
- **Subtitle**
  - EN: Bali Floods 2025 — the deadliest hydrometeorological disaster in recent memory
  - ID: Banjir Bali 2025 — bencana hidrometeorologi paling mematikan dalam ingatan kita
- **Scroll microcopy**
  - EN: Scroll to explore the data-driven story
  - ID: Gulir untuk menjelajahi kisah berbasis data

## Intro Section
- **Title**
  - EN: The Deadliest Hydrometeorological Disaster in Modern Bali
  - ID: Bencana Hidrometeorologi Paling Mematikan di Bali Modern
- **Lead (short, credible)**
  - EN: On September 10, 2025, extreme rainfall paralyzed six regencies/cities. Flash floods and landslides claimed lives and damaged critical infrastructure.
  - ID: Pada 10 September 2025, hujan ekstrem melumpuhkan enam kabupaten/kota. Banjir bandang dan longsor merenggut nyawa dan merusak infrastruktur penting.
- **Context**
  - EN: This tragedy arrived just as Bali hosted global forums on disaster, water, and climate—revealing gaps between discourse and real-world resilience.
  - ID: Tragedi ini hadir ketika Bali baru saja menjadi tuan rumah forum global tentang bencana, air, dan iklim—membuka jarak antara wacana dan ketangguhan nyata di lapangan.
- **Purpose**
  - EN: This narrative assembles maps, data, and ground reports to reconstruct what happened—and what must change.
  - ID: Narasi ini merangkai peta, data, dan kesaksian lapangan untuk merekonstruksi apa yang terjadi—dan apa yang perlu berubah.

## Weather/Anomaly (Charts)
- **Title**
  - EN: Anatomy of an Extreme Rainfall Day
  - ID: Anatomi Hari Hujan Ekstrem
- **Key points**
  - EN:
    - Peak intensity: 07:00–10:00 WITA
    - 187 mm in 24 hours (≈3× monthly normal)
    - Coincided with high tide and saturated soils
  - ID:
    - Puncak intensitas: 07.00–10.00 WITA
    - 187 mm dalam 24 jam (≈3× normal bulanan)
    - Berbarengan dengan pasang tinggi dan tanah jenuh
- **Conclusion**
  - EN: This was not ordinary rain. In a city with limited drainage and rapid land conversion, the outcome was catastrophic.
  - ID: Ini bukan hujan biasa. Di kota dengan drainase terbatas dan alih fungsi lahan yang cepat, dampaknya menjadi katastropik.

## Denpasar Section (Step headings + one-liners)
- **Section title**
  - EN: Denpasar — The City’s Economic Heart Under Water
  - ID: Denpasar — Jantung Ekonomi yang Terendam
- **Step 1 (Kampung Jawa)**
  - EN: Kampung Jawa — Ahmad Yani Street
    - When Tukad Badung spilled over, dense housing lines fell under fast-rising water.
  - ID: Kampung Jawa — Jalan Ahmad Yani
    - Saat Tukad Badung meluap, permukiman padat diterjang air yang cepat naik.
- **Step 2 (Pasar Badung)**
  - EN: Badung Market — Gajah Mada Street
    - Commerce stopped. Stalls shuttered. Evacuations moved people to higher ground.
  - ID: Pasar Badung — Jalan Gajah Mada
    - Ekonomi terhenti. Lapak ditutup. Evakuasi memindahkan warga ke tempat lebih tinggi.
- **Step 3 (Hasanudin)**
  - EN: Hasanudin Street — Building Collapse
    - River-edge structures failed under forceful currents; two people reported missing.
  - ID: Jalan Hasanudin — Bangunan Roboh
    - Bangunan di tepi sungai runtuh diterjang arus; dua orang dilaporkan hilang.
- **Step 4 (Soputan)**
  - EN: Soputan — Road Flooding
    - Street gradients funneled water into homes—depths averaged around one meter.
  - ID: Soputan — Genangan Jalan
    - Kontur jalan menyalurkan air ke rumah-rumah—rata-rata genangan sekitar satu meter.
- **Step 5 (Pura Demak)**
  - EN: Pura Demak — Chronic Flood Zone
    - Low elevation and poor drainage turned a familiar risk into a disaster.
  - ID: Pura Demak — Zona Langganan Banjir
    - Elevasi rendah dan drainase buruk mengubah risiko lama menjadi bencana.

## Badung Section (Step headings + one-liners)
- **Section title**
  - EN: Badung — When a Tourism Paradise Drowns
  - ID: Badung — Saat Surga Pariwisata Tenggelam
- **Step 1 (Shortcut Canggu)**
  - EN: Canggu Shortcut — Chokepoint Underwater
    - The island’s most infamous shortcut became impassable within minutes.
  - ID: Shortcut Canggu — Titik Macet Terendam
    - Jalur tersibuk di Canggu berubah tak bisa dilalui dalam hitungan menit.
- **Step 2 (Underpass Dewa Ruci)**
  - EN: Dewa Ruci Underpass — A Critical Node Fails
    - Floodwaters pooled; mobility across tourism corridors stalled for hours.
  - ID: Underpass Dewa Ruci — Simpul Kritis Lumpuh
    - Air menggenang; mobilitas koridor pariwisata terhenti berjam-jam.
- **Step 3 (Kuta)**
  - EN: Kuta — Tourism at a Standstill
    - Streets turned to channels; businesses shuttered; visitors stranded.
  - ID: Kuta — Pariwisata Terhenti
    - Jalan jadi saluran; usaha tutup; wisatawan terjebak.

## Flood Impact Section (Cards)
- **Overview**
  - EN: Flood Impact Analysis
    - Crowdsourced reports mapped incident points across Denpasar and southern Badung—our fastest, closest-to-ground dataset.
  - ID: Analisis Dampak Banjir
    - Laporan crowdsourcing memetakan titik kejadian di Denpasar dan Badung selatan—dataset tercepat dan paling dekat dengan lapangan.
- **Flood Radius**
  - EN: Flood Radius Layer
    - A 1 km buffer expands incident points into likely impact zones—vital for rapid planning.
  - ID: Layer Radius Banjir
    - Buffer 1 km memperluas titik kejadian menjadi zona terdampak—krusial untuk respons cepat.
- **Depth Categories**
  - EN: Inundation Depth
    - Red > 2 m; Orange 1–2 m; Yellow < 1 m. Categories drawn from photo/video interpretation.
  - ID: Ketinggian Genangan
    - Merah > 2 m; Oranye 1–2 m; Kuning < 1 m. Kategori hasil interpretasi foto/video.
- **River Buffer**
  - EN: River Buffer Risk
    - 10/50/100 m buffers reveal exposure near meandering rivers—especially along Tukad Badung.
  - ID: Risiko Buffer Sungai
    - Buffer 10/50/100 m menunjukkan keterpaparan dekat sungai berliku—terutama di Tukad Badung.
- **Conclusion (Spasial)**
  - EN: Spatial Conclusion
    - This was deep, fast, and urban. Hydrology, drainage limits, and land conversion amplified impacts.
  - ID: Kesimpulan Spasial
    - Banjir ini dalam, cepat, dan urban. Hidrologi, keterbatasan drainase, dan alih fungsi lahan memperbesar dampak.

## Map UI: Legend, Toggles, Popover
- **Legend title**
  - EN: Population per Kelurahan
  - ID: Jumlah Penduduk per Kelurahan
- **Legend bins**
  - EN: <10k • 10–20k • 20–25k • 25–30k • >30k
  - ID: <10 rb • 10–20 rb • 20–25 rb • 25–30 rb • >30 rb
- **Toggles**
  - EN: Choropleth • Flood Points • Inundation • River Buffers • InaRISK
  - ID: Korelasi Warna • Titik Banjir • Genangan • Buffer Sungai • InaRISK
- **Popover (kelurahan click)**
  - EN: {Kelurahan} — Population: {N} • In high-risk zone: Yes/No
  - ID: {Kelurahan} — Penduduk: {N} • Zona risiko tinggi: Ya/Tidak

## Conclusion
- **Title**
  - EN: From Forums to Field Resilience
  - ID: Dari Forum ke Ketangguhan Nyata
- **Copy**
  - EN: The 2025 floods demand more than statements. They require systems that protect lives—drainage that works, land use that listens to water, and citizens empowered with information.
  - ID: Banjir 2025 menuntut lebih dari sekadar pernyataan. Ia butuh sistem yang melindungi—drainase yang bekerja, tata ruang yang mendengar aliran air, dan warga yang berdaya dengan informasi.

## Credits (list format)
- **Labels**
  - EN: Crowdsourcing Data • Geospatial Analysis • Storyline • Web Development
  - ID: Data Crowdsourcing • Analisis Geospasial • Alur Cerita • Pengembangan Web
- **Footer**
  - EN: © 2025 U-INSPIRE Indonesia. All rights reserved.
  - ID: © 2025 U-INSPIRE Indonesia. Hak cipta dilindungi.

## Microcopy & A11y Details
- **Empty state (map)**
  - EN: No features in the current view.
  - ID: Tidak ada fitur pada tampilan saat ini.
- **Tooltips**
  - EN: Toggle layer visibility • Learn about this layer
  - ID: Tampilkan/sembunyikan layer • Pelajari layer ini
- **Disclaimers**
  - EN: Indicative only. See Methods for limitations.
  - ID: Bersifat indikatif. Lihat Metode untuk batasan.
- **Alt text patterns**
  - EN: “Aerial photo of flooded Gajah Mada Street in Denpasar, September 10, 2025.”
  - ID: “Foto udara banjir di Jalan Gajah Mada, Denpasar, 10 September 2025.”

# Implementation Notes
- **Where to put this**
  - Add these strings to [src/i18n/translations.js](cci:7://file:///home/rio/banjirbali_2025/src/i18n/translations.js:0:0-0:0) (keys already exist for many).
  - Replace hardcoded strings using `useTranslation()` across sections (except CollageSection).
- **Language persistence**
  - After the user selects a language in the Preloader, save to `localStorage` and set `<html lang>`.

# Recommended Actions
- **Add** these copy updates to [translations.js](cci:7://file:///home/rio/banjirbali_2025/src/i18n/translations.js:0:0-0:0).
- **Audit** remaining sections for hardcoded strings and replace with `t()`.
- **Refine** legend/toggles/popup copy as features ship (keep them short and scannable).

Summary: I delivered a detailed, bilingual copy improvement pack with microcopy, tone, and section-by-section rewrites ready to integrate into your i18n files. I recommend implementing the Preloader persistence and updating [translations.js](cci:7://file:///home/rio/banjirbali_2025/src/i18n/translations.js:0:0-0:0) next.

To provide targeted, high-value data and visualization improvements, I'll quickly scan the map and chart components to ground suggestions in the code: InteractiveMap.jsx, Charts.jsx, and WeatherChart.jsx.

I will open the chart components to ground specific data and visualization improvements for charts and ensure recommendations are precise.





Below are targeted, high-leverage data and visualization improvements grounded in your codebase. I’ve referenced exact components/areas and included small, practical details.

# Findings

- **Choropleth classification (InteractiveMap.jsx 380–416)**
  - Current: linear color by `jumlah_penduduk` at fixed stops.
  - Improve:
    - Switch to quantile or Jenks (ckmeans) classification for better separation on skewed data.
    - Compute dynamic bins from actual values on load; cache in state to drive both layer paint and legend.
    - Label bins explicitly in legend (e.g., <10k, 10–20k, …).
  - Small details:
    - Add a density toggle: absolute population vs population density (per km²). Compute polygon area (km²) with Turf and derive `pop_density`. Provide a “Population / Density” switch.

- **Map interactivity & UX (InteractiveMap.jsx Map at 147)**
  - Current: no `interactiveLayerIds`; click relies on raw `event.features`.
  - Improve:
    - Set `interactiveLayerIds` to the layer IDs you want clickable/hoverable (e.g., `['population-choropleth-fill', 'flood-points-circle']`).
    - Implement hover highlight via feature-state:
      - Assign a stable `promoteId` for kelurahan (e.g., a `kel_id`) in the GeoJSON or generate one and pass `promoteId` in Source.
      - On mouse move, set the hovered ID into feature-state and increase outline/opacity for just that feature.
    - On click, open a Popover with name, population, density, and risk flags (e.g., if within river buffer / InaRISK high zone).
  - Small details:
    - Provide a desktop hover state and a mobile tap state. Ensure hover style uses slight increase in line width (`+0.75px`) and `fill-opacity +0.1`.

- **Legend + layer toggles (new overlay component)**
  - Add a compact shadcn Card overlay with:
    - Choropleth legend (bins rendered as swatches with numeric labels and unit).
    - Switches for layer visibility: Choropleth, Flood Points, Inundation Depth, River Buffers, InaRISK.
    - A subtle “i” tooltip: “Indicative only. See Methods.”
    - Persist toggle state (localStorage) and restore on load.
  - Small details:
    - Use Drawer on mobile to avoid covering the map.
    - Tooltips on toggles (“Toggle layer visibility”).

- **Dynamic camera padding per scrolly step**
  - Current: overlay panels can occlude POIs.
  - Improve:
    - Apply camera padding responsive to overlay width per step (mobile: add bottom padding ≈ 160px; desktop: right padding ≈ 420px).
    - Add a panel collapse/expand chevron on mobile; recalculate padding on toggle.

- **Flood points heatmap (InteractiveMap.jsx 279–305)**
  - Current: defaults for weight/intensity/radius.
  - Improve:
    - Weight by `Ketinggian`: tinggi=1, sedang=0.7, rendah=0.4 (via `match` on property).
    - Zoom-aware intensity/radius:
      - intensity: interpolate by zoom (e.g., 10→0.6, 14→2.0).
      - radius: interpolate by zoom (e.g., 10→15px, 14→30px).
    - Cap the density range by P95 to avoid a few points dominating.
  - Small details:
    - Provide a hidden “debug” slider panel (dev-only) to tune intensity/radius live.

- **River buffers analysis (InteractiveMap.jsx 350–378)**
  - Current: visualization only.
  - Improve (analytics):
    - Compute simple exposure metrics client-side: population within 10/50/100 m buffers (Turf intersect or point-in-polygon if you use population points).
    - Display inline counters near the legend: “≤10 m: 12k people, ≤50 m: 37k, ≤100 m: 67k”.
  - Small details:
    - Consider snapping results to nearest hundred to signal uncertainty.

- **Flood impact polygons (InteractiveMap.jsx 233–251)**
  - Current: strong outline; may fight for attention with choropleth.
  - Improve:
    - Slightly reduce fill opacity and remove white outline at small scales; add a line layer at higher zoom.
    - Use hatching (fill-pattern) or thin dashed outlines to represent categories when stacked over choropleth.

- **Data QA & resilience**
  - Validate presence and types:
    - `jumlah_penduduk` (number), `Ketinggian` (enum: tinggi/sedang/rendah), `kel_id`/`kelurahan`.
  - Fallbacks:
    - If value missing/falsy, skip that feature in classification arrays; log a structured warning.
  - Defensive rendering:
    - If InaRISK raster fails (CORS/timeout), auto-hide and show a non-blocking toast.

# Charts (Recharts)

- **FloodBarChart (Charts.jsx 1–22)**
  - Improve:
    - Add `tickFormatter` to Y-axis for thousands separators.
    - Add `LabelList` on bars (top) with values (K separator).
    - Tooltips with better labels (e.g., “Flood points” localized) and color swatches matching bars.
    - If categories > 6, rotate labels or wrap to avoid overlap.
  - Small details:
    - Add a baseline/target reference line if relevant.

- **SeverityPieChart → Donut (Charts.jsx 24–53)**
  - Replace pie with donut:
    - Center label: total and the largest segment percentage.
    - Use `label` function to show “Level (share%)” not raw counts, or only on hover to avoid clutter.
  - Color palette: switch to color-blind friendly (e.g., Okabe-Ito).
  - Small details:
    - Turn off label lines at small widths; rely on legend + tooltip instead.

- **TimelineChart (Charts.jsx 55–80)**
  - Improve readability:
    - Use real duration values on the X (minutes/hours) and show event as bars with `Bar dataKey="duration"`.
    - Tooltips should display start-end times, not just “Time”.
  - Small details:
    - If categorical density is high, add a Brush or collapse groups.

- **WeatherChart (WeatherChart.jsx)**
  - Current: a combined precipitation bar and separate temperature/humidity lines with a toggle; static `ReferenceLine` on Sep 9–10.
  - Improve:
    - Dual Y-axes (left: precip mm, right: temp °C/humidity %) for combined view; keep the toggle but default to combined on desktop.
    - Use `ReferenceArea` to shade the flood window (Sep 9–10) instead of dashed lines.
    - Add Brush for horizontal zoom on small screens.
    - i18n labels for axes/legend/tooltips.
    - Add daily accumulations (sum bars) as a small multiple (mini bar under the main) or annotate the day maxima.
  - Small details:
    - Thousand separators not needed here, but ensure axis ticks are 0–40 mm domain for scale stability.

# Performance

- **Map**
  - Add `minzoom`/`maxzoom` per layer to reduce overdraw.
  - Memoize computed stops (classification bins) so paint expressions don’t change identity every render.
  - Debounce `onMove` updates when interactive to avoid excessive state churn.
  - Lazy-load map only when entering map sections (you already lazy-load sections; good).
- **Charts**
  - Use `ResponsiveContainer` (already used). For large data, consider downsampling by time bins.

# Accessibility

- **Map**
  - Keyboard focus to overlay headings on step enter; Esc closes Drawer on mobile.
  - Outline-only focus visible for legend toggles.
- **Charts**
  - Provide aria-labels for chart containers and meaningful `desc` text (SVG) for screen readers.
- **Copy/legends**
  - Add brief disclaimers (“Indicative. See Methods.”); color-only communicates should also include text/shape.

# Quick Wins (small code changes)

- **Interactive layers**
  - Map prop: add `interactiveLayerIds={['population-choropleth-fill','flood-points-circle']}`.
  - Implement hover with feature-state (requires `promoteId` on the GeoJSON Source and stable ids).
- **Choropleth bins**
  - On kelurahan load: collect `jumlah_penduduk`, compute quantiles, store bins, and build `interpolate` or `step` expression from those bins.
- **Heatmap calibration**
  - Add zoom-scaled intensity/radius and weight by `Ketinggian`.
- **Legend/toggles overlay**
  - Small shadcn Card with legend and Switches; Drawer on mobile; persist state.

# Recommended Actions

- **[High]** Switch to quantile/Jenks classification + density toggle; add legend with explicit bins.
- **[High]** Add interactiveLayerIds + hover highlight + click popover for kelurahan.
- **[High]** Dynamic camera padding per step; mobile panel collapse/expand; scrollable overlays (`max-h-[60vh]`).
- **[Med]** Calibrate heatmap; compute buffer exposure metrics; display summary counters.
- **[Med]** Chart polish: donut with center stats, axis formatters, better tooltips; WeatherChart dual-axis + ReferenceArea + Brush.
- **[High]** Data QA across sources; defensive fallbacks; log anomalies.

Summary: I reviewed InteractiveMap, Charts, and WeatherChart and provided concrete, code-informed improvements across classification, interactivity, analytics, chart readability, performance, and accessibility. I also added a task plan for these items. If you want, I can start with the high-impact pair (choropleth quantiles + legend/toggles overlay) in a focused PR next.