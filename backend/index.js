import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  const start = Date.now();
  const requestData = {
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    body: req.body,
  };

  console.log("➡️ Request:", requestData);

  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = (data) => {
    const duration = Date.now() - start;
    console.log("⬅️ Response:", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
      body: data,
    });
    return originalJson(data);
  };

  res.send = (data) => {
    const duration = Date.now() - start;
    console.log("⬅️ Response:", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
      body: data,
    });
    return originalSend(data);
  };

  next();
});


app.use("/ai", aiRoutes);

app.use((err, req, res, next) => {
  if (err?.message?.includes("Unexpected end of form")) {
    return res.status(400).json({
      error:
        "Malformed multipart form data. If sending FormData, do not set Content-Type manually.",
    });
  }

  if (err) {
    return res.status(500).json({ error: "Internal server error" });
  }

  next();
});

app.get("/", (req, res) => {
  res.send("server at localhost: http://localhost:3000");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
