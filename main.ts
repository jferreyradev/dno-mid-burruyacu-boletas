import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import { cors } from "https://deno.land/x/hono/middleware.ts";

const app = new Hono();

async function verifyIP() {
  const URL = "https://josrferreyr-apiserverde-79.deno.dev/items/\"Burruyacu";
  const resp = await fetch(URL, {
    headers: {
      accept: "application/json",
    },
  });
  const obj = await resp.json();
  console.log(obj.value.ip);
  return obj.value.ip || null;
}
//const URL_API = "http://www.servertafiviejo.duckdns.org:3007";
const PUBLIC_IP = await verifyIP()
const URL_API = `http://${PUBLIC_IP}:3003`;

// Usar el middleware de CORS
app.use('*', cors({
  origin: '*',  // Permitir cualquier origen
  methods: ['GET', 'POST', 'OPTIONS'],  // Permitir estos métodos
  headers: ['Content-Type']  // Permitir estos encabezados
}));

app.get("/config", async (c) => {
  const res = await fetch(`${URL_API}/api/view/configServer`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/list", async (c) => {
  const res = await fetch(`${URL_API}/api/view/list`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/users", async (c) => {
  const res = await fetch(`${URL_API}/api/view/users`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/user/:dni", async (c) => {
  const dni = c.req.param('dni')
  const res = await fetch(`${URL_API}/api/view/users?DNI=${dni}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/personas", async (c) => {
  const res = await fetch(`${URL_API}/api/view/personaLista`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/persona/:dni", async (c) => {
  const dni = c.req.param('dni')
  const res = await fetch(`${URL_API}/api/view/personaLista?Documento=${dni}`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/cargo/:persId", async (c) => {
  const persId = c.req.param('persId')
  const res = await fetch(`${URL_API}/api/view/cargo?PersonaId=${persId}`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/personacargo/:dni", async (c) => {
  const dni = c.req.param('dni')
  const res = await fetch(`${URL_API}/api/view/cargo?PersonaDocumento=${dni}`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.get("/personacargo/:dni/:orden", async (c) => {
  const dni = c.req.param('dni')
  const orden = c.req.parm('orden')
  const res = await fetch(`${URL_API}/api/view/cargo?PersonaDocumento=${dni}&Orden=${orden}`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

/*
app.get("/boleta/:idLiq", async (c) => {
  const idLiq = c.req.param('idLiq')
  const res = await fetch(`${URL_API}/api/boleta?IdLiq=${idLiq}`,  {
    method: 'GET',
    headers: {
          accept: "application/pdf",
        },
  })

  const fn = res.headers.get('content-disposition')

  c.res.headers.append("Access-Control-Allow-Origin","*")
  c.res.headers.append("content-type", "application/pdf")
  c.res.headers.append("Content-Disposition","attachment; filename = " + fn.split("=")[1] + ".pdf")

  return c.res
  
  //const jsonData = await res.json();
  //console.log(jsonData)
  //return c.json(jsonData)  
});
*/

app.get("/boletas/:dni", async (c) => {
  const dni = c.req.param('dni')
  const res = await fetch(`${URL_API}/api/view/boletas?Documento=${dni}&sort={"Periodo":"desc","Fechadev":"desc"}`,  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await res.json();
  //console.log(jsonData)
  return c.json(jsonData)  
});

app.post("/log", async (c) =>{
  
  const post = await c.req.json()

  const res = await fetch(`${URL_API}/api/sp/nuevoLog`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  })

  const jsonData = await res.json();
  //console.log(jsonData)
  return jsonData
});

app.post("/user", async (c) =>{

  const post = await c.req.json()

  const res = await fetch(`${URL_API}/api/sp/nuevoUsuario`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  })

  const jsonData = await res.json();
  return jsonData
});

app.post("/estadoBoleta", async (c) =>{

  const post = await c.req.json()

  const res = await fetch(`${URL_API}/api/sp/estadoBoleta`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  })

  const jsonData = await res.json();
  return jsonData
});

app.post("/estadoUsuario", async (c) =>{

  const post = await c.req.json()

  const res = await fetch(`${URL_API}/api/sp/setEstadoUsuario`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  })

  const jsonData = await res.json();
  return jsonData
});

app.post("/claveUsuario", async (c) =>{
  const post = await c.req.json()
  const res = await fetch(`${URL_API}/api/sp/setClaveUsuario`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
  })
  const jsonData = await res.json(); 
  return c.json(jsonData)
});

app.get("/sp/list", async (c) => {
  const res = await fetch(`${URL_API}/api/sp/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = await res.json();
  return c.json(jsonData);
});

app.post("/sp/:spname", async (c) => {
  const post = await c.req.json();
  const spName = c.req.param('spname')
  const res = await fetch(`${URL_API}/api/sp/${spName}`,
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }
  );
  const jsonData = await res.json();
  return c.json(jsonData);
});

Deno.serve(app.fetch);
