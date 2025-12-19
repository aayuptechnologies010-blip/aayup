import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import logoImage from "@/assets/aayup-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logoImage} alt="Aayup Technologies" className="w-10 h-10 rounded-full" />
              <span className="text-lg font-bold gradient-text">Aayup Technologies</span>
            </Link>
            <p className="text-foreground/70 text-sm">
              Innovating Tomorrow With Intelligent Digital Solutions
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#services" className="text-foreground/70 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#projects" className="text-foreground/70 hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#clients" className="text-foreground/70 hover:text-primary transition-colors">Clients</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">Careers at Aayup Technologies</Link></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-3 mb-4">
              <a 
                href="https://www.linkedin.com/in/aayup-technology-a030a5372" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all group border border-primary/20"
              >
                <Linkedin className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/aayup.technologies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-500/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all group border border-pink-500/20"
              >
                <Instagram className="w-5 h-5 text-pink-500 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="mailto:aayup.technologies.010@gmail.com"
                className="w-10 h-10 bg-blue-500/10 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all group border border-blue-500/20"
              >
                <Mail className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://wa.me/917030839883"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all group border border-green-500/20"
                title="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 group-hover:text-white transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 14.487c-.246-.123-1.453-.718-1.678-.8-.225-.082-.389-.123-.553.123-.164.246-.633.8-.776.965-.143.164-.287.184-.533.062-.246-.123-1.04-.383-1.98-1.222-.732-.653-1.226-1.46-1.37-1.707-.143-.246-.015-.379.108-.501.111-.11.246-.287.369-.43.123-.143.164-.246.246-.41.082-.164.041-.308-.02-.43-.062-.123-.553-1.336-.757-1.832-.2-.48-.404-.415-.553-.423l-.47-.008c-.164 0-.43.062-.656.308-.225.246-.86.84-.86 2.048 0 1.208.88 2.375 1.002 2.54.123.164 1.73 2.64 4.2 3.597.588.202 1.045.322 1.402.412.59.15 1.127.129 1.552.078.474-.056 1.453-.594 1.658-1.168.205-.574.205-1.066.143-1.168-.062-.102-.225-.164-.47-.287z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 1.591.416 3.085 1.14 4.374L3 21l4.755-1.247A8.963 8.963 0 0012 21c4.97 0 9-4.03 9-9z" />
                </svg>
              </a>
              <a
                href="tel:+917030839883"
                className="w-10 h-10 bg-indigo-500/10 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-all group border border-indigo-500/20"
                title="Call Us"
              >
                <Phone className="w-5 h-5 text-indigo-500 group-hover:text-white transition-colors" />
              </a>
            </div>
            <p className="text-foreground/70 text-sm mb-2">
              <a href="mailto:aayup.technologies.010@gmail.com" className="hover:text-primary transition-colors">
                aayup.technologies.010@gmail.com
              </a>
            </p>
            <p className="text-foreground/70 text-sm">
              <a href="tel:+917030839883" className="hover:text-primary transition-colors">
                +91 70308 39883
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} Aayup Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
