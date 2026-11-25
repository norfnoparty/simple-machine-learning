export async function GET(request: Request) {
  const url = new URL(request.url);
  console.log("🔵 GET", url.pathname);
  console.log("Query:", Object.fromEntries(url.searchParams));
  return new Response("GET ATTLOG\r\nQUIT\r\n");
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  console.log("\n🟢 POST", url.pathname);

  const text = await request.text();
  console.log("Body:", text.substring(0, 300));

  return new Response("ok");
}