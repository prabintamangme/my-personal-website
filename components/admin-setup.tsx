"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function AdminSetup(){const router=useRouter();const [status,setStatus]=useState("");const [pending,setPending]=useState(false);return <div className="stack"><button className="btn" disabled={pending} onClick={async()=>{setPending(true);const response=await fetch("/api/admin/setup",{method:"POST"});const result=await response.json() as {message:string};setStatus(result.message);setPending(false);if(response.ok)router.push("/admin")}}>{pending?"Creating…":"Claim first administrator"}</button>{status&&<div className="form-status" role="status">{status}</div>}</div>}
