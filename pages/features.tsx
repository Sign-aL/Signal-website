import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Features() {
  const featureCards = [
    {
      title: "ASL Finger Spelling Detection",
      description: "Advanced detection of one-handed American Sign Language finger spelling using sensor data from a specialized glove.",
      color: "primary"
    },
    {
      title: "Sensor Visualization",
      description: "Real-time visualization of flex sensors and gyroscope data, allowing users to see how the system interprets their movements.",
      color: "primary"
    },
    {
      title: "Gemini AI Integration", 
      description: "Integration with Google's Vertex AI Gemini for accurate and fast interpretation of sign language gestures and patterns.",
      color: "primary"
    },
    {
      title: "Modern UI",
      description: "Clean, intuitive interface built with Material Design 3 and Jetpack Compose, providing an excellent user experience.",
      color: "primary"
    },
    {
      title: "Hardware Concept",
      description: "Innovative hardware design includes 5 flex sensors (one for each finger), GY-91 MPU9050 module for orientation detection, microcontroller, and Bluetooth module.",
      color: "primary"
    },
    {
      title: "Future Development",
      description: "Planned features include expanded sign language vocabulary, real-time translation, and community features for sharing and improving detection.",
      color: "primary"
    }
  ];

  const stackItems = [
    { 
      title: "Android Development", 
      description: "Kotlin + Jetpack Compose",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      title: "AI Integration", 
      description: "Google Vertex AI Gemini API + Gemma",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ) 
    },
    { 
      title: "UI Framework", 
      description: "Material Design 3",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ) 
    },
    { 
      title: "Architecture", 
      description: "MVVM (Model-View-ViewModel)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ) 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout title="Features - Signal">
      <section className="section-light py-28">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <span className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-blue-50 opacity-70"></span>
              <span className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-blue-50 opacity-70"></span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 relative">
                <span className="block accent-text text-5xl md:text-7xl highlight">
                  Signal Features
                </span>
              </h1>
            </div>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-700">
              Innovative technology for sign language interpretation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-colored py-24">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-24 bg-white rounded-t-3xl -mt-24 mb-12 subtle-pattern"></div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="card-3d"
              >
                <Card className="h-full card-hover shadow-md border-2 border-blue-100 bg-white">
                  <CardHeader className="relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full -mr-5 -mt-5 opacity-50"></div>
                    <div className="flex items-center mb-2 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-slate-100 font-semibold shadow-md">
                        {index + 1}
                      </div>
                      <CardTitle className="ml-4 accent-text">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-800">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-light py-24 subtle-pattern">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Technology <span className="accent-text highlight">Stack</span>
          </motion.h2>
          
          <Card className="shadow-lg border-2 border-blue-100 bg-white">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-full -ml-10 -mt-10 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mb-10 opacity-50"></div>
            <CardContent className="p-8 relative z-10">
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                {stackItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shrink-0 shadow-md">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold accent-text">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="section-colored py-24">
        <div className="content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to experience <span className="accent-text highlight">Signal</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 mb-10"
          >
            Join us in our mission to make sign language interpretation accessible to everyone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 -m-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full transform rotate-3"></div>
            <Button className="bg-primary/80 hover:bg-primary text-slate-100 font-semibold px-8 py-6 text-lg rounded-full shadow-md relative z-10" asChild>
              <a href="/" className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Home
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 