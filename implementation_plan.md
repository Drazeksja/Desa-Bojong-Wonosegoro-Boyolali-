# Implementation Plan - Demak Website Redesign

This plan outlines the changes made to the `demak-kab-web` project to implement a new design structure using Bootstrap 5, while maintaining existing brand colors.

## Changes Implemented

### 1. Technology Upgrade
- **Installed Bootstrap 5**: Added `bootstrap` to dependencies.
- **Configured Global Styles**: Imported Bootstrap CSS in `src/app/layout.tsx`.

### 2. Layout Restructuring (`src/app/page.tsx`)
Refactored the main page to follow a standard government portal layout (approximately 65% structure match to reference).

- **Navigation**:
  - Sticky Navbar with transparent-to-solid transition on scroll.
  - Logo and text branding ("PEMERINTAH KABUPATEN DEMAK").
  - Mobile-responsive toggle.
  
- **Hero Section**:
  - Full-screen banner with background image and gradient overlay.
  - "HARI BELA NEGARA" prominent title (as per reference).
  - Centralized Search Bar.

- **News Section ("Berita")**:
  - **Left Column (Main)**: Large featured news card + List of recent news with thumbnails.
  - **Right Column (Sidebar)**: Video widget, Announcements ("Pengumuman"), and Banner space.

- **Services Grid ("Layanan Smart City")**:
  - 6-column grid of icons for quick access (CCTV, WiFi, E-Surat, etc.).
  - Hover effects for interactivity.

- **Gallery / Portal**:
  - Grid of cards featuring Demak landmarks (Masjid Agung, Makam Sunan Kalijaga).

- **Footer**:
  - Dark theme with 4 columns: Branding, Quick Links, Public Services, and Contact Info.

### 3. Visual Design
- **Colors**: Retained the existing Deep Blue (`--primary`) and Gold/Amber (`--accent`) palette defined in `globals.css`.
- **Integrations**: Used `lucide-react` for icons and `next/image` for optimized image loading.

## Verification
- The application runs on `http://localhost:4500`.
- **Note**: Some placeholder images (Unsplash) might return 404s if the random IDs are invalid; these should be replaced with actual local assets.

## Next Steps for User
- Replace placeholder text and images with actual content.
- Connect the "Search" and "Links" to real routes.
