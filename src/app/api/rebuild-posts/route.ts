import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  const webHookKey = process.env.SUPABASE_WEBHOOK_KEY;

  const requestApiKey = request.headers.get('API-Key');
  if (!requestApiKey)
    return NextResponse.json({}, { status: 401 });

  if (requestApiKey !== webHookKey)
    return NextResponse.json({}, { status: 403 });

  console.log(request.headers);

  return NextResponse.json({
    "revalidated": true,
    "date": new Date()
  });
}
