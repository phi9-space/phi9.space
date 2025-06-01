import { Link } from 'react-router-dom';
import { FaShieldAlt, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'About', href: '/about' },
      { name: 'Solutions', href: '/solutions' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com/yourusername',
        icon: FaGithub,
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/yourhandle',
        icon: FaTwitter,
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/yourcompany',
        icon: FaLinkedin,
      },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link to={item.href} className="text-base hover:text-white transition-colors">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="h-6 w-6 text-primary-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-300 bg-clip-text text-transparent">
              phi9.space
            </span>
          </div>
          <p className="mt-4 text-center text-base text-gray-400">
            &copy; {currentYear} phi9.space. All rights reserved.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Empowering India's defense with cutting-edge technology and artificial intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
