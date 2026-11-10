"use client";
import { useState } from "react";
export function CopyLink(){const [copied,setCopied]=useState(false);return <button className="btn secondary small" onClick={async()=>{await navigator.clipboard.writeText(location.href);setCopied(true);setTimeout(()=>setCopied(false),1800)}}>{copied?"Link copied":"Copy link"}</button>}
