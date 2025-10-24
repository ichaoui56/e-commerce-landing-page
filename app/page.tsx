import Hero from "@/components/hero"
import Banners from "@/components/banners"
import NewArrivalsWrapper from "@/components/new-arrivals-wrapper"
import ScrollAnimation from "@/components/scrool-animation"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { WhyChooseUs } from "@/components/why-choose-us"
import { NewsletterCTA } from "@/components/newsletter-cta"

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollAnimation delay={0} duration={0.5} once={true} className="">
        <Hero />
      </ScrollAnimation>

     {/* <ScrollAnimation delay={0.5} duration={0.5} once={true} className="">
        <Services />
      </ScrollAnimation> */}

      <ScrollAnimation delay={0.5} duration={0.5} once={true} className="">
        <Banners />
      </ScrollAnimation>

      <ScrollAnimation delay={1} duration={0.5} once={true} className="">
        <NewArrivalsWrapper />
      </ScrollAnimation>

      <ScrollAnimation delay={1} duration={0.5} once={true} className="">
        <StatsSection />
      </ScrollAnimation>

      <ScrollAnimation delay={0.2} duration={0.5} once={true} className="">
        <FeaturedCategories />
      </ScrollAnimation>

      <ScrollAnimation delay={0.2} duration={0.5} once={true} className="">
        <TestimonialsSection />
      </ScrollAnimation>

      <ScrollAnimation delay={0.2} duration={0.5} once={true} className="">
        <WhyChooseUs />
      </ScrollAnimation>

      <ScrollAnimation delay={0.2} duration={0.5} once={true} className="">
        <NewsletterCTA />
      </ScrollAnimation>
    </div>
  )
}
