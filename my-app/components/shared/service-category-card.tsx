import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import { LucideProps, Sparkles } from "lucide-react";
import { ServiceCategory } from "@/lib/types";

type IconName = keyof typeof Icons;

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  if (name === "Dress") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2a2 2 0 0 0-2 2v1" />
        <path d="M6 7h12l-1 5 3 8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1l3-8z" />
        <path d="M10 7a2 2 0 0 0 4 0" />
      </svg>
    );
  }

  const Icon = (
    Icons as unknown as Record<IconName, React.ComponentType<LucideProps>>
  )[name as IconName];
  if (!Icon) return <Sparkles {...props} />;
  return <Icon {...props} />;
}

function getCategoryImage(slug: string): string {
  switch (slug) {
    case "wedding-planners":
      return "/WeddingPlanner.png";
    case "event-planners":
      return "/Eventplanner.png";
    case "decorators":
    case "stage-decorators":
    case "backdrop-designers":
    case "floral-decorators":
      return "/Decrators.png";
    case "caterers":
      return "/Cateres.png";
    case "bakers":
      return "/Bakers.png";
    case "specialty-food-vendors":
      return "/Spfoodvendor.png";
    case "photographers":
      return "/Photography.png";
    case "videographers":
      return "/Videographer.png";
    case "drone-photography":
      return "/Drone.png";
    case "djs":
    case "sound-systems":
      return "/Dj.png";
    case "singers":
      return "/singer.png";
    case "anchors-hosts":
      return "/Anchor.png";
    case "dance-groups":
      return "/Dance.png";
    case "makeup-artists":
      return "/Makeup.jpeg";
    case "hair-stylists":
      return "/hairstylist.png";
    case "mehendi-artists":
      return "/Mehendi.png";
    case "bridal-wear":
      return "/bridal.png";
    case "groom-wear":
      return "/Groom.png";
    case "gifts":
      return "/Gift.png";
    case "vessels-chairs-rental":
      return "/Cateres.png";
    case "cabs-vans-rental":
      return "/Eventplanner.png";
    case "banner-designers":
    case "banner-printing":
      return "/Banner.png";
    case "invitation-designers":
    case "presentation-designers":
    case "poster-designers":
    case "flyer-designers":
    case "stage-backdrop-designers":
    case "digital-creative-designers":
    case "social-media-creative-designers":
    case "invitation-printing":
    case "poster-printing":
    case "brochure-printing":
    case "standee-printing":
    case "certificate-printing":
      return "/Invitation.png";
    default:
      return "/WeddingPlanner.png"; // Fallback image
  }
}

export function ServiceCategoryCard({
  category,
}: {
  category: ServiceCategory;
}) {
  const imageUrl = getCategoryImage(category.slug);

  return (
    <Link
      href={`/services/${category.slug}`}
      className="group flex flex-col rounded-[2rem] border border-border bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-rose/20 hover:shadow-xl hover:shadow-rose/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
    >
      {/* Image Banner */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt="" /* Left empty as the link text already provides the descriptive name for screen readers, preventing redundant readouts. */
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Body */}
      <div className="relative flex flex-col items-start px-5 pt-7 pb-6 text-left">
        {/* Floating Pink Circular Icon (White bg, rose border, rose icon) */}
        <div className="absolute left-4 -top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose bg-white shadow-md shadow-rose/10 text-rose" aria-hidden="true">
          <CategoryIcon
            name={category.icon}
            className="h-5 w-5 text-rose transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="text-base font-bold tracking-tight text-charcoal leading-snug">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-charcoal/80 leading-relaxed">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
