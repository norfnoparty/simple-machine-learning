export async function POST(request: Request) {
  const url = new URL(request.url);
  console.log("\n🟡 POST /iclock/devicecmd");
  console.log("Params:", Object.fromEntries(url.searchParams));

  const text = await request.text();
  console.log("Device command result:", text);

  return new Response("OK", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
