# How to Edit and Customize This Scrollytelling Project

This guide provides instructions on how to modify the content, structure, and appearance of the Banjir Denpasar scrollytelling website.

## Project Structure Overview

- `index.html`: The main HTML file. Contains the title and meta description.
- `src/App.jsx`: The main React component where the entire scrollytelling narrative is structured.
- `src/components/`: Contains reusable React components for the map, charts, and scroll steps.
- `public/`: Static assets like images and videos are stored here.
- `data/`: GeoJSON files and other data sources for the visualizations.

## Recent Updates (2025-10-28)

### ✅ Enhanced Collage System
- **Image Size**: ~350px height (desktop), up to 1000px width
- **Borders**: Thick white borders (4px) for punk zine aesthetic
- **Animations**: Throw-in animation with randomized rotation and 0.6–1.0s durations
- **Images**: 70+ ImageKit-hosted screenshots (mobile renders a reduced subset)

### ✅ Video Integration
- **Platforms**: ImageKit and YouTube embeds supported
- **Format**: Portrait orientation (e.g., 256×384px) inside content cards
- **Features**: Fullscreen support (via embed providers)

### ✅ Structure Reorganization
- **Sticky Map**: Integrated inside `DenpasarSection.jsx` using `InteractiveMap`
- **Optional**: `MapSection.jsx` remains as an example standalone map section
- **Flow**: Collage → Research → Denpasar → Badung → Flood Impact → Data → Recommendations → Conclusion → Credits
- **Spacing**: Spacer kept below Collage to prevent overlap

---

## 1. Changing the Main Title and Description

The main title and description of the website can be found in the `<head>` section of `index.html`.

1.  Open `index.html`.
2.  Locate the `<title>` tag and change its content to your desired title.
3.  Find the `<meta name="description">` tag and update the `content` attribute.

```html
<head>
  <title>Your New Title Here</title>
  <meta name="description" content="Your new description here.">
</head>
```

---

## 2. Editing the Hero Section

The hero section is the first thing users see. You can change the background image and text in `src/App.jsx`.

1.  Open `src/App.jsx`.
2.  To change the background image, modify the `style` attribute of the `<section>` element. The path should point to an image in the `public/` directory.

    ```jsx
    <section
      className="..."
      style={{ backgroundImage: "url('/img/new-hero-image.jpg')" }}
    >
    ```

3.  To edit the text, find the `<h1>` and `<p>` tags within the hero section and update their content.

    ```jsx
    <h1 className="...">
      New Main Title
      <span className="...">New Subtitle</span>
    </h1>
    <p className="...">
      New introductory paragraph.
    </p>
    ```

---

## 3. Modifying the Introduction (Revealing Collage Section)

The five-step introduction uses a special pane-reveal animation with a chaotic punk zine-style collage. You can customize the background images, reveal effect, and text for each step.

### Changing the Collage Images

The collage uses 70+ ImageKit-hosted screenshots from Instagram crowdsourcing (mobile renders a reduced subset). To modify:

