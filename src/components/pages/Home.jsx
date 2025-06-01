import { motion } from 'framer-motion';
import { FaShieldAlt, FaRobot, FaNetworkWired, FaBrain } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  const features = [
    {
      icon: <FaShieldAlt className="h-8 w-8 text-primary-600" />,
      title: 'Indigenous Mastery',
      description: 'Engineered in India, for India. Our solutions are tailored to our nation\'s unique strategic needs.',
    },
    {
      icon: <FaRobot className="h-8 w-8 text-primary-600" />,
      title: 'AI-Powered',
      description: 'Harnessing artificial intelligence to transform data into decisive battlefield advantage.',
    },
    {
      icon: <FaNetworkWired className="h-8 w-8 text-primary-600" />,
      title: 'Networked Resilience',
      description: 'Secure, self-healing networks that ensure continuous operation in contested environments.',
    },
    {
      icon: <FaBrain className="h-8 w-8 text-primary-600" />,
      title: 'Strategic Intelligence',
      description: 'Advanced analytics for superior situational awareness and decision-making.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={item}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Securing India's Future</span> with
                  <br />
                  <span className="text-gray-900">AI-Powered Defense Solutions</span>
                </h1>
              </motion.div>
              
              <motion.p variants={item} className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pioneering the next generation of defense technology with artificial intelligence, 
                autonomous systems, and unbreakable networked resilience.
              </motion.p>
              
              <motion.div variants={item} className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link
                  to="/solutions"
                  className="btn btn-primary"
                >
                  Explore Our Solutions
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Our Core Technologies</span>
            </h2>
            <p className="text-xl text-gray-600">
              Cutting-edge solutions designed to address the most complex defense challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-primary-50 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform India's Defense Capabilities?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join us in building a safer, more secure future with cutting-edge defense technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
