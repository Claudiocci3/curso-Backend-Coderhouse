
class ProductManager {
    constructor (){
        this.products = [];
    }
    getNextId(){
        const count = this.products.length;
        if(count == 0) return 1;

        const lastEvent = this.products[count-1];
        const lastId = lastEvent.id;
        this.nextId = lastId +1;

        return this.nextId;
    }
    addProduct(title, description, price, thumbnail, code, stock){
        
        if(title,description,price,thumbnail,code,stock){
        let codeU = this.products.find(p=> p.code == code);
        if(codeU) return console.error("el campo 'code' no debe ser repetido");

        let product = {
        id: this.getNextId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,}
        
        this.products.push(product);
        }else  throw Error("Todos los campos son obligatorios");
    }

    getProducts(){
        return this.products;
    }
    getProductById = (id) => {
        if (this.products.length > 0) {
          let mostrarProducto = this.products.find(product => product.id == id);
          mostrarProducto?console.log("El id ingresado coincide con",mostrarProducto):console.log(`Not Found`)
        } else {
          console.log(`Ese producto no existe`);
        }
      };
  
 
}


//se crea instancia de Product Manager
const product = new ProductManager();

//se llama a getProducts()
console.log(product.getProducts());// muestra [];

//llamando al metodo add.Product()
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);

//llamando al metodo getProducts() para mostrar producto recien agregado
console.log(product.getProducts());

//se llama a addProduct() con los mismos campos de arriba
product.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);

//busca id que no existe
product.getProductById(3);// Not found

//busca id que si existe
product.getProductById(1);// muestra el producto con el id 1













