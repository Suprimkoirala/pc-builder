"use client";

import { Button } from "./ui/button";
import pcImage from "../assets/pc.png";

interface HeroProps {
  onSectionChange: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider">
            BUILD YOUR PC TODAY
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">
            We provide part selection, pricing, and compatibility guidance for
            do-it-yourself computer builders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gray-800 hover:bg-gray-700 text-emerald-900 px-8 py-4 text-lg font-semibold"
              onClick={() =>
                document
                  .getElementById("builder")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              PC BUILDER
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-emerald-900 hover:bg-gray-800 px-8 py-4 text-lg font-semibold bg-transparent"
              onClick={() => onSectionChange('guide')}
            >
              GUIDE
            </Button>
          </div>
        </div>
        <div className="relative ml-40 mr-auto">
          <img
            src={pcImage}
            alt="Gaming PC with RGB lighting"
            className="w-95 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
