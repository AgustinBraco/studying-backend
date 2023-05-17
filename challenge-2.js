const fs = require("fs");
class ProductManager {
	#products;
	#path;

	constructor() {
		this.#products = [];
		this.#path = "products.json";
	}

	getProducts() {
		// Validar si existe el archivo:
		if (!fs.existsSync(this.#path)) {
			try {
				// Si no existe, crearlo:
				fs.writeFileSync(this.#path, JSON.stringify(this.#products));
			} catch (err) {
				return `Writing error while getting products: ${err}`;
			}
		}

		try {
			// Convertir string en object:
			const data = fs.readFileSync(this.#path, "utf8");
			const dataArray = JSON.parse(data);
			return dataArray;
		} catch (err) {
			return `Reading error while getting products: ${err}`;
		}
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		const products = this.getProducts();

		// Validar campos incompletos:
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			return `Please fill all the fields to add a product`;
			// Validar codigo existente:
		} else if (products.some((product) => product.code === code)) {
			return `The code ${code} already exists`;
		} else {
			const id = products.length + 1;
			const product = { id, title, description, price, thumbnail, code, stock };
			products.push(product);

			try {
				// Si es correcto, escribir el archivo:
				fs.writeFileSync(this.#path, JSON.stringify(products));
			} catch (err) {
				return `Writing error while adding the product: ${err}`;
			}
		}
	}

	getProductById(id) {
		const products = this.getProducts();
		const product = products.find((product) => product.id === id);
		if (!product) {
			return `There's no product with ID ${id}`;
		} else {
			return `The product with ID ${id} is: ${product}`;
		}
	}

	updateProduct(id, field, value) {
		const products = this.getProducts();
		const product = products.find((product) => product.id === id);

    // Validar ID:
    if (!product) {
			return `There's no product with ID ${id}`;
			// Validar field:
		} else if (!(field in product)) {
			return `There's no field "${field}" in product ${id}`;
			// Validar value:
		} else if (!value) {
			return `The value is incorrect`;
			// Si es correcto, escribir el archivo:
		} else {
			product[field] = value;
			try {
				fs.writeFileSync(this.#path, JSON.stringify(products));
			} catch (err) {
				return `Writing error while updating the product: ${err}`;
			}
		}
	}

	deleteProduct(id) {
		const products = this.getProducts();
		const productIndex = products.findIndex((product) => product.id === id);

		// Validar ID:
		if (productIndex !== -1) {
			products.splice(productIndex, 1);
			try {
				// Si es correcto, escribir el archivo:
				fs.writeFileSync(this.#path, JSON.stringify(products));
			} catch (err) {
				return `Writing error while deleting the product: ${err}`;
			}
		} else {
			return `There's no product with ID: ${id}`;
		}
	}
}

// CASO DE USO
const product = new ProductManager();



// ADD PRODUCT
// Válidos:
product.addProduct("Product 1", "Description 1", 100, "Image 1", "code1", 10);
product.addProduct("Product 2", "Description 2", 200, "Image 2", "code2", 20);
product.addProduct("Product 3", "Description 3", 300, "Image 3", "code3", 30);
product.addProduct("Product 4", "Description 4", 400, "Image 4", "code4", 40);
product.addProduct("Product 5", "Description 5", 500, "Image 5", "code5", 50);
product.addProduct("Product 6", "Description 6", 600, "Image 6", "code6", 60);
product.addProduct("Product 7", "Description 7", 700, "Image 7", "code7", 70);
product.addProduct("Product 8", "Description 8", 800, "Image 8", "code8", 80);
product.addProduct("Product 9", "Description 9", 900, "Image 9", "code9", 90);

// Campo incompleto:
product.addProduct("Product 10", 1000, "Image 10", "code10", 100);

// Codigo repetido:
product.addProduct("Product 20", "Description 20", 2000, "Image 20", "code2", 200);



// GET PRODUCT BY ID
// Válidos:
product.getProductById(1);
product.getProductById(6);
product.getProductById(2);

// No existentes:
product.getProductById(15);
product.getProductById(10);



// UPDATE PRODUCT
// Válido:
// ID true + FIELD true + VALUE true
product.updateProduct(1, "price", 10000);

// Inválidos:
// ID true + FIELD true + VALUE false
product.updateProduct(2, "price");

// ID true + FIELD false + VALUE true
product.updateProduct(3, "surname", "Braco");

// ID true + FIELD false + VALUE false
product.updateProduct(4, "surname");

// ID false + FIELD true + VALUE true
product.updateProduct(15, "price", 500);

// ID false + FIELD true + VALUE false
product.updateProduct(16, "price");

// ID false + FIELD false + VALUE true
product.updateProduct(17, "surname", 700);

// ID false + FIELD false + VALUE false
product.updateProduct(18, "surname");



// DELETE PRODUCT
// Válidos:
product.deleteProduct(3);
product.deleteProduct(8);

// Inválido:
product.deleteProduct(20);