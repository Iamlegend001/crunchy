"use client";

import { useState } from "react";

const LINKS = [
  { label: "about us", href: "#about" },
  { label: "equipment", href: "#equipment" },
  { label: "contacts", href: "#contacts" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black";

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className={`group relative text-neutral-800 ${focusRing}`}
    >
      {label}
      <span
        aria-hidden
        className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 flex items-center justify-between px-5 py-6 md:px-10 lg:px-20 lg:py-10">
      <a
        href="#"
        className={`font-display text-2xl font-semibold text-black lg:text-[32px] ${focusRing}`}
      >
        CRUNCHY
      </a>

      <nav
        aria-label="Main"
        className="hidden gap-8 text-xl md:flex lg:gap-12 lg:text-2xl"
      >
        {LINKS.map((link) => (
          <NavLink key={link.href} {...link} />
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`flex size-11 flex-col items-center justify-center gap-1.5 md:hidden ${focusRing}`}
      >
        <span
          className={`h-0.5 w-6 bg-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-black transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-neutral-200 bg-white px-5 py-4 text-xl shadow-lg md:hidden"
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`py-3 text-neutral-800 ${focusRing}`}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
