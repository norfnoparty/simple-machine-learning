export async function GET(request: Request, { params }: any) {
  console.log("🔵 GET /api/iclock/", params.path);
  return new Response("ok");
}

export async function POST(request: Request, { params }: any) {
  const text = await request.text();
  console.log("\n🟢 POST /api/iclock/", params.path);
  console.log("Body:", text.substring(0, 300));
  return new Response("ok");
}
