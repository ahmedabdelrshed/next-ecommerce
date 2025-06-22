"use client";
import AuthComponent from "@/components/AuthComponent";
import { Suspense } from "react";

const AuthPage = () => {
 
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <AuthComponent />
    </Suspense>
  );
};

export default AuthPage;
