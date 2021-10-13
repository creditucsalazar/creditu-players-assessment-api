## Descripción

API desarrollada en NestJS para proponer la solución al desafío técnico de Creditú

## Instalar dependencias

```bash
$ npm install
```

## Fijar variable de entorno con las credenciales de la base de datos
``` bash
export MONGODB_URI=srv+mongodb://usuario:clave@cluster/basededatos
```

## Levantar el servicio

```bash
$ npm run start:dev
```

## Ejecutar pruebas unitarias

```bash
$ npm run test
```

## Ver cobertura de código de pruebas unitarias
``` bash
$ npm run test:cov
```

## Ejecutar pruebas funcionales
``` bash
$ npm run test:functional
```

## Ejecutar pruebas de mutación
``` bash
$ npm run test:mutation
```


## Levantar contenedor docker
```bash
$ docker run -it -p 3000:300 -e MONGODB='srv+mongodb://usuario:clave@cluster/basededatos' creditucsalazar/creditu-players-assessment-api
```
