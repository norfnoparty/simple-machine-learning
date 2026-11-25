export async function GET(request: Request) {
  const url = new URL(request.url);
  const sn = url.searchParams.get("SN") || url.searchParams.get("sn") || "unknown";

  console.log("\n🔵 GET /iclock/getrequest");
  console.log("Serial Number:", sn);
  console.log("Params:", Object.fromEntries(url.searchParams));

  // Kirim command ke mesin: upload semua attendance log
  const command = "C:1:ATTLOG ";

  console.log("📤 Command sent:", command);

  return new Response(command, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
