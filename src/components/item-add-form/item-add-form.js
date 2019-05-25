import React, {Component} from "react"
import "./item-add-form.css"


export default class ItemAddForm extends Component{

    state = {
        label : "",
        placeholder : "Input a new item",
        txtColor : "grey"
    }

    onLabelChange = (event) => {
        // console.log(".")
        this.setState({
            label : event.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.label !== ""){
            this.props.onAdding(this.state.label);
            this.setState({
                label : "",
                placeholder : "Input a new item",
                txtColor : "grey"              
            })
        }
        else{
            this.setState({
                placeholder : "Enter smth!!!",
                txtColor: "red"
            })
        }
    }

    render(){
        return(
            <form 
                className="item-add-form"
                onSubmit={this.onSubmit}
                >
                <input
                    type="text"
                    value={this.state.label}
                    className={`form-control ${this.state.txtColor === "red" ? "red" : "grey"}`}
                    onChange={this.onLabelChange}
                    placeholder={this.state.placeholder}
                />
                <button
                    className="btn btn-outline-secondary"
                    title="Add an item"
                >Add an item
                </button>
            </form>

        )
    }
}