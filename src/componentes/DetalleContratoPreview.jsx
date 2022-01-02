import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { getContractsPreview, createContract } from "../actions/index"
import { useDispatch, useSelector } from 'react-redux';
import { NODE_ENV, urlProduction, urlDevelop, port2 } from '../config/app.config.js';
import Swal from 'sweetalert2';
import './styles/DetalleContratoPreview.css';
import useMetaMask from '../hooks/useMetaMask';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

function DetalleContratoPreview(props) {

  const { dataPreview, onClose } = props
  const urlWork = NODE_ENV === 'production' ? urlProduction : `${urlDevelop}:${port2}`
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()

  let dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const contract = useSelector(state => state.preview)

  let html = `${contract?.shortdescription ? contract?.shortdescription : '<div></div>'}`
  let contentBlock = htmlToDraft(html);

  const [contentState, setContentState] = useState(
    contentBlock ?
      ContentState.createFromBlockArray(contentBlock.contentBlocks)
      : null
  )

  const [editorState, setEditorState] = useState(() =>
    //EditorState.createEmpty()
    EditorState.createWithContent(contentState)
  );

  let htmlLong = `${contract?.longdescription ? contract?.longdescription : '<div></div>'}`
  let contentBlockLong = htmlToDraft(htmlLong);
  const [contentStateLong = contentState, setContentStateLong = setContentState] = useState(
    contentBlockLong ?
      ContentState.createFromBlockArray(contentBlockLong.contentBlocks)
      : null
  )

  const [editorStateLong = editorState, setEditorStateLong = setEditorState] = useState(() =>
    //EditorState.createEmpty()
    EditorState.createWithContent(contentStateLong)
  );

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
      wallet1: `${isActive ? account : 'Necesitas conectar tu wallet de MetaMask para crear un contrato'}`,
      wallet2: '',
      conditions: {
        name: contract.name,
        type: contract.type,
        duration: contract.duration,
        category: contract.category,
        shortdescription: contract.shortdescription,
        longdescription: contract.longdescription,
        amount: contract.amount,
        coin: contract.coin,
        instructions: '',
        condition: {
          c1: contract.c1,
          c2: contract.c2
        }
      },
      status,
      ownerId: user.id
    }

    Swal.fire({
      title: 'Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(createContract(nweC))

        Swal.fire('Guardado correctamente', '', 'success')
          .then((result) => {
            //window.location.replace("https://scmkt-4fe6b.web.app/perfil/")
            // window.location.replace(`http://localhost:3000/perfil`)
            window.location.replace(`${urlWork}/perfil/`)

          })
      } else if (result.isDenied) {
        Swal.fire('No se ha guardado ningún cambio', '', 'info')
      }
    })
  }

  return (
    <div className='preview-content'>
      <Button
                className="aceptar-contratos"
                variant="contained"
                onClick={handleOnSubmit}
              >Guardar Borrador</Button>
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
            <p>{contract.type}</p>
            <p>{contract.duration}</p>
            <p>{contract.category}</p>
            {/* <p>{contract.shortdescription}</p> */}
            <div className='input-reach-text-disabled'>
              <Editor
                toolbarHidden
                readOnly={true}
                editorState={editorState}
                onEditorStateChange={setEditorState}
                defaultContentState={contentState}
                onContentStateChange={setContentState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </div>
            {/* <p>{contract.longdescription}</p> */}
            <div className='input-reach-text-disabled' >
              <Editor
                toolbarHidden
                readOnly={true}
                editorState={editorStateLong}
                onEditorStateChange={setEditorStateLong}
                defaultContentState={contentStateLong}
                onContentStateChange={setContentStateLong}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </div>
            <h1><span>{contract.amount} ({contract.coin})</span> </h1>
            <div>
              <p>Test</p>
              {contract.c1 || contract.c2
                ? <div className='iframes-test-contract'>
                  {contract.c1
                    ? <object data={contract.c1} type="application/pdf" className='iframes-test-contract-object'>
                      <iframe id="inlineFrameC1"
                        title="Test 1"
                        src={`https://docs.google.com/viewer?url=${contract.c1}&embedded=true`}
                        // style="border:1px solid #666CCC"
                        frameborder="1"
                        scrolling="auto"
                        width="50%"
                        height="100%"
                      >
                      </iframe>
                    </object>
                    : <div></div>
                  }

                  {contract.c2
                    ? <object data={contract.c2} type="application/pdf" className='iframes-test-contract-object'>
                      <iframe id="inlineFrameC2"
                        title="Test 2"
                        src={`https://docs.google.com/viewer?url=${contract.c2}&embedded=true`}
                        // style="border:1px solid #666CCC"
                        frameborder="1"
                        scrolling="auto"
                        width="50%"
                        height="100%"
                      >
                      </iframe>
                    </object>
                    : <div></div>
                  }
                </div>
                : <div></div>
              }
            </div>

            <div className='group-button-preview'>
              <Button
                className="aceptar-contratos"
                variant="contained"
                onClick={onClose}
              >Editar</Button>

              <Button
                className="aceptar-contratos"
                variant="contained"
                onClick={handleOnSubmitPublished}
              >Publicar</Button>

              <Button
                className="aceptar-contratos"
                variant="contained"
                onClick={handleOnSubmit}
              >Guardar Borrador</Button>
            </div>

          </div>
          // :
          // <div>Cargando...</div>
        }
      </div>
    </div>
  )
}

export default DetalleContratoPreview
