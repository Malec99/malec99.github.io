# Centrala Prototyp

A Next.js dashboard application for managing firefighter teams.

## 🚀 Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup Steps:

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub: `https://github.com/Malec99/malec99.github.io/settings/pages`
   - Under "Build and deployment":
     - Source: Select **GitHub Actions**
   - The workflow will automatically run and deploy your site

3. **Access your site:**
   - Your site will be available at: `https://malec99.github.io/`
   - It may take a few minutes for the first deployment

### How It Works:

- **User Site**: Repository name `malec99.github.io` deploys to root domain (no subdirectory needed)
- **Static Export**: `output: 'export'` generates static HTML/CSS/JS files
- **`.nojekyll`**: Prevents GitHub Pages from processing the site with Jekyll
- **Trailing Slash**: Enabled for better compatibility with static hosting
- **Authentication**: Site is protected with username/password login (PM/manometry)

### Troubleshooting:

If styles don't load after deployment:

1. Check the GitHub Actions workflow status in the Actions tab
2. Verify GitHub Pages is set to use "GitHub Actions" as source (not Deploy from branch)
3. Make sure the deployment succeeded (green checkmark in Actions)
4. Clear your browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 🛠️ Development

### Prerequisites

- Node.js 20+ (with pnpm)

### Install Dependencies

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

The static files will be generated in the `out/` directory.

### Preview Production Build

```bash
pnpm start
```

## 📦 Technology Stack

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library
- **TypeScript** - Type safety
- **pnpm** - Package manager

## 🔧 Project Structure

```
centrala-prototyp/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
├── public/              # Static assets
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions workflow
```

## 📝 Notes

- This project uses static export (`output: 'export'`) to generate static HTML/CSS/JS
- The `basePath` is set to `/centrala-prototyp` for GitHub Pages deployment
- Images are unoptimized for static export compatibility
- TypeScript build errors are ignored (configured in `next.config.mjs`)

## 🤝 Contributing

This is a prototype project. Feel free to modify and extend as needed.
