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
- **Manifest System**: `src/data/photoshootsData.ts` uses `src/utils/manifest2.ts` to dynamically resolve image paths.
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
2.  **Storage Manifest (`src/utils/manifest2.ts`)**: A generated list of all image files available in the Cloudflare R2 storage, organized by project and session.
3.  **Data Bridge (`src/data/photoshootsData.ts`)**: Dynamically combines metadata with the manifest to generate absolute image URLs using the `VITE_R2_PUBLIC_BASE` environment variable.
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
-   **Bundle Size**: The `manifest2.ts` file (currently ~21KB) is imported statically. As the number of photos grows, this will increase the initial JavaScript payload.
    *   *Recommendation*: Move the manifest to a JSON file fetched only when needed, or implement a backend/edge-function API.
-   **Runtime Join Complexity**: The `Portfolio` page currently performs nested filter/find operations to resolve partner details for every photoshoot card.
    *   *Recommendation*: Pre-index partners into a `Map` (O(1) lookup) instead of using `Array.filter` (O(N) lookup) inside loops.
-   **Static Imports**: All project data is loaded upfront.
    *   *Recommendation*: Use dynamic imports or React Query to fetch data only when the user navigates to specific sections.

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
- **Manifest Updates**: Keep `manifest2.ts` in sync with the actual storage structure.
