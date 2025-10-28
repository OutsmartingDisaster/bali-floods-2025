# 📜 Scrollytelling Project Creation Guide

## Complete Prompt Template for AI-Assisted Development

This guide provides a comprehensive template for creating data journalism scrollytelling websites similar to the Bali Floods 2025 project.

---

## 🎯 Project Initialization Prompt

```
Create a data journalism scrollytelling website about [TOPIC] with the following specifications:

TECHNICAL STACK:
- React + Vite
- TailwindCSS for styling
- Leaflet.js for interactive maps
- Recharts for data visualization
- react-scrollama for scroll interactions
- react-i18next for bilingual support (English and [LANGUAGE])

PROJECT STRUCTURE:
- Hero section with full-screen impact image
- Introduction with context and community voices
- Research methodology section
- Main scrollytelling narrative with sticky maps
- Data analysis section with interactive visualizations
- Critical commentary/irony section
- Conclusion with reflection
- Credits section

DESIGN SYSTEM:
- Dark, immersive documentary style
- Black (#000000) primary background
- White (#ffffff) primary text
- Blue (#3b82f6) primary accent
- Severity colors: Yellow (low), Orange (medium), Red (high)
- Inter font family
- Generous vertical spacing (20rem between sections)
- Max width 4xl (896px) for text content
```

---

## 📋 Content Structure Template

### 1. HERO SECTION

```json
{
  "hero": {
    "title": "[Provocative question or statement - 5-10 words]",
    "subtitle": "[Location/Date: Brief description of scale - 10-20 words]",
    "background_image": "[Path to high-impact image]",
    "scroll_indicator": "Scroll to explore the story"
  }
}
```

**Example:**
- Title: "Are We Ready to Face Floods?"
- Subtitle: "Bali 9–11 September 2025: The Worst Hydrometeorological Disaster in Balinese History"

---

### 2. INTRODUCTION SECTION

```json
{
  "intro": {
    "title": "[Main title - describes the disaster/event]",
    "year": "[Year - contextual marker]",
    "content1": "[What happened - describe the event in 2-3 sentences]",
    "content2": "[The paradox - explain the contradiction or irony in 2-3 sentences]",
    "content3": "[The promise - what this narrative will uncover in 1-2 sentences]",
    "voices": [
      "[Quote 1 from affected person - raw, emotional]",
      "[Quote 2 from affected person - descriptive]",
      "[Quote 3 from affected person - fear/concern]",
      "[Quote 4 from affected person - impact]"
    ],
    "voicesCaption": "[Context for these voices - when/where they were said]",
    "panicNote": "[Key observation about public reaction]"
  }
}
```

---

### 3. RESEARCH METHODOLOGY

```json
{
  "methodology": {
    "title": "Research Methodology: [Approach Name]",
    "paragraph1": "[Overall approach - what method was used]",
    "paragraph2": "[Data collection - sources, timeframe, volume]",
    "paragraph3": "[Analysis techniques - how data was processed]",
    "paragraph4": "[Key findings overview - what was discovered]",
    "paragraph5": "[Chronological reconstruction - timeline of events]",
    "paragraph6": "[Impact assessment - quantified effects]",
    "paragraph7": "[Validation - how findings were verified]"
  }
}
```

---

### 4. MAIN SCROLLYTELLING NARRATIVE

```json
{
  "scrollytelling_locations": [
    {
      "location_id": "location_1",
      "title": "[Location Name - Specific Place]",
      "description": "[What happened here - 2-3 sentences]",
      "media": {
        "type": "youtube|image|video",
        "url": "[Media URL]",
        "alt": "[Alt text]"
      },
      "impact": {
        "severity": "low|medium|high",
        "title": "Impact:|Critical Impact:|Chronic Issue:",
        "metrics": [
          "Height: [measurement]",
          "Level: [severity description]",
          "[Specific impact 1]",
          "[Specific impact 2]",
          "[Specific impact 3]"
        ]
      },
      "color_scheme": {
        "low": "yellow-50, yellow-500, yellow-800",
        "medium": "orange-50, orange-500, orange-800",
        "high": "red-50, red-600, red-800"
      }
    }
  ]
}
```

**Pattern:**
1. Location reveal with media
2. Blank step (spacing)
3. Next location reveal
4. Blank step
5. Repeat...

---

### 5. DATA ANALYSIS SECTION

