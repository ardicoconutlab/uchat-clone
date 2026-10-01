import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactStore } from "@/lib/domain/memory-store";

const contactSchema = z.object({ name: z.string().trim().min(1).max(160), phone: z.string().trim().min(6).max(32), email: z.string().email().nullable().optional(), tags: z.array(z.string().trim().min(1).max(48)).max(30).default([]), consent: z.enum(["opted_in", "unknown", "opted_out"]).default("unknown") });
export function GET() { return NextResponse.json({ contacts: contactStore.list() }); }
export async function POST(request: NextRequest) { const parsed = contactSchema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Invalid contact" }, { status: 400 }); return NextResponse.json({ contact: contactStore.create({ ...parsed.data, email: parsed.data.email ?? null }) }, { status: 201 }); }
