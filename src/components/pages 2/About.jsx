import { motion } from 'framer-motion';
import { FaShieldAlt, FaUsers, FaLightbulb, FaGlobeAsia } from 'react-icons/fa';

const About = () => {
  const stats = [
    { label: 'Years of Experience', value: '5+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Team Members', value: '50+' },
    { label: 'Patents Filed', value: '10+' },
  ];

  const values = [
    {
      icon: <FaShieldAlt className="h-8 w-8 text-primary-600" />,
      title: 'Integrity',
      description: 'We uphold the highest standards of integrity in all our actions and decisions.',
    },
    {
      icon: <FaLightbulb className="h-8 w-8 text-primary-600" />,
      title: 'Innovation',
      description: 'We continuously push boundaries to develop cutting-edge defense solutions.',
    },
    {
      icon: <FaUsers className="h-8 w-8 text-primary-600" />,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and strategic partnerships.',
    },
    {
      icon: <FaGlobeAsia className="h-8 w-8 text-primary-600" />,
      title: 'National Pride',
      description: 'We are committed to strengthening India\'s defense capabilities.',
    },
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
              <span className="gradient-text">Pioneering</span> India's Defense Future
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Empowering the nation with cutting-edge defense technology and artificial intelligence solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="gradient-text">Mission</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At phi9.space, we are dedicated to revolutionizing India's defense capabilities through 
                  innovative technology and artificial intelligence. Our mission is to provide the Indian armed 
                  forces with cutting-edge, indigenous solutions that ensure national security and strategic autonomy.
                </p>
                <p className="text-lg text-gray-600">
                  We combine advanced research, engineering excellence, and deep domain expertise to develop 
                  systems that address the most complex defense challenges of our time.
                </p>
              </motion.div>
              <motion.div
                className="bg-gray-100 rounded-2xl p-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  To establish India as a global leader in defense technology through relentless innovation, 
                  strategic partnerships, and the development of world-class indigenous solutions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600">
              Guiding principles that define who we are and how we operate
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-primary-50 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600">
              A team of visionaries, engineers, and defense experts dedicated to securing India's future
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">Leadership Member {item}</h3>
                <p className="text-primary-600 font-medium mb-4">Position Title</p>
                <p className="text-gray-600">
                  Brief bio or description of the leadership member's role and expertise.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
