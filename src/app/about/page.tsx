"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface Milestone {
  year: string;
  title: string;
  location: string;
  description: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    year: "2024 — Present",
    title: "Software Dev Engineer",
    location: "Amazon, Bangalore, India",
    description: <span className="text-foreground font-medium">Working on making Amazon Price Competitive</span>
  },
  {
    year: "2022 — 2024",
    title: "Software Engineer 1",
    location: "Fidelity National Information Services, Inc. (FIS), Bangalore, India",
    description: (
      <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
        <li>
          Managed and supported applications utilising Java, Spring, Spring Boot, Struts Framework, Spring Web Flow, JSP, HTML, JavaScript, Jira, Veracode Scans, and SQL. This resulted in notable improvements and faster resolution of Change Requests.
        </li>
        <li>
          Generated extensive technical documentation to facilitate a more efficient onboarding process for new team members.
        </li>
        <li>
          Executed code enhancements and bug repairs, leading to overall improvements in application performance and heightened customer satisfaction.
        </li>
      </ul>
    )
  },
  {
    year: "2022 — Present",
    title: "Mentor",
    location: "SURE Trust ProEd, Remote",
    description: (
      <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
        <li>
          Conducting classes on Data Structures and Algorithms, Core Java for BTech students, fostering a strong foundation in essential programming concepts.
        </li>
        <li>
          Delivering instructional sessions in Java programming, contributing to students' proficiency in this versatile language.
        </li>
        <li>
          Serving as a mentor and lead in the Innovation and Entrepreneurship Hub for Educated Rural Youth, guiding aspiring individuals in their entrepreneurial endeavours.
        </li>
        <li>
          Actively involved with the NGO, dedicating efforts to empower and educate rural youth through various educational initiatives.
        </li>
      </ul>
    )
  },
  {
    year: "2021 — 2022",
    title: "System Engineer",
    location: "Tata Consultancy Services (TCS), Bangalore, India",
    description: (
      <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
        <li>
          Part of implementation of Asset Servicing Products within TCS BaNCS for Capital Markets, 
          orchestrating the seamless processing of Corporate Actions for a diverse clientele in the US and UK.
        </li>
        <li>
          Leveraged a robust tech stack including JSP, HTML, CSS, Java, Spring, EJBs, SQL, and more to 
          design and test GUIs. Proactively accommodated client Change Requests while upholding system 
          integrity. Developed comprehensive unit test cases and low-level design documents, actively 
          engaging in effective problem resolution.
        </li>
        <li>
          Played a pivotal role in optimizing application performance by 25% through the implementation 
          of code enhancements and bug repairs. This led to heightened customer satisfaction and an improved 
          overall user experience.
        </li>
        <li>
          Applied advanced skills in multithreading and inter-process communication to enhance system speed, 
          scalability, and responsiveness, successfully meeting the demands of multiple Change Requests.
        </li>
      </ul>
    )
  },
  {
    year: "2016 — 2020",
    title: "B.Tech. in Computer Science & Engineering",
    location: "APJ Abdul Kalam Technological University, Kerala, India",
    description: (
      <>
        Graduated in Computer Science and Engineering. Specialized in computer architecture, 
        systems programming, and computer networks. Built a fully functional{" "}
        <a 
          href="https://github.com/lijojosef/traffic_congestion_control" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-emerald-500 hover:underline font-medium"
        >
          Traffic Congestion Control System
        </a>.
      </>
    )
  }
];

