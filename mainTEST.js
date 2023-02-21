let n = 0;
let coreOffset=`--coreoffset `;
let coreClockLock=`--cclk-lock `;
let mmclk=`--mmclk `;
let cantidadGPU=0;



function limpiar(identificacion){
  let placa = document.getElementById(identificacion);
  console.log(`eliminado`);
  // Accedemos al elemento <tr> que contiene a todos los elementos de la fila
  placa.inputSetting.coff.value= ``;
  placa.inputSetting.coclk.value=``;
  placa.inputSetting.mmclk.value=``;
};

function eliminarElemento(identificacion){
    let elemento=document.getElementById(identificacion);
    console.log(`eliminad`);
    elemento.value=``;
};

function esNum(num){
  if ((/^\d+$/.test(num)) && !(typeof(num)==='undefined')){
    console.log(`es numero`);
    return true;
  }
  else{
    console.log(`no es numero`);
    return false;
  }
}

function determinarOC(gpu){
  let nvtoolString=``;
  let placa=document.getElementById(gpu);
  if (esNum(placa.inputSetting.coff.value)){
    console.log(`es numero`);
    nvtoolString=coreOffset+placa.inputSetting.coff.value+' ';
  }
  if (esNum(placa.inputSetting.coclk.value)){
    nvtoolString=nvtoolString+coreClockLock+placa.inputSetting.coclk.value;
  }
  if (esNum(placa.inputSetting.mmclk.value)){
    nvtoolString=nvtoolString+' '+mmclk+placa.inputSetting.mmclk.value;
  }
  placa.nvtool=nvtoolString;
  console.log(placa.nvtool);
};


function createElements(cantidad) {
  if (cantidad>0){
    let miDiv = document.getElementById('gpu');
    let info=document.createElement('p');
    info.textContent='      gpu              asfsaf          asfsa';
  while (n < cantidad) {
        let space = document.createElement('span');
        space.textContent=' ';
        let nuevaGPU = document.createElement('input');
        nuevaGPU.gpuN = document.createTextNode(`<div class="nombres">GPU${n}<\div>`);
        nuevaGPU.gpuN.numero = n;
        nuevaGPU.nuevoBoton = document.createElement('button');
        nuevaGPU.botonLimpiar = document.createElement('button');
        nuevaGPU.checkbox = document.createElement('input');
        nuevaGPU.checkbox.type=`checkbox`;
        nuevaGPU.checkbox.id=`check`;
        nuevaGPU.inputSetting={
            coff : document.createElement('input'),
            coclk : document.createElement('input'),
            mmclk : document.createElement('input'),
        };
        nuevaGPU.inputSetting.coff.type=`number`;
        nuevaGPU.inputSetting.coclk.type=`number`;
        nuevaGPU.inputSetting.mmclk.type=`number`;
        nuevaGPU.nuevoParrafo = document.createElement('p');
        nuevaGPU.nuevoBoton.textContent = `Boton GPU${n}`;
        nuevaGPU.botonLimpiar.textContent = 'Limpiar';
        nuevaGPU.botonLimpiar.id=`clean`;
        nuevaGPU.placeholder = 'GPU (opcional)';
        nuevaGPU.inputSetting.coff.placeholder = 'core-clock OFFSET';
        nuevaGPU.inputSetting.coclk.placeholder = 'core-clock LOCK';
        nuevaGPU.inputSetting.mmclk.placeholder = 'memory-clock-lock';
        nuevaGPU.inputSetting.coff.id= `s1${n}`;
        nuevaGPU.inputSetting.coclk.id=`s2${n}`;
        nuevaGPU.inputSetting.mmclk.id=`s3${n}`;
        nuevaGPU.id=`GPU${n}`;
        nuevaGPU.gpuN.className = 'gpus';
        nuevaGPU.cargada=false;
        miDiv.appendChild(nuevaGPU.gpuN);
        miDiv.appendChild(space);
        miDiv.appendChild(nuevaGPU);
        miDiv.appendChild(space);
        miDiv.appendChild(nuevaGPU.inputSetting.coff);
        miDiv.appendChild(space);
        miDiv.appendChild(nuevaGPU.inputSetting.coclk);
        miDiv.appendChild(space);
        miDiv.appendChild(nuevaGPU.inputSetting.mmclk);
        miDiv.appendChild(space);
        miDiv.appendChild(nuevaGPU.nuevoBoton);
        miDiv.appendChild(nuevaGPU.botonLimpiar);
        miDiv.appendChild(nuevaGPU.checkbox);
        nuevaGPU.status=document.createElement(`input`)
        nuevaGPU.status.id=`status${n}`;
        nuevaGPU.status.className="status";
        miDiv.appendChild(nuevaGPU.status);
        
        nuevaGPU.nuevoBoton.onclick = function() {
          if (esNum(nuevaGPU.inputSetting.coff.value+nuevaGPU.inputSetting.coclk.value+nuevaGPU.inputSetting.mmclk.value)){
            nuevaGPU.cargada=true;
            determinarOC(nuevaGPU.id);
            nuevaGPU.status.value=`ok`;
            nuevaGPU.status.style.backgroundColor = `green`;
          }else{
            nuevaGPU.cargada=false;
            nuevaGPU.status.style.backgroundColor = `red`;
          };
          }; 
          setInterval(function(){
            if (nuevaGPU.cargada === true) {
              nuevaGPU.status.style.backgroundColor = `green`;
            } else {
              nuevaGPU.status.style.backgroundColor = "red";
            }
          }, 1000);
        nuevaGPU.botonLimpiar.onclick = function() {
            limpiar(nuevaGPU.id);
            };  
        miDiv.appendChild(nuevaGPU.nuevoParrafo);
        n++;
        };
    };
};

function reset(){
  let miDiv = document.getElementById('gpu');
  cantidadGPU=0;
  n=0;
  miDiv.textContent='';
}
function confirmaGPU(){
  let cant=parseInt(document.getElementById(`cantidad`).value);
  if (cantidadGPU+cant<101){
  cantidadGPU=cantidadGPU+cant;
  createElements(cantidadGPU);
  }
};
