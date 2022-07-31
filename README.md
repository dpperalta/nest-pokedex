<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

6.  Llenar las variables de entorno definidas en el ```.env```

7. Ejecutra la aplicación con el comando:
```
npm run start:dev
```

8. Reconstruir la base de datos con el Seed
```
http://localhost:3000/api/v2/seed
```

## Stack utilizado
* MongoDB
* Nest


# Notas
Desplegar sin cambios en heroku
```
git commit --allow-empty -m "Trigger Heroku deploy"
git push heroku <master|main>
```