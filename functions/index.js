
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
      })
      return res.status(204).json();  
  } catch  (error) {
      return res.status(500).send(error); 
  }
})
//Obtener propietario con id
app.get("/api/propietario/:id", async (req,res)=>{
    try {
        const doc=db.collection("propietario")
        .doc(req.params.id);
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
          ...doc.data()
        
      }));

      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).send(error); 
  }
});

//actualizar un propietario
app.put("/api/propietario/:id", async (req,res)=>{
  try {
      const document = db.collection('propietario')
          .doc(req.params.id);
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
app.delete("/api/propietario/:id", async (req,res) =>{
  try {
      const document= db.collection("propietario")
          .doc(req.params.id);
          await document.delete();
          return res.status(200).json();
          
  } catch (error) {
      return res.status(500).send(error); 
  }
});

//obtener solo las IDN de los propietarios
app.get("/api/prop/idn", async(req, res)=>{
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
  


//************* Revisiones*/

//guardar revisiones
app.post("/api/revisiones", async(req,res)=>{
    try {
        await db.collection("revisiones")
        .doc()
        .create({
            nombreR: req.body.nombreR,
        })
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
  })
  //Obtener revisiones con id
  app.get("/api/revisiones/:id", async (req,res)=>{
      try {
          const doc=db.collection("revisiones")
          .doc(req.params.id);
          const  item= await doc.get();
          const response= item.data();
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).send(error); 
      }
    });
  
  //todos los revisiones
  app.get("/api/revisiones", async(req, res)=>{
    try {
       
        const query = db.collection("revisiones")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
  
        const response =docs.map(( doc) =>({
            id:doc.id,
            ...doc.data()
          
        }));
  
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
  });
  
  //actualizar un revisiones
  app.put("/api/revisiones/:id", async (req,res)=>{
    try {
        const document = db.collection('revisiones')
            .doc(req.params.id);
            document.update({
                nombreR: req.body.nombreR,         
            });
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
  });
  //eliminar un revisiones
  app.delete("/api/revisiones/:id", async (req,res) =>{
    try {
        const document= db.collection("revisiones")
            .doc(req.params.id);
            await document.delete();
            return res.status(200).json();
            
    } catch (error) {
        return res.status(500).send(error); 
    }
  });


  //************* Tecnico*/

//guardar tecnico
app.post("/api/tecnico", async(req,res)=>{
    try {
        await db.collection("tecnico")
        .doc()
        .create({
            nombreT: req.body.nombre,
            apellido:req.body.apellido,
            telefono:req.body.telefono,
        })
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
  })
  //Obtener tecnico con id
  app.get("/api/tecnico/:id", async (req,res)=>{
      try {
          const doc=db.collection("tecnico")
          .doc(req.params.id);
          const  item= await doc.get();
          const response= item.data();
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).send(error); 
      }
    });
  
  //todos los tecnico
  app.get("/api/tecnico", async(req, res)=>{
    try {
       
        const query = db.collection("tecnico")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
  
        const response =docs.map(( doc) =>({
            id:doc.id,
            ...doc.data()
          
        }));
  
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
  });
  
  //actualizar un tecnico
  app.put("/api/tecnico/:id", async (req,res)=>{
    try {
        const document = db.collection('tecnico')
            .doc(req.params.id);
            document.update({
                nombreT: req.body.nombreT,
                apellido:req.body.apellido,
                telefono:req.body.telefono,        
            });
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
  });
  //eliminar un tecnico
  app.delete("/api/tecnico/:id", async (req,res) =>{
    try {
        const document= db.collection("tecnico")
            .doc(req.params.id);
            await document.delete();
            return res.status(200).json();
            
    } catch (error) {
        return res.status(500).send(error); 
    }
  });

//*************automovil */

//guardar automovil
app.post("/api/automovil", async(req,res)=>{
    try {
        await db.collection("automovil")
        .doc()
        .create({
            duenoId: req.body.duenoId,
            marca: req.body.marca,
            modelo:req.body.modelo,
            ano:req.body.ano,
        })
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
})

//Obtener automovil con id
app.get("/api/automovil/:id", async (req,res)=>{
    try {
        const doc=db.collection("automovil")
        .doc(req.params.id);
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
        
        const query = db.collection("automovil")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response =docs.map(( doc) =>({
            id:doc.id,
            mantenimiento:doc.data().mantenimiento,
            ...doc.data()
        
        }));
    
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).send(error); 
      }
});
    
//actualizar un automovil
app.put("/api/automovil/:id", async (req,res)=>{
    try {
        const document = db.collection('automovil')
            .doc(req.params.id);
            document.update({
                duenoId: req.body.duenoId,
                marca: req.body.marca,
                modelo:req.body.modelo,
                ano:req.body.ano,        
            });
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
});

//eliminar un automovil
app.delete("/api/automovil/:id", async (req,res) =>{
    try {
        const document= db.collection("automovil")
            .doc(req.params.id);
            await document.delete();
            return res.status(200).json();
            
    } catch (error) {
        return res.status(500).send(error); 
    }
});


//mantenimiento

//guardar mantenimiento en automovil
app.post("/api/automovil/:id/mantenimiento", async(req,res)=>{
    try {
        await db.collection("automovil")
        .doc(req.params.id).collection("mantenimiento").doc()
        .create({
            idAuto:req.params.id,
            fecha: req.body.fecha,
            revisionId: req.body.revisionId,
            tecnicoId:req.body.tecnicoId,
            automovilId:req.body.automovilId,
            duenoId:req.body.duenoId,
        })
        return res.status(204).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
})

//todos los mantenimiento
app.get("/api/automovil/:id/mantenimiento", async(req, res)=>{
    try {    
        const query = db.collection("automovil").doc(req.params.id).collection("mantenimiento")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response =docs.map(async( doc) =>({
            id:doc.id,
           ...doc.data()
        }))
       
    
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).send(error); 
      }
});
//extras
//mostrar automoviles con idDueño 
app.get("/api/auto/:iddueno", async(req, res)=>{
    try {
        
        const query = db.collection("automovil").where("duenoId", "==", req.params.iddueno);
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response =docs.map(( doc) =>({
            id:doc.id,
            marca:doc.data().marca,
        
        }));
    
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).send(error); 
      }
});
//mostrando los id de los automoviles
app.get("/api/auto", async(req, res)=>{
    try {
        
        const query = db.collection("automovil")
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response =docs.map(( doc) =>({
            id:doc.id,
        }));
    
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).send(error); 
      }
});

//obtengo todas los mantenimientos sin pasar id de automovil
app.get("/api/automovil/mantenimiento/group", async(req, res)=>{
    try {
        const querySnapshot = await db.collectionGroup('mantenimiento').get();
        const docs = querySnapshot.docs;
        const response =docs.map(( doc) =>({
            id:doc.id,
            ...doc.data()
        }))

        const querySnapshot1 = await db.collectionGroup('mantenimiento').get();
        const docs1 = querySnapshot1.docs;
        const response1 =docs1.map(( doc) =>({
            id:doc.id,
            fecha:doc.data().fecha,
            idAuto:doc.data().automovilId,
        }))

        const propietarios = response.map(async(d) =>{
            const doc = await db.collection('propietario').doc(d.duenoId).get();
            const item ={nombre:doc.data().nombre}
            return  item
        })
        const revisiones = response.map( async (d) =>{
            const doc = await db.collection('revisiones').doc(d.revisionId).get();
            const item ={revision:doc.data().nombreR}
            return item;
        })

        const tecnicos = response.map( async (d) =>{
            const doc = await db.collection('tecnico').doc(d.tecnicoId).get();
            const item = {tecnico:doc.data().nombreT}
            return item;
        })

        const automoviles =  response.map( async (d) =>{
            const doc = await db.collection('automovil').doc(d.automovilId).get();
            const item ={automovil:doc.data().marca}
            return item;
        })

       const data=await Promise.all(propietarios);
       const data1=await Promise.all(revisiones);
       const data2=await Promise.all(tecnicos);
       const data3=await Promise.all(automoviles);


       //console.log('data:',data1[0].revision);
     
        const elemento = data.map((d,i)=>(
            {
                id:response[i].id,
                idAuto:response1[i].idAuto,
                fecha:response1[i].fecha,
                propietario:d.nombre,
                revisiones:data1[i].revision,
                tecnico:data2[i].tecnico,
                automovil:data3[i].automovil,
            }
        ))
   
        return res.status(200).json(elemento);
    } catch (error) {
        console.log(error)
    }
   
});

//eliminar un elemento del mantenimiento 
app.delete("/api/automovil/:idAuto/mantenimiento/:id", async(req,res)=>{
    try {
        const document =  db.collection("automovil")
        .doc(req.params.idAuto).collection("mantenimiento").doc(req.params.id)
        await document.delete();
        return res.status(200).json();  
    } catch  (error) {
        return res.status(500).send(error); 
    }
})

//Obtener mantenimiento de un automovil 
app.get("/api/automovil/:id/mantenimiento/:idmantenimiento", async (req,res)=>{
    try {
        const doc=db.collection("automovil")
        .doc(req.params.id).collection("mantenimiento").doc(req.params.idmantenimiento);
        const  item= await doc.get();
        const response= item.data();

        console.log('response:',response);

        const docP=db.collection("propietario")
        .doc(response.duenoId);
        const  itemP= await docP.get();
        const propietarios= itemP.data().nombre;

        const docR=db.collection("revisiones")
        .doc(response.revisionId);
        const  itemR= await docR.get();
        const revisiones= itemR.data().nombreR;


        console.log('revisiones',revisiones);
        const docT=db.collection("tecnico")
        .doc(response.tecnicoId);
        const  itemT= await docT.get();
        const tecnico= itemT.data().nombreT;
        
        const docA=db.collection("automovil")
        .doc(response.automovilId);
        const  itemA= await docA.get();
        const automovil= itemA.data().marca;

        
        const data ={
            id:req.params.idmantenimiento,
            idAuto:response.automovilId,
            fecha:response.fecha,
            propietarios,
            revisiones,
            tecnico,
            automovil
        }
       //const data=await Promise.all(propietarios);
        console.log('data:',data);

       //console.log('data:',data1[0].revision);
    


        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).send(error); 
    }
});

//OBTENER SOLO LOS MANTENIMIENTOS DE UN AUTOMOVIL ID

//Obtener mantenimiento de un automovil 
app.get("/api/automovil/:id/mantenimiento/:idmantenimiento/ids", async (req,res)=>{
    try {
        const doc=db.collection("automovil")
        .doc(req.params.id).collection("mantenimiento").doc(req.params.idmantenimiento);
        const  item= await doc.get();
        const response= item.data();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error); 
    }
});


//actualizar mantenimiento
app.put("/api/automovil/:id/mantenimiento/:idmantenimiento/:idP/:idA/:idR/:idT", async (req,res)=>{
    try {
        const documentM=db.collection("automovil")
        .doc(req.params.id).collection("mantenimiento").doc(req.params.idmantenimiento);
        documentM.update({
            fecha:req.body.fecha,
        });
 
        const documentP = db.collection('propietario')
        .doc(req.params.idP);
        documentP.update({
            nombre: req.body.nombre,         
        });

        const documentA = db.collection('automovil')
        .doc(req.params.idA);
        documentA.update({
            marca: req.body.marca,       
        });

        const documentR = db.collection('revisiones')
        .doc(req.params.idR);
        documentR.update({
            nombreR: req.body.nombreR,         
        });

        const documentT = db.collection('tecnico')
          .doc(req.params.idT);
          documentT.update({
              nombreT: req.body.nombreT,         
          });
  
            return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error); 
    }
});




app.get("/api/automovil/mantenimiento/propietario", async(req, res)=>{
    try {
        const querySnapshot = await db.collectionGroup('mantenimiento').get();
        const docs = querySnapshot.docs;
        const response =docs.map(( doc) =>({
            ...doc.data()
        }))
        
    return res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
   
});
exports.app= functions.https.onRequest(app);