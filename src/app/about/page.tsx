import { Waves, Anchor, Fish, Heart, Award, Users } from "lucide-react";

const values = [
  {
    icon: Fish,
    title: "Sustainable Sourcing",
    description: "We partner with certified sustainable fisheries to ensure our oceans thrive for generations to come.",
  },
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every dish is prepared with meticulous attention to detail, honoring the natural flavors of the sea.",
  },
  {
    icon: Award,
    title: "Award-Winning Cuisine",
    description: "Recognized for culinary excellence with multiple awards for our innovative seafood preparations.",
  },
  {
    icon: Users,
    title: "Exceptional Service",
    description: "Our team is dedicated to creating memorable dining experiences that keep guests returning.",
  },
];

const team = [
  { name: "Chef Marco Rossi", role: "Executive Chef", bio: "30 years of culinary mastery across Mediterranean coasts" },
  { name: "Sofia Laurent", role: "Head Sommelier", bio: "Expert wine pairings from coastal vineyards worldwide" },
  { name: "Liam O'Connor", role: "Restaurant Manager", bio: "Ensuring every guest experience is nothing short of perfect" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sea-50 via-white to-ocean-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sea-100 text-sea-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Anchor className="w-4 h-4" />
            About Us
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-sea-900">
            Our Story
          </h1>
          <p className="mt-4 text-sea-600 max-w-2xl mx-auto">
            From the coast to your plate — a journey of passion, sustainability,
            and culinary excellence
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Waves className="w-12 h-12 text-sea-400 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-sea-900 mb-6">
              Where the Ocean Meets the Plate
            </h2>
            <div className="space-y-4 text-sea-600 leading-relaxed">
              <p>
                TheSeaPride was born from a simple belief: the best seafood
                deserves to be celebrated. Founded in 2009 by Chef Marco Rossi
                along the pristine coastline, our restaurant has grown from a
                small beachside eatery to a destination for seafood connoisseurs.
              </p>
              <p>
                Every morning, our team visits the local fish market to select
                the day&apos;s freshest catch. We work directly with sustainable
                fisheries and local fishermen who share our commitment to
                ocean conservation.
              </p>
              <p>
                Our kitchen combines classic coastal cooking techniques with
                modern innovation. From our signature lobster thermidor to our
                delicately seared tuna, each dish reflects our dedication to
                quality, flavor, and presentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-sea-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-sea-900">Our Values</h2>
            <p className="mt-2 text-sea-500">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-sea-100 text-center hover:shadow-lg transition-shadow">
                <v.icon className="w-8 h-8 text-sea-500 mx-auto mb-4" />
                <h3 className="font-semibold text-sea-800 mb-2">{v.title}</h3>
                <p className="text-sm text-sea-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-sea-900">Meet Our Team</h2>
            <p className="mt-2 text-sea-500">The people behind your unforgettable dining experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center p-6 rounded-2xl border border-sea-100 hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-sea-200 to-ocean-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-sea-500" />
                </div>
                <h3 className="font-semibold text-sea-800">{member.name}</h3>
                <p className="text-sm text-sea-500 font-medium">{member.role}</p>
                <p className="text-sm text-sea-400 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
