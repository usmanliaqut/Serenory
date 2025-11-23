// app/api/signaling/route.ts
import { WebSocketServer, WebSocket } from "ws";

type NodeWebSocket = WebSocket;

const wss = new WebSocketServer({ noServer: true });
const rooms: Record<string, NodeWebSocket[]> = {};

wss.on("connection", (ws: NodeWebSocket, request) => {
  const url = new URL(request.url!, "http://localhost");
  const roomId = url.searchParams.get("roomId") || "default";

  if (!rooms[roomId]) rooms[roomId] = [];
  rooms[roomId].push(ws);

  // Assign roles
  const role = rooms[roomId].length === 1 ? "caller" : "callee";
  ws.send(JSON.stringify({ type: "role", role }));

  ws.on("message", (message: string) => {
    const peers = rooms[roomId];
    for (const peer of peers) {
      if (peer !== ws && peer.readyState === WebSocket.OPEN) {
        peer.send(message.toString());
      }
    }
  });

  ws.on("close", () => {
    rooms[roomId] = rooms[roomId].filter((p) => p !== ws);
  });
});

export const config = { runtime: "nodejs" };

export default function handler(req: any, res: any) {
  res.status(200).send("WebSocket signaling running.");
}
