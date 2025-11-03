import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Users, Heart } from 'lucide-react';
import TranslateLogo from '../../ASSETS/Translate logo.svg';

export const About = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-[#ff4e00]" />,
      title: 'Multi-Language Support',
      description: 'Seamlessly translate between Nyanja, Bemba, English, and more.',
    },
    {
      icon: <Zap className="w-8 h-8 text-[#ff4e00]" />,
      title: 'Lightning Fast',
      description: 'Instant translation with zero latency. Get results in milliseconds.',
    },
    {
      icon: <Users className="w-8 h-8 text-[#ff4e00]" />,
      title: 'Community Driven',
      description: 'Built for African languages and cultures by people who care.',
    },
    {
      icon: <Heart className="w-8 h-8 text-[#ff4e00]" />,
      title: 'Made with Care',
      description: 'Every word matters. We preserve linguistic heritage with precision.',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto space-y-8"
    >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <img
                  src={TranslateLogo}
                  alt="Ancestro Translate"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#2e0151] to-[#ff4e00] bg-clip-text text-transparent">
                Ancestro Translate
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Breaking down language barriers across African languages
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#2e0151]/10 to-[#ff4e00]/10 dark:from-[#2e0151]/20 dark:to-[#ff4e00]/20 rounded-xl p-8 border border-[#ff4e00]/20">
              <h2 className="text-2xl font-bold mb-4 text-[#2e0151] dark:text-white">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                At Ancestro Translate, we believe language should never be a barrier to connection. Our mission is to preserve, celebrate, and amplify African languages by providing fast, accurate, and accessible translation tools. We're dedicated to connecting people across linguistic boundaries and preserving the rich heritage of languages like Nyanja, Bemba, and many more.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-6 text-[#2e0151] dark:text-white">Why Choose Ancestro?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-3">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 text-[#2e0151] dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#2e0151] dark:text-white">About the App</h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  Ancestro Translate is a modern web application built with cutting-edge technology to deliver fast, reliable translation services. Whether you're a student, business professional, or language enthusiast, our platform makes it easy to translate between multiple African languages and English.
                </p>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  With a comprehensive dictionary, search history, and an intuitive interface, translation has never been easier. Start translating now and become part of the movement to preserve African linguistic heritage.
                </p>
              </div>
            </motion.div>

            {/* Tech stack removed as requested */}

            {/* CTA */}
            <motion.div variants={itemVariants} className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2 pt-6 border-t border-gray-200 dark:border-slate-700">
            {/* Footer removed as requested */}
            </motion.div>
    </motion.div>
  );
};
