import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc,doc, updateDoc, query, where } from 'firebase/firestore/lite';
const allowedCVDomain = "https://wetransfer.com/";
const firebaseConfig = {
                apiKey: "AIzaSyBjrmEJhEf0EKI7Fkwj5Zl37WHdsW_MPL8",
                authDomain: "bolsa-de-empleo-56fbd.firebaseapp.com",
                projectId: "bolsa-de-empleo-56fbd",
                storageBucket: "bolsa-de-empleo-56fbd.appspot.com",
                messagingSenderId: "573667558760",
                appId: "1:573667558760:web:4cbd296a8de6b5391182dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendApprove(to,message,name_to,position){
  const result = await emailjs.send("service_fve8q39","template_69bxztp",{
        to_name: name_to,
        message:  "Aplicación para el cargo de: " + position + "\r\n" + message,
        to_email: to,
   });

   return result;
}

async function sendReject(to,message,name_to,position){
    const result = await emailjs.send("service_fve8q39","template_hzmapue",{
          to_name: name_to,
          message:  "Aplicación para el cargo de: " + position + "\r\n" + message,
          to_email: to,
     });
  
     return result;
}

document.addEventListener("DOMContentLoaded",function() {
    const btnApply = document.querySelector("#apply");
    const cvUrl =  document.querySelector("#cv_url");
    const apps = document.querySelector("#aplicaciones");

    if(btnApply){
        btnApply.addEventListener("click",async function(evt) {          
            try{
                await addDoc(collection(db, "aplications"), {
                    job_op_id: this.getAttribute('data-recruiter-id'),
                    job_id:  this.getAttribute('data-job-id'),
                    candidate_name:  this.getAttribute('data-name'),
                    candidate_degree: this.getAttribute('data-degree'),
                    candidate_email: this.getAttribute('data-email'),
                    cv_url: cvUrl.value,
                    job_op_name: this.getAttribute('data-recruiter-name'),
                    status: 'PENDING'
                });

                alert("Tu aplicacion ha sido enviada");
            }catch(err){
                console.log(err);
            }
        });
    }

    if(apps){
        async function showapps() {
            const q = query(collection(db, "aplications"), where("status", "==", "PENDING"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (fdoc) => {
                 const job = fdoc.data();
                 const id_doc = fdoc.id
                 const jobRef = doc(db, "aplications", id_doc); 
                 console.log(job);
                 const result = await fetch(`/wp-json/wp/v2/ofertas/${job.job_id}`);
                 const resJson = await result.json();
                 const article = document.createElement("article");
                 article.setAttribute("class","user-summary");
                 const h1 = document.createElement("h1");
                 const a = document.createElement("a");
                 h1.textContent = "Trabajo: " + resJson.title.rendered;
                 const ul = document.createElement("ul");

                 const li1 = document.createElement("li");
                 const li2 = document.createElement("li");
                 const li3 = document.createElement("li");
                 li3.setAttribute("style","margin: 5px 0 5px 0");
                 const li4 = document.createElement("li");
                 const labelAccept = document.createElement("label");
                 const labelReject = document.createElement("label");
                 const pa = document.createElement("p");
                 pa.textContent = "El mensaje que escribas arriba será enviado al aplicante junto con la notificación de si fue aceptada o no la aplicación al empleo";

                 labelAccept.textContent = "Aceptar";
                 labelReject.textContent = "Rechazar";

                 const label = document.createElement("label");
                 label.setAttribute("style","display: block");
                 label.textContent = "Puedes decirle algo al aplicante";
                 label.setAttribute("for","mensaje");
                 const emailTextArea = document.createElement("textarea");
                 const form = document.createElement("form");
                 form.setAttribute("method","GET");
                 form.setAttribute("action","/calificar");
                 emailTextArea.setAttribute("id","mensaje");
                 emailTextArea.setAttribute("style","height: 60px");
                 const wrapperRadio = document.createElement("div");

                 const rejectBtn = document.createElement("input");
                 rejectBtn.setAttribute("type","radio");
                 rejectBtn.setAttribute("name","calificar");
                 rejectBtn.value = "REJECT";
                 const acceptBtn = document.createElement("input");
                 acceptBtn.value = "ACCEPT";
                 acceptBtn.setAttribute("type","radio");
                 acceptBtn.setAttribute("style","width: 100px;");
                 rejectBtn.setAttribute("style","width: 100px;")
                 acceptBtn.setAttribute("name","calificar");
                 const submit = document.createElement("button");
                 submit.textContent = "Enviar Calificación";
                 
                 a.textContent = "Descargar CV";
                 a.setAttribute("href",job.cv_url);
                 a.setAttribute("target","_blank");
                 a.setAttribute("style","color: white; background: black; box-shadow: 1px 1px 2px gray;")

                 li1.textContent = `Correo Electronico: ${job.candidate_email}`;
                 li2.textContent = `Nombre Completo: ${job.candidate_name}`;
                 li3.appendChild(a);

                 article.appendChild(h1);
                 article.appendChild(li1);
                 article.appendChild(li2);
                 article.appendChild(li3);
                 form.appendChild(label);
                 form.appendChild(emailTextArea);
                 form.appendChild(pa);
                 wrapperRadio.appendChild(labelAccept);
                 wrapperRadio.appendChild(acceptBtn);
                 wrapperRadio.setAttribute("style","margin-top: 5px");
                 wrapperRadio.appendChild(labelReject);
                 wrapperRadio.appendChild(rejectBtn);
                 wrapperRadio.setAttribute("style","display: grid; grid-template-columns: 50px auto;")
                 form.appendChild(wrapperRadio);
                 submit.setAttribute("style","margin-top: 5px");

                 submit.addEventListener("click",async function(evt) {
                     evt.preventDefault();
                     document.querySelector("#aplicaciones").innerHTML = "<p style='text-align: center'>Procesando solicitud, porfavor espere...</p>";
                  
                     try{
                        await updateDoc(jobRef,{
                                status: document.querySelector('input[name="calificar"]:checked').value
                        });
                        if(document.querySelector('input[name="calificar"]:checked').value === "ACCEPT"){
                            const res = await sendApprove(job.candidate_email,emailTextArea.value,job.candidate_name,resJson.title.rendered);
                            alert("Has aceptado esta aplicación, se enviará un correo electrónico notificando al aplicante");
                            window.location.href = "/"
                        }else if(document.querySelector('input[name="calificar"]:checked').value === "REJECT"){
                            const res = await sendReject(job.candidate_email,emailTextArea.value,job.candidate_name,resJson.title.rendered);
                            alert("Has rechazado esta aplicación, se enviará un correo electrónico notificando al aplicante");
                            window.location.href = "/"
                        }
                     }catch(err){
                        console.log(err);
                        alert("ha ocurrido un error, intenta realizar la acción nuevamente");
                        window.location.href = "/aplicaciones"
                     }
                 });

                 form.appendChild(submit);
                 article.appendChild(form);
                 article.setAttribute("style","max-width: 500px;");

                 document.querySelector("#aplicaciones").appendChild(article);

                 console.log(resJson);
            });
        }
       showapps();
    }
});
