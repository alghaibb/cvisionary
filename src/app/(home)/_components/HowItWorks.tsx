import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HOW_IT_WORKS } from "@/lib/constants";
import React from "react";

export default function HowItWorks() {
  return (
    <section className="px-4 md:px-0 py-12 text-center md:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
        <p>
          Build your resume effortlessly with our easy-to-use resume builder.
          Here&apos;s how it works:
        </p>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                {React.createElement(step.icon)}
                <CardTitle className="mt-4 text-lg font-semibold">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
