import React from "react"
import { useDispatch, useSelector } from "react-redux";
import './styles/SearchBar.css'
import { 
    getContracts,
    setFilterType,
    setFilterCategory,
    // setFilterDurationL,
    // setFilterDurationH,
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

    // const filterByDurationH = (e) => {
    //     dispatch(setFilterDurationH(e.target.value))
    //     dispatch(getContracts({ page, name, author, filterType, filterCategory, filterDurationH: e.target.value, filterDurationL }))
    // }
    
    // const filterByDurationL = (e) => {
    //     dispatch(setFilterDurationL(e.target.value))
    //     dispatch(getContracts({ page, name, author, filterType, filterCategory, filterDurationH, filterDurationL: e.target.value }))
    // }

    const search = (e) => {
        dispatch(setAuthor(e.target.value))
        dispatch(setName(e.target.value))
        // if (dispatch(getContracts({ page, name, author: e.target.value, ownerId: 1, typeC: 'all', filterType, filterCategory, filterDurationH, filterDurationL })).length === 0){
        //     dispatch(getContracts({ page, name: e.target.value, author, ownerId: 1, typeC: 'all', filterType, filterCategory, filterDurationH, filterDurationL }))
        // } else {
            dispatch(getContracts({ page, name: e.target.value, author: e.target.value, ownerId: 1, typeC: 'all', filterType, filterCategory, filterDurationH, filterDurationL }))
            dispatch(setLoading(false))
        // }
    }

    return (
        <>
            <div className="wraper-filtros" >
            <div className="search-contrato">
                <input className="searchTerm" placeholder="Busca contrato" onChange={search} />
            </div>
            <div className="select-type">
                <select className="select-tipo" onChange={filterByType}>
                    <option value="" label="Filtro por tipo"></option>
                    <option value="Desafío" label="Desafío"></option>
                    <option value="Solución" label="Solución"></option>
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
            
            {/*<div>
                <select onChange={filterByDurationH}>
                    <option value="filter" label="Filter by duration"></option>
                    <option value="type1" label="type1"></option>
                    <option value="type2" label="type2"></option>
                    <option value="type3" label="type3"></option>
                </select>
            </div>*/}
            {/*<div>
                <select onChange={filterByDurationL}>
                    <option value="filter" label="Filter by type"></option>
                    <option value="type1" label="type1"></option>
                    <option value="type2" label="type2"></option>
                    <option value="type3" label="type3"></option>
                </select>
            </div>*/}
        </>
    )






}

export default SearchBar