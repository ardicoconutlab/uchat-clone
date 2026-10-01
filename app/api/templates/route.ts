import { NextResponse } from "next/server";
import { templateStore } from "@/lib/domain/memory-store";

export function GET() { return NextResponse.json({ templates: templateStore.list() }); }

export function POST() { return NextResponse.json({ templates: templateStore.sync(), source: "prototype" }); }
