import Image from "next/image";
import Link from "next/link";
import { Gift, PackageCheck, Sparkles } from "lucide-react";
import { MotionOrchestrator } from "@/components/animations/motion-orchestrator";
import { EditorialLink } from "@/components/ui/editorial-link";
import { ProductImage } from "@/components/product/product-image";
import { ProductGrid } from "@/components/product/product-grid";
import { CraftsmanshipStory } from "./craftsmanship-story";
import { filterProducts, products } from "@/data/products";

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VSR Ornaments",
  url: "https://www.vsrornaments.com",
  logo: "https://www.vsrornaments.com/brand/vsr-logo-exact.png",
  description: "Independent fine jewellery house shaped by light, form and Indian craftsmanship.",
};

export function HomePage() {
  return (
    <main id="main-content">
      <MotionOrchestrator />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero">
        <div className="hero-media">
          <Image
            src="/images/campaign-hero-cream-v2.png"
            alt="VSR Ornaments model wearing the sculptural Arc diamond necklace"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">FINE JEWELLERY · FORM I</p>
          <h1>SHAPED<br /><em>BY LIGHT.</em></h1>
          <p>Objects of lasting beauty, composed in diamonds and precious metal.</p>
          <EditorialLink href="/collections">Discover the collection</EditorialLink>
        </div>
        <p className="hero-index">VSR / 01</p>
        <a href="#categories" className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></a>
      </section>

      <section className="category-pair" id="categories">
        <Link href="/collections?category=rings" className="category-panel" data-cursor="DISCOVER">
          <div className="category-panel__image" data-image-reveal>
            <Image src="/images/campaign-ring-cream-v2.png" alt="Oval diamond engagement ring" fill sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="category-panel__copy">
            <p>01 / Engagement</p><h2>RINGS OF<br /><em>INTENTION</em></h2><span>Discover ↗</span>
          </div>
        </Link>
        <Link href="/collections?category=earrings" className="category-panel category-panel--dark" data-cursor="DISCOVER">
          <div className="category-panel__image" data-image-reveal>
            <Image src="/images/campaign-earring-cream-v2.png" alt="Diamond drop earring in profile" fill sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="category-panel__copy category-panel__copy--light">
            <p>02 / High jewellery</p><h2>DIAMONDS<br /><em>IN MOTION</em></h2><span>Discover ↗</span>
          </div>
        </Link>
      </section>

      <section className="product-ribbon section-space">
        <div className="section-head" data-reveal>
          <div><p className="eyebrow">A study in essentials</p><h2>PIECES OF NOTE</h2></div>
          <EditorialLink href="/collections">View all jewellery</EditorialLink>
        </div>
        <div className="product-ribbon__track">
          {products.slice(0, 5).map((product) => (
            <Link href={`/product/${product.slug}`} key={product.slug} className="ribbon-piece" data-cursor="EXPLORE">
              <ProductImage product={product} />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="manifesto section-space">
        <p className="eyebrow" data-reveal>THE VSR PERSPECTIVE</p>
        <div className="manifesto__lines">
          <div className="manifesto-line" data-reveal>JEWELLERY IS NOT ONLY <span className="inline-image"><Image src="/images/campaign-ring-cream-v2.png" alt="" fill sizes="8vw" /></span> AN OBJECT.</div>
          <div className="manifesto-line" data-reveal>IT IS A MEMORY HELD IN FORM,</div>
          <div className="manifesto-line" data-reveal>AN INTIMATE LANGUAGE OF <span className="inline-image inline-image--cool"><Image src="/images/campaign-earring-cream-v2.png" alt="" fill sizes="8vw" /></span> LIGHT,</div>
          <div className="manifesto-line" data-reveal>CRAFTED TO OUTLIVE THE MOMENT.</div>
        </div>
        <p className="manifesto__note" data-reveal>Every proportion is considered. Every stone is selected. Every surface is finished by hand.</p>
      </section>

      <section className="editorial-collage section-space">
        <div className="collage-image collage-image--left" data-parallax="36" data-image-reveal>
          <Image src="/images/campaign-earring-cream-v2.png" alt="Diamond earring study" fill sizes="28vw" />
        </div>
        <div className="collage-image collage-image--center" data-parallax="22" data-image-reveal data-cursor="VIEW">
          <Image src="/images/campaign-ring-cream-v2.png" alt="Diamond ring campaign" fill sizes="42vw" />
        </div>
        <div className="collage-image collage-image--right" data-parallax="-42" data-image-reveal>
          <Image src="/images/campaign-hero-cream-v2.png" alt="Sculptural diamond necklace" fill sizes="30vw" />
        </div>
        <p className="eyebrow collage-kicker">FORM / LIGHT / BALANCE</p>
        <h2 className="collage-title" data-reveal>THE ART<br /><em>OF FORM</em></h2>
        <div className="collage-footer">
          <span>THE HOUSE / CHAPTER I</span>
          <EditorialLink href="/about">Enter our world</EditorialLink>
        </div>
      </section>

      <section className="house-section section-space">
        <div className="house-section__heading" data-reveal>
          <p className="eyebrow">The house</p>
          <h2>A WORLD<br /><em>OF JEWELLERY</em></h2>
        </div>
        <div className="house-section__image house-section__image--one" data-image-reveal data-parallax="34">
          <Image src="/images/campaign-hero-cream-v2.png" alt="VSR Ornaments house campaign" fill sizes="54vw" />
        </div>
        <div className="house-section__copy" data-reveal>
          <p>Founded on the belief that restraint can hold extraordinary emotion, VSR brings Indian handcraft into a precise contemporary language.</p>
          <EditorialLink href="/about">The VSR story</EditorialLink>
        </div>
        <div className="house-section__image house-section__image--two" data-image-reveal data-parallax="-30">
          <Image src="/images/campaign-earring-cream-v2.png" alt="Diamond earring portrait" fill sizes="30vw" />
        </div>
      </section>

      <section className="campaign-stage section-space">
        <p className="campaign-word campaign-word--left">SIGNATURE</p>
        <p className="campaign-word campaign-word--right">COLLECTION</p>
        <div className="campaign-stage__image" data-image-reveal data-parallax="44">
          <Image src="/images/campaign-signature-cream-v2.png" alt="The Signature Collection campaign" fill sizes="70vw" />
        </div>
        <div className="campaign-stage__caption" data-reveal>
          <p className="eyebrow">VSR / Autumn 2026</p>
          <h2>THE SIGNATURE COLLECTION</h2>
          <EditorialLink href="/collections">Discover</EditorialLink>
        </div>
      </section>

      <CraftsmanshipStory />

      <section className="signature section-space">
        <div className="signature__head" data-reveal>
          <p className="eyebrow">The latest edit</p>
          <h2>NEW<br /><em>ARRIVALS</em></h2>
          <p>Forms created to transcend seasons and gather meaning over time.</p>
        </div>
        <ProductGrid items={filterProducts({ newOnly: true, sort: "new" })} compact />
        <div className="signature__cta"><EditorialLink href="/collections?new=1&sort=new">Explore new arrivals</EditorialLink></div>
      </section>

      <section className="bespoke-panel">
        <Image src="/images/campaign-signature-cream-v2.png" alt="VSR Ornaments bespoke jewellery" fill sizes="100vw" />
        <div className="bespoke-panel__copy" data-reveal>
          <p className="eyebrow">Bespoke / Private commission</p>
          <h2>CREATED<br /><em>FOR ONE.</em></h2>
          <p>A singular piece, shaped around your stone, your story and the way you choose to wear it.</p>
          <EditorialLink href="/bespoke">Begin your journey</EditorialLink>
        </div>
      </section>

      <section className="services">
        {[
          { icon: Sparkles, title: "Bespoke service", text: "Personal jewellery created exclusively for you.", href: "/bespoke" },
          { icon: PackageCheck, title: "Worldwide delivery", text: "Secure, insured and carefully handled delivery.", href: "/contact" },
          { icon: Gift, title: "Luxury packaging", text: "Every piece arrives in considered presentation.", href: "/about" },
        ].map(({ icon: Icon, title, text, href }) => (
          <article key={title} data-reveal>
            <Icon size={23} strokeWidth={1} />
            <h3>{title}</h3><p>{text}</p><EditorialLink href={href}>Discover</EditorialLink>
          </article>
        ))}
      </section>

      <section className="newsletter">
        <Image src="/images/campaign-signature-cream-v2.png" alt="VSR Ornaments private invitation" fill sizes="100vw" />
        <div className="newsletter__inner" data-reveal>
          <p className="eyebrow">A private invitation</p>
          <h2>JOIN OUR WORLD.</h2>
          <p>Private releases, new collections and stories from the atelier.</p>
          <form><label><span className="sr-only">Email address</span><input type="email" placeholder="YOUR EMAIL ADDRESS" required /></label><button type="submit" aria-label="Subscribe">↗</button></form>
        </div>
      </section>
    </main>
  );
}
