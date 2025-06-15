# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal tailoring website (conckova.cz) built with PHP and modern CSS. It's a simple multi-page website for a women's tailoring business operating in the Opava and Ostrava region of Czech Republic.

## Architecture

The site uses a traditional PHP include-based architecture:
- `header.php` - Contains HTML head, site title with hero image, and navigation
- `footer.php` - Contains closing tags and copyright
- Individual PHP pages (`index.php`, `cenik.php`, `galerie.php`, `kontakt.php`) include header/footer
- `styles.css` - Modern CSS with responsive design, sticky navigation, and hero image overlay
- `galerie/` - Image gallery directory with tailoring work samples
- `img/` - Site assets including hero images

## Development Commands

Since this is a simple PHP website with no build process, there are no specific build or test commands. The site runs directly on a PHP-capable web server.

## Deployment

The site uses FTP deployment via `deploy.sh`:
- Prompts for FTP password
- Uploads all non-image files to www.conckova.cz via FTP
- Recursively handles subdirectories
- Skips common image formats to save bandwidth

To deploy: `./deploy.sh`

## Content Structure

- All content is in Czech language
- UTF-8 encoding throughout
- Color-coded text elements using CSS classes (zelena, ruzova, modra, zluta)
- Responsive design with modern CSS Grid/Flexbox
- Hero image with overlay text for branding