1.  Open `src/components/sections/CollageSection.jsx`.
2.  Find the `collageImagePaths` array containing ImageKit URLs.
3.  Add/remove image URLs as needed (ensure they're valid ImageKit links).
4.  Update the comment indicating the total count.

    ```javascript
    const collageImagePaths = [
      `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20132258.png`,
      // ... 68 more validated URLs
    ]; // 70+ ImageKit images for chaotic collage
    ```

### Customizing the Reveal Animation

1.  Open `src/components/scrollytelling/RevealingCollage.jsx`.
2.  Key behavior (already implemented):
   - **Size**: `height: '350px'` with max width up to 1000px on desktop
   - **Animation**: Per-image throw-in with randomized delays and 0.6–1.0s durations
   - **Rotation**: Random ±22.5°
   - **Borders**: `border-4 border-white`

3.  To adjust chaos level:
   - Adjust the `throwDuration` range in `RevealingCollage.jsx` to slow/speed reveals
   - Modify rotation range in the transform calculation
   - Change border thickness or color

### Editing the Text for Each Step

The narrative is built from five `<ScrollStep>` components in `src/components/sections/CollageSection.jsx`.

1.  Open `src/components/sections/CollageSection.jsx`.
2.  Scroll to the `CollageSection` and find the five `<ScrollStep>` components inside.
3.  Modify the text inside the `<h2>` and `<p>` tags.

    ```jsx
    <ScrollStep>
      <div className="prose-wapo">
        <h2>New Step Title</h2>
        <p>This is the updated paragraph for this collage step.</p>
      </div>
    </ScrollStep>
    ```

---

## 4. Editing the Research Methodology Section

This new section explains the Instagram crowdsourcing methodology used to collect flood data.

1.  Open `src/App.jsx`.
2.  Find the "Research Methodology Section" and update the title or paragraphs as needed.

---

## 5. Customizing the Denpasar Section Video

The Denpasar section includes a portrait-oriented ImageKit video.

1.  Open `src/components/sections/DenpasarSection.jsx`.
2.  Find the `<iframe>` elements inside each step card.
3.  To change a video: Update the `src` URL (supports ImageKit and YouTube embeds).
4.  To adjust size: Modify `w-64 h-96` classes (e.g., 256×384px portrait).
5.  To change positioning: Adjust the surrounding layout classes.

---

## 6. Modifying Other Article Sections

To add or edit sections outside of the introduction, find the relevant component in `src/App.jsx` or section files.

1.  **Add the Content**: In `src/App.jsx`, add a new section component where you want it to appear.

    ```jsx
    {/* New Section */}
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">New Section Title</h2>
        <p>New section content goes here.</p>
      </div>
    </section>
    ```

2.  **Edit Existing Sections**: Modify content in respective section components:
   - `BadungSection.jsx` for rural impact details
   - `DenpasarSection.jsx` contains the integrated sticky map
   - `MapSection.jsx` is optional if you need a standalone map section

---

## 7. Customizing the Interactive Map

The sticky map is integrated in `DenpasarSection.jsx` and rendered by `InteractiveMap`.

- **Where to edit**: `src/components/sections/DenpasarSection.jsx`
- **Per-step states**: Modify the `denpasarMapStates` object (center, zoom, pitch, bearing, `layers`, and `layerStyles`).
- **Style control**: Pass visual styles via `layerStyles` (colors, widths, opacities), keeping `InteractiveMap` style-agnostic.

Example snippet (inside `denpasarMapStates`):

```javascript
1: {
  center: [115.21242, -8.65669],
  zoom: 18.2,
  pitch: 62.5,
  bearing: -24,
  layers: {
    floodPoints: true,
    floodImpact: true,
    rivers: true,
    adminBoundaries: false
  },
  layerStyles: {
    floodPoints: { color: '#dc2626', size: 8, opacity: 0.8 },
    floodImpact: { color: '#f59e0b', opacity: 0.7 },
    rivers: { color: '#2563eb', width: 12, opacity: 0.8 }
  },
  interactive: false,
  mapStyle: 'mapbox://styles/mapbox/satellite-streets-v12'
}
```

---

## 8. Updating Data Visualizations

The charts and other data visualizations are powered by data imported from `src/data/floodData.js`.

1.  Open `src/data/floodData.js`.
2.  Modify the `floodStatistics` or `severityDistribution` arrays with your new data.

    ```javascript
    // Example: src/data/floodData.js
    export const floodStatistics = [
      { name: 'New Category', value: 500 },
      // ... other data
    ];
    ```

The charts in the application will automatically update to reflect these changes.

Here are additional features and sections that can be added to enhance the guide on "How to Edit and Customize This Scrollytelling Project":

---

## 7. Customizing the Theme and Styling

You can change the overall look and feel of the website, including colors, fonts, and spacing, by modifying the Tailwind CSS configuration and the main CSS file.

1.  **Modify Tailwind Configuration**:
    *   Open `tailwind.config.js`.
    *   You can extend the `theme` object to add custom colors, fonts, or breakpoints. For example, to add a new primary color:

    ```javascript
    module.exports = {
      theme: {
        extend: {
          colors: {
            'primary': '#FF6347', // Add your custom color
          },
          fontFamily: {
            'sans': ['"Your Custom Font"', 'sans-serif'], // Add a custom font
          },
        },
      },
      // ...
    }
    ```

2.  **Edit Global CSS**:
    *   Open `src/index.css`.
    *   Here, you can add custom CSS rules or modify the base styles for different elements. This is a good place to define styles for custom classes you might add.

    ```css
    /* Example: src/index.css */
    body {
      @apply bg-gray-100 text-gray-800; /* Change default background and text color */
    }

    .custom-highlight {
      background-color: theme('colors.primary');
      color: white;
      padding: 2px 4px;
      border-radius: 4px;
    }
    ```

---

## 8. Adding Different Media Types (Images and Videos)

Enhance your narrative by embedding images, videos, or other media directly within a scroll step.

1.  **Add Your Media**: Place your image or video files into the `public/` directory (e.g., `public/img/my-new-image.png`).

2.  **Embed in a Scroll Step**:
    *   Open `src/App.jsx` and navigate to the desired `<ScrollStep>`.
    *   To add an image, use the `<img>` tag.

    ```jsx
    <ScrollStep>
      <div className="prose-wapo">
        <h2>A Picture's Worth a Thousand Words</h2>
        <p>This section now includes an image to better illustrate the point.</p>
        <img src="/img/my-new-image.png" alt="A descriptive caption for the image" className="w-full rounded-lg" />
        <p>The text can continue after the image.</p>
      </div>
    </ScrollStep>
    ```

    *   For a video, you can use the `<video>` tag. To save on loading time, it's often best to use a service like YouTube or Vimeo and embed it using an `<iframe>`.

    ```jsx
    <ScrollStep>
      <div className="prose-wapo">
        <h2>Video Content</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/your_video_id"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </ScrollStep>
    ```

---

## 9. Managing Data Sources and Layers

For more complex stories, you might need to add new data sources for your map visualizations.

1.  **Add New Data Files**:
    *   Place your new GeoJSON or other data files (e.g., `new_data.geojson`) into the `data/` directory.

2.  **Import and Integrate the Data**:
    *   Open `src/components/sections/MapSection.jsx` (the map is now in its own component).
    *   Import your new data source at the top of the file.

    ```javascript
    import newData from '../../data/new_data.geojson';
    ```

    *   In the map component, add a new layer that uses this data. You'll likely need to add a new `Source` and `Layer` component from your mapping library (e.g., React Map GL or Mapbox).

3.  **Control Visibility from `MapSection.jsx`**:
    *   To control the visibility of this new layer, modify the layers object in the MapSection component.

    ```javascript
    const [mapState, setMapState] = useState({
      center: [115.2126, -8.6705],
      zoom: 12,
      layers: {
        floodPoints: true,
        adminBoundaries: true,
        newLayerName: true // Show the new layer
      }
    })
    ```

---

## 10. Adjusting Scroll Behavior

You can fine-tune the behavior of the scrollytelling interaction, such as the trigger position for when a step becomes active. This is typically handled by the scrollytelling library being used (e.g., `react-scrollama`).

1.  **Locate the hook usage**:
    *   The project uses a custom `useScrollama` hook. See `src/hooks/useScrollama.js` and its usage in `CollageSection.jsx` and `DenpasarSection.jsx`.

2.  **Adjust options**:
    *   Pass options like `offset` when invoking the hook. An `offset` of `0.5` centers the trigger.

    ```jsx
    const { currentStep } = useScrollama({
      onStepEnter: (response) => {
        // handle step enter
      },
      offset: 0.5,
      debug: false
    });
    ```
    
    *   Each step is a `.scroll-step` (via `ScrollStep`), which the hook targets.

---

## 11. Performance Optimization Tips

The collage system with 70+ images can be performance-intensive. Here are optimization strategies:

1.  **Image Optimization**:
    - Use ImageKit's automatic optimization features
    - Consider lazy loading for collage images not yet revealed
    - Compress images further if needed

2.  **Animation Performance**:
    - Default throwDuration is ~0.6–1.0s; adjust if needed
    - Consider reducing image count if performance issues arise
    - Test on various devices and browsers

3.  **Code Splitting**:
    - Large sections like MapSection are already separated into their own components
    - Consider lazy loading heavy components if needed

---

## 12. Troubleshooting Common Issues

### Collage Images Not Loading
- Check ImageKit URLs are valid and accessible
- Ensure images are in the correct account/folder
- Verify network connectivity to ImageKit CDN

### Map Not Displaying
- Check Mapbox/MapLibre API key is valid
- Verify GeoJSON data files are properly formatted
- Check browser console for CORS or loading errors

### Video Not Playing
- Verify ImageKit video embed URL is correct
- Check iframe permissions and attributes
- Ensure video format is supported

### Scrollama Not Triggering
- Check offset values in useScrollama hook
- Verify scroll container has proper height
- Test on different screen sizes

---

## 13. Deployment Checklist

Before deploying your customized website:

- [ ] Test all interactive elements (map, collage, videos)
- [ ] Verify all images load correctly
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Validate all external links and embeds
- [ ] Test performance with Lighthouse or similar tools
- [ ] Ensure all data files are accessible
- [ ] Verify map layers load properly
- [ ] Test video playback across different browsers

The website is ready for deployment to any static hosting service including GitHub Pages, Netlify, Vercel, or traditional web servers.