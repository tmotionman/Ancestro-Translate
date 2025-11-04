import React, { useState } from 'react';
import TranslateLogo from '../../ASSETS/Translate logo.svg';
import LoadingVideo from '../../ASSETS/loading screen.mp4';
import { motion } from 'framer-motion';

export const SplashScreen = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#2e0151] via-[#3d0a5f] to-black overflow-hidden">
      {/* Animated background elements - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <motion.div
            // responsive: smaller and closer on mobile, larger on desktop
            className="absolute top-10 left-4 sm:top-20 sm:left-20 w-56 h-56 sm:w-96 sm:h-96 bg-[#ff4e00]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
            // responsive: smaller and closer on mobile, larger on desktop
            className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 bg-[#ff4e00]/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Video on Mobile - Top Half */}
      <div className="absolute inset-0 sm:hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-1/2 object-cover"
        >
          <source src={LoadingVideo} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:min-h-screen">
        {/* Mobile: Split layout with video on top */}
        <div className="w-full sm:hidden flex flex-col h-screen">
          {/* Video takes top half */}
          <div className="h-1/2 flex items-center justify-center" />
          
          {/* Content takes bottom half */}
          <div className="h-1/2 flex flex-col items-center justify-start overflow-y-auto pt-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-4 max-w-sm"
            >
              {/* Logo */}
              <motion.div variants={itemVariants} className="flex justify-center">
                <motion.img
                  src={TranslateLogo}
                  alt="Translate logo"
                  className="w-16 h-16 object-contain"
                />
              </motion.div>

              {/* Main Title */}
              <motion.div variants={itemVariants} className="space-y-1 text-center">
                <h1 className="text-2xl font-bold text-white leading-tight">
                  Welcome to Ancestro Translate.
                </h1>

                <div className="mt-1">
                  {/* Mobile: single-line tagline */}
                  <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="bg-gradient-to-r from-[#ff4e00] to-orange-400 bg-clip-text text-transparent">Break free from&nbsp;</span>
                    <span className="bg-gradient-to-r from-[#ff4e00] to-orange-400 bg-clip-text text-transparent">Language Barriers</span>
                  </p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants} className="pt-3">
                <motion.button
                  onClick={onComplete}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#ff4e00] to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Started
                </motion.button>
              </motion.div>

              {/* Powered by line on splash screen */}
              <motion.div variants={itemVariants} className="pt-2">
                <p className="text-xs text-muted-foreground/80">Powered by Nestro Ai</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Original layout with animations and flags */}
        <div className="hidden sm:flex flex-col items-center justify-center w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6 max-w-md sm:max-w-lg"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex justify-center">
            <motion.img
              src={TranslateLogo}
              alt="Translate logo"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
            />
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-2 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Welcome to Ancestro Translate.
            </h1>

            <div className="mt-1">
              <p className="text-xl sm:text-2xl font-semibold mb-1">
                <span className="bg-gradient-to-r from-[#ff4e00] to-orange-400 bg-clip-text text-transparent">
                  Break free from
                </span>
              </p>
              <p className="text-xl sm:text-2xl font-semibold">
                <span className="bg-gradient-to-r from-[#ff4e00] to-orange-400 bg-clip-text text-transparent">
                  Language Barriers
                </span>
              </p>
            </div>
          </motion.div>

          {/* Subtitle removed as requested */}

          {/* Language flags marquee (continuous scroll) - hidden on mobile */}
          <motion.div variants={itemVariants} className="pt-6 hidden sm:block">
            <div className="w-full overflow-hidden">
              <motion.div
                  // reduce spacing on mobile and flag sizes
                  className="flex items-center space-x-4 sm:space-x-6 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                {/* block 1 */}
                <div className="flex items-center space-x-4 pr-6">
              <div className="w-10 h-6 sm:w-12 sm:h-8 rounded-md overflow-hidden">
                    {/* Zambia (simplified) */}
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <rect width="60" height="30" fill="#006b3f" />
                      {/* vertical panel of red, black, orange near fly */}
                      <rect x="44" y="6" width="4" height="18" fill="#d40829" />
                      <rect x="48" y="6" width="4" height="18" fill="#000" />
                      <rect x="52" y="6" width="4" height="18" fill="#ff8c00" />
                      {/* simplified eagle */}
                      <path d="M36 7 L40 9 L38 11 L42 13 L36 13 L34 11 L36 9 Z" fill="#ff8c00" />
                    </svg>
                  </div>

                  <div className="w-10 h-6 sm:w-12 sm:h-8 rounded-md overflow-hidden">
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <rect width="60" height="30" fill="#012169" />
                      <rect y="12" width="60" height="6" fill="white" />
                      <rect x="24" width="12" height="30" fill="white" />
                      <rect y="13" width="60" height="4" fill="#C8102E" />
                      <rect x="25" width="10" height="30" fill="#C8102E" />
                    </svg>
                  </div>

                  <div className="w-10 h-6 sm:w-12 sm:h-8 rounded-md overflow-hidden">
                    <svg viewBox="0 0 30 20" className="w-full h-full">
                      <rect width="30" height="20" fill="#b22234"/>
                      <rect y="4" width="30" height="2" fill="white"/>
                      <rect y="8" width="30" height="2" fill="white"/>
                      <rect y="12" width="30" height="2" fill="white"/>
                      <rect width="12" height="8" fill="#3c3b6e"/>
                    </svg>
                  </div>

                  <div className="w-10 h-6 sm:w-12 sm:h-8 rounded-md overflow-hidden">
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <rect width="60" height="30" fill="#007749"/>
                      <polygon points="0,0 22,15 0,30" fill="#000"/>
                      <polygon points="0,0 12,15 0,30" fill="#ffb81c"/>
                      <rect x="22" width="38" height="30" fill="#de3831"/>
                    </svg>
                  </div>

                  <div className="w-10 h-6 sm:w-12 sm:h-8 rounded-md overflow-hidden flex items-center justify-center bg-white">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" fill="#2e0151" />
                      <path d="M2 12h20M12 2v20M4 6a16 16 0 0 0 16 0M4 18a16 16 0 0 1 16 0" stroke="#fff" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* block 2 (duplicate for seamless loop) */}
                <div className="flex items-center space-x-4 pr-6">
                  <div className="w-12 h-8 rounded-md overflow-hidden">
                    {/* Zambia (simplified) duplicate */}
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <rect width="60" height="30" fill="#006b3f" />
                      <rect x="44" y="6" width="4" height="18" fill="#d40829" />
                      <rect x="48" y="6" width="4" height="18" fill="#000" />
                      <rect x="52" y="6" width="4" height="18" fill="#ff8c00" />
                      <path d="M36 7 L40 9 L38 11 L42 13 L36 13 L34 11 L36 9 Z" fill="#ff8c00" />
                    </svg>
                  </div>

                  <div className="w-12 h-8 rounded-md overflow-hidden">
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <rect width="60" height="30" fill="#012169" />
                      <rect y="12" width="60" height="6" fill="white" />
                      <rect x="24" width="12" height="30" fill="white" />
                      <rect y="13" width="60" height="4" fill="#C8102E" />
                      <rect x="25" width="10" height="30" fill="#C8102E" />
                    </svg>
                  </div>

                  <div className="w-12 h-8 rounded-md overflow-hidden">
                    <svg viewBox="0 0 30 20" className="w-full h-full">
                      <rect width="30" height="20" fill="#b22234"/>
                      <rect y="4" width="30" height="2" fill="white"/>
                      <rect y="8" width="30" height="2" fill="white"/>
                      <rect y="12" width="30" height="2" fill="white"/>
                      <rect width="12" height="8" fill="#3c3b6e"/>
                    </svg>
                  </div>

                  <div className="w-12 h-8 rounded-md overflow-hidden">
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <rect width="60" height="30" fill="#007749"/>
                      <polygon points="0,0 22,15 0,30" fill="#000"/>
                      <polygon points="0,0 12,15 0,30" fill="#ffb81c"/>
                      <rect x="22" width="38" height="30" fill="#de3831"/>
                    </svg>
                  </div>

                  <div className="w-12 h-8 rounded-md overflow-hidden flex items-center justify-center bg-white">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" fill="#2e0151" />
                      <path d="M2 12h20M12 2v20M4 6a16 16 0 0 0 16 0M4 18a16 16 0 0 1 16 0" stroke="#fff" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="pt-6"
          >
              <motion.button
                onClick={onComplete}
                className="px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-[#ff4e00] to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started
              </motion.button>
          </motion.div>

          {/* Powered by line on splash screen */}
          <motion.div variants={itemVariants} className="pt-6">
            <p className="text-xs text-muted-foreground/80">Powered by Nestro Ai</p>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
