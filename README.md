# Sufi_Codes – Interactive Code Editor

[![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-blue?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Convex](https://img.shields.io/badge/Convex-Backend-blue?logo=convex&logoColor=white)](https://convex.dev)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-blue?logo=clerk&logoColor=white)](https://clerk.com)

---

## Overview

**Sufi_Codes** is a modern, responsive, and feature-rich web-based code editor built with [Next.js](https://nextjs.org), Tailwind CSS, and Convex. It offers an interactive coding environment with real-time editing, sharing, comments, and a beautiful, accessible UI. Designed for developers who want a seamless, collaborative, and social code editing experience.

---

## Features

- 🖊️ **Monaco-based Code Editor** with syntax highlighting, multiple language support, and custom themes.
- 🚀 **Instant Sharing:** Share code snippets via unique URLs.
- 💬 **Real-time Comments:** Engage with the community through threaded comments on snippets.
- ⭐ **Social Features:** Star and save your favorite code snippets.
- 👤 **Authentication:** Secure sign-in and user management with Clerk.
- 📱 **Fully Responsive:** Optimized for both desktop and mobile devices.
- 🎨 **Stunning UI:** Beautiful dark/light themes and smooth transitions.
- ⚡ **Performance:** Fast, lazy-loaded, and production-optimized.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/yourusername/codecraft.git
    cd codecraft
    ```

2. **Install dependencies:**
    ```
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory and add:

    ```
    NEXT_PUBLIC_CONVEX_URL=your_convex_url
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    ```

4. **Run the development server:**
    ```
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

- **Write code** in multiple languages with syntax highlighting and code formatting.
- **Share** your code snippets with a single click.
- **Comment** and discuss code with other users.
- **Star** and manage your favorite snippets.
- **Switch themes** and personalize your coding environment.

---

## Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) for the best experience:

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy and enjoy your live app!

For more, see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Technologies Used

- [Next.js](https://nextjs.org) – React framework for the web
- [Tailwind CSS](https://tailwindcss.com) – Utility-first CSS framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) – The code editor that powers VS Code
- [Convex](https://convex.dev) – Real-time backend as a service
- [Clerk](https://clerk.com) – User authentication and management
- [Framer Motion](https://www.framer.com/motion/) – Animations and transitions

---

## Contributing

Contributions are welcome!  
Please open issues or submit pull requests for improvements and new features.

---

## License

This project is licensed under the MIT License.

---

_Made with ❤️ by the CodeCraft Team_
