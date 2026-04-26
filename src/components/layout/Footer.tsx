import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+57 (1) 320 8320',
      href: 'tel:+573208320',
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Cra 7 No 40-62, Bogotá',
      href: 'https://maps.google.com/?q=Carrera+7+40-62+Bogota',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'mercadeo@javeriana.edu.co',
      href: 'mailto:mercadeo@javeriana.edu.co',
    },
  ];

  const quickLinks = [
    { label: 'Campus Virtual', href: 'https://campusvirtual.javeriana.edu.co/' },
    { label: 'Portal de Estudiantes', href: 'https://www.javeriana.edu.co/' },
    { label: 'Programa de Posgrados', href: 'https://www.javeriana.edu.co/posgrados' },
    { label: 'Investigación', href: 'https://www.javeriana.edu.co/investigacion' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/school/pontificia-universidad-javeriana/', label: 'LinkedIn' },
    { icon: Globe, href: 'https://www.javeriana.edu.co/', label: 'Web' },
  ];

  return (
    <footer className="mt-16 border-t border-javeriana-gold/20 bg-javeriana-blue py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Información de contacto */}
          <div className="space-y-4">
            <h3 className="font-family-display text-lg font-bold">Contacto</h3>
            <div className="space-y-3">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 transition-colors hover:text-javeriana-gold-light"
                >
                  <item.icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">{item.label}</p>
                    <p className="text-sm">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="font-family-display text-lg font-bold">Enlaces</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 4 }}
                    className="text-sm text-white/85 transition-colors hover:text-white hover:text-javeriana-gold-light"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h3 className="font-family-display text-lg font-bold">Síguenos</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-javeriana-gold hover:text-javeriana-blue"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Información institucional */}
          <div className="space-y-4">
            <h3 className="font-family-display text-lg font-bold">Sobre nosotros</h3>
            <p className="text-sm text-white/80">
              Pontificia Universidad Javeriana, comprometida con la educación de calidad y la excelencia académica.
            </p>
            <p className="text-xs text-white/60">Prueba Técnica Frontend 2026</p>
          </div>
        </div>

        {/* Separador y copyright */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Pontificia Universidad Javeriana. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-xs text-white/60">
              <a href="#" className="transition-colors hover:text-white">Política de privacidad</a>
              <span>|</span>
              <a href="#" className="transition-colors hover:text-white">Términos de uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
