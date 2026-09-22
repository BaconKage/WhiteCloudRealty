import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { HeroBackdrop } from "./HeroBackdrop";
import { cx } from "@/lib/format";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  /** Optional backdrop; without one the panel is flat ink. */
  image?: { src: string; alt: string; credit?: string; transitionName?: string };
  size?: "full" | "page";
  className?: string;
};

/**
 * Every page opens on this ink panel. Beyond the look, it is what lets the
 * sticky header sit transparently over the top of the page — see Header.
 *
 * The negative top margin pulls the panel up behind the header, and the
 * matching padding keeps the content clear of it.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  image,
  size = "page",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cx(
        "on-ink bg-ink-deep relative isolate -mt-18 overflow-hidden pt-18",
        className,
      )}
    >
      {image && (
        <>
          <HeroBackdrop src={image.src} transitionName={image.transitionName} />
          {/* Keep the copy side dark while allowing the architecture to retain
              detail on larger screens. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(11_17_25/0.94)_0%,rgb(11_17_25/0.76)_50%,rgb(11_17_25/0.52)_100%)] lg:bg-[linear-gradient(to_right,rgb(11_17_25/0.9)_0%,rgb(11_17_25/0.72)_52%,rgb(11_17_25/0.3)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(75%_55%_at_18%_88%,rgb(201_162_39/0.16),transparent_70%)]"
          />
          {/* Keeps the strip behind the transparent header dark enough for the
              nav to stay legible whatever the backdrop image does up there. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(to_bottom,rgb(11_17_25/0.85),transparent)]"
          />
        </>
      )}

      <Container
        className={cx(
          "relative flex flex-col justify-end",
          size === "full"
            ? "min-h-[clamp(34rem,88svh,52rem)] pt-20 pb-14 lg:pb-20"
            : "min-h-[22rem] pt-16 pb-14 lg:min-h-[26rem]",
        )}
      >
        {eyebrow && (
          <p className="eyebrow text-accent animate-(--animate-fade-up)">{eyebrow}</p>
        )}

        <h1
          className={cx(
            "mt-5 max-w-4xl leading-[0.98]",
            size === "full" ? "text-(length:--text-display)" : "text-(length:--text-h1)",
          )}
        >
          {/* The mask lets the headline rise into place from nothing. The
              padding keeps descenders off the clip edge. */}
          <span className="block overflow-hidden pb-[0.12em]">
            <span
              className="block animate-(--animate-rise)"
              style={{ animationDelay: "120ms" }}
            >
              {title}
            </span>
          </span>
        </h1>

        {lede && (
          <p
            className="text-muted mt-6 max-w-2xl animate-(--animate-fade-up) text-(length:--text-lede) leading-relaxed"
            style={{ animationDelay: "340ms" }}
          >
            {lede}
          </p>
        )}

        {children && (
          <div className="animate-(--animate-fade-up)" style={{ animationDelay: "480ms" }}>
            {children}
          </div>
        )}

        {image?.credit && (
          <p
            className="text-faint mt-10 animate-(--animate-fade-up) text-[0.6875rem] tracking-wide"
            style={{ animationDelay: "620ms" }}
          >
            {image.credit}
          </p>
        )}
      </Container>
    </section>
  );
}
