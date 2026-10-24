# Aayup Technologies - Official Website

![Aayup Technologies](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6.svg?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E.svg?logo=supabase)

Modern, responsive website for Aayup Technologies - A leading software development company specializing in web development, mobile apps, UI/UX design, and cloud solutions!

## 🌟 Features

### Public Features
- 🎨 **Modern UI/UX** - Glass-morphism design with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🌓 **Dark/Light Mode** - Theme toggle with system preference detection
- 🚀 **Performance Optimized** - Image optimization, lazy loading, and code splitting
- ♿ **Accessible** - WCAG compliant design
- 🔍 **SEO Friendly** - Optimized meta tags and semantic HTML

### Core Sections
- **Hero Section** - Eye-catching landing with animated elements
- **About Us** - Company overview with statistics
- **Services** - Comprehensive service offerings
- **Projects Portfolio** - Showcase of completed projects
- **Client Testimonials** - Infinite scrolling reviews with feedback form
- **Blog** - Tech articles and company updates
- **Careers** - Job listings and application system
- **Contact** - Multi-form contact and service inquiry system

### Student Programs
- 🎓 **Internship Program** - 3-6 months hands-on experience
- 📚 **Technical Training** - Industry-relevant curriculum
- 🏋️ **Workshops & Bootcamps** - Weekend and flexible batches
- 🎯 **Mentorship Program** - Personalized career guidance

### Admin Features
- 📊 **Dashboard** - Overview of all submissions and metrics
- 💼 **Job Management** - Create, edit, and manage job listings
- 📝 **Application Management** - Review and process job applications
- 🎓 **Student Enquiries** - Manage student program applications
- ⭐ **Testimonials Management** - Approve, feature, and edit testimonials
- 📧 **Contact & Queries** - Handle contact messages and service enquiries

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Tanstack Query** - Server state management

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Storage for file uploads
  - Real-time subscriptions

### Additional Tools
- **Lucide Icons** - Icon library
- **React Hook Form** - Form management
- **Sonner** - Toast notifications
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
aayup-ignite-main/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, logos, fonts
│   ├── components/        # React components
│   │   ├── admin/        # Admin panel components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External service integrations
│   │   └── supabase/    # Supabase client and types
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   │   └── admin/       # Admin pages
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.tsx         # App entry point
├── supabase/
│   └── migrations/      # Database migrations
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aayup-ignite-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   VITE_SUPABASE_PROJECT_ID=your_project_id
   ```

4. **Set up Supabase**
   
   Run the migrations in your Supabase SQL Editor:
   ```bash
   # Navigate to supabase/migrations/
   # Run each migration file in order
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   
   Navigate to `http://localhost:5173`

## 📊 Database Schema

### Main Tables
- `profiles` - User profiles with role-based access
- `jobs` - Job listings
- `job_applications` - Job applications with resume uploads
- `student_applications` - Student program applications
- `testimonials` - Client testimonials and feedback
- `contact` - Contact form submissions
- `enquiry` - Service enquiry submissions

### Security
- Row Level Security (RLS) enabled on all tables
- Admin-only access for management operations
- Public insert access for submissions
- Secure file storage with access policies

## 🎨 Customization

### Theme Colors
Edit `src/index.css` to customize colors:
```css
:root {
  --primary: 207 90% 54%;      /* Blue */
  --secondary: 187 85% 52%;    /* Cyan */
  --background: 0 0% 100%;     /* White */
  /* ... */
}
```

### Content
Update content in respective section components:
- Hero: `src/components/sections/HeroSection.tsx`
- About: `src/components/sections/AboutSection.tsx`
- Services: `src/components/sections/ServicesSection.tsx`
- etc.

## 📱 Responsive Design

- **Mobile First** - Designed for mobile, enhanced for desktop
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px

## 🔒 Security Features

- Environment variable protection
- Row Level Security (RLS) on database
- Admin authentication required
- Secure file upload handling
- Input validation and sanitization
- CORS configuration
- Content Security Policy ready

## 📈 Performance Optimizations

- Image optimization with Supabase transforms
- Lazy loading for images
- Code splitting with React.lazy
- Memoization with React.memo
- CSS containment for sections
- Optimized animations with will-change
- Efficient infinite scroll implementation


## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📝 Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key |
| `VITE_SUPABASE_PROJECT_ID` | Your Supabase project ID |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Team

**Aayup Technologies**
- Website: [www.aayuptechnologies.com](www.aayuptechnologies.com/)
- Email: aayup.technologies.010@gmail.com
- LinkedIn: [Aayup Technology](https://www.linkedin.com/in/aayup-technology-a030a5372)
- Instagram: [@aayup.technologies](https://www.instagram.com/aayup.technologies)

## 🐛 Bug Reports

If you discover any bugs, please create an issue on GitHub with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Environment details

## 📞 Support

For support, email aayup.technologies.010@gmail.com or join our WhatsApp support.

## 🎯 Roadmap

- [ ] Blog CMS integration
- [ ] Advanced analytics dashboard
- [ ] Newsletter subscription
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Automated testing suite
- [ ] Performance monitoring
- [ ] A/B testing framework

## 📚 Documentation

For detailed documentation, visit our [Wiki](link-to-wiki) or check the `docs/` folder.

---

**Designed & Developed by Saurabh Kumar**

Passionate software developer crafting modern web experiences with cutting-edge technologies.

### 🌐 Connect with Me

<p align="center">
  <a href="https://www.gu-saurabh.site" target="_blank">
    <img src="https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Website"/>
  </a>
  <a href="https://github.com/saurabhtbj1201" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/saurabhtbj1201/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="https://x.com/saurabhtbj1201" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter/X"/>
  </a>
  <a href="https://www.instagram.com/saurabhtbj1201/" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"/>
  </a>
</p>

### 📧 Contact

For any inquiries or collaboration opportunities, reach out at:  
📩 **aayup.technologies.010@gmail.com**

---

**Made with ❤️ by Aayup Technologies**
