!function(){!async function(){try{const a=`/api/tareas?id=${r()}`,o=await fetch(a),n=await o.json();e=n,t()}catch(e){console.log("error")}}();let e=[];function t(){if(c(),0===e.length){const e=document.querySelector("#listado-tareas"),t=document.createElement("LI");return t.textContent="No hay tareas en este proyecto",t.classList.add("no-tareas"),void e.appendChild(t)}const o={0:"Pendiente",1:"Completo"};e.forEach((c=>{const s=document.createElement("LI");s.dataset.tareaId=c.id,s.classList.add("tarea");const d=document.createElement("P");d.textContent=c.nombre,d.ondblclick=function(){a(editar=!0,{...c})};const i=document.createElement("DIV");i.classList.add("opciones");const l=document.createElement("BUTTON");l.classList.add("estado-tarea"),l.classList.add(`${o[c.estado].toLowerCase()}`),l.textContent=o[c.estado],l.dataset.estadoTarea=c.estado,l.ondblclick=function(){!function(e){const t="1"===e.estado?"0":"1";e.estado=t,n(e)}({...c})};const m=document.createElement("BUTTON");m.classList.add("eliminar-tarea"),m.dataset.idTarea=c.id,m.textContent="Eliminar",m.ondblclick=function(){!function(a){Swal.fire({title:"Estas seguro que deseas eliminar la tarea?",showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then((o=>{o.isConfirmed&&async function(a){const{estado:o,id:n,nombre:c}=a,s=new FormData;s.append("id",n),s.append("nombre",c),s.append("estado",o),s.append("proyectoId",r());try{const o="http://localhost:3000/api/tarea/eliminar",n=await fetch(o,{method:"POST",body:s}),r=await n.json();r.resultado&&(Swal.fire("Eliminado",r.mensaje,"success"),e=e.filter((e=>e.id!==a.id)),t())}catch(e){console.log("error")}}(a)}))}({...c})},i.appendChild(l),i.appendChild(m),s.appendChild(d),s.appendChild(i);document.querySelector("#listado-tareas").appendChild(s)}))}function a(a=!1,c={}){const s=document.createElement("div");s.classList.add("modal"),s.innerHTML=`\n        <form class="formulario nueva-tarea">\n            \n        <legend>${a?"Editar Tarea":"Añade una nueva tarea"} </legend>\n            \n            <div class="campo">\n                <label>Tarea</label>\n                <input type="text" name="tarea" placeholder="${c.nombre?"Editar la tarea":"Añadir tarea al proyecto actual"}" id="tarea" value="${c.nombre?c.nombre:""}"> \n            </div>\n            \n            <div class="opciones">\n                <input type="submit" class="submit-nueva-tarea" value="${c.nombre?"Guardar Cambios":"Añadir Tarea"}" />\n                <button type="button" class="cerrar-modal">Cancelar</button>\n            </div>\n\n        </form>\n        `,setTimeout((()=>{document.querySelector(".formulario").classList.add("animar")}),0),s.addEventListener("click",(d=>{if(d.preventDefault(),d.target.classList.contains("cerrar-modal")){document.querySelector(".formulario").classList.add("cerrar"),setTimeout((()=>{s.remove()}),500)}if(d.target.classList.contains("submit-nueva-tarea")){const s=document.querySelector("#tarea").value.trim();if(""===s)return void o("El nombre de la tarea es obligatorio","error",document.querySelector(".formulario legend"));a?(c.nombre=s,n(c)):async function(a){const n=new FormData;n.append("nombre",a),n.append("proyectoId",r());try{const r="http://localhost:3000/api/tarea",c=await fetch(r,{method:"POST",body:n}),s=await c.json();if(o(s.mensaje,s.tipo,document.querySelector(".formulario legend")),"exito"===s.tipo){const o=document.querySelector(".modal");setTimeout((()=>{o.remove()}),3e3);const n={id:String(s.id),nombre:a,estado:"0",proyectoId:s.proyectoId};e=[...e,n],t()}}catch(e){console.log("error")}}(s)}})),document.querySelector(".dashboard").appendChild(s)}function o(e,t,a){c();const o=document.querySelector(".alerta");o&&o.remove();const n=document.createElement("div");n.classList.add("alerta",t),n.textContent=e,a.parentElement.insertBefore(n,a.nextElementSibling),setTimeout((()=>{n.remove()}),5e3)}async function n(a){const{estado:o,id:n,nombre:c,proyectoId:s}=a,d=new FormData;d.append("id",n),d.append("nombre",c),d.append("estado",o),d.append("proyectoId",r());try{const a="http://localhost:3000/api/tarea/actualizar",r=await fetch(a,{method:"POST",body:d}),s=await r.json();if("exito"===s.respuesta.tipo){Swal.fire(s.respuesta.mensaje,s.respuesta.mensaje,"success");const a=document.querySelector(".modal");a&&a.remove(),e=e.map((e=>(e.id===n&&(e.estado=o,e.nombre=c),e))),t()}}catch(e){console.log("error")}}function r(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).id}function c(){const e=document.querySelector("#listado-tareas");for(;e.firstChild;)e.removeChild(e.firstChild)}document.querySelector("#agregar-tarea").addEventListener("click",(function(){a()}))}();