export default function AboutPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <main data-build="force-update-1" className="flex-1 bg-background text-foreground font-mono select-none tracking-tight">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >
          {/* Header & Avatar Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col-reverse md:flex-row gap-10 items-center justify-between"
          >
            <div className="space-y-4 max-w-2xl text-left">
              <p className="text-xs uppercase tracking-widest text-emerald-500 font-semibold animate-pulse">
                &gt;_ PROFILE_INIT // WHO_I_AM
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
                Hi, I'm Lijo Joseph.
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                A Software Dev Engineer focused on building highly-scalable cloud infrastructure, modular frontends, and performant developer experiences.
              </p>
            </div>
            
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-zinc-500 opacity-20 blur" />
              <img
                src="/images/profile_pic.jpeg"
                alt="Lijo Joseph"
                className="relative w-56 h-56 rounded-2xl object-cover border border-border bg-muted shadow-md"              />
            </div>
          </motion.div>

          {/* Detailed Biography */}
          <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-3 text-left">
            <div className="md:col-span-2 space-y-6 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <h2 className="text-xl font-bold text-foreground !my-0">
                // My Philosophy & Journey
              </h2>
              <p>
                I thrive at the intersection of infrastructure development and application engineering. For me, software engineering isn't just about writing code; it's about understanding how complex systems fail, scaling them reliably under load, and designing clean interfaces that developers love to use.
              </p>
              <p>
                Whether I'm deep-diving into terminal multiplexers (like my tmux setups), configuring sub-millisecond route response strategies, or designing isolated static compilation environments, I approach engineering with a relentless curiosity to master the stack from the hardware layer up to the DOM.
              </p>
              <p>
                This blog serves as my open digital garden—a space where I crystallize my mental models, detail cloud outages I've diagnosed, and share pragmatic tutorials to make complex concepts simpler.
              </p>
            </div>

            <div className="border border-border p-5 rounded-xl bg-muted/20 space-y-3 h-fit text-xs">
              <h3 className="font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                QUICK_FACTS //
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex justify-between border-b border-border/40 pb-1">
                  <span className="font-medium text-foreground">Location:</span>
                  <span>Bangalore, India</span>
                </li>
                <li className="flex justify-between border-b border-border/40 pb-1">
                  <span className="font-medium text-foreground">Editor:</span>
                  <span>Neovim / Tmux</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-foreground">Status:</span>
                  <span className="text-emerald-500 font-bold">Building & Learning</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Interactive Scroll Timeline Section */}
          <motion.div variants={itemVariants} className="space-y-12 text-left">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-emerald-500 font-semibold">
                EXECUTION_TIMELINE // HISTORY
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight !my-0">
                Career Milestone Map
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground font-light max-w-2xl">
                A chronological look at my educational background and engineering career milestone trajectory.
              </p>
            </div>

            {/* Vertical Timeline container */}
            <div className="relative mt-16 pl-8 md:pl-0">
              {/* Central Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-zinc-500 to-zinc-200 dark:to-zinc-800" />

              <div className="space-y-16">
                {milestones.map((milestone, index) => {
                  const isEven = index % 2 === 0;
                  
                  const cardVariants: Variants = {
                    hidden: { 
                      opacity: 0, 
                      y: 20
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.7 }
                    }
                  };

                  return (
                    <div 
                      key={index} 
                      className="relative md:grid md:grid-cols-2 md:gap-12"
                    >
                      {/* Circle indicator on the timeline */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-center w-3 h-3 rounded-full border-2 border-background bg-emerald-500 shadow-sm z-10" />

                      {/* Content Placement */}
                      {/* Desktop Left Side Card */}
                      <div className={`md:flex md:justify-end ${isEven ? "" : "md:invisible md:h-0 md:overflow-hidden md:pointer-events-none"}`}>
                        {isEven && (
                          <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-120px" }}
                            className="border border-border p-5 rounded-xl bg-muted/10 hover:border-emerald-500/30 transition-all max-w-md w-full space-y-2"
                          >
                            <span className="text-xs font-bold text-emerald-500 block">{milestone.year}</span>
                            <h3 className="text-base font-bold text-foreground !my-0">{milestone.title}</h3>
                            <h4 className="text-xs font-normal text-muted-foreground italic !mt-0.5">{milestone.location}</h4>
                            <div className="text-xs md:text-sm text-muted-foreground pt-2 leading-relaxed border-t border-border/40">{milestone.description}</div>
                          </motion.div>
                        )}
                      </div>

                      {/* Desktop Right Side Card */}
                      <div className={`md:flex md:justify-start ${!isEven ? "" : "md:invisible md:h-0 md:overflow-hidden md:pointer-events-none"}`}>
                        {!isEven && (
                          <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-120px" }}
                            className="border border-border p-5 rounded-xl bg-muted/10 hover:border-emerald-500/30 transition-all max-w-md w-full space-y-2"
                          >
                            <span className="text-xs font-bold text-emerald-500 block">{milestone.year}</span>
                            <h3 className="text-base font-bold text-foreground !my-0">{milestone.title}</h3>
                            <h4 className="text-xs font-normal text-muted-foreground italic !mt-0.5">{milestone.location}</h4>
                            <div className="text-xs md:text-sm text-muted-foreground pt-2 leading-relaxed border-t border-border/40">{milestone.description}</div>
                          </motion.div>
                        )}
                      </div>

                      {/* Mobile Card Layout (Active only on small viewports) */}
                      <div className="block md:hidden">
                        <motion.div
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-120px" }}
                          className="border border-border p-5 rounded-xl bg-muted/10 hover:border-emerald-500/30 transition-all w-full space-y-2"
                        >
                          <span className="text-xs font-bold text-emerald-500 block">{milestone.year}</span>
                          <h3 className="text-base font-bold text-foreground !my-0">{milestone.title}</h3>
                          <h4 className="text-xs font-normal text-muted-foreground italic !mt-0.5">{milestone.location}</h4>
                          <div className="text-xs md:text-sm text-muted-foreground pt-2 leading-relaxed border-t border-border/40">{milestone.description}</div>
                        </motion.div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Specialties / Core Focus Area */}
          <motion.div variants={itemVariants} className="space-y-6 text-left">
            <h2 className="text-xl font-bold tracking-tight text-foreground">// Core Areas of Focus</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-border p-5 rounded-xl space-y-2 bg-muted/10">
                <div className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">λ</span> Distributed Systems
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Designing highly resilient distributed setups, cloud API topologies, and multi-region microservice communication systems.
                </p>
              </div>

              <div className="border border-border p-5 rounded-xl space-y-2 bg-muted/10">
                <div className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">☁</span> Cloud Infrastructure
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automating cloud provisioning, managing containers orchestrators, and continuous integration/delivery loops (CI/CD).
                </p>
              </div>

              <div className="border border-border p-5 rounded-xl space-y-2 bg-muted/10">
                <div className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">⚛</span> Modern Web UX
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Crafting hyper-optimized web user interfaces leveraging Next.js React patterns, strict TypeScript typing, and accessible design systems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-between border-t border-border pt-12 gap-6"
          >
            <div className="space-y-1 text-center sm:text-left font-mono">
              <h3 className="font-bold text-lg text-foreground">Let's build something together</h3>
              <p className="text-xs text-muted-foreground">Available for architectural advisory, cloud configuration consulting, or custom panel events.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center max-w-xs sm:max-w-none">
              <a
                href="https://github.com/lijojosef"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-muted/40 transition-colors bg-background text-center"
              >
                [CONNECT_VIA_GITHUB]
              </a>
              <a
                href="/"
                className="border border-emerald-500/30 text-emerald-500 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-emerald-500/[0.04] transition-colors bg-background text-center"
              >
                [BACK TO BLOG]
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
