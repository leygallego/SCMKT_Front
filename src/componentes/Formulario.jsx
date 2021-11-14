import React from 'react'

export default function Formulario() {
    return (
        <div>
            <form>
                <label for="choose">¿Prefieres un plátano o una cereza?</label>
                <input id="choose" name="i_like" />
                <button>Enviar</button>
            </form>
        </div>
    )
}
