"use client";

import { MotionConfig, motion, type Variants } from "motion/react";
import Navbar from "./Navbar";
import SoundVisual from "./SoundVisual";

// Edit the button text here.
const CTA_LABEL = "Book a session";

const textStack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-white">
        <Navbar />

        <div className="flex flex-1 flex-col lg:block">
          <div className="relative z-10 flex flex-1 items-center px-5 py-12 md:px-10 lg:min-h-[calc(100vh-7.5rem)] lg:w-1/2 lg:pl-20 lg:pr-0 lg:py-24">
            <motion.div
              className="flex flex-col"
              variants={textStack}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={fadeUp}
                className="font-display text-[clamp(2.25rem,3.7vw,4rem)] font-bold uppercase leading-[1.1] tracking-[0.06em] text-black"
              >
                <span className="text-[1.125em]">W</span>elcome to our sound
                studio
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex max-w-[34rem] flex-col gap-6 text-lg text-black lg:mt-14 lg:gap-8 lg:text-xl"
              >
                <p>
                  We create clean, rich, and professional sound for your
                  projects.
                </p>
                <p>
                  Recording, mixing, and mastering - everything you need to
                  bring your musical and audiovisual ideas to life.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 lg:mt-14">
                <motion.a
                  href="#contacts"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-4 font-display text-xl font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black lg:text-2xl"
                >
                  {CTA_LABEL}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          <SoundVisual />
        </div>
      </section>
    </MotionConfig>
  );
}
