const fs = require("fs");
class ProductMananger {
  constructor(products) {
    this.path = products;
  }
  addProduct = async (title, description, price, thumbnail, stock, code) => {
    if ((title, description, price, thumbnail, stock, code)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        const codeCheck = result.find((el) => el.code == code);
        if (codeCheck) {
          console.log(
            `El código ya existe, porfavor agregue un producto valido.`
          );
        } else {
          if (result.length > 0) {
            let idParaProducto = result[result.length - 1].id + 1;
            let nuevoProducto = {
              id: idParaProducto,
              title,
              description,
              price,
              thumbnail,
              stock,
              code,
            };
            result.push(nuevoProducto);

            await fs.promises.writeFile(
              this.path,
              JSON.stringify(result, null, 2)
            );
          }
        }
      } else {
        let nuevoProducto = {
          id: 1,
          title,
          description,
          price,
          thumbnail,
          stock,
          code,
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([nuevoProducto], null, 2)
        );
      }
    } else {
      console.log(`Porfavor agrega todos los detalles del producto`);
    }
  };
  getProduct = async () => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      return result;
    } else {
      console.log(`No hay ningún producto en la empresa`);
    }
  };
  getProductById = async (id) => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let mostrarProducto = result.find((product) => product.id == id);
      if (mostrarProducto) {
        return mostrarProducto;
      } else {
        `Not Found, producto no encontrado`;
      }
    } else {
      return `No hay ningún producto en la empresa`;
    }
  };
  uptadeProduct = async (id, propiedadActualizadas) => {
    if ((id, propiedadActualizadas)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        let encontrarProducto = result.find((product) => product.id == id);
        if (encontrarProducto) {
          const productUpdates = result.map((product) => {
            if (product.id == id) {
              return { ...product, ...propiedadActualizadas };
            }
            return product;
          });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(productUpdates, null, 2)
          );
        } else {
          console.log(`El producto a actualizar no se ha encontrado`);
        }
      } else {
        console.log("No hay producto para agregar");
      }
    } else {
      console.log(`Completa todos los propiedades para actualizar el producto`);
    }
  };
  deleteProduct = async (id) => {
    if (fs.existsSync(this.path)) {
      if (id) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        let eliminarProducto = result.filter((prod) => prod.id != id);
        result = eliminarProducto;
        await fs.promises.writeFile(this.path, JSON.stringify(result, null, 2));
      } else {
        console.log(`Porfavor coloca el id para eliminar el producto`);
      }
    } else {
      console.log(
        `No se pueden eliminar productos de la base de datos debido a que se encuentra vacia`
      );
    }
  };
}

const productosEnEmpresa = new ProductMananger("listaDeProductos.json");

/*
productosEnEmpresa.addProduct("Camiseta", "camiseta de argentina", 5000, "Sin imagen", 10, 1986)
productosEnEmpresa.addProduct("Short de Argentina", "Short adidas", 3000, "Sin imagen", 100, 1978)
productosEnEmpresa.addProduct("Mate", "Mate stanley", 4000, "Sin imagen", 20, 1990)
productosEnEmpresa.addProduct("camiseta", "camiseta de brasil", 100, "Sin imagen", 500, 2021)
productosEnEmpresa.addProduct("Zapatillas", "Zapatillas nike", 15000, "Sin imagen", 30, 1254)
productosEnEmpresa.addProduct("Mochila", "Mochila Nike", 4548, "Sin imagen", 40, 4587)
productosEnEmpresa.addProduct("botines nike", "Botine de futbol nike", 15000, "Sin imagen", 40, 6551)
productosEnEmpresa.addProduct("futbol", "futbol del mundial", 18000, "Sin imagen", 70, 3247)
productosEnEmpresa.addProduct("musculosa", "musculosa lagers", 35000, "Sin imagen", 50, 6541)
productosEnEmpresa.addProduct("pantalon", "pantalon de vestir", 527, "Sin imagen", 45, 6571)

*/
module.exports.products = productosEnEmpresa;