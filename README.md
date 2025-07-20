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
