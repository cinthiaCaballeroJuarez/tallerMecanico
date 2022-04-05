
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const cors=require("cors");
//const cors = require('cors')({origin: true}); 
const app= express();
app.use(cors({ origin: true }));

const serviceAccount = require("./lugares-f23b6-firebase-adminsdk-adhfw-334727b232.json");
const { info } = require("firebase-functions/logger");
const { firebaseConfig } = require("firebase-functions");
const FieldValue=require('firebase-admin').firestore.FieldValue;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore();

//**************revisiones */


//************* PROPIETARIO*/

//guardar propietario
app.post("/api/propietario", async(req,res)=>{
  try {
      await db.collection("propietario")
      .doc()
      .create({
          idn:req.body.idn,
          nombre: req.body.nombre,
          apellido:req.body.apellido,
          telefono:req.body.telefono,
          automovil:[],
          
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
  app.get("/api/propietari/idn", async(req, res)=>{
    try {
       
        const query = db.collection("propietario")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
  
        const response =docs.map(( doc) =>({
            idn:doc.data().idn, 
        }));
  
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
          apellido:doc.data().apellido,
          telefono:doc.data().telefono,
          automovil:doc.data().automovil,
        
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
              apellido:req.body.apellido,
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
app.post("/api/propietario/:id/automovil", async(req,res)=>{
    try {
        await db.collection("propietario")
        .doc(req.params.id)
        .update('automovil',FieldValue.arrayUnion({
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
        }))
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
  })
//eliminar un automovil de un id en especifico
app.put("/api/propietario/:id/itemE", async (req,res)=>{
    try {
  
        await db.collection("propietario")
        .doc(req.params.id)
        .update({
            'automovil':FieldValue.arrayRemove({
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
            })
        })
       
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

//Obtener todo los automovil 
app.get("/api/propietario/id/automovil", async (req,res)=>{

    try {
        const query = db.collection("propietario")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
  
        const response =docs.map((doc) =>({
            id:doc.id,
            automovil:doc.data().automovil,
          
        }));
  
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

  //obtener un elemento de un automovil de un id en especifico
app.get("/api/propietario/automovil/:id/:item", async (req,res)=>{
    try {
        const doc=db.collection("propietario")
        .doc(req.params.id);
        const  item= await doc.get();
        const response= item.data().automovil[req.params.item];
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).send(error); 
    }
  }); 

 //obtener un automovil de un id en especifico
 app.get("/api/propietario/automovil/:id", async (req,res)=>{
    try {
        const doc=db.collection("propietario")
        .doc(req.params.id);
        const  item= await doc.get();
        const response= item.data().automovil;
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).send(error); 
    }
  });

//actualizar un automovil con item especifico
app.put("/api/propietario/:id/item", async (req,res)=>{
    try { 
        await db.collection("propietario")
        .doc(req.params.id)
        .update({
            'automovil':FieldValue.arrayUnion({
                marca: req.body.marca,
                modelo: req.body.modelo,
                ano: req.body.ano,
            })
        })
       
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

  


//Obtener todo los automovil y el id del propietario 
  app.get("/api/propietario/automovil/id", async (req,res)=>{

    try {
        const query = db.collection("propietario")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
  
        const response =docs.map((doc) =>({
            id:doc.id,
            automovil:doc.data().automovil,
          
        }));
  
        return res.status(200).json(response);
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
            dueño:req.body.dueño,
            modelo: req.body.modelo,
            fecha:req.body.fecha,
            revision: req.body.revision,
            tecnico:req.body.tecnico
        })
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
  })
  //verison de post como en automovil
  app.post("/api/propietario/:id/mantenimiento", async(req,res)=>{
    try {
        await db.collection("propietario")
        .doc(req.params.id)
        .update('mantenimiento', FieldValue.arrayUnion({
            id:req.body.id,
            dueño:req.body.dueño,
            modelo: req.body.modelo,
            fecha:req.body.fecha,
            revision: req.body.revision,
            tecnico:req.body.tecnico
        }))
      
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
  })

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

   //eliminar un  mantenimiento version auto
   app.put("/api/propietario/mantenimiento/:id/itemE", async (req,res) =>{
    try {
        await db.collection("propietario")
        .doc(req.params.id)
        .update({
            'mantenimiento':FieldValue.arrayRemove({
            id:req.body.id,
            dueño:req.body.dueño,
            modelo: req.body.modelo,
            fecha:req.body.fecha,
            revision: req.body.revision,
            tecnico:req.body.tecnico
            })
        })
        return res.status(200).json();
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
            dueño: doc.data().dueño,
            modelo: doc.data().modelo,
            fecha:doc.data().fecha,
            revision: doc.data().revision,
            tecnico:doc.data().tecnico
        }))
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

//todos los mantenimientos version auto
app.get("/api/propietario/id/mantenimiento", async(req, res)=>{
    try { 
        const query = db.collection("propietario")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
    
        const response =docs.map(( doc) =>({
            id:doc.id,
            mantenimiento:doc.data().mantenimiento,
        }))
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
    });

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

   //Obtener mantenimiento con id version auto
   app.get("/api/mantenimiento/:id/:item", async (req,res)=>{
    try {
        const doc=db.collection("propietario")
        .doc(req.params.id);
        const  item= await doc.get();
        const response= item.data().mantenimiento[req.params.item]
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

   //Obtener mantenimiento con id en especifico version auto
   app.get("/api/propietario/mantenimiento/:id", async (req,res)=>{
    try {
        const doc=db.collection("propietario")
        .doc(req.params.id);
        const  item= await doc.get();
        const response= item.data().mantenimiento; 
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
              dueño: req.body.dueño,
              modelo: req.body.modelo,
              fecha:req.body.fecha,
              revision: req.body.revision,
              tecnico:req.body.tecnico        
            });
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

   //actualizar un mantenimiento con item especifico version auto
   app.put("/api/propietario/mantenimiento/:id/item", async (req,res)=>{
    try {
        await db.collection('propietario')
            .doc(req.params.id)
            .update({
                'mantenimiento':FieldValue.arrayUnion({
                    id:req.body.id,
                    dueño: req.body.dueño,
                    modelo: req.body.modelo,
                    fecha:req.body.fecha,
                    revision: req.body.revision,
                    tecnico:req.body.tecnico  
                })
            })
           
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
  });
 
  //obtener todos los mantenimientos y el id del propietario
  app.get("/api/propietario/mantenimiento/id", async(req, res)=>{
    try {
       
        const query = db.collection("propietario")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
  
        const response =docs.map(( doc) =>({
            id:doc.id,
            mantenimiento:doc.data().mantenimiento,
        }))
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
  });


//*************TECNICOS */
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
            apellido:doc.data().apellido,
          
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
    
exports.app= functions.https.onRequest(app);