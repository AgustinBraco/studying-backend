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
			// Leer archivo y convertirlo en objeto:
			const data = fs.readFileSync(this.#path, "utf8");
			const dataArray = JSON.parse(data);
			return dataArray;
		} catch (err) {
			return `Reading error while getting products: ${err}`;
		}
	}

  lastId() {
    const products = this.getProducts();
    if (products.length > 0) {
      // Obtener último ID:
      const lastId = products.reduce((maxId, product) => {
        return product.id > maxId ? product.id : maxId;
      }, 0);
      return lastId;
    } else {
      // Si el array está vacío, devolver 0:
      return 0;
    }
  }

	addProduct(title, description, price, thumbnail, code, stock) {
		const products = this.getProducts();

		// Validar campos incompletos:
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			return `Please fill all the fields to add a product`;
			// Validar si el código existe:
		} else if (products.some((product) => product.code === code)) {
			return `The code ${code} already exists`;
		} else {
			const id = this.lastId() + 1;
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

		// Validar si el producto existe:
		if (product) {
			return product;
		} else {
			return `There's no product with ID ${id}`;
		}
	}

	updateProduct(id, field, value) {
		const products = this.getProducts();
		const product = products.find((product) => product.id === id);

		// Validar ID:
		if (!product) {
			return `There's no product with ID ${id}`;
			// Validar campo:
		} else if (!(field in product)) {
			return `There's no field "${field}" in product ${id}`;
			// Validar valor:
		} else if (!value) {
			return `The value is incorrect`;
		} else {
			product[field] = value;
			// Si es correcto, escribir el archivo:
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

// Caso de uso
const product = new ProductManager();

product.getProducts();

// Impresión en consola para validar el funcionamiento:
console.log("Primer llamado (debe mostrar el array inicial):", product.getProducts());

product.addProduct("Product 1", "Description 1", 100, "Image 1", "code1", 10);
product.addProduct("Product 2", "Description 2", 200, "Image 2", "code2", 20);
product.addProduct("Product 3", "Description 3", 300, "Image 3", "code3", 30);
product.addProduct("Product 4", "Description 4", 400, "Image 4", "code4", 40);
product.addProduct("Product 5", "Description 5", 500, "Image 5", "code5", 50);
product.addProduct("Product 6", "Description 6", 600, "Image 6", "code6", 60);
product.addProduct("Product 7", "Description 7", 700, "Image 7", "code7", 70);
product.addProduct("Product 8", "Description 8", 800, "Image 8", "code8", 80);
product.addProduct("Product 9", "Description 9", 900, "Image 9", "code9", 90);
product.addProduct("Product 10", 1000, "Image 10", "code10", 100);
product.addProduct("Product 11", "Description 11", 1100, "Image 11", "code1", 110);
product.addProduct("Product 12", "Description 12", 1200, "code12", 120);

// Impresión en consola para validar el funcionamiento:
console.log("Segundo llamado (debe mostrar el array solo con los 9 productos válidos):", product.getProducts());

product.getProductById(1);
product.getProductById(6);
product.getProductById(10);
product.getProductById(16);

// Impresión en consola para validar el funcionamiento:
console.log("Tercer llamado (debe mostrar el producto 4):", product.getProductById(4));

// Impresión en consola para validar el funcionamiento:
console.log("Cuarto llamado (debe mostrar error por ID no existente):", product.getProductById(12));

product.updateProduct(1, "price", 10000); // true - true - true
product.updateProduct(2, "price"); // true - true - false
product.updateProduct(3, "surname", "Braco"); // true - false - true
product.updateProduct(4, "surname"); // true - false - false
product.updateProduct(15, "price", 500); // false - true - true
product.updateProduct(16, "price"); // false - true - false
product.updateProduct(17, "surname", 700); // false - false - true
product.updateProduct(18, "surname"); // false - false - false

// Impresión en consola para validar el funcionamiento:
console.log("Quinto llamado (debe mostrar el array solo con el producto 1 actualizado):", product.getProducts());

product.deleteProduct(3);
product.deleteProduct(8);
product.deleteProduct(20);

// Impresión en consola para validar el funcionamiento:
console.log("Sexto llamado (debe mostrar el array con los productos 3 y 8 eliminados):", product.getProducts());