```json
{
  "data_analysis": {
    "overview": {
      "title": "[Analysis Title]",
      "description": "[Big picture findings]",
      "layer_description": "[How data was mapped]"
    },
    "spatial_analysis": {
      "title": "[Geographic Pattern Title]",
      "description": "[Spatial findings]",
      "map_layers": [
        "Base map",
        "Data points",
        "Radius/buffer zones",
        "Intensity/depth",
        "Contextual layers (rivers, roads, etc.)"
      ]
    },
    "key_findings": [
      "[Finding 1]",
      "[Finding 2]",
      "[Finding 3]"
    ],
    "statistics": {
      "stat1": { "value": "[Number]", "label": "[Description]" },
      "stat2": { "value": "[Number]", "label": "[Description]" },
      "stat3": { "value": "[Number]", "label": "[Description]" }
    }
  }
}
```

---

### 6. DATA VISUALIZATION SECTION

```json
{
  "data_visualization": {
    "weather_data": {
      "title": "[Data Title with Date Range]",
      "paragraph1": "[Context - when it started]",
      "paragraph2": "[Peak intensity - maximum values]",
      "chart_types": ["bar_chart", "line_chart"],
      "metrics": {
        "rainfall": { "peak": "[value]", "label": "[description]" },
        "temperature": { "min": "[value]", "label": "[description]" },
        "humidity": { "max": "[value]", "label": "[description]" }
      }
    },
    "critical_commentary": {
      "title": "💡 [Critical Issue Title]",
      "fact": "[Main fact about the issue]",
      "legal_basis": {
        "title": "📋 [Legal Framework Title]",
        "laws": ["[Law 1]", "[Law 2]", "[Law 3]"]
      },
      "public_data": {
        "title": "🔓 [What's Public]",
        "items": ["[Item 1]", "[Item 2]", "[Item 3]"]
      },
      "restricted_data": {
        "title": "🚫 [Why Restricted]",
        "reasons": ["[Reason 1]", "[Reason 2]", "[Reason 3]"]
      },
      "conclusion": "[Critical analysis paragraph]",
      "powerful_quote": "[Long-form critical quote about the issue]",
      "call_to_action": "[Short punchy message]"
    }
  }
}
```

---

### 7. IRONY/CRITIQUE SECTION

```json
{
  "irony": {
    "title": "[The Irony Title]",
    "subtitle": "[Subtitle that hints at contradiction]",
    "intro1": "[Set up the paradox - paragraph 1]",
    "intro2": "[Explain the stakes - paragraph 2]",
    "evidence_section_1": {
      "title": "[What Was Promised/Said]",
      "intro": "[Context]",
      "items": [
        {
          "title": "[Event/Forum 1]",
          "description": "[What happened/was promised]"
        },
        {
          "title": "[Event/Forum 2]",
          "description": "[What happened/was promised]"
        }
      ],
      "conclusion": "[Summary of promises]"
    },
    "reality_section": {
      "title": "[What Actually Happened]",
      "reality1": "[Contrast with promises - paragraph 1]",
      "reality2": "[Describe actual events - paragraph 2]",
      "reality3": "[Emphasize severity - paragraph 3]",
      "statistics": {
        "stat1": { "value": "[Number]", "label": "[Impact]" },
        "stat2": { "value": "[Number]", "label": "[Scale]" },
        "stat3": { "value": "[Number]", "label": "[Affected]" }
      }
    },
    "gap_analysis": {
      "title": "[The Gap Title]",
      "gap1": "[Question the contradiction]",
      "gap2": "[Explain the failure]",
      "gap3": "[Quantify the cost]",
      "conclusion": "[Final ironic statement]"
    }
  }
}
```

---

### 8. CONCLUSION SECTION

```json
{
  "conclusion": {
    "title": "[Call to Action Title]",
    "content1": "[What we learned - 2-3 sentences]",
    "content2": "[What needs to change - 2-3 sentences]",
    "reflection": "[Philosophical closing - 2-3 sentences, italic style]"
  }
}
```

---

### 9. CREDITS SECTION

```json
{
  "credits": {
    "title": "Credits",
    "roles": [
      { "role": "Data Collection:", "name": "[Name/Organization]" },
      { "role": "Geospatial Analysis:", "name": "[Name]" },
      { "role": "Data Visualization:", "name": "[Name]" },
      { "role": "Storyline:", "name": "[Name]" },
      { "role": "Editor:", "name": "[Name]" },
      { "role": "Web Developer:", "name": "[Name]" }
    ],
    "copyright": "© [Year] [Organization]. All rights reserved."
  }
}
```

