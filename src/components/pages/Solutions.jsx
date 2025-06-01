import { motion } from 'framer-motion';
import { FaShieldAlt, FaNetworkWired, FaRobot, FaSatelliteDish, FaBrain, FaLock } from 'react-icons/fa';

const Solutions = () => {
  const solutions = [
    {
      icon: <FaShieldAlt className="h-8 w-8 text-primary-600" />,
      title: '6XOR OS',
      subtitle: 'Distributed AI Defense Operating System',
      description: 'A revolutionary operating system designed for modern defense needs, providing seamless integration and orchestration of defense assets across all domains with AI-driven decision-making capabilities.',
      features: [
        'Unified command and control interface',
        'AI-powered resource allocation',
        'Real-time threat prediction',
        'Autonomous task execution',
        'Cross-domain interoperability'
      ]
    },
    {
      icon: <FaNetworkWired className="h-8 w-8 text-primary-600" />,
      title: 'Mesh-Networked Defense',
      subtitle: 'Resilient Communication Infrastructure',
      description: 'A self-healing, secure mesh communication network that ensures continuous connectivity and data exchange across all defense units, even in contested environments.',
      features: [
        'Decentralized architecture',
        'Self-healing capabilities',
        'Jamming resistance',
        'Low-latency communication',
        'End-to-end encryption'
      ]
    },
    {
      icon: <FaSatelliteDish className="h-8 w-8 text-primary-600" />,
      title: 'Local Positioning System',
      subtitle: 'Precision Navigation & Timing',
      description: 'An indigenous, secure alternative to GPS that provides precise positioning and timing information in GPS-denied or contested environments.',
      features: [
        'GPS-independent operation',
        'High-precision positioning',
        'Anti-jamming technology',
        'Secure timing synchronization',
        'Indigenous technology stack'
      ]
    },
    {
      icon: <FaBrain className="h-8 w-8 text-primary-600" />,
      title: 'Advanced Decision Intelligence',
      subtitle: 'AI-Powered Analytics Platform',
      description: 'Transforming vast amounts of battlefield data into actionable intelligence with machine learning and predictive analytics for superior decision-making.',
      features: [
        'Real-time data processing',
        'Predictive analytics',
        'Threat pattern recognition',
        'Automated situation assessment',
        'Decision support tools'
      ]
    },
    {
      icon: <FaLock className="h-8 w-8 text-primary-600" />,
      title: 'Cyber Defense Suite',
      subtitle: 'Advanced Threat Protection',
      description: 'Comprehensive cybersecurity solutions designed to protect critical defense infrastructure from evolving cyber threats and attacks.',
      features: [
        'Real-time threat detection',
        'Automated incident response',
        'Vulnerability assessment',
        'Secure communication protocols',
        'Continuous monitoring'
      ]
    },
    {
      icon: <FaRobot className="h-8 w-8 text-primary-600" />,
      title: 'Autonomous Systems',
      subtitle: 'Unmanned & AI-Enabled Platforms',
      description: 'Next-generation autonomous systems for surveillance, reconnaissance, and tactical operations, reducing risk to human operators.',
      features: [
        'AI-driven autonomy',
        'Multi-domain operations',
        'Swarm intelligence',
        'Human-machine teaming',
        'Adaptive mission planning'
      ]
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">Defense Solutions</span> for a New Era
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Cutting-edge technologies designed to address the most complex defense challenges 
              with artificial intelligence and advanced engineering.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions designed to enhance India's defense capabilities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              >
                <div className="p-8">
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-primary-50 mb-6">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{solution.title}</h3>
                  <p className="text-primary-600 font-medium mb-4">{solution.subtitle}</p>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  
                  <div className="space-y-3">
                    {solution.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                    Learn more
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
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
              Ready to Transform Your Defense Capabilities?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Our team of experts is ready to discuss how our solutions can meet your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
