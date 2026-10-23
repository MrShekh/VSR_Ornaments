import { useId } from "react";

type ArtworkFragmentProps = {
  className?: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function ArtworkFragment({ className, x, y, width, height }: ArtworkFragmentProps) {
  const filterId = useId().replace(/:/g, "");
  return (
    <svg
      className={className}
      viewBox={`${x} ${y} ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          {/* White has no chroma; gold's blue channel is lower. Remove only the
              white matte in the artwork, independent of ancestor compositing. */}
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 -1 0 1" />
          <feComponentTransfer><feFuncA type="linear" slope="10" /></feComponentTransfer>
        </filter>
      </defs>
      <image href="/brand/vsr-logo-exact.png" width="447" height="401" filter={`url(#${filterId})`} />
    </svg>
  );
}

export function BrandEmblem() {
  return <ArtworkFragment className="brand-mark__emblem" x={27} y={112} width={176} height={176} />;
}

export function BrandWordmark() {
  return (
    <span className="brand-mark__text">
      <ArtworkFragment className="brand-mark__name" x={205} y={112} width={212} height={116} />
      <ArtworkFragment className="brand-mark__descriptor" x={218} y={230} width={190} height={23} />
      <ArtworkFragment className="brand-mark__tagline" x={203} y={255} width={216} height={20} />
    </span>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} role="img" aria-label="VSR Ornaments — An Eternal Elegance">
      <BrandEmblem />
      <BrandWordmark />
    </span>
  );
}
