export const ModeloHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Hotelefy</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(to bottom, cyan 30%, white 30%);
        }
        h1 {
            text-align: center;
            font-size: 2.5rem;
            color: #333333;
            margin-top: 50px;
        }
        img {
            display: block;
            margin: 20px auto;
            width: 80%;
            max-width: 600px;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
        }
        p {
            text-align: center;
            font-size: 1.2rem;
            color: #555555;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>Bienvenido a Hotelefy</h1>
    <img src="./logoEmp.jpg" alt="Imagen representativa">
    <p>Felicidades, su usuario %name% ha sido creado exitosamente. Muchas gracias por inscribirse en nuestra página Hotelefy.</p>
</body>
</html>
`;
