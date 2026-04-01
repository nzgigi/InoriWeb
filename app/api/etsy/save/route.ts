import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join("/var/www/InoriWeb", "data");
const DATA_FILE = join(DATA_DIR, "etsy.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[etsy/save]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}