import {NextRequest, NextResponse} from "next/server";
import {revalidatePath} from "next/cache";

export async function POST(request: NextRequest) {
  const webHookKey = process.env.SUPABASE_WEBHOOK_KEY;

  const requestApiKey = request.headers.get('API-Key');
  if (!requestApiKey)
    return NextResponse.json({}, { status: 401 });

  if (requestApiKey !== webHookKey)
    return NextResponse.json({}, { status: 403 });

  console.log('rebuilding posts...');
  revalidatePath('/[categorySlug]/[productSlug]', 'page');

  return NextResponse.json({
    "revalidated": true,
    "date": new Date()
  });
}
