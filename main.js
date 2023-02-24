let n = 0;
const coreOffset=`--setcoreoffset `;
const coreClockLock=`--setclocks `;
const mmclk=`--setmem `;
const mmoff=`--memoffset `;
let cantidadGPU=6;
let MultiGPU=true;
let gpusdisponibles;
const red=`#ff4d4d`;
const green= `hsla(150, 100%, 40%, 0.7)`;
const stableColor=`black`;
const letrasInputColor=`white`;
let finalOC=``;
const MAXOC=100000;
let colorDestello=`rgba(255, 255, 255, 0.4)`;
let copyColor=`rgba(255, 255, 255, 0.4)`;
let timerisRunning=false;

function limpiar(identificacion){
  let caja=document.getElementById(`cajaOC`);
  let gpu = document.getElementById(identificacion);
    // Accedemos al elemento <tr> que contiene a todos los elementos de la fila
    if ((hayValores(gpu.id))&&(caja.value>``)){
        destellar(`cajaOC`, colorDestello);
      }
    gpu.nombre.value = ``;
    gpu.inputSetting.coff.value = ``;
    gpu.inputSetting.coclk.value = ``;
    gpu.inputSetting.mmclk.value = ``;
    gpu.inputSetting.mmoff.value = ``;
    gpu.checkbox.disabled=true; 
  };

function eliminarElemento(identificacion){
    let elemento=document.getElementById(identificacion);
    elemento.value=``;
};

function esNum(num){
  if ((/^\d+$/.test(num)) && !(typeof(num)==='undefined')){
    return true;
  }
  else{

    return false;
  }
}

function determinarOC(gpu){
  let placa=document.getElementById(gpu);
  let nvtoolString=``;
  if (esNum(placa.inputSetting.coff.value)){
    nvtoolString=nvtoolString+` `+coreOffset+placa.inputSetting.coff.value;
  };
  if (esNum(placa.inputSetting.coclk.value)){
    nvtoolString=nvtoolString+' '+coreClockLock+placa.inputSetting.coclk.value;
  };
  if (esNum(placa.inputSetting.mmclk.value)){
    nvtoolString=nvtoolString+' '+mmclk+placa.inputSetting.mmclk.value;
  }
  if (esNum(placa.inputSetting.mmoff.value)){
    nvtoolString=nvtoolString+' '+mmoff+placa.inputSetting.mmoff.value;
  };
  if (placa.nvtool!=nvtoolString){
  placa.nvtool=nvtoolString+` `;
  };

};


