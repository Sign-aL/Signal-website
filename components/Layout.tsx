import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Signal - Sign Language Interpretation System' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Signal is a sign language interpretation system that uses a glove with sensors to detect American Sign Language (ASL) finger spelling." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main 
            key={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-grow pt-16 overflow-hidden"
          >
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
              <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute top-[40%] right-[25%] w-40 h-40 bg-indigo-50 rounded-full opacity-20 blur-2xl"></div>
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 