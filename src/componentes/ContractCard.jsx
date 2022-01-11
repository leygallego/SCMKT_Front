import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { ContentState } from 'draft-js';
import { NavLink } from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs';
import './styles/Contratos.css';

function ContractCard({ id, conditions }) {

    let { name, amount, shortdescription } = conditions

    let html = `${shortdescription ? shortdescription : '<div></div>'}`
    let contentBlock = htmlToDraft(html);

    const [contentState, setContentState] = useState(
        contentBlock ?
            ContentState.createFromBlockArray(contentBlock.contentBlocks)
            : null
    )
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );

    return (
        <>
            <div className="contratos-card">
                <div className='wrapper'>
                    <NavLink to={`/detalle/${id ? id : "undefined"}`}>
                        <div className='ellipsis-contract-name'>{name ? name : "undefined"}</div>
                    </NavLink>
                    <span className='contractAmount'>{amount ? amount : "undefined"}</span>
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
                </div>
            </div>
        </>
    )
}

export default ContractCard