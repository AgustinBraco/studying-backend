// Express
import express from "express";
const app = express();
const port = 8080;
const host = "0.0.0.0";

// Rutas
import productsRoute from "./routes/products.router.js";
import cartsRoute from "./routes/carts.router.js";
import viewsRoute from "./routes/views.router.js";

// Data
import products from "./data/products.json" assert { type: "json" };

// Mongoose
import mongoose from "mongoose";
import { messageModel } from "./dao/mongo/models/messages.model.js";
mongoose.connect(
	"mongodb+srv://bracoagustin:J2P8TJF36AjvHMhI@cluster1.bysdr0i.mongodb.net/?retryWrites=true&w=majority"
);

// Handlebars
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/", viewsRoute);

// Socket & Server:
import { Server } from "socket.io";
const httpServer = app.listen(port, host, () => {
	console.log(`Server listening on http://${host}:${port}`);
});

const io = new Server(httpServer);
const messages = [];

io.on("connection", (socket) => {
	console.log("New client connected");

	socket.emit("products", products);

	// Chat
	io.emit("messagesLogs", messages);
	
	socket.on("user", (data) => {
		messages.push(data);
		io.emit("messagesLogs", messages);
	});

	socket.on("message", (data) => {
		messages.push(data);
		io.emit("messagesLogs", messages);
		messageModel.create({
			user: data.user,
			message: data.message,
		});
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});
