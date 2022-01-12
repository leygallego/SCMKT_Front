import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getContractsByID, updateContract } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './styles/DetalleContratoPreview.css';

function ContractStepsResolve(props) {
  const { id, onClose } = props

  let dispatch = useDispatch()
  const contract = useSelector(state => state.contract)
  const [input, setInput] = useState({ instructions: contract?.conditions?.instructions })

  useEffect(() => {
    dispatch(getContractsByID(id))
  }, [dispatch, id])

  const handleInputChange = (e) => {
    setInput({
      [e.target.name]: e.target.value
    })
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()
    saveContract()
  }

  const saveContract = (status) => {
    Swal.fire({
      title: 'Deseas guardar los cambios?',
      // showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let newC = {
          ...contract,
         conditions: { ...contract.conditions, instructions: input.instructions },
         ownerId: contract.owner.id
        }
        console.log('Soy nuevo', newC)
        dispatch(updateContract(newC))

        Swal.fire('Guardado correctamente', '', 'success')
          .then((result) => {
            onClose()
          })
      } else if (result.isDenied) {
        Swal.fire('No se ha guardado ningún cambio', '', 'info')
      }
    })
  }

  return (
    <div className='preview-content'>
      <div><h1>{contract.conditions.name}</h1></div>
      <div className="main-detalle">
        {
          // contract?.name ?
          <div className="detalle-card">
            <div className="xButton">
              <Button
                variant="contained"
                onClick={onClose}
              >
                X
              </Button>
            </div>

            <div className="labelInput">
              <div className="labelForm-buildContract">
                Instrucciones para Resolver el Contrato
              </div>
              <div className="inputForm">
                <textarea
                  className="inputFormCComponent"
                  type="text"
                  name="instructions"
                  value={input.instructions}
                  onChange={e => { handleInputChange(e) }}
                  rows="10"
                />
              </div>
            </div>

            <div className='group-button-preview'>
              <Button
                className="aceptar-contratos"
                variant="contained"
                onClick={handleOnSubmit}
              >Guardar</Button>

              <Button
                className="aceptar-contratos"
                variant="contained"
                onClick={onClose}
              >Cancelar</Button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ContractStepsResolve
