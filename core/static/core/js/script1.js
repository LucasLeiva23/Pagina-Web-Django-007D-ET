$(document).ready(function() {
  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {

   // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
   var rutPattern = /^\d{7,8}-[\dK]$/;
   if (!rutPattern.test(value)) {
       return false;
   }

   // Validar el dígito verificador
   var rutSinGuion = value.replace("-", "");
   var rut = rutSinGuion.slice(0, -1);
   var dv = rutSinGuion.slice(-1);
   var factor = 2;
   var sum = 0;
   for (var i = rut.length - 1; i >= 0; i--) {
       sum += parseInt(rut.charAt(i)) * factor;
       factor = factor === 7 ? 2 : factor + 1;
   }
   var dvCalculado = 11 - (sum % 11);
   dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

   return dv === dvCalculado;
 }, "El RUT no es válido (escriba sin puntos y con guión)");

 // Agregar método de validación para correo
 $.validator.addMethod("emailCompleto", function(value, element) {

   // Expresión regular para validar correo electrónico
   var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

   // Validar correo electrónico con la expresión regular
   return regex.test(value);

 }, 'El formato del correo no es válido');

 // Agregar método de validación para que un campo sólo acepte 
 // letras y espacios en blanco, pero no números ni símbolos,
 // ideal para campos como nombres y apellidos
 $.validator.addMethod("soloLetras", function(value, element) {

   return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

 }, "Sólo se permiten letras y espacios en blanco.");

 // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
 if (document.getElementById('run_usuario')) {
   document.getElementById('run_usuario').addEventListener('keyup', function(e) {
     e.target.value = e.target.value.toUpperCase();
   });
 }

 $('#form_inicio').validate({
   rules: { 
     username: {
       required: true,
     },
     password: {
       required: true,
       minlength: 5,
       maxlength: 15,
     },
   }, 
   messages: {
     nombre: {
       required: "El nombre de usuario es un campo requerido",
       
     },
     password: {
       required: "La contraseña es un campo requerido",
       minlength: "La contraseña debe tener un mínimo de 5 caracteres",
       maxlength: "La contraseña debe tener un máximo de 15 caracteres",
     },      
   },
 });

 $('#form_misdatos').validate({
   rules: { 

     run_usuario:{
       required: true,
       rutChileno: true,
     },

     nombre: {
       required: true,
       soloLetras: true,
     },

     apellido:{
       required:true,
       soloLetras: true,
     },

     email: {
       required: true,
       emailCompleto: true,
     },

     direccion:{
       required:true,
     },

     password: {
       required: true,
       minlength: 5,
       maxlength: 15,
     },
     password2: {
       required: true,
       minlength: 5,
       maxlength: 15,
       equalTo: "#password",
     },
   }, 
   messages: {

     run_usuario: {
       required: "Por favor ingresa un RUT válido",
       rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
     },
     nombre: {
       required: "El nombre de usuario es un campo requerido",
       soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
     },
     apellido: {
       required: "El apellido de usuario es un campo requerido",
       soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
     },

     email: {
       required: "El correo es un campo requerido",
       emailCompleto: "El formato del correo no es válido",
     },

     direccion: {
       required: "La direccion es un campo requerido",
     },

     password: {
       required: "La contraseña es un campo requerido",
       minlength: "La contraseña debe tener un mínimo de 5 caracteres",
       maxlength: "La contraseña debe tener un máximo de 15 caracteres",
     },
     password2: {
       required: "Repetir contraseña es un campo requerido",
       minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
       maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
       equalTo: "Debe repetir la contraseña escrita anteriormente",
     },
          
   },
 });

 $('#form_productos').validate({
   rules: { 
     categoria:{
       required: true,
     },
     nombre_juego: {
       required: true,
       minlenght:3,
     },
     descripcion:{
       required: true,
       minlenght:3,
       maxlenght:200
     },
     precio:{
       required: true,
       number:true,
       min:0
     },
     descsub: {
       required: true,
       number: true,
       min: 0,
       max: 100,
     },
     descofe: {
       required: true,
       number: true,
       min: 0,
       max: 100,
     },

     imagen:{
       required: true,
     },


   }, 
   messages: {
     categoria:{
       required: "La categoría es un campo requerido",
     },
     nombre: {
       required: "El nombre del juego es un campo requerido",
       minlenght: "La descripcion debe tener un minimo de 3 caracteres",
     },
     descripcion: {
       required: "La descripción del juego es un campo requerido",
       minlenght: "La descripcion debe tener un minimo de 3 caracteres",
       maxlenght: "La descripcion debe tener un maximo de 200 caracteres",
     },  
     precio: {
       required: "El precio del juego es un campo requerido",
       number:"El precio debe ser un número",
       min:"El precio debe ser igual o mayor a 0"
     },
     descuento_subscriptor: {
       required: "El descuento subscriptor es un campo requerido",
       number:"El descuento subscritor debe ser un número",
       min: "El descuento subscriptor debe ser como mínimo 0%",
       max: "El descuento subscriptor debe ser como máximo 100%",
     },
     descuento_oferta: {
       required: "El descuento oferta es un campo requerido",
       number:"El descuento oferta debe ser un número",
       min: "El descuento oferta debe ser como mínimo 0%",
       max: "El descuento oferta debe ser como máximo 100%",
     },
     imagen:{
       required: "La imagen es un campo requerido",
     },
   },
 });

 $('#form_registrar').validate({
   rules: {  
     run_usuario: {
       required: true,
       rutChileno: true,
     },
     nombre: {
       required: true,
       soloLetras: true,
     },
     apellido:{
       required:true,
       soloLetras: true,
     },
     email: {
       required: true,
       emailCompleto: true,
     },
     direccion:{
       required:true,
     },
     password: {
       required: true,
       minlength: 5,
       maxlength: 15,
     },
     password2: {
       required: true,
       minlength: 5,
       maxlength: 15,
       equalTo: "#password",
     },
   }, 
   messages: {
     run_usuario: {
       required: "Por favor ingresa un RUT válido",
       rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
     },
     nombre: {
       required: "El nombre de usuario es un campo requerido",
       soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
     },
     apellido: {
       required: "El apellido de usuario es un campo requerido",
       soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
     },
     email: {
       required: "El correo es un campo requerido",
       emailCompleto: "El formato del correo no es válido",
     },
     direccion: {
       required: "La direccion es un campo requerido",
     },
     password: {
       required: "La contraseña es un campo requerido",
       minlength: "La contraseña debe tener un mínimo de 5 caracteres",
       maxlength: "La contraseña debe tener un máximo de 15 caracteres",
     },
     password2: {
       required: "Repetir contraseña es un campo requerido",
       minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
       maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
       equalTo: "Debe repetir la contraseña escrita anteriormente",
     },
   },
 });

 $('#form_usuarios').validate({
   rules: { 
     iduser:{
       required: true,
     },
     run_usuario:{
       required: true,
       rutChileno: true,
     },
     nombre: {
       required: true,
       soloLetras: true,
     },
     apellido: {
       required: true,
       soloLetras: true,
     },

     email: {
       required: true,
       emailCompleto: true,
     },
     direccion:{
       required:true,
     },

     password: {
       required: true,
       minlength: 5,
       maxlength: 15,
     },
   }, 
   messages: {
     iduser:{
       required:"El id del juego es un campo requerido"
     },  
     run_usuario: {
       required: "Por favor ingresa un RUT válido",
       rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
     },  
     nombre: {
       required: "El nombre de usuario es un campo requerido",
       soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
     },
     apellido: {
       required: "El apellido de usuario es un campo requerido",
       soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
     },

     email: {
       required: "El correo es un campo requerido",
       emailCompleto: "El formato del correo no es válido",
     },

     direccion: {
       required: "La direccion es un campo requerido",
     },

     password: {
       required: "La contraseña es un campo requerido",
       minlength: "La contraseña debe tener un mínimo de 5 caracteres",
       maxlength: "La contraseña debe tener un máximo de 15 caracteres",
     }, 
   },
 });

 $('#form_bodega').validate({
   rules: { 
       categoria: {
           required: true,
       },
       nombrejuego: {
           required: true,
       },
       cantidad: {
           required: true,
           number: true,
           min: 1,
       },
   }, 
   messages: {
       categoria: {
           required: "La categoria del juego es un campo requerido"
       },  
       nombrejuego: {
           required: "El nombre del juego es un campo requerido",
       }, 
       cantidad: {
           required: "La cantidad es un campo requerido",
           number: "Solo puede ser numerico",
           min: "El mínimo debe ser uno",
       }, 
   },
});

});