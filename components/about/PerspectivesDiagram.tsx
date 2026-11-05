import { ethos } from "@/content/founder";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The firm's idea, drawn: the client's side and the developer's side overlap,
 * and the logo's white disc sits where they meet. The circles slide together
 * when it scrolls into view, side by side on wide screens and stacked on phones.
 */
export function PerspectivesDiagram({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <Reveal variant="section" className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:aspect-[16/10] sm:max-w-3xl">
        <div className="persp-circle persp-a absolute top-0 left-1/2 flex aspect-square w-[74%] -translate-x-1/2 bg-brand text-ink flex-col items-center rounded-full px-8 pt-[12%] text-center sm:top-1/2 sm:left-0 sm:w-[58%] sm:translate-x-0 sm:-translate-y-1/2 sm:items-start sm:justify-center sm:pt-0 sm:pr-[24%] sm:pl-[9%] sm:text-left">
          <p className="font-display text-lg leading-snug sm:text-2xl">{ethos.sides[0].title}</p>
          <ul className="mt-2 space-y-0.5 text-xs sm:mt-3 sm:space-y-1 sm:text-sm">
            {ethos.sides[0].points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="persp-circle persp-b absolute bottom-0 bg-[#0f1723] text-white ring-1 ring-white/20 left-1/2 flex aspect-square w-[74%] -translate-x-1/2 flex-col items-center justify-end rounded-full px-8 pb-[12%] text-center mix-blend-normal sm:top-1/2 sm:right-0 sm:bottom-auto sm:left-auto sm:w-[58%] sm:translate-x-0 sm:-translate-y-1/2 sm:items-end sm:justify-center sm:pr-[9%] sm:pb-0 sm:pl-[24%] sm:text-right">
          <p className="font-display text-lg leading-snug sm:text-2xl">{ethos.sides[1].title}</p>
          <ul className="mt-2 space-y-0.5 text-xs text-white/75 sm:mt-3 sm:space-y-1 sm:text-sm">
            {ethos.sides[1].points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="persp-disc font-display absolute top-1/2 left-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-3 text-center text-sm leading-tight font-bold text-[#020202] shadow-[0_18px_40px_-14px_rgb(0_0_0/0.5)] sm:w-[23%] sm:text-lg">
          One shared vision.
        </div>
      </Reveal>
    </figure>
  );
}
