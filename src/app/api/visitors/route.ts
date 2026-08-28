import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Store file locally inside .data or fallback in memory / tmp
const DATA_DIR = path.join(process.cwd(), ".data");
const STATS_FILE = path.join(DATA_DIR, "visitors.json");

interface VisitorData {
  sessions: { [sessionId: string]: number }; // sessionId -> lastActiveTimestamp
  monthlyVisits: { [yearMonth: string]: number }; // e.g. "2026-08": count
  uniqueVisitors: string[]; // List of unique hashes/visitor IDs
  totalHits: number;
}

async function getStatsData(): Promise<VisitorData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const fileContent = await fs.readFile(STATS_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    // Default initial data if file doesn't exist
    const currentMonth = new Date().toISOString().slice(0, 7);
    return {
      sessions: {},
      monthlyVisits: { [currentMonth]: 0 },
      uniqueVisitors: [],
      totalHits: 0
    };
  }
}

async function saveStatsData(data: VisitorData) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STATS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save visitor data:", err);
  }
}

export async function GET() {
  const data = await getStatsData();
  const now = Date.now();
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Active online sessions within the last 5 minutes (300,000 ms)
  const activeSessions = Object.entries(data.sessions || {}).filter(
    ([_, timestamp]) => now - timestamp < 5 * 60 * 1000
  );

  const onlineCount = Math.max(1, activeSessions.length);
  const monthCount = data.monthlyVisits?.[currentMonth] || 0;
  const totalCount = data.uniqueVisitors?.length || data.totalHits || 0;

  return NextResponse.json({
    success: true,
    online: onlineCount,
    month: monthCount,
    total: totalCount
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { visitorId, isNewVisitor } = body;
    const now = Date.now();
    const currentMonth = new Date().toISOString().slice(0, 7);

    const data = await getStatsData();

    if (!data.sessions) data.sessions = {};
    if (!data.monthlyVisits) data.monthlyVisits = {};
    if (!data.uniqueVisitors) data.uniqueVisitors = [];

    // Track active session timestamp
    const sessionId = visitorId || `anon_${Math.random().toString(36).substring(2, 9)}`;
    data.sessions[sessionId] = now;

    // Clean up old sessions (> 15 minutes)
    for (const [sId, timestamp] of Object.entries(data.sessions)) {
      if (now - timestamp > 15 * 60 * 1000) {
        delete data.sessions[sId];
      }
    }

    // Increment if new visitor session or monthly visit
    if (isNewVisitor && !data.uniqueVisitors.includes(sessionId)) {
      data.uniqueVisitors.push(sessionId);
    }
    
    // Increment monthly visits and total hits on recorded hit
    data.monthlyVisits[currentMonth] = (data.monthlyVisits[currentMonth] || 0) + 1;
    data.totalHits = (data.totalHits || 0) + 1;

    await saveStatsData(data);

    // Calculate online count (last 5 min)
    const activeSessions = Object.entries(data.sessions).filter(
      ([_, timestamp]) => now - timestamp < 5 * 60 * 1000
    );

    return NextResponse.json({
      success: true,
      online: Math.max(1, activeSessions.length),
      month: data.monthlyVisits[currentMonth] || 1,
      total: Math.max(data.uniqueVisitors.length, data.totalHits)
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
