# Mystical Quill - Fiction Writing App

A modern web application for fiction writers to craft and manage their stories.

## Features

- **Story Management**: Create, edit, and organize your stories
- **Rich Text Editor**: Write with a beautiful, distraction-free editor
- **Dark Fantasy Theme**: Immersive UI with mystical aesthetics
- **Auto-save**: Never lose your work with automatic saving
- **User Authentication**: Secure login and user management

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Editor**: TipTap Rich Text Editor
- **Backend**: Supabase
- **State Management**: Zustand

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Novriandika23/writing-app.git
cd writing-app/fiction-writer-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your Supabase credentials to .env
```

4. Start the development server
```bash
npm run dev
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository: `Novriandika23/writing-app`
4. Set root directory to: `fiction-writer-app`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENAI_API_KEY` (optional)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project directory:
```bash
cd fiction-writer-app
vercel
```

## Project Structure

```
fiction-writer-app/
├── src/
│   ├── components/     # React components
│   ├── store/         # State management
│   ├── hooks/         # Custom hooks
│   └── styles/        # CSS files
├── public/            # Static assets
└── package.json
```
