import express from 'express';
import dotenv from 'dotenv';
import {Initializer} from "./config/init/initializer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
    res.send('Microserviço de Notificação está rodando!');
});


Initializer.initialize()
    .then(() => console.log('Microserviço inicializado com sucesso.'))
    .catch((error) => {
        console.error('Falha ao inicializar o microserviço:', error);
        process.exit(1);
    });
app.listen(PORT, () => {
    console.log(`Microserviço rodando na porta ${PORT}`);
});
