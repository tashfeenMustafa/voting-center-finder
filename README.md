# Bangladesh Election Constituency Finder

**Vote Koi Dibo?** - Find your parliamentary constituency and voting center by searching through all 300 constituencies in Bangladesh.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Search Tips](#search-tips)
- [Election Dictionary](#election-dictionary)
- [Official Sources](#official-sources)
- [Disclaimer](#disclaimer)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building Static Files](#building-static-files)
- [Contributing](#contributing)
- [Requesting Changes](#requesting-changes)
- [License](#license)

## 🎯 About

This is a **free and open-source** educational tool designed to help voters in Bangladesh find their parliamentary constituency. The application allows users to search through all 300 parliamentary constituencies by district, thana, union, ward, or any related term.

**Important**: This project is for **informational purposes only** and is NOT an official government website. Always verify your information through official Election Commission channels.

## ✨ Features

- 🔍 **Comprehensive Search**: Search by district, thana, union, ward, or any keyword
- 🌐 **Bilingual Support**: Full support for English and বাংলা (Bangla)
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 📊 **Detailed Information**: View constituency details including:
  - Seat numbers (both English and Bangla)
  - District information
  - Area composition
  - Thana/Upazila listings
  - Ward numbers
  - Pauroshava (Municipality) information
  - Union listings
  - Search tags

## 🔍 Search Tips

### Split Upazilas

**Note**: Some Upazilas (like Savar or Rani Sankail) are split between multiple seats. If you don't see your area here, try searching by your Union name.

### Newly Formed Upazilas

**Note**: Boundaries for newly formed Upazilas (like Dasar or Eidgaon) are based on the latest 2025 Delimitation rules.

### Search Suggestions

- You can search using English or Bangla text
- Try searching by your Thana name, Union name, or Ward number
- Seat numbers can be searched with or without hyphens (e.g., "Dhaka-10" or "Dhaka 10")
- Multiple search terms are supported (e.g., "ward 9 dhaka")

## 📚 Election Dictionary

### Upazila vs. Thana

In rural areas, administrative units are called **Upazilas**. In metropolitan cities like Dhaka or Chattogram, they are called **Thanas**. Your constituency is often determined by the Thana (Police Station) your address belongs to.

### What is a Ward?

A **Ward** is the smallest urban unit. In City Corporations, your Ward Number is the key to finding your specific polling center (usually a nearby school or community center).

### Constituency (আসন - Asan)

This is your parliamentary **Seat** (e.g., Dhaka-10). Voters in each constituency elect one Member of Parliament (MP) to represent them in the Jatiya Sangsad.

## 📖 Official Sources

### Data Source

All constituency boundary data is gathered from the **Bangladesh Election Commission's** official **'Delimitation of Constituencies' Gazette** published on **December 11, 2025**.

**Official Gazette (PDF)**: [View Official Gazette](https://www.ecs.gov.bd/files/2ceFJGlIGLiCkOUslJTIzMqgJcz5QyjOjzD8hUgr.pdf)

### Official App

For finding your polling center, voter serial number, and candidate details, please use the official app:

**Smart Election Management BD** - [Download on Google Play](https://play.google.com/store/apps/details?id=com.atcl.bd.electioncommission)

**Features of the Official App**:
- Find your Voter Serial Number
- Locate your assigned Polling Center
- View Candidate profiles and party data
- Real-time election updates

## ⚠️ Disclaimer

**This is an independent educational tool and NOT an official government website.**

While we use official 2025 Gazette data, always verify your information through the **'Smart Election Management BD'** app or official Election Commission channels.

This project is:
- ✅ **Free and Open Source**
- ✅ **For Informational Purposes Only**
- ✅ **Educational Tool**
- ❌ **NOT an official government website**
- ❌ **NOT affiliated with the Election Commission**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn, pnpm, bun)
- Git (for cloning the repository)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd election-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. (Optional) Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```bash
   # Site URL (for production)
   NEXT_PUBLIC_SITE_URL=https://your-domain.com

   # Google Analytics (Optional)
   # Get your Google Analytics Measurement ID from https://analytics.google.com/
   # Format: G-XXXXXXXXXX (for GA4) or UA-XXXXXXXXX-X (for Universal Analytics)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Google Analytics Setup

To enable Google Analytics tracking:

1. **Get your Google Analytics ID**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or use an existing one
   - Get your Measurement ID (format: `G-XXXXXXXXXX` for GA4)

2. **Add to environment variables**:
   - Create a `.env.local` file in the root directory
   - Add your Google Analytics ID:
     ```bash
     NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
     ```

3. **For production**:
   - Add the same environment variable to your hosting platform
   - For static exports, the GA code will be included in the build

**Note**: Google Analytics is optional. If `NEXT_PUBLIC_GA_ID` is not set, the tracking code will not be loaded.

## 💻 Development

### Project Structure

```
election-finder/
├── app/
│   ├── components/
│   │   └── GoogleAnalytics.tsx  # Google Analytics component
│   ├── constituencies.json       # Constituency data
│   ├── page.tsx                 # Main page component
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── out/                          # Static build output (generated)
└── package.json
```

### Key Technologies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Material Icons** - Icons

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Generate static export (same as build)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Building Static Files

This project is configured for static export, generating standalone HTML, CSS, and JavaScript files.

### Build Command

```bash
npm run build
# or
npm run export
```

This creates an `out` directory containing:
- `index.html` - Main HTML file
- `_next/static/chunks/` - JavaScript bundles
- `_next/static/chunks/*.css` - CSS files
- `_next/static/media/` - Fonts and assets

### Local Testing

Test the static build locally:

```bash
# Using Python
cd out
python -m http.server 8080

# Using Node.js (serve)
npx serve out -p 8080

# Using PHP
cd out
php -S localhost:8080
```

### Deployment

Upload the entire `out` directory to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static file host

**Note**: The static build works completely client-side - no server required!

## 🤝 Contributing

This project is **free and open source**. We welcome contributions from the community!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test your changes**: `npm run dev` and `npm run build`
5. **Commit your changes**: `git commit -m 'Add some feature'`
6. **Push to the branch**: `git push origin feature/your-feature-name`
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Be respectful and constructive in discussions

## 📝 Requesting Changes

If you find any errors, inaccuracies, or have suggestions for improvements, we encourage you to request changes through this GitHub repository.

### How to Request Changes

#### Option 1: Create an Issue (Recommended for Non-Coders)

1. Go to the **Issues** tab in the GitHub repository
2. Click **"New Issue"**
3. Select the appropriate issue template or create a blank issue
4. Provide the following information:
   - **Type of change**: Data correction, bug fix, feature request, etc.
   - **Description**: Detailed description of what needs to be changed
   - **Location**: Where in the app/data the issue is (e.g., "Dhaka-10 constituency data")
   - **Current information**: What is currently shown
   - **Correct information**: What it should be (if applicable)
   - **Source**: Official source or reference (if available)
5. Click **"Submit new issue"**

#### Option 2: Create a Pull Request (For Developers)

1. **Fork the repository** (if you haven't already)
2. **Make your changes**:
   - For data corrections: Edit `app/constituencies.json`
   - For code changes: Edit the relevant files
3. **Test your changes**:
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure build succeeds
   ```
4. **Commit with a clear message**:
   ```bash
   git commit -m "Fix: Correct constituency data for Dhaka-10"
   ```
5. **Push to your fork**
6. **Open a Pull Request** with:
   - Clear title describing the change
   - Detailed description
   - Reference to any related issues
   - Screenshots (if UI changes)

### Types of Changes You Can Request

#### Data Corrections
- Incorrect constituency boundaries
- Wrong district/thana/union names
- Missing or incorrect ward numbers
- Translation errors (English/Bangla)

#### Bug Fixes
- Search not working for specific terms
- UI/UX issues
- Responsive design problems
- Performance issues

#### Feature Requests
- New search capabilities
- Additional information display
- UI improvements
- Accessibility enhancements

#### Documentation
- README improvements
- Code comments
- User guides

### Making Changes to the Codebase

#### For Data Changes (constituencies.json)

1. Open `app/constituencies.json`
2. Find the constituency you want to modify (search by `id`, `no_en`, or `district_en`)
3. Update the relevant fields:
   ```json
   {
     "id": 1,
     "no_en": "Panchagarh-1",
     "no_bn": "পঞ্চগড়-১",
     "district_en": "Panchagarh",
     "district_bn": "পঞ্চগড়",
     "composition_en": "...",
     "composition_bn": "...",
     "thana": ["Panchagarh Sadar", "Tetulia"],
     "thana_bn": ["পঞ্চগড় সদর", "তেতুলিয়া"],
     "wards": [],
     "unions": ["Amarkhana", "Chaklahat"],
     "unions_bn": ["আমারখানা", "চাকলাহাট"],
     "pauroshava": ["Panchagarh"],
     "pauroshava_bn": ["পঞ্চগড়"],
     "search_tags": ["Panchagarh-1", "পঞ্চগড়-১"]
   }
   ```
4. Save and test your changes
5. Commit and create a Pull Request

#### For Code Changes

1. Identify the file to modify:
   - `app/page.tsx` - Main page component
   - `app/layout.tsx` - Root layout
   - `app/globals.css` - Global styles
   - `next.config.ts` - Next.js configuration

2. Make your changes following the existing code style
3. Test thoroughly:
   ```bash
   npm run dev      # Development testing
   npm run build    # Production build test
   npm run lint     # Code quality check
   ```

4. Commit and push your changes

### Review Process

- All changes will be reviewed by maintainers
- Data corrections will be verified against official sources
- Code changes will be checked for quality and compatibility
- Feedback will be provided if changes are needed

## 📄 License

This project is **free and open source**. The code is available for anyone to use, modify, and distribute.

**Note**: While the code is open source, the constituency data is based on official Election Commission publications. Always refer to official sources for authoritative information.

## 🙏 Acknowledgments

- **Bangladesh Election Commission** for publishing the official Delimitation Gazette
- **Open Source Community** for the amazing tools and libraries
- **Contributors** who help improve this project

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Create a pull request
- Follow the contribution guidelines above

---

**Remember**: This is an educational tool. Always verify critical information through official Election Commission channels before making important decisions.

**Last Updated**: Based on Election Commission Gazette published on December 11, 2025