function createElements(cantidad) {

  if (cantidad>0){
    let miDiv = document.getElementById('gpu');
    let info=document.createElement('p');
  while (n < cantidad) {
        let space = document.createElement('span');
        space.textContent=' ';
        let nuevaGPU = document.createElement('div');
        //Creacion del check para todos los check:
        
        nuevaGPU.nombre = document.createElement('input');
        nuevaGPU.gpuN = document.createElement(`p`);
        nuevaGPU.gpuN.textContent=(`GPU${n}`);
        nuevaGPU.gpuN.numero = n;
        nuevaGPU.nuevoBoton = document.createElement('button');
        nuevaGPU.botonLimpiar = document.createElement('button');
        nuevaGPU.status=document.createElement(`input`);
        nuevaGPU.checkbox = document.createElement('input');
        nuevaGPU.checkbox.type=`checkbox`;
        nuevaGPU.checkbox.id=`check${n}`;
        nuevaGPU.checkbox.className=`check`;
        nuevaGPU.inputSetting={
            coff : document.createElement('input'),
            coclk : document.createElement('input'),
            mmclk : document.createElement('input'),
            mmoff : document.createElement(`input`)
        };
        nuevaGPU.inputSetting.coff.type=`number`;
        nuevaGPU.inputSetting.coclk.type=`number`;
        nuevaGPU.inputSetting.mmclk.type=`number`;
        nuevaGPU.inputSetting.mmoff.type=`number`;
        nuevaGPU.nuevoParrafo = document.createElement('p');
        nuevaGPU.nuevoBoton.textContent = `Boton GPU${n}`;
        nuevaGPU.botonLimpiar.textContent = 'Clean';
        nuevaGPU.botonLimpiar.id=`clean`;
        nuevaGPU.nombre.placeholder = 'GPU (optional)';
        nuevaGPU.nombre.className=`inputs`;
        nuevaGPU.nombre.id=`placa`;
        nuevaGPU.inputSetting.coff.placeholder = 'Core c-OFFSET';
        nuevaGPU.inputSetting.coclk.placeholder = 'Core c-LOCK';
        nuevaGPU.inputSetting.mmclk.placeholder = 'Memory c-LOCK';
        nuevaGPU.inputSetting.mmoff.placeholder = 'Memory c-OFFSET';
        nuevaGPU.inputSetting.coff.id= `s1${n}`;
        nuevaGPU.inputSetting.coclk.id=`s2${n}`;
        nuevaGPU.inputSetting.mmclk.id=`s3${n}`;
        nuevaGPU.inputSetting.mmoff.id=`s4${n}`;
        nuevaGPU.inputSetting.coff.className= `inputs`;
        nuevaGPU.inputSetting.coclk.className=`inputs`;
        nuevaGPU.inputSetting.mmclk.className=`inputs`;
        nuevaGPU.inputSetting.mmoff.className=`inputs`;
        nuevaGPU.id=`GPU${n}`;
        nuevaGPU.gpuN.className = 'nombres';
        nuevaGPU.cargada=false;
        if (n==0){
          let miSubdiv=document.createElement(`div`);
          let descripcioncheck=document.createElement(`span`);
          descripcioncheck.textContent=`Check/uncheck All`;
          descripcioncheck.id=`checktexto`
          let checkall=document.createElement(`input`);
          checkall.type=`checkbox`;
          checkall.id=`todochange`;
          checkall.className="inputs";
          miSubdiv.id=`subdiv`
          
          checkall.addEventListener(`change`,function(){
            changeCheckAll();
            createFinalOC(gpusdisponibles);
            
                
            
          })
          miDiv.appendChild(miSubdiv);
          miSubdiv.appendChild(descripcioncheck);
          miSubdiv.appendChild(checkall);

        }
        
        miDiv.appendChild(nuevaGPU);
        miDiv.appendChild(nuevaGPU.gpuN);
        miDiv.appendChild(nuevaGPU.nombre);
        miDiv.appendChild(nuevaGPU.inputSetting.coff);
        miDiv.appendChild(nuevaGPU.inputSetting.coclk);
        miDiv.appendChild(nuevaGPU.inputSetting.mmoff);
        miDiv.appendChild(nuevaGPU.inputSetting.mmclk);
        miDiv.appendChild(nuevaGPU.botonLimpiar);
        miDiv.appendChild(nuevaGPU.checkbox);
        miDiv.appendChild(nuevaGPU.status);
        nuevaGPU.botonLimpiar.className=`botonLimpiar`;
        nuevaGPU.status.id=`status${n}`;
        nuevaGPU.status.className="status";
        document.getElementById(`status${n}`).setAttribute("readonly", "true");
        nuevaGPU.status.value=`NO OC`;         
        nuevaGPU.nvtool=``;
        nuevaGPU.status.style.backgroundColor = red;
        nuevaGPU.cargada=false;
        nuevaGPU.checkbox.disabled=true;
        colorear(nuevaGPU.id,stableColor);
        nuevaGPU.checkbox.addEventListener(`change`,function (){
          if ((nuevaGPU.checkbox.checked)){
              
              destellar(`cajaOC`,colorDestello);
              nuevaGPU.status.style.backgroundColor = green;
              nuevaGPU.status.value=`OK!`;
             
              nuevaGPU.cargada=true;
      
              
          }
          else{
            nuevaGPU.status.value=`NO OC`;
            nuevaGPU.status.style.backgroundColor = red;
            nuevaGPU.nvtool=``;
          };
        createFinalOC(gpusdisponibles);
        //console.log(`nvtool disabled: ${nuevaGPU.id} nvtool: `+nuevaGPU.nvtool);
        });
        const elementos = document.querySelectorAll('.inputs');
        elementos.forEach(function(element) {
              element.addEventListener('input', function() {
              colorear(nuevaGPU.id,stableColor);
              
                if (hayValores(nuevaGPU.id)){
                  nuevaGPU.checkbox.disabled=false;
                  
                  }
                  else{
                    
                    nuevaGPU.status.value=`NO OC`;
                    nuevaGPU.status.style.backgroundColor=red;
                    nuevaGPU.checkbox.checked=false;
                    nuevaGPU.nvtool=``;
                    
                  };
                if ((nuevaGPU.checkbox.checked==true)){
                  }
              
              createFinalOC(gpusdisponibles);
            });
        });
        
        nuevaGPU.botonLimpiar.onclick = function() {
            limpiar(nuevaGPU.id);
            determinarOC(nuevaGPU.id)
            nuevaGPU.checkbox.checked=false;
            nuevaGPU.status.value=`NO OC`;
            nuevaGPU.status.style.backgroundColor=red;
            colorear(nuevaGPU.id,stableColor);
            createFinalOC(nuevaGPU.id);
            };
        miDiv.appendChild(nuevaGPU.nuevoParrafo);
        n++;
        };
    miDiv.appendChild(info);
    };
};

