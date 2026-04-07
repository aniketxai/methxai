import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import { aiDecision } from "../services/decision.service.js";

const router = express.Router();

const uploadIfMultipart = (req, res, next) => {
	const contentType = req.headers["content-type"] || "";
	const isMultipart = contentType.includes("multipart/form-data");

	if (!isMultipart) {
		return next();
	}

	try {
		upload.single("file")(req, res, (err) => {
			if (err) {
				return res.status(400).json({
					error:
						"Invalid multipart form data. If using FormData, do not set Content-Type manually.",
				});
			}
			next();
		});
	} catch (err) {
		return res.status(400).json({
			error:
				"Invalid multipart form data. If using FormData, do not set Content-Type manually.",
		});
	}
};

router.post("/decision", uploadIfMultipart, aiDecision);

export default router;
