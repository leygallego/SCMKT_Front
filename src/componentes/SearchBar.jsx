import React from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    getContracts,
    setFilterAmount,
    setFilterType,
    setFilterCategory,
    setName,
    setAuthor,
    setLoading
} from "../actions"

function SearchBar() {
    const {
        page,
        name,
        author,
        filterAmount,
        filterType,
        filterCategory,
        filterDurationH,
        filterDurationL,
    } = useSelector(state => state)

    const dispatch = useDispatch()

    const filterByAmount = (e) => {
        dispatch(setFilterAmount(e.target.value))
        dispatch(getContracts({ page, name, author, ownerId: 1, typeC: 'all', filterAmount: e.target.value, filterType, filterCategory, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }
    
    const filterByType = (e) => {
        dispatch(setFilterType(e.target.value))
        dispatch(getContracts({ page, name, author, ownerId: 1, typeC: 'all', filterAmount, filterType: e.target.value, filterCategory, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }

    const filterByCategory = (e) => {
        dispatch(setFilterCategory(e.target.value))
        dispatch(getContracts({ page, name, author, ownerId: 1, typeC: 'all', filterAmount, filterType, filterCategory: e.target.value, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }

    const search = (e) => {
        dispatch(setAuthor(e.target.value))
        dispatch(setName(e.target.value))
        dispatch(getContracts({ page, name: e.target.value, author: e.target.value, ownerId: 1, typeC: 'all', filterAmount, filterType, filterCategory, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }

    return (
            <div className="wraper-filtros" >
                <div className="search-contrato">
                    <input className="searchTerm" placeholder="Busca contrato" onChange={search} />
                </div>

                <div className="select-type">
                    <select className="select-tipo" onChange={filterByAmount}>
                        <option value="" label="Filtro por Recompensa"></option>
                        <option value="0.00000000-|-0.00000005" label="[0.00000000 - 0.00000005]"></option>
                        <option value="0.00000006-|-0.00000015" label="[0.00000006 - 0.00000015]"></option>
                        <option value="0.00000016-|-0.00000050" label="[0.00000016 - 0.00000050]"></option>
                        <option value="0.00000051-|-0.00000100" label="[0.00000051 - 0.00000100]"></option>
                        <option value="0.00000101" label="> 0.00000100"></option>
                    </select>
                </div>

                {/* NO BORRAR, COMENTADO TEMPORALMENTE */}
                <div className="select-type">
                    <select className="select-tipo" onChange={filterByType}>
                        <option value="" label="Filtro por tipo"></option>
                        <option value="Desafio" label="Desafío"></option>
                        <option value="Solucion" label="Solución"></option>
                    </select>
                </div>

                <div className="select-category">
                    <select className="select-categoria" onChange={filterByCategory}>
                        <option value="" label="Filtro por categoría"></option>
                        <option value="Principiante" label="Principiante"></option>
                        <option value="Intermedio" label="Intermedio"></option>
                        <option value="Avanzado" label="Avanzado"></option>
                    </select>
                </div>
            </div>
    )
}

export default SearchBar