import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, TrendingDown } from "lucide-react";

interface RVListing {
  id: string;
  year: number;
  model: string;
  trim: string;
  price: number;
  msrp: number;
  dealer: string;
  location: string;
  distance: number;
  features: string[];
  url: string;
  lastUpdated: string;
}

const SAMPLE_DATA: RVListing[] = [
  {
    id: "1",
    year: 2026,
    model: "Winnebago",
    trim: "Solis 59P",
    price: 109995,
    msrp: 162593,
    dealer: "Mike Thompson's RV",
    location: "Santa Fe Springs, CA",
    distance: 15,
    features: ["Pop-top", "Murphy Bed", "A/C"],
    url: "https://www.mikethompson.com/",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    year: 2026,
    model: "Winnebago",
    trim: "Solis 59P",
    price: 119995,
    msrp: 162593,
    dealer: "La Mesa RV",
    location: "San Bernardino, CA",
    distance: 60,
    features: ["Pop-top", "Murphy Bed", "Solar Ready"],
    url: "https://www.lamesarv.com/",
    lastUpdated: new Date().toISOString(),
  },
];

const DEALER_COLORS: Record<string, string> = {
  "La Mesa RV": "bg-blue-100 text-blue-700",
  "Mike Thompson's RV": "bg-orange-100 text-orange-700",
  "Conejo RV": "bg-green-100 text-green-700",
};

export default function Home() {
  const [listings, setListings] = useState(SAMPLE_DATA);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    const saved = localStorage.getItem("rv-favorites");
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    localStorage.setItem("rv-favorites", JSON.stringify(Array.from(newFavorites)));
  };

  const sorted = [...listings].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    return a.distance - b.distance;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663346866284/LEwL8WU9Ap6rpYpqucfsKu/rv-tracker-logo-SUSWvVhUi9qof4fh5aV8JH.webp"
              alt="RV Tracker"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">LA RV Tracker</h1>
              <p className="text-xs text-muted-foreground">2026 Winnebago Solis 59P</p>
            </div>
          </div>
        </div>
      </header>

      <section
        className="relative py-12 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663346866284/LEwL8WU9Ap6rpYpqucfsKu/rv-tracker-hero-CXsQSncQE26UcGWKF4Tvt8.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-2">Find Your Perfect Solis 59P in LA</h2>
          <p className="text-lg opacity-90">Real-time inventory from top dealers. Updated daily.</p>
        </div>
      </section>

      <div className="container py-6 flex gap-4 items-center">
        <div className="flex-1 flex gap-2">
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("price")}
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Lowest Price
          </Button>
          <Button
            variant={sortBy === "distance" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("distance")}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Closest
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">{listings.length} listings</div>
      </div>

      <div className="container pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((listing) => {
            const savings = listing.msrp - listing.price;
            const savingsPercent = Math.round((savings / listing.msrp) * 100);
            const dealerColor = DEALER_COLORS[listing.dealer] || "bg-gray-100 text-gray-700";
            const isFavorited = favorites.has(listing.id);

            return (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">
                        {listing.year} {listing.model} {listing.trim}
                      </h3>
                      <p className="text-sm text-muted-foreground">{listing.location}</p>
                    </div>
                    <button onClick={() => toggleFavorite(listing.id)}>
                      <Heart
                        size={20}
                        className={isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white border-b">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">${listing.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">${listing.msrp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <TrendingDown size={16} />
                    <span>Save ${savings.toLocaleString()} ({savingsPercent}%)</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <Badge className={dealerColor}>{listing.dealer}</Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{listing.distance} miles from LA</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {listing.features.map((f, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border-t flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(listing.url, "_blank")}>
                    View Dealer
                  </Button>
                  <Button size="sm" className="flex-1 bg-accent">
                    Get Financing
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="container space-y-4">
          <p className="text-sm opacity-90">Real-time RV inventory tracking for 2026 Winnebago Solis 59P in Los Angeles. Updated daily.</p>
        </div>
      </footer>
    </div>
  );
}