---

## 🎨 Design Specifications

### Color Coding System

```css
/* Severity Levels */
.severity-low {
  background: #fef3c7; /* yellow-50 */
  border-left: 4px solid #f59e0b; /* yellow-500 */
  color: #92400e; /* yellow-800 */
}

.severity-medium {
  background: #ffedd5; /* orange-50 */
  border-left: 4px solid #f97316; /* orange-500 */
  color: #9a3412; /* orange-800 */
}

.severity-high {
  background: #fef2f2; /* red-50 */
  border-left: 4px solid #dc2626; /* red-600 */
  color: #991b1b; /* red-800 */
}
```

### Typography Scale

```css
/* Hero */
.hero-title { font-size: 3.75rem; font-weight: 700; }
.hero-subtitle { font-size: 1.25rem; font-weight: 400; }

/* Section Titles */
.section-title { font-size: 2.25rem; font-weight: 700; }
.subsection-title { font-size: 1.875rem; font-weight: 600; }

/* Body Text */
.body-large { font-size: 1.25rem; line-height: 1.75; }
.body-regular { font-size: 1rem; line-height: 1.5; }
.body-small { font-size: 0.875rem; line-height: 1.5; }
```

### Spacing System

```css
/* Vertical Rhythm */
.section-gap { margin-bottom: 20rem; }
.subsection-gap { margin-bottom: 12rem; }
.content-gap { margin-bottom: 6rem; }
.paragraph-gap { margin-bottom: 2rem; }
```

---

## 🗺️ Map Configuration

### Leaflet Map Setup

```javascript
{
  "map_config": {
    "center": [latitude, longitude],
    "zoom": 12,
    "base_layer": "OpenStreetMap",
    "layers": [
      {
        "name": "Data Points",
        "type": "markers",
        "data": "geojson",
        "styling": {
          "color_by": "severity",
          "icon_size": [25, 41],
          "popup": true
        }
      },
      {
        "name": "Impact Radius",
        "type": "circles",
        "radius": 1000,
        "styling": {
          "fillColor": "#3b82f6",
          "fillOpacity": 0.2,
          "color": "#3b82f6",
          "weight": 2
        }
      },
      {
        "name": "Heatmap",
        "type": "heatmap",
        "intensity": "based on severity",
        "gradient": {
          "0.0": "yellow",
          "0.5": "orange",
          "1.0": "red"
        }
      }
    ]
  }
}
```

---

## 📊 Chart Configuration

### Recharts Setup

```javascript
{
  "chart_config": {
    "bar_chart": {
      "data_key": "value",
      "x_axis": "date",
      "y_axis": "measurement",
      "bar_color": "#3b82f6",
      "bar_radius": [2, 2, 0, 0]
    },
    "line_chart": {
      "lines": [
        { "dataKey": "temp", "stroke": "#f59e0b", "strokeWidth": 3 },
        { "dataKey": "humidity", "stroke": "#10b981", "strokeWidth": 3 }
      ]
    },
    "responsive_container": {
      "width": "100%",
      "height": 400
    }
  }
}
```

---

## 🌐 Internationalization Structure

```javascript
{
  "translations": {
    "en": {
      "hero": { /* English content */ },
      "intro": { /* English content */ },
      "methodology": { /* English content */ }
    },
    "id": {
      "hero": { /* Indonesian content */ },
      "intro": { /* Indonesian content */ },
      "methodology": { /* Indonesian content */ }
    }
  }
}
```

**Best Practices:**
- Use `returnObjects: true` for arrays
- Keep key structure identical across languages
- Break long text into numbered paragraphs
- Store lists as arrays for easy mapping

---

## 🎬 Scrollytelling Implementation

### Scroll Step Pattern

```jsx
{/* Location Reveal */}
<ScrollStep className="min-h-screen">
  <div className="max-w-4xl mx-auto px-6">
    <h3 className="text-3xl font-bold text-white mb-4">
      {t('location.title')}
    </h3>
    <p className="text-white/90 mb-6">
      {t('location.description')}
    </p>
    
    {/* Media Embed */}
    <div className="mb-6">
      <iframe src="..." className="w-full h-96 rounded-lg" />
    </div>
    
    {/* Impact Box */}
    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
      <h4 className="font-semibold text-red-900 mb-2">
        {t('location.impactTitle')}
      </h4>
      <ul className="text-red-800 space-y-1 text-sm">
        {t('location.impacts', { returnObjects: true }).map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  </div>
</ScrollStep>

{/* Blank Step for Pacing */}
<ScrollStep></ScrollStep>
```

