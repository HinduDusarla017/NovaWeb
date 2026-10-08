# NOVA 🎭
> **“Your talent deserves a stage.”**
> *Theme: Local Talent, Global Stage*

NOVA is a talent discovery and opportunity platform designed specifically for unknown, local, emerging, and college-level talent across Vijayawada, Guntur, Hyderabad, Visakhapatnam, Chennai, and Bengaluru.

Unlike traditional social media platforms where artists must fight viral algorithms, NOVA focuses on a real-world pathway:
**CREATE PROFILE → SHOWCASE TALENT → GET DISCOVERED → FIND OPPORTUNITIES**

---

## 🌟 Key Features

1. **Interactive Spatial Talent Radar Map**
   - High-fidelity interactive radar mapping talent across Andhra Pradesh, Telangana, and South Indian hubs.
   - City presets: Vijayawada, Guntur, Hyderabad, Visakhapatnam, Bengaluru, Chennai, Tirupati.
   - Real browser GPS integration (`Use My Location`) + dynamic search.
   - Category filtering (Music, Dance, Art, Photography, Writing, Film, Crafts, Speaking).
   - Marker popup preview cards with one-click full profile expansion.
   - Seamless fallback when API key is not present.

2. **24+ Rich Demo Talent Profiles**
   - Includes real profiles requested: Rahul Kumar (Guitarist, Vijayawada), Ananya Reddy (Classical Dancer, Hyderabad), Karthik Varma (Digital Artist, Guntur), Sneha Rao (Photographer, Vijayawada), Arjun Teja (Singer, Visakhapatnam), and 19 others.
   - Full portfolios (video, audio, high-res gallery), college fest reviews, verification badges, experience ratings, rates, and direct "View on Map" navigation.

3. **Curated College & Gig Opportunities**
   - At least 10+ realistic opportunities: College Fest Auditions (VRSEC Vijayawada), Acoustic Nights (Moonshine Hyderabad), Photography Workshops (Guntur), Short Film Castings, Battle of the Bands, Poetry Slams, and Craft Expos.
   - Working demo application submission flow with applicant confirmation receipts.

4. **Weekly Creative Challenges & Leaderboards**
   - 7 Weekly challenges with submission galleries and community upvoting:
     - 🎤 Weekly Singing Challenge
     - 🎸 Guitar Cover Challenge
     - 💃 30-Second Dance Challenge
     - 📸 Street Photography Challenge
     - 🎨 Digital Art Challenge
     - ✍️ One-Minute Poetry Challenge
     - 🎬 60-Second Film Challenge

5. **Profile Creation & Spatial Pinning**
   - Live registration form with avatar selection, skill tags, portfolio link, and instant placement on the local radar map with celebration preview.

6. **Saved Bookmarks & Live Notifications System**
   - Save profiles and opportunities to "My Saved" drawer.
   - Notification center tracking profile views, gig alerts, and collaboration proposals.

---

## 🚀 1. How to Install Dependencies

Make sure you have Node.js 18+ installed on your machine.

```bash
# Clone or open the project directory
npm install
```

---

## 💻 2. How to Run the Project

Start the local development server:

```bash
npm run dev
```

The application will run at `http://localhost:3000` (or the port specified by Vite).

---

## 🗺️ 3. How to Configure Google Maps API

STAGELOCAL includes an interactive vector canvas fallback radar that works out-of-the-box without requiring an API key. 

To enable official Google Maps Platform features (such as Google Maps JavaScript API with satellite view, real-time geocoding, and Places Autocomplete):

### Step 1: Obtain a Google Maps API Key
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a Google Cloud project.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > API Key**.
5. Copy your new API key.

---

## 🔑 4. Where to Add the API Key

Create or edit your `.env.local` or `.env` file in the root directory:

```env
# Google Maps Platform API Key
VITE_GOOGLE_MAPS_API_KEY="AIzaSyYourRealApiKeyHere"
```

The application automatically reads `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`. If the key is omitted or invalid, the app gracefully switches to the interactive spatial vector radar without crashing.

---

## 🔌 5. Required Google Maps APIs

In the [Google Cloud Marketplace / API Library](https://console.cloud.google.com/apis/library), enable the following APIs for your project:

1. **Maps JavaScript API** – Required for rendering maps, custom markers, and vector tiles.
2. **Places API (New)** – Required for address lookup, autocomplete, and venue recommendations.
3. **Geocoding API** – Required for converting city/neighborhood names into geographic coordinates.

### Recommended API Key Restrictions:
- **Application restrictions**: Set to **HTTP referrers (web sites)** and add your production domain and local dev URL (e.g. `http://localhost:*/*`).
- **API restrictions**: Restrict key usage to only the 3 APIs listed above.

---

## 🏗️ 6. How to Build the Project for Production

To build a minified, production-ready bundle:

```bash
npm run build
```

The compiled files will be output to the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🎯 Competition / Judge Demo Flow

To demonstrate the full user journey:
1. **Open Home**: View hero tagline, floating profiles (Rahul Kumar, Ananya Reddy, Karthik Varma), categories, and live statistics.
2. **Click Explore Talent**: Navigate to Discover page.
3. **Search "Guitar"**: Instantly filters to guitarists; Rahul Kumar appears as top verified talent.
4. **Open Rahul Kumar Profile**: Click **View Profile** to inspect his acoustic medley video, reviews from Andhra Loyola College, and skills.
5. **Click "View on Map"**: Smoothly switches to the **Map** page, centers onto **Vijayawada (Benz Circle)**, and pulses Rahul's marker on the radar.
6. **Go to Opportunities**: Open **“College Fest – Looking for a Dance Team”** or **“Acoustic Night”**, click **Apply**, and test the demo submission form.
7. **Go to Challenges**: View the **Weekly Singing Challenge** or **Guitar Cover Challenge**, review community submissions, vote, or submit a mock entry.

---

© 2026 STAGELOCAL. Built with React, TypeScript, and Tailwind CSS.
