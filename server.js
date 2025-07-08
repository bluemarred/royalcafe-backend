const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Reservas';
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

app.get('/reservas', async (req, res) => {
  try {
    const response = await fetch(AIRTABLE_URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      }
    });
    const data = await response.json();
    res.json(data.records);
  } catch (error) {
    res.status(500).send('Error al obtener reservas');
  }
});

app.post('/reservas', async (req, res) => {
  const fields = req.body;
  try {
    const response = await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error al enviar reserva');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