function refreshStatus(gpuid){
let gpu=document.getElementById(gpuid);
  if ((gpu.checkbox.checked)){
    gpu.status.style.backgroundColor = green;
    gpu.status.value=`OK!`;
    gpu.cargada=true;
  }
  else{
    gpu.status.value=`NO OC`;
    gpu.status.style.backgroundColor = red;
    gpu.nvtool=``;
  };
}

function manejarError(variable){
  try {
    // Intenta utilizar la variable no definida
    console.log(variable);
  } catch (error) {
    // Captura y maneja el error
    console.error("Error: " + error.message);
  }
};
function hayValores(gpu){
if (gpu.startsWith(`GPU`)){
  let linea=document.getElementById(gpu);
  valores=linea.inputSetting.coff.value+linea.inputSetting.coclk.value+linea.inputSetting.mmclk.value+linea.inputSetting.mmoff.value;
  if (esNum(valores)){
    if ((okRange(linea.inputSetting.coff.value,0,MAXOC))&&(okRange(linea.inputSetting.coclk.value,0,MAXOC))&&(okRange(linea.inputSetting.mmclk.value,0,MAXOC))&&(okRange(linea.inputSetting.mmoff.value,0,MAXOC))){
      linea.checkbox.disabled=false
      return true;
    }else{
    linea.checkbox.checked=false;
    linea.checkbox.disabled=true;
    return false;
    }
  }
  else{
    linea.checkbox.checked=false;
    linea.checkbox.disabled=true;
    return false;
  };
}else{
  return false;
};
};

function manageOCInputs(gpu,status){
  let placa=document.getElementById(gpu);
  if ((status===1)||(status===0)){
    if ((status===0)){
      status='true';
    }
    else
    {
    status='false';
    }
      placa.inputSetting.coclk.readOnly=status;
      placa.inputSetting.coff.readOnly=status;
      placa.inputSetting.mmclk.readOnly=status;
      placa.inputSetting.mmoff.readOnly=status;
      //console.log(`setting `+status);
    };
  };
  
function whiteFont(itemid){
  item=document.getElementById(itemid);
  
}


