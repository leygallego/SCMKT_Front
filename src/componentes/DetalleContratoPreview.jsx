import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getContractsPreview, createContract } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './DetalleContratoPreview.css';

function DetalleContratoPreview(props) {
  const { dataPreview, onClose } = props

  let dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const contract = useSelector(state => state.preview)

  useEffect(() => {
    dispatch(getContractsPreview(dataPreview))
    console.log('contract', contract)
  }, [dispatch])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    saveContract('unpublished')
  }

  const handleOnSubmitPublished = (e) => {
    e.preventDefault()
    saveContract('published')
  }

  const saveContract = (status) => {
    let nweC = {
      wallet1: user.wallet,
      wallet2: '',
      conditions: {
        name: contract.name,
        shortdescription: contract.shortdescription,
        longdescription: contract.longdescription,
        amount: contract.amount,
        coin: contract.coin,
        condition: {
          c1: '',
          c2: ''
        }
      },
      status,
      ownerId: user.id
    }

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(createContract(nweC))

        Swal.fire('Saved!', '', 'success')
          .then((result) => {
            window.location.replace(`https://scmkt-4fe6b.web.app/perfil/`)
          })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <div className='preview-content'>
      <div><h1>Detalle Contrato</h1></div>
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
            <h2>{contract.name}</h2>
            <p>{contract.shortdescription}</p>
            <p>{contract.longdescription}</p>
            <h1><span>{contract.amount}</span> </h1>

            <Button
              className="aceptar-contratos"
              variant="contained"
              onClick={onClose}
            >Edit</Button>

            <Button
              className="aceptar-contratos"
              variant="contained"
              onClick={handleOnSubmitPublished}
            >To post</Button>

            <Button
              className="aceptar-contratos"
              variant="contained"
              onClick={handleOnSubmit}
            >Save Draft </Button>

          </div>
          // :
          // <div>Cargando...</div>
        }
      </div>
    </div>
  )
}

export default DetalleContratoPreview
