import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join("/var/www/InoriWeb", "data", "etsy.json");

export async function GET() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ sales: [], products: [] });
  }
}