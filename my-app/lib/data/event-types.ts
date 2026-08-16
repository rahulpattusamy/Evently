import { EventType } from "@/lib/types";

export const eventTypes: EventType[] = [
  // Family & Personal
  {
    slug: "weddings",
    name: "Weddings",
    group: "Family & Personal",
    description: "Grand celebrations for the biggest day of your life",
    image:
      "https://images.unsplash.com/photo-1727430256509-0f897d6f4765?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0",
    featured: true,
  },
  {
    slug: "engagements",
    name: "Engagements",
    group: "Family & Personal",
    description: "Elegant ring ceremonies and engagement parties",
    image:
      "https://images.unsplash.com/photo-1504257234803-3fa883dcdcc1?w=800&q=80",
    featured: true,
  },
  {
    slug: "birthdays",
    name: "Birthdays",
    group: "Family & Personal",
    description: "Fun, memorable birthday parties for all ages",
    image:
      "https://images.unsplash.com/photo-1578922864601-79dcc7cbcea9?w=800&q=80",
    featured: true,
  },
  {
    slug: "baby-showers",
    name: "Baby Showers",
    group: "Family & Personal",
    description: "Sweet celebrations to welcome the little one",
    image:
      "https://images.unsplash.com/photo-1528218635780-5952720c9729?w=800&q=80",
    featured: true,
  },

  {
    slug: "family-functions",
    name: "Family Functions",
    group: "Family & Personal",
    description: "Naming ceremonies, get-togethers and family events",
    image:
      "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=800&q=80",
  },
  {
    slug: "private-parties",
    name: "Private Parties",
    group: "Family & Personal",
    description: "Intimate private celebrations, done right",
    image:
      "https://images.unsplash.com/photo-1485872299829-c673f5194813?w=800&q=80",
    featured: true,
  },

  // Corporate
  {
    slug: "office-parties",
    name: "Office Parties",
    group: "Corporate",
    description: "Team celebrations that build culture",
    image:
      "https://images.unsplash.com/photo-1758520144658-c87be518b87e?w=800&q=80",
  },
  {
    slug: "corporate-meetings",
    name: "Corporate Meetings",
    group: "Corporate",
    description: "Professional spaces for important discussions",
    image:
      "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=800&q=80",
  },
  {
    slug: "conferences",
    name: "Conferences",
    group: "Corporate",
    description: "Large-scale conferences with full production support",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
  },
  {
    slug: "seminars",
    name: "Seminars",
    group: "Corporate",
    description: "Focused sessions for knowledge sharing",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    slug: "workshops",
    name: "Workshops",
    group: "Corporate",
    description: "Hands-on training and workshop spaces",
    image:
      "https://images.unsplash.com/photo-1720347274787-961f33ef151d?w=800&q=80",
  },
  {
    slug: "product-launches",
    name: "Product Launches",
    group: "Corporate",
    description: "Make a statement with a memorable launch event",
    image:
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=800&q=80",
  },
  {
    slug: "award-ceremonies",
    name: "Award Ceremonies",
    group: "Corporate",
    description: "Recognize achievements in grand style",
    image:
      "https://images.unsplash.com/photo-1514820720301-4c4790309f46?w=800&q=80",
  },
  {
    slug: "annual-celebrations",
    name: "Annual Celebrations",
    group: "Corporate",
    description: "Company annual day events and celebrations",
    image:
      "https://images.unsplash.com/photo-1655373425200-1fe5d74c2632?w=800&q=80",
  },
  {
    slug: "team-events",
    name: "Team Events",
    group: "Corporate",
    description: "Outings and activities that bring teams together",
    image:
      "https://images.unsplash.com/photo-1774599661355-327e322f53c2?w=800&q=80",
  },
  {
    slug: "business-events",
    name: "Business Events",
    group: "Corporate",
    description: "Networking events and business gatherings",
    image:
      "https://images.unsplash.com/photo-1768508665663-fa483a0cb208?w=800&q=80",
  },

];

export function getEventTypeBySlug(slug: string) {
  return eventTypes.find((e) => e.slug === slug);
}

export const featuredEventTypes = eventTypes.filter((e) => e.featured);
