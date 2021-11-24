import React from 'react';
import { 
    ListItem, 
    ListItemText, 
    InputBase, 
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true });
        }
    }

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    }

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem });
    }

    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly);
        this.setState({ readOnly: false }, () => {
            console.log("ReadOnly? ", this.state.readOnly);
        });
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase 
                        inputProps={{ 
                            "aria-label": "naked",
                            readOnly: this.state.readOnly
                        }}
                        type="text"
                        id={String(item.id)}
                        name={item.name}
                        value={item.title}
                        multiple
                        fullWidth
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            // <div className="Todo">
            //     <input 
            //         type="checkbox" 
            //         id={this.state.item.id}
            //         name={this.state.item.name} 
            //         value={this.state.item.done}
            //         defaultChecked={this.state.item.done} 
            //     />
            //     <label for={this.state.item.id}>{this.state.item.title}</label>
            // </div>
        )
    }
}

export default Todo;