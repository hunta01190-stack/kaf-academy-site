"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 4500;

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  useEffect(() => {
    if (count < 2 || paused) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return undefined;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, [count, paused]);

  function go(step) {
    setIndex((current) => (current + step + count) % count);
  }

  return (
    <div
      className="slider"
      aria-roledescription="carousel"
      aria-label="KAF Academy class photos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slider__frame">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`slider__img${i === index ? " is-active" : ""}`}
            style={{ objectPosition: slide.position || "center" }}
            aria-hidden={i === index ? undefined : true}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {count > 1 && (
        <div className="slider__controls">
          <button
            type="button"
            className="slider__arrow"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            ←
          </button>

          <div className="slider__dots">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                className={`slider__dot${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className="slider__arrow"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
