import { AboutStory } from "./AboutStory";
import { AboutValues } from "./AboutValues";
import { AboutContact } from "./AboutContact";

/** @deprecated Use AboutPage sections directly */
export function AboutContent() {
  return (
    <div className="space-y-20 sm:space-y-28">
      <AboutStory />
      <AboutValues />
      <AboutContact />
    </div>
  );
}
