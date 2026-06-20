"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";


export default function AuthGuard({
  children
}:{
  children: React.ReactNode
}) {


  const router = useRouter();



  useEffect(() => {


    async function check() {


      const supabase = getSupabase();


      const {
        data
      } = await supabase.auth.getSession();



      if (!data.session) {

        router.push("/login");

      }


    }


    check();



  }, [router]);



  return <>{children}</>;

}