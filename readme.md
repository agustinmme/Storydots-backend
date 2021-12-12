## StoryDots Challenge

- [Intro](#intro)
- [Librerias](#libreries)
- [Quick Start](#quick-start)
- [Endpoints de la documentacion](#endpoints-products)
 	- [Products](#endpoints-products)
	  - [Recuperar todos](#recuperar-todos-los-productos)
	  - [Recuperar un producto](#recuperar-un-producto)
	  - [Agregar](#agregar-nuevo-productos)
	  - [Eliminar](#eliminar-producto)
	  - [Modificar](#modificar-un-producto)
 	- [Brands](#endpoints-brands)
		 - [Recuperar todas](#recuperar-todos-las-marcas)
		 - [Recuperar una marca](#recuperar-una-marca)
		 - [Agregar](#agregar-nueva-marca)
		 - [Eliminar](#eliminar-marca)
		 - [Modificar](#modificar-marca)
 	- [User](#endpoints-user)
		 - [Register](#registar)
		 - [Login](#logear)
- [Ejemplos - Code snippets](#example-code-snippets)
- [Deploy](#deploy)
- [¿Necesitas ayuda?](#necesitas-ayuda)

---

## Intro

Bienvenido a la documentacion del challenge de StoryDots - Backend.
Se trata de una api REST con NodeJS que pueda realizar las
operaciones CRUD de productos con algunos extras como añadir una autenticación y unos endpoint de brands.
- [Ir al Frotend](https://github.com/agustinmme/Storydots-frontend)

## Libreries

Las librerias utilizadas para el desarrollo de esta api fueron:
- Express.
- Sequelize.
- JSON Web Token.
- Dotenv.
- Bcrypt.
- Nodemon.


## Quick Start


- Primero configurar Variables de entorno.
- Crear archivo .env en directorio raíz con las siguientes datos.

```
# DB Config

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_PORT=3306
DB_NAME=storydots
DB_DIALECT=mysql

# Auth Config

AUTH_SECRET=StoryDots
AUTH_EXPIRE=1h
AUTH_ROUNDS=5
```
- Ejecutar el comando **npm run dev**.

\* El repositorio contiene un JSON para importar en Postman con los endpoints.


## Endpoints Products 

### **Recuperar todos los productos**

- **URL**

  _/products_

- **Method:**

  `GET` - recibes todos los productos y numero de paginas.

- **Query Params**

   **[page]:** _Pagina actual del listado de productos_

- **Request Headers**

  _No requiere para este endpoint_

- **Success Response:**

  Este método retorna todos los productos registrados en la api.Cada vez que se llame a este metodo se enviara un array de productos junto a un contador de paginas.

  - **Code:** 200 OK<br />
    **Content:** 
	```
	`{
	"content": [
	{
		"id": ["ID"],
		"name": ["NAME-PRODUCT"],
		"description": ["TEXT-PRODUCT"],
		"image_url": ["URL-IMG-PRODUCT"],
		"price": ["PRICE-PRODUCT"],
		"brand": { "name": ["NAME-BRAND"], "logo_url": ["URL-IMG"] }
	}],
	"totalPages": ["TOTAL-PAGES"]
	}`
	```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** <br/> `{ "message": "PRODUCTS NOT EXIST" }`



- **Sample Call:**

	``` 
	curl -X GET  
	/http://localhost:3000/products/?page=[NUMBER-PAGE]
	```
<br/>

### **Recuperar un producto**

- **URL**

  _/products/[ID-PRODUCT]_

- **Method:**

  `GET` - recibes un producto correspondiente al id del producto.

- **Path Params**

  **[ID-PRODUCT]:** _El id del producto que quieres recuperar_

- **Request Headers**

    _No requiere para este endpoint_

- **Success Response:**

  Este método devolverá un producto y datos de su marca asociada.
 (imagen del producto,nombre,precio,descripcion,nombre de la marca y  imagen de la misma)

  - **Code:** 200 OK <br />
    **Content:** 
	```
	`{
		"id": ["ID"],
		"name": ["NAME-PRODUCT"],
		"description": ["TEXT-PRODUCT"],
		"image_url": ["URL-IMG-PRODUCT"],
		"price": ["PRICE-PRODUCT"],
		"brand": { "name": ["NAME-BRAND"], "logo_url": ["URL-IMG"] }
	}`
	```
- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** <br/> `{ "message": "ID NOT VALID ONLY NUMBER" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** <br/> `{ "message": "PRODUCT NOT EXIST" }`


- **Sample Call:**

	```
	curl -X GET   
	http://localhost:3000/products/[ID-PRODUCT]  
	```
<br/>

### Agregar nuevo productos 

- **URL**

  _/products/new_

- **Method**

   `POST` - crea un nuevo producto

- **Request Headers**

  - **Authorization:** _Your Token_
  
- **Body**

	Los parámetros deben enviarse como JSON.<br/>
	Estos son los parámetros que esperará el end-point:

	- **name**: el nombre del producto a publicar.(Unico).
	- **description**:  descripcion de producto a publicar con un maximo de 150 caracteres.
	- **image_url**:  url de la imagen del producto.
	- **price**: precio del producto.(Double 10,2)
	- **brandId**: su identificación interna de marca, almacenaremos esta identificación para permitirle devolver datos de la marca junto al producto.


- **Success Response:**

  Este metodo devolvera un mensaje confirmando si el producto fue agregado al sistema existosamente,caso contrario informa un error.

    - **Code:** 201 CREATED <br/>
      **Content:** <br/> `{ "message": "YOUR PRODUCT ADDED SUCCESSFULLY" }`


- **Error Responses**

	- **Code:** 400 BAD REQUEST <br/>
	**Content:**  <br/> `{ "message": "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[IMAGE_URL],[DESCRIPTION],[PRICE],[BRAND-ID]" }`<br/> 
    `{ "message": "NAME PRODUCT ONLY ALLOW VALUES WITH LENGTH BETWEEN 3 AND 60" }`<br/> 
    `{ "message": "NAME PRODUCT ONLY ALLOW VALUES WITH LETTER AND NUMBER" }`<br/> 
    `{ "message": "PRODUCT DESCRIPTION ONLY ALLOWS VALUES WITH LENGTH LESS THAN 150" }`<br/> 
    `{ "message": "PRODUCT IMAGE ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 255" }`<br/> 
	- **Code:** 401 UNAUTHORIZED <br/>
	**Content:** <br/>
    `{ "mesagge": "UNAUTHORIZED ACCESS " }`<br/>
    `{ "message": "INVALID TOKEN " }`<br/>
    `{ "message": "JWT MALFORMED " }`<br/>
    `{ "message": "JWT EXPIRED " }`<br/>



- **Sample Call:**

	```
	curl --request POST 
	--url 'http://localhost:3000/products/new'
	--header 'Authorization: Bearer  [YOUR-TOKEN]
	--data '{
	"name": "Ratona Mascardi Miami Negro",
	"description": "4 Sillon Miami Negra 1 Mesita Ratona Mascardi",
	"image_url": "https://picsum.photos/id/237/200/300",
	"price": "4234.75",
	"brandId": 2
   	 }'
	```
	<br/>
	
### Eliminar producto 

- **URL**

  _/products/[ID-PRODUCT]_

- **Method**

  `DELETE` - elimina el producto espeficiado 

- **Request Headers**

  - **Authorization:** _Your Token_

- **Path Params**

   **[ID-PRODUCT]:** _El id del producto que quieres borrar_

- **Success Response**

  Este metodo devolvera un mensaje confirmando si  el producto fue borrado del sistema exitosamente,caso contrario informa un error.

   - **Code:** 200 OK <br/>
   - **Content:** <br/>`{ "message": "DELETE SUCCESSFULLY" }`

- **Error Responses**

  - **Code:** 400 BAD REQUEST <br/>
    **Content:** <br/>`{ "message": "ID NOT VALID ONLY NUMBER" }`
    
  - **Code:** 401 UNAUTHORIZED <br/>
    **Content:** <br/>
    `{ "mesagge": "UNAUTHORIZED ACCESS " }`<br/>
    `{ "message": "INVALID TOKEN " }`<br/>
    `{ "message": "JWT MALFORMED " }`<br/>
    `{ "message": "JWT EXPIRED " }`<br/>

  - **Code:** 404 NOT FOUND <br/>
    **Content:** <br/>`{ "message": "PRODUCT NOT EXIST" }`


- **Sample Call:**

```
  curl --request DELETE 
    --url 'http://localhost:3000/products/[ID-PRODUCT]'
    --header 'Authorization: Bearer  [YOUR-TOKEN] '
```
### Modificar un producto 

- **URL**

  _/products/[ID-PRODUCT]_

- **Method**

  `PUT` - Modificar informacion de los compos de un producto. 

- **Request Headers**

  - **Authorization:** _Your Token_

- **Path Params**

   **[ID-PRODUCT]:** _El id del producto que quieres modificar_
- **Body**

Los parámetros deben enviarse como JSON. 
Estos son los parámetros que esperará el end-point:

  - **name**: el nombre del producto a publicar.(Unico).
  - **description**:  descripcion de producto a publicar con un maximo de 150 caracteres.
  - **image_url**:  url de la imagen del producto.
  - **price**: precio del producto.(Double 10,2)
  - **brandId**: su identificación interna de marca, almacenaremos este identificación para permitirle devolver datos de la marca junto al producto.
  
\* En este caso todos los campos se dejaron opciones,Pero se necesita al menos 1 campo para poder utilizarse.
  
- **Success Response**

  Este metodo devolvera un mensaje confirmando si  el producto fue modificado correctamente en el sistema,caso contrario informa un error.

  - **Code:** 200 OK
  - **Content:** <br/> `{ "message": "UPDATE SUCCESSFULLY" }`

- **Error Responses**

  - **Code:** 400 BAD REQUEST <br/>
    **Content:** <br/>`{ "message": "ID NOT VALID ONLY NUMBER" }`<br/>
    `{ "message": "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[IMAGE_URL],[DESCRIPTION],[PRICE],[BRAND-ID]", }`<br/>
    `{ "message": "NAME PRODUCT ONLY ALLOW VALUES WITH LENGTH BETWEEN 3 AND 60" }`<br/> 
    `{ "message": "NAME PRODUCT ONLY ALLOW VALUES WITH LETTER AND NUMBER" }`<br/> 
    `{ "message": "PRODUCT DESCRIPTION ONLY ALLOWS VALUES WITH LENGTH LESS THAN 150" }`<br/> 
    `{ "message": "PRODUCT IMAGE ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 255" }`<br/> 

  - **Code:** 401 UNAUTHORIZED <br/>
    **Content:** <br/>
    `{ "mesagge": "UNAUTHORIZED ACCESS " }`<br/>
    `{ "message": "INVALID TOKEN " }`<br/>
    `{ "message": "JWT MALFORMED " }`<br/>
    `{ "message": "JWT EXPIRED " }`<br/>


  - **Code:** 404 NOT FOUND <br/>
    **Content:** <br/> `{ "message": "PRODUCT NOT EXIST" }`


- **Sample Call:**

```
  curl --request PUT 
    --url 'http://localhost:3000/products/[ID-PRODUCT]
    --header 'Authorization: Bearer  [YOUR-TOKEN] 
	--data '{
      "name": "Ratona Mascardi Miami Negro",
      "description": "4 Sillon Miami Negra 1 Mesita Ratona Mascardi",
    }'
```
o
```
  curl --request PUT 
    --url 'http://localhost:3000/products/[ID-PRODUCT]
    --header 'Authorization: Bearer  [YOUR-TOKEN] 
	--data '{
      "name": "Ratona Mascardi Miami Negro",
      "description": "4 Sillon Miami Negra 1 Mesita Ratona Mascardi",
      "image_url": "https://picsum.photos/id/237/200/300",
      "price": "4234.75",
      "brandId": 2
    }'
```

## Endpoints Brands 

### **Recuperar marcas sin paginar** 

- **URL**

  _/brands/no-pages_

- **Method:**

  `GET` - recupera todas las marcas almacenadas

- **Request Headers**

  _No requiere para este endpoint_

- **Success Response:**

  Este método retorna todas las marcas registrados en la api.Cada vez que se llame a este metodo se enviara un array de marcas.

  - **Code:** 200 OK<br />
    **Content:** 
	```
	`{
	"content": [
	{
		"id": ["ID-BRAND"],
		"name": ["NAME-BRAND"],
		"image_url": ["URL-IMG-BRAND"],
	}]
	}`
	```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** <br/> `{ "message": "BRAND NOT EXIST" }`
    
- **Sample Call:**

	``` 
	curl -X GET  
	http://localhost:3000/brands/no-pages
	```
<br/>

### **Recuperar marcas paginadas** 

- **URL**

  _/brands/?page=[PAGE]_

- **Method:**

  `GET` - recupera todas las marcas almacenadas paginadas
  
- **Path Params**

  **[PAGE]:** _El numero de la pagina que quieres recuperar_

- **Request Headers**

  _No requiere para este endpoint_

- **Success Response:**

  Este método retorna todas las marcas registrados en la api.Cada vez que se llame a este metodo se enviara un array de marcas.

  - **Code:** 200 OK<br />
    **Content:** 
	```
	"content": [
        {
            "id": 8,
            "name": "LACHI",
            "logo_url": "https://d2r9epyceweg5n.cloudfront.net/stores/771/622/themes/common/logo-1207256253-1623855938-0d59f8c3d0091af0db5ee8e3ba04750f1623855938.png?0"
        },
    	],
    	"totalPages": 1
	```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** <br/> `{ "message": "BRAND NOT EXIST" }`
    
- **Sample Call:**

	``` 
	curl -X GET  
	http://localhost:3000/brands/?page=0
	```
<br/>



### **Recuperar una marca** 

- **URL**

  _/brands/[ID-BRANDS]_

- **Method:**

  `GET` - recibe una marca correspondiente al id enviado.

- **Path Params**

  **[ID-BRANDS]:** _El id de la marca que quieres recuperar_

- **Request Headers**

    _No requiere para este endpoint_

- **Success Response:**

  Este método devolverá una marca con sus datos asociados.

  - **Code:** 200 OK <br />
    **Content:** 
	```
	`{
		"id": ["ID-BRAND"],
		"name": ["NAME-BRAND"],
		"logo_url": ["URL-IMG-LOGO"],
	}`
	```
- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** <br/> `{ "message": "ID NOT VALID ONLY NUMBER" }`

  - **Code:** 404 NOT FOUND <br />
    **Content:** <br/> `{ "message": "BRAND NOT EXIST" }`


- **Sample Call:**

	```
	curl -X GET   
	http://localhost:3000/brands/[ID-BRANDS]  
	```
<br/>

### Agregar nueva marca 

- **URL**

  _/brands/new_

- **Method**

   `POST` - crea una nueva marca

- **Request Headers**

  - **Authorization:** _Your Token_
  
- **Body**

	Los parámetros deben enviarse como JSON.<br/>
	Estos son los parámetros que esperará el end-point:

	- **name**: el nombre del producto a publicar.(Unico).
	- **logo_url**:  url de la logo/imagen de la marca.

- **Success Response:**

  Este metodo devolvera un mensaje confirmando si la marca fue agregado al sistema existosamente,caso contrario informa un error.

    - **Code:** 201 CREATED <br/>
      **Content:** <br/> `{ "message": "YOUR BRAND ADDED SUCCESSFULLY" }`


- **Error Responses**

	- **Code:** 400 Bad Request <br/>
	**Content:**  <br/> `{ "message": "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[LOGO_URL]" }`<br/>
    `{ "message": "LOGO BRAND ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 255" }`<br/> 
    `{ "message": "NAME BRAND ONLY ALLOW VALUES WITH LETTER AND NUMBER" }`<br/> 
    `{ "message": "NAME BRAND ONLY ALLOW VALUES WITH LENGTH BETWEEN 3 AND 60" }`<br/> 
    `{ "message": "PLEASE ENTRE SOLO URL. FORMAT EXAMPLE : (HTTP://FOO.COM)" }`<br/> 

	- **Code:** 401 UNAUTHORIZED <br/>
	**Content:** <br/>
    `{ "mesagge": "UNAUTHORIZED ACCESS " }`<br/>
    `{ "message": "INVALID TOKEN " }`<br/>
    `{ "message": "JWT MALFORMED " }`<br/>
    `{ "message": "JWT EXPIRED " }`<br/>
    
    

- **Sample Call:**

	```
	curl --request POST 
	--url 'http://localhost:3000/brands/new' 
	--header 'Authorization: Bearer  [YOUR-TOKEN] 
	--data '{
	"name": "cocaCola",
        "logo_url":"https://picsum.photos/id/237/200/300"
   	 }'
	```
	<br/>
	
### Eliminar marca 

- **URL**

  _/products/[ID-PRODUCT]_

- **Method**

  `DELETE` - elimina una marca especifica

- **Request Headers**

  - **Authorization:** _Your Token_

- **Path Params**

   **[ID-BRAND]:** _El id del la marca que quieres borrar_

- **Success Response**

  Este metodo devolvera un mensaje confirmando si la marca se ah borrado exitosamente del sistema,caso contrario informa un error.

   - **Code:** 200 OK <br/>
   - **Content:** <br/>`{ "message": "DELETE SUCCESSFULLY" }`

- **Error Responses**

  - **Code:** 400 Bad Request <br/>
    **Content:** <br/>`{ "message": "ID NOT VALID ONLY NUMBER" }`

  - **Code:** 401 UNAUTHORIZED <br/>
    **Content:** <br/>
    `{ "mesagge": "UNAUTHORIZED ACCESS " }`<br/>
    `{ "message": "INVALID TOKEN " }`<br/>
    `{ "message": "JWT MALFORMED " }`<br/>
    `{ "message": "JWT EXPIRED " }`<br/>
    
    
  - **Code:** 404 NOT FOUND <br/>
    **Content:** <br/> `{ "message": "BRAND NOT EXIST" }`


- **Sample Call:**

```
  curl --request DELETE 
    --url 'http://localhost:3000/brands/[ID-BRAND]'
    --header 'Authorization: Bearer  [YOUR-TOKEN] '
```

### Modificar marca 

- **URL**

  _/brands/[ID-BRAND]_

- **Method**

  `PUT` - Modificar informacion de los campos de una marca. 

- **Request Headers**

  - **Authorization:** _Your Token_

- **Path Params**

   **[ID-BRAND]:** _El id de la marca que quieres modificar_
   
- **Body**

Los parámetros deben enviarse como JSON. 
Estos son los parámetros que esperará el end-point:

  - **name**: el nombre de la marca a publicar.
  - **logo_url**:  url de la imagen/logo de la marca.

\* En este caso todos los campos se dejaron opciones(Pero es necesario enviar al menos 1).
  
- **Success Response**

  Este metodo devolvera un mensaje confirmando si  la marca fue modificado correctamente en el sistema,caso contrario informa un error.

  - **Code:** 200 OK
  - **Content:** <br/> `{ "message": "UPDATE SUCCESSFULLY" }`

- **Error Responses**

  - **Code:** 400 Bad Request <br/>
    **Content:** <br/>`{ "message": "ID NOT VALID ONLY NUMBER" }` </br>
    `{ "message": "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [NAME],[LOGO_URL]" }`<br/>
    `{ "message": "LOGO BRAND ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 255" }`<br/> 
    `{ "message": "NAME BRAND ONLY ALLOW VALUES WITH LETTER AND NUMBER" }`<br/> 
    `{ "message": "NAME BRAND ONLY ALLOW VALUES WITH LENGTH BETWEEN 3 AND 60" }`<br/> 
    `{ "message": "PLEASE ENTRE SOLO URL. FORMAT EXAMPLE : (HTTP://FOO.COM)" }`<br/> 

  - **Code:** 401 UNAUTHORIZED <br/>
    **Content:** <br/>
    `{ "mesagge": "UNAUTHORIZED ACCESS " }`<br/>
    `{ "message": "INVALID TOKEN " }`<br/>
    `{ "message": "JWT MALFORMED " }`<br/>
    `{ "message": "JWT EXPIRED " }`<br/>

    
  - **Code:** 404 NOT FOUND <br/>
    **Content:** <br/> `{ "message": "BRAND NOT EXIST" }` 

- **Sample Call:**

```
  curl --request PUT 
    --url 'http://localhost:3000/brands/[ID-BRAND]'
    --header 'Authorization: Bearer  [YOUR-TOKEN] '
	--data '{
      "name": "villavicencio",
    }'
```
o
```
  curl --request PUT 
    --url 'http://localhost:3000/brands/[ID-BRAND]'
    --header 'Authorization: Bearer  [YOUR-TOKEN] '
	--data '{
      "name": "coca cola",
      "logo_url": "https://picsum.photos/id/237/200/300",
    }'
```


## Endpoints User 

### **Registar** 

- **URL**

  _/users/register_

- **Method:**

  `POST` - registra a un usuario

- **Request Headers**

  _No requiere para este endpoint_

- **Body**

	Los parámetros deben enviarse como JSON.<br/>
	Estos son los parámetros que esperará el end-point:

	- **email**: email / usuario de la cuenta(Unico).
	- **password**:  clave/contrasena de ingreso a la cuenta.


- **Success Response:**

  Este metodo devolvera un mensaje confirmando si la marca se ah registrado exitosamente en el sistema al usuario,caso contrario informa un error.

  - **Code:** 201 CREATED<br />
    **Content:** 
	```
	{ "message": "USER REGISTER SUCCESSFULLY" }
	```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** <br/> `{ "message": "PASSWORD ONLY ALLOW VALUES WITH LENGTH BETWEEN 5 AND 60" }`<br/>
   `{ "message": "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [EMAIL],[PASSWORD]" }`<br/>
    `{ "message": "EMAIL ALREADY IN USE!" }`<br/> 
    `{ "message": "EMAIL ONLY ALLOW VALUES TYPE OF MAILS" }`<br/> 

		

- **Sample Call:**

	``` 
	curl -X POST  
	http://localhost:3000/users/register
	```
<br/>

### **Logear** 

- **URL**

  _/users/login_

- **Method:**

  `POST` - crea una session de usuario.

- **Request Headers**

    _No requiere para este endpoint_

- **Success Response:**

  Este método retorna un token(Utilizado para identificar permisos en la aplicacion).

  - **Code:** 200 OK <br />
    **Content:** 
	```
	`{
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiVXN1YXJpb1BydWViYUBnbWFpbC5jb20iLCJpYXQiOjE2MzgxMzczODEsImV4cCI6MTYzODEzNzUwMX0.-faEqMeHtf4cqz2VBTEPeStkhOI_MiaMnRgH1Ge451s"
	}`
	```
- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:** <br/> `{ "message": "BAD REQUEST, AT LEAST ONE OF THE FOLLOWING PARAMS IS MISSING: [EMAIL],[PASSWORD]" }`<br/>
    `{ "message": "CREDENTIAL ERRROR" }`<br/>
    `{ "message": "EMAIL ALREADY IN USE!" }`<br/> 
    `{ "message": "EMAIL ONLY ALLOW VALUES TYPE OF MAILS" }`<br/> 

  - **Code:** 404 NOT FOUND <br />
    **Content:** <br/> `{ "message": "EMAIL/USER NOT EXIST" }`



- **Sample Call:**

	```
	curl -X POST   
	http://localhost:3000/users/login  
	```
<br/>



## **Example code snippets**

El repositorio cuenta con un folder(**Postman - Queries**) que con tiene un archivo JSON para importar los endpoints con ejemplos en [Postman](https://www.postman.com/downloads/?utm_source=postman-home)

## Deploy 

Esta api se desplego en AWS en una instancia gratuita de ubuntu, para obtener acceso al ip publica envíe un correo electrónico a agustinmansilla240@gmail.com.

## ¿Necesitas ayuda? 

Para cualquier pregunta, envíe un correo electrónico a agustinmansilla240@gmail.com y te ayudare :)