function colorear(gpu,stableColor){
            let nuevaGPU=document.getElementById(gpu);
            nuevaGPU.inputSetting.coff.style.color=letrasInputColor;
            nuevaGPU.inputSetting.coclk.style.color=letrasInputColor;
            nuevaGPU.inputSetting.mmoff.style.color=letrasInputColor;
            nuevaGPU.inputSetting.mmclk.style.color=letrasInputColor;
            

            if (esNum(nuevaGPU.inputSetting.coff.value)){
              nuevaGPU.inputSetting.coff.style.backgroundColor=green;
              if (nuevaGPU.inputSetting.coff.value>MAXOC){
                nuevaGPU.inputSetting.coff.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.coff.style.color=`white`;
              nuevaGPU.inputSetting.coff.style.backgroundColor=stableColor;
            };
            if (esNum(nuevaGPU.inputSetting.coclk.value)){
            nuevaGPU.inputSetting.coclk.style.backgroundColor=green;
              if (nuevaGPU.inputSetting.coclk.value>MAXOC){
                nuevaGPU.inputSetting.coclk.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.coclk.style.color=`white`;
              nuevaGPU.inputSetting.coclk.style.backgroundColor=stableColor;
            }
            ;
            if (esNum(nuevaGPU.inputSetting.mmclk.value)){
              nuevaGPU.inputSetting.mmclk.style.backgroundColor=green;
                if (nuevaGPU.inputSetting.mmclk.value>MAXOC){
                  nuevaGPU.inputSetting.mmclk.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.mmclk.style.color=`white`;
              nuevaGPU.inputSetting.mmclk.style.backgroundColor=stableColor;
            };
            if (esNum(nuevaGPU.inputSetting.mmoff.value)){
              nuevaGPU.inputSetting.mmoff.style.backgroundColor=green;
                if (nuevaGPU.inputSetting.mmoff.value>MAXOC){
                  nuevaGPU.inputSetting.mmoff.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.mmoff.style.color=`white`;
              nuevaGPU.inputSetting.mmoff.style.backgroundColor=stableColor;
            };
}

function esTexto(variable){
  if (!(/^\d+$/.test(variable)) && (variable!='')){
    return true;
  }else{
    return false;
  }
};

function checkedIdArray(checkedArray){
  const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="check"]:checked');
  checkedArray = Array.from(checkboxes).map(checkbox => (checkbox.id).substring(5));
  return checkedArray;
  };

function createFinalOC(checkfromgpu){
  let commandString=``;
  checkfromgpu=checkedIdArray(checkfromgpu);
  let ocTextBox=document.getElementById(`cajaOC`);
  if (checkfromgpu.length>0){
      for (let i=0;i<checkfromgpu.length;i++){
        let gpuid=document.getElementById(`GPU${checkfromgpu[i]}`);
        determinarOC(gpuid.id);
        if ((i>0)&&(i<checkfromgpu.length)){
          commandString=commandString+`&& `;
        }
        commandString=commandString+`nvtool -i `+checkfromgpu[i];
        commandString=commandString+gpuid.nvtool;
        };
      finalOC=commandString;
      
      let echo=document.getElementById(`echocheck`);
      if (echo.checked){
        ocTextBox.value=`echo "`+finalOC+`" > /hive/miners/nv_oc.sh && chmod +x /hive/miners/nv_oc.sh`;
      }else{
        ocTextBox.value=finalOC;
      }
      
  }else{
      ocTextBox.value=``;
  }
  
    
  
};

function okRange(variable,minimo,maximo){
  if ((variable>=minimo) && (variable<=maximo)){
    return true
  }
  else {
    return false
  }
};
;
function reset(){
        if (n==0){
        }
        else{
        if(confirm(`RESET all data?`)){
          for (let i=0; i<cantidadGPU;i++){
            let gpu=document.getElementById(`GPU${i}`);
          };
        let ocTextBox=document.getElementById(`cajaOC`);
        let miDiv = document.getElementById('gpu');
        miDiv.textContent=``;
        cantidadGPU=0;
        n=0;
        ocTextBox.value=``;
        }
        }
}
function defaultGPU(cantidad){
  cantidadGPU=cantidad;
  createElements(cantidad);
};

function confirmaGPU(){
    let cant=parseInt(document.getElementById(`cantidad`).value);
    if (cantidadGPU+cant<101){
    cantidadGPU=cantidadGPU+cant;
    createElements(cantidadGPU);
}
};

delay();
function delay(){
  const intervalo= setInterval(() => {
  defaultGPU(cantidadGPU);
  var caja= document.getElementById("cajaOC");
  caja.value=``;
  clearInterval(intervalo);
  }, 300);
};

function destellar(inputid,color){
  if (!timerisRunning){
  let inputItem=document.getElementById(inputid);
  getColor=inputItem.style.backgroundColor;
  inputItem.style.backgroundColor=color;
  timerisRunning=true;
  setTimeout(()=>{
      inputItem.style.backgroundColor=getColor;
      timerisRunning=false;
      },300);
  };
};

/*
document.getElementById("myInput").addEventListener("click", function() {
  // Selecciona el contenido del input
  this.select();
  // Copia el contenido seleccionado al clipboard
  document.execCommand("copy");
  // Deselecciona el contenido
  this.setSelectionRange(0, 0);
});
*/
function changeCheckAll(){
    let check=document.getElementById(`todochange`);
    let bool=true;
    if (check.checked==false){
      bool=false;
    }
    for(let i=0;i<cantidadGPU;i++){
      let gpu=document.getElementById(`GPU${i}`);
      if (hayValores(`GPU${i}`)){
        gpu.checkbox.checked=bool
        refreshStatus(`GPU${i}`);
      }
    }
    
}

function copyToClipboard() {
  let boton= document.getElementById(`copy`)
  var input = document.getElementById("cajaOC");
  if (input.value>``){
  input.select();
  navigator.clipboard.writeText(input.value)
    .then(() => {

    })
    .catch((err) => {
      console.error("No se pudo copiar el texto: ", err);
    });
    destellar(`copy`,copyColor);
    setTimeout(()=>{
      destellar(`copy`,copyColor);;
    },500)
  }
}
