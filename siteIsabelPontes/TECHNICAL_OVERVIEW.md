# Technical Overview - Isabel Pontes Portfolio

This document provides a technical summary of the Isabel Pontes Portfolio project, explaining its architecture, components, and core concepts. It is intended for developers to understand the project's state and how it is built.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with HSL variables for theming.
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (primitives) and [shadcn/ui](https://ui.shadcn.com/) (reusable components).
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/).
- **Animations**: `tw-animate-css` and Tailwind transitions.
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/).

---

## 📂 Project Structure

```text
siteIsabelPontes/
├── src/
│   ├── assets/             # Static assets (images, logos)
│   ├── components/         # React components
│   │   └── ui/             # shadcn/ui base components
│   ├── data/               # Static data (portfolio, blog, persons)
│   ├── hooks/              # Custom React hooks (e.g., useContrastText)
│   ├── lib/                # Utility libraries (contrast detection, shadcn utils)
│   ├── pages/              # Main application pages/routes
│   ├── types/              # TypeScript interfaces and types
│   ├── utils/              # Helper functions and manifests
│   ├── App.tsx             # Main App component with routing
│   ├── globals.css         # Global styles and Tailwind configuration
│   └── main.tsx            # Entry point
├── public/                 # Public static files
├── components.json         # shadcn/ui configuration
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite configuration
```

---

## 🏗 Key Technical Concepts

### 1. Adaptive Text Color System
The project features a sophisticated system to ensure text readability across varying backgrounds (light, dark, or images).
- **Logic**: Uses WCAG luminance calculations (`src/lib/contrast.ts`) to determine if a background is "dark" or "light".
- **Hook**: `useContrastText` detects the background color of an element's container and returns the appropriate text color class (`text-white` or `text-black`).
- **Components**: `ContrastText`, `ContrastHeading`, and `ContrastSection` wrap standard elements to apply these colors automatically.
- **Utilities**: CSS classes like `text-on-light` and `text-on-dark` provide manual overrides with built-in text shadows.

### 2. Data-Driven Architecture
Most of the content is managed through structured TypeScript files in `src/data/`, making it easy to add new projects without touching UI logic.
- **Portfolio & Photoshoots**: Projects are defined in `portfolioData.ts` and their detailed photoshoots in `photoshootsInputs.ts`.
-   **Manifest System**: Uses an asynchronous `public/manifest.json` fetched via the `usePhotoshoots` hook to dynamically resolve image paths.
- **External Storage**: Images are hosted on Cloudflare R2 (or similar), with the base URL configured via `VITE_R2_PUBLIC_BASE` in the `.env` file.

### 3. Advanced Theming (Tailwind 4)
The project utilizes Tailwind CSS 4's new `@theme` configuration and CSS variables.
- **HSL Variables**: Defined in `src/index.css` under `:root` and `@media (prefers-color-scheme: dark)`.
- **Custom Colors**:
  - `primary`: Brown/Dark tone.
  - `accent`: Amazon Green.
  - `gold`: Gold/Detail color.
- **Dark Mode**: Fully supported via system preference (`prefers-color-scheme`).

### 4. Dynamic Navigation
The `NavBar` component (`src/components/NavBar.tsx`) is highly interactive:
- **Scroll Behavior**: Hides on scroll down and reappears on scroll up.
- **Contextual Styling**: Changes text and logo color based on the current route and system theme.
- **Responsive**: Uses a `HamburgerMenu` for mobile devices.

---

## 📊 Data Architecture & Performance

### Data Flow
The project uses a multi-layered data structure to manage projects and images:

1.  **Raw Metadata (`src/data/photoshootsInputs.ts`)**: Contains manually entered metadata for each photoshoot (title, date, models, concept).
2.  **Storage Manifest (`public/manifest.json`)**: A static JSON list of all image files available in the Cloudflare R2 storage. Moving this to a JSON file prevents bundle bloat.
3.  **Data Bridge (`src/hooks/usePhotoshoots.ts`)**: A custom hook that fetches the manifest asynchronously and combines it with the raw metadata to resolve absolute image URLs.
4.  **Relational Linkage**:
    *   `PortfolioProject` links to multiple `Photoshoot` IDs.
    *   `Photoshoot` links to `Person` IDs (models/partners).
    *   The UI performs "joins" at runtime using these IDs.

### Performance Analysis

#### Current Strengths
-   **Image Format**: Extensive use of `.webp` ensures high quality with low file size.
-   **Lazy Loading**: Images in cards utilize native `loading="lazy"` and `decoding="async"`.
-   **Memoization**: Key data transformations in `Portfolio.tsx` are wrapped in `useMemo` to prevent redundant calculations on re-renders.

#### Areas for Optimization
-   **Bundle Size**:
    *   *Status*: **Optimized**. The image manifest has been moved from a static `.ts` file to an asynchronous `manifest.json`. This ensures that as the portfolio grows, the initial JavaScript bundle remains small.
-   **Runtime Join Complexity**:
    *   *Status*: **Optimized**. Partners and models are resolved using `personsById` (a pre-indexed Record), reducing lookup time from O(N) to O(1).
-   **Data Loading Flow**:
    *   *Status*: **Improved**. The `Portfolio` page now uses the `usePhotoshoots` hook to load project data on-demand via `fetch()`, with proper loading and error state handling.

---

## 📄 Routes & Pages

- `/`: **HomeEditorial** - Main landing page with featured editorial work.
- `/portfolio`: **Portfolio** - Grid of all projects categorized.
- `/blog`: **Blog** - List of blog posts.
- `/blog/:id`: **BlogPost** - Detailed view of a single post.
- `/parceiros`: **Partners** - Showcase of models and collaborators.
- `/sobre`: **Sobre Mim** - Biography and personal information.
- `/contato`: **ContactSection** - Contact form and information.

---

## 🔧 Maintenance & Growth

As the project grows, consider the following:
- **Component Reusability**: Continue using the `ui/` folder for atomic components.
- **Data Validation**: The current data-driven approach is robust, but ensure types in `src/types/` are strictly followed.
- **Image Optimization**: Since images are loaded from external R2 storage, ensure they are optimized/compressed before upload.
-   **Manifest Updates**: Keep `public/manifest.json` in sync with the actual storage structure.
