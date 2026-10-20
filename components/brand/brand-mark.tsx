import Image from "next/image";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`} aria-label="VSR Ornaments — An Eternal Elegance">
      <Image
        className="brand-mark__exact"
        src="/brand/vsr-logo-exact.png"
        alt=""
        width={446}
        height={349}
        loading="eager"
        unoptimized
      />
    </span>
  );
}
