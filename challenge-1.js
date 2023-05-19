class ProductManager {
	#products;

	constructor() {
		this.#products = [];
	};

	getProducts() {
		try {
			return this.#products;
		} catch (err) {
			return `Reading error while getting products: ${err}`;
		};
	};

	addProduct(title, description, price, thumbnail, code, stock) {
		// Validar campos incompletos:
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			return `Please fill all the fields to add a product`;
			// Validar si el código existe:
		} else if (this.#products.find(product => product.code === code)) {
			return `The code "${code}" already exists`;
		} else {
			const id = this.#products.length + 1;
			const product = { id, title, description, price, thumbnail, code, stock };

			try {
				// Si es correcto, pushear el producto:
				this.#products.push(product);
			} catch (err) {
				return `Push error while adding the product: ${err}`;
			};
		};
	};

	getProductById(id) {
		const product = this.#products.find(product => product.id === id);
		// Validar si el producto existe:
		if (product) {
			return product;
		} else {
			return `There's no product with ID ${id}`;
		};
	};
};

// Caso de uso
const product = new ProductManager();

product.getProducts();

// Impresión en consola para validar el funcionamiento:
console.log("Primer llamado (debe mostrar el array vacío):", product.getProducts());

product.addProduct("Product 1", "Description 1", 100, "Image 1", "code1", 10);
product.addProduct("Product 2", "Description 2", 200, "Image 2", "code2", 20);
product.addProduct("Product 3", "Description 3", 300, "Image 3", "code3", 30);
product.addProduct("Product 4", "Description 4", 400, "Image 4", "code4", 40);
product.addProduct("Product 5", "Description 5", 500, "Image 5", "code5", 50);
product.addProduct("Product 6", 600, "Image 6", "code6", 60);
product.addProduct("Product 7", "Description 7", 700, "Image 7", "code2", 70);

// Impresión en consola para validar el funcionamiento:
console.log("Segundo llamado (debe mostrar el array solo con los 5 productos válidos):", product.getProducts());

product.getProductById(1);
product.getProductById(4);
product.getProductById(6);

// Impresión en consola para validar el funcionamiento:
console.log("Tercer llamado (debe mostrar el producto 3):", product.getProductById(3));

// Impresión en consola para validar el funcionamiento:
console.log("Cuarto llamado (debe mostrar error por ID no existente):", product.getProductById(7));
