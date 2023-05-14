// Realizar una clase “ProductManager” que gestione un conjunto de productos.
class ProductManager {
	#products;

	constructor() {
        // Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
		this.#products = [];
	};

    // Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
	getProducts() {
		return this.#products;
	};

    // Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
    // Cada producto que gestione debe contar con las propiedades: title, description, price, thumbnail, code, stock.
	addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            // Validar que todos los campos sean obligatorios
            console.log("Please fill all the fields");
        } else if (this.#products.some((product) => product.code === code)) {
            // Validar que no se repita el campo “code”
			console.log(`The code ${code} already exists`);
		} else {
            // Al agregarlo, debe crearse con un id autoincrementable sin repetirse.
			const id = this.#products.length + 1;
			const product = { id, title, description, price, thumbnail, code, stock };
			this.#products.push(product);
		};
	};

    // Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
	getProductById(id) {
		const product = this.#products.find((product) => product.id === id);
		if (!product) {
            // En caso de no coincidir ningún id, mostrar en consola un error
            console.log(`There's no product with ID ${id}`);
		} else {
            console.log(`The product with ID ${id} is: `, product);
        };
	};
};

// Se creará una instancia de la clase “ProductManager”
const product = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log("Array without products: ", product.getProducts());

// Se llamará al método “addProduct” cumpliendo los requerimientos
try {
	product.addProduct(
		"Test product",
		"This is a test product",
		200,
		"No image",
		"abc123",
		25
	);
} catch (err) {
	console.log("Catch error:", err);
};

// Se llamará el método “getProducts”, debe devolver el array con el producto agregado
console.log("Array with the first product added: ", product.getProducts());

// Se llamará al método “addProduct” repitiendo el campo code
try {
	product.addProduct(
		"Test product",
		"This is a test product",
		200,
		"No image",
		"abc123",
		25
	);
} catch (err) {
	console.log("Catch error:", err);
};

console.log("Trying to add a product with the same code: ", product.getProducts());

// Se llamará al método “addProduct” cumpliendo los requerimientos
try {
	product.addProduct(
		"Test product",
		"This is a test product",
		200,
		"No image",
		"abc1234",
		25
	);
} catch (err) {
	console.log("Catch error:", err);
};

// Se llamará el método “getProducts”, debe devolver el array con los dos productos agregados
console.log("Array with the two products added: ", product.getProducts());

// Se llamará al método “addProduct” sin completar todos los campos
try {
	product.addProduct(
		"Test product",
		200,
		"No image",
		"abc12345",
		25
	);
} catch (err) {
	console.log("Catch error:", err);
};

// Se llamará el método “getProducts”, debe devolver el array con los dos productos agregados, sin agregar el tercer producto por campos incompletos
console.log("Trying to add a product without all the fields completed: ", product.getProducts());

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
product.getProductById(1);
product.getProductById(5);
product.getProductById(2);
product.getProductById(4);