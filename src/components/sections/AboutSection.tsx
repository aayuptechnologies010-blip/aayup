import { motion } from "framer-motion";
import { Target, Eye, Code2, Users } from "lucide-react";
import { FloatingLogo } from "@/components/ui/floating-logo";

const AboutSection = () => {
  const values = [
    { icon: Code2, title: "Innovation", description: "Pushing boundaries with cutting-edge solutions" },
    { icon: Target, title: "Integrity", description: "Building trust through transparency" },
    { icon: Users, title: "Collaboration", description: "Achieving more together" },
    { icon: Eye, title: "Excellence", description: "Delivering nothing but the best" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <FloatingLogo />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Aayup Technologies</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Transforming ideas into impactful digital solutions
          </p>
          <div className="mt-8 flex items-center justify-center px-4">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1 shadow-lg w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-4 bg-card/60 dark:bg-card/70 rounded-xl px-4 sm:px-6 py-4 backdrop-blur">
                <div className="text-left sm:text-left text-center">
                  <p className="text-sm text-foreground/70">Interested in working together?</p>
                  <p className="font-semibold text-foreground">Explore our services or get in touch</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md shadow-sm hover:translate-y-[-2px] transition-transform w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => {
                      const nav = document.querySelector("nav");
                      const offset = (nav?.getBoundingClientRect().height ?? 80) + 8;
                      const el = document.getElementById("services");
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      } else {
                        window.location.href = "/#services";
                      }
                    }}
                  >
                    Our Services
                  </button>

                  <button
                    className="border border-primary/40 text-foreground px-4 py-2 rounded-md hover:bg-primary/5 transition-colors w-full sm:w-auto text-sm sm:text-base"
                    onClick={() => {
                      const nav = document.querySelector("nav");
                      const offset = (nav?.getBoundingClientRect().height ?? 80) + 8;
                      const el = document.getElementById("contact");
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      } else {
                        window.location.href = "/#contact";
                      }
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 transition-transform duration-300 hover:-translate-y-3 hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">Who We Are</h3>
            <p className="text-foreground/80 leading-relaxed">
              At Aayup Technologies Pvt. Ltd., we are a dynamic team of passionate developers and designers
              committed to delivering innovative digital solutions. With a focus on excellence and a
              user-centric approach, we transform ideas into impactful web and mobile applications.
            </p>
            <div className="mt-6 flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Team</p>
                <p className="text-foreground/70 text-sm">15+ members across design & engineering</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 transition-transform duration-300 hover:-translate-y-3 hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h3>
            <p className="text-foreground/80 leading-relaxed">
              Our mission is to empower businesses by providing cutting-edge technology solutions that
              drive growth and efficiency. We bridge the gap between technology and user experience,
              ensuring seamless digital transformation.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Our Values</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="glass-card p-6 text-center transition-transform duration-300 hover:-translate-y-3 hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-foreground/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
