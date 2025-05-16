import React from 'react';
import Layout from '../components/Layout';
import YouTubePlayer from '../components/YouTubePlayer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Layout>
      <section className="section-light py-28">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
            >
              <div className="relative inline-block">
                <span className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-blue-50 opacity-70"></span>
                <span className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-blue-50 opacity-70"></span>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 relative">
                  <span className="block">Welcome to</span>
                  <span className="block accent-text text-5xl md:text-7xl highlight">
                    Signal
                  </span>
                </h1>
              </div>
            </motion.div>
            
            <motion.p 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={1}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-600"
            >
              Bridging communication gaps with innovative sign language technology.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-wrap justify-center gap-6"
            >
              <Link href="/features">
                <Button className="bg-primary/70 hover:bg-primary/80 text-slate-800 font-semibold px-8 py-6 text-lg rounded-full shadow-md">
                  Explore Features
                </Button>
              </Link>
              <a href="#about">
                <Button variant="outline" className="border-primary/70 text-primary hover:bg-primary/5 px-8 py-6 text-lg rounded-full">
                  Learn More
                </Button>
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={2}
            className="my-16 relative"
          >
            <div className="absolute inset-0 -m-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl transform -rotate-1"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-center mb-10 accent-text">Watch Our Demo</h2>
              <YouTubePlayer defaultVideoId="QGMFzltjygM" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section-colored py-24">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-center mb-12"
          >
            About <span className="accent-text highlight">Signal</span>
          </motion.h2>
          
          <div className="prose prose-lg max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="p-6 border-2 border-blue-100 shadow-lg bg-primary">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/30 rounded-full -mr-5 -mt-5 z-0"></div>
                <p className="text-white leading-relaxed relative z-10 text-lg">
                  The Signal App is a sign language interpretation system that uses a glove with sensors to detect 
                  American Sign Language (ASL) finger spelling. This innovative technology aims to bridge communication 
                  gaps for people who use sign language.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <Card className="p-6 border-2 border-blue-100 shadow-lg bg-primary">
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-400/30 rounded-full -ml-5 -mb-5 z-0"></div>
                <p className="text-white leading-relaxed relative z-10 text-lg">
                  Using advanced sensor technology and AI integration with Google&apos;s Vertex AI Gemini, 
                  Signal translates sign language in real-time, making communication more accessible for everyone.
                </p>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex justify-center"
            >
              <Link href="/features">
                <Button className="bg-primary/60 hover:bg-primary/70 text-slate-800 font-semibold px-6 py-5 rounded-full shadow-md group">
                  <span>Explore Features</span>
                  <motion.span 
                    className="inline-block ml-2 group-hover:translate-x-1"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >→</motion.span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-light py-24 subtle-pattern">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose <span className="accent-text highlight">Signal</span>?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Accessibility",
                description: "Breaking down communication barriers for the deaf and hard of hearing community.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                delay: 0.1
              },
              {
                title: "Innovation",
                description: "Combining cutting-edge hardware with state-of-the-art AI technology.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                delay: 0.3
              },
              {
                title: "Inclusivity",
                description: "Empowering effective communication between sign language users and others.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                delay: 0.5
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: item.delay }}
              >
                <Card className="h-full card-hover shadow-md border-2 border-blue-100 bg-white">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-blue-50 shadow-inner">
                        {item.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-center accent-text">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base text-[var(--card-text)]">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.7 }}
            className="mt-16 text-center"
          >
            <Link href="/features">
              <Button variant="outline" className="border-primary/70 text-primary hover:bg-primary/5 rounded-full px-6 py-3 shadow-sm group">
                <span>See All Features</span>
                <motion.span 
                  className="inline-block ml-1 text-primary group-hover:translate-x-1"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >→</motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partners and Sponsors Section */}
      <section className="section-colored py-16">
        <div className="content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our <span className="accent-text highlight">Partners</span>
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
            {[
              { name: "Google Solution Challenge", src: "/images/logos/google-solution-challenge.svg", width: 120, height: 60 },
              { name: "Hack2Skill", src: "/images/logos/hack2skill.svg", width: 120, height: 60 },
              { name: "Google", src: "/images/logos/google.svg", width: 120, height: 60 }
            ].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="relative h-16 w-32">
                  <Image 
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-sm text-gray-600"
          >
            Proud participant in the Google Solution Challenge, powered by Google technologies including Gemini and Gemma.
          </motion.p>
        </div>
      </section>
    </Layout>
  );
}
