import React, {Component} from 'react';
import ItemAddForm from "./item-add-form/item-add-form.js"
import TodoList from "./todo-list/todo-list.js" ;
import SearchPanel from "./search-panel/search-panel.js";
import AppHeader from "./app-header/app-header.js";
import ItemStatusFilter from "./item-status-filter/item-status-filter.js"
import "../bootstrap.css"
import "./App.css"

export default class App extends Component {

    maxId = 100;

    
    
    state = {
        todoData : [
            this.createToDoItem("Learn React"),
            this.createToDoItem("Greet mom"),
            this.createToDoItem("Go to the dormitory")
        ],
        searchText : "",
        statusFilter : "all"
    }

    createToDoItem(label){
        return {label, id : this.maxId++, done: false, important: false}
    }
    
    // deleteAnItem = (id) => {            
    //         this.setState(
    //             ({todoData}) => {
    //                 let newArr = todoData;
    //                 const index = newArr.findIndex(el => el.id === id);

    //                 newArr.splice(index, 1) 
                    
    //                 return(todoData : newArr) 
    //             }
    //         )
    //     )
    // }

    deleteAnItem = (id) => {
        this.setState(
            ({todoData}) => {
                let anArr = todoData;
                const index = anArr.findIndex(el => el.id === id);

                anArr.splice(index, 1);

                return {todoData : anArr}

            }
        )
    }

    addAnItem = (txt) => {
        this.setState(({todoData}) => {
         return {todoData : [...todoData, this.createToDoItem(txt)]}   
        }
        )
    }

    toogleProp = (arr, id, prop) => {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [prop] : !oldItem[prop]}
        const newArray = [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1) 
        ]
        return newArray
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            const newArray = this.toogleProp(todoData, id, "important");
            return {todoData : newArray}
        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            const newArray = this.toogleProp(todoData, id, "done");
            return {todoData : newArray}
        })
    }

    handleSearch = (txt) =>{
        console.log(txt);
        this.setState({
            searchText : txt
        })
    }

    changeStatus = (status) => {
        this.setState({
            statusFilter : status
        })
    }

    filterBySearch = (data, searchText) => {
        if(searchText === ""){
            return data
        }
        return (
                data.filter( 
                    el => el.label.indexOf(searchText) > -1
                    )
            )
    }

    filterByStatus = (data, status) => {
        if(status === "all"){
            return data
        }
        if(status === "active"){
            return(
                data.filter(
                    el => !el.done
                )
            )
        }
        if(status === "done"){
            return(
                data.filter(
                    el => el.done
                )
            )
        }
    }

    render(){
        const {todoData, searchText, statusFilter} = this.state;
        const doneCounter = todoData.filter(el => el.done === true);
        const visibleData = this.filterByStatus(
            this.filterBySearch(todoData, searchText),
            statusFilter
        ); 

        return(
            <div>
                <AppHeader done={doneCounter.length} toDo={todoData.length - doneCounter.length}/>
                <div className="searchPanel">
                    <SearchPanel
                        changed = {(txt) => this.handleSearch(txt)}
                        searchValue = {this.state.searchText}
                    />
                    <ItemStatusFilter
                    changeStatus={(txt) => this.changeStatus(txt)}
                    currFilter={this.state.statusFilter}
                    />
                </div>
                <TodoList 
                    data={visibleData} 
                    onDeleted={(id) => this.deleteAnItem(id)}
                    onToggleImportant={(id) => this.onToggleImportant(id)}
                    onToggleDone={(id) => this.onToggleDone(id)}
                /> 
                <ItemAddForm 
                    onAdding={(txt) => this.addAnItem(txt)}
                />
            </div>
        );
    }
};