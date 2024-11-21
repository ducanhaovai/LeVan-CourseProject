"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function PageDesReq() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-6">Requirements</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li className="text-sm text-muted-foreground">
            There are no skill prerequisites for this course although it&apos;s helpful if you are
            familiar with operating your internet.
          </li>
          <li className="text-sm text-muted-foreground">
            You can take this course using a Mac, PC or Linux machine.
          </li>
          <li className="text-sm text-muted-foreground">
            It is recommended that you download the free{" "}
            <a href="#" className="text-primary hover:underline">
              Komodo
            </a>{" "}
            text editor.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-6">About This Course</h2>
        <div
          className={`space-y-4 overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[1000px]" : "max-h-24"
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor inc idid
            unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerc tation
            ullamco laboris nis aliquip commodo consequat duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsum.
          </p>
          <p className="text-sm text-muted-foreground">
            Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium totam rem aperiam.
          </p>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor inc idid
            unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerc tation
            ullamco laboris nis aliquip commodo consequat duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsum.
          </p>
          <p className="text-sm text-muted-foreground">
            Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium totam rem aperiam.
          </p>
        </div>
        <button
          className="flex items-center text-primary hover:text-primary/80"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              Hide
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </section>
    </div>
  );
}