---

## 📝 Complete Project Prompt Example

```
Create a scrollytelling website about [WILDFIRE CRISIS IN CALIFORNIA 2024]

STORY STRUCTURE:

HERO:
- Title: "When Paradise Burns: Are We Prepared?"
- Subtitle: "California 2024: Record-Breaking Wildfires and the Climate Crisis"
- Background: Dramatic image of wildfire at night

INTRO:
- Paragraph 1: Describe the 2024 wildfire season - record temperatures, acres burned
- Paragraph 2: The paradox - California invests billions in fire prevention yet fires worsen
- Paragraph 3: This investigation uncovers why prevention fails
- Voices: 4 quotes from evacuees and firefighters

METHODOLOGY:
- Crowdsourced data from social media
- Satellite imagery analysis
- Fire department records
- Climate data from NOAA

MAIN NARRATIVE (Scrollytelling):
Location 1: Paradise Town
- Description: Community destroyed in 2018, rebuilt, threatened again
- Media: Drone footage of evacuation
- Impact: High severity - 500 homes threatened, 2000 evacuated

Location 2: Wine Country
- Description: Vineyards and tourism industry at risk
- Media: Photos of smoke-covered valleys
- Impact: Medium severity - Economic losses, air quality crisis

[Continue for 5-7 key locations]

DATA ANALYSIS:
- Map showing fire progression over time
- Chart: Temperature increases vs fire frequency
- Statistics: Acres burned, homes lost, economic impact

CRITIQUE SECTION:
- Title: "The Prevention Paradox"
- Evidence 1: List of prevention programs and funding
- Reality: Despite investment, fires worsen
- Gap Analysis: Why prevention fails (climate change, development, forest management)

CONCLUSION:
- What we learned about climate adaptation
- Call for systemic change
- Reflection on living with fire

DESIGN:
- Dark theme with orange/red accents for fire
- Severity colors: Yellow (watch), Orange (warning), Red (evacuation)
- Smoky gradients and atmospheric effects
```

---

## 🚀 Development Workflow

1. **Setup** (30 min)
   ```bash
   npm create vite@latest project-name -- --template react
   npm install leaflet react-leaflet recharts react-scrollama react-i18next
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Structure** (1 hour)
   - Create folder structure
   - Set up routing (if needed)
   - Configure Tailwind
   - Set up i18next

3. **Content** (2-3 days)
   - Write all text content
   - Gather and optimize media
   - Prepare data files
   - Translate content

4. **Development** (3-5 days)
   - Build Hero section
   - Build Intro section
   - Build Methodology section
   - Build Scrollytelling sections (main work)
   - Build Data Analysis section
   - Build Critique section
   - Build Conclusion & Credits

5. **Polish** (1-2 days)
   - Adjust spacing and pacing
   - Test responsiveness
   - Optimize performance
   - User testing
   - Final edits

---

## ✅ Quality Checklist

### Content
- [ ] Story has clear beginning, middle, end
- [ ] Paradox/irony is compelling
- [ ] Data is verified and sourced
- [ ] Translations are accurate
- [ ] Media is optimized and attributed

### Design
- [ ] Consistent color scheme
- [ ] Readable typography
- [ ] Generous whitespace
- [ ] Smooth transitions
- [ ] Responsive on all devices

### Technical
- [ ] Fast load times (<3s)
- [ ] Smooth scrolling
- [ ] Maps load correctly
- [ ] Charts are interactive
- [ ] Language switching works
- [ ] All links work
- [ ] No console errors

### Accessibility
- [ ] Alt text on all images
- [ ] Sufficient color contrast
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

---

## 📚 Resources

- **Scrollama Documentation**: https://github.com/russellsamora/scrollama
- **Leaflet Documentation**: https://leafletjs.com/
- **Recharts Documentation**: https://recharts.org/
- **TailwindCSS Documentation**: https://tailwindcss.com/
- **i18next Documentation**: https://www.i18next.com/

---

**Created by:** Bali Floods 2025 Project Team  
**License:** MIT  
**Last Updated:** 2025
