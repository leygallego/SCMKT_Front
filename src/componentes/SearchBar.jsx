import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    getContracts,
    setFilterType,
    setFilterCategory,
    // setFilterDurationL,
    // setFilterDurationH,
    setName,
    setAuthor
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
        dispatch(getContracts({ page, name, author, filterType: e.target.value, filterCategory, filterDurationH, filterDurationL }))
    }

    const filterByCategory = (e) => {
        dispatch(setFilterCategory(e.target.value))
        dispatch(getContracts({ page, name, author, filterType, filterCategory: e.target.value, filterDurationH, filterDurationL }))
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
        if (dispatch(getContracts({ page, name, author: e.target.value, filterType, filterCategory, filterDurationH, filterDurationL })).length === 0){
            dispatch(getContracts({ page, name: e.target.value, author, filterType, filterCategory, filterDurationH, filterDurationL }))
        } else {
            dispatch(getContracts({ page, name, author: e.target.value, filterType, filterCategory, filterDurationH, filterDurationL }))
        }
        
  
        
    }

    return (
        <>
            <div>
                <input placeholder="This is the searchbar" onChange={search} />
            </div>
            <div>
                <select onChange={filterByType}>
                    <option value="" label="Filter by type"></option>
                    <option value="type1" label="type1"></option>
                    <option value="type2" label="type2"></option>
                    <option value="type3" label="type3"></option>
                </select>
            </div>
            <div>
                <select onChange={filterByCategory}>
                    <option value="" label="Filter by category"></option>
                    <option value="category1" label="category1"></option>
                    <option value="category2" label="category2"></option>
                    <option value="category3" label="category3"></option>
                </select>
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