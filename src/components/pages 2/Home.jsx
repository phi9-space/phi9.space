import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiGlobe, FiCpu, FiCode } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiShield className="w-8 h-8 text-primary" />,
      title: 'Advanced Security',
      description: 'State-of-the-art security protocols to protect against emerging threats.'
    },
    {
      icon: <FiGlobe className="w-8 h-8 text-primary" />,
      title: 'Global Reach',
      description: 'Solutions designed for global defense operations and intelligence.'
    },
    {
      icon: <FiCpu className="w-8 h-8 text-primary" />,
      title: 'Cutting-Edge AI',
      description: 'Leveraging artificial intelligence for next-generation defense systems.'
    },
    {
      icon: <FiCode className="w-8 h-8 text-primary" />,
      title: 'Custom Solutions',
      description: 'Tailored solutions to meet specific defense and security needs.'
    }
  ];

  return (
    <div className="min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-background-dark">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern bg-grid"></div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Logo and text content */}
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Logo */}
              <div className="mb-8">
                <img 
                  src="/Cover Logo 2.svg" 
                  alt="PHI9 Logo" 
                  className="h-20 w-auto"
                />
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                <span className="block">SECURING</span>
                <span className="text-primary">TOMORROW&apos;S</span>
                <span className="block">DEFENSE</span>
              </h1>
              
              <div className="h-1 w-24 bg-primary my-6"></div>
              
              <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
                Pioneering indigenous defense technologies to safeguard national security through innovation, integrity, and excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/solutions" 
                  className="btn btn-primary group flex items-center justify-center sm:justify-start"
                >
                  Explore Solutions
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/contact" 
                  className="btn btn-outline text-white border-white/30 hover:bg-white/5 hover:border-white/50"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            
            {/* Visual element - can be an image or 3D model */}
            <motion.div 
              className="relative h-96 lg:h-[600px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden">
                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid"></div>
                </div>
                
                {/* Floating background elements */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 blur-xl rounded-lg transform rotate-12 animate-float"></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 blur-lg rounded-lg transform -rotate-6 animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-primary/15 blur-md rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                
                {/* Main 3D model container */}
                <div className="absolute inset-4 rounded-2xl border border-white/10 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm overflow-hidden">
                  <div className="relative w-full h-full">
                    {/* Center cluster */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      {/* Large center cube */}
                      <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg transform rotate-45 animate-float">
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-transparent rounded-lg blur"></div>
                      </div>
                      
                      {/* Medium cubes */}
                      <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-lg transform rotate-12 animate-float" style={{ animationDelay: '0.8s' }}></div>
                      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary/25 to-primary/10 rounded-lg transform -rotate-6 animate-float" style={{ animationDelay: '1.2s' }}></div>
                      
                      {/* Small cubes */}
                      <div className="absolute -top-10 -right-10 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-lg transform -rotate-12 animate-float" style={{ animationDelay: '0.4s' }}></div>
                      <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-lg transform rotate-12 animate-float" style={{ animationDelay: '1.6s' }}></div>
                    </div>
                    
                    {/* Orbiting elements - Layer 1 */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-primary/15 to-transparent rounded-lg transform rotate-45 animate-float" style={{ animationDelay: '0.6s' }}></div>
                    <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-lg transform -rotate-12 animate-float" style={{ animationDelay: '1.4s' }}></div>
                    <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-primary/20 to-transparent rounded-lg transform rotate-6 animate-float" style={{ animationDelay: '0.9s' }}></div>
                    
                    {/* Orbiting elements - Layer 2 */}
                    <div className="absolute top-1/6 right-1/6 w-12 h-12 bg-gradient-to-br from-white/15 to-transparent rounded-lg transform -rotate-6 animate-float" style={{ animationDelay: '1.1s' }}></div>
                    <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-gradient-to-br from-primary/25 to-transparent rounded-lg transform rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Floating triangles */}
                    <div className="absolute top-1/5 left-1/5 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[34.6px] border-b-primary/20 transform rotate-45 animate-float" style={{ animationDelay: '1.3s' }}></div>
                    <div className="absolute bottom-1/5 right-1/4 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[26px] border-t-primary/15 transform -rotate-12 animate-float" style={{ animationDelay: '0.7s' }}></div>
                    <div className="absolute top-3/4 right-1/5 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[31.2px] border-b-white/10 transform -rotate-45 animate-float" style={{ animationDelay: '1.5s' }}></div>
                    
                    {/* Floating circles */}
                    <div className="absolute top-1/3 right-1/6 w-8 h-8 rounded-full bg-gradient-to-br from-white/15 to-transparent blur-sm animate-float" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute bottom-1/3 left-1/6 w-10 h-10 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-sm animate-float" style={{ animationDelay: '1.7s' }}></div>
                    <div className="absolute top-1/4 left-1/3 w-6 h-6 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-sm animate-float" style={{ animationDelay: '0.9s' }}></div>
                    <div className="absolute bottom-1/4 right-1/3 w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-sm animate-float" style={{ animationDelay: '1.1s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-dark relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent mb-6">
              <span className="text-primary">//</span> OUR CORE TECHNOLOGIES
            </h2>
            <div className="h-1 w-16 bg-primary mx-auto my-6"></div>
            <p className="text-lg text-accent/80">
              Cutting-edge solutions designed to address the most complex defense challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-background-light p-8 rounded-lg border border-accent/10 hover:border-primary/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-accent mb-3 font-heading">{feature.title}</h3>
                <p className="text-accent/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Diagonal background lines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0.03)_25%,_transparent_25%),_linear-gradient(-45deg,_rgba(255,255,255,0.03)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgba(255,255,255,0.03)_75%),_linear-gradient(-45deg,_transparent_75%,_rgba(255,255,255,0.03)_75%)] bg-[length:20px_20px]"></div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent mb-6">
              <span className="text-primary">//</span> OUR MANIFESTO
            </h2>
            <div className="h-1 w-16 bg-primary mx-auto my-6"></div>
            <p className="text-lg text-accent/80">
              Our vision for a future of autonomous systems and national security
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto text-accent/90 leading-relaxed">
            <h3 className="text-2xl font-bold text-accent mb-4">We See a Future.</h3>
            <p className="mb-6">Life-saving aid <em>will</em> reach disaster zones, not <em>despite</em> broken communication, but <em>because</em> our systems are inherently autonomous. Our nation’s infrastructure <em>will</em> intelligently maintain itself, securing our future. We <em>will</em> explore the deepest oceans and highest mountains; where technology truly serves humanity—<em>uninterrupted, everywhere, under any conditions.</em></p>
            
            <p className="mb-6">At <strong>phi9.space</strong>, we are building the enabling foundational technology for this world: <strong>Non-GNSS autonomous systems.</strong> A new class of machines and systems that possess their <strong>own intrinsic sense of position and awareness.</strong></p>
            
            <h3 className="text-2xl font-bold text-accent mt-8 mb-4">Unlocking Unprecedented Value</h3>
            <p className="mb-6">Our work is an integrated ecosystem, engineered for <strong>unprecedented impact and dominance.</strong></p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>The Foundation - Atma Nirbhar Navigational Core (ANC):</strong> Our foundational technology, the <strong>uninterruptible, unjammable and secure</strong> for true autonomy.</li>
              <li><strong>The Intelligence - The Self-Aware System:</strong> AI platforms that construct a <em>true, intelligent, and predictive picture of the world.</em></li>
              <li><strong>The Application - Resilient Operations:</strong> Transforming critical sectors with autonomous fleets, drones, and robotic systems.</li>
            </ul>
            
            <p className="mb-6">We stand at the precipice of <strong>history's true inflection point:</strong> the singular moment where a foundational shift in autonomy will redefine global power and national security. <strong>phi9.space is India’s definitive answer.</strong></p>
          </div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern bg-grid"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              READY TO TRANSFORM YOUR DEFENSE CAPABILITIES?
            </h2>
            <div className="h-1 w-16 bg-white/50 mx-auto my-8"></div>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Partner with us to leverage cutting-edge defense solutions tailored to your specific needs.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium bg-white text-background hover:bg-accent hover:text-white transition-colors duration-300"
            >
              Get in Touch
              <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern bg-grid"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
