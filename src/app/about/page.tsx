"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Milestone {
  year: string;
  title: string;
  location: string;
  description: React.ReactNode;
}

const milestones: Milestone[] = [
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
          className="text-emerald-600 hover:underline font-medium"
        >
          Traffic Congestion Control System
        </a>.
      </>
    )
  },
  {
    year: "2021 — 2022",
    title: "System Engineer",
    location: "Tata Consultancy Services (TCS), Bangalore, India",
    description: (
      <ul className="list-disc pl-5 space-y-2 mt-2 text-zinc-600 dark:text-zinc-300">
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
    year: "2022 — Present",
    title: "Mentor",
    location: "SURE Trust ProEd, Remote",
    description: (
      <ul className="list-disc pl-5 space-y-2 mt-2 text-zinc-600 dark:text-zinc-300">
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
          Actively involved with the NGO since March 2023, dedicating efforts to empower and educate rural youth through various educational initiatives
        </li>
      </ul>
    )
  },
  {
    year: "2022 — 2024",
    title: "Software Engineer 1",
    location: "Fidelity National Information Services, Inc. (FIS), Bangalore, India",
    description: (
      <ul className="list-disc pl-5 space-y-2 mt-2 text-zinc-600 dark:text-zinc-300">
        <li>
          Managed and supported applications utilising Java, Spring, Spring Boot, Struts Framework, Spring Web Flow, JSP, HTML, JavaScript, Jira, Veracode Scans, and SQL. This resulted in notable improvements and faster resolution of Change Requests.</li>
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
    year: "2024 — Present",
    title: "Software Dev Engineer",
    location: "Amazon, Bangalore, India",
    description: "Working on making Amazon Price Competitive"
  }
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <main className="flex-1">
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
            className="flex flex-col-reverse md:flex-row gap-10 items-start justify-between"
          >
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-emerald-600">
                Who I Am
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Hi, I'm Lijo Joseph.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A Software Dev Engineer focused on building highly-scalable cloud infrastructure, modular frontends, and performant developer experiences.
              </p>
            </div>
            
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-30 blur group-hover:opacity-55 transition-opacity duration-300" />
              <img
                src="/images/authors/lijo.jpg"
                alt="Lijo Joseph"
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border border-border bg-muted shadow-md"
              />
            </div>
          </motion.div>

          {/* Detailed Biography */}
          <motion.div variants={itemVariants} className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6 text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h2 className="text-xl font-bold text-foreground font-sans">
                My Philosophy & Journey
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

            <div className="border border-border p-6 rounded-xl bg-muted/20 space-y-4 h-fit">
              <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                Quick Facts
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="font-medium text-foreground">Location:</span>
                  <span>Bangalore, India</span>
                </li>
                <li className="flex justify-between border-b border-border/50 pb-1.5">
                  <span className="font-medium text-foreground">Editor:</span>
                  <span>Neovim / Tmux</span>
                </li>
                <li className="flex justify-between pb-1.5">
                  <span className="font-medium text-foreground">Status:</span>
                  <span>Building & Learning</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Interactive Scroll Timeline Section */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="space-y-3">
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-emerald-600">
                Timeline
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">Career Map</h2>
              <p className="text-muted-foreground max-w-2xl">
                A chronological look at my educational background and engineering career milestone trajectory.
              </p>
            </div>

            {/* Vertical Timeline container */}
            <div className="relative mt-16 pl-8 md:pl-0">
              {/* Central Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-teal-500 to-zinc-200 dark:to-zinc-800" />

              <div className="space-y-16">
                {milestones.map((milestone, index) => {
                  const isEven = index % 2 === 0;
                  
                  // Animation settings for entries
                  const cardVariants = {
                    hidden: { 
                      opacity: 0, 
                      x: 0,
                      y: 20
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
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
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-center w-6 h-6 rounded-full border-4 border-background bg-emerald-600 shadow-md z-10" />

                      {/* Content Placement */}
                      {/* Desktop Left Side Card */}
                      <div className={`md:flex md:justify-end ${isEven ? "" : "md:invisible md:h-0 md:overflow-hidden md:pointer-events-none"}`}>
                        {isEven && (
                          <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-120px" }}
                            className="border border-border p-6 rounded-2xl bg-muted/10 hover:bg-muted/30 transition-all shadow-sm max-w-md w-full"
                          >
                            <span className="text-xs font-mono text-emerald-600 font-bold block mb-2">{milestone.year}</span>
                            <h3 className="text-lg font-bold text-foreground">{milestone.title}</h3>
                            <h4 className="text-sm font-semibold text-muted-foreground mt-0.5 mb-3">{milestone.location}</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{milestone.description}</p>
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
                            className="border border-border p-6 rounded-2xl bg-muted/10 hover:bg-muted/30 transition-all shadow-sm max-w-md w-full"
                          >
                            <span className="text-xs font-mono text-emerald-600 font-bold block mb-2">{milestone.year}</span>
                            <h3 className="text-lg font-bold text-foreground">{milestone.title}</h3>
                            <h4 className="text-sm font-semibold text-muted-foreground mt-0.5 mb-3">{milestone.location}</h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{milestone.description}</p>
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
                          className="border border-border p-6 rounded-2xl bg-muted/10 hover:bg-muted/30 transition-all shadow-sm w-full"
                        >
                          <span className="text-xs font-mono text-emerald-600 font-bold block mb-2">{milestone.year}</span>
                          <h3 className="text-lg font-bold text-foreground">{milestone.title}</h3>
                          <h4 className="text-sm font-semibold text-muted-foreground mt-0.5 mb-3">{milestone.location}</h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{milestone.description}</p>
                        </motion.div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Specialties / Core Focus Area */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Core Areas of Focus</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border border-border p-5 rounded-xl space-y-2.5 bg-muted/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                  λ
                </div>
                <h3 className="font-bold">Distributed Systems</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Designing highly resilient distributed setups, cloud API topologies, and multi-region microservice communication systems.
                </p>
              </div>

              <div className="border border-border p-5 rounded-xl space-y-2.5 bg-muted/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                  ☁
                </div>
                <h3 className="font-bold">Cloud Infrastructure</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automating cloud provisioning, managing containers orchestrators, and continuous integration/delivery loops (CI/CD).
                </p>
              </div>

              <div className="border border-border p-5 rounded-xl space-y-2.5 bg-muted/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                  ⚛
                </div>
                <h3 className="font-bold">Modern Web UX</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-lg">Let's build something together</h3>
              <p className="text-sm text-muted-foreground">Feel free to reach out for architectural advisory or speaking events.</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/lijojosef"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                GitHub
              </a>
              <Link
                href="/"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Back to Blog
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
