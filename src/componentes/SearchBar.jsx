import React from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    getContracts,
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
        filterType,
        filterCategory,
        filterDurationH,
        filterDurationL,
    } = useSelector(state => state)

    const dispatch = useDispatch()

    const filterByType = (e) => {
        dispatch(setFilterType(e.target.value))
        dispatch(getContracts({ page, name, author, ownerId: 1, typeC: 'all', filterType: e.target.value, filterCategory, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }

    const filterByCategory = (e) => {
        dispatch(setFilterCategory(e.target.value))
        dispatch(getContracts({ page, name, author, ownerId: 1, typeC: 'all', filterType, filterCategory: e.target.value, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }

    const search = (e) => {
        dispatch(setAuthor(e.target.value))
        dispatch(setName(e.target.value))
        dispatch(getContracts({ page, name: e.target.value, author: e.target.value, ownerId: 1, typeC: 'all', filterType, filterCategory, filterDurationH, filterDurationL }))
        dispatch(setLoading(false))
    }

    return (
            <div className="wraper-filtros" >
                <div className="search-contrato">
                    <input className="searchTerm" placeholder="Busca contrato" onChange={search} />
                </div>
                {/* NO BORRAR, COMENTADO TEMPORALMENTE */}
                {/* <div className="select-type">
                    <select className="select-tipo" onChange={filterByType}>
                        <option value="" label="Filtro por tipo"></option>
                        <option value="Desafío" label="Desafío"></option>
                        <option value="Solución" label="Solución"></option>
                    </select>
                </div> */}
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