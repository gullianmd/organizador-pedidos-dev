const {useState, useContext, useEffect, useRef, createContext} = wp.element;

import DirHandler from "./cb_dir_handler";
import BodegaWebcamHandler from "./cb_webcam_handler";
import { CbRepGesContext } from "./cbodega_hortitec_form";

const BodegaReten = ({index/* , state, setState, editMode */}) => {
  
  const {state, setState, editMode, repartidor} = useContext(CbRepGesContext)
  const [camera, setCamera] = useState(false);
  
  const [valName, setValname] = useState({
    nombreFoto: '',
    geol : ''
  });

  const updateInput = (e) => {

    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;
  
    const newFormData = {...state};

    newFormData['bodega']['bodega_reten'][index][fieldName] = fieldValue;

    setState(newFormData);

  }

  const updateReten = (e, type) => {

    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;
  
    const newFormData = {...state};

    newFormData['bodega']['bodega_reten'][index][type][fieldName] = fieldValue;

    setState(newFormData);
  }

  const handleWebcam = (e, varName, varGeol) => {

    e.preventDefault();
    setValname({
      nombreFoto: varName,
      geol : varGeol,
    });

    setCamera(!camera);

  }

  const handleDelete = (e) => {

    const newFormData = {...state};

    if (e.target.checked) {

      newFormData['bodega']['bodega_reten'][index]['type'] = 'delete';

      setState(newFormData);

    } else {

      newFormData['bodega']['bodega_reten'][index]['type'] = 'update';
      console.log(newFormData);
      setState(newFormData);
      
    }

  }

  const showContent = (e, id) => {

    
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }

  }

  return(
    <>
      {camera == true ? 
        <BodegaWebcamHandler
        setCamera={setCamera}
        state={state}
        setState={setState}
        index={index}
        valName={valName}
        /> 
        : 
        null
      }
      <a onClick={(e) => showContent(e, 'dist'+index)} class="w3-btn w3-block w3-pale-green w3-border">
        # {index+1}
        <span className="w3-right" style={{width : '3px'}}>↕</span>
      </a>
      <div id={'dist'+index} class="w3-hide w3-container w3-border w3-round">

        <div className="w3-cell-row w3-row-padding">

          <div class="w3-container w3-cell w3-cell-middle">
            {
            editMode === true ?
              <>
                <label style={{paddingRight : '10px'}}>¿Borrar?</label>
                <input 
                  className="w3-check"
                  type="checkbox"
                  name="type" 
                  id='type'
                  value = "true"
                  onChange={e => handleDelete(e)}
                  />
              </>
                : 
              null
            }
          </div>

        </div>

        <div className="w3-row-padding w3-section">
        {editMode === true ? 
          <>
            <div className="w3-third">
              <input 
                className="w3-input" 
                type="text" 
                name="ext_id" 
                id='ext_id'
                placeholder="ID SAP/EXTERNO"
                value={state.bodega.bodega_reten[index] == null ? null : state.bodega.bodega_reten[index].ext_id} 
                onChange={e => updateInput(e)}
                />
            </div>
          </> 
            : 
          null
        }

      <div className="w3-row-padding w3-section">
        <div className="w3-third" style={{paddingRight : '1rem', width : '10rem'}}>
          <label for="numero_guia">N° guia</label>
            <input 
              className="w3-input" 
              type="number" 
              name="numero_guia" 
              id='numero_guia'
              value={state.numero_guia} 
              onChange={event => valueUpdater(event, state, setState)} 
              readOnly={true}
              placeholder="####"
             />     
          </div>  

        <div className="w3-third" style={{paddingRight : '1rem', width : '10rem'}}>
          <label for="numero_factura">N° factura</label>
            <input 
              className="w3-input" 
              type="number" 
              name="numero_factura" 
              id='numero_factura'
              value={state.numero_factura} 
              onChange={event => valueUpdater(event, state, setState)} 
              readOnly={true}
              placeholder="####"
              />     
          </div>

      </div>

          <div className="w3-rest">
            <input 
              className="w3-input" 
              type="text" 
              name="objeto" 
              id='objeto'
              placeholder="Objeto"
              value={state.bodega.bodega_reten[index] == null ? null : state.bodega.bodega_reten[index].objeto} 
              onChange={e => updateInput(e)}
              />
          </div>       

        </div>

        {/* Entrega */}
        <div className="w3-row-padding w3-section">

          <div className="w3-third">
            <select 
              className="w3-select"
              name="repartidor"
              id="repartidor"
              onChange={e => updateInput(e)}
              value={
                state.bodega.bodega_reten[index] == null ?
                  null
                  :
                  state.bodega.bodega_reten[index].repartidor}
              required
              >
                <option value="" disabled selected>Seleccione repartidor</option>
                {repartidor}
            </select>
          </div>

          <div className="w3-twothird">                          
            <input 
              className="w3-input" 
              type="text" 
              name="detalle" 
              id='detalle'
              placeholder="detalle"
              value={
                state.bodega.bodega_reten[index] == null ?
                  null
                  :
                  state.bodega.bodega_reten[index].detalle} 
              onChange={e => updateInput(e)}
              />
          </div>

        </div>

        <div className="w3-row-padding w3-section">

          <div className="w3-third" style={{paddingRight : '1rem', width : '12rem'}}>
          <label> Cantidad de bultos :</label> 
            <input 
            className="w3-input"
            type="text"
            name="n_bultos"
            id="n_bultos"
            onChange={event => valueUpdater(event, state, setState)}
            value={state.n_bultos}
            maxLength={45}
            required
            />

          </div>

          <div className="w3-third">
          <label for="Cantidad_peso"><string>Peso por punto:</string></label>
            <input
            className="w3-input"
            type="texto"
            name="peso"
            id='peso'
            value={null}
            onChange={e => updateReten(e, 'entrega')} />

          </div>

        </div>

        {/* Direccion, numero y comuna entrega */}

        <DirHandler
          state={state}
          setState={setState}
          inputArray={['direccion', 'numero', 'comuna']}
          index={index}
        />

        <div className="w3-row-padding w3-section">

          <div className="w3-third">
            <input 
              className="w3-input" 
              type="text" 
              name="oficina" 
              id='oficina'
              placeholder="Oficina"
              value={state.bodega.bodega_reten[index] == null ? null : state.bodega.bodega_reten[index].oficina} 
              onChange={e => updateInput(e)}
              />
          </div>

          <div className="w3-third">
            <input 
              className="w3-input" 
              type="text" 
              name="telefono" 
              id='telefono'
              placeholder="Teléfono"
              value={state.bodega.bodega_reten[index] == null ? null : state.bodega.bodega_reten[index].telefono} 
              onChange={e => updateInput(e)}
              />
          </div>

        </div> 

        {/* Foto entrega geol y tiempo entrega */}

        <div className="w3-row-padding w3-section">

          <div className="w3-third">

            <div className="w3-row-padding w3-section">

             {/* <div className="w3-rest w3-padding-16">
                      
                <textarea 
                className="w3-input" 
                type="text" 
                name="geol" 
                id='geol'
                placeholder="Geol Entrega"
                value={
                  state.bodega.bodega_reten[index] == null ?
                    null
                    :
                    state.bodega.bodega_reten[index].geol} 
                onChange={e => updateInput(e)}
                />

                </div> */}

            </div>

          </div>

          <div className="w3-rest">

            <div className="w3-cell-row" style={{height : "240px"}}>

{/*               <div className="w3-container w3-cell w3-cell-middle" style={{width : '20%'}}>
                <button className='w3-button w3-border' style={{height : '5rem', width : '5rem'}} onClick={(e) => handleWebcam(e, 'foto', 'geol', 'entrega')}>📷</button>
              </div> */}
              

              <div className="w3-container w3-cell w3-cell-middle">

               {/* <p for="foto_termino">Fotos:</p>

                <div className="w3-row-padding w3-section">

                  <div className="w3-third">
                    <button className='w3-button w3-border' onClick={(e) => handleWebcam(e, 'foto1', 'geol')}>📷</button>
                  </div>
                
                  <div className="w3-rest">
                    {
                    state.bodega.bodega_reten[index] == null ?
                      null
                      :
                      state.bodega.bodega_reten[index].foto1 != null ? 
                        <img src={state.bodega.bodega_reten[index].foto1} className="w3-border" style={{width : '315px', height : '175px'}}/> 
                        :
                        <h5>Sin Fotos!</h5>
                    }
                  </div>

                </div>

                <div className="w3-row-padding w3-section">

                  <div className="w3-third">
                    <button className='w3-button w3-border' onClick={(e) => handleWebcam(e, 'foto2', 'geol')}>📷</button>
                  </div>
                
                  <div className="w3-rest">
                    {
                    state.bodega.bodega_reten[index] == null ?
                      null
                      :
                      state.bodega.bodega_reten[index].foto2 != null ? 
                        <img src={state.bodega.bodega_reten[index].foto2} className="w3-border" style={{width : '315px', height : '175px'}}/> 
                        :
                        <h5>Sin Fotos!</h5>
                    }
                  </div>

                </div>

                <div className="w3-row-padding w3-section">

                  <div className="w3-third">
                    <button className='w3-button w3-border' onClick={(e) => handleWebcam(e, 'foto3', 'geol')}>📷</button>
                  </div>
                
                  <div className="w3-rest">
                    {
                    state.bodega.bodega_reten[index] == null ?
                      null
                      :
                      state.bodega.bodega_reten[index].foto3 != null ? 
                        <img src={state.bodega.bodega_reten[index].foto3} className="w3-border" style={{width : '315px', height : '175px'}}/> 
                        :
                        <h5>Sin Fotos!</h5>
                    }
                  </div>

                </div>   

                <div className="w3-row-padding w3-section">

                  <div className="w3-third">
                    <button className='w3-button w3-border' onClick={(e) => handleWebcam(e, 'foto4', 'geol')}>📷</button>
                  </div>
                
                  <div className="w3-rest">
                    {
                    state.bodega.bodega_reten[index] == null ?
                      null
                      :
                      state.bodega.bodega_reten[index].foto4 != null ? 
                        <img src={state.bodega.bodega_reten[index].foto4} className="w3-border" style={{width : '315px', height : '175px'}}/> 
                        :
                        <h5>Sin Fotos!</h5>
                    }
                  </div>

                </div>             


                <div className="w3-row-padding w3-section">

                  <div className="w3-third">
                    <button className='w3-button w3-border' onClick={(e) => handleWebcam(e, 'foto5', 'geol')}>📷</button>
                  </div>
                
                  <div className="w3-rest">
                    {
                    state.bodega.bodega_reten[index] == null ?
                      null
                      :
                      state.bodega.bodega_reten[index].foto5 != null ? 
                        <img src={state.bodega.bodega_reten[index].foto5} className="w3-border" style={{width : '315px', height : '175px'}}/> 
                        :
                        <h5>Sin Fotos!</h5>
                    }
                  </div>

                </div>
                  */}
              </div>

            </div>

          </div>

        </div>

        {/* <div className="w3-row-padding w3-section">
          <div className="w3-twothird">
            <span className="w3-text">Comentarios en entrega :</span>
            <textarea 
              className="w3-input"
              id="comentario"
              name="comentario"
              value={
                state.bodega.bodega_reten[index] == null ?
                  null
                  :
                  state.bodega.bodega_reten[index].comentario}
              onChange={e => updateInput(e)}
              maxLength={500}
              />
          </div>
        </div>
              

        <hr/>
        <div className="w3-row-padding w3-section">

        <div className="w3-third">
            <label for="inicio"><strong>Inicio :</strong></label>               
            <input 
              className="w3-input" 
              type="time" 
              name="inicio" 
              id='inicio'
              value={state.bodega.bodega_reten[index].inicio} 
              onChange={e => updateInput(e)}
              />

          </div>

          <div className="w3-third">
            <label for="termino"><strong>Término :</strong></label>               
            <input 
              className="w3-input" 
              type="time" 
              name="termino" 
              id='termino'
              value={state.bodega.bodega_reten[index].termino} 
              onChange={e => updateInput(e)}
              />

          </div>

          <div className="w3-third">
            <label for="duracion"><strong>Duracion :</strong></label>               
            <input 
              className="w3-input" 
              type="time" 
              name="duracion" 
              id='duracion'
              value={state.bodega.bodega_reten[index].duracion} 
              onChange={e => updateInput(e)}
              />

          </div>

              </div>  */}
      </div><br/>
    </>
  );


}

  export default BodegaReten;