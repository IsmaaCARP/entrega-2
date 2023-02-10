class Hotel {
  constructor(nombreHotel, direccionHotel, precioHabitacion) {
    this.nombreHotel = nombreHotel;
    this.direccionHotel = direccionHotel;
    this.precioHabitacion = precioHabitacion;

    this.generarAlquler();
  }

  generarAlquler() {
    this.habitaciones = [];

    for (let i = 0; i < 3; i++) {
      const habitacion = new Habitacion(i, false);
      this.habitaciones.push(habitacion);
    }
  }
}

class Habitacion {
  constructor(id, estado) {
    this.id = id;
    this.estado = estado;
  }
}

function getHabitacion(nombreHotel) {
  return listaHoteles.find((habi) => {
    return habi.nombreHotel === nombreHotel;
  });
}

function habitacionDisponible(habitacionAlquilar, cantidadHabitacion) {
  const habitacionesDisponibles = habitacionAlquilar.habitacion.filter(
    (habitacionDisponible) => {
      return !habitacionDisponible.estado;
    }
  );
  return habitacionesDisponibles.length >= cantidadHabitacion;
}

function calcularTotal(habitacionAlquilar, cantidadHabitacion) {
  return cantidadHabitacion * habitacionAlquilar.precioHabitacion;
}

function ocuparHabitacion(habitacionAlquilar, cantidadHabitacion) {
  const habitaciones = habitacionAlquilar.habitacion;

  for (const habitacion of habitaciones) {
    if (!habitacion.estado) {
      habitacion.estado = true;
      cantidadHabitacion--;
    }

    if (cantidadHabitacion === 0) {
      break;
    }
  }
  habitaciones.habitaciones = habitaciones;
}

const listaHoteles = [
  new Hotel("Alejandro I", "Huaico 840", 50),
  new Hotel("Hugito", "Rondo 960", 30),
  new Hotel("Palmerita", "Calle 360", 90),
];

let alquilerHabitacion = prompt("Ingrese nombre de hotel");

while (alquilerHabitacion !== "SALIR") {
  const habitacionAlquilar = getHabitacion(alquilerHabitacion);
  if (habitacionAlquilar !== undefined) {
    let cantidadHabitacion = parseInt(
      prompt("Ingrese la cantidad de habitaciones a alquilar")
    );

    while (
      cantidadHabitacion < 0 ||
      !habitacionDisponible(alquilerHabitacion, cantidadHabitacion)
    ) {
      cantidadHabitacion = parseInt("Ingrese cantidad de habitaciones");
    }

    const total = calcularTotal(habitacionAlquilar, cantidadHabitacion);
    alert(
      `El total a pagar por el hotel ${vuelo.nombreHotel} con destino ${vuelo.direccionHotel} es de: $${total}`
    );
    ocuparHabitacion(habitacionAlquilar, cantidadHabitacion);
  } else {
    alert("Nombre de hotel no encontrado ura");
  }

  alquilerHabitacion = prompt(
    "Ingrese el número de vuelo que quiere comprar. Ingrese SALIR si quiere salir del programa"
  );
}
