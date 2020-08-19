const express = require("express");
const app = express();

//proceso

//Creamos una seed con la informacion a trabajar, puede ser modificada a gusto , el proceso esta realizado para que  se adpte
const seed = [
  {
    Marca: "Peugeot",
    Modelo: "206",
    Puertas: "4",
    Precio: "$200000,00",
  },
  {
    Marca: "Honda",
    Modelo: "Titan",
    Cilindrada: "125c",
    Precio: "$60000,00",
  },
  {
    Marca: "Peugeot",
    Modelo: "208",
    Puertas: "5",
    Precio: "$250000,00",
  },
  {
    Marca: "Yamaha",
    Modelo: "YBR",
    Cilindrada: "160c",
    Precio: "$80500,50",
  },
];

//convertimos el precio a Numbers para poder generar un nuevo arreglo con todos los numeros usando map y asi comparar y aislarlo por precio
const Mayor = seed.map((element) => {
  let x = element.Precio.slice(1);
  let y = parseFloat(x);
  return y;
});

//los ordenamos de mayor a menor usando spread operator para evitar modificar el array Mayor
const Ordenado = [...Mayor].sort(function (a, b) {
  return b - a;
});

// se crea un variable externar para guardar el resultado de la del doble map para evitar problemas de asyncronia
let SeedOrdenada = [];

Ordenado.map((element) => {
  seed.map((Product) => {
    let x = Product.Precio.slice(1);
    let y = parseFloat(x);
    if (y === element) {
      SeedOrdenada.push(Product);
    }
  });
});

//filtramos con Math el menor y el mayor
let ElMayor = Math.max(...Mayor);
let ElMenor = Math.min(...Mayor);

// usamos Filter para poder generar nuevos arreglos aislando el producto por el precio
const FilterMayor = seed.filter((element) => {
  let x = element.Precio.slice(1);
  let y = parseFloat(x);
  return y === ElMayor;
});

const FilterMenor = seed.filter((element) => {
  let x = element.Precio.slice(1);
  let y = parseFloat(x);
  return y === ElMenor;
});

let n = "Y"; // variable a recibir para buscar el producto
const FilterPorLetra = seed.filter((element) => {
  let model = element.Modelo.toLowerCase(); // para que funcione soin importar si ingresa una mayuscula o una minuscula
  return model.includes(n.toLowerCase());
});

//respuestas
console.log(
  `Vehículo más caro: ${FilterMayor[0].Marca} ${FilterMayor[0].Modelo}`
);
console.log(
  `Vehículo más barato: ${FilterMenor[0].Marca} ${FilterMenor[0].Modelo}`
);
console.log(
  `Vehículo que contiene en el modelo la letra ‘${n}’: ${FilterPorLetra[0].Marca} ${FilterPorLetra[0].Modelo} ${FilterPorLetra[0].Precio}`
);

console.log("Vehículos ordenados por precio de mayor a menor:");
SeedOrdenada.forEach((element) => {
  console.log(`${element.Marca} ${element.Modelo}`);
});

/* 
Vehículo más caro: Peugeot 208
Vehículo más barato: Honda Titan
Vehículo que contiene en el modelo la letra ‘Y’: Yamaha YBR $80.500,50
 */

/* Vehículos ordenados por precio de mayor a menor:
Peugeot 208
Peugeot 206
Yamaha YBR
Honda Titan
 */

app.listen(3000, function () {
  console.log("start on port " + 3000);
});
