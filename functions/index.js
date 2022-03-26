const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
var cors = require('cors');

//const cors = require('cors')({origin: true}); 
const app= express();
app.use(cors({ origin: true }));

const serviceAccount = require("./lugares-f23b6-firebase-adminsdk-adhfw-334727b232.json");
const { info } = require("firebase-functions/logger");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();

//**************revisiones */

//guardat tecnicos
app.post("/api/tecnicos", async(req,res)=>{
  try {
      await db.collection("tecnicos")
      .doc()
      .create({
          apellido:req.body.apellido,
          nombre: req.body.nombre,
          telefono: req.body.telefono,
         
      })
      return res.status(204).json();  
  } catch  (error) {
      return res.status(500).send(error); 
  }
})
//Obtener tecnico con id
app.get("/api/tecnicos/:idtecnico", async (req,res)=>{
  try {
      const doc=db.collection("tecnicos")
      .doc(req.params.idtecnico);
      const  item= await doc.get();
      const response= item.data();
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//todos los tecnicos
app.get("/api/tecnicos/", async(req, res)=>{
  try {
     
      const query = db.collection("tecnicos")
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response =docs.map(( doc) =>({
          id:doc.id,
          nombre:doc.data().nombre,
          telefono:doc.data().telefono,
        
      }));

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//actualizar un tecnicos
app.put("/api/tecnicos/:idtecnico", async (req,res)=>{
  try {
      const document = db.collection('tecnicos')
          .doc(req.params.idtecnico);
          document.update({
              apellido:req.body.apellido,
              nombre: req.body.nombre,
              telefono: req.body.telefono,
              
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//eliminar un tecnico
app.delete("/api/tecnicos/:idtecnico", async (req,res) =>{
  try {
      const document= db.collection("tecnicos")
          .doc(req.params.idtecnico);
          await document.delete();
          return res.status(200).json();
          
  } catch (error) {
      return res.status(500).send(error); 
  }
});


//*************Revisiones */

//guardar revisones
app.post("/api/revisiones", async(req,res)=>{
  try {
      await db.collection("revisiones")
      .doc()
      .create({
          nombre: req.body.nombre,
      })
      return res.status(204).json();  
  } catch  (error) {
      return res.status(500).send(error); 
  }
})
//Obtener revision con id
app.get("/api/revisiones/:idrevisiones", async (req,res)=>{
  try {
      const doc=db.collection("revisiones")
      .doc(req.params.idrevisiones);
      const  item= await doc.get();
      const response= item.data();
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//todos los revisiones
app.get("/api/revisiones/", async(req, res)=>{
  try {
     
      const query = db.collection("revisiones")
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response =docs.map(( doc) =>({
          id:doc.id,
          nombre:doc.data().nombre,
          telefono:doc.data().telefono,
        
      }));

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//actualizar un revisiones
app.put("/api/revisiones/:idrevisiones", async (req,res)=>{
  try {
      const document = db.collection('revisiones')
          .doc(req.params.idrevisiones);
          document.update({
              nombre: req.body.nombre,          
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//eliminar un revision
app.delete("/api/revisiones/:idrevisiones", async (req,res) =>{
  try {
      const document= db.collection("revisiones")
          .doc(req.params.idrevisiones);
          await document.delete();
          return res.status(200).json();
          
  } catch (error) {
      return res.status(500).send(error); 
  }
});



//************* PROPIETARIO*/

//guardar propietario
app.post("/api/propietario", async(req,res)=>{
  try {
      await db.collection("propietario")
      .doc()
      .create({
          idn:req.body.idn,
          nombre: req.body.nombre,
          telefono:req.body.telefono
      })
      return res.status(204).json();  
  } catch  (error) {
      return res.status(500).send(error); 
  }
})
//Obtener propietario con id
app.get("/api/propietario/:idpropietario", async (req,res)=>{
  try {
      const doc=db.collection("propietario")
      .doc(req.params.idpropietario);
      const  item= await doc.get();
      const response= item.data();
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//todos los propietario
app.get("/api/propietario", async(req, res)=>{
  try {
     
      const query = db.collection("propietario")
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response =docs.map(( doc) =>({
          id:doc.id,
          idn:doc.data().idn,
          nombre:doc.data().nombre,
          telefono:doc.data().telefono,
        
      }));

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//actualizar un propietario
app.put("/api/propietario/:idpropietario", async (req,res)=>{
  try {
      const document = db.collection('propietario')
          .doc(req.params.idpropietario);
          document.update({
              nombre: req.body.nombre, 
              idn:req.body.idn,
              telefono:req.body.telefono,         
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//eliminar un propietario
app.delete("/api/propietario/:idpropietario", async (req,res) =>{
  try {
      const document= db.collection("propietario")
          .doc(req.params.idpropietario);
          await document.delete();
          return res.status(200).json();
          
  } catch (error) {
      return res.status(500).send(error); 
  }
});



//*************automovil */

//guardar automovil
app.put("/api/propietario/:idpropietario/automovil/new", async (req,res)=>{
  try {
      const document = db.collection('propietario')
          .doc(req.params.idpropietario);
          document.update('automovil',{
              marca: req.body.marca,
              modelo: req.body.modelo,
              ano: req.body.ano,                     
          }, {merge:true});
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//Obtener automovil con id
app.get("/api/propietario/:idpropietario/automovil", async (req,res)=>{

  try {
      const doc=db.collection("propietario")
      .doc(req.params.idpropietario);
      const  item= await doc.get();
      const response= item.data();
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//todos los automovil
app.get("/api/automovil", async(req, res)=>{
  try {
     
      const query = db.collection("propietario")
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response =docs.map((doc) =>({
          automovil: doc.data().automovil,   
      }));

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//todos los automovil con un id
app.get("/api/automovil/id", async(req, res)=>{
  try {
     
      const query = db.collection("propietario")
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response =docs.map((doc) =>({
          id:doc.id,
          automovil: doc.data().automovil,   
      }));

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//actualizar un automovil
app.put("/api/propietario/:idpropietario/automovil", async (req,res)=>{
  try {
      const document = db.collection('propietario')
          .doc(req.params.idpropietario);
          document.update( 'automovil',{
              marca: req.body.marca,
              modelo: req.body.modelo,
              ano: req.body.ano,                     
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});

//Eliminar un automovil

app.put("/api/propietario/:id/automovil/delete", async (req,res)=>{
  try {
      const document = db.collection('propietario')
          .doc(req.params.id);
          document.update( 'automovil',{
                                   
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});

app.delete("/api/propietario/:id/automovil/delete", async (req,res)=>{
  try {
      const document = db.collection('propietario')
          .doc(req.params.id);
          document.update( 'automovil',{
                                   
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});

//*************Mantenimiento */

//guardar mantenimiento
app.post("/api/mantenimiento", async(req,res)=>{
  try {
      await db.collection("mantenimiento")
      .doc()
      .create({
          idn: req.body.idn,
          dueño:req.body.dueño,
          marca: req.body.marca,
          fecha:req.body.fecha,
          revision: req.body.revision,
          tecnico:req.body.tecnico
      })
      return res.status(204).json();  
  } catch  (error) {
      return res.status(500).send(error); 
  }
})
//Obtener mantenimiento con id
app.get("/api/mantenimiento/:idmantenimiento", async (req,res)=>{
  try {
      const doc=db.collection("mantenimiento")
      .doc(req.params.idmantenimiento);
      const  item= await doc.get();
      const response= item.data();
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//todos los mantenimientos
app.get("/api/mantenimiento", async(req, res)=>{
  try {
     
      const query = db.collection("mantenimiento")
      const querySnapshot = await query.get();
      const docs = querySnapshot.docs;

      const response =docs.map(( doc) =>({
          id:doc.id,
          idn: doc.data().idn,
          dueño:doc.data().dueño,
          marca: doc.data().marca,
          fecha:doc.data().fecha,
          revision: doc.data().revision,
          tecnico:doc.data().tecnico
      }))
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//actualizar un mantenimiento
app.put("/api/mantenimiento/:id", async (req,res)=>{
  try {
      const document = db.collection('mantenimiento')
          .doc(req.params.id);
          document.update({
            idn: req.body.idn,
            dueño:req.body.dueño,
            marca: req.body.marca,
            fecha:req.body.fecha,
            revision: req.body.revision,
            tecnico:req.body.tecnico        
          });
          return res.status(200).json();
  } catch (error) {
      return res.status(500).send(error); 
  }
});
//eliminar un 
app.delete("/api/mantenimiento/:id", async (req,res) =>{
  try {
      const document= db.collection("mantenimiento")
          .doc(req.params.id);
          await document.delete();
          return res.status(200).json();
          
  } catch (error) {
      return res.status(500).send(error); 
  }
});


exports.app= functions.https.onRequest(app);