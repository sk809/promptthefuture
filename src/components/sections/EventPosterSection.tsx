import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const EventPosterSection = () => {
  return (
    <section className="bg-background">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Discover the{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Event Details
              </span>
            </h2>
          </div>
        }
      >
        <img
          src="/placeholder.svg"
          alt="Hackathon Event Poster - Next Quantum 3.0 Vibe Coding Hackathon"
          className="mx-auto rounded-2xl object-contain h-full w-full"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};

export default EventPosterSection;
