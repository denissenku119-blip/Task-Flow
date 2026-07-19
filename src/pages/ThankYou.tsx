"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const ThankYouScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-4">
      <Card className="p-8 text-center bg-white dark:bg-slate-800 rounded-xl shadow-sm max-w-md">
        <div className="mb-6">
          <CheckCircle2 size={48} className="text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            🎉 Thank You!
          </h2>
        </div>
        
        <div className="mb-6 text-gray-600 dark:text-slate-400 leading-relaxed">
          <p>
            Your support truly means a lot.
          </p>
          <p>
            Every contribution helps improve TaskFlow, build new features, fix bugs and keep the 
            app free for everyone.
          </p>
          <p className="mt-4">
            Thank you for being part of the TaskFlow journey.
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl text-gray-900 dark:text-white">
            ❤️
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThankYouScreen;